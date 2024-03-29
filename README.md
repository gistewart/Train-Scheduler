# Train-Scheduler

## Project Functionality
This is an exercise for web browsers where the user enters details for train arrivals via a form and then hits submit. Even though the form clears (to allow the details of a new train to be entered) the previously submitted train details are stored in a Firebase database on the backend.  This example of persistent storage means that the details of all trains (together with some calculated values) can be listed in a table in the browser. 

## Project Challenges
The main challenges of this project, and the solutions used, were as follows:
1. storing and displaying train updates in such a way that different users on different browsers would see the same info: achieved by using a Firebase database on the back end
2. performing calculations involving times: achived by using the moment.js library
3. capturing user clicks and displaying info from the database in a table in the browser: achieved by using the jQuery library

## Project Usefulness
There are 3 main areas of note:
1. It uses Firebase to store the details of all the trains
2. It uses the moment.js library to perform time calculations
3. It uses the jQuery library including click events and DOM manipulation 

## How to get started
On page load, the user just needs to add a train's details via the Submit button. As Firebase recognizes new data being added, it appends a new row to the table in the browser.   

## How to get help
[jQuery Official Website](https://jquery.com/)
[Moment Official Website](https://momentjs.com/)
[Firebase Official Website](https://firebase.google.com/)

## Project maintenance and contributions
This is not an original game.  Instead, this project was prepared as part of an assignment for Georgia Tech's Coding Boot Camp.

## Deployed link
https://gistewart.github.io/Train-Scheduler/



