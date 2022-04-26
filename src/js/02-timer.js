// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
/** замість window.alert() */
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let dateUnix = null;

const { input, startBtn, days_, hours_, minutes_, seconds_ } = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days_: document.querySelector('[data-days]'),
  hours_: document.querySelector('[data-hours]'),
  minutes_: document.querySelector('[data-minutes]'),
  seconds_: document.querySelector('[data-seconds]'),
};

startBtn.disabled = true;
startBtn.addEventListener('click', onStartClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < options.defaultDate) {
      return Notify.failure('Please choose a date in the future');
    }
    startBtn.disabled = false;
  },
};

/** згідно документації для запуску Flatpickr */
const flatP = flatpickr('#datetime-picker', options);

function onStartClick() {
  dateUnix = setInterval(setTime, 1000);
  startBtn.disabled = true;
  input.disabled = true;
}

function setTime() {
  const deltaTime = flatP.selectedDates[0].getTime() - Date.now();
  console.log(deltaTime);
    if (deltaTime < 700) {
      finishTimer();
      Notify.success('Timer off', { timeout: 7000 });
}
  const { days, hours, minutes, seconds } = convertMs(deltaTime);
  if (deltaTime > 0) {
    days_.textContent = days;
    hours_.textContent = hours;
    minutes_.textContent = minutes;
    seconds_.textContent = seconds;
  }
}

function finishTimer () {
  clearInterval(dateUnix);
  input.disabled = false;
  days_.textContent = '00';
  hours_.textContent = '00';
  minutes_.textContent = '00';
  seconds_.textContent = '00';
};

/** перед рендерингом інтефрейсу форматує значення часу */
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

/** підрахунок значень одиниць часу секунд, хвилин, годин, днів.
 *  де ms - різниця між кінцевою і поточною датою в мілісекундах.
*/
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
