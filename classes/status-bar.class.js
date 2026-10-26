import { DrawableObject } from "./drawable-object.class.js";

/**
 * A status bar for health, coins, bottles or the endboss.
 */
export class StatusBar extends DrawableObject {
  IMAGES_STATUS_HEART = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  IMAGES_STATUS_COIN = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];

  IMAGES_STATUS_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  IMAGES_STATUS_ENDBOSS = [
    "img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  images;
  percentage = 100;

  /**
   * Creates a status bar.
   * @param {string} type - "heart", "coin", "bottle" or "endboss".
   * @param {number} x - Horizontal position.
   * @param {number} y - Vertical position.
   * @param {number} percentage - Start value from 0 to 100.
   */
  constructor(type, x, y, percentage) {
    super();
    this.selectImages(type);
    this.loadImages(this.images);
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 60;
    this.setPercentage(percentage);
  }

  /**
   * Selects the image set that belongs to the type.
   * @param {string} type - "heart", "coin", "bottle" or "endboss".
   */
  selectImages(type) {
    if (type == "heart") {
      this.images = this.IMAGES_STATUS_HEART;
    } else if (type == "coin") {
      this.images = this.IMAGES_STATUS_COIN;
    } else if (type == "bottle") {
      this.images = this.IMAGES_STATUS_BOTTLE;
    } else if (type == "endboss") {
      this.images = this.IMAGES_STATUS_ENDBOSS;
    }
  }

  /**
   * Sets a new value and shows the matching image.
   * @param {number} percentage - New value from 0 to 100.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Finds the image that matches the current value. The bar is only empty at exactly 0.
   * @returns {number} Index of the image from 0 to 5.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}
