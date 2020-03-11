<template>
  <v-app>
    <v-card
      class="overflow-hidden"
      tile>
        <v-app-bar
          height="48"
          class="blue-grey darken-3"
          dark
          dense
        >
          <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

          <v-toolbar-title>BeerBuddy</v-toolbar-title>
        </v-app-bar>
      </v-card>

        <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
        >
          <v-list
            nav
            dense
          >
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
            >
              <v-list-item to="/">
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>

              <v-list-item to="/events">
                <v-list-item-icon>
                  <v-icon>mdi-calendar-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Events</v-list-item-title>
              </v-list-item>

              <v-list-item to="/debts">
                <v-list-item-icon>
                  <v-icon>mdi-cash-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Debt</v-list-item-title>
              </v-list-item>

              <v-list-item to="/account">
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Account</v-list-item-title>
              </v-list-item>

            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    drawer: false
  }),
};
</script>

<style>
  html {
    overflow-y: auto;
  }
</style>