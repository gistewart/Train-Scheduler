$(document).ready(function() {

    // Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyCNQyqD5E_ONJbubmNqtrhqGeCTH_DAWtc",
        authDomain: "my-first-firebase-projec-b48bb.firebaseapp.com",
        databaseURL: "https://my-first-firebase-projec-b48bb.firebaseio.com",
        projectId: "my-first-firebase-projec-b48bb",
        storageBucket: "my-first-firebase-projec-b48bb.appspot.com",
        messagingSenderId: "64082316541",
        appId: "1:64082316541:web:186428a5c9e8188b554294"
    };

    firebase.initializeApp(firebaseConfig);

    // Get a reference to the database service
    var database = firebase.database();

    // Capture Button Click
    $("#add-train").on("click", function(event) {
        // Capture user inputs and store them into variables
        var trainName = $("#name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var trainFirstTime = $("#first-train-input").val().trim();
        var trainFrequency = $("#frequency-input").val().trim();

        // Console log each of the user inputs
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainFirstTime);
        console.log(trainFrequency);

        //declare local temp object for holding train data
        var newTrain = {
            name: trainName,
            destination: trainDestination,
            firstTime: trainFirstTime,
            frequency: trainFrequency
        };

        //upload object to db
        database.ref().push(newTrain);

        //log to console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.firstTime);
        console.log(newTrain.frequency);

        //clear text boxes
        $("#name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");

        //to force a page refresh from the server to update the Next Arrival and Minutes Away times for the trains already in the table
        document.location.reload(true);

    });

    //Create Firebase event for adding a train to the db and making changes to the DOM
    database.ref().on("child_added", function(trainSnapshot) {
            console.log(trainSnapshot.val());

            // Store everything into a variable.
            var trainName = trainSnapshot.val().name;
            var trainDestination = trainSnapshot.val().destination;
            var trainFirstTime = trainSnapshot.val().firstTime;
            var trainFrequency = trainSnapshot.val().frequency;

            console.log(trainName);
            console.log(trainDestination);
            console.log(trainFirstTime);
            console.log(trainFrequency);

            //Calculate the Next Arrival and Minutes Away values

            // 1. First time (t minus 1 year)
            var trainFirstTimeConverted = "";
            trainFirstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");
            console.log(trainFirstTimeConverted);

            // 2. Current time
            var currentTime = moment();
            console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

            // 3. Difference between the times
            var diffTime = moment().diff(moment(trainFirstTimeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);

            // 4. Minutes since last train
            var trainRemainder = diffTime % trainFrequency;
            console.log(trainRemainder);

            // 5. Minutes until next train
            var trainMinutesTillTrain = trainFrequency - trainRemainder;
            console.log("MINUTES TILL TRAIN: " + trainMinutesTillTrain);

            // 6. Next Train arrival time
            var nextTrain = moment().add(trainMinutesTillTrain, "minutes");
            console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
            nextTrain = moment(nextTrain).format("hh:mm A");

            // Create the new row
            var newRow = $("<tr>").append(
                $("<td>").text(trainName),
                $("<td>").text(trainDestination),
                $("<td>").text(trainFrequency),
                $("<td>").text(nextTrain),
                $("<td>").text(trainMinutesTillTrain)
            );

            //Append the new row to the table 
            $("#train-schedule > tbody").append(newRow);

        }),

        function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        };

});