const {createApp} = Vue
const BaseUrl = `https://vue3-course-api.hexschool.io/v2`
const app = createApp({
    data(){
        return{
            user:{
                username:'ray.10315332@gmail.com',
                password:'As123df0'
            }
        }
    },
    methods: {
        login(){
            console.log("login")
            console.log(this.user)
       
            axios.post(`${BaseUrl}/admin/signin`,this.user)
            .then((res)=>{
                console.log(res)
                const { token, expired } = res.data
                localStorage.setItem("token",token)
                localStorage.setItem("expired",expired)
                window.location.href = "product.html"
            })
            .catch((err)=>{
                console.log(err)
            })
        },

    },

}).mount("#app")