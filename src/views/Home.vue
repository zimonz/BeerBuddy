<template>
<v-container fluid>
    <v-row class="text-center">
        <v-col cols="12" lg="5" md="5" sm="12" offset-md="1">
            <v-card class="green lighten-1 pa-0" shaped>
                <v-card-title class="headline text-uppercase white--text">
                    Upcoming events
                    <v-spacer></v-spacer>
                    <v-btn @click="showEvents = !showEvents" icon color="blue-grey">
                      <v-icon>{{ expandEvents }}</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider></v-divider>

                <v-expand-transition>
                    <div v-show="showEvents">
                        <v-card-text class="text-left">
                            <EventList />
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-dialog
                                v-model="createEvent"
                                width="700"
                            >
                            <template v-slot:activator="{ on }">
                                <v-btn class="elevation-1 green darken-1 ma-2" v-on="on" dark text>Create Event</v-btn>
                            </template>

                            <v-card>
                                <v-card-title class="display-1" primary-title>
                                    Create Event
                                    <v-spacer></v-spacer>
                                    <v-btn flat icon color="error">
                                        <v-icon>mdi-close-circle-outline</v-icon>
                                    </v-btn>
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <EventForm />      
                                </v-card-text>        
                            </v-card>

                            </v-dialog>
                        </v-card-actions>
                    </div>
                </v-expand-transition>
            </v-card>
        </v-col>

        <v-col cols="12" lg="3" md="4" sm="12" offset-md="1">
            <v-card shaped>
                <v-card-title primary-title>
                    Debts
                    <v-spacer></v-spacer>
                    <v-btn @click="showDebts = !showDebts" icon color="blue-grey">
                      <v-icon>{{ expandDebts }}</v-icon>
                    </v-btn>
                </v-card-title>
                  <v-divider></v-divider>
                <v-expand-transition>
                    <div v-show="showDebts">
                        <v-card-text class="text-left">
                          Debts
                        </v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import EventList from '../components/EventList.vue'
import EventForm from '../components/EventForm'

export default {
    name: 'Home',
    components: {
        EventList,
        EventForm
    },
    data: () => ({
        showEvents: true,
        showDebts: true,
        createEvent: false
    }),
    computed: {
      expandEvents() {
        return this.showEvents ? 'mdi-minus' : 'mdi-plus';
      },
      expandDebts() {
        return this.showDebts ? 'mdi-minus' : 'mdi-plus';
      }
    }
}
</script>
