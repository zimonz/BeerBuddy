<template>
             <v-card flat>
                    <v-card-title primary-title>
                        Select definitely timeframe
                    </v-card-title>
                    <v-list three-line subheader>
                        <template v-for="ranking in rankings">
                            <v-list-item :key="ranking.originalTimeframe.id">
                                <v-list-item-content>
                                    <v-list-item-title v-text="formatDateTime(ranking.from) + ' - ' + formatDateTime(ranking.to)">
                                    </v-list-item-title>
                                    <v-list-item-subtitle v-text="'Number of participants ' + ranking.numberOfParticipants"></v-list-item-subtitle>
                                    <v-list-item-subtitle v-text="'Average time per participant ' + ranking.avgTimePerParticipant"></v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn v-if="selectedTimeFrame == null" @click="setSelectedTimeframe(ranking.originalTimeframe.id)" icon>
                                        select<v-icon color="grey lighten-1">mdi-crown</v-icon>
                                    </v-btn>
                                    <v-btn v-if="selectedTimeFrame != null  && ranking.originalTimeframe.id == selectedTimeFrame.id" icon>
                                        <v-icon color="grey lighten-1">mdi-crown</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-card>
</template>

<script>
import $ from "jquery";
import {
    apiUrl
} from "../assets/globals";

import moment from "moment";

export default {
    name: "TimeFrame",
    props: ["headers", "item", "groupId", "eventId", "selectedTimeFrame"],
    data: () => ({
        rankings: "",
    }),
    components: {},
    methods: {
        submit() {
            
        }
        ,formatDateTime(ISOTime) {
            return moment(ISOTime).format("DD.MM.YY HH:mm");
        },
        setSelectedTimeframe(timeframeId) {
            $.ajax({
                type: "POST",
                url: apiUrl + "/api/v1/group/" + this.groupId + "/events/" + this.eventId + "/selectedTimeFrame",
                data: JSON.stringify(timeframeId),
                contentType: "application/json; charset=utf-8",
            });
            return 0;
        },
    },
    created() {
        $.get(apiUrl + "/api/v1/group/" + this.groupId + "/events/" + this.eventId + "/ranking")
            .done(response => {
                console.log(response);
                this.rankings = response;
            })
            .always(this.isUpdating = false);
    }
};
</script>

<style scoped>
td {
    overflow: hidden;
}
</style>
