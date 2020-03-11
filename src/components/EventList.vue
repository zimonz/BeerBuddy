<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <EventForm />
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card>
            <v-card-title primary-title>
                Eventlist
            </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import EventForm from '@/components/EventForm'

  export default {
    name: 'Eventist',
    components: {
      EventForm
    },
    data: () => ({
      //var
    }),
  }
</script>
