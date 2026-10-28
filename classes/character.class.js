import { MovableObject } from "./movable-object.class.js";
import { setStoppableInterval } from "../js/intervals.js";

/**
 * The playable character, the witch.
 */
export class Character extends MovableObject {
  height = 130;
  width = 250;
  y = 0;
  speed = 10;

  offset = {
    top: 36,
    left: 100,
    right: 110,
    bottom: 7,
  };

  IMAGES_WALKING = [
    "img_wickedwoods/2_character_witch/2_walk/character__0000s_0000_1.png",
    "img_wickedwoods/2_character_witch/2_walk/character__0000s_0001_2.png",
    "img_wickedwoods/2_character_witch/2_walk/character__0000s_0002_3.png",
    "img_wickedwoods/2_character_witch/2_walk/character__0000s_0003_4.png",
    "img_wickedwoods/2_character_witch/2_walk/character__0000s_0004_5.png",
  ];

  IMAGES_JUMPING = [
    "img_wickedwoods/2_character_witch/3_jump/character__0001s_0000_6.png",
    "img_wickedwoods/2_character_witch/3_jump/character__0001s_0001_7.png",
    "img_wickedwoods/2_character_witch/3_jump/character__0001s_0002_8.png",
    "img_wickedwoods/2_character_witch/3_jump/character__0001s_0003_9.png",
    "img_wickedwoods/2_character_witch/3_jump/character__0001s_0004_10.png",
    "img_wickedwoods/2_character_witch/3_jump/character__0001s_0005_11.png",
    "img_wickedwoods/2_character_witch/3_jump/character__0001s_0006_12.png",
    "img_wickedwoods/2_character_witch/3_jump/character__0001s_0007_13.png",
    "img_wickedwoods/2_character_witch/3_jump/character__0001s_0008_14.png",
  ];

  IMAGES_HURT = [
    "img_wickedwoods/2_character_witch/4_hurt/character__0004s_0000_34.png",
    "img_wickedwoods/2_character_witch/4_hurt/character__0004s_0001_35.png",
    "img_wickedwoods/2_character_witch/4_hurt/character__0004s_0002_36.png",
    "img_wickedwoods/2_character_witch/4_hurt/character__0004s_0003_37.png",
    "img_wickedwoods/2_character_witch/4_hurt/character__0004s_0004_38.png",
    "img_wickedwoods/2_character_witch/4_hurt/character__0004s_0005_39.png",
  ];

  IMAGES_DEAD = [
    "img_wickedwoods/2_character_witch/5_dead/character__0005s_0000_40.png",
    "img_wickedwoods/2_character_witch/5_dead/character__0005s_0001_41.png",
    "img_wickedwoods/2_character_witch/5_dead/character__0005s_0002_42.png",
    "img_wickedwoods/2_character_witch/5_dead/character__0005s_0003_43.png",
    "img_wickedwoods/2_character_witch/5_dead/character__0005s_0004_44.png",
    "img_wickedwoods/2_character_witch/5_dead/character__0005s_0005_45.png",
  ];

  IMAGES_IDLE = [
    "img_wickedwoods/2_character_witch/1_idle/idle/character__0002s_0000_15.png",
    "img_wickedwoods/2_character_witch/1_idle/idle/character__0002s_0001_16.png",
    "img_wickedwoods/2_character_witch/1_idle/idle/character__0002s_0002_17.png",
    "img_wickedwoods/2_character_witch/1_idle/idle/character__0002s_0003_18.png",
    "img_wickedwoods/2_character_witch/1_idle/idle/character__0002s_0004_19.png",
    "img_wickedwoods/2_character_witch/1_idle/idle/character__0002s_0005_20.png",
    "img_wickedwoods/2_character_witch/1_idle/idle/character__0002s_0006_21.png",
  ];

  IMAGES_LONG_IDLE = [
    "img_wickedwoods/2_character_witch/1_idle/long_idle/character__0003s_0000_22.png",
    "img_wickedwoods/2_character_witch/1_idle/long_idle/character__0003s_0001_23.png",
    "img_wickedwoods/2_character_witch/1_idle/long_idle/character__0003s_0002_24.png",
    "img_wickedwoods/2_character_witch/1_idle/long_idle/character__0003s_0003_25.png",
    "img_wickedwoods/2_character_witch/1_idle/long_idle/character__0003s_0004_26.png",
    "img_wickedwoods/2_character_witch/1_idle/long_idle/character__0003s_0005_27.png",
    "img_wickedwoods/2_character_witch/1_idle/long_idle/character__0003s_0006_28.png",
    "img_wickedwoods/2_character_witch/1_idle/long_idle/character__0003s_0007_29.png",
    "img_wickedwoods/2_character_witch/1_idle/long_idle/character__0003s_0008_30.png",
    "img_wickedwoods/2_character_witch/1_idle/long_idle/character__0003s_0009_31.png",
    "img_wickedwoods/2_character_witch/1_idle/long_idle/character__0003s_0010_32.png",
    "img_wickedwoods/2_character_witch/1_idle/long_idle/character__0003s_0011_33.png",
  ];

  world;
  coins = 0;
  bottles = 0;
  lastMove = new Date().getTime();

  /**
   * Creates the character, preloads all images and starts gravity and animations.
   */
  constructor() {
    super().loadImage(
      "img_wickedwoods/2_character_witch/2_walk/character__0000s_0000_1.png",
    );
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
    } else if (this.isAboveGround()) {
      this.flyBackwards();
    }
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Pushes the dead character backwards, against its viewing direction, while in the air.
   */
  flyBackwards() {
    if (this.otherDirection) {
      this.x += 3;
    } else {
      this.x -= 3;
    }
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
    if (
      this.world.keyboard.SPACE &&
      !this.isAboveGround() &&
      this.speedY == 0
    ) {
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
