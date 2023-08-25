<template>
    <div>
        <div class="container py-5">
        <h1 class=" text-center">Edit Profile</h1>

            <div class="text-center my-3" v-if="loadingStatus">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div class="alert alert-success alert-dismissible fade show col-4 offset-8" v-if="upSuccessAlert" role="alert">
                    Update Success
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            <div class="shadow p-5 row">
                <div class="col-4">

                    <img :src="userData.image" class=" w-75 shadow">

                    <input name="image" type="file" class="form-control my-4 " @change="upload">

                </div>
                <div class="col-8">
                    <div class="mb-3 row">
                        <label class="col-sm-3 col-form-label">Name</label>
                        <div class="col-sm-9">
                        <input name="name" type="text" v-model="userData.name" class="form-control" placeholder="Enter Name">

                            <span class="text-danger" v-if="status.name">Name is required !!!!!</span>

                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label class="col-sm-3 col-form-label">Email</label>
                        <div class="col-sm-9">
                        <input name="email" type="email" v-model="userData.email" class="form-control " placeholder="Enter Email">

                        <span class="text-danger" v-if="status.email">Email is required !!!!!</span>

                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label class="col-sm-3 col-form-label">Gender</label>
                        <div class="col-sm-9">
                        <select name="gender" class="form-control" v-model="userData.gender">
                            <option value="">Choose Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                        <span class="text-danger" v-if="status.gender">Gender is required !!!!!</span>

                        </div>
                    </div>



                    <div class="float-end">
                        <button class="btn btn-secondary update" @click="update()"><i class="fa-solid fa-pen-to-square me-2"></i>Update</button>
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
        name:'EditProfile',
        data () {
            return {
                userData: {},
                status:{
                    name:false,
                    email:false,
                    gender:false,
                },
                userImage:null,
                upSuccessAlert:false,
                loadingStatus:false,
            }
        },
        computed: {
            ...mapState(['user','header']),
        },
        components: {
        },
        methods: {
            getUser () {
                axios.get(`http://alexmedia.alexlucifer.info/api/user/get/${this.user.id}`,{headers:this.header}).then((response)=>{
                    this.userData=response.data;
                    if (this.userData.image==null) {
                        if(this.userData.gender=='male'){
                            this.userData.image=`http://alexmedia.alexlucifer.info/image/default-male-image.png`;
                        }else{
                            this.userData.image=`http://alexmedia.alexlucifer.info/image/default-female-image.webp`;
                        }
                    }else{
                        this.userData.image=`http://alexmedia.alexlucifer.info/storage/${this.userData.image}`;
                    }
                })
            },

            update(){

                this.loadingStatus=true;

                if(this.userData.name==''){
                    this.status.name=true;
                }
                if(this.userData.email==''){
                    this.status.email=true;
                }
                if(this.userData.gender==''){
                    this.status.gender=true;
                }

                if (this.status.name==false && this.status.email==false && this.status.gender==false) {
                    const data={
                        'user':this.userData,
                        'userImage':this.userImage,
                    };
                    this.header['Content-Type']='multipart/form-data';
                    axios.post(`http://alexmedia.alexlucifer.info/api/user/update/${this.userData.id}`,data,{headers:this.header}).then((response)=>{
                        this.userData=response.data;
                        if (this.userData.image==null) {
                            if(this.userData.gender=='male'){
                                this.userData.image=`http://alexmedia.alexlucifer.info/image/default-male-image.png`;
                            }else{
                                this.userData.image=`http://alexmedia.alexlucifer.info/image/default-female-image.webp`;
                            }
                        }else{
                            this.userData.image=`http://alexmedia.alexlucifer.info/storage/${this.userData.image}`;
                        }
                        
                        this.loadingStatus=false;
                        this.upSuccessAlert=true;
                        this.$router.push({name:'profile'});
                    })
                }

            },

            upload(event){
                this.userImage=event.target.files[0];
            }
        },
        mounted () {
            this.getUser();
        },
    }
</script>

