<template>
  <v-row justify="center" >
    <v-col cols="12" sm="10" md="8" lg="6">
  <v-card style="margin: 20px; padding:20px; justify-content:center;" max-width="800" >
    <v-form v-model="valid">
      <v-container>
        <h1>Sign up</h1>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              :counter="10"
              label="First name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="Last name"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Username" required></v-text-field>

        <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Password" required></v-text-field>

        <v-row>
          <v-col cols="6">
            <v-container>
              <v-btn type="submit" block color="success" class="ma-2">sign up</v-btn>
            </v-container>
          </v-col>

          <v-spacer></v-spacer>

          <v-col cols="6">
            <v-container>
              <v-btn @click="goToLogin" block color="#E0E0E0" class="mt-2">sign in</v-btn>
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
export default {
  data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      
    }),

  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
  }
};
</script>

<style>
</style>