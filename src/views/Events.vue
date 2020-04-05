<template>
<v-container fluid>
    <v-row justify="center">
        <v-col cols="12" lg="8" md="10" sm="10" xs="12">
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
        <v-col cols="12" lg="8" md="10" sm="10" xs="12">
            <v-card flat>
                <v-card-title primary-title>
                    Events
                </v-card-title>
                <EventList v-bind:groupId="group" reactive/>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
// @ is an alias to /src
// import $ from "jquery";
import EventForm from '../components/EventForm.vue'
import EventList from '../components/EventList.vue'

export default {
    name: 'Events',
    props: ['groupId'],
    data: () => ({
        formVisible: false,
        group: null
    }),
    components: {
        EventForm,
        EventList
    },
    created() {
        if(this.groupId) {
            this.group = this.groupId;
        }
    }
}
</script>
