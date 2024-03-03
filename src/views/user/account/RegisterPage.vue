<template>
    <div class="py-5 row container-fluid">
        <div class="p-5 container shadow col-lg-6 offset-lg-3">
            <div class="row">
                <div class="col-lg-3 offset-lg-3">
                    <img class="w-100 rounded-circle" src="../../../assets/lucifer.jpg" alt="">
                </div>
                <div class="col-lg-5">
                    <div class="pt-3">
                        <h1 class="font-monospace">Alex</h1>
                        <h6 class="font-monospace">M e d i a <span>C o m p a n y</span></h6>
                    </div>
                </div>
            </div>
            <h3 class="text-center py-3">Create Account</h3>

            <div class="text-center my-3" v-if="loadingStatus">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
            </div>

            <div id="error" class="py-2"></div>

            <div id="form">
                <div class="py-2">
                    <label for="">Name</label>
                    <input type="text" class="form-control my-2" v-model="userData.name" id="name" placeholder="Enter your email .....">
                </div>
                <div class="py-2">
                    <label for="">Email</label>
                    <input type="text" class="form-control my-2" v-model="userData.email" id="email" placeholder="Enter your email .....">
                </div>
                <div class="py-2">
                    <label for="">Password</label>
                    <input type="password" class="form-control my-2" v-model="userData.password" id="password" placeholder="Enter your password .....">
                </div>
                <div class="py-2">
                    <label for="">Confirm Password</label>
                    <input type="password" class="form-control my-2" v-model="userData.confirm_password" id="password_confirmation" placeholder="Enter your password .....">
                </div>
                <div class="py-2">
                    <router-link to="/login">Already have an account?</router-link>
                </div>
                <div class="py-2">
                    <div class="d-flex justify-content-end" id="signUpBtnContainer">
                        <input type="button" @click="validation" id="signUpBtn" value="Sign Up" class="btn btn-primary justify-start">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name:'RegisterPage',
        data () {
            return {
                userData:{
                    name:'',
                    email:'',
                    password:'',
                    confirm_password:'',
                },
                loadingStatus:false,
                error:'',
            }
        },
        methods: {
            register(){
                this.loadingStatus=true;
                axios.post('https://alexmedia.alexlucifer.info/api/user/register',this.userData).then((response)=>{
                    if (response.data.token!=null) {
                        this.loginFail=false;

                        localStorage.setItem('token',response.data.token);//set token to localStorage

                        this.$store.dispatch('setToken',response.data.token);

                        this.$store.dispatch('setUser',response.data.user);

                        this.$router.push({name:'profile'});

                    }
                })
            },
            errorMessage(errorMessage){
                    this.error=`            
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            ${errorMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
            },
            validation () {

                    if(this.userData.name==''){

                        document.getElementById('signUpBtnContainer').classList.toggle('justify-content-end');
                        this.errorMessage('Name field is required !!!!');
                        document.getElementById('error').innerHTML=this.error;
                        this.loadingStatus=false;

                    }else if(this.userData.email==''){

                        document.getElementById('signUpBtnContainer').classList.toggle('justify-content-end');
                        this.errorMessage('Email field is required !!!!');
                        document.getElementById('error').innerHTML=this.error;
                        this.loadingStatus=false;

                    }else if(this.userData.password==''){

                        document.getElementById('signUpBtnContainer').classList.toggle('justify-content-end');
                        this.errorMessage('Password field is required !!!!');
                        document.getElementById('error').innerHTML=this.error;
                        this.loadingStatus=false;

                    }else if(this.userData.confirm_password==''){

                        document.getElementById('signUpBtnContainer').classList.toggle('justify-content-end');
                        this.errorMessage('Confirm Password field is required !!!!');
                        document.getElementById('error').innerHTML=this.error;
                        this.loadingStatus=false;

                    }else if(this.userData.password!=this.userData.confirm_password){
                        document.getElementById('signUpBtnContainer').classList.toggle('justify-content-end');
                        this.errorMessage('Password and Confirm Password must be same');
                        document.getElementById('error').innerHTML=this.error;
                        this.loadingStatus=false;
                    }else{
                        this.register();
                    }
            }
        }
    }
</script>

