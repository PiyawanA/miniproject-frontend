<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card style="margin: 20px; padding:20px;" max-width="800">
        <v-container>
          <h1 class="styleLogin">Sign in</h1>

          <v-form fast-fail @submit.prevent="login">
            <v-text-field v-model="Username" label="Username" :rules="UsernameRules"></v-text-field>

            <v-text-field
              v-model="Password"
              type="password"
              label="Password"
              :rules="PasswordRules"
            ></v-text-field>

            <v-btn type="submit" block class="mt-2" color="#c94f68">
              <div style="color: #ffff;">Sign in</div>
            </v-btn>

            <div class="reg">
              Not an account?
              <router-link to="/register">Sign up now</router-link>
            </div>
          </v-form>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { request } from "../../axios-config";

export default {
  data: () => ({
    Username: "",
    UsernameRules: [
      value => {
        if (value?.length > 0) return true;

        return "please input username";
      }
    ],
    Password: "",
    PasswordRules: [
      value => {
        if (value?.length > 0) return true;

        return "please input password";
      }
    ]
  }),
  methods: {
    async login() {
      try {
        const response = await request.post("/login", {
          username: this.Username,
          password: this.Password
        });
        if (response.data) {
          localStorage.setItem("auth", JSON.stringify(response.data));
          this.$EventBus.$emit("getAuth");
          this.$router.push("/");
        }
      } catch (error) {
        console.error("Error data:", error);
      }
    }
  }
};
</script scoped>

<style>
.styleLogin {
  margin-top: 10px;
}
.reg {
  text-align: right;
  margin-top: 10px;
}
.mx-auto {
  margin-top: 100px;
}
</style>