<template>
  <v-card class="mx-auto mt-2">
    <v-subheader>Comments</v-subheader>
    <v-list three-line v-for="comment in comments" :key="comment.reviewId">
      <template>
        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="'data:image/jpeg;base64,' +comment.gallery.picprofile"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title style="color: black;" v-html="comment.gallery.galleryname"></v-list-item-title>
            <v-list-item-subtitle>
              <span style="color: #424242;" v-html="comment.comment"></span>
            </v-list-item-subtitle>

            <v-list-item-subtitle v-html="formattedDateTime(comment.time)"></v-list-item-subtitle>
          </v-list-item-content>

          <v-btn icon v-if="user.galleryId === comment.gallery.galleryId" @click="deleteComment(comment.reviewId)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item>
      </template>
    </v-list>

    <v-card-actions class="justify-center">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="text"
            append-outer-icon="mdi-send"
            @click:append-outer="postComment"
            @keyup.enter="postComment"
            outlined
            rounded
            dense
            single-line
            label="Comment"
            type="text"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { request } from "../../axios-config";
import Swal from "sweetalert2";

import dayjs from "dayjs";
export default {
  data: () => ({
    comments: [],
    user: JSON.parse(localStorage.getItem("auth")),
    text: ""
  }),
  created() {
    // Call the getComment method when the component is created
    this.getComment();
  },
  props: {
    id: Number
  },
  methods: {
    formattedDateTime(date) {
      // Use dayjs to format the current date and time
      return dayjs(date).format("DD MMM YYYY - HH:MM");
    },
    async getComment() {
      try {
        const response = await request.get(`/review/${this.id}`);
        this.comments = response.data;
        if (response.data) {
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async postComment() {
      try {
        const user = JSON.parse(localStorage.getItem("auth"));
        const response = await request.post("/review", {
          comment: this.text,
          picture: { picId: this.id },
          gallery: { galleryId: user?.galleryId }
        });
        if (response.status == 201) {
          console.log(response.data);
          this.getComment();
          this.text= ""
        }
      } catch (error) {
        console.error("Error data:", error);
      }
    },
    async deleteComment(id) {
      console.log("id",id);
      Swal.fire({
        title: "Notification!",
        text: `Do you want to delete ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancle",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await request.delete(
              `/review/${id}`
            );
            if (response.status === 200) {
              Swal.fire({
                title: "Delete successfully!",
                text: `delete successfully`,
                icon: "success",
                confirmButtonText: "Confirm",
              });
              this.getComment();
              
            }
          } catch (err) {
            Swal.fire({
              title: "Wrong!",
              text: "Can not delete",
              icon: "error",
              confirmButtonText: "Confirm",
            });
          }
        }
      });
    },

  }
};
</script>

<style>
</style>