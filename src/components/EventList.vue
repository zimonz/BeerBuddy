<template>
<v-container fluid>
    <v-list three-line subheader>
        <template v-for="item in items">
            <v-list-item :key="item.title" @click="dummy">

                <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.group"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="item.date[0] + ' ' + item.date[1]"></v-list-item-subtitle>
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
    data: () => ({
        items: [{
                title: 'Fyrabigbier',
                group: 'BIA12b',
                date: ['2020-01-12', '2020-01-16']
            }, {
                title: 'Suufe nach de Prüefige',
                group: 'IT18ta_ZH',
                date: ['2020-03-15', '2020-03-20']
            },
        ]
    }),
    methods: {
        dummy: function () {
            console.log('list clicked');
        }
    }
}
</script>
