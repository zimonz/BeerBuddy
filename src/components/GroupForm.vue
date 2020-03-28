<template>
  <v-container fluid>
    <template>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-row justify="center">
          <v-col lg="12" md="12" sm="12">
            <v-card class="pa-4" tile>
              <v-text-field v-model="groupname" name="groupname" label="Group Name" reactive></v-text-field>
              <v-autocomplete
                v-model="participants"
                :disabled="isUpdating"
                :items="allUsers"
                item-text="name"
                item-value="id"
                label="Participants"
                dense
                multiple
                chips
                small-chips
                deletable-chips
                reactive
                :search-input.sync="searchInput"
                @change="searchInput=''"
              ></v-autocomplete>

              <v-btn @click="submit" color="green darken-3" :disabled="!valid" dark>Create group</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-form>
    </template>
  </v-container>
</template>

<script>
import $ from 'jquery'
import moment from "moment";

export default {
  data: () => ({
    groupname: "",
    participants: [],
    allUsers: [],
    isUpdating: true,
    searchInput: "",
    valid: true
  }),
  computed: {
    getAllUsers() {
      return this.participants;
    },
    today() {
      return moment(new Date()).format("YYYY-MM-DD");
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        return 0;
      }
    }
  },
  created() {
    $.get( "http://192.168.0.157:8080/api/v1/user")
                    .done(response => {
                        this.allUsers = response;
                    })
                    .always( this.isUpdating = false );
  }
};
</script>
