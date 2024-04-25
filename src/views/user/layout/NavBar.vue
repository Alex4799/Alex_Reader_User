<template>
  <!-- ======= Header ======= -->
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">

      <a href="#" class="logo d-flex align-items-center">
        <h1>Alex Media</h1>
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
        
        <span @click="toggleSideNav(true)">
          <i class="bi bi-list mobile-nav-toggle ms-3"></i>
        </span>

      </div>

    </div>
    <div v-if="sideNav" class=" position-absolute top-0 start-0 w-100 bg-white pe-2 shadow">
      <div class="p-2">
          <h1>Alex Media</h1>
      </div>
      <ul class="side-bar">
          <li class="p-2 fs-4 border border-black"><router-link class="w-100" to="/post">Post</router-link></li>
          <li class="p-2 fs-4 border border-black"><router-link class="w-100" to="/list/category">Category</router-link></li>
          <li class="p-2 fs-4 border border-black"><router-link class="w-100" to="/list/playList">My PlayList</router-link></li>
          <li class="p-2 fs-4 border border-black"><router-link class="w-100" to="/users/list">Users</router-link></li>
          <li class="p-2 fs-4 border border-black"><router-link class="w-100" to="/list/message">Message</router-link></li>
      </ul>
      <div class="close position-absolute top-0 end-0 p-3" @click="toggleSideNav(false)">
        <i class="fa-solid fa-xmark fs-3"></i>
      </div>
    </div>
  </header><!-- End Header -->
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";

  export default defineComponent({
    name:'NavBar',
    data () {
      return {
        sideNav: false,
      }
    },
    methods: {
      logout () {
        localStorage.setItem('token',null);
        this.$router.push({name:'login'});
      },
      toggleSideNav(status){
        this.sideNav=status;
      },
    },
    computed: {
      ...mapState(['user','header'])
    },
  })
</script>
<style>
  *{
    list-style: none;
  }
  .side-bar li{

  }
</style>