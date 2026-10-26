import { Level } from "../classes/level.class.js";
import { Chicken } from "../classes/chicken.class.js";
import { Endboss } from "../classes/endboss.class.js";
import { Cloud } from "../classes/cloud.class.js";
import { BackgroundObject } from "../classes/background-object.class.js";
import { CollectableObject } from "../classes/collectable-object.class.js";

export let level1;

/**
 * Creates level 1. Called when the game starts, so no enemy moves before.
 */
export function initLevel() {
  level1 = new Level(
    createEnemies(),
    [new Cloud()],
    createBackgroundObjects(),
    createCoins(),
    createBottles(),
  );
}

/**
 * Creates the chickens and the endboss.
 * @returns {MovableObject[]} All enemies of the level.
 */
function createEnemies() {
  return [
    new Chicken("normal", 500),
    new Chicken("small", 900),
    new Chicken("normal", 1100),
    new Chicken("small", 1500),
    new Chicken("normal", 1700),
    new Endboss(),
  ];
}

/**
 * Creates five background sections of 720 px from x = -720 to x = 2880.
 * The two image variants alternate so the layers fit together without gaps.
 * @returns {BackgroundObject[]} All background layers.
 */
function createBackgroundObjects() {
  let backgroundObjects = [];
  for (let i = -1; i < 4; i++) {
    let variant = 2;
    if (i % 2 == 0) {
      variant = 1;
    }
    backgroundObjects = backgroundObjects.concat(createBackgroundSection(variant, 720 * i));
  }
  return backgroundObjects;
}

/**
 * Creates the four layers of one background section.
 * @param {number} variant - Image variant 1 or 2.
 * @param {number} x - Horizontal position of the section.
 * @returns {BackgroundObject[]} The four layers from back to front.
 */
function createBackgroundSection(variant, x) {
  return [
    new BackgroundObject("img/5_background/layers/air.png", x),
    new BackgroundObject("img/5_background/layers/3_third_layer/" + variant + ".png", x),
    new BackgroundObject("img/5_background/layers/2_second_layer/" + variant + ".png", x),
    new BackgroundObject("img/5_background/layers/1_first_layer/" + variant + ".png", x),
  ];
}

/**
 * Creates the floating coins.
 * @returns {CollectableObject[]} All coins of the level.
 */
function createCoins() {
  return [
    new CollectableObject("coin", 400, 150),
    new CollectableObject("coin", 480, 100),
    new CollectableObject("coin", 560, 150),
    new CollectableObject("coin", 850, 150),
    new CollectableObject("coin", 930, 100),
    new CollectableObject("coin", 1010, 150),
    new CollectableObject("coin", 1200, 150),
    new CollectableObject("coin", 1280, 150),
    new CollectableObject("coin", 1500, 150),
    new CollectableObject("coin", 1580, 150),
  ];
}

/**
 * Creates the bottles on the ground.
 * @returns {CollectableObject[]} All bottles of the level.
 */
function createBottles() {
  return [
    new CollectableObject("bottle", 300, 290),
    new CollectableObject("bottle", 600, 290),
    new CollectableObject("bottle", 800, 290),
    new CollectableObject("bottle", 1000, 290),
    new CollectableObject("bottle", 1250, 290),
    new CollectableObject("bottle", 1500, 290),
    new CollectableObject("bottle", 1650, 290),
    new CollectableObject("bottle", 1800, 290),
    new CollectableObject("bottle", 2000, 290),
  ];
}
