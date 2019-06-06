$('.btn__primary').on('click', function() {
    $('main').show();
});

/*$.ajax({
    url: "http://www.mocky.io/v2/5cf83c183000006100a38175",
    type: 'GET',
    success: function(response) {
        if (response.products) {
          for (var product in products) {
              $("#krofne").append('<div class="krofna" data-name="' + product.name + '" data-price="' + product.price + '"><img src="img/krofna-1.jpg" alt="Krofna"><h3>' + product.name + '</h3><p>' + product.description + '</p><p>' + product.price + '</p><input type="button" value="Dodaj u korpu" class="btn"></div>');
          }
        }
    }
});*/

var cart = [];
if (localStorage.cart) {
    cart = JSON.parse(localStorage.cart);
    showCart(cart);
}

$('.krofna .btn').on('click', function() {
    var name = $(this).parent().attr('data-name');
    var price = $(this).parent().attr('data-price');
    addToCart(name, price);
});

function addToCart(name, price) {
    for (var i in cart) {
        if(cart[i].name == name) {
            cart[i].quantity = cart[i].quantity + 1;
            saveCart();
            showCart();
            return;
        }
    }

    var product = { name: name, price: price, quantity: 1 };
    cart.push(product);
    saveCart();
    showCart();
}

function deleteFromCart(index){
   cart.splice(index,1);
   saveCart();
   showCart();
}

function saveCart() {
    localStorage.cart = JSON.stringify(cart);
}

function showCart() {
    if (cart.length == 0) {
        $("#racun").hide();
        return;
    }

    $("#racun").show();
    $("#cart_holder").empty();

    var total = 0;
    for (var i in cart) {
        var product = cart[i];
        var row = "<tr><td>" + product.name + "</td><td>" +
               product.price + "</td><td>" + product.quantity + "</td><td>"
               + product.quantity * product.price + "</td><td>"
               + "<button class='izbaciBtn' onclick='deleteFromCart(" + i + ")'>Izbaci</button></td></tr>";
        $("#cart_holder").append(row);
        total = total + product.quantity * product.price;
    }
    var row = "<tr><td colspan='5'><mark>Ukupno: " + total + " dinara</mark></td></tr>";
    $("#cart_holder").append(row);
}

function emptyCart(){
    cart = [];
    saveCart();
}
