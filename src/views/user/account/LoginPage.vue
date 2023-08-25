<template>
    <div class="py-5 row container-fluid">
        <div class="p-5 container shadow col-lg-6 offset-lg-3">
            <div class="row">
                <div class="col-lg-3 offset-lg-3">
                    <img class="w-100 rounded-circle" src="../../../assets/lucifer.jpg" alt="">
                </div>
                <div class="col-lg-5">
                    <div class="pt-3 text-center">
                        <h1 class="font-monospace">Alex</h1>
                        <h6 class="font-monospace">M e d i a  C o m p a n y</h6>
                    </div>
                </div>
            </div>
            <h3 class="text-center py-3">Login to Our Website</h3>

            <div class="text-center my-3" v-if="loadingStatus">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
            </div>

            <div id="error"></div>

            <div>
                <div class="py-2">
                    <label for="">Email</label>
                    <input type="text" v-model="userData.email" class="form-control my-2" name="email" id="email" placeholder="Enter your email .....">
                </div>
                <div class="py-2">
                    <label for="">Password</label>
                    <input type="password" v-model="userData.password" class="form-control my-2" name="password" id="password" placeholder="Enter your password .....">
                </div>
                <div class="py-2">
                    <router-link to="/register">You Don't have an account?</router-link>
                </div>
                <div class="py-2">
                    <div class="d-flex justify-content-end" id="loginBtnContainer">
                        <input @click="validation" type="button" id="loginBtn" value="Login" class="btn btn-primary justify-start">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";
export default {

    name:'LoginPage',
    data () {
        return {
            userData:{
                email:'',
                password:''
            },
            error:{
                email:false,
                password:false,
            },
            loginFail:false,
            loginSuccess:false,
            loadingStatus:false,
        }
    },
    computed: {
        ...mapGetters(['getToken','getUser']),
    },

    methods: {
        login () {
            this.loadingStatus=true;
            axios.post('http://alexmedia.alexlucifer.info/api/user/login',this.userData).then((response)=>{
                if (response.data.token!=null) {
                    this.loginSuccess=true;
                    this.loginFail=false;

                    localStorage.setItem('token',response.data.token);//set token to localStorage

                    this.$store.dispatch('setToken',response.data.token);

                    this.$store.dispatch('setUser',response.data.user);

                    this.$router.push({name:'profile'});

                }else{
                    this.loginFail=true;
                    this.loginSuccess=false;
                    this.loadingStatus=false;
                    let error=`            
                        <div class="alert alert-danger alert-dismissible fade show" v-if="loginFail" role="alert">
                            ${response.data.message}!!!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`
                    document.getElementById('error').innerHTML=error;
                }
            })

        },
        validation(){
            this.loadingStatus=true;

            if(this.userData.email==''){    
                document.getElementById('loginBtnContainer').classList.toggle('justify-content-end');
                let error=`            
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Email field is required !!!!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
                document.getElementById('error').innerHTML=error;
                this.loadingStatus=false;

            }else if(this.userData.password==''){
                document.getElementById('loginBtnContainer').classList.toggle('justify-content-end');
                let error=`            
                <div class="alert alert-danger alert-dismissible fade show" v-if="loginFail" role="alert">
                    Password field is required !!!!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
                document.getElementById('error').innerHTML=error;
                this.loadingStatus=false;

            }else{
                this.login()
            }
        }
    }
}
</script>
