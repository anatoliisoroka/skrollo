<template>
  <div>    
    <b-navbar class="nav-filter-mobile" style="background-color: #4b3c11 !important">
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-b-toggle.collapse-1>
          FILTER
          <img
            class="mb-1"
            src="/images/social/icons8-sort-down-24.png"
            height="25px"
          />
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <b-collapse id="collapse-1" v-model="filter_open">
      <Sources v-on:outsideClick="onOutSideClick" />
    </b-collapse>
  </div>
</template>

<script>
import Sources from "./Sources.vue";

export default {
  components: {
    Sources
  },
  data() {
    return {      
      filter_open: false,
      search_timer: undefined      
    };
  },
  computed: {
    searchTerm: {
      get: function() {
        return this.$store.state.posts.search;
      },
      set: function(term) {
        clearTimeout(this.search_timer);
        this.search_timer = setTimeout(() => {
          this.$store.commit("posts/setPage", 0);
          this.$store.commit("posts/setPosts", []);
          this.$store.dispatch("posts/fetchPage");
        }, 800);
        this.$store.commit("posts/updateSearch", term);
      }
    }
  },  
  mounted() {
    
  },

  methods: {    
    onOutSideClick() {
      this.filter_open = false;
    },
    search() {},    
  }
};
</script>

<style lang="scss">
.nav-filter-mobile {
  background-color: #4b3c11 !important;
  //top: 3.5rem;
  padding: 0;
  // z-index: 9999999;

  a {
    color: rgba(255, 255, 255, 0.6) !important;
    font-size: 15px;
    padding: 0 20px !important;
  }
}


</style>
