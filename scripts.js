window.addEventListener('load', () => {
  // registerSW();

})

$(document).ready(function() {
  var apiUrl = 'https://ws.audioscrobbler.com/2.0/?api_key=2c5c5c19e5d21ce9cf86b13712a1bbed&format=json&method=user.getTopArtists&user=El_Mayo&period=overall&limit=200';
  var topArtists = [];
  $.getJSON(apiUrl, function(data) {
    $.each(data.topartists.artist, function(i, item) {
      currArtist = "<div class='artist p" + (i + 1) + "'> \
          <div class='pos'>" + (i + 1) + "</div> \
          <div class='nm'>" + data.topartists.artist[i].name + "</div> \
          <div class='pc'>" + data.topartists.artist[i].playcount + "</div> \
          </div>"
      $("#output").append(currArtist)
    });
  });
});

new Vue({
  el: '#LastFM',
  data() {
    return {
      myArtists: null
    }
  },
  mounted() {
    axios
      .get("https://ws.audioscrobbler.com/2.0/?api_key=2c5c5c19e5d21ce9cf86b13712a1bbed&format=json&method=user.getTopArtists&user=El_Mayo&period=overall&limit=200")
      .then(response => (this.myArtists = response.data.topartists.artist))
      .catch(error => console.log(error));

  },
})

// function registerSW() {
//     if ('serviceWorker' in navigator) {
//         navigator.serviceWorker.register('/sw.js');
//     }
// }
