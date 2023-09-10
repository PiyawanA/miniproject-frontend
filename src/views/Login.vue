<template>
  <v-sheet width="500" class="mx-auto">
    <h1 class="styleLogin">Sign in</h1>
    <v-form fast-fail @submit.prevent>
      <v-text-field v-model="Username" label="Username" :rules="UsernameRules"></v-text-field>

      <v-text-field v-model="Password" label="Password" :rules="PasswordRules"></v-text-field>

      <v-btn type="submit" block class="mt-2">Sign in</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    Username: "",
    UsernameRules: [
      value => {
        if (value?.length > 8) return true;

        return "First name must be at least 3 characters.";
      }
    ],
    Password: "",
    PasswordRules: [
      value => {
        if (/[^0-9]/.test(value)) return true;

        return "Last name can not contain digits.";
      }
    ]
  })
};
</script>

<style>
.styleLogin {
  margin-top: 20%;
}
</style>