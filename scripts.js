new Vue({
    el: '#LastFM',
    data() {
        return {
            myArtists: null,
            recentTracks: null,
            cachedTopArtistsTimeStamp: {},
            cachedRecentTracksTimeStamp: {},
            errorState: false,
            cachedArtists: null,
            autoMode: false,
            nowPlaying: false,
            currentPage: 1,

        }
    },
    mounted() { },
    methods: {
        createRecentTracksQueryString: function (e) {
            let queryString = "https://ws.audioscrobbler.com/2.0/?api_key=2c5c5c19e5d21ce9cf86b13712a1bbed&format=json&method=user.getrecenttracks&user=El_Mayo&period=overall&limit=100"
            let page = this.currentPage
            let limit = 100
            let offset = (page - 1) * limit
            queryString += `&page=${page}&limit=${limit}&offset=${offset}`
            return queryString
        },

        updateTopArtists: function (e) {
            axios
                .get(queryString) //can I grab a .val() from the markup and splice it into the limit?
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
        updateRecentTracks: function (e) {
            axios
                //get all tracks and paginate
                .get(this.createRecentTracksQueryString())
                .then(response => this.recentTracks = response.data.recenttracks.track)
                .then(response => localStorage.setItem('cachedRecentTracks', JSON.stringify(this.recentTracks)))
                .then(response => this.cachedRecentTracksTimeStamp = { time: new Date().toLocaleString() })
                .then(response => localStorage.setItem('cachedRecentTracksTimeStamp', JSON.stringify(this.cachedRecentTracksTimeStamp)))
                .catch((error) => {
                    this.errorState = true;
                    if (localStorage.cachedRecentTracks) {
                        this.cachedRecentTracks = true
                        this.recentTracks = JSON.parse(localStorage.getItem('cachedRecentTracks') || []);
                        this.cachedRecentTracksTimeStamp = JSON.parse(localStorage.getItem('cachedRecentTracksTimeStamp') || [])

                    }
                });
        },
    },
    computed: {
        backgroundImage: function () {
            return (artist) => artist.image.find(size => size.size === 'large')['#text']
        },
        getTimeSincePlay: function (e) {
            let now = getTime();
            playTime = track.date.uts;
            timeSincePlay = now - playTime;
        },
        currentTime: function () {
            new Date().getTime()
            console.log(new Date().getTime())
        }

    },
    watch: {
        autoMode: function (e) {
            if (this.autoMode) {
                setInterval(this.updateRecentTracks, 5000);

            } else {
                clearInterval(this.updateRecentTracks, 1000)
            }

            // },
            // nowPlaying: function(e) {

            //   let nowPlayingIsTrue = this.recentTracks.filter(track => 'track.@attr.nowplaying' == "true" )

            //     if (nowPlayingIsTrue) {
            //         console.log("something is playing");
            //         this.nowPlaying == "true";
            //     }
            //     else{
            //       console.log("Nothing is playing");
            // this.nowPlaying = "false"
            //     }
        }

    }
})
