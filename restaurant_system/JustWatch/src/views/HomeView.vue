<template>
  <navbar />
  <add-location />

  <locationcont />
</template>
<script>
import navbar from '@/components/public/navbar.vue'
import AddLocation from '@/components/Home/AddLocation.vue'
import locationcont from '../components/Home/locationcon.vue'

export default {
  components: {
    navbar,
    AddLocation,
    locationcont
  },
  mounted() {
    const storedUserData = JSON.parse(localStorage.getItem('user_Inf'))
    if (!storedUserData) {
      this.$router.push('/login')
    }
  }
}
</script>
