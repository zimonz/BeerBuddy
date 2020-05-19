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
        <v-col cols="12">
            <v-card flat>
                <v-card-title class="headline" primary-title>

                    {{this.title}}
                    <v-spacer></v-spacer>
                    <v-btn v-if="!settlement" color="red lighten-2 white--text" @click="genSettlement">Generate settlement</v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-0">
                    <v-row justify="center">
                        <v-col v-if="!selectedTimeFrame" cols="12" sm="12" md="8" lg="10">
                            <template>
                                <v-data-table :headers="headers" :items="timeFramesTable" :single-expand="singleExpand" :expanded.sync="expanded" item-key="id" @click:row="expandRow" class="elevation-1">
                                    <template v-slot:top>
                                        <v-toolbar flat>
                                            <v-toolbar-title>Timeframes</v-toolbar-title>
                                        </v-toolbar>
                                    </template>
                                    <template v-slot:expanded-item="{ headers, item }">
                                        <TimeFrame v-bind:headers="headers" v-bind:item="item" v-bind:groupId="groupId" v-bind:eventId="eventId" />
                                    </template>
                                </v-data-table>
                            </template>
                        </v-col>
                        <v-col cols="12" sm="12" md="8" lg="10">
                            <TimeframeRanking v-bind:title="title" v-bind:groupId="groupId" v-bind:eventId="eventId" v-bind:selectedTimeFrame="this.selectedTimeFrame" />
                        </v-col>
                        <v-col cols="12" sm="12" md="8" lg="10">
                            <v-divider></v-divider>
                        </v-col>
                        <v-col cols="12" sm="12" md="8" lg="10">
                            <SettlementList v-if="settlement" v-bind:settlementEntries="settlement" reactive />
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="4">
                            <ExpensesForm v-if="!settlement" v-bind:groupId="groupId" v-bind:eventId="eventId" />
                        </v-col>
                        <v-col cols="12" sm="12" md="8" lg="10">
                            <v-divider></v-divider>
                        </v-col>
                        <v-col cols="12" sm="12" md="8" lg="10">
                            <ExpensesList v-bind:groupId="groupId" v-bind:eventId="eventId" />
                        </v-col>
                    </v-row>
                </v-card-text>
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
import moment from "moment";

import TimeFrame from "../components/Timeframe";
import TimeframeRanking from "../components/TimeframeRanking";
import ExpensesForm from "../components/ExpensesForm";
import ExpensesList from "../components/ExpensesList";
import SettlementList from "../components/SettlementList";

export default {
    name: "Event",
    props: ["groupId", "eventId"],
    data: () => ({
        groupName: null,
        expanded: [],
        settlement: null,
        singleExpand: true,
        selectedTimeFrame: null,
        title: null,
        timeFrames: null,
        timeFramesTable: [],
        headers: [{
                text: "Date from",
                align: "start",
                sortable: false,
                value: "datefrom"
            },
            {
                text: "Date to",
                value: "dateto"
            },
            {
                text: "Time from",
                value: "timefrom"
            },
            {
                text: "Time to",
                value: "timeto"
            },
            {
                text: "",
                value: "data-table-expand"
            }
        ]
    }),
    components: {
        TimeFrame,
        TimeframeRanking,
        ExpensesForm,
        ExpensesList,
        SettlementList
    },
    methods: {
        pullData() {
            $.get(
                apiUrl + "/api/v1/group/" + this.groupId + "/events/" + this.eventId
            ).done(res => {
                if (res.settlement) this.settlement = res.settlement.settlementEntries;
                this.title = res.name;
                this.timeFrames = res.timeFrames;
                this.selectedTimeFrame = res.selectedTimeFrame;
                this.timeFrames.forEach(element => {
                    this.timeFramesTable.push({
                        id: element.id,
                        fromDateTime: element.fromTime,
                        toDateTime: element.toTime,
                        slots: element.slots,
                        datefrom: this.formatDate(element.fromTime),
                        dateto: this.formatDate(element.toTime),
                        timefrom: this.formatTime(element.fromTime),
                        timeto: this.formatTime(element.toTime)
                    });
                });
            });
            $.get(apiUrl + "/api/v1/group/" + this.groupId).done(res => {
                this.groupName = res.name
            });
        },
        formatDate(ISOTime) {
            return moment(ISOTime).format("dd, DD.MM.YYYY");
        },
        formatDateTime(ISOTime) {
            return moment(ISOTime).format("DD.MM.YY HH:mm");
        },
        formatTime(ISOTime) {
            return moment(ISOTime).format("HH:mm");
        },
        expandRow(r) {
            if ($.inArray(r, this.expanded) == -1) {
                this.expanded = [r];
            } else {
                this.expanded = [];
            }
            return 0;
        },
        genSettlement() {
            $.post(
                apiUrl +
                "/api/v1/group/" +
                this.groupId +
                "/events/" +
                this.eventId +
                "/expenses/settlement"
            ).done(this.pullData());
        }
    },
    created() {
        this.pullData();
         this.eventHub.$on('updateEvent', () => {
            this.pullData();
        });
    }
};
</script>
