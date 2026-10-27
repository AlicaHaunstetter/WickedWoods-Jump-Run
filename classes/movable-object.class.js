import { DrawableObject } from "./drawable-object.class.js";
import { setStoppableInterval } from "../js/intervals.js";

/**
 * Base class for all objects that move, collide, take damage or die.
 */
export class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 3.75;
  energy = 100;
  lastHit = 0;
  damagePerHit = 10;
  deadImage = 0;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Starts the gravity loop that lets the object fall or jump.
   */
  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

  /**
   * Checks whether the object is in the air.
   * A dead character lands lower.
   * @returns {boolean} True if the object is above the ground.
   */
  isAboveGround() {
    if (this.isDead()) {
      return this.y < 130;
    } else {
      return this.y < 120;
    }
  }

  /**
   * Checks whether the hitbox of this object overlaps the hitbox of another object.
   * @param {MovableObject} mo - The other object.
   * @returns {boolean} True if both hitboxes overlap.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces the energy by the damage per hit and remembers the time of the hit.
   */
  hit() {
    this.energy -= this.damagePerHit;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks whether the last hit was less than 500 ms ago.
   * @returns {boolean} True while the object is hurt.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 500;
    return timepassed < 1;
  }

  /**
   * Checks whether the object has no energy left.
   * @returns {boolean} True if the object is dead.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Shows the next image of an animation in a loop.
   * @param {string[]} images - Paths of the animation images.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right by its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Starts a jump.
   */
  jump() {
    this.speedY = 30;
    this.currentImage = 0;
  }

  /**
   * Plays the dead animation once and stays on the last image.
   */
  playDeadAnimation() {
    if (this.deadImage < this.IMAGES_DEAD.length) {
      this.img = this.imageCache[this.IMAGES_DEAD[this.deadImage]];
      this.deadImage++;
    }
  }
}
