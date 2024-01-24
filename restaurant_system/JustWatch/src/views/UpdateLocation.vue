<template>
  <navbar />
  <update-locationVue />
</template>
<script>
import navbar from '@/components/public/navbar.vue'
import UpdateLocationVue from '@/components/Home/Update-Location.vue'
export default {
  components: {
    navbar,
    UpdateLocationVue
  }
}
</script>
