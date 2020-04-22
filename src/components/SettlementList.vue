<template>
<v-container fluid>
    <v-list four-lines subheader>
        <v-subheader class="headline">Settlement</v-subheader>
        <template v-for="item in items">
            <v-list-item :key="item.id">
                <v-list-item-content>
                    <v-list-item-title v-text="Number( item.amount ).toFixed(2) + ' CHF'"></v-list-item-title>
                    <v-list-item-subtitle v-text="'From ' + item.fromParticipantName"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="'To ' + item.toParticipantName"></v-list-item-subtitle>
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
export default {
    props: ['settlementEntries'],
    data: () => ({
        items: []
    }),
    methods: {
    },
    created() {
        this.settlementEntries.forEach(settlement => {
                settlement.fromParticipantName = settlement.fromParticipant.name;
                settlement.toParticipantName = settlement.toParticipant.name;
                this.items.push(settlement);
            });
    }
};
</script>
