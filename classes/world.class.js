import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Endboss } from "./endboss.class.js";
import { StatusBar } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { level1 } from "../levels/level1.js";
import { setStoppableInterval, stopAllIntervals } from "../js/intervals.js";

/**
 * The game world. Draws everything and checks collisions, collecting, throwing and the end of the game.
 */
export class World {
  character = new Character();
  level = level1;
  totalCoins = level1.coins.length;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBarHealth = new StatusBar("heart", 50, 0, 100);
  statusBarCoin = new StatusBar("coin", 50, 45, 0);
  statusBarBottle = new StatusBar("bottle", 50, 90, 0);
  statusBarEndboss = new StatusBar("endboss", 470, 0, 100);
  throwableObjects = [];
  endboss;
  gameOver = false;
  animationFrameId;

  /**
   * Creates the world and starts drawing and checking.
   * @param {HTMLCanvasElement} canvas - The canvas to draw on.
   * @param {Keyboard} keyboard - The pressed keys.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Draws one frame and requests the next one.
   * Order from back to front: level objects, status bars, character.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawLevelObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.drawStatusBars();
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    this.animationFrameId = requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Draws background, clouds, collectables, enemies and thrown bottles.
   */
  drawLevelObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
  }

  /**
   * Draws all four status bars. They do not move with the camera.
   */
  drawStatusBars() {
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarEndboss);
  }

  /**
   * Draws several objects.
   * @param {DrawableObject[]} objects - The objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws one object, mirrored if it looks to the other side.
   * @param {DrawableObject} mo - The object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
    // DEBUG: hitbox of the character, remove later
    if (mo == this.character) {
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(
        mo.x + mo.offset.left,
        mo.y + mo.offset.top,
        mo.width - mo.offset.left - mo.offset.right,
        mo.height - mo.offset.top - mo.offset.bottom,
      );
    }
  }

  /**
   * Mirrors the canvas so the object is drawn looking to the other side.
   * @param {DrawableObject} mo - The object to mirror.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Undoes the mirroring from flipImage.
   * @param {DrawableObject} mo - The mirrored object.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Gives the character and the endboss access to the world.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.world = this;
        this.endboss = enemy;
      }
    });
  }

  /**
   * Starts the check loops. Jumping on chickens is checked more often so short landings are not missed.
   */
  run() {
    setStoppableInterval(() => this.runChecks(), 100);
    setStoppableInterval(() => this.runJumpCheck(), 1000 / 60);
  }

  /**
   * Runs all game checks. Actions of the character only count while it is alive.
   */
  runChecks() {
    if (!this.character.isDead()) {
      this.checkJumpOnChicken();
      this.checkCollisions();
      this.checkCollectables();
      this.checkThrowObjects();
    }
    this.checkBottleHits();
    this.checkGameOver();
  }

  /**
   * Checks jumping on chickens while the character is alive.
   */
  runJumpCheck() {
    if (!this.character.isDead()) {
      this.checkJumpOnChicken();
    }
  }

  /**
   * Ends the game once the character or the endboss is dead.
   */
  checkGameOver() {
    if (!this.gameOver && this.character.isDead()) {
      this.endGame("lostScreen", 3500);
    } else if (!this.gameOver && this.endboss.isDead()) {
      this.endGame("wonScreen", 1500);
    }
  }

  /**
   * Stops the game after the dead animation and shows the end screen.
   * @param {string} screenId - Id of the end screen to show.
   * @param {number} delay - Time in milliseconds until the end screen is shown.
   */
  endGame(screenId, delay) {
    this.gameOver = true;
    setTimeout(() => {
      stopAllIntervals();
      cancelAnimationFrame(this.animationFrameId);
      document.getElementById(screenId).classList.remove("d-none");
    }, delay);
  }

  /**
   * Throws a bottle in the viewing direction when D was pressed and bottles are left.
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.character.bottles > 0) {
      let x = this.character.x + 70;
      if (this.character.otherDirection) {
        x = this.character.x - 40;
      }
      let bottle = new ThrowableObject(x, this.character.y + 20, this.character.otherDirection);
      this.throwableObjects.push(bottle);
      this.character.bottles--;
      this.statusBarBottle.setPercentage(this.character.bottles * 20);
    }
    this.keyboard.D = false;
  }

  /**
   * Hurts the character when it touches a living enemy and is not hurt already.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isHurt()) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Checks every thrown bottle for hits on enemies and on the ground.
   */
  checkBottleHits() {
    this.throwableObjects.forEach((bottle) => {
      this.checkBottleHitsEnemy(bottle);
      if (!bottle.splashed && bottle.y > 280) {
        this.splashBottle(bottle);
      }
    });
  }

  /**
   * Lets a bottle hit the first living enemy it touches.
   * @param {ThrowableObject} bottle - The thrown bottle.
   */
  checkBottleHitsEnemy(bottle) {
    this.level.enemies.forEach((enemy) => {
      if (!bottle.splashed && !enemy.isDead() && bottle.isColliding(enemy)) {
        this.hitEnemyWithBottle(enemy);
        this.splashBottle(bottle);
      }
    });
  }

  /**
   * Damages the endboss or kills a chicken.
   * @param {MovableObject} enemy - The enemy that was hit.
   */
  hitEnemyWithBottle(enemy) {
    if (enemy instanceof Endboss) {
      enemy.hit();
      this.statusBarEndboss.setPercentage(enemy.energy);
    } else {
      this.killChicken(enemy);
    }
  }

  /**
   * Lets a bottle splash and removes it after the splash animation.
   * @param {ThrowableObject} bottle - The bottle that splashes.
   */
  splashBottle(bottle) {
    bottle.splash();
    setTimeout(() => {
      this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
    }, 360);
  }

  /**
   * Checks whether the character collects coins or bottles.
   */
  checkCollectables() {
    this.collectCoins();
    this.collectBottles();
  }

  /**
   * Collects every coin the character touches.
   */
  collectCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.coins++;
        this.statusBarCoin.setPercentage((this.character.coins / this.totalCoins) * 100);
        this.level.coins.splice(this.level.coins.indexOf(coin), 1);
      }
    });
  }

  /**
   * Collects every bottle the character touches, up to 5 bottles.
   */
  collectBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle) && this.character.bottles < 5) {
        this.character.bottles++;
        this.statusBarBottle.setPercentage(this.character.bottles * 20);
        this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
      }
    });
  }

  /**
   * Kills a chicken when the character lands on it and lets the character bounce off.
   */
  checkJumpOnChicken() {
    this.level.enemies.forEach((enemy) => {
      if (
        enemy instanceof Chicken &&
        !enemy.isDead() &&
        this.character.isColliding(enemy) &&
        this.character.speedY < 0
      ) {
        this.killChicken(enemy);
        this.character.speedY = 15;
      }
    });
  }

  /**
   * Kills a chicken and removes it from the level after 2 seconds.
   * @param {Chicken} chicken - The chicken to kill.
   */
  killChicken(chicken) {
    chicken.energy = 0;
    setTimeout(() => {
      let index = this.level.enemies.indexOf(chicken);
      this.level.enemies.splice(index, 1);
    }, 2000);
  }
}
