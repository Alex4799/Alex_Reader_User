<template>
    <div>
        <div class="container py-5">
        <h1 class="text-center">Profile</h1>
        <div class="p-3 shadow">

            <!-- @if (session('updateSucc'))
            <div class="alert alert-success alert-dismissible fade show col-4 offset-8" role="alert">
                {{session('updateSucc')}}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            @endif -->

            <div class="text-center my-3" v-if="loadingStatus">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <!-- profile  -->
            <div class="row">
                <div class="col-lg-3">
                    <img :src="userData.image" class=" w-75 shadow">
                </div>
                <div class="col-lg-8">
                    <div class="mt-4"><h1>{{userData.name}}</h1></div>
                    <div class="my-1"><h4>{{userData.email}}</h4></div>
                    <div class="my-1 row">
                        <div class="col-lg-6">
                            <h5>12M+ Followers</h5>
                        </div>
                        <div class="col-lg-6">
                            <a @click="AddPostPage" class="btn btn-info"><i class="fa-solid fa-plus me-2"></i>Add Post</a>
                            <router-link to="/profile/edit" class="btn btn-light ms-2"><i class="fa-solid fa-pen-to-square"></i>Edit Profile</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- My post  -->
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <div class="shadow my-2 p-5" v-for="(post,index) in myPost.data" :key="index">
                    <div class="row">

                        <div class="col-lg-3">
                            <img :src="post.image" class="w-100 card-img">
                        </div>

                        <div class="col-lg-9">

                            <h4 @click="toPostDetail(post.id)"><a>{{post.Title}}</a></h4>

                            <h5 class="text-muted">by <a>{{post.user_name}}</a></h5>
                            <p class="text-muted">{{post.created_at}}</p>

                            <!-- @if ($post->playlist_id!=null) -->
                                <p><a v-if="post.playlist_id != null">({{post.playlist_name}})</a></p>
                            <!-- @endif -->

                            <p class="" v-html="post.content.substr(0,100)"></p>

                            <div class="row">
                                <div class="col-6">
                                    <div class="btn btn-light"><a>{{post.category_name}}</a></div>
                                    <span><i class="fa-solid fa-eye me-2"></i>{{post.view_count}}</span>
                                </div>
                                <div class="col-4 offset-2">
                                    <button @click="deletePost(post.id)" class="btn btn-danger me-2" title="Delete"><i class="fa-solid fa-trash me-2"></i>Delete</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Bootstrap5Pagination :data="myPost" @pagination-change-page="getMyPost" />
            </div>
        </div>

    </div>
    </div>
</template>

<script>
    import { Bootstrap5Pagination } from 'laravel-vue-pagination';
    import {mapState} from 'vuex';
    import axios from 'axios';
    export default {
        name:'ProfilePage',
        data () {
            return {
                userData: {},
                myPost: {},
                loadingStatus:true,
            }
        },
        computed: {
           ...mapState(['user','header']),
        },
        components: {
            Bootstrap5Pagination
        },
        methods: {
            getUser () {
                axios.get(`https://alexmedia.alexlucifer.info/api/user/get/${this.user.id}`,{headers:this.header}).then((response)=>{
                    this.userData=response.data;
                    if (this.userData.image==null) {
                        if(this.userData.gender=='male'){
                            this.userData.image=`https://alexmedia.alexlucifer.info/image/default-male-image.png`;
                        }else{
                            this.userData.image=`https://alexmedia.alexlucifer.info/image/default-female-image.webp`;
                        }
                    }else{
                        this.userData.image=`https://alexmedia.alexlucifer.info/storage/${this.userData.image}`;
                    }
                })
            },
            getMyPost(page=1){
                axios.get(`https://alexmedia.alexlucifer.info/api/user/mypost/get/${this.user.id}?page=${page}`,{headers:this.header}).then((response)=>{
                    this.myPost=response.data;
                    for (let i = 0; i < this.myPost.data.length; i++) {
                        if (this.myPost.data[i].image!=null) {
                            this.myPost.data[i].image=`https://alexmedia.alexlucifer.info/storage/${this.myPost.data[i].image}`;
                        }else{
                            this.myPost.data[i].image=`https://alexmedia.alexlucifer.info/image/default.png`;
                        }
                        let d=new Date(this.myPost.data[i].created_at);
                        this.myPost.data[i].created_at=`${d.getFullYear()}-${d.getMonth() + 1}-${d.getFullYear()}`
                    }
                    this.loadingStatus=false;
                })
            },
            deletePost(id,page=1){
                this.loadingStatus=true;
                axios.get(`https://alexmedia.alexlucifer.info/api/user/post/delete/${id}?page=${page}`,{headers:this.header}).then((response)=>{
                    this.myPost=response.data;
                    for (let i = 0; i < this.myPost.data.length; i++) {
                        if (this.myPost.data[i].image!=null) {
                            this.myPost.data[i].image=`https://alexmedia.alexlucifer.info/storage/${this.myPost.data[i].image}`;
                        }else{
                            this.myPost.data[i].image=`https://alexmedia.alexlucifer.info/image/default.png`;
                        }
                        let d=new Date(this.myPost.data[i].created_at);
                        this.myPost.data[i].created_at=`${d.getFullYear()}-${d.getMonth() + 1}-${d.getFullYear()}`
                    }
                    this.loadingStatus=false;
                })
            },
            AddPostPage(){
                this.$router.push({name:'AddPost'});
            },
            toPostDetail(id){
                this.$router.push({path:`/post/detail/${id}`})
            }
        },
        beforeMount () {
            this.getUser();
        },
        mounted () {
            this.getMyPost();
        }
    }
</script>
