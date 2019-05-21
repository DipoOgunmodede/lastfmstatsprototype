// window.addEventListener('load', () => {
//     // registerSW();

// })


new Vue({
    el: '#LastFM',
    data() {
        return {
            myArtists: null,
            recentTracks: null,
            cachedTopArtistsTimeStamp: {},
            cachedRecentTracksTimeStamp: {},
            errorState: false,
            cachedArtists: null

        }
    },
    mounted() {},
    methods: {
        updateTopArtists: function(e) {
            axios
                .get("https://ws.audioscrobbler.com/2.0/?api_key=2c5c5c19e5d21ce9cf86b13712a1bbed&format=json&method=user.getTopArtists&user=El_Mayo&period=overall&limit=50") //can I grab a .val() from the markup and splice it into the limit?
                .then(response => this.myArtists = response.data.topartists.artist)
                .then(response => localStorage.setItem('cachedArtists', JSON.stringify(this.myArtists)))
                .then(response => this.cachedTopArtistsTimeStamp = { time: new Date().toLocaleString() })
                .then(response => localStorage.setItem('cachedTopArtistsTimeStamp', JSON.stringify(this.cachedTopArtistsTimeStamp)))
                .catch((error) => {
                    this.errorState = true;
                    if (localStorage.cachedArtists) {
                        this.cachedArtists = true
                        this.myArtists = JSON.parse(localStorage.getItem('cachedArtists') || []);
                        this.cachedTopArtistsTimeStamp = JSON.parse(localStorage.getItem('cachedTopArtistsTimeStamp') || [])
                    }
                });
        },
        updateRecentTracks: function(e) {
   //setInterval is NOT a good idea here
                axios
                    .get("https://ws.audioscrobbler.com/2.0/?api_key=2c5c5c19e5d21ce9cf86b13712a1bbed&format=json&method=user.getrecenttracks&user=El_Mayo&period=overall&limit=100")
                    .then(response => this.recentTracks = response.data.recenttracks.track)
                    .then(response => localStorage.setItem('cachedRecentTracks', JSON.stringify(this.recentTracks)))
                    .then(response => console.log(this.recentTracks['@attr'].find(status => nowplaying === true)))
                    .then(response => this.cachedRecentTracksTimeStamp = { time: new Date().toLocaleString() })
                    .then(response => localStorage.setItem('cachedRecentTracksTimeStamp', JSON.stringify(this.cachedRecentTracksTimeStamp)))
                    .catch((error) => {
                        this.errorState = true;
                        if (localStorage.cachedRecentTracks) {
                            this.cachedRecentTracks = true
                            this.recentTracks = JSON.parse(localStorage.getItem('cachedRecentTracks') || [])
                            this.cachedTopArtistsTimeStamp = JSON.parse(localStorage.getItem('cachedTopArtistsTimeStamp') || [])
                        }
                    });
      

        },
        continuousMode: function(e) {
            setInterval(function() {
                updateRecentTracks();
                updateTopArtists();
            }, 5000); //work on getting this as a modifier to other methods
        }
    },
    computed: {
        backgroundImage: function() {
            return (artist) => artist.image.find(size => size.size === 'large')['#text']
        }
    }
})

//localStorage.clear();