import { MovableObject } from "./movable-object.class.js";

/**
 * The background image, scaled to the canvas height (6469 x 720 px -> 3774 x 420 px).
 */
export class BackgroundObject extends MovableObject {
  width = 3774;
  height = 420;

  /**
   * Creates the background at the given position.
   * @param {string} imagePath - Path to the background image.
   * @param {number} x - Horizontal position.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 420 - this.height;
  }
}
