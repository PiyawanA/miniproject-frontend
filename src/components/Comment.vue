<template>
  <v-card class="mx-auto mt-2">
        <v-subheader>Comment</v-subheader>
    <v-list three-line v-for="comment in comments" :key="comment.reviewId">
      <template >
        <v-divider></v-divider>
        <v-list-item >
          <v-list-item-avatar>
            <v-img :src="'data:image/jpeg;base64,' +comment.gallery.picprofile"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="comment.gallery.galleryname"></v-list-item-title>
            <v-list-item-subtitle ><span class="font-weight-bold" v-html="comment.comment"></span></v-list-item-subtitle>
            
            <v-list-item-subtitle v-html="formattedDateTime(comment.time)"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import { request } from "../../axios-config";
import dayjs from "dayjs";
export default {
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
    sendMessage() {}
  },

  data: () => ({
    comments: [],

    items: [
      { header: "Today" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        subtitle: `<span class="font-weight-bold">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: `<span class="font-weight-bold">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle:
          '<span class="font-weight-bold">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?'
      }
    ]
  }),
  created() {
    // Call the getComment method when the component is created
    this.getComment();
  }
};
</script>

<style>
</style>