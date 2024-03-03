<template>
    <div>
        <div class="container py-5">
            <h1 class="text-center mb-5">Edit Playlist</h1>

                <div class="text-center my-3" v-if="loadingStatus">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-6 offset-3 shadow p-5">
                        <div class="mb-3 row">
                            <label class="col-sm-3 col-form-label">Name</label>
                            <div class="col-sm-9">
                            <input v-if="!errorStatus" v-model="playListData.name" name="name" type="text" class="form-control" placeholder="Enter Name">
                            <input v-if="errorStatus" v-model="playListData.name" name="name" type="text" class="form-control is-invalid" placeholder="Enter Name">
                            <span v-if="errorStatus" class="text-danger">Playlist name is required!!!!!!!!</span>
                            </div>
                        </div>

                        <div class="float-end">
                            <button @click="editPlaylist" class="btn btn-secondary" type="submit"><i class="fa-solid fa-plus me-2"></i>Update</button>
                        </div>

                    </div>
                </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex'
    export default {
        name:'editPlaylist',
        data () {
            return {
                playListData: {
                    name:'',
                    user_id:'',
                    id:'',
                },
                errorStatus:false,
                loadingStatus:false,
            }
        },
        computed: {
            ...mapState(['header','user'])
        },
        methods: {
            editPlaylist(){
                this.loadingStatus=true;
                if (this.playListData.name=="" || this.playListData.name==null) {
                    this.errorStatus=true;
                    this.loadingStatus=false;

                }else{
                    this.playListData.user_id=this.user.id;
                    axios.post(`https://alexmedia.alexlucifer.info/api/user/playlist/update`,this.playListData,{headers:this.header}).then((response)=>{
                        if (response.data.status) {
                            this.$router.push({name:'playListPage'});
                        }
                    })
                }
            },
            getPlaylist(){
                axios.get(`https://alexmedia.alexlucifer.info/api/user/playlist/edit/${this.$route.params.id}`,{headers:this.header}).then((response)=>{
                    this.playListData.user_id=response.data.user_id;
                    this.playListData.name=response.data.name;
                    this.playListData.id=this.$route.params.id;
                })
            }
        },
        mounted () {
            this.getPlaylist();
        }
    }
</script>
