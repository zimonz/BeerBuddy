<template>
<v-app>
    <v-card class="overflow-hidden" tile>
        <v-app-bar height="48" class="blue-grey darken-3" dark dense>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

            <v-toolbar-title>BeerBuddy</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-for="route in routesBar" :key="route.routeto" :to="route.routeto" icon>
                <v-icon>{{ route.icon }}</v-icon>
            </v-btn>
        </v-app-bar>
    </v-card>

    <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
            <v-list-item-group active-class="deep-purple--text text--accent-4">
                <v-list-item v-for="route in routesDrawer" :key="route.routeto" :to="route.routeto">
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
import $ from 'jquery';
import {
    apiUrl
} from "./assets/globals";

export default {
    name: 'App',
    data: () => ({
        drawer: false,
        routesDrawer: [{
            'routeto': '/',
            'icon': 'mdi-home',
            'title': 'Dashboard'
        }, {
            'routeto': '/groups',
            'icon': 'mdi-account-group',
            'title': 'Your groups'
        }, {
            'routeto': '/debts',
            'icon': 'mdi-cash-refund',
            'title': 'Debts'
        }],
        routesBar: [{
            'routeto': '/participant',
            'icon': 'mdi-account',
            'title': 'Account'
        }],
        appMap: new Map()
    }),
    methods: {
        pullData() {
            $.get(apiUrl + "/api/v1/group").done(allGroups => {
                allGroups.forEach(group => {
                    if (this.appMap.get(group.id) == null) {
                        group.events = new Map();
                        this.appMap.set(group.id, group);
                        this.appMapToStorage();
                    }
                    $.get(apiUrl + "/api/v1/group/" + group.id + '/events/').done(allEvents => {
                        allEvents.forEach(event => {
                            if (this.appMap.get(group.id).events.get(event.id) == null) {
                                this.appMap.get(group.id).events.set(event.id, event);
                                this.appMapToStorage();
                            }
                        });
                    });

                });
            });
        },
        appMapToStorage() {
            localStorage.setItem('BeerBuddyMap', JSON.stringify(Array.from(this.appMap.entries())));
        },
        storageToAppMap() {
            this.appMap = new Map(JSON.parse(localStorage.BeerBuddyMap));
        }
    },
    mounted() {
        this.pullData();
        setInterval(this.pullData, 5000);
    }
};
</script>

<style>
html {
    overflow-y: auto;
}
</style>
