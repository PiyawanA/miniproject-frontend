<template>
  <v-card>
    <v-app-bar app color="#893744" dark>
      <v-btn text @click="goToHome()">
        <v-toolbar-title class="text-h5">GALLERY ANYTHING</v-toolbar-title>
      </v-btn>

      <v-spacer></v-spacer>

      <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        class="mx-4"
        flat
        hide-no-data
        hide-details
        label="search"
        solo-inverted
        rounded
        solo
      ></v-autocomplete>

      <v-spacer></v-spacer>

      <v-menu bottom min-width="200px" rounded offset-y v-if="isAuth">
        <template v-slot:activator="{ on, attrs }">
          <v-avatar color="#cb7546" v-bind="attrs" v-on="on">
            <v-img
              v-if="auth && auth.picprofile"
              :src="'data:image/jpeg;base64,' + auth.picprofile"
            />
            <Icon v-else icon="fluent:emoji-32-regular" color="white" />
          </v-avatar>
        </template>

        <v-list>
          <v-list-item-content class="justify-center">
            <div class="mx-3 text-center">
              <v-avatar color="#cb7546">
                <v-img
                  v-if="auth && auth.picprofile"
                  :src="'data:image/jpeg;base64,' + auth.picprofile"
                />
                <Icon v-else icon="fluent:emoji-32-regular" color="white" />
              </v-avatar>
              <h3 style="font-family: Arial, Helvetica, sans-serif;">{{ auth ? auth.username || "" : "" }}</h3>
              <p class="text-caption mt-1">{{ auth ? auth.email || "" : "" }}</p>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="goToGallery()" depressed rounded text>My Gallery</v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="goToLogin()" depressed rounded text>sign out</v-btn>
            </div>
          </v-list-item-content>
        </v-list>
      </v-menu>
      <v-btn v-else color="#cb7564" @click="goToLogin">LOGIN</v-btn>
    </v-app-bar>
  </v-card>
</template>

<script>
import { Icon } from "@iconify/vue2";
export default {
  data: () => ({
    auth: null,
    offset: true
  }),

  components: {
    Icon
  },

  watch: {
    auth: {
      handler(newAuth) {
        if (newAuth !== null) {
          // Update the isAuth computed property when auth becomes non-null (after a successful login)
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      },
      deep: true // Watch for changes in nested properties of auth if applicable
    }
  },

  computed: {
    isAuth() {
      return !!this.auth;
    }
  },

  created() {
    this.getAuth();
  },

  mounted() {
    this.$EventBus.$on("getAuth", this.getAuth);
  },

  methods: {
    isAuth() {
      return this.auth !== null ? true : false;
    },

    getAuth() {
      this.auth = JSON.parse(localStorage.getItem("auth"));
    },

    goToLogin() {
      this.$router.push("/login");
      localStorage.clear();
      this.auth = null;
      // this.$EventBus.$emit("getAuth");
    },

    goToAccount() {
      this.$router.push("/myAccount");
    },

    goToNotification() {
      this.$router.push("/notification");
    },

    goToHome() {
      localStorage.setItem("auth", JSON.stringify(this.auth));
      this.$router.push("/");
    },
    goToGallery() {
      this.$router.push("/gallery");
    }
  }
};
</script>
  
<style>
</style>