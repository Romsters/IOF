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
            olimpTime=new Date();
            olimpTime.setDate(9);
            olimpTime.setFullYear(2015);
            olimpTime.setHours(10);
            olimpTime.getMinutes(0);
            olimpTime.getSeconds(0);
            olimpTime.setMonth(3);
            var res=olimpTime.getTime()-sTime.getTime();
            console.log(res);
            res=Math.ceil(res/10);

        if(res>0)
        {
            $("#timerDays").text((Math.ceil(res/(60*60*24))).toString());
            $("#timerHours").text((Math.ceil(res/(60*60))%24).toString());
            $("#timerMinutes").text(((Math.ceil(res/(60)))%60).toString());
            $("#timerSeconds").text((res%60).toString());
            interval=setInterval(function(){
                res--;
                if(!res)
                {
                    $("#timer").innerHTML="Олімпіада розпочалась";
                    clearInterval(interval);
                    return;
                }
                $("#timerDays").text((Math.ceil(res/(60*60*24))).toString());
                $("#timerHours").text((Math.ceil(res/(60*60))%24).toString());
                $("#timerMinutes").text(((Math.ceil(res/(60)))%60).toString());
                $("#timerSeconds").text((res%60).toString());
            },1000);
        }
        else
        {
            var timer=document.getElementById('timer');
            timer.innerHTML="Олімпіада розпочалась";
        }
    });
});