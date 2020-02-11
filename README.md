# Firebase-Train-Scheduler
[Firebase database train scheduler](https://seanrichter.github.io/Train-Scheduler/)

**Object**

The goal of this assignment is to:
1. Set up a Firebase key to store data
1. Create a front end in which user can enter data, which in turn populates train schedule
1. Use Moment.js to create formulas for minutes til arrival, etc.

Because this is backend, rather than client-side storage, the data persists regardless of browser, platform, etc.

***Technology used***

This pages uticlizes HTML, CSS, JavaScript, jQuery, Bootstrap, Firebase and the Moment.js library.

I'll be honest. This one threw me for a loop. In class we'd been calling APIs with AJAX and extracting from the JSON-formatted data what we wanted on the screen, e.g. GIPHYs, movie summaries, etc. Like so:

    $.ajax({
    url: queryURI,
    method: "GET"
    }).then(function (response) {
    for (var i = 0; i < response.data.length; i++) {

For this assignment, rather than calling an existing database, we created our own that user input is stored in:

    database.ref().push(newTrain);


    database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

Children ... snapshots ... childSnapshots ... the syntax sounds so lighthearted. But I've learned through this assignment that Firebase is a powerful tool and -- once you can think of it as a big 'ol filing cabinet with lots of subfolders -- it's not so intimidating after all.