<template>
    <div>
            <div class="container py-5">
                
                <div class="text-center my-3" v-if="loadingStatus">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>

                <h1 class="text-center mb-5">Edit Category</h1>
                <div class="row">
                    <div class="col-lg-6 offset-3 shadow p-5">
                        <div class="mb-3 row">
                            <label class="col-sm-3 col-form-label">Name</label>
                            <div class="col-sm-9">
                            <input v-if="errorStatus" v-model="categoryName" type="text" class="form-control is-invalid" placeholder="Enter Category Name">
                            <input v-if="!errorStatus" v-model="categoryName" type="text" class="form-control" placeholder="Enter Category Name">
                                <span v-if="errorStatus" class="text-danger">Category name must be filled !!!!!</span>
                            </div>
                        </div>

                        <div class="float-end">
                            <button @click="updateCategory" class="btn btn-secondary"><i class="fa-solid fa-plus me-2"></i>Create</button>
                        </div>

                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
    export default {
        name:'EditCategoryPage',
        data () {
            return {
                errorStatus: false,
                categoryName:'',
                categoryId:'',
                loadingStatus: false,
            }
        },
        computed: {
            ...mapState(['header','user'])
        },
        methods: {
            getCategoryData(id){
                this.loadingStatus=true;
                axios.get(`https://alexmedia.alexlucifer.com/api/user/category/getItem/${id}`,{headers:this.header}).then((response)=>{
                    this.categoryId=response.data.id;
                    this.categoryName=response.data.name;
                    this.loadingStatus=false;
                })
            },
            updateCategory () {
                this.loadingStatus=true;
                if (this.categoryName==''|| this.categoryName==null) {
                    this.errorStatus=true;
                    this.loadingStatus=false;

                }else{
                    this.errorStatus=false;
                    let data={
                        name:this.categoryName,
                        id:this.categoryId,
                    }
                    axios.post('https://alexmedia.alexlucifer.com/api/user/category/update',data,{headers:this.header}).then((response)=>{
                        if (response.data.status) {
                            this.$router.push({name:'categoryList'});
                        }
                    })
                }

            }
        },
        mounted () {
            this.getCategoryData(this.$route.params.id);
        }
    }
</script>

<style lang="stylus" scoped>

</style>
