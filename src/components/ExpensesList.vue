<template>
<v-container fluid>
    <v-list four-line subheader>
        <v-subheader class="headline">All expenses</v-subheader>
        <template v-for="item in items">
            <v-list-item :key="item.id">
                <v-list-item-content>
                    <v-list-item-title v-text="Number(item.amount).toFixed(2) + ' CHF'"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.note"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="'Paid by: ' + item.payedBy.surname + ' ' + item.payedBy.name"></v-list-item-subtitle>
                    <v-list-item-subtitle>
                        <template>
                            <v-chip-group>
                                <v-chip v-for="user in item.usedBy" :key="user.id" :value="user.id" color="primary" small>
                                    <div>{{ user.surname + ' ' + user.name }}</div>
                                </v-chip>
                            </v-chip-group>
                        </template>
                    </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn icon>
                        <v-icon color="grey lighten-1">mdi-information</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </template>
    </v-list>
</v-container>
</template>

<script>
import $ from "jquery";
import {
    apiUrl
} from "../assets/globals";

export default {
    props: ['groupId', 'eventId'],
    data: () => ({
        items: null
    }),
    methods: {
        getExpenses() {
            $.get(apiUrl + "/api/v1/group/" + this.groupId + "/events/" + this.eventId + "/expenses").done(response => {
                this.items = response;
            });
        }
    },
    created() {
        this.getExpenses();
    }
};
</script>
