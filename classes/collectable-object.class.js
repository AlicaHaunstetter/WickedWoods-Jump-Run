import { MovableObject } from "./movable-object.class.js";
import { setStoppableInterval } from "../js/intervals.js";

/**
 * A coin or a bottle that the character can collect.
 */
export class CollectableObject extends MovableObject {
  IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  IMAGES_BOTTLE = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];

  images;

  /**
   * Creates a collectable object at the given position.
   * @param {string} type - "coin" or "bottle".
   * @param {number} x - Horizontal position.
   * @param {number} y - Vertical position.
   */
  constructor(type, x, y) {
    super();
    if (type == "coin") {
      this.setCoin();
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
   * Sets images, size and hitbox of a coin.
   */
  setCoin() {
    this.images = this.IMAGES_COIN;
    this.width = 100;
    this.height = 100;
    this.offset = {
      top: 35,
      left: 35,
      right: 35,
      bottom: 35,
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
