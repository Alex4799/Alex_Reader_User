<template>
<div class="container py-5">
    <h1 class="text-center mb-5">Change password</h1>

            <div class="text-center my-3" v-if="loadingStatus">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

        <div class="row">

            <div class="alert alert-danger alert-dismissible fade show" v-if="error.incorrect_password" role="alert">
                Incorrect Password
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            
            <div class="col-lg-6 offset-lg-3 shadow p-5">
                <div class="mb-3">
                    <label class="">Current Password</label>
                    <div class="">
                    <input v-model="data.current_password" v-if="!error.current_password_error" name="current_password" type="password" class="password form-control" placeholder="Enter Current Password">
                    <input v-model="data.current_password" v-if="error.current_password_error" name="current_password" type="password" class="password form-control @error('name') is-invalid @enderror" placeholder="Enter Current Password">
                        <span v-if="error.current_password_error" class="text-danger">Current Password Field Is Required !!!!!!!</span>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label class="">New Password</label>
                    <div class="">
                    <input v-model="data.password" v-if="!error.password_error" name="password" type="password" class="password form-control" placeholder="Enter New Password">
                    <input v-model="data.password" v-if="error.password_error" name="password" type="password" class="password form-control @error('name') is-invalid @enderror" placeholder="Enter New Password">
                        <span v-if="error.password_error" class="text-danger">New Password Field Is Required !!!!!!!</span>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label class="">Confirm Password</label>
                    <div class="">
                    <input v-model="data.confirm_password" v-if="!error.confirm_password_error" name="confirm_password" type="password" class="password form-control" placeholder="Enter Confirm Password">
                    <input v-model="data.confirm_password" v-if="error.confirm_password_error" name="confirm_password" type="password" class="password form-control @error('name') is-invalid @enderror" placeholder="Enter Confirm Password">
                        <span v-if="error.confirm_password_error" class="text-danger">Confirm Password Field Is Required !!!!!!!</span>
                        
                        <span v-if="error.same_error" class="text-danger">Password and Confirm Password must be same !!!!</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-6">
                        <input type="checkbox" @click="showPassword" class="me-1">Show Password
                    </div>
                    <div class="col-lg-3 offset-lg-3">
                        <button class="btn btn-secondary" type="button" @click="validation">Change</button>
                    </div>
                </div>

            </div>
        </div>

</div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
    export default {
        name:'ChangePassword',
        data () {
            return {
                data:{
                    current_password:'',
                    password:'',
                    confirm_password:'',
                },
                error:{
                    current_password_error:false,
                    password_error:false,
                    confirm_password_error:false,
                    same_error:false,
                    incorrect_password:false,
                },
                loadingStatus:false,
            }
        },
        computed: {
            ...mapState(['header','user'])
        },
        methods: {
            showPassword(){
                let input=document.getElementsByClassName('password');
                for (let i = 0; i < input.length; i++) {
                    if (input[i].type=='password') {
                        input[i].type='text';
                    }else{
                        input[i].type='password'
                    }
                }
            },
            validation(){
                this.loadingStatus=true;
                if (this.data.current_password=='') {
                    this.error.current_password_error=true;
                }else{
                    this.error.current_password_error=false;
                }

                if (this.data.password=='') {
                    this.error.password_error=true;
                }else{
                    this.error.password_error=false;
                }

                if (this.data.confirm_password=='') {
                    this.error.confirm_password_error=true;
                }else{
                    this.error.confirm_password_error=false;
                }

                
                if(this.data.current_password=='' || this.data.password=='' || this.data.confirm_password==''){
                    console.log('fail');
                
                }else{
                    if (this.data.password==this.data.confirm_password) {
                        this.error.same_error=false;
                        
                        axios.post(`https://alexmedia.alexlucifer.info/api/user/change/password`,this.data,{headers:this.header}).then((response)=>{
                            if (response.data.status=='success') {
                                this.loadingStatus=false;
                                this.error.incorrect_password=true;
                                this.$router.push({
                                    name:'profile',
                                })
                            }else{
                                this.loadingStatus=false;
                                this.error.incorrect_password=true;
                            }
                        })
                    }else{
                        this.error.same_error=true;
                        console.log('fail');

                    }
                }
            },
        }
    }
</script>
