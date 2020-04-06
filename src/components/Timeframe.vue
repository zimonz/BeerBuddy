<template>
<td :colspan="headers.length">
    <v-row>
        <v-col class="pa-2 text-left">
            <v-form>
                <br />
                <v-spacer></v-spacer>
                <v-autocomplete v-model="participant" :disabled="isUpdating" :items="allUsers" item-text="name" item-value="id" label="Participants" dense reactive :search-input.sync="searchInput" @change="searchInput=''"></v-autocomplete>
                <br />
                <span class="d-block text-center display-1 font-weight-light mt-2" v-text="formatDateTime(item.slots[range[0]].fromTime) + ' - ' + formatDateTime(item.slots[range[1]].toTime)"></span>
                <v-divider></v-divider>
                <br />
                <v-range-slider :thumb-size="46" thumb-label="always" v-model="range" :max="item.slots.length-1" :min="0" step="1" hide-details class="align-center" ticks="always" tick-size="4">
                    <template v-slot:thumb-label="{ value }">
                        <span class="d-block ml-2"> {{ returnSelection( item.slots[value] ) }} </span>
                    </template>
                </v-range-slider>
                <br />
                <v-spacer></v-spacer>
                <v-btn depressed small color="primary" @click="submit">Submit</v-btn>
            </v-form>
        </v-col>
    </v-row>
</td>
</template>

<script>
import $ from "jquery";
import {
    apiUrl
} from "../assets/globals";
import moment from "moment";

export default {
    name: "TimeFrame",
    props: ["headers", "item", "groupId", "eventId"],
    data: () => ({
        searchInput: "",
        range: [0, 1],
        participant: null,
        allUsers: null
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
        },
        returnSelection(i) {
            return this.formatTime(i.fromTime) + ' ' + this.formatTime(i.toTime);
        },
        submit() {
            console.log(this.item.slots[this.range[0]]);
            console.log('RANGE_TO: ' + this.item.slots[this.range[1]]);
            console.log('UserId: ' + this.participant);

            var formData = JSON.stringify( {
                "endSlotId": this.item.slots[this.range[1]].id,
                "startSlotId": this.item.slots[this.range[0]].id,
                "timeframeId": this.timeframeId,
                "userId": this.participant
            } );
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: apiUrl + "/api/v1/group/" + this.groupId + "/events/" + this.eventId + "/timeframe/" + this.item.id,
                data: formData,
                success: (res) => {
                    console.log(res);
                }
            });
        }
    },
    created() {
        $.get(apiUrl + "/api/v1/user")
            .done(response => {
                this.allUsers = response;
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
