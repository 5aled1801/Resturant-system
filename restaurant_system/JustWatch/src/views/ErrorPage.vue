<template>
    <v-container fluid style="
  padding: 0 !important;
">
        <navbar />
        <img src="../assets/images/000-http-error-codes.png" alt="" style="    width: 100vw;
    position: absolute;
    left: 0;
    height: calc(100vh - 126px);">
    </v-container>
</template>
<script>
import navbar from '@/components/public/navbar.vue';
export default {
    name: 'ErrorPage',
    components: {
        navbar
    }
}
</script>