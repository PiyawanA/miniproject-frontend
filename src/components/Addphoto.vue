<template v-slot:extension>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog transition="dialog-bottom-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab color="#c94f68" class="style" right absolute v-bind="attrs" v-on="on">
            <v-icon color="#ffff">mdi-plus</v-icon>
          </v-btn>
        </template>

        <template>
          <v-card>
            <v-toolbar flat color="#893744" dark>
              <v-toolbar-title>Submit a post</v-toolbar-title>
            </v-toolbar>

            <v-card-text style="margin-top:20px">
              <v-text-field filled label="Photo Name" value="title" v-model="title"></v-text-field>

              <v-textarea filled label="Description" value="detail" v-model="detail"></v-textarea>

              <v-divider class="my-2"></v-divider>

              <v-item-group multiple>
                <v-file-input
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an Photo"
                  prepend-icon="mdi-camera"
                  label="Photo"
                  @change="selectPhoto"
                ></v-file-input>
              </v-item-group>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" @click="postPhoto" depressed>Post</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { request } from "../../axios-config";

export default {
  data: () => ({
    dialog: false,
    photo: null,
    detail: "",
    title: "",

    rules: [
      value =>
        !value || value.size < 2000000 || "Photo size should be less than 2 MB!"
    ]
  }),
  methods: {
    async postPhoto() {
      try {
        const user = JSON.parse(localStorage.getItem("auth"));
        const data = new FormData();
        data.append(
          "body",
          JSON.stringify({
            name: this.title,
            caption: this.detail,
            gallery: { galleryId: user?.galleryId }
          })
        );
        data.append("photo", this.photo);
        const response = await request.post("/photo", data, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        if (response.status == 201) {
          console.log(response.data);
          this.$router.go(0)
        }
      } catch (error) {
        console.error("Error Create BoardGame:", error);
      }
    },

    selectPhoto(file) {
      this.photo = file;
    }
  }
};
</script>

<style>
.style {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007aff;
  color: #fff;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>