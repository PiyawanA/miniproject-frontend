<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view>
        <Home />
      </router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import Home from "./views/Homepage.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Footer,
    Home
  },

  data: () => ({
    //ll
  })
};
</script>