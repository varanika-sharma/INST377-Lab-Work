/* eslint-disable array-callback-return */
// As the last step of your lab, hook this up to index.html
function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin);
}
function restoArrayMaker(dataArray) {
  // console.table(dataArray);
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, dataArray.length - 1);
    return dataArray[restNum];
  });
    // console.log(listItems);
  return listItems;
  // range.forEach((item) => {
  // console.log('range item', item);
  // });
}
function createHtmlList(collection) {
  // console.log('created HTML creator');
  // console.table(collection);
  const targetList = document.querySelector('#resto-list');
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const {name} = item;
    const displayName = name.toLowerCase();
    const injectThis = `<li>${item.name}</li>`;
    targetList.innerHTML += injectThis;
  });
}
async function mainEvent() { // the async keyword means we can make API requests
  console.log('submisson loaded');
  const form = document.querySelector('.lab-form');
  const submit = document.querySelector('.btn');

  const resto = document.querySelector('#resto_name');
  const zipcode = document.querySelector('#zipcode');
  submit.style.display = 'none';
  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  console.log(arrayFromJson);
  if (arrayFromJson.data.length > 0) { // This is to prevent a race condition on data load
    submit.style.display = 'block';
    const currentArray = [];
    resto.addEventListener('input', async (event) => {
      if (currentArray === undefined) { return; }
      const matchResto = currentArray.filter((item) => {
        console.log(item);
        item.name.includes(event.target.value);
      });
      // console.log(matchResto);
    });
    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      console.log('form submission'); // this is substituting for a "breakpoint"

      // this is called "dot notation"
      // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need
      const restoArray = restoArrayMaker(arrayFromJson.data);
      createHtmlList(restoArray);
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
