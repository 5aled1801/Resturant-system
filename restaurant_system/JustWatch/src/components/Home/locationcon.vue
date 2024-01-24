<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="contentlocation">
    <v-container>
      <v-row
        style="
          background: linear-gradient(259deg, black, #4b4b4b);
          color: white;
          text-align: center;
          border-radius: 12px;
        "
        ><v-col cols="3">Resturant name</v-col>
        <v-col cols="3">Address</v-col>
        <v-col cols="2">Phone</v-col>
        <v-col cols="3" class="text-end">operation</v-col></v-row
      >
      <v-row
        v-for="card in locationCard"
        :key="card.id"
        style="text-align: center; border-bottom: 1px solid gray"
      >
        <v-col cols="3">
          <h4>{{ card.name }}</h4>
        </v-col>
        <v-col cols="3">
          <h4 style="font-size: 15px; font-weight: 400">{{ card.address }}</h4>
        </v-col>
        <v-col cols="2">
          <h4 style="font-size: 15px; font-weight: 400">{{ card.phone }}</h4>
        </v-col>

        <v-col style="display: flex; justify-content: end; gap: 7px">
          <router-link :to="{ name: 'deletelocation', params: { locationID: card.id } }">
            <v-btn style="text-transform: none; width: 25%" color="error"> Delete </v-btn>
          </router-link>
          <router-link :to="{ name: 'update-location', params: { locationID: card.id } }">
            <v-btn style="text-transform: none; width: 25%" color="black"> Update </v-btn>
          </router-link>
          <router-link :to="{ name: 'Menu', params: { locationID: card.id } }">
            <v-btn style="text-transform: none; width: 25%" color="green-darken-4"> Menu </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      locationCard: [],
      userID: ''
    }
  },
  async beforeMount() {
    const storedUserData = JSON.parse(localStorage.getItem('user_Inf'))
    if (!storedUserData) {
      this.$router.push('/login')
    } else {
      if (Array.isArray(storedUserData) && storedUserData.length > 0) {
        const firstUser = storedUserData[0]
        this.userId = firstUser.id
      } else {
        this.userId = storedUserData.id
      }
    }
    const carLoca = await axios.get(`http://localhost:3000/location?userID=${this.userID}`)
    this.locationCard = carLoca.data
  }
}
</script>

<style scoped>
.contentlocation {
  top: 25%;
  position: absolute;
  width: 100%;
}
a {
  color: white;
  text-decoration: none;
}
</style>
