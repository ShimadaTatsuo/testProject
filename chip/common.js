(function(doc){
    var target = doc.getElementById('self');

    var topBtn = doc.getElementById('top');
    var bottomBtn = doc.getElementById('bottom');
    var leftBtn = doc.getElementById('left');
    var rightBtn = doc.getElementById('right');

    var offset = 550;


    topBtn.addEventListener('click', function() {
        var rect = target.getBoundingClientRect() ;
        var positionY = rect.top + window.pageYOffset ;
        console.log(window.pageYOffset);
        console.log(window.pageYOffset);
        console.log(positionY);
        target.style.top = "-50px";
    });

    bottomBtn.addEventListener('click', function() {
        var rect = target.getBoundingClientRect() ;
        var positionY = rect.top + window.pageYOffset ;
        console.log(positionY);
        target.style.top = "50px";
    });

    leftBtn.addEventListener('click', function() {
        var rect = target.getBoundingClientRect() ;
        var positionX = rect.left + window.pageXOffset;
        target.style.left = positionX - offset + "px";
    });

    rightBtn.addEventListener('click', function() {
        var rect = target.getBoundingClientRect() ;
        var positionX = rect.left + window.pageXOffset ;
        console.log(positionX);
        target.style.left = "50px";
    });

})(document);
