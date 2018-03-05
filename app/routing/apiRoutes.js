// The data source that holds array of information on all possible matches
var friends = require('../data/friends');

module.exports = function (app) {
    // get request sends back array of available characters to user
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
    // post request using newUser as parameter for req
    app.post("/api/friends", function (req, res) {
        var newUser = req.body;
        // creating an array that will store the calculated difference in scores
        var differencesArray = [];
        // goes through each character in avengers array
        for (i=0; i < friends.length; i++) {
           var friendScore = friends[i].scores;
           var difference = []
        // compares each avenger score array to user score array
           for (j=0; j < friendScore.length; j++) {
               // going through each index to compare scores and stores difference in difference array
                difference.push((Math.abs(friendScore[j] - newUser.scores[j])));
            }
            // this takes the difference array and sums up the difference per character, so it has one total value
            reducedDifference = difference.reduce(function (accumulator, currentValue) {
                return accumulator + currentValue;
            });
            //stores result value into array
            differencesArray.push(reducedDifference);
        }
        //from the differencesArray, we take the smallest value (min), which matches the smallest difference / score AKA most compatible
        var matchingIndex = differencesArray.indexOf(Math.min(...differencesArray));
        //mathes index of said min difference and returns character from avengers array at that index
        res.json(friends[matchingIndex]);
    });
}