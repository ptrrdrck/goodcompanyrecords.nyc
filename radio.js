function counttoShow(){
    var A= [], x, d,  diff,cd=document.getElementById('countdown'),
    cdimg=document.getElementById('onAir'),
    onair= new Date(Date.UTC(2021, 9, 22, 24)), now= new Date();
    while(onair<now) onair.setDate(onair.getDate()+14);
    diff= (onair-now);
    if(diff<3600000){
        cdimg.style.visibility='visible';
        cd.style.visibility='hidden';
    }
    else{
        x= Math.abs(diff-3600000);
        d= Math.floor(x/86400000);
        if(d> 1){
            A.push( d + " days");
            x%= 86400000;
        }
        x= Math.floor(x/1000);
        if(x> 3600){
            d= Math.floor(x/3600);
            A.push(d + " hour" +(d> 1? "s": ""));
            x%= 3600;
        }
        if(x> 60){
            d= Math.floor(x/60);
            A.push(d + " minute" +(d> 1? "s": ""));
            x%= 60;
        }
        if(x> 0) A.push(x + " second" +(x> 1? "s": ""));
        cdimg.style.visibility='hidden';
        cd.value= A.join(", ");

    }
}
window.onload=function(){
    var cdtimer=setInterval(counttoShow,1000);
    document.body.ondblclick=function(){
        if(cd.timer){
            clearInterval(cdtimer);
            cdtimer=null;
        }
        else cdtimer=setInterval(counttoShow,1000); 
    }
}