$(document).on('ready',function() {
    var sTime;
    var res=null;
    var interval=null;
    $.ajax({
        url: "/serverTime",
        cache: false,
        dataType: "json"
    }).success(function (data) {
        sTime = new Date(parseInt(data));
            var olimpTime=new Date();
            olimpTime.setFullYear(2015);
            olimpTime.setDate(9);
            olimpTime.setMonth(3);
            olimpTime.setHours(10);
            olimpTime.setMinutes(0);
            olimpTime.setSeconds(0);
            var res=olimpTime.getTime()-sTime.getTime();
            res=Math.ceil(res/1000);

        if(res>0)
        {
            var time=Math.ceil(res/(60*60*24));
            $("#timerDays").text(time.toString());

            time=Math.ceil(res/(60*60))%24;
            if(time>9)
                $("#timerHours").text(time.toString());
            else
                $("#timerHours").text('0'+time.toString());

            time=(Math.ceil(res/(60)))%60;
            if(time>9)
                $("#timerMinutes").text(time.toString());
            else
                $("#timerMinutes").text('0'+time.toString());

            time=res%60;
            if(time>9)
                $("#timerSeconds").text((res%60).toString());
            else
                $("#timerSeconds").text('0'+time.toString());
            interval=setInterval(function(){
                res--;
                if(!res)
                {
                    $("#timer").innerHTML="Олімпіада розпочалась";
                    clearInterval(interval);
                    return;
                }
                var time=Math.ceil(res/(60*60*24));
                $("#timerDays").text(time.toString());

                time=Math.ceil(res/(60*60))%24;
                if(time>9)
                    $("#timerHours").text(time.toString());
                else
                    $("#timerHours").text('0'+time.toString());

                time=(Math.ceil(res/(60)))%60;
                if(time>9)
                    $("#timerMinutes").text(time.toString());
                else
                    $("#timerMinutes").text('0'+time.toString());

                time=res%60;
                if(time>9)
                    $("#timerSeconds").text((res%60).toString());
                else
                    $("#timerSeconds").text('0'+time.toString());
            },1000);
        }
        else
        {
            var timer=document.getElementById('timer');
            timer.innerHTML="Олімпіада розпочалась";
        }
    });
});