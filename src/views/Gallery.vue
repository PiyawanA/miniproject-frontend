<template>
  <v-container>
    <v-card>
      <v-toolbar color="#e0a4a6">
        <div>
          <v-card-title>{{ user.galleryname }}</v-card-title>
        </div>

        <v-spacer></v-spacer>
        <edit />
      </v-toolbar>
    </v-card>
    <v-card class="pa-4 mb-2">
      <div
        style="display: flex; flex-direction: row; justify-content: space-around; align-items: center;"
      >
        <v-avatar size="150">
          <img :src="'data:image/jpeg;base64,' + user.picprofile" />
        </v-avatar>

        <div>
          <v-card-title>{{ user.firstname }} {{ user.lastname }}</v-card-title>
          <v-card-subtitle>@{{ user.username }}</v-card-subtitle>
          <v-card-text>{{ user.description }}</v-card-text>
          <v-card-text>Joined: {{ formattedDateTime(user.time) }}</v-card-text>
        </div>
      </div>
    </v-card>

    <Add />
    <v-row justify="start">
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
                <v-icon>mdi-comment-outline</v-icon>
                <div>comment</div>
              </v-card-actions>
            </v-card>
          </template>

          <template>
            <v-card>
              <v-toolbar color="#893744" dark>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-btn icon dark class="center-icon" @click="deletePost(item.picId)">
                  <v-icon dark style="width: 20px; height: 20px ">mdi-delete</v-icon>
                </v-btn>
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
                  <v-card-text v-text="item.caption" style="color: black;"></v-card-text>
                  <v-card-subtitle v-text="'Posted: '+formattedDateTime(item.time)"></v-card-subtitle>

                </v-card>

                <comment :id="item.picId" />
              </v-card-text>
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
import edit from "../components/Editprofile.vue";
import { request } from "../../axios-config";
import dayjs from "dayjs";
import Swal from "sweetalert2";

// import "dayjs/locale/th";
// dayjs.locale("th");

export default {
  components: {
    Add,
    comment,
    edit
  },

  methods: {
    formattedDateTime(date) {
      // Use dayjs to format the current date and time
      return dayjs(date).format("DD MMMM YYYY ");
    },
    async fetchItems() {
      try {
        const response = await request.get(
          `/photo/${JSON.parse(localStorage.getItem("auth")).galleryId}`
        );
        this.items = response.data;
        if (response.data) {
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async deletePost(id) {
      console.log("id", id);
      Swal.fire({
        title: "Notification!",
        text: `Do you want to delete ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancle"
      }).then(async result => {
        if (result.isConfirmed) {
          try {
            const response = await request.delete(`/photo/${id}`);
            if (response.status === 200) {
              Swal.fire({
                title: "Delete successfully!",
                text: `delete successfully`,
                icon: "success",
                confirmButtonText: "Confirm",
                timer: 1000
              });
              this.$router.go(0);
            }
          } catch (err) {
            Swal.fire({
              title: "Wrong!",
              text: "Cannot delete",
              icon: "error",
              confirmButtonText: "Confirm"
            });
          }
        }
      });
    }
  },

  created() {
    this.fetchItems();
  },

  data() {
    return {
      items: [],
      user: JSON.parse(localStorage.getItem("auth")),
    };
  }
};
</script>


<style>
</style>
