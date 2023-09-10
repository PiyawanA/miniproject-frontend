<template>
  <v-container fluid>
    <v-row dense>
        <Add/>
      <v-col v-for="card in cards" :key="card.user" cols="12" md="3">
        <v-card to="/login">
          <v-img
            :src="card.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="card.title"> </v-card-title>
          </v-img>

          <v-card-actions>
            
              <v-list-item-avatar color="grey darken-3">
                <v-img class="elevation-6" alt :src="card.pic"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="card.user"></v-list-item-title>
              </v-list-item-content>
            
            <v-spacer></v-spacer>

            <v-btn @click="goToComment()" text>
              <v-icon>mdi-comment-outline</v-icon>comment
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Add from "../components/Addphoto.vue"

export default {
  components:{
    Add
  },
  data: () => ({
    medthods: {
      goToAccount() {
        this.$router.push("/myAccount");
      },
      goToComment() {
        this.$router.push('/comment')
      },
      goTo() {
        this.$router.push('/')
        
      }
    },

    cards: [
      {
        user: "You",
        pic:
          "https://i.pinimg.com/originals/d7/78/c8/d778c8e7d4b277c83d11e6dd09db8d24.jpg",
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg"
      },
      {
        user: "You1",
        pic:
          "https://i.pinimg.com/originals/d7/78/c8/d778c8e7d4b277c83d11e6dd09db8d24.jpg",
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg"
      },
      {
        user: "You3",
        pic:
          "https://i.pinimg.com/originals/d7/78/c8/d778c8e7d4b277c83d11e6dd09db8d24.jpg",
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
      },
      {
        user: "You4",
        pic:
          "https://i.pinimg.com/originals/d7/78/c8/d778c8e7d4b277c83d11e6dd09db8d24.jpg",
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
      },
      {
        user: "You5",
        pic:
          "https://i.pinimg.com/originals/d7/78/c8/d778c8e7d4b277c83d11e6dd09db8d24.jpg",
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
      },
      {
        user: "You6",
        pic: "",
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
      },
      {
        user: "You7",
        pic: "",
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg"
      },
      {
        user: "You8",
        pic: "",
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg"
      },
      {
        user: "You",
        pic:
          "https://i.pinimg.com/originals/d7/78/c8/d778c8e7d4b277c83d11e6dd09db8d24.jpg",
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg"
      },
      {
        user: "You1",
        pic:
          "https://i.pinimg.com/originals/d7/78/c8/d778c8e7d4b277c83d11e6dd09db8d24.jpg",
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg"
      },
      {
        user: "You3",
        pic:
          "https://i.pinimg.com/originals/d7/78/c8/d778c8e7d4b277c83d11e6dd09db8d24.jpg",
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
      },
      {
        user: "You4",
        pic:
          "https://i.pinimg.com/originals/d7/78/c8/d778c8e7d4b277c83d11e6dd09db8d24.jpg",
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
      },
      {
        user: "You5",
        pic:
          "https://i.pinimg.com/originals/d7/78/c8/d778c8e7d4b277c83d11e6dd09db8d24.jpg",
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
      },
    ]
  })
};
</script>

<style>
</style>