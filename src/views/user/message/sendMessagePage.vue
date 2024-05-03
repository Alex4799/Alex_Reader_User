<template>
    <div>
        <div class="container py-5">
            <h1 class=" text-center">Send Email</h1>
            <div>
                <div class=" row">
                    <div class=" p-5 shadow col-lg-8 offset-lg-2">
                        <div class="mb-3 row">
                            <label class="col-sm-3 col-form-label">To</label>
                            <div class="col-sm-9">
                            <input v-if="!error.receive_email" name="receive_email" v-model="sendData.receive_email" type="email" class="form-control " placeholder="Enter email .....">
                            <input v-if="error.receive_email" name="receive_email" v-model="sendData.receive_email" type="email" class="form-control is-invalid" placeholder="Enter email .....">    
                            <span v-if="error.receive_email" class="text-danger">Receive email is required!!!!!</span>
                            </div>
                        </div>

                        <input type="hidden" name="reply_id" v-model="sendData.reply_id">


                        <div class="mb-3 row">
                            <label class="col-sm-3 col-form-label">Title</label>
                            <div class="col-sm-9">
                            <input v-if="!error.title" name="title" type="text" v-model="sendData.title" class="form-control" placeholder="Enter email's title">
                            <input v-if="error.title" name="title" type="text" v-model="sendData.title" class="form-control is-invalid" placeholder="Enter email's title">
                            <span v-if="error.title" class="text-danger">Email title is required!!!!!</span>
                            </div> 
                        </div>

                        <div class="mb-3 row">
                            <label class="col-sm-3 col-form-label">Content</label>
                            <div class="col-sm-9">
                            <textarea v-if="!error.content" name="content" class="form-control"  id="" cols="30" rows="10" v-model="sendData.content"></textarea>
                            <textarea v-if="error.content" name="content" class="form-control is-invalid"  id="" cols="30" rows="10" v-model="sendData.content"></textarea>
                            <span v-if="error.content" class="text-danger">Content is required!!!!!</span>
                            </div>
                        </div>

                        <input type="hidden" name="sent_email" v-model="sendData.sent_email">

                        <div class="float-end">
                            <button @click="sendMessage" class="btn btn-secondary" type="button"><i class="fa-solid fa-plus me-2"></i>Create</button>
                        </div>
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
        name:'sendMessagePage',
        data () {
            return {
                sendData:{
                    receive_email:'',
                    sent_email:'',
                    reply_id:0,
                    title:'',
                    content:'',
                },
                error:{
                    receive_email:false,
                    title:false,
                    content:false,
                }
            }
        },
        computed: {
            ...mapState(['header','user']),
        },
        methods: {
            getReplyEmail () {
                this.sendData.sent_email=this.user.email;
                this.sendData.reply_id=this.$route.params.reply_id;
                if (this.sendData.reply_id!=0) {
                    axios.get(`https://alexmedia.alexlucifer.com/api/user/message/reply/email/${this.sendData.reply_id}`,{headers:this.header}).then((response)=>{
                        this.sendData.receive_email=response.data;
                    });
                }
            },
            sendMessage(){
                if (this.sendData.receive_email=='') {
                    this.error.receive_email=true;
                }else{
                    this.error.receive_email=false;
                }
                if (this.sendData.title=='') {
                    this.error.title=true;
                }else{
                    this.error.title=false;
                }
                if (this.sendData.content=='') {
                    this.error.content=true;
                }else{
                    this.error.content=false;
                }
                if (!this.error.receive_email && !this.error.title && !this.error.content) {
                    axios.post(`https://alexmedia.alexlucifer.com/api/user/message/send`,this.sendData,{headers:this.header}).then((response)=>{
                        if (response.data.status=='success') {
                            this.$router.push({
                                name:'MessageList',
                            });
                        }
                    });
                }
            }
        },
        mounted () {
            this.getReplyEmail();
        }
    }
</script>
