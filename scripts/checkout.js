import { cart, removeFromCart,updateNoItems,updateToCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { moneyFormat } from "./shared/money.js";
import {updatePayment} from "./payment.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
let html = '';
updateNoItems();
updatePayment();
let today=dayjs();
cart.forEach((cartItem, ind) => {
    const deliveryOptionId=cartItem.deliveryOptionId;
    let deliverOption;
    deliveryOptions.forEach((e)=>{
      if(e.id==deliveryOptionId)
      {
        deliverOption= today.add( e.deliveryDays,'days').format('dddd, MMMM D');
      }
    })
    html += `<div class="cart-item-container js-cart-item-container-${cartItem.productId}">
        <div class="delivery-date">
          Delivery date: ${deliverOption}
        </div>
        <div class="cart-item-details-grid">
          <img class="product-image" src=${products[cartItem.index].image}>
    
          <div class="cart-item-details">
            <div class="product-name">
                ${products[cartItem.index].name}    
            </div>
            <div class="product-price">
            &#8377;${moneyFormat(products[cartItem.index].priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label updater-${cartItem.productId} ">${cartItem.quantity}</span>
              </span>
              <span>
                <span class="js-update-link link-primary js-up-${cartItem.productId}" data-product-id=${cartItem.productId}>
                  Update
                </span>
                <span class="css-invis js-${cartItem.productId}-i">
                  <span>
                    <input class="js-input-update css-update-input js-${cartItem.productId}-input" type="number">
                  </span>
                  <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id=${cartItem.productId}>
                    Save
                  </span>
                </span>
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${cartItem.productId} data-cart-index=${ind}>
                Delete
              </span>
            </div>
          </div>
    
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionHtml(cartItem)}
            
          </div>
        </div>
      </div>
    `
});

function deliveryOptionHtml(cartItem){
  let hyml='';
  deliveryOptions.forEach((deliveryOption)=>{
    const isChecked=deliveryOption.id==cartItem.deliveryOptionId;
   //console.log(deliveryOption.id+"\t"+cartItem.deliveryOptionId);
   
    const deliveryDate= today.add(deliveryOption.deliveryDays,'days').format('dddd, MMMM D');
    const priceCents=deliveryOption.priceCents==0?'FREE Shipping':`&#8377;${moneyFormat(deliveryOption.priceCents)} - Shipping`;
      hyml+=
      `
        <div class='delivery-option' data-product-id="${cartItem.productId}" data-delivery-option-id="${deliveryOption.id}">
        
          <input type="radio" ${isChecked?'checked':''} class="delivery-option-input" name="delivery-option-${cartItem.productId}" value="0">
          <div>
            <div class="delivery-option-date">
              ${deliveryDate}
            </div>
            <div class="delivery-option-price">
              ${priceCents}
            </div>
          </div>
        </div>
      `
  })
  //console.log(hyml);
  return hyml;
};

let orderSummaryElement = document.querySelector(".js-order-summary");
orderSummaryElement.innerHTML = html;

document.querySelectorAll(".js-delete-link").forEach((button, i) => {
    button.addEventListener('click', () => {
        let productId = button.dataset.productId;
        removeFromCart(productId, i);
        let removedElement = document.querySelector(`.js-cart-item-container-${productId}`);
      //  console.log(removedElement);
        removedElement.remove();
        updateNoItems();updatePayment();
    });
});
document.querySelectorAll(".js-update-link").forEach((button,i)=>{
  button.addEventListener('click',()=>{
    let productId=button.dataset.productId;
    document.querySelector(`.js-${productId}-i`).classList.remove("css-invis");
    document.querySelector(`.js-up-${productId}`).classList.add("css-invis");
 
  });
});
document.querySelectorAll(".js-save-quantity-link").forEach((button,i)=>{
  button.addEventListener('click',()=>{
    let productId=button.dataset.productId;
    document.querySelector(`.js-${productId}-i`).classList.add("css-invis");
    document.querySelector(`.js-up-${productId}`).classList.remove("css-invis");   
    let inputElement = document.querySelector(`.js-${productId}-input`);
    let incre=Number.parseInt(inputElement.value);
    inputElement.value=0;
    let updaterElement=document.querySelector(`.updater-${productId}`);
    updateToCart(productId,incre,updaterElement);
    //console.log(productId,typeof(incre),incre);
    updatePayment();
  })
});
