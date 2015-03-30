$(document).on('ready',function() {
    var sTime;
    var res=null;
    var interval=null;
    $.ajax({
        url: "/serverTime",
        cache: false,
        success: function (data) {
            sTime = new Date(parseInt(data));
            var year=sTime.getFullYear();
            var mouth=sTime.getMonth();
            var day=sTime.getDate();
            var hours=sTime.getHours();
            var minutes=sTime.getMinutes();
            var seconds=sTime.getSeconds();
            res=(2015-year)*365;
            if(mouth==3)
            {
                res=(res+9-day)*24;
            }
            if(mouth==2)
            {
                res=(res+40-day)*24;
            }
            res+=(res+10-hours)*60;
            res+=(res-minutes)*60-seconds;
            if(res>0)
            {
                $("#timerDays").text((Math.ceil(res/(60*60*24))).toString());
                $("#timerHours").text((Math.ceil(res/(60*60))).toString());
                $("#timerMinutes").text(((Math.ceil(res/60))%60).toString());
                $("#timerSeconds").text((res%60).toString());
                interval=setInterval(function(){
                    res--;
                    if(!res)
                    {
                        $("#timer").innerHTML="Олімпіада розпочалась";
                        clearInterval(interval);
                    }
                    $("#timerDays").text((Math.ceil(res/(60*60*24))).toString());
                    $("#timerHours").text((Math.ceil(res/(60*60))).toString());
                    $("#timerMinutes").text(((Math.ceil(res/60))%60).toString());
                    $("#timerSeconds").text((res%60).toString());
                },1000);
            }
            else
            {
                var timer=document.getElementById('timer');
                timer.innerHTML="Олімпіада розпочалась";
            }
        }
    });
});