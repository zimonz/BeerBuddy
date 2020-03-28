<template>
<v-form v-model="valid" ref="form" lazy-validation>
    <v-container>
        <v-row justify="center">
            <v-col class="mr-2" cols="12" lg="5" md="6" sm="12">
                <v-date-picker label="Date" v-model="date" :landscape="false" :reactive="true" multiple full-width>
                </v-date-picker>
            </v-col>
            <v-col lg="6" md="6" sm="10">
                <v-combobox v-model="date" multiple chips small-chips label="Dates" prepend-icon="mdi-calendar" readonly></v-combobox>
                <v-checkbox label="Whole day" v-model="wholeDay">
                </v-checkbox>

                <v-dialog v-if="!wholeDay" ref="timeFrom" v-model="modal1" :reactive="true" :return-value.sync="timeFrom" persistent width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field v-model="timeFrom" label="From" prepend-icon="mdi-clock" :rules="timeFromRule" readonly required v-on="on"></v-text-field>
                    </template>
                    <v-time-picker v-if="modal1" format="24hr" v-model="timeFrom" full-width>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal1 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.timeFrom.save(timeFrom)">OK</v-btn>
                    </v-time-picker>
                </v-dialog>

                <v-dialog v-if="!wholeDay" ref="timeTo" v-model="modal2" :reactive="true" :return-value.sync="timeTo" persistent width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field v-model="timeTo" label="To" prepend-icon="mdi-clock" :rules="timeToRule" readonly required v-on="on"></v-text-field>
                    </template>
                    <v-time-picker v-if="modal2" format="24hr" v-model="timeTo" full-width>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.timeTo.save(timeTo)">OK</v-btn>
                    </v-time-picker>
                </v-dialog>
                <v-select label="Availability" v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" required></v-select>

                <v-btn @click="submit" class="green darken-3" :disabled="!valid" dark>
                    submit
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</v-form>
</template>

<script>
// import axios from "axios";

export default {
    data: () => ({
        valid: true,
        date: [],
        menu: false,
        dateRules: '',
        modal1: false,
        modal2: false,
        timeFrom: null,
        timeFromRule: [v => !!v || 'Time is required or select "Whole Day"'],
        timeTo: null,
        timeToRule: [v => !!v || 'Time is required or select "Whole Day"'],
        wholeDay: false,
        select: null,
        items: ["Absolutely not", "Probably not", "Maybe"]
    }),

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
                // console.log(this.$refs.form);
                return 0;
            }
        }
    }
};
</script>
