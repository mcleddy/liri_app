require("dotenv").config();

let request = require("request");

let moment = require("moment");

const fs = require("fs");

const keys = require("./keys");

const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

let bandsIntown = (keys.bandsIntown);

//input stuff
let userInput = process.argv[2];
let userQuery = process.argv.slice(3).join(" ");

//functions
function userCommand(userInput, userQuery) {

    switch (userInput) {
        case "concert-this":
            concertThis();
            break;
        case "movie-this":
            movieThis();
            break;
        case "spotify-this":
            spotifyThis();
            break;
        case "do-this":
            doThis();
    }
}
userCommand(userInput, userQuery);

//concert search function
//I dont think that my call is returning anything
function concertThis() {
    console.log(`\nFinding a show for ${userQuery}`);
    request("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp" + function (error, response, body) {
        if (!error && response.statusCode === 200) {

            let newBand = JSON.parse(body);
            if (newBand.length > 0) {
                for (i = 0; i < 1; i++) {

                    //console data
                    console.log(`\n Here is your information!: ${newBand[i].lineup[0]}
                \n Venue: ${newBand[i].venue.name}\n Concert Location: ${newBand[i].venue.city}`)

                    //marking time
                    let concertDate = moment(newBand[i].datetime).format("MM/DD/YYYY");
                    console.log(`Date and Time: ${concertDate}\n---`);
                };
            } else {
                console.log("Sorry, information not found.")
            };
        };
    })
}

//song search function
function spotifyThis() {
    console.log(`\nFindig "${userQuery}"`);

    spotify.search({ type: `track`, query: userQuery, limit: 1 }, function (error, data) {
        if (error) {
            return console.log("error occured");
        }
        let spotifyAray = data.tracks.items;
        for (i = 0; i < spotifyAray.length; i++) {
            console.log(`\n Artist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name} \nLink: ${data.tracks.items[i].external_urls.spotify} \nAlbum: ${data.tracks.items[i].album.name}`)
        }
    })

}

//omdb search function
function movieThis() {
    console.log(`\nFinding "${userQuery}"`);
    if (!userQuery) { userQuery = "The Brave Little Toaster" };

    request("http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=982222fc", function (error, response, body) {
        let newMovie = JSON.parse(body);

        let ratingsArray = newMovie.Ratings
        if (ratingsArray.length > 2) {
        }
        if (!error && response.statusCode === 200) {
            console.log(`\nTitle: ${newMovie.Title} \nYear Released: ${newMovie.Year} \nRotten Tomatoes Rating: ${newMovie.Ratings[1].Value} \nIMDB Rating: ${newMovie.imdbRating} \nCountry of Production: ${newMovie.Country} \nLanguage: ${newMovie.Language} \nPlot: ${newMovie.Plot} \nActors: ${newMovie.Actors}`)
        }
        else {
            return console.log("Sorry, information not found.")
        };
    })
};

//do what it says function
function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        let dataArray = data.split(",");

        userInput = dataArray[0];
        userQuery = dataArray[1];
       
        userCommand(userInput, userQuery);
    });
};