<template>
<v-container fluid>
    <v-row justify="center">
        <v-col lg="8" md="10" sm="10" xs="12">
            <v-card flat>
                <v-card-actions>
                    <v-btn small color="secondary" @click="formVisible = !formVisible">
                        <v-icon>mdi-account-multiple</v-icon>
                        Create event
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
                <v-expand-transition>
                    <EventForm v-show="formVisible" />
                </v-expand-transition>
            </v-card>
                <v-divider inset></v-divider>
        </v-col>
        <v-col lg="8" md="10" sm="10" xs="12">
            <v-card flat>
                <v-card-title primary-title>
                    Events
                </v-card-title>
                <EventList />
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
// @ is an alias to /src
import EventForm from '../components/EventForm.vue'
import EventList from '../components/EventList.vue'

export default {
    name: 'Home',
    data: () => ({
        formVisible: false
    }),
    components: {
        EventForm,
        EventList
    }
}
</script>
