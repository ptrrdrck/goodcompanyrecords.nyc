function startWeeklyTimer(endDayOfWeek, endTime, stopDuration) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDate = new Date();

  const endDayIndex = daysOfWeek.indexOf(endDayOfWeek);

  let timeUntilEndDay = (endDayIndex - currentDate.getDay() + 7) % 7;
  if (timeUntilEndDay === 0 && currentDate.getHours() > endTime.hours) {
    timeUntilEndDay = 7;
  }
  const millisUntilEndDay = timeUntilEndDay * 24 * 60 * 60 * 1000;

  const millisUntilEndHour =
    (endTime.hours - currentDate.getHours()) * 60 * 60 * 1000;
  const millisUntilEndMinute =
    (endTime.minutes - currentDate.getMinutes()) * 60 * 1000;
  const millisUntilEndSecond =
    (endTime.seconds - currentDate.getSeconds()) * 1000;
  const millisUntilEndTime =
    millisUntilEndHour + millisUntilEndMinute + millisUntilEndSecond;

  let totalMillisUntilEnd = millisUntilEndDay + millisUntilEndTime;

  if (totalMillisUntilEnd < 0) {
    totalMillisUntilEnd += 7 * 24 * 60 * 60 * 1000;
  }

  displayTimer(totalMillisUntilEnd);

  setInterval(function () {
    totalMillisUntilEnd -= 1000;

    if (totalMillisUntilEnd <= 0) {
      totalMillisUntilEnd += stopDuration + 7 * 24 * 60 * 60 * 1000;
    }

    displayTimer(totalMillisUntilEnd);
  }, 1000);
}

function displayTimer(milliseconds) {
  const timer = document.getElementById("timer");

  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  const formattedTime = `${formatTime(days)}:${formatTime(hours)}:${formatTime(
    minutes
  )}:${formatTime(seconds)}`;

  timer.textContent = formattedTime;
  return timer;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Countdown to every Friday at 8 PM, pausing for 2 hours
const countdown = startWeeklyTimer(
  "Friday",
  { hours: 20, minutes: 0, seconds: 0 },
  2 * 60 * 60 * 1000
);
