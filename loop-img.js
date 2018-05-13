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

        $.when(animateImg($curImg, 300), animateImg($nextImg, 300)).done(function(){
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

$(function(){

    var deferrd = $.Deferred();
    deferrd.done(function(a, b){
        return a*b;
    }).done(function(result){
        console.log('result: ' + result);
    }).then(function(a, b){
        return a * b;
    }).done(function(result){
        console.log('result: ' + result);
    });

    deferrd.resolve(2, 3);

});


$(function(){
    function asyncEvent(){
        var dfd = $.Deferred();

        setTimeout(function(){
            dfd.resolve('hurray');
        }, Math.floor(1000 + Math.random() * 2000));

        setTimeout(function(){
            dfd.reject('sorry');
        }, Math.floor(1000 + Math.random() * 2000));
        
        var count = 0;
        var intervalId = setInterval(function() {
            dfd.notify('working....');
            count++; 
            count>5 && clearInterval(intervalId);
        }, 100);

        return dfd.promise();
    }

    /*
    //progress 不接受when的回调
    $.when(asyncEvent()).then(function(status){
        console.log(status + ', things are going well');
    }, function(status){
        console.log(status + ' you fail this time');
    }, function(status){
        console.log(status + ' progress---------------');
    })
    */

    asyncEvent().then(function(status){
        console.log(status + ', things are going well');
    }, function(status){
        console.log(status + ' you fail this time');
    }, function(prog){
        console.log('progress: ' + prog);
    })

    /*
    function doSomething() {   
        var dfd = $.Deferred();
    
        var count = 0;
        var intervalId = setInterval(function() {
            dfd.notify(count++);
        }, 500);
    
        return dfd.promise();
    };
    
    var promise = doSomething();
    
    promise.progress(function(prog) {
      console.log(prog);
    });
    */
})