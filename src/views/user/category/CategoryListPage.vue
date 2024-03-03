<template>
    <div>
        <div>
            <div class="container py-5">
                <div class="text-center my-3" v-if="loadingStatus">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <h1 class="text-center mb-5">Category List</h1>

                <div>
                    <a @click="goAddCategory" class="btn btn-secondary float-lg-end"><i class="fa-solid fa-plus"></i>Add Category</a>
                </div>

                <div class="row text-center">
                    <div class="col-4">Search Key - {{searchKey}}</div>
                    <div class="col-4">Total - {{categoryCount}}</div>
                    <div class="col-4">
                        <div class="input-group mb-3">
                            <input v-model="searchKey" type="text" class="form-control" placeholder="Enter Category Name" aria-label="Recipient's username" aria-describedby="button-addon2">
                            <input @click="searchCategory" class="btn btn-secondary" type="button" id="button-addon2" value="Search">
                        </div>
                    </div>
                </div>
                <table class="table table-striped rounded">
                    <thead>
                        <tr class="text-center py-3">
                            <th>Id</th>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="(item,index) in categories.data" :key="index">
                            <td class="py-5"><h3>{{item.id}}</h3></td>
                            <td class="py-5"><h3 class='text-center'>{{item.name}}</h3></td>
                            <td class="py-5">
                                <a @click="goEditCategory(item.id)" class="btn btn-light rounded-circle me-2" title="Edit"><i class="fa-solid fa-pen-to-square"></i></a>
                                <a @click="deleteCategory(item.id)" class="btn btn-light rounded-circle me-2" title="Delete"><i class="fa-solid fa-trash"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <Bootstrap5Pagination :data="categories" @pagination-change-page="getCategory" />
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
    import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import axios from 'axios'
import { mapState } from 'vuex'
    export default {
        name:'CategoryListPage',
        data () {
            return {
                searchKey:'',
                categories: {},
                loadingStatus:false,
                categoryCount:0,
            }
        },
        computed: {
            ...mapState(['header','user']),
        },
        components: {
            Bootstrap5Pagination
        },
        methods: {
            getCategory (page=1) {
                this.loadingStatus=true;
                axios.get(`https://alexmedia.alexlucifer.info/api/user/category/main/get?page=${page}`,{headers:this.header}).then((response)=>{
                    this.categories=response.data;
                    this.loadingStatus=false;
                    this.categoryCount=this.categories.length;
                })
            },
            goAddCategory(){
                this.$router.push({name:'categoryAdd'});
            },
            goEditCategory(id){
                this.$router.push({path:`/edit/category/${id}`});
            },
            deleteCategory(id){
                this.loadingStatus=true;
                axios.get(`https://alexmedia.alexlucifer.info/api/user/category/delete/${id}`,{headers:this.header}).then((response)=>{
                    this.categories=response.data;
                    this.loadingStatus=false;
                    this.categoryCount=this.categories.length;
                })
            },
            searchCategory(page=1){
                if (this.searchKey!='') {
                    this.loadingStatus=true;
                    axios.get(`https://alexmedia.alexlucifer.info/api/user/category/search/${this.searchKey}?page=${page}`,{headers:this.header}).then((response)=>{
                        this.categories=response.data;
                        this.loadingStatus=false;
                        this.categoryCount=this.categories.length;

                    })
                }else{
                    this.getCategory();
                }
                this.loadingStatus=false;
            }
        },
        mounted () {
            this.getCategory();
        }
    }
</script>
