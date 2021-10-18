function countToShow(){
    var A = [], x, d, diff, cd = document.getElementById('countdown'),
    cdimg =document.getElementById('onAir'),
    onAir = new Date(Date.UTC(2021, 9, 22, 24)), now = new Date();
    while(onAir < now) onAir.setDate(onAir.getDate() + 14);
    diff = (onAir - now);
    if (diff < 3600000) {
        cdimg.style.visibility = 'visible';
        cd.style.visibility = 'hidden';
    }
    else {
        x = Math.abs(diff - 3600000);
        d = Math.floor(x / 86400000);
        if (d > 1) {
            A.push(d + " days");
            x %= 86400000;
        }
        x = Math.floor(x / 1000);
        if (x> 3600) {
            d = Math.floor(x / 3600);
            A.push(d + "h"/* +(d > 1? "s": "")*/);
            x %= 3600;
        }
        if (x > 60) {
            d = Math.floor(x / 60);
            A.push(d + "m"/* +(d> 1? "s": "")*/);
            x %= 60;
        }
        if (x > 0) A.push(x + "s"/* +(x> 1? "s": "")*/);
        cdimg.style.visibility = 'hidden';
        cd.value = A.join(", ");

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