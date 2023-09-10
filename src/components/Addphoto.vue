<template v-slot:extension>
  <v-btn fab color="#c94f68" class="style" right absolute  @click="goToPost()">
    <v-icon color="#ffff">mdi-plus</v-icon>
  </v-btn>
</template>

<script>

export default {
    methods:{
        goToPost() {
            this.$router.push('/post')
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