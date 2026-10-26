let intervalIds = [];

/**
 * Starts an interval and remembers its id so it can be stopped later.
 * @param {Function} fn - Function that runs on every interval.
 * @param {number} time - Time between two runs in milliseconds.
 */
export function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

/**
 * Stops all intervals of the current game.
 */
export function stopAllIntervals() {
  intervalIds.forEach((id) => {
    clearInterval(id);
  });
  intervalIds = [];
}
