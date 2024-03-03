<template>
    <div>
        <div>
            <div class="container py-5">
                <div class="text-center my-3" v-if="loadingStatus">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <h1 class="text-center mb-5">My Playlist</h1>

                <div>
                    <a @click="toAddPage" class="btn btn-secondary float-lg-end"><i class="fa-solid fa-plus"></i>Add Playlist</a>
                </div>

                <div class="row text-center">
                    <div class="col-4">Search Key - {{searchKey}}</div>
                    <div class="col-4">Total - {{playlistCount}}</div>
                    <div class="col-4">
                        <div class="input-group mb-3">
                            <input v-model="searchKey" type="text" class="form-control" placeholder="Enter Category Name" aria-label="Recipient's username" aria-describedby="button-addon2">
                            <input @click="getSearchPlaylist" class="btn btn-secondary" type="button" id="button-addon2" value="Search">
                        </div>
                    </div>
                </div>
                <table class="table table-striped rounded">
                    <thead>
                        <tr class="text-center py-3">
                            <th>Id</th>
                            <th>Name</th>
                            <th>Post</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="(item,index) in platlists" :key="index">
                            <td class="py-5"><h3>{{item.id}}</h3></td>
                            <td class="py-5"><h3 class='text-center'>{{item.name}}</h3></td>
                            <td class="py-5"><h3 class="text-center">{{ item.post_count }}</h3></td>
                            <td class="py-5">
                                <a @click="toPlaylistItem(item.id)" class="btn btn-light rounded-circle me-2" title="Update"><i class="fa-solid fa-eye"></i></a>
                                <a @click="toEditPage(item.id)" class="btn btn-light rounded-circle me-2" title="Edit"><i class="fa-solid fa-pen-to-square"></i></a>
                                <a @click="deleteItem(item.id)" class="btn btn-light rounded-circle me-2" title="Delete"><i class="fa-solid fa-trash"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>        
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
    export default {
        name:'playistPage',
        data () {
            return {
                searchKey:'',
                platlists: {},
                loadingStatus:false,
                playlistCount:0,
            }
        },
        computed: {
            ...mapState(['header','user']),
        },
        methods: {
            getPlaylist () {
                this.loadingStatus=true;
                axios.get(`https://alexmedia.alexlucifer.info/api/user/playlist/get/${this.user.id}`,{headers:this.header}).then((response)=>{
                    this.platlists=response.data;
                    this.playlistCount=this.platlists.length;
                    for (let i = 0; i < this.playlistCount; i++) {
                        axios.get(`https://alexmedia.alexlucifer.info/api/user/playlist/postCount/${this.platlists[i].id}`,{headers:this.header}).then((response)=>{
                            this.platlists[i].post_count=response.data;
                        })
                    }
                    this.loadingStatus=false;
                });
            },
            getSearchPlaylist () {
                if(this.searchKey!='' || this.searchKey!=null){
                    this.loadingStatus=true;
                    let data={
                        'id':this.user.id,
                        'searchKey':this.searchKey,
                    };
                    axios.post(`https://alexmedia.alexlucifer.info/api/user/playlist/get/search`,data,{headers:this.header}).then((response)=>{
                        this.platlists=response.data;
                        this.playlistCount=this.platlists.length;
                        for (let i = 0; i < this.playlistCount; i++) {
                            axios.get(`https://alexmedia.alexlucifer.info/api/user/playlist/postCount/${this.platlists[i].id}`,{headers:this.header}).then((response)=>{
                                this.platlists[i].post_count=response.data;
                            })
                        }
                        this.loadingStatus=false;
                    });
                }
            },
            toAddPage(){
                this.$router.push({
                    name:'addPlaylist',
                })
            },
            toEditPage(id){
                this.$router.push({
                    path:`/edit/playlist/${id}`
                })
            },
            toPlaylistItem(id){
                this.$router.push({
                    path:`/item/playlist/${id}`
                })
            },
            deleteItem(id){
                this.loadingStatus=true;
                axios.get(`https://alexmedia.alexlucifer.info/api/user/playlist/delete/${id}`,{headers:this.header}).then((response)=>{
                    this.platlists=response.data;
                    this.playlistCount=this.platlists.length;
                    for (let i = 0; i < this.playlistCount; i++) {
                        axios.get(`https://alexmedia.alexlucifer.info/api/user/playlist/postCount/${this.platlists[i].id}`,{headers:this.header}).then((response)=>{
                            this.platlists[i].post_count=response.data;
                        })
                    }
                    this.loadingStatus=false;
                });
            }
        },
        mounted () {
            this.getPlaylist();
        }
    }
</script>
