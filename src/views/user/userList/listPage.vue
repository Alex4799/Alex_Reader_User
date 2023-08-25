<template>
    <div>
        <div class="container py-3">

            <h1 class="py-3 text-center">Users List</h1>

            <div class="text-center my-3" v-if="loadingStatus">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div class="row text-center">
                    <div class="col-4">Search Key - {{ search_key }}</div>
                    <div class="col-4">Total - {{ postCount }}</div>
                    <div class="col-4">
                        <div class="input-group mb-3">
                            <input type="text" name="search_key" class="form-control" v-model="search_key" placeholder="Enter Author Name" aria-label="Recipient's username" aria-describedby="button-addon2">
                            <button class="btn btn-secondary" id="button-addon2" @click="searchUser" type="button">Search</button>
                        </div>
                    </div>
            </div>
            <div v-for="(user,index) in users" :key="index">
                <div class="row shadow p-3" @click=goViewProfile(user.id)>
                    <div class="col-lg-3">
                        <img :src="user.image" class=" w-75 shadow">
                    </div>
                    <div class="col-lg-8">
                        <div class="mt-4"><h1>{{user.name}}</h1></div>
                        <div class="my-1"><h4>{{user.email}}</h4></div>
                        <div class="my-1 row gap-2">
                            <div class="btn border-dark col-2">{{ user.post_count }}  Post</div>
                            <div class="btn border-dark col-2">{{ user.playlist_count }}  Playlist</div>
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
        name:'listPage',
        data () {
            return {
                loadingStatus:false,
                search_key:'',
                postCount:0,
                users: {},
            }
        },
        computed: {
            ...mapState(['header','user']),
        },
        methods: {
            getData(){
                axios.get('http://alexmedia.alexlucifer.info/api/users/list/get',{headers:this.header}).then((response)=>{
                    this.users=response.data;
                    for (let i = 0; i < this.users.length; i++) {
                        if (this.users[i].image==null) {
                            if(this.users[i].gender=='male'){
                                this.users[i].image=`http://alexmedia.alexlucifer.info/image/default-male-image.png`;
                            }else{
                                this.users[i].image=`http://alexmedia.alexlucifer.info/image/default-female-image.webp`;
                            }
                        }else{
                            this.users[i].image=`http://alexmedia.alexlucifer.info/storage/${this.users[i].image}`;
                        }
                        
                    }
                })
            },
            searchUser(){
                axios.get(`http://alexmedia.alexlucifer.info/api/users/list/search/${this.search_key}`,{headers:this.header}).then((response)=>{
                    this.users=response.data;
                    for (let i = 0; i < this.users.length; i++) {
                        if (this.users[i].image==null) {
                            if(this.users[i].gender=='male'){
                                this.users[i].image=`http://alexmedia.alexlucifer.info/image/default-male-image.png`;
                            }else{
                                this.users[i].image=`http://alexmedia.alexlucifer.info/image/default-female-image.webp`;
                            }
                        }else{
                            this.users[i].image=`http://alexmedia.alexlucifer.info/storage/${this.users[i].image}`;
                        }
                        
                    }
                })
            },
            goViewProfile(id){
                this.$router.push({path:`/view/profile/${id}`})
            }
        },
        mounted () {
            this.getData();
        }
    }
</script>
