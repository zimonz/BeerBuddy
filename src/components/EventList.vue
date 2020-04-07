<template>
  <v-container fluid>
    <v-list three-line subheader>
      <template v-for="item in events" reactive>
          <div :key="item.id">
            <v-list-item @click="dummy" :to="{ name: 'eventPage', params: { groupId: group, eventId: item.id} }">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle>
                  <template>
                    <v-chip-group column>
                      <v-chip
                        v-for="timeFrame in item.timeFrames"
                        :key="timeFrame.id"
                        :value="timeFrame.fromTime + ' ' + timeFrame.toTime"
                        color="primary"
                        small
                      >{{ formatDateTime(timeFrame.fromTime) }} - {{ formatDateTime(timeFrame.toTime) }}</v-chip>
                    </v-chip-group>
                  </template>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
      </template>
    </v-list>
  </v-container>
</template>


<script>
import $ from "jquery";
import moment from "moment";
import { apiUrl } from "../assets/globals";

export default {
  props: ["groupId"],
  data: () => ({
    events: [],
    group: null,
    detailViewDialog: false
  }),
  methods: {
    formatDateTime(ISOTime) {
      return moment(ISOTime).format("DD-MM-YY HH:mm");
    },
    getEventsByGroupId() {
      $.get(apiUrl + "/api/v1/group/" + this.group + "/events/").done(
        response => {
          response.forEach(item => {
            $.get(
              apiUrl + "/api/v1/group/" + this.group + "/events/" + item.id
            ).done(res => {
              this.events.push({
                id: item.id,
                title: item.name,
                timeFrames: res.timeFrames
              });
            });
          });
        }
      );
    },
    dummy: function() {
      // console.log('list clicked');
      return 0;
    }
  },
  created() {
    if (this.groupId) {
      this.group = this.groupId;
    }
    this.getEventsByGroupId();
  }
};
</script>
