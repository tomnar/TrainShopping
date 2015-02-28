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
        setView(Math.round(Math.random() * $views.length - 1));
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
            innerHtml += "" +
                "<div class=\"item\">" +
                    "<image src=\"img/placeholder_product.jpg\"></image>" +
                    "<div>" + itemName + "</div>" +
                "</div>"
        }

        productView.append(
            "<div class=\"hScroll\">" +
                "<h2>" + catName + "</h2>" +
                "<div>" +
                    innerHtml +
                "</div>" +
            "</div>"
        );
    }
});



function initViews() {
    $currentView = $views.first();
    $currentView.show();
    viewHistory.push(0);
    $('.button.back').click(function() {
        if (viewHistory.length > 1) {
            setView(viewHistory.pop(), false);
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
            $currentView = $view;
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