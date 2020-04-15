<template>
  <v-container fluid>
    <template>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-row justify="center">
          <v-col lg="12" md="12" sm="12">
            <v-card class="pa-4" tile>
              <v-text-field v-model="groupname" name="groupname" label="Group Name" reactive></v-text-field>
              <v-text-field v-model="description" name="description" label="Group Description" reactive></v-text-field>
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
import {apiUrl} from '../assets/globals';

export default {
  data: () => ({
    groupname: "",
    description: "",
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
          let admin = this.userId();
          let nonAdmin = this.participants;
          nonAdmin.shift();
          let formData = JSON.stringify( { 'admins': [ admin ],'description': this.description, 'name': this.groupname, 'participants': nonAdmin } );
          
          $.ajax({
            type: "POST",
            url: apiUrl + "/api/v1/group",
            data: formData,
            success: () => { 
                      $.get( apiUrl + "/api/v1/group")
                        .done(res => { console.log(res)});
                      this.$refs.form.reset();
                    },
            dataType: "text",
            contentType : "application/json"
        });
        return 0;
      }
    }
  },
  created() {
    $.get( apiUrl + "/api/v1/user")
                    .done(response => {
                        this.allUsers = response;
                        this.allUsers = this.allUsers.filter((usr) => {
                          return usr.id != this.userId();
                        });
                        console.log(this.allUsers);
                    })
                    .always( this.isUpdating = false );
  }
};
</script>
