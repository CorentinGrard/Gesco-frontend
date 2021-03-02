<template>
    <v-container>
        <v-card>
            <v-card-title> Bienvenue sur l'application Gesco ! </v-card-title>
            <v-card-text>
                <v-container>
                    Bienvenue {{ profile.prenom }} {{ profile.nom }}, vos rôles sont: {{myRoles()}}. Vous pouvez à présent
                    naviguer dans les différents menus à votre gauche.
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import {mapGetters, mapState} from "vuex";

    export default {
        name: "App",

        data: () => ({
        }),
        computed: {
            ...mapState({
                profile: (state) => state.user.profile,
            }),
            ...mapGetters({
                roles: "user/getRoles",
            }),
        },
        methods: {
            myRoles() {
                let myRoles = "";
                for (const name in this.roles) {
                    if(this.roles[name] == true) myRoles = myRoles + " " + name;
                }
                return myRoles;
            },
        }
    };
</script>