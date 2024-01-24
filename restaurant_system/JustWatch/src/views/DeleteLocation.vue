<template>
  <div class="contDelete">
    <navbar />
    <v-container
      style="
        position: absolute;
        text-align: center;
        top: 40%;
        transform: translateY(-50%);
        text-align: -webkit-center;
      "
    >
      <div class="textcont w-50">
        <v-row>
          <v-col>
            <h1>Delete Resturant # {{ locat }}</h1>
            <hr />
            <p class="text-red">Are you sure you want to delete this location</p>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <div>
            <p>{{ name }}</p>
            <p>{{ address }}</p>
            <p>{{ phone }}</p>
          </div>
        </v-row>
        <hr />
        <v-row>
          <v-col>
            <v-btn
              style="text-transform: none; margin-inline: 10px"
              color="red"
              @click="deleteLocation()"
              >Delete</v-btn
            >
            <v-btn style="text-transform: none" color="blue" @click="goback()">Back</v-btn></v-col
          >
        </v-row>
      </div>
    </v-container>
  </div>
</template>
<script>
import navbar from '@/components/public/navbar.vue'
import axios from 'axios'
export default {
  components: {
    navbar
  },
  data() {
    return {
      name: '',
      address: '',
      phone: '',
      locat: ''
    }
  },
  async mounted() {
    let user = localStorage.getItem('user_Inf')
    if (!user) {
      this.$router.push('/singup')
    } else {
      const locId = this.$route.params.locationID
      this.locat = locId
      let locationData = await axios.get(`http://localhost:3000/location/${this.locat}`)
      this.name = locationData.data.name
      this.address = locationData.data.address
      this.phone = locationData.data.phone
    }
  },
  methods: {
    goback() {
      this.$router.push('/')
    },
    async deleteLocation() {
      const dele = await axios.delete(`http://localhost:3000/location/${this.locat}`)
      if (dele.status == 200) {
        var list_ofCate = []
        var catedataREquest = await axios.get(
          `http://localhost:3000/category?locationId=${this.locat}`
        )
        list_ofCate = catedataREquest.data
        for (let i = 0; i < list_ofCate.length; i++) {
          var delcate = await axios.delete(`http://localhost:3000/category/${list_ofCate[i].id}`)
          if (delcate.status == 200) {
            var list_of_item = []
            let getItem = await axios.get(
              `http://localhost:3000/item?idCategory=${list_ofCate[i].id}`
            )
            list_of_item = getItem.data
            if (getItem.status == 200 && list_ofCate.length > 0) {
              for (let j = 0; j < list_of_item.length; j++) {
                await axios.delete(`http://localhost:3001/items/${list_of_item[j].id}`)
              }
            }
          }
        }

        setTimeout(() => {
          this.$router.push('/')
        }, 100)
      } else {
        alert('error happend')
      }
    }
  }
}
</script>
<style>
p {
  padding: 10px 0;
}
hr {
  margin: 20px;
}
</style>
