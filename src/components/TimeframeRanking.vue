<template>
<v-container v-if="rankings.length > 0" reactive fluid>
    <v-list three-line subheader>
        <v-subheader class="headline">Choose timeframe</v-subheader>
        <template ref="timeFrameComponent" v-for="ranking in rankings">
            <v-list-item :key="ranking.originalTimeframe.id" :style="((selectedTimeFrame && ranking.originalTimeframe.id == selectedTimeFrame.id) ? 'background: rgb(240,240,240)' : '')">
                <v-list-item-content>
                    <v-list-item-title v-text="formatDateTime(ranking.from) + ' - ' + formatDateTime(ranking.to)"></v-list-item-title>
                    <v-list-item-subtitle v-text="'Number of participants ' + ranking.numberOfParticipants"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="'Average time per participant ' + ranking.avgTimePerParticipant"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn v-if="selectedTimeFrame == null" @click="setSelectedTimeframe(ranking.originalTimeframe.id)" icon>
                        select
                        <v-icon color="grey lighten-1">mdi-crown</v-icon>
                    </v-btn>
                    <v-btn v-if="selectedTimeFrame != null  && ranking.originalTimeframe.id == selectedTimeFrame.id" icon>
                        <v-icon color="amber darken-3">mdi-crown</v-icon>
                    </v-btn>
                    <v-btn v-if="selectedTimeFrame != null  && ranking.originalTimeframe.id == selectedTimeFrame.id" @click="downloadCal(ranking.from, ranking.to)" icon>
                        <v-icon>mdi-calendar</v-icon>
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
import ical from "ical-generator";
import FileSaver from "file-saver";
import moment from "moment";

export default {
    name: "TimeFrame",
    props: ["headers", "title", "groupId", "eventId", "selectedTimeFrame"],
    data: () => ({
        rankings: ""
    }),
    components: {},
    methods: {
        downloadCal(from, to) {
            const cal = ical();
            cal.createEvent({
                start: from,
                end: to,
                summary: this.title
            });
            FileSaver.saveAs(cal.toBlob(), "event.ics");
        },
        formatDateTime(ISOTime) {
            return moment(ISOTime).format("DD.MM.YY HH:mm");
        },
        getRankings() {
            $.get(
                    apiUrl +
                    "/api/v1/group/" +
                    this.groupId +
                    "/events/" +
                    this.eventId +
                    "/ranking"
                )
                .done(response => {
                    this.rankings = response;
                })
                .always((this.isUpdating = false));
        },
        setSelectedTimeframe(timeframeId) {
            $.ajax({
                type: "POST",
                url: apiUrl +
                    "/api/v1/group/" +
                    this.groupId +
                    "/events/" +
                    this.eventId +
                    "/selectedTimeFrame",
                data: JSON.stringify(timeframeId),
                contentType: "application/json; charset=utf-8"
            }).done(()=>{
                this.eventHub.$emit('updateEvent');
            });
            this.eventHub.$emit('updateTimeframeRanking');
            return 0;
        }
    },
    created() {
        this.getRankings();

        this.eventHub.$on('updateTimeframeRanking', () => {
            this.getRankings();
        });
    }
};
</script>

<style scoped>
td {
    overflow: hidden;
}
</style>
