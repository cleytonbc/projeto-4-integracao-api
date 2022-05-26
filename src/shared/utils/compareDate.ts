import { isAfter } from "date-fns";

function compareDate(date: Date, dateCompare: Date): boolean {
  return isAfter(date, dateCompare);
}

export { compareDate };
