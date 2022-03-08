// As the last step of your lab, hook this up to index.html

function dataHandler(dataArray) {
    console.table(dataArray); 
    const range = [...Array(15).keys()];
    range.forEach(item => {
        console.log('range item', item);
    })
}
async function mainEvent() { // the async keyword means we can make API requests
  const form = document.querySelector('.lab-form');
  const submit = document.querySelector('.form-row button');
  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  if (arrayFromJson.data.length > 0) {

  form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
    submitEvent.preventDefault(); // This prevents your page from refreshing!
    console.log('form submission'); // this is substituting for a "breakpoint"
    submit.getElementsByClassName.display = 'block';
  
     // this is called "dot notation"
    // arrayFromJson.data - we're accessing a key called 'data' on the returned object
    // it contains all 1,000 records we need
    dataHandler(arrayFromJson.data());
  
  });

}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
