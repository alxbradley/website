(function () {
    
    var previousDelta = 0,
        scrolling = false,
        intervalID,
        handleScroll = function (e) {
            removeWheelEvent();
            setTimeout(timeoutComplete, 100);
        }, 
        getScrollDelta = function (e) {
            var delta;
            if (e.wheelDelta) { /* IE/Opera. */
                delta = -e.wheelDelta;
            } else if (e.detail) { /** Mozilla case. */
                delta = e.detail*3;
            }
            return delta;
        },
        timeoutComplete = function () {
            addWheelEvent();
            
        }
        
    
    var scrollPosition = 0;
    var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel", //FF doesn't recognize mousewheel as of FF3.x
        addWheelEvent = document.addEventListener && 
            function () { document.addEventListener(mousewheelevt, handleScroll, false)} ||
            function () {document.attachEvent("on"+mousewheelevt, handleScroll)},
        removeWheelEvent = document.removeEventListener &&
            function () {document.removeEventListener(mousewheelevt, handleScroll)} ||
            function () {document.detachEvent("on"+mousewheelevt, handleScroll)}
    
    function Scroller () {
        addWheelEvent();
    }
    
    new Scroller();
})()