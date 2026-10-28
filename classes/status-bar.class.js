import { DrawableObject } from "./drawable-object.class.js";

/**
 * A status bar for health, coins, bottles or the endboss.
 */
export class StatusBar extends DrawableObject {
  IMAGES_STATUS_HEART = [
    "img_wickedwoods/7_statusbars/2_statusbar_health/statusbar__0001s_0005_health_0.png",
    "img_wickedwoods/7_statusbars/2_statusbar_health/statusbar__0001s_0004_health_20.png",
    "img_wickedwoods/7_statusbars/2_statusbar_health/statusbar__0001s_0003_health_40.png",
    "img_wickedwoods/7_statusbars/2_statusbar_health/statusbar__0001s_0002_health_60.png",
    "img_wickedwoods/7_statusbars/2_statusbar_health/statusbar__0001s_0001_health_80.png",
    "img_wickedwoods/7_statusbars/2_statusbar_health/statusbar__0001s_0000_health_100.png",
  ];

  IMAGES_STATUS_COIN = [
    "img_wickedwoods/7_statusbars/1_statusbar_crystal/statusbar__0000s_0005_crystal_0.png",
    "img_wickedwoods/7_statusbars/1_statusbar_crystal/statusbar__0000s_0004_crystal_20.png",
    "img_wickedwoods/7_statusbars/1_statusbar_crystal/statusbar__0000s_0003_crystal_40.png",
    "img_wickedwoods/7_statusbars/1_statusbar_crystal/statusbar__0000s_0002_crystal_60.png",
    "img_wickedwoods/7_statusbars/1_statusbar_crystal/statusbar__0000s_0001_crystal_80.png",
    "img_wickedwoods/7_statusbars/1_statusbar_crystal/statusbar__0000s_0000_crystal_100.png",
  ];

  IMAGES_STATUS_BOTTLE = [
    "img_wickedwoods/7_statusbars/3_statusbar_potion/statusbar__0002s_0005_potion_0.png",
    "img_wickedwoods/7_statusbars/3_statusbar_potion/statusbar__0002s_0004_potion_20.png",
    "img_wickedwoods/7_statusbars/3_statusbar_potion/statusbar__0002s_0003_potion_40.png",
    "img_wickedwoods/7_statusbars/3_statusbar_potion/statusbar__0002s_0002_potion_60.png",
    "img_wickedwoods/7_statusbars/3_statusbar_potion/statusbar__0002s_0001_potion_80.png",
    "img_wickedwoods/7_statusbars/3_statusbar_potion/statusbar__0002s_0000_potion_100.png",
  ];

  IMAGES_STATUS_ENDBOSS = [
    "img_wickedwoods/7_statusbars/4_statusbar_endboss/statusbar__0003s_0005_endboss_0.png",
    "img_wickedwoods/7_statusbars/4_statusbar_endboss/statusbar__0003s_0004_endboss_20.png",
    "img_wickedwoods/7_statusbars/4_statusbar_endboss/statusbar__0003s_0003_endboss_40.png",
    "img_wickedwoods/7_statusbars/4_statusbar_endboss/statusbar__0003s_0002_endboss_60.png",
    "img_wickedwoods/7_statusbars/4_statusbar_endboss/statusbar__0003s_0001_endboss_80.png",
    "img_wickedwoods/7_statusbars/4_statusbar_endboss/statusbar__0003s_0000_endboss_100.png",
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
    this.height = 50;
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
