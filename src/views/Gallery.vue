<template>
  <v-container>
    <v-card class="pa-4 mb-2">
      <v-avatar size="100">
        <img src="https://via.placeholder.com/100" alt="User Avatar" />
      </v-avatar>
      <h2 class="display-1">{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </v-card>

    <v-row dense>
      <Add />
      <v-col v-for="item in items" :key="item.picId" cols="12" md="3">
        <v-dialog v-model="dialog" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-card v-bind="attrs" v-on="on">
              <v-img
                :src="'data:image/jpeg;base64,' + item.pic"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="item.name"></v-card-title>
                <v-card-subtitle v-text="formattedDateTime(item.time)"></v-card-subtitle>
              </v-img>

              <v-card-actions>
                <v-list-item-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    alt
                    :src="'data:image/jpeg;base64,' + item.gallery.picprofile"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="item.gallery.galleryname"></v-list-item-title>
                </v-list-item-content>

                <v-spacer></v-spacer>

                <v-icon>mdi-comment-outline</v-icon>
                <div>comment</div>
              </v-card-actions>
            </v-card>
          </template>

          <template>
            <v-card>
              <v-toolbar color="#893744" dark>
                <v-list-item-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    alt
                    :src="'data:image/jpeg;base64,' + item.gallery.picprofile"
                  ></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.gallery.galleryname"></v-list-item-title>
                </v-list-item-content>
              </v-toolbar>
              <v-card-text>
                <v-card>
                  <v-img
                    style=" height: 100%;
                            width: 100%;
                            margin-top: 10px;
                            border-radius: 8px;"
                    :src="'data:image/jpeg;base64,' + item.pic"
                  />
                  <v-card-title v-text="item.name"></v-card-title>
                  <v-card-text v-text="item.caption"></v-card-text>
                </v-card>

                <comment :id="item.picId" />
              </v-card-text>

              <v-card-actions class="justify-center">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="message"
                      append-outer-icon="mdi-send"
                      @click:append-outer="sendMessage"
                      outlined
                      single-line
                      label="Comment"
                      type="text"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
    <footer />
  </v-container>
</template>

<script>
import Add from "../components/Addphoto.vue";
import comment from "../components/Comment.vue";

import { request } from "../../axios-config";
import dayjs from "dayjs";

// import "dayjs/locale/th";
// dayjs.locale("th");

export default {
  components: {
    Add,
    comment
  },

  methods: {
    formattedDateTime(date) {
      // Use dayjs to format the current date and time
      return dayjs(date).format("DD MMMM YYYY ");
    },
    goToAccount() {
      this.$router.push("/myAccount");
    },
    async fetchItems() {
      try {
        const response = await request.get("/photo");
        this.items = response.data;
        if (response.data) {
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching board game data:", error);
      }
    },
    sendMessage() {}
  },

  created() {
    this.fetchItems();
  },

  data() {
    return {
      items: [],
      user: {
        name: "John Doe",
        email: "john@example.com"
      }
    };
  }
};
</script>


<style>
</style>