function InitWebSocket() {
    var websock = new WebSocket("wss://'192.168.43.2':81/");
    websock.onmessage = function (evt) {
        JSONobj = JSON.parse(evt.data);
        document.getElementById('POTvalue').innerHTML = JSONobj.POT;
        var pot = parseInt(JSONobj.POT * 135);
        document.getElementById("dynRectangle").style.width = pot + "px";
    }
};

InitWebSocket()
