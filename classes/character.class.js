import { MovableObject } from "./movable-object.class.js";
import { setStoppableInterval } from "../js/intervals.js";

/**
 * The playable character Pepe.
 */
export class Character extends MovableObject {
  height = 250;
  width = 125;
  y = 0;
  speed = 10;

  offset = {
    top: 120,
    left: 30,
    right: 30,
    bottom: 30,
  };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  coins = 0;
  bottles = 0;
  lastMove = new Date().getTime();

  /**
   * Creates the character, preloads all images and starts gravity and animations.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_IDLE);
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts the movement loop and the animation loop.
   */
  animate() {
    setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
    setStoppableInterval(() => this.playCharacterAnimation(), 120);
  }

  /**
   * Handles keyboard input while alive and moves the camera with the character.
   */
  moveCharacter() {
    if (!this.isDead()) {
      this.handleWalking();
      this.handleJumping();
      this.updateLastMove();
    }
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Walks left or right depending on the pressed arrow keys.
   */
  handleWalking() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }

  /**
   * Jumps when space is pressed and the last landing is finished.
   */
  handleJumping() {
    if (this.world.keyboard.SPACE && !this.isAboveGround() && this.speedY == 0) {
      this.jump();
    }
  }

  /**
   * Resets the idle timer when one of the game keys is pressed.
   */
  updateLastMove() {
    let keyboard = this.world.keyboard;
    if (keyboard.RIGHT || keyboard.LEFT || keyboard.SPACE || keyboard.D) {
      this.lastMove = new Date().getTime();
    }
  }

  /**
   * Chooses the animation that fits the current state of the character.
   */
  playCharacterAnimation() {
    if (this.isDead()) {
      this.playDyingAnimation();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.lastMove = new Date().getTime();
    } else if (this.isAboveGround()) {
      this.playJumpAnimation();
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.playIdleAnimation();
    }
  }

  /**
   * Lets the character hop once and plays the dead animation.
   */
  playDyingAnimation() {
    if (this.deadImage == 0) {
      this.speedY = 32;
    }
    this.playDeadAnimation();
  }

  /**
   * Plays the idle or the long idle animation depending on how long the character stands still.
   */
  playIdleAnimation() {
    if (this.timeSinceLastMove() > 4000) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
    } else if (this.timeSinceLastMove() > 60) {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  /**
   * Calculates how long the character has not moved.
   * @returns {number} Time since the last move in milliseconds.
   */
  timeSinceLastMove() {
    return new Date().getTime() - this.lastMove;
  }

  /**
   * Shows the jump image that matches the current vertical speed.
   */
  playJumpAnimation() {
    let progress = (30 - this.speedY) / 60;
    let i = Math.floor(progress * this.IMAGES_JUMPING.length);
    i = Math.max(0, Math.min(i, this.IMAGES_JUMPING.length - 1));
    this.img = this.imageCache[this.IMAGES_JUMPING[i]];
  }
}
