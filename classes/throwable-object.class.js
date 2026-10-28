import { MovableObject } from "./movable-object.class.js";
import { setStoppableInterval } from "../js/intervals.js";

/**
 * A thrown potion bottle that rotates in the air and splashes on impact.
 */
export class ThrowableObject extends MovableObject {
  offset = {
    top: 25,
    left: 25,
    right: 25,
    bottom: 25,
  };

  IMAGES_ROTATION = [
    "img_wickedwoods/6_potion_bottle/potion_rotation/potion__0008_potion_rotation_1.png",
    "img_wickedwoods/6_potion_bottle/potion_rotation/potion__0009_potion_rotation_2.png",
    "img_wickedwoods/6_potion_bottle/potion_rotation/potion__0010_potion_rotation_3.png",
    "img_wickedwoods/6_potion_bottle/potion_rotation/potion__0011_potion_rotation_4.png",
  ];

  IMAGES_SPLASH = [
    "img_wickedwoods/6_potion_bottle/potion_splash/potion__0005_splash_1.png",
    "img_wickedwoods/6_potion_bottle/potion_splash/potion__0004_splash_2.png",
    "img_wickedwoods/6_potion_bottle/potion_splash/potion__0003_splash_3.png",
    "img_wickedwoods/6_potion_bottle/potion_splash/potion__0002_splash_4.png",
    "img_wickedwoods/6_potion_bottle/potion_splash/potion__0001_splash_5.png",
    "img_wickedwoods/6_potion_bottle/potion_splash/potion__0000_splash_6.png",
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
    this.height = 60;
    this.width = 60;
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
