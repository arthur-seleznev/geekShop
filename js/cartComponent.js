Vue.component('cart-data', {
    data() {
        return {
            cartUrl: '/cart.json',
            cartItems: [],
        }
    },
    computed: {
        calcCartPrice() {
            return this.cartItems.reduce((totalAmount, item) => totalAmount + item.quantity * item.price, 0);
        }
    },

    methods: {
        addToCart(product) {
            this.$parent.getJSON(`${API}/addToCart.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cartItems.find(el => el.id === product.id);
                        if (find) {
                            if (!product.quantity) {find.quantity++}
                            else {find.quantity += +(product.quantity)}
                        } else {
                            if (!product.quantity) {this.cartItems.push(Object.assign({quantity: 1}, product))}
                            else {this.cartItems.push(Object.assign({}, product))}
                        }
                    } else {
                        console.log('error!')
                    }
                })
        },
        checkItemQty(cartItem) {
            let qtyRule = /^[1-9]\d*$/;
            if (!qtyRule.test(cartItem.quantity)) {
                cartItem.quantity = 1
            }
            ;
        },
        removeFromCart(product) {
            this.$parent.getJSON(`${API}/deleteFromCart.json`)
                .then(data => {
                    if (data.result) {
                        if (!product.id) {
                            this.cartItems = []
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1)
                        }
                    } else {
                        console.log('error!')
                    }
                })
        },
    },
    mounted() {
        this.$parent.getJSON(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data) {
                    this.cartItems.push(el);
                }
            });
    },
    template:`<div style="display: none"></div>`
});

Vue.component('cart', {
    template: `
    <div class="container shopping-cart">
        <table>
            <tr>
                <th class="_first-col">Product details</th>
                <th>Unit price</th>
                <th>Quantity</th>
                <th>Shipping</th>
                <th>Subtotal</th>
                <th class="_last-col">Action</th>
            </tr>
            <cart-item
                v-for="item of $root.$refs.cartData.cartItems"
                :key="item.id"
                :cart-item="item"
                @remove="$root.$refs.cartData.removeFromCart"
                @changeQty="$root.$refs.cartData.checkItemQty"
            ></cart-item>
            <tr>
                <td colspan="6" v-if="!$root.$refs.cartData.cartItems.length">Корзина пуста.</td>
            </tr>
        </table>
        <div class="shopping-cart__actions-block">
            <button class="shopping-cart__actions-btn" @click="$root.$refs.cartData.removeFromCart">Clear shopping cart</button>
            <a class="shopping-cart__actions-btn" href="product.html">Continue shopping</a>
        </div>
        <div class="shopping-cart__details-block">
            <form action="#" class="shopping-cart__details-form">
            <h3 class="shopping-cart__details-h3">Shipping address</h3>
            <select name="shipping-details-country" id="shipping-details-country" class="shopping-cart__details-input">
                <option value="Bangladesh">Bangladesh</option>
                <option value="Russian Federation">Russian Federation</option>
            </select>
            <input type="text" placeholder="State" class="shopping-cart__details-input">
            <input type="text" placeholder="Postal/Zip" class="shopping-cart__details-input">
            <button class="shopping-cart__details-btn">get a quote</button>
            </form>
            <form action="#" class="shopping-cart__details-form">
                <h3 class="shopping-cart__details-h3">Coupon discount</h3>
                <p class="shopping-cart__details-text">Enter your coupon code if you have one</p>
                <input type="text" class="shopping-cart__details-input">
                <button class="shopping-cart__details-btn">Apply coupon</button>
            </form>
            <div class="shopping-cart__proceed-form">
                <p class="shopping-cart__sub-total">Sub total &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$ {{$root.$refs.cartData.calcCartPrice}}</p>
                <p class="shopping-cart__grand-total">Sub total &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="pink">$ {{$root.$refs.cartData.calcCartPrice}}</span></p>
                <a href="checkout.html" class="shopping-cart__checkout-btn">Proceed to checkout</a>
            </div>
        </div>
    </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
        <tr>
            <td class="_first-col">
                <img :src="cartItem.img" :alt="cartItem.name" class="shopping-cart__icon">
                <h3 class="shopping-cart__product-header">{{cartItem.name}}</h3>
                <p>Color: <span class="grey">Red</span></p>
                <p>Size: <span class="grey">XXL</span></p>
            </td>
            <td>$ {{cartItem.price}}.00</td>
            <td>
                <input type="text" class="shopping-cart__qty" v-model="cartItem.quantity" @input="$emit('changeQty', cartItem)">
            </td>
            <td>FREE</td>
            <td>$ {{cartItem.quantity * cartItem.price}}.00</td>
            <td class="_last-col"><button><i class="fas fa-times-circle" @click="$emit('remove', cartItem)"></i></button></td>
        </tr>`
});

Vue.component('mini-cart', {
   template: `
           <div class="header__right">
               <div class="mini-cart-shortcuts">
                    <a href="cart.html"><img class="header__cart" src="img/cart.svg" alt="cart"></a>
                    <div class="cart-num-icon">{{$root.$refs.cartData.cartItems.length}}</div>
                    <a href="cart.html" class="button">My Account <i class="fas fa-caret-down"></i></a>
               </div>
               <div class="mini-cart" v-if="!$root.$refs.cartData.cartItems.length">Корзина пуста</div>
               <div v-else class="mini-cart">
                    <mini-cart-item
                    v-for="item of $root.$refs.cartData.cartItems"
                    :key="item.id"
                    :cart-item="item"
                    @remove="$root.$refs.cartData.removeFromCart"
                    ></mini-cart-item>
                    <div class="mini-cart__total">
                        <p>TOTAL</p>
                        <p>$ {{$root.$refs.cartData.calcCartPrice}}.00</p>
                    </div>
                    <a href="checkout.html" class="mini-cart__pinkbtn">Checkout</a>
                    <a href="cart.html" class="mini-cart__greybtn">Go to cart</a>
               </div>

           </div>

   `
});

Vue.component('mini-cart-item', {
    props:['cartItem'],
    template: `
        <div class="mini-cart__item">
            <img class="mini-cart__img" :src="cartItem.img" alt="cartItem.name">
            <div class="mini-cart__desc">
                <h3>{{cartItem.name}}</h3>
                <p class="mini-cart__rating"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></p>
                <p class="mini-cart__nums"><span>{{cartItem.quantity}}</span>&nbsp;x&nbsp; $ {{cartItem.price}}.00</p>
            </div>
            <div class="mini-cart__action">
                <button @click="$emit('remove', cartItem)"><i class="fas fa-times-circle"></i></button>
            </div>
        </div> 
    `
})


