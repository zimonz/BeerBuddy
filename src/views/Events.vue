<template>
<v-container fluid>
    <v-system-bar color="grey lighten-3" lights-out absolute>
        <v-btn small class="mr-2" color="grey lighten-1" @click="$router.go(-1)" icon>
            <v-icon>mdi-arrow-left-circle</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <span>{{ groupName }}</span>
        <v-spacer></v-spacer>
    </v-system-bar>
    <v-row justify="center">
        <v-col cols="12" lg="8" md="10" sm="10" xs="12">
            <v-card flat>
                <v-card-actions>
                    <v-btn small color="secondary" @click="formVisible = !formVisible">
                        <v-icon>mdi-account-multiple</v-icon>Create event
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
                <v-expand-transition>
                    <EventForm v-show="formVisible" v-bind:groupId="groupId" @update="$forceUpdate();" />
                </v-expand-transition>
            </v-card>
        </v-col>
        <v-col cols="12" lg="8" md="10" sm="10" xs="12">
        </v-col>
        <v-col cols="12" lg="8" md="10" sm="10" xs="12">
            <v-card flat>
                <v-card-title primary-title>Events</v-card-title>
                <EventList v-bind:groupId="group" reactive />
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import $ from "jquery";
import {
    apiUrl
} from "../assets/globals";
import EventForm from "../components/EventForm.vue";
import EventList from "../components/EventList.vue";

export default {
    name: "Events",
    props: ["groupId"],
    data: () => ({
        formVisible: false,
        group: null,
        groupName: null
    }),
    components: {
        EventForm,
        EventList
    },
    methods: {
        getGroup() {
            $.get(apiUrl + "/api/v1/group/" + this.group).done(res => {
                this.groupName = res.name
            });
        }
    },
    created() {
        if (this.groupId) {
            this.group = this.groupId;
            this.getGroup();
        }
    }
};
</script>
