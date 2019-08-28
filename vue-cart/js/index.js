Vue.filter("money", function(value, type) {
    return '¥ ' + value.toFixed(2) + type;
})
new Vue({
    el: '#app',
    data: {
        productList: [],
        productNum: 0,
        num: 0,
        flag: false,
        totalPrice: 0,
        delFlag: false,
        curProduct: ''
    },
    mounted() {
        this.$nextTick(function() {
            this.getCartList();
        })
    },
    methods: {
        getCartList() {
            this.$http.get("../json/cartData.json", { "id": 123 }).then((result) => {
                console.log(result.data.result.list);
                // console.log(result.data.result.list[0].parts[0].partsName);
                this.productList = result.data.result.list;
            }).catch((err) => {

            });
        },
        changeMoney(product, way) {
            if (way > 0) {
                // 数量增加
                product.productQuantity++
            } else {
                product.productQuantity--
                    if (product.productQuantity < 1) {
                        product.productQuantity = 1
                    }
            }
            // 全选时计算总金额
            this.calTotalPrice();
        },
        calTotalPrice() {
            var _this = this;
            this.totalPrice = 0;
            this.productList.forEach(function(item, index) {
                if (item.checked) {
                    _this.totalPrice += item.productPrice * item.productQuantity
                }
            })
        },
        changeAll(data) {
            this.flag = data;
            var _this = this;
            this.productList.forEach(function(item, index) {
                    if (typeof item.checked == "undefined") {
                        _this.$set(item, "checked", _this.flag)
                    } else {
                        item.checked = _this.flag
                    }
                })
                // 全选时计算总金额
            this.calTotalPrice();
        },
        selectedProduct(item) {
            if (typeof item.checked == "undefined") {
                // 利用这种方式监听vue中不存在的变量
                // Vue.set(item, "checked", true)
                this.$set(item, "checked", true)
            } else {
                item.checked = !item.checked
            }
            // 计算总金额
            this.calTotalPrice();
        },
        popDelWindow(item) {
            // console.log(item);//对象
            // 将item保存到一个变量里，方便引用。
            this.curProduct = item;
            this.delFlag = true;
            var _this = this;
            mui.confirm('确认删除吗？', '', new Array('是', '否'), function(e) {
                if (e.index == 0) {
                    mui.toast('已删除');
                    _this.delProduct();
                    _this.delFlag = false;
                } else {
                    mui.toast('取消');
                    _this.delFlag = false;
                }
            });
        },
        delProduct() { //模拟删除，假删
            // 不大明白？不能直接传入参数item，这是个对象。
            var index = this.productList.indexOf(this.curProduct);
            console.log(index);
            this.productList.splice(index, 1);
        }
    },
    filters: {
        dataFormat(data) {
            return '¥ ' + data.toFixed(2)
        }
    }
})