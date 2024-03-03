<template>
    <div>
        
        <div class="container py-5">
        <h1 class=" text-center">Add Post</h1>
            <!-- <input type="hidden" name="user_id" value="{{Auth::user()->id}}"> -->

            <div class="text-center my-3" v-if="loadingStatus">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div class="shadow p-5 row">
                <div class="col-4">
                    <div>
                        <img src="../../../assets/default.png" class="w-75 shadow">
                        <input name="image" type="file" class="form-control my-4" @change="uploadPhoto">
                    </div>
                </div>
                <div class="col-8">

                    <div class="mb-3 row">
                        <label class="col-sm-3 col-form-label">Title</label>
                        <div class="col-sm-9">
                        <input v-if="!titleError" name="title" type="text" class="form-control" placeholder="Enter title" v-model="postData.title">
                        <input v-if="titleError" name="title" type="text" class="form-control is-invalid" placeholder="Enter title" v-model="postData.title">
                        <span v-if="titleError" class="text-danger">Title is required</span>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label class="col-sm-3 col-form-label">Category</label>
                        <div class="col-sm-9">
                        <select v-if="!categoryError" name="category_id" class="form-control" v-model="postData.category_id">
                            <option value="null">Choose Category</option>
                            <option v-for="(category,index) in categories" :key="index" :value="category.id" :id="category.id">{{category.name}}</option>
                        </select>
                        <select v-if="categoryError" name="category_id" class="form-control is-invalid" v-model="postData.category_id">
                            <option value="null">Choose Category</option>
                            <option v-for="(category,index) in categories" :key="index" :value="category.id" :id="category.id">{{category.name}}</option>
                        </select>
                        <span v-if="categoryError" class="text-danger">Category is required</span>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label class="col-sm-3 col-form-label">PlayList</label>
                        <div class="col-sm-9">
                            <select name="category_id" class="form-control" v-model="postData.playlist_id">
                            <option value="null">Choose PlayList</option>
                            <option v-for="(playlist,index) in playlists" :key="index" :value="playlist.id" :id="playlist.id">{{playlist.name}}</option>
                        </select>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <ckeditor :editor="editor" v-model="postData.content" :config="editorConfig"></ckeditor>
                        <span v-if="contentError" class="text-danger">Content is required</span>
                    </div>

                    <div class="float-end">
                        <button class="btn btn-secondary" type="button" @click="upload"><i class="fa-solid fa-plus me-2"></i>Create</button>
                    </div>
                </div>
            </div>
    </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import axios from 'axios';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    export default {
        name:'AddPostPage',
        data () {
            return {
                editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    // The configuration of the editor.
                },
                loadingStatus:false,
                titleError:false,
                categoryError:false,
                contentError:false,
                categories:{},
                playlists:{},
                postData:{
                    title:'',
                    category_id:null,
                    playlist_id:null,
                    content:'',
                    image:null,
                    user_id:null,
                }
            }
        },
        computed: {
            ...mapState(['header','user']),
        },
        methods: {
           getCategory(){
                axios.get('https://alexmedia.alexlucifer.info/api/user/category/get',{headers:this.header}).then((response)=>{
                    this.categories=response.data;
                })  
           },
           getMyPlaylist(){
            axios.get(`https://alexmedia.alexlucifer.info/api/user/playlist/get/${this.user.id}`,{headers:this.header}).then((response)=>{
                    this.playlists=response.data;
                })
           },
           uploadPhoto(event){
                this.postData.image=event.target.files[0];
           },
           upload(){
                this.loadingStatus=true;
                if (this.postData.title=='') {
                    this.titleError=true;
                    this.loadingStatus=false;
                    
                }else if(this.postData.category_id==null){
                    this.categoryError=true;
                    this.loadingStatus=false;

                }else if(this.postData.content==""){
                    this.contentError=true;
                    this.loadingStatus=false;

                }else{
                    this.postData.user_id=this.user.id;
                    axios.post(`https://alexmedia.alexlucifer.info/api/user/post/add`,this.postData,{headers:this.header}).then(()=>{
                        this.$router.push({name:'post'});
                    })
                }
           }

        },
        mounted () {
            this.getCategory();
            this.getMyPlaylist();
        }
    }
</script>
