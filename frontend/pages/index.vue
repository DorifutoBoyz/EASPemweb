<template>
    <div>
      <navbar />
      <home />
    </div>
  </template>
  
  <script>
  import NavbarView from "@/components/navbar.vue";
  import home from "@/components/home.vue";

  
  export default {
    components: {
      NavbarView,
    },
    data() {
      return {
        blogPosts: [],
      };
    },


  };
  </script>