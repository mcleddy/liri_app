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
    }
}
userCommand(userInput, userQuery);

function concertThis() {
    console.log(`\n---Finding the show for...${userQuery}`);
    request("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=441bf070-d681-48da-8be5-16620faac1a0" + bandsIntown.response, body)
    {
        let newBand = JSON.parse(body);
        if (newBand.length > 0) {
            for (i = 0; i < 1; i++) {

                //console data
                console.log(`\n Here is your information!: ${newBand[i].lineup[0]}
                \n Venue: ${newBand[i].venue.name}\n Concert Location: ${newBand[i].venue.city}`)

                let concertDate = moment(newBand[i].datetime).format("MM/DD/YYYY");
                console.log(`Date and Time: ${concertDate}\n---`);
            };
        } else {
            console.log("Sorry, information not found.")
        };
    };
}

function spotifyThis(){
    console.log(`\n--Findig "${userQuery}"`);

    spotify.search({ type: `track`, query: userQuery, limit: 1}, function (error, data){
        if (error) {
            return console.log("error occured");
        }
        let spotifyAray =data.tracks.items;
        for (i=0; i< spotifyAray.length; i++){
            console.log(`\n Artist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name} \nLink: ${data.tracks.items[i].external_urls.spotify} \nAlbum: ${data.tracks.items[i].album.name}`)
        }
    })

}