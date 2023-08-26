<template>
  <main id="main">
      <div style="min-height: 100vh;" class="d-flex flex-column justify-content-between">
        <Nav v-if="$route.fullPath!='/' && $route.fullPath!='/register'"></Nav>
        <router-view/>
        <Footer></Footer>
      </div>
  </main>
</template>

<script>
  import Nav from './views/user/layout/NavBar.vue';
  import Footer from './views/user/layout/FooterPage.vue';
  export default {
    components: {
      Nav,Footer
    },
  }
</script>
