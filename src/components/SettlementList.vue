<template>
<v-container fluid>
    <v-list four-lines subheader>
        <v-subheader>Settlement</v-subheader>
        <template v-for="item in items">
            <v-list-item :key="item.id">
                <v-list-item-content>
                    <v-list-item-title v-text="Number( item.amount ).toFixed(2) + ' CHF'"></v-list-item-title>
                    <v-list-item-subtitle v-text="'From ' + item.fromParticipantName"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="'To ' + item.toParticipantName"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn icon>
                        <v-icon color="grey lighten-1">mdi-information</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
            <v-divider :key="item.email"></v-divider>
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
    props: ['settlementEntries'],
    data: () => ({
        items: []
    }),
    methods: {
        getSettlement() {
            console.log(this.settlementEntries);
            this.settlementEntries.forEach(element => {
                $.get(apiUrl + "/api/v1/user/" + element.fromParticipantId).done(fromParticipant => {
                    $.get(apiUrl + "/api/v1/user/" + element.toParticipantId).done(toParticipant => {
                        element.fromParticipantName = fromParticipant.name;
                        element.toParticipantName = toParticipant.name;
                        this.items.push(element);
                        console.log(element);
                    });
                });

            });

        }
    },
    created() {
        this.getSettlement();
    }
};
</script>
