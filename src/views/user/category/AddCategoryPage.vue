<template>
    <div>
            <div class="container py-5">
                <h1 class="text-center mb-5">Add Category</h1>
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
                            <button @click="addCategory" class="btn btn-secondary"><i class="fa-solid fa-plus me-2"></i>Create</button>
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
        name:'AddCategoryPage',
        data () {
            return {
                errorStatus: false,
                categoryName:'',
            }
        },
        computed: {
            ...mapState(['header','user'])
        },
        methods: {
            addCategory () {
                if (this.categoryName==''|| this.categoryName==null) {
                    this.errorStatus=true;
                }else{
                    this.errorStatus=false;
                    let data={
                        name:this.categoryName,
                    }

                    axios.post('https://alexmedia.alexlucifer.info/api/user/category/add',data,{headers:this.header}).then((response)=>{
                        if (response.data.status) {
                            this.$router.push({name:'categoryList'});
                        }
                    })
                }

            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>
