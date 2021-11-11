function countToShow(){
    var timeRemaining = [], x, d, diff, cd = document.getElementById('countdown'),
    liveLink = document.getElementById('live'),
    onAir = new Date(Date.UTC(2021, 10, 5, 23)),
    now = new Date();
    while(onAir < now) onAir.setDate(onAir.getDate() + 14);
    diff = (onAir - now);
    if (diff < 7200000) {
        liveLink.style.display = 'inline';
        cd.style.display = 'none';
    }
    else {
        x = Math.abs(diff);
        d = Math.floor(x / 86400000);
        if (d > 1) {
            timeRemaining.push(d + ' days');
            x %= 86400000;
        }
        x = Math.floor(x / 1000);
        if (x> 3600) {
            d = Math.floor(x / 3600);
            timeRemaining.push(d + 'h');
            x %= 3600;
        }
        if (x > 60) {
            d = Math.floor(x / 60);
            timeRemaining.push(d + 'm');
            x %= 60;
        }
        if (x > 0) timeRemaining.push(x + 's');
        liveLink.style.display = 'none';
        cd.value = timeRemaining.join(', ');
        cd.style.display = 'inline';
    }
}

window.onload = function() {
    var cdtimer = setInterval(countToShow, 1000);
    document.body.ondblclick = function() {
        if (cd.timer) {
            clearInterval(cdtimer);
            cdtimer = null;
        }
        else cdtimer = setInterval(countToShow,1000); 
    }
}