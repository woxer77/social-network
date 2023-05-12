function convertDateToValidFormat(dateObj) {
  let dd = dateObj.getDate();
  if (dd < 10) dd = `0${dd}`;

  let mm = dateObj.getMonth() + 1;
  if (mm < 10) mm = `0${mm}`;

  const yyyy = dateObj.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

function convertTimeToValidFormat(timeStr) {
  let [hh, mm, ss] = timeStr.split(':');
  if (hh < 10) hh = `0${hh}`;

  if (mm < 10) mm = `0${mm}`;

  if (ss < 10) ss = `0${ss}`;

  return `${hh}:${mm}:${ss}`;
}

function convertUTCToLocal(UTCDate, UTCTime) {
  const [year, month, day] = UTCDate.split('-');
  const [hour, minute, second] = UTCTime.split(':');

  const localDateString = new Date(Date.UTC(year, month - 1, day, hour, minute, second)).toLocaleString();
  // eslint-disable-next-line prefer-const
  let [localDate, localTime] = localDateString.split(',');

  const [localDay, localMonth, localYear] = localDate.split('.');
  localDate = `${localYear}-${localMonth}-${localDay}`;

  return { localDate, localTime };
}

function getCurrentUTCDateTime() {
  const dateObj = new Date();

  const year = dateObj.getUTCFullYear();
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();

  const hour = dateObj.getUTCHours();
  const minute = dateObj.getUTCMinutes();
  const second = dateObj.getUTCSeconds();

  const date = convertDateToValidFormat(new Date(`${year}-${month}-${day}`));
  const time = convertTimeToValidFormat(`${hour}:${minute}:${second}`);

  return { date, time };
}

function convertTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(months / 12);

  const secondsRounded = Math.floor(seconds);
  const minutesRounded = Math.floor(minutes);
  const hoursRounded = Math.floor(hours);
  const daysRounded = Math.floor(days);
  const weeksRounded = Math.floor(weeks);
  const monthsRounded = Math.floor(months);
  const yearsRounded = Math.floor(years);

  if (months >= 12) {
    if (yearsRounded === 1) return `${yearsRounded} year ago`;
    return `${yearsRounded} years ago`;
  }

  if (weeks >= 4) {
    if (monthsRounded === 1) return `${monthsRounded} month ago`;
    return `${monthsRounded} months ago`;
  }

  if (days >= 7) {
    if (weeksRounded === 1) return `${weeksRounded} week ago`;
    return `${weeksRounded} weeks ago`;
  }

  if (hours >= 24) {
    if (daysRounded === 1) return `${daysRounded} day ago`;
    return `${daysRounded} days ago`;
  }

  if (minutes >= 60) {
    if (hoursRounded === 1) return `${hoursRounded} hour ago`;
    return `${hoursRounded} hours ago`;
  }

  if (seconds >= 60) {
    if (minutesRounded === 1) return `${minutesRounded} minute ago`;
    return `${minutesRounded} minutes ago`;
  }

  if (secondsRounded === 1) return `${secondsRounded} second ago`;
  return `${secondsRounded} seconds ago`;
}

export {
  convertDateToValidFormat, convertTimeToValidFormat, convertTime, getCurrentUTCDateTime, convertUTCToLocal
};
