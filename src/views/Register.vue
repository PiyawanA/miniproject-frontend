<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card style="margin: 20px; padding:20px; justify-content:center;" max-width="800">
        <v-form v-model="valid" @submit.prevent="register">
          <v-container>
            <h1>Sign up</h1>

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="firstname"
                  :rules="firstnameRules"
                  label="First name"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="lastname"
                  :rules="lastnameRules"
                  label="Last name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

            <v-text-field
              v-model="username"
              @change="handleUsernameChange"
              :rules="usernameRules"
              label="Username"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              type="password"
              label="Password"
              required
            ></v-text-field>

            <v-row>
              <v-col cols="6">
                <v-container>
                  <v-btn :disabled="!valid" style="color: white;" type="submit" block color="#983744" class="ma-2">sign up</v-btn>
                </v-container>
              </v-col>

              <v-spacer></v-spacer>

              <v-col cols="6">
                <v-container>
                  <v-btn @click="goToLogin" block color="#e0a4a6" class="mt-2">sign in</v-btn>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { request } from "../../axios-config";
import Swal from "sweetalert2";

export default {
  data: () => ({
    valid: true,
    usernameCheck: false,
    firstname: "",
    firstnameRules: [
      v => !!v || "Firstname is required",
  
    ],
    lastname: "",
    lastnameRules: [
      v => !!v || "Lastname is required",
  
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    username: "",
    usernameRules: [
      v => !!v || "Username is required",
    ],

    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      
    ]
  }),

  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    async register() {
      try {
        const data = new FormData();
        data.append(
          "body",
          JSON.stringify({
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            username: this.username,
            password: this.password
          })
        );

        const response = await request.post("/register", data, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        if (response.status === 201) {
          Swal.fire({
            title: "success!",
            icon: "success",
            confirmButtonText: "Comfirm",
            timer: 1000
          });
          this.$router.push("/login");
        } 
      } catch (error) {
    
          Swal.fire({
            title: "Wrong!",
            text: "Can not register",
            icon: "error",
            confirmButtonText: "confirm",
            timer: 1000
          });
        
        console.error("Error data:", error);
      }
    },
  
  }
};
</script>

<style>
</style>