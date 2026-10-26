/**
 * Base class for everything that can be drawn on the canvas.
 */
export class DrawableObject {
  x = 120;
  y = 275;
  height = 100;
  width = 100;
  img;
  imageCache = [];
  currentImage = 0;

  /**
   * Loads a single image and sets it as the current image.
   * @param {string} path - Path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the current image onto the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Preloads several images into the image cache.
   * @param {string[]} arr - Paths to the image files.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
