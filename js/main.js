var $views,
    $currentView,
    initialWidth,
    time          = 500,
    easing        = 'easeInOutCubic',
    viewHistory   = [];

$( document ).ready(function() {

    $views       = $('.view'),
    initialWidth = $views.first().width();

    initViews();

    $('.cart.button').click(function(){
        var totalPrice = 0;

        var list = $('ul');
        list.empty();
        for (var items in cart) { // Iterate through cart items
            if (cart.hasOwnProperty(items)) {
                var item = cart[items];
                if(item.amount > 0){
                    list.append("" +
                        "<li>" +
                            "<img src=\"img/" + item.img + "\" />" +
                            "<h3>" + item.name + "</h3>" +
                            "<div>" + item.amount + " x " + item.price + " &euro;</div>" +
                            "<hr>" +
                        "</li>"
                    );
                    totalPrice += item.amount*item.price;
                }
            }
        }

        $('.totalPrice').html(totalPrice.toFixed(2) + " &euro;");

        if (totalPrice > 0) {
            $('.button.buy').removeClass('disabled');
        } else {
            $('.button.buy').addClass('disabled');
        }

        setView(2);
    });

    $('.loginView .login').click(function(){
        setView(1);
    });

    $('.cartView .buy').click(function(){
        if ($(this).hasClass('disabled')) {
            return;
        }

        setView(3);

        // var myLatlng = new google.maps.LatLng(52.525084,13.369402);
        // var mapOptions = {
        //     zoom: 15,
        //     center: myLatlng
        // }
        // var map = new google.maps.Map($('.map-canvas')[0], mapOptions);

        // var marker = new google.maps.Marker({
        //     position: myLatlng,
        //     map: map,
        //     animation: google.maps.Animation.DROP
        // });
    });

    $('.code.button').click(function(){
        setView(4);
    });

    cart = {};

    var productView = $('.productView');
    for(var i = 0; i < products.length; i++){
        var cat = products[i];
        var catName = cat.category;
        var catItems = cat.items;

        var innerHtml = "";
        for(var u = 0; u < catItems.length; u++){
            var item = catItems[u];
            var itemId = item.id;
            var itemName = item.name;
            var itemPrice = item.price;
            var itemDescription = item.description;
            var itemImg = item.img;
            cart[itemId] = {"name":itemName, "price":itemPrice, "description": itemDescription, "img": itemImg, "amount": 0};
            innerHtml += "" +
                "<div class=\"item\">" +
                    "<image src=\"img/" + itemImg + "\"></image>" +
                    "<h3>" + itemName + "</h3>" +
                    "<span class=\"plus\">+</span>" +
                    "<span class=\"minus\">-</span>" +
                    "<div>" + itemDescription + "</div>" +
                    "<span><span class=\"counter\"></span>" + itemPrice + " &euro;</span>" +
                    "<span class=\"id\">" + itemId + "</span>" +
                "</div>"
        }

        productView.append(
            "<h2>" + catName + "</h2>" +
            "<div class=\"hScroll\">" +
                innerHtml +
            "</div>"
        );
    }

    productView.on( "click", ".plus", function() {
        var id = $(this).parent().find('.id').text();
        var counter = $(this).parent().find('.counter');

        cart[id].amount = cart[id].amount + 1;
        counter.text(cart[id].amount + " x ");

        $(this).animate({fontSize: '250px', top: '-90px', right: '-30px', opacity: 0, width: '200px'}, {duration: time, easing: easing, complete: function() {
            $(this).css({fontSize: '25px', top: '10px', right: '5px', width: '45px'}).animate({opacity: 1});
        }});
    });
    productView.on( "click", ".minus", function() {
        var id = $(this).parent().find('.id').text();
        var counter = $(this).parent().find('.counter');

        if(cart[id].amount > 0){
            cart[id].amount = cart[id].amount - 1;

            if(cart[id].amount == 0){
                counter.text("");
            }
            else{
                counter.text(cart[id].amount + " x ");
            }
        }

        $(this).css({fontSize: '250px', top: '-90px', opacity: 0, width: '200px'}).animate({fontSize: '25px', top: '10px', width: '45px', opacity: 1}, {duration: time, easing: easing});
    });
});



function initViews() {
    $currentView = $views.first();
    $currentView.fadeIn(time * 0.5, function(){
        $(this).find('.logo').fadeIn(time * 0.5, function() {
            $(this).parent().find('.login.button').fadeIn(time * 0.5);
        });
    });
    $('body').addClass($currentView.data('name'));
    viewHistory.push(0);
    $('.button.back').click(function() {
        if (viewHistory.length > 1) {
            viewHistory.pop()
            setView(viewHistory[viewHistory.length - 1], false);
        }
    });
}

function setView(index, history) {
    history != null || (history = true);

    if ($currentView.index() !== index) {
        var $view = $($views[index]);
        window.scrollTo(0, 0);

        // prepare next view
        $view.css({
            left: initialWidth + 'px',
            zIndex: 1,
            display: 'block'
        });

        // slide in next view
        $view.stop().animate({
            left: 0
        }, {duration: time, easing: easing, complete: function() {
            $currentView.hide();
            $view.css({zIndex: 0});
            $('body').removeClass($currentView.data('name')).addClass($view.data('name'));
            $currentView = $view;
            // $('.views').height($currentView.height() + 42);
        }});

        // slide out current view
        $currentView.stop().animate({
            left: '-' + initialWidth + 'px'
        }, {duration: time, easing: easing});

        // push to history
        if (history) {
            viewHistory.push(index);
        }
    }
}
