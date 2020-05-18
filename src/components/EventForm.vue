<template>
<v-form v-model="valid" ref="form" lazy-validation>
    <v-container>

        <v-row justify="center">

            <v-col>
                <v-card flat>
                    <v-text-field v-model="eventname" name="eventname" label="Event Name" reactive></v-text-field>
                    <v-card-title primary-title>
                        Timeframes
                    </v-card-title>
                    <v-list three-line subheader>
                        <template v-for="timeframe in timeframes">
                            <v-list-item :key="timeframe.id">
                                <v-list-item-content>
                                    <v-list-item-title v-text="timeframe.date">
                                    </v-list-item-title>
                                    <v-list-item-subtitle v-if="!timeframe.wholeDay" v-text="timeframe.timeFrom + ' - ' + timeframe.timeTo"></v-list-item-subtitle>
                                    <v-list-item-subtitle v-if="timeframe.wholeDay" v-text="'Whole day'"></v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn @click="removeTimeFrame(timeframe)" icon>
                                        <v-icon color="grey lighten-1">mdi-delete</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-card>

                <v-card flat>
                    <v-card-actions>
                        <v-btn small color="secondary" @click="timeframeFormVisible = !timeframeFormVisible">
                            <v-icon>mdi-plus</v-icon>
                            add timeframe
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                    <v-expand-transition>
                        <v-card flat v-show="timeframeFormVisible">
                            <v-dialog ref="date" v-model="modalDate" :reactive="true" :return-value.sync="date" persistent width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="date" label="Date" prepend-icon="mdi-calendar-range" :rules="dateRule" readonly required v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-if="modalDate" v-model="date" full-width>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modalDate = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.date.save(date)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>

                            <v-checkbox label="Whole day" v-model="wholeDay">
                            </v-checkbox>

                            <v-dialog v-if="!wholeDay" ref="timeFrom" v-model="modal1" :reactive="true" :return-value.sync="timeFrom" persistent width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="timeFrom" label="From" prepend-icon="mdi-clock" :rules="timeFromRule" readonly required v-on="on"></v-text-field>
                                </template>
                                <v-time-picker v-if="modal1" format="24hr" v-model="timeFrom" full-width>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal1 = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.timeFrom.save(timeFrom)">OK</v-btn>
                                </v-time-picker>
                            </v-dialog>

                            <v-dialog v-if="!wholeDay" ref="timeTo" v-model="modal2" :reactive="true" :return-value.sync="timeTo" persistent width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="timeTo" label="To" prepend-icon="mdi-clock" :rules="timeToRule" readonly required v-on="on"></v-text-field>
                                </template>
                                <v-time-picker v-if="modal2" format="24hr" v-model="timeTo" full-width>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.timeTo.save(timeTo)">OK</v-btn>
                                </v-time-picker>
                            </v-dialog>

                            <v-btn @click="addTimeframe" class="green darken-3 addTimeFrameBtn" :disabled="!valid" dark>
                                add
                            </v-btn>
                        </v-card>
                    </v-expand-transition>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-btn @click="submit" class="green darken-3" dark>
                submit
            </v-btn>
        </v-row>
    </v-container>
</v-form>
</template>

<script>
// import axios from "axios";
import $ from 'jquery'
import {
    apiUrl
} from '../assets/globals';

export default {
    props: ['groupId'],
    data: () => ({
        eventname: '',
        timeframes: [],
        timeframeFormVisible: false,
        valid: true,
        menu: false,
        dateRules: '',
        modal1: false,
        modal2: false,
        modalDate: false,
        date: null,
        dateRule: [v => !!v || 'Date is required'],
        timeFrom: null,
        timeFromRule: [v => !!v || 'Time is required or select "Whole Day"'],
        timeTo: null,
        timeToRule: [v => !!v || 'Time is required or select "Whole Day"'],
        wholeDay: false,
        select: null,
    }),

    methods: {
        addTimeframe() {
            if (this.$refs.form.validate()) {
                this.timeframes.push({
                    date: this.date,
                    timeFrom: this.timeFrom,
                    timeTo: this.timeTo,
                    wholeDay: this.wholeDay
                });
                this.date = null;
                this.timeFrom = null;
                this.timeTo = null;
                this.wholeDay = false;
                this.timeframeFormVisible = false;
            }
        },
        removeTimeFrame(sender) {
            var index = this.timeframes.indexOf(sender);
            if (index !== -1) this.timeframes.splice(index, 1);
        },
        submit() {
            $.ajax({
                type: "POST",
                url: apiUrl + "/api/v1/group/" + this.groupId + "/events/",
                data: this.eventname,
                contentType: "application/json; charset=utf-8",
                success: (data) => {
                    let timeframes = [];
                    this.timeframes.forEach((item) => {
                        if (item.wholeDay) {
                            timeframes.push({
                                from: new Date(Date.parse(item.date + 'T00:00:00')),
                                to: new Date(Date.parse(item.date + 'T23:59:59'))
                            });
                        } else {
                            timeframes.push({
                                from: new Date(Date.parse(item.date + 'T' + item.timeFrom)),
                                to: new Date(Date.parse(item.date + 'T' + item.timeTo))
                            });
                        }
                    });
                    let formData = JSON.stringify(timeframes);
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: apiUrl + "/api/v1/group/" + this.groupId + "/events/" + data.id + "/timeframe",
                        data: formData,
                        success: () => {
                            this.eventHub.$emit('updateEvents');
                            this.eventname = '';
                            this.timeframes = [];
                        }
                    });
                }
            });
            return 0;
        }
    }
};
</script>

<style scoped>
button.green.darken-3.addTimeFrameBtn.v-btn.v-btn--contained.v-btn--disabled.theme--dark.v-size--default {
    background-color: #2E7D32 !important;
}
</style>
