<template>
<v-container fluid>
    <v-card tile class="ma-2">
        <v-card-title class="display-1" primary-title>
            New User
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-form v-model="valid" ref="newUser" lazy-validation flat>
                <v-row justify="center">
                    <v-col lg="12" md="12" sm="12">
                        <v-text-field v-model="email" :rules="emailRules" name="email" label="E-Mail" reactive required></v-text-field>
                        <v-text-field v-model="favoriteBeverages" name="favoriteBeverages" label="Favorite beverages" reactive required></v-text-field>
                        <v-text-field v-model="name" name="name" label="Your name" reactive required></v-text-field>
                        <v-text-field v-model="surname" name="name" label="Your surname" reactive required></v-text-field>
                        <v-btn @click="submit" color="green darken-3" :disabled="!valid" dark>Create User</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
    <v-form v-model="valid" ref="existingUser" lazy-validation flat>
        <v-card class="ma-2">
            <v-card-title class="display-1" primary-title>
                Existing User
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-autocomplete v-model="user" :disabled="isUpdating" :items="allUsers" item-text="email" label="User" dense reactive return-object required></v-autocomplete>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed small color="primary" @click="submitExisting">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</v-container>
</template>

<script>
import $ from 'jquery'
import {
    apiUrl
} from '../assets/globals';
import {
    v1 as uuidv1
} from 'uuid';

export default {
    data: () => ({
        user: null,
        allUsers: null,
        isUpdating: true,
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
    created() {
        $.get(apiUrl + "/api/v1/user")
            .done(response => {
                this.allUsers = response;
            })
            .always(this.isUpdating = false);
    },
    methods: {
        submit() {
            if (this.$refs.newUser.validate()) {
                $.post(apiUrl + '/api/v1/user', {
                        "email": this.email,
                        "favoriteBeverages": this.favoriteBeverages,
                        "id": uuidv1(),
                        "name": this.name,
                        "priority": 0,
                        "surname": this.surname
                    })
                    .done(() => {
                        this.$refs.newUser.reset();
                    });
            }
        },
        submitExisting() {
            if (this.$refs.existingUser.validate()) 
            {
              localStorage.setItem('user', JSON.stringify(this.user));              
              this.$router.push('/');
            }
        }
    }
};
</script>
