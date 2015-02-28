$( document ).ready(function() {

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
            innerHtml += "<image src=\"img/placeholder_product.jpg\"></image>";
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