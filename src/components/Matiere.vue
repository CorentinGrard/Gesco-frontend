<template>
  <v-container>
    <v-hover v-slot="{ hover }">
      <v-card
        :elevation="hover ? 12 : 2"
        v-on:click="() => $emit('select-matiere', matiere)"
      >
        <v-card-title>{{ matiere.name }}</v-card-title>
      </v-card>
    </v-hover>
  </v-container>
</template>

<script>
export default {
  props: ["matiere"],
};
</script>

<style>
</style>