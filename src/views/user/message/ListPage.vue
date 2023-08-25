<template>
    <div>
        <div class="container py-5">
            <div class="text-center my-3" v-if="loadingStatus">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <h1 class="text-center mb-5">Admin List</h1>

            <!-- @if (session('createSucc'))
            <div class="alert alert-success alert-dismissible fade show col-4 offset-8" role="alert">
                {{session('createSucc')}}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            @endif

            @if (session('deleteSucc'))
            <div class="alert alert-danger alert-dismissible fade show col-4 offset-8" role="alert">
                {{session('deleteSucc')}}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            @endif -->

            <div>
                <a @click="goSendMessage" class="btn btn-secondary float-lg-end"><i class="fa-solid fa-plus"></i>Sent Message</a>
            </div>

            <div class="row  text-center">
                <div class="col-4">Search Key - {{ search_key }}</div>
                <div class="col-4">Total - {{total}}</div>
                <div class="col-4">
                    <div class="input-group mb-3">
                        <input type="text" name="search_key" class="form-control" v-model="search_key" placeholder="Enter Author Name" aria-label="Recipient's username" aria-describedby="button-addon2">
                        <input class="btn btn-secondary" type="submit" @click="searchMessage" id="button-addon2" value="Search">
                    </div>
                </div>
            </div>
            <div>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle text-capitalize" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {{status}} Email
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" @click="changeStatus('receive')">Receive Email</a></li>
                        <li><a class="dropdown-item" @click="changeStatus('sent')">Sent Email</a></li>
                    </ul>
                </div>
            </div>
            <table class="table rounded" v-if="!loadingStatus">
                <thead>
                    <tr class="text-center py-3">
                        <th>Id</th>
                        <th>Title</th>
                        <th>Sent Email</th>
                        <th>Receive Email</th>
                        <th>Message</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-for="(item,index) in messages" :key="index">

                    <tr class="text-center bg-secondary text-white" v-if="item.status==0">
                        <td class="py-5" v-if="item.reply_id==0">{{item.id}}</td>
                        <td class="py-5" v-if="item.reply_id!=0"><i class="fa-solid fa-reply me-2"></i>{{item.id}}</td>
                        <td class="py-5">{{item.title}}</td>
                        <td class="py-5">{{item.sent_email}}</td>
                        <td class="py-5">{{item.receive_email}}</td>
                        <td class="py-5">{{item.content.substr(0,100)+'....'}}</td>
                        <td class="py-5">
                            <a @click="goViewMessage(item.id)" class="btn btn-light rounded-circle me-2" title="View"><i class="fa-solid fa-eye"></i></a>
                        </td>
                    </tr>

                    <tr class="text-center" v-if="item.status!=0">
                        <td class="py-5" v-if="item.reply_id==0">{{item.id}}</td>
                        <td class="py-5" v-if="item.reply_id!=0"><i class="fa-solid fa-reply me-2"></i>{{item.id}}</td>
                        <td class="py-5">{{item.title}}</td>
                        <td class="py-5">{{item.sent_email}}</td>
                        <td class="py-5">{{item.receive_email}}</td>
                        <td class="py-5">{{item.content.substr(0,100)+'....'}}</td>
                        <td class="py-5">
                            <a @click="goViewMessage(item.id)" class="btn btn-light rounded-circle me-2" title="View"><i class="fa-solid fa-eye"></i></a>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
    export default {
        name:'ListPage',
        data () {
            return {
                messages: {},
                status:'receive',
                loadingStatus:false,
                total:0,
                search_key:'',
            }
        },
        computed: {
            ...mapState(['user','header']),
        },
        methods: {
            getData () {
                this.loadingStatus=true;
                axios.get(`http://alexmedia.alexlucifer.info/api/user/message/list/${this.user.email}/${this.status}`,{headers:this.header}).then((response)=>{
                    this.messages=response.data;
                    this.total=this.messages.length;
                    this.loadingStatus=false;
                });
            },
            changeStatus(status){
                this.status=status;
                this.getData();
            },
            searchMessage(){
                let data={
                    email:this.user.email,
                    status:this.status,
                    search_key:this.search_key,
                };
                this.loadingStatus=true;
                axios.post(`http://alexmedia.alexlucifer.info/api/user/message/list/search`,data,{headers:this.header}).then((response)=>{
                    this.messages=response.data;
                    this.total=this.messages.length;
                    this.loadingStatus=false;
                });
            },
            goSendMessage(){
                this.$router.push({
                    path:`/send/message/0`,
                });
            },
            goViewMessage(id){
                this.$router.push({
                    path:`/view/message/${id}`,
                });
            }
        },
        mounted () {
            this.getData();
        }
    }
</script>
