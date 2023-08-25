<template>
    <div class="container py-5">
        <div class="text-center my-3" v-if="loadingStatus">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <h1 class=" text-center">View Email</h1>
        <div class="my-2" v-if="!loadingStatus">
            <div class=" shadow rounded p-2">
                <h3 class="text-center py-2">{{message.title}}</h3>
                <div class="row">
                    <div class="px-5 py-1 col-3">
                        <p>From - {{message.sent_email}}</p>
                        <p>To - {{message.receive_email}}</p>
                    </div>
                    <div class="px-5 py-1 col-9">
                        <p>{{message.content}}</p>
                    </div>
                </div>
                <div class="d-flex justify-content-end" v-if="message.receive_email==user.email">
                    <a @click="goSendMessage(message.id)" class="btn btn-secondary"><i class="fa-solid fa-reply me-2"></i>Reply</a>
                </div>
            </div>
        </div>

            <div v-if="reply_message.length!=0">
                <div class="container shadow p-2">
                        <div v-for="(item,index) in reply_message" :key="index" class="border border-secondary p-3">
                            <h3 class="text-center py-2">{{item.title}}</h3>
                            <div class="row">
                                <div class="px-5 py-1 col-3">
                                    <p>From - {{item.sent_email}}</p>
                                    <p>To - {{item.receive_email}}</p>
                                </div>
                                <div class="px-5 py-1 col-9">
                                    <p>{{item.content}}</p>
                                </div>
                            </div>
                                <div class="d-flex justify-content-end" v-if="item.receive_email==user.email">
                                    <a @click="goSendMessage(message.id)" class="btn btn-secondary"><i class="fa-solid fa-reply me-2"></i>Reply</a>
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
        name:'viewMessage',
        data () {
            return {
                message: {},
                reply_message:{},
                loadingStatus:false,
            }
        },
        computed: {
            ...mapState(['user','header']),
        },
        methods: {
            getData (id) {
                this.loadingStatus=true;
                axios.get(`http://alexmedia.alexlucifer.info/api/user/message/view/${id}`,{headers:this.header}).then((response)=>{
                    this.message=response.data.message;
                    this.reply_message=response.data.reply_message;
                    this.loadingStatus=false;
                })
            },
            goSendMessage(id){
                this.$router.push({
                    path:`/send/message/${id}`,
                });
            },
        },
        mounted () {
            this.getData(this.$route.params.id);
        }
    }
</script>

