import { MovableObject } from "./movable-object.class.js";

/**
 * One layer of the background, 720 px wide.
 */
export class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Creates a background layer at the given position.
   * @param {string} imagePath - Path to the image of the layer.
   * @param {number} x - Horizontal position.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 420 - this.height;
  }
}
