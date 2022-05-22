function convertDateStrAndHouStr(dateStr, hourStr) {
  const date = dateStr.split("/");
  const hour = hourStr.split(":");

  return new Date(date[2], date[1] - 1, date[0], hour[0], hour[1]);
}

export { convertDateStrAndHouStr };
