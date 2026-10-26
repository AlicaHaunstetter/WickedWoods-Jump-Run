import { MovableObject } from "./movable-object.class.js";

/**
 * A cloud in the sky.
 */
export class Cloud extends MovableObject {
  y = 5;
  height = 300;
  width = 300;

  /**
   * Creates a cloud at a random position.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 500;
    this.animate();
  }

  /**
   * Moves the cloud.
   */
  animate() {
    this.moveLeft();
  }
}
