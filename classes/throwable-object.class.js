import { MovableObject } from "./movable-object.class.js";
import { setStoppableInterval } from "../js/intervals.js";

/**
 * A thrown salsa bottle that rotates in the air and splashes on impact.
 */
export class ThrowableObject extends MovableObject {
  offset = {
    top: 25,
    left: 25,
    right: 25,
    bottom: 25,
  };

  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  splashed = false;

  /**
   * Creates a bottle and throws it.
   * @param {number} x - Start position horizontal.
   * @param {number} y - Start position vertical.
   * @param {boolean} otherDirection - True if the bottle flies to the left.
   */
  constructor(x, y, otherDirection) {
    super().loadImage(this.IMAGES_ROTATION[0]);
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;
    this.height = 100;
    this.width = 100;
    this.throw();
  }

  /**
   * Starts gravity, the flight loop and the animation loop.
   */
  throw() {
    this.speedY = 20;
    this.applyGravity();
    setStoppableInterval(() => this.moveBottle(), 30);
    setStoppableInterval(() => this.playBottleAnimation(), 60);
  }

  /**
   * Moves the bottle in its direction until it splashes.
   */
  moveBottle() {
    if (!this.splashed) {
      if (this.otherDirection) {
        this.x -= 10;
      } else {
        this.x += 10;
      }
    }
  }

  /**
   * Plays the rotation animation in the air or the splash animation after impact.
   */
  playBottleAnimation() {
    if (this.splashed) {
      this.playAnimation(this.IMAGES_SPLASH);
    } else {
      this.playAnimation(this.IMAGES_ROTATION);
    }
  }

  /**
   * Stops the bottle where it is and starts the splash animation.
   */
  splash() {
    this.splashed = true;
    this.speedY = 0;
    this.acceleration = 0;
    this.currentImage = 0;
  }

  /**
   * Thrown bottles are always in the air.
   * @returns {boolean} Always true.
   */
  isAboveGround() {
    return true;
  }
}
