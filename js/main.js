var $views,
    $currentView,
    initialWidth,
    time          = 500,
    viewHistory   = [];

$( document ).ready(function() {

    $views       = $('.view'),
    initialWidth = $views.first().width();

    initViews();

    $('.cart.button').click(function(){

        for (var items in cart) { // Iterate through cart items
            if (cart.hasOwnProperty(items)) {
                var item = cart[items];
                if(item.amount > 0){
                    console.log(item);
                }
            }
        }

        setView(2);
    });

    $('.loginView .login').click(function(){
        setView(1);
    });

    $('.cartView .buy').click(function(){
        setView(3);

        var myLatlng = new google.maps.LatLng(52.525084,13.369402);
        var mapOptions = {
            zoom: 15,
            center: myLatlng
        }
        var map = new google.maps.Map($('.map-canvas')[0], mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            animation: google.maps.Animation.DROP
        });
    });

    var cart = {};
    $(document).on( "click", ".item", function() {
        var id = $(this).find('.id').text();
        cart[id].amount = cart[id].amount + 1;
    });

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
                    "<image src=\"img/placeholder_product.jpg\"></image>" +
                    "<h3>" + itemName + "</h3>" +
                    "<div>" + itemDescription + "</div>" +
                    "<span>" + itemPrice + " &euro;</span>" +
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
});



function initViews() {
    $currentView = $views.first();
    $currentView.show();
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

        // prepare next view
        $view.css({
            left: initialWidth + 'px',
            zIndex: 1,
            display: 'block'
        });

        // slide in next view
        $view.stop().animate({
            left: 0
        }, time, function() {
            $currentView.hide();
            $view.css({zIndex: 0});
            $('body').removeClass($currentView.data('name')).addClass($view.data('name'));
            $currentView = $view;
            $('.views').height($currentView.height() + 42);
        });

        // slide out current view
        $currentView.stop().animate({
            left: '-' + initialWidth + 'px'
        }, time);

        // push to history
        if (history) {
            viewHistory.push(index);
        }
    }
}