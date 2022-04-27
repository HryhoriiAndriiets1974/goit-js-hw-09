/** замість window.alert() */
import { Notify } from 'notiflix/build/notiflix-notify-aio';

document.querySelector('.form').addEventListener('submit', repetition);

function repetition(e) {
  e.preventDefault();
  let delay = Number(e.target.delay.value);
  const step = Number(e.target.step.value);
  const amount = Number(e.target.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }, delay)
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
     delay += step;
  };
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
            // Fulfill
            resolve({ position, delay });
          } else {
            // Reject
            reject({ position, delay });
          }
  }, delay);
  });
}
