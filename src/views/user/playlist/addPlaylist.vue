<template>
    <div>
        <div class="container py-5">
            <h1 class="text-center mb-5">Add Playlist</h1>
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
                            <button @click="addPlaylist" class="btn btn-secondary" type="submit"><i class="fa-solid fa-plus me-2"></i>Create</button>
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
        name:'addPlaylist',
        data () {
            return {
                playListData: {
                    name:'',
                    user_id:'',
                },
                errorStatus:false,
            }
        },
        computed: {
            ...mapState(['header','user'])
        },
        methods: {
            addPlaylist(){
                if (this.playListData.name=="" || this.playListData.name==null) {
                    this.errorStatus=true;
                }else{
                    this.playListData.user_id=this.user.id;
                    axios.post(`https://alexmedia.alexlucifer.com/api/user/playlist/add/playlist`,this.playListData,{headers:this.header}).then((response)=>{
                        if (response.data.status) {
                            this.$router.push({name:'playListPage'});
                        }
                    })
                }
            }
        }
    }
</script>
