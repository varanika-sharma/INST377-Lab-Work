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
  // console.log(collection);
  const targetList = document.querySelector('#resto-list');
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const {name} = item;
    const displayName = name.toLowerCase();
    const injectThis = `<li>${item.name}</li>`;
    targetList.innerHTML += injectThis;
  });
}
function initMap() {
  const map = L.map('map').setView([38.784, -76.872], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
  }).addTo(map);
  return map;
}
function addMapMarkers(map, collection) {
  let count = 0;
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      // console.log(layer);
      layer.remove();
    }
  });
  collection.forEach((item) => {
    const point = item.geocoded_column_1?.coordinates;
    console.log(item.geocoded_column_1?.coordinates);
    L.marker([point[1], point[0]]).addTo(map);
    if (count === 0) {
      map.panTo([point[1],point[0]]);
      count += 1;
    }
  });
}
async function mainEvent() { // the async keyword means we can make API requests
  console.log('submission loaded');
  const form = document.querySelector('.lab-form');
  const submit = document.querySelector('.btn');
  const resto = document.querySelector('#resto_name');
  const zipcode = document.querySelector('#zipcode');
  const map = initMap();
  submit.style.display = 'none';
  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  console.log(arrayFromJson);
  localStorage.setItem('restaurants', JSON.stringify(arrayFromJson));
  const storedData = localStorage.getItem('restaurants');
  console.log(storedData);
  if (arrayFromJson.data.length > 0) { // This is to prevent a race condition on data load
    submit.style.display = 'block';
    let currentArray = [];
    resto.addEventListener('input', async (event) => {
      console.log(event.target.value);
      if (currentArray.length < 1) {
        return;
      }

      const selectedResto = currentArray.filter((item) => {
        const lowerName = item.name.toLowerCase();
        const lowerValue = event.target.value.toLowerCase();
        return lowerName.includes(lowerValue);
      });

      console.log(selectedResto);
      if (selectedResto.length > 0) {
        createHtmlList(selectedResto);
        addMapMarkers(map, selectedResto);
      } else if (layer instanceof L.Marker) {
        layer.remove();
      }
    });
    zipcode.addEventListener('input', async (numevent) => {
      console.log(numevent.target.value);
      if (currentArray.length < 1) {
        return;
      }
      const zipResto = currentArray.filter((num) => num.zip.includes(numevent.target.value));
      console.log(zipResto);
      if (zipResto.length > 0) {
        createHtmlList(zipResto);
        addMapMarkers(map, zipResto);
      } else if (layer instanceof L.Marker) {
        layer.remove();
      }
    });
    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      // console.log('form submission'); // this is substituting for a "breakpoint"

      // this is called "dot notation"
      // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need
      currentArray = restoArrayMaker(arrayFromJson.data);
      console.log(currentArray);
      createHtmlList(currentArray);
      addMapMarkers(map, currentArray);
    });
  }
}
// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests