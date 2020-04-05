<template>
<v-container fluid>
    <v-row justify="center">
        <v-col cols="12" lg="12" md="12" sm="12" xs="12">
            <v-card flat>
                <v-card-title primary-title>{{this.title}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <template>
                                <v-data-table :headers="headers" :items="timeFramesTable" :single-expand="singleExpand" :expanded.sync="expanded" item-key="id" show-expand class="elevation-1" dense>
                                    <template v-slot:top>
                                        <v-toolbar flat>
                                            <v-toolbar-title>Timeframes</v-toolbar-title>
                                        </v-toolbar>
                                    </template>
                                    <template v-slot:expanded-item="{ headers, item }">
                                        <td :colspan="headers.length">
                                            <v-row>
                                                <v-col class="pa-2 text-left">
                                                    <span class="display-1 font-weight-light" v-text="formatDateTime(item.slots[range[0]].fromTime) + ' - ' + formatDateTime(item.slots[range[1]].toTime)"></span>
                                                    <br />
                                                    <v-divider></v-divider>
                                                    <br />
                                                    <v-range-slider v-model="range" :max="95" :min="0" step="1" hide-details class="align-center" ticks="always" tick-size="4">
                                                        <template v-slot:prepend>
                                                            <span class="overline"  v-text="formatDate(item.slots[0].fromTime) + ' - ' + formatTime(item.slots[0].fromTime)"></span>
                                                        </template>
                                                        <template v-slot:append>
                                                            <span class="overline"  v-text="formatDate(item.slots[95].fromTime) + ' - ' + formatTime(item.slots[95].toTime)"></span>
                                                        </template>
                                                    </v-range-slider>
                                                </v-col>
                                            </v-row>
                                        </td>
                                    </template>
                                </v-data-table>
                            </template>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
// @ is an alias to /src
import $ from "jquery";
import {
    apiUrl
} from "../assets/globals";
import moment from "moment";

export default {
    name: "Event",
    props: ["groupId", "eventId"],
    data: () => ({
        range: [0, 95],
        date: null,
        expanded: [],
        singleExpand: true,
        title: null,
        timeFrames: null,
        timeFramesTable: [],
        headers: [{
                text: 'Date from',
                align: 'start',
                sortable: false,
                value: 'datefrom',
            },
            {
                text: 'Date to',
                value: 'dateto'
            },
            {
                text: 'Time from',
                value: 'timefrom'
            },
            {
                text: 'Time to',
                value: 'timeto'
            },
            {
                text: '',
                value: 'data-table-expand'
            },
        ],
    }),
    components: {},
    methods: {
        formatDate(ISOTime) {
            return moment(ISOTime).format("dd, DD.MM.YYYY");
        },
        formatDateTime(ISOTime) {
            return moment(ISOTime).format("DD.MM.YY HH:mm");
        },
        formatTime(ISOTime) {
            return moment(ISOTime).format("HH:mm");
        }
    },
    created() {
        $.get(
            apiUrl + "/api/v1/group/" + this.groupId + "/events/" + this.eventId
        ).done(res => {
            this.title = res.name;
            this.timeFrames = res.timeFrames;
            this.timeFrames.forEach(element => {
                this.timeFramesTable.push({
                    "id": element.id,
                    "fromDateTime": element.fromTime,
                    "toDateTime": element.toTime,
                    "slots": element.slots,
                    "datefrom": this.formatDate(element.fromTime),
                    "dateto": this.formatDate(element.toTime),
                    "timefrom": this.formatTime(element.fromTime),
                    "timeto": this.formatTime(element.toTime)
                });
            });
        });
    }
};
</script>
