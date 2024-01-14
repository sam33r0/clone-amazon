import {
    cart
} from "../data/cart.js";
import {
    products
} from "../data/products.js";
import {
    addToCart,
    updateCartQuantity
} from "../data/cart.js"
import { moneyFormat } from "./shared/money.js";
let prodHtml = "";
let productElement = document.querySelector(".js-products-grid");
products.forEach((element) => {
    let html = ` 
    <div class="product-container">
        <div class="product-image-container">
        <img class="product-image"
            src="${element.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${element.name}
        </div>

        <div class="product-rating-container">
        <img class="product-rating-stars"
            src="images/ratings/rating-${element.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
        ${element.rating.count}
        </div>
        </div>

        <div class="product-price">
        &#8377;${moneyFormat(element.priceCents)}
        </div>

        <div class="product-quantity-container">
        <select class="js-quantity-selecter-${element.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart" id="css-${element.id}abc">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${element.id}" data-product-price="${(element.priceCents / 100).toFixed(2)}">
        Add to Cart
        </button>
    </div> `;
    prodHtml += html;
});
updateCartQuantity();
productElement.innerHTML = prodHtml;
document.querySelectorAll(".js-add-to-cart").forEach((button, i) => {
    button.addEventListener('click', () => {
        let productId = button.dataset.productId;
        addToCart(productId,i);
        updateCartQuantity();
    });
});