<template>
    <div>
        <div class="container py-5">
            <div class="text-center my-3" v-if="loadingStatus">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div>
                <a @click="AddPostPage" class="btn btn-secondary float-lg-end"><i class="fa-solid fa-plus"></i>Add Post</a>
            </div>
            <div class="row text-center">
                    <div class="col-4">Search Key - {{ search_key }}</div>
                    <div class="col-4">Total - {{ postCount }}</div>
                    <div class="col-4">
                        <div class="input-group mb-3">
                            <input type="text" name="search_key" class="form-control" v-model="search_key" placeholder="Enter Author Name" aria-label="Recipient's username" aria-describedby="button-addon2">
                            <button class="btn btn-secondary" id="button-addon2" @click="postSearch" type="button">Search</button>
                        </div>
                    </div>
            </div>

            <div class="row">

                <div class="col-lg-2">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td @click="getPost()"><a>All</a></td>
                            </tr>
                            <tr @click="postCategory">
                                <td><a id="0">Trend Post</a></td>
                            </tr>
                            <tr v-for="(category,index) in categories" :key="index" @click="postCategory">
                                <td><a :id="category.id">{{ category.name }}</a></td>
                                
                            </tr>
                        </tbody>
                      </table>
                </div>
                <div class="col-lg-8">
                    <div class="shadow my-2 p-5" v-for="(post,index) in allPost.data" :key="index">
                        <div class="row">

                            <div class="col-lg-3">
                                <img :src="post.image" class="w-100 card-img">
                            </div>

                            <div class="col-lg-9">

                                <h4 class="" @click="toPostDetail(post.id)">{{post.Title}}</h4>

                                <h5 class="text-muted">by <a href="#">{{post.user_name}}</a></h5>
                                <p class="text-muted">{{post.created_at}}</p>

                                <p><a href="#" v-if="post.playlist_id != null">({{post.playlist_name}})</a></p>


                                <p class="" v-html="post.content.substr(0,100)"></p>

                                <div class="row">
                                    <div class="col-6">
                                        <div class="btn btn-light"><a href="#">{{post.category_name}}</a></div>
                                        <span><i class="fa-solid fa-eye me-2"></i>{{post.view_count}}</span>
                                    </div>
                                    <div class="col-4 offset-2">
                                        <a href="#" v-if="post.user_id==user.id" class="btn btn-danger me-2" title="Delete"><i class="fa-solid fa-trash me-2"></i>Delete</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <Bootstrap5Pagination :data="allPost" @pagination-change-page="getPost" />
                </div>
        </div>
        </div>
    </div>
</template>

<script>
    import { Bootstrap5Pagination } from 'laravel-vue-pagination';
    import axios from 'axios';
    import { mapState } from 'vuex';
    export default {
        name: 'PostPage',
        data () {
            return {
                allPost: {},
                categories:{},
                loadingStatus:true,
                search_key:'',
                postCount:0,
            }
        },
        computed: {
            ...mapState(['header','user']),
        },
        components: {
            Bootstrap5Pagination
        },
        methods: {
            getPost (page=1) {
                this.loadingStatus=true;
                axios.get(`https://alexmedia.alexlucifer.info/api/user/post/get?page=${page}`,{headers:this.header}).then((response)=>{
                    this.allPost=response.data;
                    for (let i = 0; i < this.allPost.data.length; i++) {
                        if (this.allPost.data[i].image!=null) {
                            this.allPost.data[i].image=`https://alexmedia.alexlucifer.info/storage/${this.allPost.data[i].image}`;
                        }else{
                            this.allPost.data[i].image=`https://alexmedia.alexlucifer.info/image/default.png`;
                        }
                        let d=new Date(this.allPost.data[i].created_at);
                        this.allPost.data[i].created_at=`${d.getFullYear()}-${d.getMonth() + 1}-${d.getFullYear()}`
                    }
                    this.loadingStatus=false;
                    this.postCount=response.data.total;
                })
            },
            getCategory(){
                axios.get('https://alexmedia.alexlucifer.info/api/user/category/get',{headers:this.header}).then((response)=>{
                    this.categories=response.data.data;
                })
            },
            
            postCategory(event){
                this.loadingStatus=true;
                let category_id=event.target.id;
                    if (category_id!=0) {
                        axios.get(`https://alexmedia.alexlucifer.info/api/user/post/get/category/${category_id}`,{headers:this.header}).then((response)=>{
                            this.allPost=response.data;
                    for (let i = 0; i < this.allPost.data.length; i++) {
                        if (this.allPost.data[i].image!=null) {
                            this.allPost.data[i].image=`https://alexmedia.alexlucifer.info/storage/${this.allPost.data[i].image}`;
                        }else{
                            this.allPost.data[i].image=`https://alexmedia.alexlucifer.info/image/default.png`;
                        }
                        let d=new Date(this.allPost.data[i].created_at);
                        this.allPost.data[i].created_at=`${d.getFullYear()}-${d.getMonth() + 1}-${d.getFullYear()}`
                    }
                    this.loadingStatus=false;
                    this.postCount=response.data.total;

                        })

                    }else{
                        this.allPost.data=this.allPost.data.sort((a,b)=>{
                            return b.view_count - a.view_count;
                        });
                        this.loadingStatus=false;
                    }

            },
            postSearch(page=1){
                this.loadingStatus=true;
                if(this.search_key!=''){
                    axios.get(`https://alexmedia.alexlucifer.info/api/user/post/get/search/${this.search_key}?page=${page}`,{headers:this.header}).then((response)=>{
                        this.allPost=response.data;
                    for (let i = 0; i < this.allPost.data.length; i++) {
                        if (this.allPost.data[i].image!=null) {
                            this.allPost.data[i].image=`https://alexmedia.alexlucifer.info/storage/${this.allPost.data[i].image}`;
                        }else{
                            this.allPost.data[i].image=`https://alexmedia.alexlucifer.info/image/default.png`;
                        }
                        let d=new Date(this.allPost.data[i].created_at);
                        this.allPost.data[i].created_at=`${d.getFullYear()}-${d.getMonth() + 1}-${d.getFullYear()}`
                    }
                    this.loadingStatus=false;
                    this.postCount=response.data.total;
                         
                    })
                }
                this.loadingStatus=false;
            },
            AddPostPage(){
                this.$router.push({name:'AddPost'});
            },
            toPostDetail(id){
                this.$router.push({path:`/post/detail/${id}`})
            }
        },
        mounted () {
            this.getPost();
            this.getCategory();
        }
    }
</script>

