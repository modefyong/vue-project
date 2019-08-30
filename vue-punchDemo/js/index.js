new Vue({
    el: '#app',
    data: {
        progress: 100,
        ended: false,
        src1: './img/bag.png',
        srcBurst: './img/bag-burst.png'
    },
    methods: {
        tap: function() {
            this.progress -= 10;
            if (this.progress <= 0) {
                this.ended = true;
            }
        },
        restart: function() {
            this.progress = 100;
            this.ended = false;
        }
    }
})