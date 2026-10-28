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
    new Chicken("small", 2100),
    new Chicken("normal", 2400),
    new Endboss(),
  ];
}

/**
 * Creates the background, one image that covers the whole visible level.
 * @returns {BackgroundObject[]} The background image.
 */
function createBackgroundObjects() {
  return [
    new BackgroundObject("img_wickedwoods/5_background/background.jpg", -100),
  ];
}

/**
 * Creates the floating coins.
 * @returns {CollectableObject[]} All coins of the level.
 */
function createCoins() {
  return [
    new CollectableObject("coin", 400, 150, "blue"),
    new CollectableObject("coin", 480, 100, "blue"),
    new CollectableObject("coin", 560, 150, "blue"),
    new CollectableObject("coin", 850, 150, "pink"),
    new CollectableObject("coin", 930, 100, "pink"),
    new CollectableObject("coin", 1010, 150, "pink"),
    new CollectableObject("coin", 1200, 150, "blue"),
    new CollectableObject("coin", 1280, 150, "blue"),
    new CollectableObject("coin", 1500, 150, "pink"),
    new CollectableObject("coin", 1580, 150, "pink"),
    new CollectableObject("coin", 1950, 150, "blue"),
    new CollectableObject("coin", 2030, 100, "blue"),
    new CollectableObject("coin", 2250, 150, "pink"),
    new CollectableObject("coin", 2330, 150, "pink"),
  ];
}

/**
 * Creates the bottles on the ground.
 * @returns {CollectableObject[]} All bottles of the level.
 */
function createBottles() {
  return [
    new CollectableObject("bottle", 300, 310),
    new CollectableObject("bottle", 600, 310),
    new CollectableObject("bottle", 800, 310),
    new CollectableObject("bottle", 1000, 310),
    new CollectableObject("bottle", 1250, 310),
    new CollectableObject("bottle", 1500, 310),
    new CollectableObject("bottle", 1650, 310),
    new CollectableObject("bottle", 1800, 310),
    new CollectableObject("bottle", 2000, 310),
    new CollectableObject("bottle", 2250, 310),
    new CollectableObject("bottle", 2500, 310),
  ];
}
