<template>
  <!-- ======= Header ======= -->
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">

      <a href="#" class="logo d-flex align-items-center">
        <h1>ZenBlog</h1>
      </a>

      <nav id="navbar" class="navbar">
        <ul>
          <li><router-link to="/post">Post</router-link></li>
          <li><router-link to="/list/category">Category</router-link></li>
          <li><router-link to="/list/playList">My PlayList</router-link></li>
          <li><router-link to="/users/list">Users</router-link></li>
          <li><router-link to="/list/message">Message</router-link></li>
        </ul>
      </nav><!-- .navbar -->

      <div class="position-relative">
        
        <div class="btn-group me-2">
          <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            {{user.name}}
          </button>
          <ul class="dropdown-menu">
            <li><router-link class="dropdown-item" to="/profile">Profile</router-link></li>
            <li><router-link class="dropdown-item" to="/change/password">Change Password</router-link></li>
            <li><a class="dropdown-item bg-danger text-white" @click="logout()">Logout</a></li>
          </ul>
        </div>
        
        <i class="bi bi-list mobile-nav-toggle ms-3"></i>

        <!-- ======= Search Form ======= -->
        <div class="search-form-wrap js-search-form-wrap">
          <form action="search-result.html" class="search-form">
            <span class="icon bi-search"></span>
            <input type="text" placeholder="Search" class="form-control">
            <button class="btn js-search-close"><span class="bi-x"></span></button>
          </form>
        </div>

      </div>

    </div>

  </header><!-- End Header -->
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";

  export default defineComponent({
    name:'NavBar',
    methods: {
      logout () {
        localStorage.setItem('token',null);
        this.$router.push({name:'login'});
      }
    },
    computed: {
      ...mapState(['user','header'])
    },
  })
</script>

