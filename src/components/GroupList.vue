<template>
  <v-container fluid>
    <v-list three-line subheader>
      <template v-for="item in items">
        <v-list-item :key="item.id" :to="{ name: 'groupEvents', params: { groupId: item.id } }">
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
            <v-list-item-subtitle>
              <template>
                <v-chip-group :key="componentKey">
                  <v-chip
                    v-for="assignement in item.assignments"
                    :key="(assignement.participant.name, assignement.participant.id)"
                    :value="assignement.participant.id"
                    :color="chipColor(assignement)"
                    small
                  >
                    <v-icon v-if="!assignement.participant.name" class="rotate360">mdi-loading</v-icon>
                    <div v-else>{{ assignement.participant.name }}</div>
                  </v-chip>
                </v-chip-group>
              </template>
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
  </v-container>
</template>

<script>
import $ from "jquery";
import { apiUrl } from "../assets/globals";

export default {
  data: () => ({
    items: [],
    userMap: new Map(),
    componentKey: 0
  }),
  methods: {
    populateUI: function() {
      this.items.forEach(item => {
        item.assignments.sort((a,b) => { return b.admin - a.admin });
        item.assignments.forEach(assignement => {
          if (this.userMap.get(assignement.participant.id) == null)
            $.get(apiUrl + "/api/v1/user/" + assignement.participant.id).done(
              res => {
                assignement.participant.name = res.name;
                this.forceUpdate();
              }
            );
        });
      });
    },
    getGroups() {
      $.get(apiUrl + "/api/v1/group").done(response => {
        this.items = response;
        this.populateUI();
      });
    },
    forceUpdate() {
      this.componentKey += 1;
    },
    chipUsername: function(id) {
      let user = this.userMap.get(id);
      return user == null ? "<v-icon>mdi-account</v-icon>" : user;
    },
    chipColor(val) {
      if(val.admin) return 'primary';
      else return 'secondary';
    }
  },
  created() {
      this.getGroups();
      this.eventHub.$on('updateGroups', () => {
        this.getGroups();
      });
  }
};
</script>

<style scoped>
.rotate360 {
  -webkit-animation: spin 4s linear infinite;
  -moz-animation: spin 4s linear infinite;
  animation: spin 4s linear infinite;
}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>