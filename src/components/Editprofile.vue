<template>
  <v-row style="display: flex; justify-content: flex-end;margin: 8px 8px;">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi mdi-pencil</v-icon>
        </v-btn>
      </template>

      
        <v-card>
          <v-toolbar color="#e0a4a6">
            <h1 style=" font-family: system-ui;">My Account</h1>
          </v-toolbar>
          <v-form v-model="valid" @submit.prevent="save">
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-avatar size="150" class="avatar-container">
                    <img :src="checkPhoto" class="avatar-image" />
                    <i class="mdi mdi-camera overlay-icon"></i>
                    <input
                      type="file"
                      ref="fileInput"
                      style="opacity: 0; position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                      @change="handleFileChange"
                    />
                  </v-avatar>
                </v-col>

                <v-col cols="12" md="8">
                  <v-text-field v-model="user.galleryname" label="Gallery Name" required></v-text-field>
                  <v-text-field v-model="user.description" label="Description" required></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="user.firstname" label="First name" required></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field v-model="user.lastname" label="Last name" required></v-text-field>
                </v-col>
              </v-row>
              <v-text-field v-model="user.email" :rules="emailRules" label="E-mail" required></v-text-field>

              <v-text-field v-model="user.username" label="Username" required></v-text-field>
            </v-container>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Close</v-btn>
            <v-btn color="blue darken-1" text @click="editPhofile">Save</v-btn>
          </v-card-actions>
        </v-card>
      
    </v-dialog>
  </v-row>
</template>

<script>
import Swal from "sweetalert2";
import { request } from "../../axios-config";

export default {
  data: () => ({
    dialog: false,
    selectedPhoto: null,
    user: JSON.parse(localStorage.getItem("auth"))
  }),
  computed: {
    checkPhoto() {
      if (this.selectedPhoto) {
        // If a photo is selected, return its data URL
        return URL.createObjectURL(this.selectedPhoto);
      } else if (this.user.picprofile) {
        // If no photo is selected, and a default photo exists in user.picprofile, return it
        return "data:image/jpeg;base64," + this.user.picprofile;
      } else {
        // Return a placeholder image or empty string if desired
        return ""; // You can provide a placeholder image or empty string here
      }
    }
  },
  methods: {
    handleFileChange(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        this.selectedPhoto = selectedFile;
      } else {
        this.selectedPhoto = null;
      }
    },

    close() {
      this.selectedPhoto = null;
      this.dialog = false;
    },

    async editPhofile() {
      console.log("Success:");
      // const user = JSON.parse(localStorage.getItem("auth"));
      const data = new FormData();
      data.append(
        "body",
        JSON.stringify({
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          email: this.user.email,
          username: this.user.username,
          galleryname: this.user.galleryname,
          description: this.user.description
        })
      );

      if (this.selectedPhoto) {
        data.append("photo", this.selectedPhoto);
      } else if (this.user.picprofile) {
        const base64Data = `data:image/jpeg;base64,${this.user.picprofile}`;
        const byteCharacters = atob(base64Data.split(",")[1]);
        const byteArrays = new Uint8Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteArrays[i] = byteCharacters.charCodeAt(i);
        }
        const blob = new Blob([byteArrays], { type: "image/jpeg" });

        const fileName = "photo";
        const file = new File([blob], fileName, { type: "image/jpeg" });

        data.append("photo", file);
      }

      try {
        const response = await request.put(
          `/gallery/${this.user.galleryId}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
        if (response.status == 200) {
          Swal.fire({
            title: "Update successfully!",
            icon: "success",
            confirmButtonText: "confirm",
            timer: 1000
          }).then(() => {
            localStorage.removeItem("auth");
            localStorage.setItem("auth", JSON.stringify(response.data));
            this.$router.go(0);
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Update unsuccessfully!",
          text: "Wrong",
          icon: "error",
          confirmButtonText: "confirm"
        });
        console.error("Error :", error);
      }
    }
  }
};
</script >

<style scoped>
.avatar-container {
  position: relative;
}

.overlay-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px; /* Adjust the icon size as needed */
  color: #333; /* Set the icon color */
  pointer-events: none; /* Allow clicks to pass through the icon to the input */
}
</style>