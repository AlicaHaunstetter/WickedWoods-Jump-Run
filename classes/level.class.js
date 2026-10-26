/**
 * Holds all objects of one level.
 */
export class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  bottles;
  level_end_x = 2200;

  /**
   * Creates a level.
   * @param {MovableObject[]} enemies - Chickens and the endboss.
   * @param {Cloud[]} clouds - Clouds in the sky.
   * @param {BackgroundObject[]} backgroundObjects - Background layers.
   * @param {CollectableObject[]} coins - Coins to collect.
   * @param {CollectableObject[]} bottles - Bottles to collect.
   */
  constructor(enemies, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}
