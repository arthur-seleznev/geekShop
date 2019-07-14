const API = 'API/';

const app = new Vue({
    el: '#app',
    methods: {
        getJSON(url) {
           return  fetch(url)
                .then(data => data.json())
                .catch(error => console.log(error));
        }
    }
});

