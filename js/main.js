(function(){
    var nspc = window.alx,
        main = $('.main-wrap'),
        head = $('.main-top').cloneNode(true),
        content = $('.main-content').cloneNode(true);
    

    content.replaceClass('main-pad', 'fixed-pad');

    content.replaceClass('main-content', 'fixed-content fixed hide');
    head.replaceClass('main-top', 'fixed-top fixed hide');

    var bounds = content.querySelectorAll('.scroll-section');
    console.log(bounds);

    main.appendChild(head);
    main.appendChild(content);


    window.alx.scroller = nspc.ScrollMe.init(100);
    content.removeClass('hide');
})()