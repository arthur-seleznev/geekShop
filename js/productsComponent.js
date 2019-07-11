Vue.component('products', {
    data() {
        return {
            productsUrl: 'products.json',
            products: []
        }
    },

    props: ['list_size', "class_name"],

    mounted() {
        this.$parent.getJSON(API + this.productsUrl)
            .then(result => {
                for (let i = 0; i < this.list_size; i++) {
                    let find = true;
                    while (find) {
                        let element = Math.floor(Math.random() * result.length);
                        find = this.products.find(el => el.id === result[element].id);
                        if (!find) {this.products.push(result[element]);}
                    }

                }
            })
    },

    template: `<div class="product__cards">
        <product 
        v-for="product of products" 
        :key="product.id"
        :product="product">
        </product>
    </div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    template: ` <div class="item">
                <div class="photo"><a href="single-page.html"><img :src="product.img" :alt="product.name"></a></div>
                <div class="info">
                    <a class="item__name" href="single-page.html">{{product.name}}</a>
                    <p class="item__price">$ {{product.price}}.00</p>
                </div>
                <button class="product__add" @click="$root.$refs.cartData.addToCart(product)"><img src="img/white_cart.svg" alt="cart">Add to Cart</button>
            </div>`
})