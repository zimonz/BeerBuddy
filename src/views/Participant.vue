<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" lg="8" md="10" sm="10" xs="12">
          <ParticipantForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ParticipantForm from "../components/ParticipantForm";

export default {
  name: "Participant",
  components: {
    ParticipantForm
  },
  data: () => ({
  })
};
</script>

<style>
</style>