<template>
    <div>
        <div class="text-center my-3" v-if="loadingStatus1">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
        </div>
        <div v-if="!loadingStatus1" class="container py-5">
        <h1 class=" text-center">Edit Post</h1>
            <!-- <input type="hidden" name="user_id" value="{{Auth::user()->id}}"> -->

            <div class="text-center my-3" v-if="loadingStatus">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div class="shadow p-5 row">
                <div class="col-4">
                    <div>
                        <img :src="data.post.image" class="w-75 shadow">
                        <input name="image" type="file" class="form-control my-4" @change="uploadPhoto">
                    </div>
                </div>
                <div class="col-8">

                    <div class="mb-3 row">
                        <label class="col-sm-3 col-form-label">Title</label>
                        <div class="col-sm-9">
                        <input v-if="!titleError" name="title" type="text" class="form-control" placeholder="Enter title" v-model="data.post.Title">
                        <input v-if="titleError" name="title" type="text" class="form-control is-invalid" placeholder="Enter title" v-model="data.post.Title">
                        <span v-if="titleError" class="text-danger">Title is required</span>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label class="col-sm-3 col-form-label">Category</label>
                        <div class="col-sm-9">
                        <select v-if="!categoryError" name="category_id" class="form-control" v-model="data.post.category_id">
                            <option value="">Choose Category</option>
                            <option v-for="(category,index) in data.categories" :key="index" :value="category.id" :id="category.id">{{category.name}}</option>
                        </select>
                        <select v-if="categoryError" name="category_id" class="form-control is-invalid" v-model="data.post.category_id">
                            <option value="null">Choose Category</option>
                            <option v-for="(category,index) in data.categories" :key="index" :value="category.id" :id="category.id">{{category.name}}</option>
                        </select>
                        <span v-if="categoryError" class="text-danger">Category is required</span>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label class="col-sm-3 col-form-label">PlayList</label>
                        <div class="col-sm-9">
                            <select name="category_id" class="form-control" v-model="data.post.playlist_id">
                                <option value="null">Choose PlayList</option>
                                <option v-for="(playlist,index) in data.playLists" :key="index" :value="playlist.id" :id="playlist.id">{{playlist.name}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <ckeditor :editor="editor" v-model="data.post.content" :config="editorConfig"></ckeditor>
                        <span v-if="contentError" class="text-danger">Content is required</span>
                    </div>

                    <div class="float-end">
                        <button class="btn btn-secondary" type="button" @click="update"><i class="fa-solid fa-plus me-2"></i>Update</button>
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
                loadingStatus1:false,
                titleError:false,
                categoryError:false,
                contentError:false,
                updateImage:null,
                data:{},
            }
        },
        computed: {
            ...mapState(['header','user']),
        },
        methods: {
            getPost(){
                this.loadingStatus1=true;
                axios.get(`https://alexmedia.alexlucifer.info/api/user/post/edit/${this.$route.params.id}`,{headers:this.header}).then((response)=>{
                    this.data=response.data;
                    if (this.data.post.image!=null) {
                        this.data.post.image=`https://alexmedia.alexlucifer.info/storage/${this.data.post.image}`;
                    }else{
                        this.data.post.image=`https://alexmedia.alexlucifer.info/image/default.png`;
                    }
                    let d=new Date(this.data.post.created_at);
                    this.data.post.created_at=`${d.getFullYear()}-${d.getMonth() + 1}-${d.getFullYear()}`
                    this.loadingStatus1=false;
                })
            },
           uploadPhoto(event){
                this.data.post.updateImage=event.target.files[0];
           },
           update(){
            this.loadingStatus=true;
                if (this.data.post.Title=='') {
                    this.titleError=true;
                    this.loadingStatus=false;
                    
                }else if(this.data.post.category_id==''){
                    this.categoryError=true;
                    this.loadingStatus=false;

                }else if(this.data.post.content==''){
                    this.contentError=true;
                    this.loadingStatus=false;

                }else{
                    axios.post(`https://alexmedia.alexlucifer.info/api/user/post/update`,this.data.post,{headers:this.header}).then((response)=>{
                        if(response.data.status){
                            this.$router.push({path:`/post/detail/${this.$route.params.id}`});
                        }
                    })
                }
           },

        },
        created () {
            this.getPost();
        }
    }
</script>
