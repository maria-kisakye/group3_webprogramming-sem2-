//i. Explanation of async and await Keywords
// --async:
// When you declare a function with the async keyword, it automatically becomes an asynchronous function.
// This means the function will always return a Promise, even if you don't explicitly return one.
// If the function returns a value, that value is wrapped in a resolved Promise.
// If the function throws an error, the Promise is rejected.

// --await:
// The await keyword can only be used inside an async function.
// It pauses the execution of the async function until the Promise it is waiting for is resolved or rejected.
// If the Promise resolves, await returns the resolved value.
// If the Promise is rejected, await throws an error, which can be caught using try/catch.



// ii. Using async/await to Simplify Asynchronous Code
// Asynchronous code traditionally uses callbacks or Promises, which can become hard to read and maintain.
// async/await makes asynchronous code look and behave like synchronous code since the code is executed line by line.

//Using Callbacks:
function fetchData(callback) {  //a function called fetchdata is defined
    setTimeout(() => {        
      callback('https://api.agify.io/?name=meelad');//calls back the argument the fetchdata function
    }, 1000);
  }
  fetchData(function(result) {  //call the fetch data and pass a function with no name that will receive data passed from the fetchdata function
    console.log(result);  //print the result
  });

// //Using Promises (Chaining):
function fetchData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('https://api.agify.io/?name=meelad');
      }, 1000);
    });
  }
  
fetchData().then(result => {
    console.log(result);
  });

// //Using async/await:
async function fetchData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('Data fetched');
      }, 1000);
    });
  }
  async function run() {
    const result = await fetchData();
    console.log(result);
  }
  
  run();


//iii) using 'try' and 'catch' to handle errors in 'async/await' functions
async function fetchData(url) {
    try {
      // Await the fetch operation
      let response = await fetch(url);

      // Check if the response status is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Await the parsing of the JSON data
      let data = await response.json();

      // Return the data if everything is successful
      return data;
    } catch (error) {
      // Catch and handle any errors that occurred
      console.error('Error fetching data:', error);

      // Optionally, rethrow the error or return a default value
      throw error;
    }
  }

  // Usage example
  fetchData('https://api.agify.io/?name=meelad')
    .then(data => {
      console.log('Data received:', data);
    })
    .catch(error => {
      console.error('Error in fetchData:', error);
    });


//iv) comparing 'async/await' with Promises and callbacks

// Callbacks:
// Before Promises, asynchronous code was handled using callbacks.
// This often led to "callback hell," where deeply nested callbacks made the code hard to read and maintain.

// Promises:
// Promises improved upon callbacks by allowing chaining and better error handling.
// However, chaining multiple Promises can still lead to complex code.

// async/await:
// async/await simplifies asynchronous code even further by making it look like synchronous code.
// It also provides better error handling with try/catch.

// Advantages of async/await:
// Readability: Code is easier to read and understand.
// Error Handling: Errors can be handled using try/catch, which is more intuitive than chaining .catch() methods.
// Debugging: Debugging is easier because the code execution is more linear.


//iv)
//Promise-based code:
function divide(a, b) {
    return new Promise((resolve, reject) => {
        if (b === 0) {
            reject('Cannot divide by zero!'); // Step 1: Reject if dividing by zero
        } else {
            resolve(a / b);                   // Step 2: Resolve with the result
        }
    });
}

divide(10, 2)
    .then(result => console.log(result))      // Step 3: Log the result
    .catch(error => console.error(error));    // Step 4: Handle errors

//Converted to async/await:
async function divide(a, b) {
    if (b === 0) {
        throw new Error('Cannot divide by zero!'); // Step 1: Throw an error if dividing by zero
    }
    return a / b;                                 // Step 2: Return the result
}

async function run() {
    try {
        const result = await divide(10, 2);      // Step 3: Wait for the result
        console.log(result);                      // Step 4: Log the result
    } catch (error) {
        console.error(error);                     // Step 5: Handle errors
    }
}

run();
//Explanation of async/await:
// The divide function is now declared with async.
// The reject in the Promise is replaced with throw new Error().
// The .then() and .catch() are replaced with try/catch


//  Benefits of async/await:
// More readable and maintainable
// Easier error handling with try/catch
// No need for .then() chaining