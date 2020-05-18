<template>
<v-container fluid>
    <v-row justify="center">
        <v-col>
            <v-form v-model="valid" ref="form" :lazy-validation="true">
                <v-card-title class="headline" primary-title>
                    Add expenses
                </v-card-title>
                <v-text-field :rules="amountRules" v-model="amount" name="amount" label="Amount in CHF" required reactive></v-text-field>
                <v-text-field v-model="note" name="description" label="Note" reactive></v-text-field>
                <v-autocomplete :rules="[v => !!v || 'Field is required!']" v-model="paidBy" :items="groupMembers" item-text="name" item-value="id" label="Paid by" dense chips small-chips deletable-chips reactive required :search-input.sync="searchInput" @change="searchInput=''"></v-autocomplete>
                <v-autocomplete :rules="[v => !!v || 'Field is required!']" v-model="usedBy" :items="groupMembers" item-text="name" item-value="id" label="Used by" dense chips multiple small-chips deletable-chips reactive required :search-input.sync="searchInput" @change="searchInput=''"></v-autocomplete>

                <v-card-actions>
                    <v-btn @click="submit" :disabled="!valid" class="green darken-3" dark>
                        {{ submitText }}
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import $ from 'jquery'
import {
    apiUrl
} from '../assets/globals';

export default {
    props: ['groupId', 'eventId'],
    data: () => ({
        amount: '',
        amountRules: [
            v => /^-?\d*\.?\d*$/.test(v) || 'Amount must be numeric',
            v => !!v || 'Field is required!',
        ],
        note: '',
        paidBy: '',
        usedBy: [],
        groupMembers: [],
        searchInput: '',
        valid: true,
        submitText: 'Submit'
    }),
    methods: {
        getGroupMembers() {
            $.get(apiUrl + "/api/v1/group/" + this.groupId).done(
                res => {
                    res.assignments.forEach(assignment => {
                        this.groupMembers.push(assignment.participant);
                    });
                });
        },
        submit() {
            if (this.$refs.form.validate()) {
                let formData = JSON.stringify({
                    'amount': this.amount,
                    'note': this.note,
                    'payedByParticipantId': this.paidBy,
                    'usedByParticipantIds': this.usedBy
                });

                $.ajax({
                    type: "POST",
                    url: apiUrl + "/api/v1/group/" + this.groupId + "/events/" + this.eventId + "/expenses",
                    data: formData,
                    success: () => {
                        this.$refs.form.reset();
                        this.submitText = 'Expense added';
                        setTimeout(() => {
                            this.submitText = 'Submit'
                        }, 5000);
                        this.eventHub.$emit('updateExpenses')
                    },
                    dataType: "text",
                    contentType: "application/json"
                });
                return 0;
            }
        }
    },
    created() {
        this.getGroupMembers();
    }
};
</script>

<style scoped>
button.green.darken-3.addTimeFrameBtn.v-btn.v-btn--contained.v-btn--disabled.theme--dark.v-size--default {
    background-color: #2E7D32 !important;
}
</style>
