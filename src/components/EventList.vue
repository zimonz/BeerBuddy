<template>
  <v-container fluid>
    <v-list three-line subheader>
      <template v-for="item in events" reactive>
        <v-dialog :key="item.id" v-model="detailViewDialog" width="800">
          <template v-slot:activator="{ on }">
            <v-list-item :key="item.id" @click="dummy" v-on="on">
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
          </template>
          <v-card flat tile>
            <v-card-title class="headline grey lighten-2" primary-title>{{item.title}}</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <!-- Timeslot selection -->
              
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" text @click="detailViewDialog = false">Schliessen</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
    dummy: function() {
      // console.log('list clicked');
      return 0;
    }
  },
  created() {
    if (this.groupId) {
      this.group = this.groupId;
    }
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
  }
};
</script>
