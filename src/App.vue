<template>
<v-app>
    <v-card class="overflow-hidden" tile>
        <v-app-bar height="48" class="blue-grey darken-3" dark dense>
            <v-toolbar-title class="mr-4">BeerBuddy</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-for="route in routesDrawer" :key="route.routeto" :to="route.routeto" small text>
                {{ route.title }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-tooltip v-if="retUsermail()" bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-for="route in routesBar" :key="route.routeto" :to="route.routeto" v-on="on" icon>
                    <v-icon>{{ route.icon }}</v-icon>
                    </v-btn>
                </template>
                <span>{{ retUsermail() }}</span>
            </v-tooltip>
            <v-btn v-if="userId()" @click="logout" icon><v-icon>mdi-logout</v-icon></v-btn>
        </v-app-bar>
    </v-card>

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
            'routeto': '/groups',
            'icon': 'mdi-account-group',
            'title': 'Your groups'
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
        },
        retUsermail() {
            return this.userEmail();
        },
        logout() {
            localStorage.removeItem('user');
            this.$router.go('/');
        }
    },
    mounted() {
        // this.pullData();
        // setInterval(this.pullData, 5000);
    }
};
</script>

<style>
html {
    overflow-y: auto;
}
</style>
