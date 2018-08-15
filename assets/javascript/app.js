var config = {
  apiKey: "AIzaSyBD8BWnPeg6pFNFFO8rxZ3SFJVdNxWVzSM",
  authDomain: "fir-demo-03-day.firebaseapp.com",
  databaseURL: "https://fir-demo-03-day.firebaseio.com",
  projectId: "fir-demo-03-day",
  storageBucket: "fir-demo-03-day.appspot.com",
  messagingSenderId: "528774204732"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var name = "";
var role = "";
var startDate = "";
var monthlyRate = "";

// Capture Button Click
$("#add-employee").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text boxes
  name = $("#name-input").val().trim();
  role = $("#role-input").val().trim();
  startDate = $("#startDate-input").val().trim();
  monthlyRate = $("#monthlyRate-input").val().trim();

  // Code for handling the push
  database.ref().push({
    name: name,
    role: role,
    startDate: startDate,
    monthlyRate: monthlyRate,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function(snapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();
  // Console.loging the last user's data
  console.log(sv.name);
  console.log(sv.role);
  console.log(sv.startDate);
  console.log(sv.monthlyRate);

  dataRef.ref().on("child_added", function(childSnapshot) {
      
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().monthlyRate);
    
    // full list of items to the well
    $("#full-member-list").append("<div class='well'><span class='member-name'> " + childSnapshot.val().name +
      " </span><span class='member-role'> " + childSnapshot.val().role +
        " </span><span class='member-startDate'> " + childSnapshot.val().startDate +
          " </span><span class='member-monthlyRate'> " + childSnapshot.val().monthlyRate + " </span></div>");
          
    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
      
  dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);
    $("#role-display").text(snapshot.val().role);
    $("#startDate-display").text(snapshot.val().startDate);
    $("#monthlyRate-display").text(snapshot.val().monthlyRate);
  });


}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});