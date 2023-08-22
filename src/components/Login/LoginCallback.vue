<template></template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { verifySocialId } from "@/api/api";
const route = useRoute();

onMounted(() => {
  const authorizationCode = route.query.code;
  if (authorizationCode !== null) {
    // console.log(authorizationCode.toString());
    verifySocialId(authorizationCode.toString());
  }
});
</script>
<style scoped lang="scss"></style>
