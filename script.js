// NAMESPACE
const happy = {};

// TODO MAKE DISPLAY DYNAMIC IN REGARDS TO WHAT SONGS ARE HAPPIEST??

happy.url = 'https://spreadsheets.google.com/feeds/list/1H5S6Vc-gCOCKLvQmfjfJmG2THtDb5Z_LQGaZJpWZQ4c/1/public/values?alt=json';


// TODO make function to get heart and ellipsis to appear on song hover
happy.show = () => {
    let showMe = document.getElementById('showMe');
    let songRow = document.getElementById('songRow');
    songRow.onmouseover = function (event) {
        // highlight the mouseenter target
        showMe.classList.add('show');
    };
    songRow.onmouseout = function(event) {
        showMe.classList.remove('show');
    }
}


// takes in data // returns individual song row
happy.buildSong = (songData) => {
        let songTitle = songData.gsx$songtitle.$t;
        let songArtist = songData.gsx$artist.$t;

        // TODO seconds to ms build external func?
        var ms = songData.gsx$durationms.$t;
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
                    console.log(data);
                    const items = data.feed.entry;

                    // TODO The contents of the playlist should be 100 songs listed from “happiest” to “least happy”.
                    let songs = [];

                    items.forEach((songData) => {
                        // var holds each func call /temp build per item
                        let songRow = happy.buildSong(songData);
                        // send each build template into the array
                        songs.push(songRow);
                        // build them into the songList one by one
                        document.getElementById('songList').append(songRow);
                        
                    });
                });
            })
            // if shit don't work
            .catch(function (err) {
                alert('data error:', err);
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
    happy.show();
};

//DOCUMENT READY FUNCTION
document.addEventListener("DOMContentLoaded", function () {
    happy.init();
    
});
