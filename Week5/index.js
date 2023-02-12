const { createApp } = Vue;//解構寫法
const BaseUrl = "https://vue3-course-api.hexschool.io/v2";
const API_PATH = "raychen";
Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== "default") {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});
// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL("./zh_TW.json");

VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize("zh_TW"),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});


createApp({
  data() {
    return {
      products: [],
      cart: {},
      more: {},
      orderCount: 1,
      index: 0,
      myModal: "",
      isLoading: false,
      form: {
        email: "",
        name: "",
        phone: "",
        address: "",
        message: "",
      },
    };
  },
  methods: {
    getProducts() {
      axios
      .get(`${BaseUrl}/api/${API_PATH}/products`)
      .then((res) => {
        this.products = res.data.products;
      });
    },
    getCart() {
      axios
      .get(`${BaseUrl}/api/${API_PATH}/cart`)
      .then((res) => {
        this.cart = res.data.data;
        this.index = this.cart.carts.length;
      });
    },
    showSweetAlert(message){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500
        })
    },
    viewMore(item) {
      this.isLoading = true;
      this.more = item;
      this.myModal.show();
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    AddCart() {
      const cart = {
        product_id: this.more.id,
        qty: this.orderCount,
      };
      axios
      .post(`${BaseUrl}/api/${API_PATH}/cart`, { data: cart })
      .then((res) => {
        this.getCart();
      });
      this.myModal.hide();
    },
    joinCart(item, qty = 1) {//數量:參數預設值1
      this.isLoading = true;
      const cart = {
        product_id: item.id,
        qty,
      };
      axios
      .post(`${BaseUrl}/api/${API_PATH}/cart`, { data: cart })
      .then((res) => {
        this.getCart();
        this.showSweetAlert("已加入");
        this.isLoading = false;
      });
    },
    updateCart(item) {
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      axios
        .put(`${BaseUrl}/api/${API_PATH}/cart/${item.id}`,
          { 
            data: cart 
          })
        .then((res) => {
          this.getCart();
        });
    },
    delCart(item) {
      this.isLoading = true;
      axios
      .delete(`${BaseUrl}/api/${API_PATH}/cart/${item}`)
      .then((res) => {
        this.cart.carts.forEach((element, index) => {
          if (item == element.id) {
            this.cart.carts.splice(index, 1);
          }
        });
        this.getCart();
        this.showSweetAlert("已刪除");
        this.isLoading = false;
      });
    },
    clearCart() {
      axios
      .delete(`${BaseUrl}/api/${API_PATH}/carts/`)
      .then((res) => {
        this.getCart();
        this.showSweetAlert("已清空");
      });
    },
    createOrder() {
        axios
        .post(`${BaseUrl}/api/${API_PATH}/order`, { 
            data: {
                "user":{
                    "name":this.form.name,
                    "email":this.form.email,
                    "tel":this.form.phone,
                    "address":this.form.address
                },
                "message":this.form.message
            }
        })
        .then((res) => {
            this.getCart();
            this.showSweetAlert("已送出訂單");
            this.isLoading = false;
            this.$refs.form.reset();
        })
        .catch((err)=>{
            console.log(err.data.message);
        })
    },
  },
  mounted() {
    this.getProducts();
    this.getCart();
    this.myModal = new bootstrap.Modal(document.getElementById("productModal"));
  },
}).component("VForm", VeeValidate.Form)
  .component("VField", VeeValidate.Field)
  .component("ErrorMessage", VeeValidate.ErrorMessage)
  .component('loading', VueLoading)
  .mount("#app");