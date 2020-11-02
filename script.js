// NAMESPACE
const happy = {};


happy.url = 'https://spreadsheets.google.com/feeds/list/1H5S6Vc-gCOCKLvQmfjfJmG2THtDb5Z_LQGaZJpWZQ4c/1/public/values?alt=json';

// happy.msToHr = (ms) => {
    
//     ms = 1000 * Math.round(ms / 1000); // round to nearest second
//     let date = new Date(ms);

//     date = date.toTimeString(); // convert to 'yr day hr:mn:sc'

//     date = d.split(' ')[0]; // convert to hr:mn:sc

//     return date;

// }


// takes in data // returns individual song row
happy.buildSong = (songData) => {
        let songTitle = songData.gsx$songtitle.$t;
        let songArtist = songData.gsx$artist.$t;

        let ms = songData.gsx$durationms.$t;
        // use ms convert fn
        // happy.msToHr(ms);
        ms = 1000 * Math.round(ms / 1000); // round to nearest second
        var d = new Date(ms);
        d = d.toTimeString();
        d = d.split(' ')[0]; // access hr:mn:sc

        

        let mins = parseInt(d.split(':')[1]); // remove 0
        let secs = d.split(':')[2]; // remove hr

        let minTime = mins + ':' + secs; // concat result
        

        const template = document.getElementById('songRow');
        
        let blankLi = template.content.querySelector("li"); // li to be replicated
        let songRow = document.importNode(blankLi, true);
        
        songRow.querySelector('.songTitle').textContent = songTitle;
        songRow.querySelector('.songArtist').textContent = songArtist;
        songRow.querySelector('.runTime').textContent = minTime;

        return songRow;

}

// use full "entry" array to populate page header
happy.populateHeader = (items) => {
    // where ITEMS is the array of song objs
    let totalSongs = items.length;

    let songDurationArray = items.map((song) => {
        return song.gsx$durationms.$t;
    });
    console.log(songDurationArray);

    // build reduce fn
    const reducer = (a, b) => {
        return a + b;
    };

    // let durationInMs = songDurationArray.reduce(reducer);
        
    document.getElementById('duration').textContent = songDurationArray.reduce(reducer);

    document.getElementById('songCount').textContent = totalSongs;
}


happy.populateList = () => {
    //get data from bitly json info
    const apiCall = function () {
        fetch(happy.url)
            .then(function (response) {
                if (response.status !== 200) {
                    console.log(
                        'Looks like there was a problem. Status Code: ' + response.status
                    );
                    return;
                }
                // accessing data
                response.json().then(function (data) {
                    const items = data.feed.entry;
                    console.log(items);

                    // TODO sort me
                    let songs = [];

                    items.forEach((songData) => {
                        // var holds each func call /temp build per item
                        let songRow = happy.buildSong(songData);
                        // send each build template into the array
                        songs.push(songRow);
                        // build them into the songList one by one
                        document.getElementById('songList').append(songRow);
                    }); // end foreach

                    happy.populateHeader(items);
                }); // end response 'then'
            }) // end fetch 'then'

            // if shit don't work
            .catch(function (err) {
                alert('data error', err);
            });
    }
    apiCall();
}





happy.domReady = (fn) => {
    // If we're early to the party
    document.addEventListener('DOMContentLoaded', fn);
    // If late, aka on time.
    if (
        document.readyState === 'interactive' ||
        document.readyState === 'complete'
    ) {
        happy.populateList();
    }
}




//INIT FUNCTION
happy.init = () => {
    happy.domReady();
};

//DOCUMENT READY FUNCTION
document.addEventListener("DOMContentLoaded", function () {
    happy.init();
    
});
