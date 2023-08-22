<template></template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { verifySocialId } from "@/api/api";
const route = useRoute();

const verify = async (authCode: string) => {
  const response = await verifySocialId(authCode);
  console.log(response.data);
};

onMounted(() => {
  const authorizationCode = route.query.code;
  if (authorizationCode !== null) {
    // console.log(authorizationCode.toString());
    verify(authorizationCode.toString());
  }
});
</script>
<style scoped lang="scss"></style>
