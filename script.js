// NAMESPACE
const happy = {};

// happy.url = 'https://bit.ly/3mOKGpu';


// TODO make function to get heart and ellipsis to appear on song hover
happy.show = () => {
    songRow.onmouseover = function (event) {
        // highlight the mouseenter target
        event.target.classList.add('show');
    };
    songRow.onmouseout = function(event) {
        event.target.classList.remove('show');
    }
}

// takes in data // returns individual song row
happy.buildSong = (songData) => {
        let songTitle = songData.gsx$songtitle.$t;
        let songArtist = songData.gsx$artist.$t;
        let runTime = (songData.gsx$durationms.$t / 6000).toFixed(1); 
        // TODO: DISPLAY as TIME with : not .
        let minTime = runTime / Math.pow(10, 1);
        

        const template = document.getElementById('songRow');
        
        let blankLi = template.content.querySelector("li"); // li to be replicated
        let songRow = document.importNode(blankLi, true);
        
        songRow.querySelector('.songTitle').textContent = songTitle;
        songRow.querySelector('.songArtist').textContent = songArtist;
        songRow.querySelector('.runTime').textContent = minTime.toFixed(2);

        return songRow;

}

happy.populateList = () => {
    //get data from bitly json info
    const apiCall = function () {
        fetch('https://spreadsheets.google.com/feeds/list/1H5S6Vc-gCOCKLvQmfjfJmG2THtDb5Z_LQGaZJpWZQ4c/1/public/values?alt=json')
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

                    let songs = [];

                    items.forEach((songData) => {
                        let songRow = happy.buildSong(songData);
                        songs.push(songRow);
                        // console.log(songRow);
                        document.getElementById('songList').append(songRow);
                    });
                    // console.log(songs);
                });
            })
            .catch(function (err) {
                alert('data error');
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
