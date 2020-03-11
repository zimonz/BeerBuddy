<template>
<v-container fluid>
    <v-row justify="center">
        <v-col lg="8" md="10" sm="10" xs="12">
            <v-card flat>
                <v-card-actions>
                    <v-btn small color="secondary" @click="formVisible = !formVisible">
                        <v-icon>mdi-account-multiple</v-icon>
                        New group
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
                <v-expand-transition>
                    <GroupForm v-show="formVisible" />
                </v-expand-transition>
            </v-card>
                <v-divider inset></v-divider>
        </v-col>
        <v-col lg="8" md="10" sm="10" xs="12">
            <v-card flat>
                <v-card-title primary-title>
                    Groups
                </v-card-title>
                <GroupList />
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import GroupForm from '../components/GroupForm'
import GroupList from '../components/GroupList'
export default {
    name: 'Groups',
    components: {
        GroupForm,
        GroupList
    },
    data: () => ({
        formVisible: false
    }),
}
</script>

<style>

</style>