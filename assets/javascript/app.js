console.log("hello world");
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo0XfpVHctEv9A38T5OGEIK-aFPGHPT68",
  authDomain: "train-scheduler-ba6c4.firebaseapp.com",
  databaseURL: "https://train-scheduler-ba6c4.firebaseio.com",
  projectId: "train-scheduler-ba6c4",
  storageBucket: "train-scheduler-ba6c4.appspot.com",
  messagingSenderId: "881794318336",
  appId: "1:881794318336:web:631d8ded14e539d523d8e5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const admin = require("firebase-admin");
admin.initializeApp();

// Database
var database = firebase.database();

// FIREBASE WATCHER + INITIAL LOADER - updates or snapshot everytime a child is added to database
database.ref().on("child_added", function(childSnapshot) {
  // creates the row in the table with the values from the firebase database
  var row = $("<tr>");
  row.html(
    "<td>" +
      childSnapshot.val().name +
      "</td>" +
      "<td>" +
      childSnapshot.val().city +
      "</td><td>" +
      childSnapshot.val().rate +
      "</td><td>" +
      childSnapshot.val().arrival +
      "</td><td>" +
      childSnapshot.val().minutes +
      "</td>" +
      "<td>" +
      "<button class='remove btn btn-default'>Remove</button>" +
      "</td>"
  );
  $("#table").append(row);
});

$("#submit-train").on("click", function() {
  event.preventDefault();

  var trainName = $("#name")
    .val()
    .trim();
  var destination = $("#destination")
    .val()
    .trim();
  var firstTrain = $("#first-train")
    .val()
    .trim();
  var tFrequency = $("#frequency")
    .val()
    .trim();

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTrain, "hh:mm")
    .subtract(1, "years")
    .toString();
  console.log(firstTimeConverted);

  // // current time
  var currentTime = moment().format();

  // Difference between the times
  var diffTime = moment().diff(firstTimeConverted, "minutes");

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;

  // Next Train
  var nextTrain = moment()
    .add(tMinutesTillTrain, "minutes")
    .format("hh:mm");

  // Pushing values to the firebase database
  database
    .ref()
    .set({
      name: trainName,
      city: destination,
      rate: tFrequency,
      arrival: nextTrain,
      minutes: tMinutesTillTrain
    });

  // after submit set the value of each input field to an empty string

  $("#name").val(" ");
  $("#destination").val(" ");
  $("#first-train").val(" ");
  $("#frequency").val(" ");
});

$(document.body).on("click", ".remove", function() {
  // get constant trId / database ID
  var buttonGradparentId = $(this)
    .parent()
    .parent()
    .attr("id");

  // remove from database
  var removeRef = database.ref(buttonGradparentId);
  removeRef.remove();

  // remove from HTML
  $(this)
    .parent()
    .parent()
    .remove();
});
