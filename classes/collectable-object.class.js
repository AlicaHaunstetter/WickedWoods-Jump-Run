import { MovableObject } from "./movable-object.class.js";
import { setStoppableInterval } from "../js/intervals.js";

/**
 * A crystal (coin) or a bottle that the character can collect.
 */
export class CollectableObject extends MovableObject {
  IMAGES_COIN_BLUE = [
    "img_wickedwoods/8_crystals/crystal_blue_small.png",
    "img_wickedwoods/8_crystals/crystal_blue_big.png",
  ];

  IMAGES_COIN_PINK = [
    "img_wickedwoods/8_crystals/crystal_pink_small.png",
    "img_wickedwoods/8_crystals/crystal_pink_big.png",
  ];

  IMAGES_BOTTLE = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];

  images;

  /**
   * Creates a collectable object at the given position.
   * @param {string} type - "coin" or "bottle".
   * @param {number} x - Horizontal position.
   * @param {number} y - Vertical position.
   * @param {string} [color] - Crystal color of a coin, "blue" or "pink".
   */
  constructor(type, x, y, color) {
    super();
    if (type == "coin") {
      this.setCoin(color);
    } else {
      this.setBottle();
    }
    this.loadImage(this.images[0]);
    this.loadImages(this.images);
    this.x = x;
    this.y = y;
    this.animate();
  }

  /**
   * Sets images, size and hitbox of a coin, shown as a crystal.
   * @param {string} color - "blue" or "pink".
   */
  setCoin(color) {
    if (color == "pink") {
      this.images = this.IMAGES_COIN_PINK;
      this.width = 36;
    } else {
      this.images = this.IMAGES_COIN_BLUE;
      this.width = 42;
    }
    this.height = 80;
    this.offset = {
      top: 5,
      left: 3,
      right: 3,
      bottom: 4,
    };
  }

  /**
   * Sets images, size and hitbox of a bottle on the ground.
   */
  setBottle() {
    this.images = this.IMAGES_BOTTLE;
    this.width = 80;
    this.height = 80;
    this.offset = {
      top: 15,
      left: 35,
      right: 15,
      bottom: 9,
    };
  }

  /**
   * Starts the animation loop.
   */
  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.images);
    }, 300);
  }
}
