Vue.component('single-product', {
    data() {
        return {
            product: {
                id: 119,
                name: "MOSCHINO CHEAP AND CHIC",
                img: "img/6.jpg",
                price: 561,
                quantity: 1
            }
        }
    },

    methods: {
        checkItemQty(cartItem) {
            let qtyRule = /^[1-9]\d*$/;
            if (!qtyRule.test(this.product.quantity)) {
                this.product.quantity = 1
            }
        }
    },

        template: `
           <div class="product-description__form-to-cart">
            <div class="product-description__selection">
                <h3 class="product-description__form-h3">CHOOSE COLOR</h3>
                <select name="choose-color" class="product-description__to-cart-option">
                    <option value="Red" class="option-color">Red</option>
                    <option value="Yellow" class="option-color">Yellow</option>
                    <option value="Green" class="option-color">Green</option>
                </select>
            </div>
            <div class="product-description__selection">
                <h3 class="product-description__form-h3">CHOOSE SIZE</h3>
                <select name="choose-size" class="product-description__to-cart-option">
                    <option value="XXS">XXS</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
            </div>
            <div class="product-description__selection">
                <h3 class="product-description__form-h3">QUANTITY</h3>
                <input type="text" value="1" class="product-description__to-cart-option" v-model="product.quantity" @input="checkItemQty">
            </div>
            <button class="product-description__to-cart-btn" @click="$root.$refs.cartData.addToCart(product)">
                <img class="product-description__cart-icon" src="img/pink_cart.svg" alt="cart">
                <p>Add to cart</p>
            </button>
            </div>
    `
    });