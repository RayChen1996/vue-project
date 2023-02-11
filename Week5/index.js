const BaseUrl = `https://vue3-course-api.hexschool.io/v2`
const apiPath = 'raychen';
import BSModal from './BSModal.js'

const app = Vue.createApp({
    data(){
        return{
            // tmp:[1,2,3,4,5],
            products:[],
            cart:[],
            DetailPageLoadingStatus: {
                LoadingProduct:'',
            },
            product: {},
            ShoppingCartForm: {
                user: {
                  name: '',
                  email: '',
                  tel: '',
                  address: '',
                },
                message: '',
            },
        }
    },
    methods: {
        //獲取所有產品API
        getAllProducts(){
          const url = `${BaseUrl}/api/${apiPath}/products`;///v2/api/{api_path}/products
          axios.get(url).then((response) => {
            this.products = response.data;
            console.log(response.data);
            console.log(response.data.products);
          }).catch((err) => {
            alert(err.response.data.message);
          });
        },
        viewSingleProductDetail(productId){
          //https://vue3-course-api.hexschool.io/v2/api/raychen/product/4
          const url = `${BaseUrl}/api/${apiPath}/product/${productId}`;///v2/api/{api_path}/products
          axios.get(url).then((response) => {
            // this.product = response.data;
            // console.log(response.data);
            // console.log(response.data.product);
          }).catch((err) => {
            alert(err.response.data.message);
          });


        },
        //獲取下方購物車列表
        getUserCart() {
            const url = `${BaseUrl}/api/${apiPath}/cart`;
            axios.get(url).then((response) => {
              this.cart = response.data.data;
            }).catch((err) => {
              alert(err.response.data.message);
            });
        },
        //點進會彈出Modal詳細頁
        clickDetailProductPage(productId){
          //https://vue3-course-api.hexschool.io/v2/api/raychen/product/4
          const url = `${BaseUrl}/api/${apiPath}/product/${productId}`;///v2/api/{api_path}/products
          axios.get(url).then((response) => {
            console.log(response)
            // this.product = response.data;
        
            
            this.$refs.BSModal.openModal()
          }).catch((err) => {
            alert(err);
          });
        },
        //新增訂單
        newOrder(){

        },
        //刪除下方購物車清單
        deleteCartItem(){

        },


    },
    mounted() {
        //先獲得上方產品列表
        this.getAllProducts();
        //
        // getUserCart();
    },

})
.component('BSModal',BSModal)
.mount("#app");
