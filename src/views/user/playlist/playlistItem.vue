<template>
    <div>
        <div class="container py-5">
            <h1 class="text-center my-2">{{playlist.name}}</h1>

            <div v-if="playlist.user_id==user.id">
                <a @click="addPlaylistItemPage(playlist.id)" class="btn btn-secondary float-lg-end"><i class="fa-solid fa-plus"></i>Add To Playlist</a>
            </div>

                <div class="row">
                    <div class="text-center my-3" v-if="loadingStatus">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>

                    <div v-if="!loadingStatus">
                        <div v-if="posts.length==0" class=" text-center">
                            <h1>There is no post in this playlist</h1>
                        </div>
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
                                            <a @click="removePost(post.id)" v-if="post.user_id==user.id" class="btn btn-danger me-2" title="Remove"><i class="fa-solid fa-trash me-2"></i>Remove</a>
                                        </div>
                                    </div>

                                </div>
                            </div>
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
        name:'playlistItem',
        data () {
            return {
                playlist: {},
                posts:{},
                loadingStatus:false,
                postCount:0,
            }
        },
        computed: {
            ...mapState(['header','user']),
        },
        methods: {
            getData () {
                this.loadingStatus=true;
                axios.get(`https://alexmedia.alexlucifer.info/api/user/playlist/item/${this.$route.params.id}`,{headers:this.header}).then((response)=>{
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
                    this.loadingStatus=false;
                    this.postCount=response.data.posts.length;
                })
            },
            removePost(id){
                this.loadingStatus=true;
                axios.get(`https://alexmedia.alexlucifer.info/api/user/playlist/item/remove/${id}/${this.$route.params.id}`,{headers:this.header}).then((response)=>{
                    this.posts=response.data.posts;
                    for (let i = 0; i < this.posts.length; i++) {
                        if (this.posts[i].image!=null) {
                            this.posts[i].image=`https://alexmedia.alexlucifer.info/storage/${this.posts[i].image}`;
                        }else{
                            this.posts[i].image=`https://alexmedia.alexlucifer.info/image/default.png`;
                        }
                        let d=new Date(this.posts[i].created_at);
                        this.posts[i].created_at=`${d.getFullYear()}-${d.getMonth() + 1}-${d.getFullYear()}`
                    }
                    this.loadingStatus=false;
                    this.postCount=response.data.posts.length;
                })
            },
            addPlaylistItemPage(id){
                this.$router.push({
                    path:`/add/item/playlist/${id}`,
                })
            },
        },
        mounted () {
            this.getData();
        }
    }
</script>
