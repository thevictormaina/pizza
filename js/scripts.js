var order = [];

function Pizza(type, size, toppings, quantity, crust) {
  this.type = type;
  this.size = size;
  this.toppings = toppings;
  this.crust = crust;
  this.quantity = quantity;
}

Pizza.prototype.addToCart = function () {
  order.push(JSON.stringify(this));
  localStorage.setItem("order", JSON.stringify(order));
  Swal.fire({
    icon: "success",
    text: this.quantity + " " + this.size + " " + this.type + " Pizza(s) added to cart"
  });
}

function Drink(type, flavor, amount, deliver) {
  this.type = type;
  this.flavor = flavor;
  this.amount = amount;
}

$().ready(function () {
  $(".pizza").click(function (event) {
    var thisOrder = new Pizza($("h4", this).first().text(), "", "", "", "");
    var random = "<h3>" + thisOrder.type + "</h3><form> <table class='table table-resposive table-borderless text-dark mx-auto'> <tr> <td class='text-left'> <label>Quantity</label> <input class='' type='number' id='quantity' value='1' min='1' style='width: 70px;' required> </td> <td class='text-right'> <label>Size</label> <select class='' id='size' required> <option value=''> -- </option> <option value='large'>Large</option> <option value='large'>Medium</option> <option value='large'>Small</option> </select> </td> </tr> <tr> <td class='text-left'> <label for='crust'>Crust Type</label> <select name='crust' id='crust'> <option value=''required>--</option> <option value='Thick'>Thick Crust</option> <option value='Thin'>Thin Crust</option> </select> </td> <td class='text-right'> <label for='toppings'>Extra toppings</label> <input type='checkbox' id='toppings'> </td> </tr> </table> <p id='error' class='text-danger'></p><button class='btn btn-primary pizza' type='button' id='proceed'>Add to Cart</button></form>";
    Swal.fire({
      html: random,
      showConfirmButton: false
    });
    $("button#proceed").click(function () {
      thisOrder.size = $("#size").val();
      thisOrder.toppings = (document.getElementById("toppings").checked == true) ? true : false;
      thisOrder.crust = $("#crust").val();
      thisOrder.quantity = $("#quantity").val();
      if (thisOrder.size == "" || thisOrder.crust == "") {
        $("p#error").text("Invalid order.");
      } else {
        thisOrder.addToCart();
        $("span#cart-num").text(JSON.parse(localStorage.order).length);
      };
    });
  });
  // $("span#cart-num").text(JSON.parse(localStorage.order).length);
  $("#testing").click(function () {
    if (localStorage.order == undefined) {
      $("#cart-items").html('<p class="text-center">You have not added anything to the cart.</p>');
    } else {
      // $("#cart-items").text("");
      var order = JSON.parse(localStorage.order);
      $("#cart-items").html('<table class="table table-sm table-borderless text-dark"><tbody></tbody>');
      order.forEach(function (item) {
        var test = '<tr> <td class="text-left w-75">' + JSON.parse(item).quantity + " " + JSON.parse(item).size + " " + JSON.parse(item).type + '</td> <td class="text-right w-25">' + '</td> </tr>';
        $("#cart-items").append(test);
      })
      $("#cart-items").append('</tbody> </table>');
      console.log(order);
    }
  })
});