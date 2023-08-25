<template>
    <div>
        
    </div>
</template>

<script>
    export default {
        name:'RouteViewPost',
        methods: {
            routeView (id) {
                this.$router.push({path:`/post/detail/${id}`})
            }
        },
        mounted () {
            this.routeView(this.$route.params.id);
        }
    }
</script>

