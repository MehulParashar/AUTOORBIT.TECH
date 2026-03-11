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

// 🔥 Remove Item
function removeFromCart(index){
cart.splice(index,1);
localStorage.setItem("cart", JSON.stringify(cart));
loadCartPage();
updateCartCount();
}

// 🔥 Update Cart Count
function updateCartCount(){
let countElement = document.getElementById("cart-count");
if(countElement){
countElement.innerText = cart.length;
}
}

// 🔥 Load Cart in order.html
function loadCartPage(){
let cartContainer = document.getElementById("cart-items");
if(!cartContainer) return;

if(cart.length === 0){
cartContainer.innerHTML = "Cart is empty";
return;
}

let html="";
let total=0;

cart.forEach((item,index)=>{
html+=`
<div style="margin-bottom:10px;">
${item.name} - ₹${item.price}
<button onclick="removeFromCart(${index})"
style="margin-left:10px;background:red;color:white;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;">
Remove
</button>
</div>
`;
total+=parseInt(item.price);
});

html+=`<hr><strong>Total: ₹${total}</strong>`;

cartContainer.innerHTML = html;
}

// 🔥 Go To Cart Page
function goToCart(){
window.location.href="order.html";
}

window.onload = function(){
updateCartCount();
loadCartPage();
};
function payNow(){

if(cart.length===0){alert("Cart empty");return;}

let name=document.getElementById("customerName").value;
let phone=document.getElementById("customerPhone").value;

if(name==""||phone==""){alert("Enter details");return;}

let total=calculateTotal();

// Fake Processing
alert("Processing Payment...");

// Fake Success After 2 Sec
setTimeout(function(){

let fakePaymentID="TEST-"+Date.now();

let message="💰 PAYMENT SUCCESSFUL (TEST MODE)\n\n";
message+="Customer: "+name+"\n";
message+="Phone: "+phone+"\n\n";

cart.forEach((item,index)=>{
message+=(index+1)+". "+item.name+" - ₹"+item.price+"\n";
});

message+="\nFinal Paid: ₹"+total;
message+="\nPayment ID: "+fakePaymentID;

window.open(
"https://wa.me/919416693052?text="+encodeURIComponent(message),
"_blank"
);

localStorage.removeItem("cart");
window.location.href="invoice.html";

},2000);

}
