
export let cart = JSON.parse(localStorage.getItem('cart')) ||
    [/*{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 34,
        index: 0,
        deliveryOptionId: '1'
    }, {
        productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
        quantity: 5,
        index: 3,
        deliveryOptionId: '1'
    }*/];
export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
export function updateToCart(productId,val,upElemt){
  //  console.log(val);
    cart.forEach((element)=>{
        if(element.productId==productId)
        {
            element.quantity+=val;
            upElemt.innerText=element.quantity;
        }
    });
    saveToStorage();
    updateNoItems();
}
export function addToCart(productId, i) {
    let matchingItem;
    let incrQuant = parseInt(document.querySelector(`.js-quantity-selecter-${productId}`).value);

    let addToc = document.getElementById(`css-${productId}abc`);
    addToc.classList.add("css-addToC");
    setTimeout(() => {
        addToc.classList.remove("css-addToC");
    }, 1111);
    cart.forEach((cartItems) => {
        if (cartItems.productId === productId) {
            matchingItem = cartItems;
            //console.log(matchingItem.deliveryOptionId);
        }
    })
    if (matchingItem) {
        matchingItem.quantity += incrQuant;
    }
    else {
        cart.push({
            productId: productId,
            quantity: incrQuant,
            index: i,
            deliveryOptionId:'1'
        });
    }
    saveToStorage();
}
export function updateNoItems(){
    let cartQuantity = 0;
    cart.forEach((cartItems) => {
        cartQuantity += cartItems.quantity;
    })
    if(cartQuantity>1)
    document.querySelector(".js-noOfitems").innerText= `${cartQuantity} items`;
    else if(cartQuantity==1)
    document.querySelector(".js-noOfitems").innerText= `${cartQuantity} item`;
    else
    {
        document.querySelector(".js-noOfitems").innerText= `Empty`;
    }
    return cartQuantity;
};
export function updateCartQuantity() {

    let cartQuantity = 0;
    cart.forEach((cartItems) => {
        cartQuantity += cartItems.quantity;
    })
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    saveToStorage();
};
export function removeFromCart(productId, ind) {
    let f=[];
    cart.forEach((element)=>{
        if(element.productId!=productId)
        f.push(element);
    });
    cart=f;
    saveToStorage();
}
document.querySelectorAll(".js-erer").forEach((button)=>{
    button.addEventListener('click',()=>{
        localStorage.clear();
        cart=[];
        document.querySelector(".js-cpopo").innerHTML="DONE!!";
        updateNoItems();
    })
}
)
export function updateDeliveryOption(productId,deliverOptionId){
    let matchingItem;
    cart.forEach((element)=>{
        if(element.productId===productId)
        {
            matchingItem=element;
        }
    })
    matchingItem.deliverOptionId=deliverOptionId;
    console.log(matchingItem.deliverOptionId);
    saveToStorage();
}