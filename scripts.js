// window.addEventListener('load', () => {
//     // registerSW();

// })


new Vue({
    el: '#LastFM',
    data() {
        return {
            myArtists: null,
            cachedTimeStamp: {},
            errorState: false
        }
    },
    mounted() {
        getTopArtists: {
            if (localStorage.cachedArtists) {
                this.myArtists = JSON.parse(localStorage.getItem('cachedArtists') || []);
                this.cachedTimeStamp = JSON.parse(localStorage.getItem('cachedTimestamp') || [])
            }

        }
    },
    methods: {
        updateTopArtists: function(e) {
            axios
                .get("https://ws.audioscrobbler.com/2.0/?api_key=2c5c5c19e5d21ce9cf86b13712a1bbed&format=json&method=user.getTopArtists&user=El_Mayo&period=overall&limit=200")
                .then(response => this.myArtists = response.data.topartists.artist)
                .then(response => localStorage.setItem('cachedArtists', JSON.stringify(this.myArtists)))
                .then(response => this.cachedTimeStamp = { time: new Date().toLocaleString() }).then(response => localStorage.setItem('cachedTimestamp', JSON.stringify(this.cachedTimeStamp)))
                .catch(function(error) {
                    console.log(error)
 
                        this.errorState = true

                });
        }
    },
    computed: {
        backgroundImage: function() {
            return (artist) => artist.image.find(size => size.size === 'large')['#text']
        }
    }
})

//localStorage.clear();