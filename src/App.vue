<template>
<v-app>
    <v-card class="overflow-hidden" tile>
        <v-app-bar height="48" class="blue-grey darken-3" dark dense>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

            <v-toolbar-title>BeerBuddy</v-toolbar-title>
        </v-app-bar>
    </v-card>

    <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
            <v-list-item-group active-class="deep-purple--text text--accent-4">
                <v-list-item v-for="route in routes" :key="route.routeto" :to="route.routeto">
                    <v-list-item-icon>
                        <v-icon>{{ route.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ route.title }}</v-list-item-title>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>

    <v-content>
        <router-view />
    </v-content>
</v-app>
</template>

<script>
export default {
    name: 'App',
    data: () => ({
        drawer: false,
        routes: [{
            'routeto': '/',
            'icon': 'mdi-home',
            'title': 'Dashboard'
        }, {
            'routeto': '/groups',
            'icon': 'mdi-account-group',
            'title': 'Your groups'
        }, {
            'routeto': '/events',
            'icon': 'mdi-calendar-multiple',
            'title': 'Your events'
        }, {
            'routeto': '/debts',
            'icon': 'mdi-cash-refund',
            'title': 'Debts'
        }, {
            'routeto': '/account',
            'icon': 'mdi-account',
            'title': 'Account'
        }]
    }),
};
</script>

<style>
html {
    overflow-y: auto;
}
</style>
