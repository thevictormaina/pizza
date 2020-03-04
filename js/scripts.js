var order = [];
function Pizza(type, size, toppings, quantity, crust, price) {
  this.type = type;
  this.size = size;
  this.toppings = toppings;
  this.crust = crust;
  this.quantity = quantity;
  this.price = price;
}
Pizza.prototype.appendPrice = function () {
  if (this.type == "Pepperoni") {
    return 400;
  } else if (this.type == "Hawaiian") {
    return 350;
  } else if (this.type == "BBQ Chicken") {
    return 450;
  } else if (this.type == "Beef Mince") {
    return 400;
  } else if (this.type == "Mushroom") {
    return 450;
  } else if (this.type == "Eggplant") {
    return 400;
  }
}
Pizza.prototype.getCost = function () {
  var baseCost = this.appendPrice();
  if (this.size == "large") {
    baseCost *= 2.5;
  } else if (this.size == "medium") {
    baseCost *= 1.6;
  } else if (this.size == "small") {
    baseCost *= 1;
  }
  if (this.toppings == true) {
    baseCost += 150;
  }
  return baseCost * parseInt(this.quantity);
}
Pizza.prototype.addToCart = function () {
  order.push(JSON.stringify(this));
  localStorage.setItem("order", JSON.stringify(order));
  Swal.fire({
    icon: "success",
    text: this.quantity + " " + this.size + " " + this.type + " Pizza(s) added to cart",
    footer: "<table class='table table-sm table-borderless'><tbody><tr><td class='text-left'>Cost</td><td class='text-right'>KES " + this.price + "</td></tr></tbody><table>"
  });
}
$().ready(function () {
  $(".pizza").click(function (event) {
    var thisOrder = new Pizza($("h4", this).first().text(), "", "", "", "");
    var random = "<h3>" + thisOrder.type + "</h3><form> <table class='table table-resposive table-borderless text-dark mx-auto'> <tr> <td class='text-left'> <label>Quantity</label> <input class='' type='number' id='quantity' value='1' min='1' style='width: 70px;' required> </td> <td class='text-right'> <label>Size</label> <select class='' id='size' required> <option value=''> -- </option> <option value='large'>Large</option> <option value='medium'>Medium</option> <option value='small'>Small</option> </select> </td> </tr> <tr> <td class='text-left'> <label for='crust'>Crust Type</label> <select name='crust' id='crust'> <option value=''required>--</option> <option value='Thick'>Thick Crust</option> <option value='Thin'>Thin Crust</option> </select> </td> <td class='text-right'> <label for='toppings'>Extra toppings</label> <input type='checkbox' id='toppings'> </td> </tr> </table> <p id='error' class='text-danger'></p><button class='btn btn-primary pizza' type='button' id='proceed'>Add to Cart</button></form>";
    Swal.fire({
      html: random,
      showConfirmButton: false
    });
    $("button#proceed").click(function () {
      thisOrder.size = $("#size").val();
      thisOrder.toppings = (document.getElementById("toppings").checked == true) ? true : false;
      thisOrder.crust = $("#crust").val();
      thisOrder.quantity = $("#quantity").val();
      thisOrder.price = thisOrder.getCost();
      if (thisOrder.size == "" || thisOrder.crust == "") {
        $("p#error").text("Invalid order.");
      } else {
        thisOrder.addToCart();
        $("#cart #cart-num").text(JSON.parse(localStorage.order).length);
      };
    });
  });
  $().ready(function () {
    if (localStorage.getItem("order") == undefined) {
      $("#cart-items").html('<p class="text-center">Your cart is empty.</p>');
      $("#checkout").attr("disabled", true).css("cursor", "default");
      $("#clear-cart").attr("disabled", true).css("cursor", "default");
    } else {
      $("#checkout").removeAttr("disabled").css("cursor", "pointer");
      $("#clear-cart").removeAttr("disabled").css("cursor", "pointer");
      $("#cart #cart-num").text(JSON.parse(localStorage.order).length);
      var order = JSON.parse(localStorage.order);
      order.forEach(function (item) {
        var test = '<tr> <td class="text-left w-75">' + JSON.parse(item).quantity + " " + JSON.parse(item).size + " " + JSON.parse(item).type + ' Pizza(s)</td> <td class="text-right w-25">KES ' + JSON.parse(item).price + '</td> </tr>';
        $("#insertItems").append(test);
      })
    }
  })
  var nums = [];
  for (var i = 0; i < JSON.parse(localStorage.order).length; i++) {
    var num = JSON.parse(JSON.parse(localStorage.order)[i]).price;
    console.log(num)
    nums.push(num);
  };
  total = nums.reduce(function (item, num) {
    return item + num;
  })
  $("#total-amount").text("KES " + total + ".00");
  $("button#delivery").click(function () {
    var deliver = $("#deliver").prop("checked");
    var pickup = $("#pickup").prop("checked");
    if (deliver == true) {
      $("#pickup-option").hide();
      $("#deliver-address").fadeIn();
    } else if (pickup == true) {
      $("#pickup-option").hide();
      $("#pick-address").fadeIn();
    } else if (deliver != true && pickup != true) {
      $("#error2").text("Please pick an option.");
    }
  })
  $("button.place-order").first().click(function (event) {
    Swal.fire({
      icon: "success",
      title: "Done.",
      text: "Your order has been placed."
    }).then(function () {
      localStorage.removeItem("order");
      location.assign("index.html");
    })
    event.preventDefault();
  })
  $(".place-order").submit(function (event) {
    event.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Done.",
      text: "Your order has been placed."
    }).then(function () {
      localStorage.removeItem("order");
      location.assign("index.html");
    })
  })
});