const phone="919416693052";

function sendWhatsApp(msg){
window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,'_blank');
}

// ===== CART SYSTEM =====

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price){
cart.push({name, price});
localStorage.setItem("cart", JSON.stringify(cart));
updateCartCount();
alert(name + " added to cart");
}

function updateCartCount(){
let countElement = document.getElementById("cart-count");
if(countElement){
countElement.innerText = cart.length;
}
}

function sendCartToWhatsApp(){
if(cart.length === 0){
alert("Cart is empty");
return;
}

let message = "🛒 NEW ORDER\n\n";
let total = 0;

cart.forEach((item,index)=>{
message += (index+1) + ". " + item.name + " - ₹" + item.price + "\n";
total += parseInt(item.price);
});

message += "\nTotal: ₹" + total;

window.open(`https://wa.me/${phone}?text=` + encodeURIComponent(message),'_blank');

cart = [];
localStorage.removeItem("cart");
updateCartCount();
}

window.onload = updateCartCount;
