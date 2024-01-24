<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <v-row style="background: linear-gradient(195deg, black, #555555); padding: 0 !important">
    <v-container
      class="d-flex justify-around-space align-center"
      style="padding: 0px !important"
      fluid
    >
      <v-col cols="4" class="p-0 text-center"
        ><img
          src="../../assets/images/pngtree-chef-restaurant-logo-png-image_6136204.png"
          width="50"
          height="50"
          alt=""
          style="margin-top: 5px"
      /></v-col>
      <v-col cols="4">
        <ul>
          <router-link tage="li" to="/" exact> Home </router-link>
          <router-link tage="li" to="/login" @click="removeruser()"> Log Out </router-link>
        </ul>
      </v-col>
      <v-col
        style="
          color: white;
          align-items: end;
          text-transform: capitalize;
          display: flex;
          align-items: center;
        "
      >
        <div style="text-align: center">Welcome <br />{{ infusername }}</div>
        <v-btn color="blue" style="text-transform: none" to="/profile">Profile</v-btn>
      </v-col>
    </v-container>
  </v-row>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    removeruser() {
      localStorage.removeItem('user_Inf')
      localStorage.clear()
    }
  },
  data() {
    return {
      infusername: ''
    }
  },
  mounted() {
    const storedUserData = JSON.parse(localStorage.getItem('user_Inf'))
    if (!storedUserData) {
      this.$router.push('/login')
      // location.reload()
    } else {
      if (Array.isArray(storedUserData) && storedUserData.length > 0) {
        const firstUser = storedUserData[0]
        this.infusername = firstUser.username
      } else {
        this.infusername = storedUserData.username
      }
    }
  }
}
</script>

<style scoped>
.router-link-exact-active {
  color: white;
  background-color: rgb(64, 132, 132);
}

a {
  transition: 1s;
  padding: 10px;
  text-decoration: none;
  margin-inline: 10px;
  color: white;
}

a:hover {
  background-color: rgb(64, 132, 132);
}
</style>
