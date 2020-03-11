<template>
<v-container fluid>
    <template>
        <v-form v-model="valid" ref="form" lazy-validation>
            <v-row justify="center">
                <v-col lg="12" md="12" sm="12">
                    <v-card class="pa-4" tile>
                        <v-text-field
                            v-model="groupname"
                            name="groupname"
                            label="Group Name"   
                            reactive                         
                        ></v-text-field>                        
                        <v-combobox v-model="participants" :items="dummyData" label="Participants" dense multiple chips reactive></v-combobox>

                        <v-btn @click="submit" color="green darken-3" :disabled="!valid" dark>
                            Create group
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </v-form>
    </template>
</v-container>
</template>

<script>
// import axios from "axios";

export default {
    data: () => ({
        groupname: '',
        participants: [],
        valid: true
    }),
    computed: {
        dummyData() {
            return ['Max Müller', 'Daniel Meier'];
        }
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                // Native form submission is not yet supported
                /*axios.post("/api/submit", {
                    name: this.name,
                    email: this.email,
                    select: this.select,
                    checkbox: this.checkbox
                });*/
                console.log(this.groupname + ' ' + this.participants);
            }
        }
    }
};
</script>
