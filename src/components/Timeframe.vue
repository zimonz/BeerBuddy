<template>
<td :colspan="headers.length">
    <v-row>
        <v-col class="pa-2 text-left">
            <v-form>
                <br />
                <span class="d-block text-center display-1 font-weight-light mt-2" v-text="formatDateTime(item.slots[range[0]].fromTime) + ' - ' + formatDateTime(item.slots[range[1]].toTime)"></span>
                <v-divider></v-divider>
                <br />
                <v-range-slider :thumb-size="46" thumb-label="always" v-model="range" :max="item.slots.length-1" :min="0" step="1" @change="() => {btnIcon = 'mdi-circle-edit-outline'; btnLabel = 'Save changes'}" class="align-center" ticks="always" tick-size="4">
                    <template v-slot:thumb-label="{ value }">
                        <span class="d-block ml-2">{{ returnSelection( item.slots[value] ) }}</span>
                    </template>
                </v-range-slider>
                <br />
                <v-spacer></v-spacer>
                <v-btn depressed small class="white--text" :loading="loading" :disabled="loading" :color="btnColor" @click="submit">
                    {{ btnLabel }}
                    <v-icon right>
                        {{ btnIcon }}
                    </v-icon>
                </v-btn>
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
        loader: null,
        loading: false,
        btnColor: 'primary',
        btnLabel: 'Submit',
        btnIcon: 'mdi-circle-edit-outline'
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
            return this.formatTime(i.fromTime) + " " + this.formatTime(i.toTime);
        },
        submit() {
            this.loader = 'loading';
            var formData = JSON.stringify({
                endSlotId: this.item.slots[this.range[1]].id,
                startSlotId: this.item.slots[this.range[0]].id,
                timeframeId: this.timeframeId,
                participantId: this.userId()
            });
            
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: apiUrl +
                    "/api/v1/group/" +
                    this.groupId +
                    "/events/" +
                    this.eventId +
                    "/timeframe/" +
                    this.item.id,
                data: formData,
                success: () => {
                    this.loading = false;
                    this.loader = null;
                    this.btnColor = 'green darken-2';
                    this.btnLabel = 'Changes saved';
                    this.btnIcon = 'mdi-check-circle';
                    this.eventHub.$emit('updateTimeframeRanking');
                }
            });

        },
        getArrayIndexForKey(arr, key, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][key] == val) return i;
            }
            return -1;
        },
        setRange() {
            $.get(
                apiUrl +
                "/api/v1/group/" +
                this.groupId +
                "/events/" +
                this.eventId +
                "/timeframe"
            ).done(res => {
                var tf, slots;
                tf = $.grep(res, n => {
                    return n.id == this.item.id;
                })[0];
                slots = $.grep(tf.slots, n => {
                    var interests = null;
                    if (n.interests.length > 0)
                        interests = $.grep(n.interests, x => {
                            return x.id == this.userId();
                        })[0];

                    return interests && interests.id == this.userId();
                });
                if (slots[0]) {
                    var startIndex = this.getArrayIndexForKey(tf.slots, "id", slots[0].id);
                    var endIndex = this.getArrayIndexForKey(
                        tf.slots,
                        "id",
                        slots[slots.length - 1].id
                    );
                    this.range = [startIndex, endIndex];
                } else {
                    this.range = [0, 1];
                }
            });
        }
    },
    watch: {
        loader() {
            const l = this.loader;
            this[l] = !this[l];

            setTimeout(() => (this[l] = false), 3000);

            this.loader = null;
        },
        item() {
            this.setRange();
        }
    },
    created() {
        this.setRange();
    }
};
</script>

<style scoped>
td {
    overflow: hidden;
}
</style>
