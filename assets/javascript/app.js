



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
    startDate: startdate,
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

  // Change the HTML to reflect
  $("#name-display").text(sv.name);
  $("#role-display").text(sv.role);
  $("#startDate-display").text(sv.startDate);
  $("#monthlyRate-display").text(sv.monthlyRate);

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});