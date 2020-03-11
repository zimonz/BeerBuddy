<template>
<v-container fluid>
    <v-list three-line subheader>
        <template v-for="item in items">
            <v-list-item :key="item.title" @click="dummy">

                <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                    <v-list-item-subtitle>
                        <v-chip-group>
                            <v-chip v-for="participant in item.participants" :key="participant" :value="participant" color="secondary" small> {{ participant }} </v-chip>
                        </v-chip-group>
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
export default {
    data: () => ({
        items: [{
                title: 'IT18ta_ZH',
                subtitle: 'Jan 9, 2014',
                participants: ['Daniel', 'Max', 'Hans']
            },
            {
                title: 'AP12b',
                subtitle: 'Jan 17, 2014',
                participants: ['Daniel', 'Max', 'Hans', 'Michi', 'Johnny', 'Karl', 'Andy', 'Rouven']
            },
            {
                title: 'Gruppe XYZ',
                subtitle: 'Jan 28, 2014',
                participants: ['Daniel', 'Max', 'Hans']
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
