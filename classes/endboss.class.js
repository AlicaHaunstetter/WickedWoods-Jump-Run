import { MovableObject } from "./movable-object.class.js";
import { setStoppableInterval } from "../js/intervals.js";

/**
 * The endboss. Plays an intro when first seen, then follows and attacks the character.
 */
export class Endboss extends MovableObject {
  height = 400;
  width = 300;
  y = -15;
  speed = 2;
  damagePerHit = 20;

  offset = {
    top: 70,
    left: 20,
    right: 20,
    bottom: 30,
  };

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALK = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  world;
  hadFirstContact = false;
  lastTurn = 0;

  /**
   * Creates the endboss, preloads all images and starts the animations.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3150;
    this.animate();
  }

  /**
   * Starts the movement loop and the animation loop.
   */
  animate() {
    setStoppableInterval(() => this.moveEndboss(), 1000 / 60);
    setStoppableInterval(() => this.playEndbossAnimation(), 200);
  }

  /**
   * Walks in the current viewing direction once the intro is finished.
   */
  moveEndboss() {
    if (this.canMove()) {
      this.updateDirection();
      if (this.otherDirection) {
        this.moveRight();
      } else {
        this.moveLeft();
      }
    }
  }

  /**
   * Turns towards the character, but at most once every 2 seconds.
   */
  updateDirection() {
    let timePassed = new Date().getTime() - this.lastTurn;
    let characterIsRight = this.distanceToCharacter() > 0;
    if (timePassed > 2000 && characterIsRight != this.otherDirection) {
      this.otherDirection = characterIsRight;
      this.lastTurn = new Date().getTime();
    }
  }

  /**
   * Checks whether the endboss is allowed to walk.
   * @returns {boolean} True after the intro as long as the endboss is alive.
   */
  canMove() {
    return this.hadFirstContact && this.currentImage >= this.IMAGES_ALERT.length && !this.isDead();
  }

  /**
   * Chooses the animation that fits the current state of the endboss.
   */
  playEndbossAnimation() {
    if (this.isDead()) {
      this.playDeadAnimation();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (!this.hadFirstContact) {
      this.checkFirstContact();
    } else if (this.currentImage < this.IMAGES_ALERT.length) {
      this.playAnimation(this.IMAGES_ALERT);
    } else if (this.isNearCharacter()) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else {
      this.playAnimation(this.IMAGES_WALK);
    }
  }

  /**
   * Starts the intro as soon as the endboss comes into view.
   */
  checkFirstContact() {
    if (this.world.character.x > this.x - 620) {
      this.hadFirstContact = true;
      this.currentImage = 0;
    }
  }

  /**
   * Checks whether the character is close enough for an attack.
   * @returns {boolean} True if the centers are less than 240 px apart.
   */
  isNearCharacter() {
    return Math.abs(this.distanceToCharacter()) < 240;
  }

  /**
   * Calculates the distance between the center of the character and the center of the endboss.
   * @returns {number} Positive if the character is on the right, negative if on the left.
   */
  distanceToCharacter() {
    let characterCenter = this.world.character.x + this.world.character.width / 2;
    let bossCenter = this.x + this.width / 2;
    return characterCenter - bossCenter;
  }
}
