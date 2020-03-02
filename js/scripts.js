function pizza(type, size, toppings, deliver) {
  this.type = type;
  this.size = size;
  this.toppings = toppings;
  this.deliver = deliver;
}
function drink(type, flavor, amount, deliver) {
  this.type = type;
  this.flavor = flavor;
  this.amount = amount;
  this.deliver = deliver;
}

$().ready(function () {
  $("#pepperoni").click(function () {
    var random = "<h1>Hello!</h1>"
    swal(random)
  })
});