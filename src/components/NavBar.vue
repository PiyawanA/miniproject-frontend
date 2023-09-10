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

      <v-btn icon @click="goToNotification()">
        <Icon icon="mdi:bell-outline" color="white" width="35" height="30" />
      </v-btn>

      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar color="#cb7546" v-bind="attrs" v-on="on">
            <span class="white--text text-h6">{{ user.initials }}</span>
          </v-avatar>
        </template>

        <v-list>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="#cb7546">
                <span class="white--text text-h6">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">{{ user.email }}</p>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="goToAccount()" depressed rounded text>My Account</v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="goToGallery()" depressed rounded text>My Gallery</v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="goToLogin()" depressed rounded text>sign out</v-btn>
            </div>
          </v-list-item-content>
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-card>
</template>

<script>
import { Icon } from "@iconify/vue2";
export default {
  data: () => ({
    user: {
      initials: "JD",
      fullName: "John Doe",
      email: "john.doe@doe.com"
    },
    offset: true
  }),

  components: {
    Icon
  },

  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    goToAccount() {
      this.$router.push("/myAccount");
    },
    goToNotification() {
      this.$router.push("/notification");
    },
    goToHome() {
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