// NAMESPACE
const happy = {};

happy.url = 'https://spreadsheets.google.com/feeds/list/1H5S6Vc-gCOCKLvQmfjfJmG2THtDb5Z_LQGaZJpWZQ4c/1/public/values?alt=json';

happy.urlFm = 'https://ws.audioscrobbler.com/2.0/?';



happy.msToHr = function (ms) {
    ms = 1000 * Math.round(ms / 1000); // round to nearest second
    let date = new Date(ms);

    date = date.toTimeString(); // convert to 'yr day hr:mn:sc'
    date = date.split(' ')[0]; // convert to 'hr:mn:sc'

    return date;
}



// returns individual song row HEFFER
happy.buildSong = function (songData) {

    let songTitle = songData.gsx$songtitle.$t;
    let songArtist = songData.gsx$artist.$t;
    
    let dateAdded = songData.updated.$t; // nopes
    let dateDisplay = dateAdded.split('T')[0]; // nope
    
    let ms = songData.gsx$durationms.$t;
    let hours = happy.msToHr(ms);
    let mins = parseInt(hours.split(':')[1]); 
    let secs = hours.split(':')[2]; 
    let minTime = mins + ':' + secs;     
    
    // send into display
    const template = document.getElementById('songRow');
    let blankLi = template.content.querySelector("li"); // li to be replicated
    let songRow = document.importNode(blankLi, true); 

    const defaultArtSrc = './assets/blacksquaresm.jpg';

    fetch(happy.urlFm + new URLSearchParams({ 
        // use to find the song
        artist: songArtist, 
        track: songTitle,
        api_key: '336b30502e006ae458bb4b22b9645319',
        format: 'json',
        // from documentation 
        method: 'track.getInfo',
    })).then((res) => {
        res.json().then((body) => {
            let albumTitle = body.track?.album?.title;
            let artwork = body.track?.album?.image[0];

            // dealing with undefined from alt data
            if (artwork['#text']) {
                songRow.querySelector('.songImg').src = artwork['#text']; 
            } else {
                songRow.querySelector('.songImg').src = defaultArtSrc;
            }

            // dealing with undefined from alt data
            if (body.track?.album?.title) {
                songRow.querySelector('.album').textContent = albumTitle;
            } else {
                songRow.querySelector('.album').textContent = '';
            }
        });
    });

    songRow.querySelector('.songTitle').textContent = songTitle;
    songRow.querySelector('.songArtist').textContent = songArtist;
    songRow.querySelector('.runTime').textContent = minTime;
    songRow.querySelector('.date').textContent = dateDisplay;

    return songRow;
}



// to send data into Header
happy.populateHeader = function (items) {
    let totalSongs = items.length;

    // pulling all durations out of song obj
    let songDurationArray = items.map((song) => {
        return song.gsx$durationms.$t;
    });

    const reducer = (a, b) => {
        return Number.parseInt(a) + Number.parseInt(b)
    };

    let totalMs = songDurationArray.reduce(reducer);

    let fullTime = happy.msToHr(totalMs); 

    let mins = parseInt(fullTime.split(':')[1]); 
    let hrs = parseInt(fullTime.split(':')[2]); 

    let displayTime = hrs + ' hr ' + mins + ' min';     
    
    document.getElementById('duration').textContent = displayTime;
    document.getElementById('songCount').textContent = totalSongs;
}



// on a scale of one to happy...
happy.sortFunction = function (a, b) {
    const songA = a.gsx$danceability.$t;
    const songB = b.gsx$danceability.$t;

    let comparison = 0;

    songA > songB ? comparison = 1 : comparison = -1;
    
    return comparison;
}



// fetch data from url
happy.populateList = function () {
    
    const apiCall = function () {
        fetch(happy.url)
            .then(function (response) {
                if (response.status !== 200) {
                    console.log(
                        'Looks like there was a problem. Status Code: ' + response.status
                    );
                    return;
                }
                // accessing data now
                response.json().then(function (data) {
                    const items = data.feed.entry;

                    items.sort(happy.sortFunction);
                    
                    let newSongs = [];
                    items.forEach((songData, i) => {
                        if (i < 100) {
                            let songRow = happy.buildSong(songData);
                            document.getElementById('songList').append(songRow);
                            newSongs.push(songData);
                        }
                    }); 
                    happy.populateHeader(newSongs);
                }); 
            }) 

            // if shit don't woyk
            .catch(function (err) {
                alert('data error', err);
            });
    }
    apiCall();
}


// make for go
happy.domReady = (fn) => {
    // If we're early to the party
    document.addEventListener('DOMContentLoaded', fn);
    // If late, aka on time
    if ( document.readyState === 'interactive' ||
        document.readyState === 'complete') {
        // ok, nowwwwww we can do shit.
        happy.populateList();
    } 
};

// iss ready init?
happy.init = () => {
    happy.domReady();
};

// THE FUNCTION TO RULE ALL FUNCTIONS
document.addEventListener("DOMContentLoaded", function () {
    happy.init();
});
