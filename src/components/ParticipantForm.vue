<template>
  <v-container fluid>
    <template>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-row justify="center">
          <v-col lg="12" md="12" sm="12">
            <v-card class="pa-4" tile>
                <span class="headline">New participant</span>
              <v-text-field v-model="email" :rules="emailRules" name="email" label="E-Mail" reactive required></v-text-field> 
              <v-text-field v-model="favoriteBeverages" name="favoriteBeverages" label="Favorite beverages" reactive required></v-text-field> 
              <v-text-field v-model="name" name="name" label="Your name" reactive required></v-text-field> 
              <v-text-field v-model="surname" name="name" label="Your surname" reactive required></v-text-field> 
              <v-btn @click="submit" color="green darken-3" :disabled="!valid" dark>Create User</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-form>
    </template>
  </v-container>
</template>

<script>
import $ from 'jquery'
import {apiUrl} from '../assets/globals';
import { v1 as uuidv1 } from 'uuid';

export default {
  data: () => ({
    email: null,
    emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    favoriteBeverages: null,
    name: null,
    surname: null,
    valid: true
  }),
  computed: {
    getAllUsers() {
      return this.participants;
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
          $.post(apiUrl + '/api/v1/user', 
            {
                "email": this.email,
                "favoriteBeverages": this.favoriteBeverages,
                "id": uuidv1(),
                "name": this.name,
                "priority": 0,
                "surname": this.surname
            })
            .done(() => {
              this.$refs.form.reset();
            });
      }
    }
  }
};
</script>
