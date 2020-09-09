// from data.js
var ufoData = data;
var json = JSON.stringify(ufoData)
console.log(json)

// const fs = require('fs');

// write JSON string to a file
filesystem.writeFile('data.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});

// YOUR CODE HERE!
console.log(data)

// create listeners for both the entry form and the button
// these variables will "listen" to an action that happens to that html element
var button = d3.select("#filter-btn");
console.log(button.html())
var form = d3.select(".form-control");
console.log(form.html())

// select the HTML node/element for the table body
var table = d3.select("tbody")

// create "event handlers" for each of the button and the form
// ".on('event', function)" will run a function based on an event that happens with the listener variable
button.on("click", runEnter);
form.on("change", runEnter);

// create the function for the event handler
function runEnter() {
    
    // prevent the page from refreshing
    d3.event.preventDefault();

    // clear out the tbody html element to populate the new info
    table.html(" ");

    // log with action dispatched the event
    console.log(d3.event.target)

    // store the event in a variable
    var inputValue = form.property("value");
    // log the input value to console
    console.log(`filtered form value: ${inputValue}`);

    var clickValue = button.property("value");
    console.log(`clicked button ${clickValue}`);

    // use .filter() function to filter the data to correspond to the date selected
    // we use the arrow function "=>" to minimize our script for elegance 
    // we use a boolean "===" to check for equality and object type
    var filteredUfo = ufoData.filter(sighting => sighting.datetime == inputValue);
    // log the filtered data to the console
    console.log(filteredUfo);

    // loop function. use ".forEach()" function to iterate through the array of objects
    // with each iteration we add a row and cells from the filtered data
    // we use the arrow function for elegance 
    filteredUfo.forEach(ufo => {
        console.log(ufo);
        // with each iteration we append a row "tr" to the table body element/node and store it as a variable "row"
        var row = table.append("tr");

        // we use "Object.entries()" function to break out the key and value of each entry in the object
        // we iterate through the array of entries with the .forEach() function to populate the HTML table with our script
        Object.entries(ufo).forEach(([key, value]) => {
            console.log(key, value);

            // we use the .append() function to add a "cell" element "td" to the row
            var cell = row.append("td");
            // for each "cell" we will write the value of the iterated object "value"
            cell.text(value);
        })
    })
}