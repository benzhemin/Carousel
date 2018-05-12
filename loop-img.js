$(function(){
    var curIndex = 0;
    var totalCount = 4;

    var $imgList = $('div.loop-img img');
    var blockEvent = false;

    var timer = null;

    function loopImg(direct){
        if (blockEvent){ return; }
        blockEvent = true;

        var next = (totalCount + curIndex + direct) % 4;

        var $curImg = $imgList.eq(curIndex);
        var $nextImg = $imgList.eq(next);

        var width = $curImg.width();
        
        //next position
        $curImg.css({ position: "absolute", top: 0, left: 0 })
        $nextImg.css({ position: "absolute", top: 0, left: direct*width });

        function animateImg($img, delay){
            var dtd = $.Deferred();
            $img.animate({
                left: "-=" + direct*width
            }, delay, function(){
                dtd.resolve();
            }); 
            return dtd.promise();   
        }

        $.when(animateImg($curImg, 500), animateImg($nextImg, 500)).done(function(){
            curIndex = next;
            blockEvent = false;
        });
    }

    $('div.left-arrow').on('click', function(){
        loopImg(-1);
    });

    $('div.right-arrow').on('click', function(){
        loopImg(1);
    });

    /*
    timer = setInterval(function(){
        $('div.right-arrow').trigger('click');
    }, 1000)
    */
});