import { MovableObject } from "./movable-object.class.js";
import { setStoppableInterval } from "../js/intervals.js";

/**
 * A normal or small chicken that walks to the left.
 */
export class Chicken extends MovableObject {
  height = 90;
  width = 90;
  otherDirection = true;
  y = 280;

  offset = {
    top: 5,
    left: 30,
    right: 30,
    bottom: 30,
  };

  IMAGES_WALKING_NORMAL = [
    "img_wickedwoods/3_enemies_normal/enemies_normal/1_walk/enemy__0000s_0000_enemy_normal_1.png",
    "img_wickedwoods/3_enemies_normal/enemies_normal/1_walk/enemy__0000s_0001_enemy_normal_2.png",
    "img_wickedwoods/3_enemies_normal/enemies_normal/1_walk/enemy__0000s_0002_enemy_normal_3.png",
  ];

  IMAGES_DEAD_NORMAL = [
    "img_wickedwoods/3_enemies_normal/enemies_normal/2_dead/enemy__0000s_0003_enemy_normal_dead.png",
  ];

  IMAGES_WALKING_SMALL = [
    "img_wickedwoods/3_enemies_normal/enemies_small/1_walk/enemy__0001s_0000_enemy_small_1.png",
    "img_wickedwoods/3_enemies_normal/enemies_small/1_walk/enemy__0001s_0001_enemy_small_2.png",
    "img_wickedwoods/3_enemies_normal/enemies_small/1_walk/enemy__0001s_0002_enemy_small_3.png",
  ];

  IMAGES_DEAD_SMALL = [
    "img_wickedwoods/3_enemies_normal/enemies_small/2_dead/enemy__0001s_0003_enemy_small_dead.png",
  ];

  imagesWalking;
  imagesDead;

  /**
   * Creates a chicken of the given type near the given position.
   * @param {string} type - "normal" or "small".
   * @param {number} x - Base position, a random distance of up to 200 px is added.
   */
  constructor(type, x) {
    super();
    if (type == "small") {
      this.setSmallChicken();
    } else {
      this.setNormalChicken();
    }
    this.x = x + Math.random() * 200;
    this.loadImage(this.imagesWalking[0]);
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesDead);
    this.animate();
  }

  /**
   * Sets images, size, hitbox and speed of a small chicken.
   */
  setSmallChicken() {
    this.imagesWalking = this.IMAGES_WALKING_SMALL;
    this.imagesDead = this.IMAGES_DEAD_SMALL;
    this.height = 50;
    this.width = 50;
    this.y = 315;
    this.offset = {
      top: 0,
      left: 21,
      right: 21,
      bottom: 21,
    };
    this.speed = 0.5 + Math.random() * 0.5;
  }

  /**
   * Sets images and speed of a normal chicken.
   */
  setNormalChicken() {
    this.imagesWalking = this.IMAGES_WALKING_NORMAL;
    this.imagesDead = this.IMAGES_DEAD_NORMAL;
    this.speed = 0.15 + Math.random() * 0.5;
  }

  /**
   * Starts the movement loop and the animation loop.
   */
  animate() {
    setStoppableInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setStoppableInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.imagesDead);
      } else {
        this.playAnimation(this.imagesWalking);
      }
    }, 100);
  }
}
