$(document).ready(function() {
    $(".zoomImage").mouseover(function(){
        $(this).animate({height: 300, width: 300}, "slow");
    });

    $(".zoomImage").mouseout(function(){
        $(this).animate({height: 150, width: 150}, "slow");
    });
});