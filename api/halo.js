// Gets the Required poackages
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// Api Keys
const config = {
    halo: {
        desc: 'ocp-apim-subscription-key',
        key: 'f4bfe0061ba84032b87aeb1c00600dc3'
    }
}

module.exports = {
    getPlayer: function (gamertag){
        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let res = JSON.parse(this.responseText);
                let player = res.Results[0];
                console.log(player.Id);
                
                return player.Id;
            }
        });
        xhr.open("GET", "https://www.haloapi.com/stats/h5/servicerecords/arena?players="+gamertag);
        xhr.setRequestHeader(config.halo.desc, config.halo.key);
        xhr.send(data);
    }
}