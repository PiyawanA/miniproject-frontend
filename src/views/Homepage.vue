<template>
  <v-container>
    <Add />
    <v-row dense>
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
                <router-link :to="`/gallery/${item.gallery.galleryId}`" style="text-decoration: none;">
                  <v-list-item>
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
                  </v-list-item>
                </router-link>
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
                  <v-card-text style="color: #212121;" v-text="item.caption"></v-card-text>

                  <v-card-subtitle v-text="'Posted: '+formattedDateTime(item.time)"></v-card-subtitle>
                </v-card>

                <comment :id="item.picId" />
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Add from "../components/Addphoto.vue";
import comment from "../components/Comment.vue";

import { request } from "../../axios-config";
import dayjs from "dayjs";

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
      this.$router.push({path: '/myAccount'}).catch(()=>{})

    },
    async fetchItems() {
      try {
        const response = await request.get("/photo");
        this.items = response.data;
        if (response.data) {
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error data:", error);
      }
    },

    async search(textSearch) {
      try {
        const response = await request.get("/searchGallery", {
          params: {
            galleryname: textSearch
          }
        });

        if (response.data) {
          console.log(response.data);
          this.items = response.data;
        }
      } catch (error) {
        console.error("Error data:", error);
      }
    }
  },

  created() {
    this.fetchItems();
  },

  mounted() {
    this.$EventBus.$on("search", this.search);
  },

  data() {
    return {
      items: []
    };
  }
};
</script>


<style>
</style>