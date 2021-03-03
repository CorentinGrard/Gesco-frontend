<template>
  <v-container>
    <v-hover v-slot="{ hover }">
      <v-card
        :elevation="hover ? 12 : 2"
        v-on:click="() => $emit('select-promotion', promotion)"
      >
        <v-card-title>{{ promotion.name }}</v-card-title>
      </v-card>
    </v-hover>
  </v-container>
</template>

<script>
export default {
  props: ["promotion"],
};
</script>

<style>
</style>