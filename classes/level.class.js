/**
 * Holds all objects of one level.
 */
export class Level {
  enemies;
  backgroundObjects;
  coins;
  bottles;
  level_end_x = 3050;

  /**
   * Creates a level.
   * @param {MovableObject[]} enemies - Chickens and the endboss.
   * @param {BackgroundObject[]} backgroundObjects - Background layers.
   * @param {CollectableObject[]} coins - Coins to collect.
   * @param {CollectableObject[]} bottles - Bottles to collect.
   */
  constructor(enemies, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}
