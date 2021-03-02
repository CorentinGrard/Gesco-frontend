<template>
    <v-container>
        <v-card>
            <v-card-title> Assistant pédagogique </v-card-title>
            <v-list nav dense>
                <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        link
                        :to="item.link"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            items: [
                {
                    title: "Création de cours",
                    icon: "mdi-school",
                    link: { name: "CreationCours" },
                },
                {
                    title: "Gestion des absences",
                    icon: "mdi-account-off",
                },
                {
                    title: "Gestion des notes",
                    icon: "mdi-file-table",
                }
            ],
        }),
    };
</script>

<style>
</style>