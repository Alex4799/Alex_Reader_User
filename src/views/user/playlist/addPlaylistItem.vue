<template>
    <div class="container py-5">
        <h1 class="text-center">Add To {{playlist.name}}</h1>
        <!-- <div>
            <form action="#" method="get" class="row text-center">
                <div class="col-4">Search Key - {{request('search_key')}}</div>
                <div class="col-4">Total - {{$posts->total()}}</div>
                <div class="col-4">
                    <div class="input-group mb-3">
                        <input type="text" name="search_key" class="form-control" value="{{request('search_key')}}" placeholder="Enter Author Name" aria-label="Recipient's username" aria-describedby="button-addon2">
                        <input class="btn btn-secondary" type="submit" id="button-addon2" value="Search">
                    </div>
                </div>
            </form>
        </div> -->
            <div class="text-center my-3" v-if="loadingStatus">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div class="row" v-if="!loadingStatus">

                <div class="col-lg-8 offset-lg-2 shadow my-2 p-5" v-for="(post,index) in posts" :key="index">
                    <div class="row">

                        <div class="col-lg-3">
                            <img :src="post.image" class="w-100 card-img">
                        </div>

                        <div class="col-lg-9">

                            <h4 class="" @click="toPostDetail(post.id)">{{post.Title}}</h4>

                            <h5 class="text-muted">by <a href="#">{{post.user_name}}</a></h5>
                            <p class="text-muted">{{post.created_at}}</p>

                            <p><a href="#" v-if="post.playlist_id != null">({{post.playlist_name}})</a></p>


                            <p class="">{{ post.content.substr(0,100)+'....'}}</p>

                            <div class="row">
                                <div class="col-6">
                                    <div class="btn btn-light"><a href="#">{{post.category_name}}</a></div>
                                    <span><i class="fa-solid fa-eye me-2"></i>{{post.view_count}}</span>
                                </div>
                                <div class="col-4 offset-2">
                                    <a @click="addPost(post.id)" v-if="post.user_id==user.id" class="btn btn-success me-2" title="Remove"><i class="fa-solid fa-plus me-2"></i>Add</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
    export default {
        name:'addPlaylistItem',
        data () {
            return {
                posts: {},
                loadingStatus:false,
                playlist:{},
            }
        },
        computed: {
            ...mapState(['header','user'])
        },
        methods: {
            getData () {
                this.loadingStatus=true;
                axios.get(`https://alexmedia.alexlucifer.info/api/user/playlist/item/add/getData/${this.$route.params.id}`,{headers:this.header}).then((response)=>{
                    this.setData(response);
                    this.loadingStatus=false;
                });
            },
            addPost(id){
                this.loadingStatus=true;
                axios.get(`https://alexmedia.alexlucifer.info/api/user/playlist/item/add/${id}/${this.playlist.id}`,{headers:this.header}).then((response)=>{
                    this.setData(response);
                    this.loadingStatus=false;
                });
            },
            setData(response){
                this.posts=response.data.posts;
                    this.playlist=response.data.playlist;
                    for (let i = 0; i < this.posts.length; i++) {
                        if (this.posts[i].image!=null) {
                            this.posts[i].image=`https://alexmedia.alexlucifer.info/storage/${this.posts[i].image}`;
                        }else{
                            this.posts[i].image=`https://alexmedia.alexlucifer.info/image/default.png`;
                        }
                        let d=new Date(this.posts[i].created_at);
                        this.posts[i].created_at=`${d.getFullYear()}-${d.getMonth() + 1}-${d.getFullYear()}`
                    }

                    this.postCount=response.data.posts.length;
            }
        },
        mounted () {
            this.getData();
        }

    }
</script>

