import { formatDate } from "./date.mjs";

export function getDaysLeft(timestamp) {
  const today = new Date();
  const targetDate = new Date(formatDate(timestamp));
  const timeDifference = targetDate - today;
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysLeft;
}
