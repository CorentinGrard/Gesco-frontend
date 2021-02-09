import Vue from 'vue';

export default async function () {
    await Vue.$keycloak.updateToken(70);
    return Vue.$keycloak.token;
}