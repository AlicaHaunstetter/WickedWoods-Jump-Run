import { MovableObject } from "./movable-object.class.js";
import { setStoppableInterval } from "../js/intervals.js";

/**
 * The endboss. Plays an intro when first seen, then follows and attacks the character.
 */
export class Endboss extends MovableObject {
  height = 360;
  width = 310;
  otherDirection = true;
  y = 25;
  speed = 2;
  damagePerHit = 20;

  offset = {
    top: 70,
    left: 20,
    right: 20,
    bottom: 30,
  };

  IMAGES_ALERT = [
    "img_wickedwoods/4_enemy_endboss/2_alert/15.png",
    "img_wickedwoods/4_enemy_endboss/2_alert/16.png",
    "img_wickedwoods/4_enemy_endboss/2_alert/17.png",
    "img_wickedwoods/4_enemy_endboss/2_alert/18.png",
  ];

  IMAGES_WALK = [
    "img_wickedwoods/4_enemy_endboss/1_walk/1.png",
    "img_wickedwoods/4_enemy_endboss/1_walk/2.png",
    "img_wickedwoods/4_enemy_endboss/1_walk/3.png",
    "img_wickedwoods/4_enemy_endboss/1_walk/4.png",
  ];

  IMAGES_ATTACK = [
    "img_wickedwoods/4_enemy_endboss/3_attack/11.png",
    "img_wickedwoods/4_enemy_endboss/3_attack/12.png",
    "img_wickedwoods/4_enemy_endboss/3_attack/13.png",
    "img_wickedwoods/4_enemy_endboss/3_attack/14.png",
  ];

  IMAGES_HURT = [
    "img_wickedwoods/4_enemy_endboss/4_hurt/9.png",
    "img_wickedwoods/4_enemy_endboss/4_hurt/10.png",
  ];

  IMAGES_DEAD = [
    "img_wickedwoods/4_enemy_endboss/5_dead/5.png",
    "img_wickedwoods/4_enemy_endboss/5_dead/6.png",
    "img_wickedwoods/4_enemy_endboss/5_dead/7.png",
    "img_wickedwoods/4_enemy_endboss/5_dead/8.png",
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
   * The images look to the right, so otherDirection means walking to the left.
   */
  moveEndboss() {
    if (this.canMove()) {
      this.updateDirection();
      if (this.otherDirection) {
        this.moveLeft();
      } else {
        this.moveRight();
      }
    }
  }

  /**
   * Turns towards the character, but at most once every 2 seconds.
   */
  updateDirection() {
    let timePassed = new Date().getTime() - this.lastTurn;
    let characterIsRight = this.distanceToCharacter() > 0;
    if (timePassed > 2000 && characterIsRight == this.otherDirection) {
      this.otherDirection = !characterIsRight;
      this.lastTurn = new Date().getTime();
    }
  }

  /**
   * Checks whether the endboss is allowed to walk.
   * @returns {boolean} True after the intro as long as the endboss is alive.
   */
  canMove() {
    return (
      this.hadFirstContact &&
      this.currentImage >= this.introLength() &&
      !this.isDead()
    );
  }

  /**
   * Number of images in the intro, the alert images are played twice.
   * @returns {number} Length of the intro in images.
   */
  introLength() {
    return this.IMAGES_ALERT.length * 2;
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
    } else if (this.currentImage < this.introLength()) {
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
    let characterCenter =
      this.world.character.x + this.world.character.width / 2;
    let bossCenter = this.x + this.width / 2;
    return characterCenter - bossCenter;
  }
}
