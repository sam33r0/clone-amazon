import {cart} from "../data/cart.js";
import { products } from "../data/products.js";
import { moneyFormat } from "./shared/money.js";
export function updatePayment()
{
    let html="";
    let totalCost=0;
    let noOfitems=0;
    cart.forEach((element) => {
        noOfitems++;
        let q=element.quantity;
        let productId=element.productId;
        let index=element.index;
        console.log(element.deliveryOptionId);
        let cost1=Number.parseFloat(products[index].priceCents);
        cost1=cost1*q;
        totalCost+=cost1;
    });
    let tax=12;
    let cost=totalCost*tax/100;
    html=`<div class="payment-summary-title">
    Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${noOfitems}):</div>
      <div class="payment-summary-money">&#8377; ${moneyFormat(totalCost)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">&#8377;0</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">&#8377 ${moneyFormat(totalCost)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (${tax}%):</div>
      <div class="payment-summary-money">&#8377 ${moneyFormat(cost)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">&#8377;${moneyFormat(cost+totalCost)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>`
  let paymentElement=document.querySelector(".payment-summary");
  paymentElement.innerHTML=html;
    console.log(moneyFormat(totalCost)+"\t"+noOfitems);
}

function orderplace(){
    
    localStorage.clear();
    cart=[];
    document.querySelector(".js-cpopo").innerHTML="DONE!!";
    updateNoItems();
}