<template>
    <div>
        <div class="text-center my-3" v-if="loadingStatus">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
        </div>
        <div v-if="!loadingStatus" class=" container-fluid py-5">
        <h1 class="text-center">View Post</h1>

            <div class="row">
                <div class="col-lg-2">
                    <h1 class=" text-center">{{data.post.playlist_name}}</h1>
                    <div class="overflows">
                        <div v-for="(item,index) in data.playListItem" :key="index">
                            <a class="btn btn-outline-dark w-100" @click="toPostDetail(item.id)">{{item.Title}}</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 shadow my-2 p-5">
                    <div class="row my-2">
                        <div class="row">
                        <div class="col-3">
                            <img :src="data.post.image" class="card-img w-100" >
                        </div>
                        <div class="col-8">
                            <h4 class="">{{data.post.Title}}</h4>

                            <h5 class="text-muted">by <a>{{data.post.user_name}}</a></h5>
                            <p class="text-muted">{{data.post.created_at}}</p>

                            <p v-if="playlistStatus"><a>({{data.post.playlist_name}})</a></p>

                                <div class="btn btn-light"><a>{{data.post.category_name}}</a></div>
                            <span><i class="fa-solid fa-eye me-2"></i>{{data.post.view_count}}</span>
                        </div>
                    </div>
                    <p class="">{{ data.post.content }}</p>

                    <div class="row">

                        <div class="col-6">
                            <div class="my-2">
                                <a @click="setlike" class="btn btn-light">
                                    <i v-if="data.post.my_like_status" class="fa-solid fa-heart text-danger me-2"></i>
                                    <i v-if="!data.post.my_like_status" class="fa-regular fa-heart me-2"></i>{{data.post.like_count}}
                                </a>
                            </div>
                        </div>

                        <div class="col-6" v-if="editStatus">
                            <div class="float-end">
                                <a @click="goEditPage" class="btn btn-light shadow"><i class="fa-solid fa-pen-to-square me-2"></i>Edit</a>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div class="col-lg-2 pe-2">
                    <h1 class="text-center">Related Post</h1>
                <div class="overflows">
                    <div v-for="(item,index) in data.relatedPost" :key="index" class="row my-2 shadow p-2">
                        <div class="col-3">
                            <img :src="item.image" class="card-img w-100">
                        </div>

                        <div class="col-9">

                            <h5 @click="toPostDetail(item.id)"><a class="text-dark text-decoration-none" >{{item.Title}}</a></h5>

                            <p class="text-muted">by {{item.user_name}}</p>

                            <p class="">{{item.content.substr(0,10)+'....' }}</p>

                        </div>
                    </div>
                </div>
                </div>
        </div> 

            <div class="row">
                <div class="offset-lg-2 col-lg-8">
                    <h1>Comment</h1>

                        <div class="row shadow p-3 my-3">
                            <div class="col-6 offset-2">
                                <textarea v-if="!commentError" name="comment" class="form-control" cols="30" rows="1" v-model="comment" placeholder="Enter your comment"></textarea>
                                <textarea v-if="commentError" name="comment" class="form-control is-invalid" cols="30" rows="1" v-model="comment" placeholder="Enter your comment"></textarea>
                                <span v-if="commentError" class="text-danger">Comment text is required !!!!</span>

                            </div>
                            <div class="col-2">
                                <button class="btn btn-light" @click="sendComment">Send</button>
                                <div class="text-center my-3" v-if="messageLoadingStatus">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-for="(comment,index) in this.data.comments" :key="index">
                            <div class="p-3 border rounded my-2 comment" v-if="comment.reply_id==null">
                            <h5><a>{{comment.user_name}}</a></h5>
                            <p class="px-2">{{comment.comment}}</p>
                            <div class="row">
                                <a class="btn btn-light col-2 offset-8 reply">
                                    <i class="fa-solid fa-reply"></i>Reply
                                </a>
                                <a class="btn btn-light col-2 offset-8 close" style="display: none">
                                    <i class="fa-solid fa-xmark"></i>Close
                                </a>
                            </div>

                            <div id='reply-box' style="display: none">
                                    <div class="row my-3">
                                        <div class="col-6 offset-2">
                                            <textarea name="comment" class="form-control" cols="30" rows="1" placeholder="Enter your comment"></textarea>
                                            <!-- <input type="hidden" name='user_id' value="{{Auth::user()->id}}">
                                            <input type="hidden" name='post_id' value="{{$post->id}}">
                                            <input type="hidden" name="reply_id" value="{{comment->id}}"> -->
                                        </div>
                                        <div class="col-2">
                                            <button class="btn btn-light shadow">Send</button>
                                        </div>
                                    </div>
                            </div>
                                <div v-for="(item,index) in this.data.comments" :key="index">
                                    <div class="p-3 border rounded mt-2" v-if="comment.id==item.reply_id">
                                        <h5><a>{{item.user_name}}</a></h5>
                                        <p class="px-2">{{item.comment}}</p>
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
import { mapState } from 'vuex'
import axios from 'axios'
    export default {
        name:'ViewPost',
        data () {
            return {
                postId:'',
                data:{},
                playlistStatus:false,
                editStatus:false,
                commentError:false,
                comment:'',
                messageLoadingStatus:false,
                loadingStatus:false,
            }
        },
        computed: {
            ...mapState(['header','user']),
        },
        methods: {
            getPost(){
                this.loadingStatus=true;
                axios.get(`http://alexmedia.alexlucifer.info/api/user/post/view/${this.$route.params.id}`,{headers:this.header}).then((response)=>{
                    this.data=response.data;
                    if (this.data.post.image!=null) {
                        this.data.post.image=`http://alexmedia.alexlucifer.info/storage/${this.data.post.image}`;
                    }else{
                        this.data.post.image=`http://alexmedia.alexlucifer.info/image/default.png`;
                    }
                    let d=new Date(this.data.post.created_at);
                    this.data.post.created_at=`${d.getFullYear()}-${d.getMonth() + 1}-${d.getFullYear()}`
                    if (this.data.post.playlist_id!=null) {
                        this.playlistStatus=true;
                    }

                    if (this.user.id==this.data.post.user_id) {
                        this.editStatus=true
                    }

                    for (let i = 0; i < this.data.relatedPost.length; i++) {
                        if (this.data.relatedPost[i].image!=null) {
                            this.data.relatedPost[i].image=`http://alexmedia.alexlucifer.info/storage/${this.data.relatedPost[i].image}`;
                        }else{
                            this.data.relatedPost[i].image=`http://alexmedia.alexlucifer.info/image/default.png`;
                        }
                    }
                    this.loadingStatus=false;
                })
            },
            setlike(){
                axios.get(`http://alexmedia.alexlucifer.info/api/user/like/set/${this.$route.params.id}`,{headers:this.header}).then((response)=>{
                    this.data=response.data;
                    if (this.data.post.image!=null) {
                         this.data.post.image=`http://alexmedia.alexlucifer.info/storage/${this.data.post.image}`;
                     }else{
                         this.data.post.image=`http://alexmedia.alexlucifer.info/image/default.png`;
                     }
                     let d=new Date(this.data.post.created_at);
                     this.data.post.created_at=`${d.getFullYear()}-${d.getMonth() + 1}-${d.getFullYear()}`
                     if (this.data.post.playlist_id!=null) {
                         this.playlistStatus=true;
                     }
                     if (this.user.id==this.data.post.user_id) {
                        this.editStatus=true
                    }
                })
            },
            toPostDetail(id){
                this.$router.push({path:`/view/route/${id}`})
            },
            sendComment(){
                this.messageLoadingStatus=true;
                let data={
                    'comment':this.comment,
                    'post_id':this.data.post.id,
                    'user_id':this.user.id
                };
                if(this.comment=='' || this.comment==null){
                    this.commentError=true;
                    this.messageLoadingStatus=false;
                }else{
                    axios.post('http://alexmedia.alexlucifer.info/api/user/send/comment',data,{headers:this.header}).then((response)=>{
                        this.data.comments=response.data.comment;
                        this.messageLoadingStatus=false;
                        this.commentError=false;
                        this.comment='';
                    })
                }

            },
            goEditPage(){
            this.$router.push({path:`/post/edit/${this.$route.params.id}`})
        }
        },
        created () {
            this.getPost();
        },
    }
</script>

<style>
.overflows{
    height: 50vh;
    overflow-y: scroll;
}
</style>