const nanoid=(t=21)=>{let e="",r=crypto.getRandomValues(new Uint8Array(t));for(;t--;){let n=63&r[t];e+=n<36?n.toString(36):n<62?(n-26).toString(36).toUpperCase():n<63?"_":"-"}return e};

const form = document.querySelector('form');
const rangeElement = document.querySelector('input[type="range"]');
const inputElement = document.querySelector('input[type="text"]');
const button = document.querySelector('.refresh');
const copy = document.querySelector('.copy');
const copyImage = document.querySelector('.copy img')

const id = number => nanoid(parseInt(number, 10));
const createId = number => inputElement.value = id(number);
const changeImagePath = path => copyImage.src = `images/${path}`;

createId(rangeElement.value);

form.addEventListener('submit', event => event.preventDefault());
rangeElement.addEventListener('change', event => createId(event.currentTarget.value));
button.addEventListener('click', () => createId(rangeElement.value));

copy.addEventListener('click', () => {
  navigator.clipboard.writeText(inputElement.value)
    .then(() => changeImagePath('done.svg'),
      () => changeImagePath('error.svg'))
    .then(() => {
      setTimeout(() => changeImagePath('copy.svg'), 1000);
  });
});