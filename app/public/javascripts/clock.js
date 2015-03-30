$(document).on('ready',function() {
    var sTime;
    var hours;
    var mins;
    var seconds;
    $.ajax({
        url: "/serverTime",
        cache: false,
        success: function (data) {
            sTime = new Date(parseInt(data));
            hours=sTime.getHours();
            mins=sTime.getMinutes();
            seconds=sTime.getSeconds();
            setInterval( function() {
                var sdegree = seconds * 6;
                var srotate = "rotate(" + sdegree + "deg)";

                $("#sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});

                var hdegree = hours * 30 + (mins / 2);
                var hrotate = "rotate(" + hdegree + "deg)";

                $("#hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate});

                var mdegree = mins * 6;
                var mrotate = "rotate(" + mdegree + "deg)";

                $("#min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate});

                seconds++;
                if(seconds>=60)
                    mins++;
                seconds%=60;
                if(mins>=60)
                    hours++;
                mins%=60;
                hours%=24;

            }, 1000 );
        }
    });
});