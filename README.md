# pexTechChallenge

live:
https://brennamacquarrie.github.io/pexTechChallenge/

# Credit

spotify icon - marilyn scott from freepnglogos.com

album titles and art from the last.fm api

# Process

I would say I spent the better part of two separate days working on the challenge. I added bits and pieces here and there (you can see from the commits), but the largest chunks of work I did were building the two separate API calls.

Of course the first one I worked in was the bitly link I was sent from Pex. 
I've been working in React a lot lately so I had to refresh my memory on using fetch as opposed to axios (and consiered using ajax but... ultimately went with a simple fetch method!). 

Using the <template> element was something new that I hadn't tried before (meant to hold html that isn't to be loaded immediately), but I liked that it let me keep my HTML inside the ... html doc. I found some really helpful articles on this from MDN and johnpapa.net. 

For a minute I was using the kanye.rest API to populate the album titles (it was pretty ridiculous and entertaining), but the last.fm actually let me use accurate album covers and song titles (!). Deciding where to call this API was a challenge for me. I wanted it to be in it's own function (the buildSong() fn is a bit of an eyesore), but the execution context confused me enough that I chose to keep that function as-is for now. In the future, I'd take the time to refresh my knowledge of asynchronous functions and build it using async/await. 
I also took a few tries to get the function that converts ms to hours, because I wanted to have that function handle as much as possible without needing to deal with it elsewhere. I'm sure there are a lot of different ways of doing this conversion, and I would try for something simpler in the future.

As for the styling, I chose to use SASS, because I find it keeps everything more organized for me. I try to keep really clean/dry code (this is especially valuable to me when I'm building in css). I try to comb through regularly for redundancy. 
I decided to use grid for the <main> section, although I'm more comfortable with flexbox. The grid was great but it didn't allow me to drop an ellipsis on the song titles that overlapped (underlapped?) the adjacent (album title) section. This is why I gave them set px widths. I made the app responsive on web, but on mobile, these widths render the site with a horizontal scroll. I wasn't sure if I was supposed to be testing for mobile, and preferred to spend my time on other parts of the functionality for this specific challenge!
  
As an avid spotify user (and an artist myself; I have a lot of music on Spotify and use their artist portal as well), I was stoked to build this page. I couldn't quite get the right font for the playlist title, but it's close. I had a good time building some hover states (like the reveal of the heart and ellipsis on each song).

If I were to spend more time on the design, I'd fix the mobile issues (and test it further cross-browser; Safari occasionally gives me brainfreeze), and I'd add some more fidelity to the responsiveness of (what I'm calling) the song list. 
