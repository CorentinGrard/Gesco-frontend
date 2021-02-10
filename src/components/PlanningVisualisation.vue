<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" @click="setToday"> Aujourd'hui </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <SelectPromo
            v-if="!$keycloak.hasRealmRole('student')"
            @updateSelectedPromotion="updateSelectedPromotion"
            class="mt-5"
          />
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Jour</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semaine</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mois</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet>
        <v-calendar
          ref="calendar"
          day-body
          v-model="focus"
          color="primary"
          :events="events"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="saveInterval"
          :first-interval="7"
          :interval-minutes="60"
          :interval-count="13"
          :weekdays="weekdays"
        >
          <template #event="{ event }">
            <h3>{{ event.matiere.nom }}</h3>
            <div>Description : {{ event.detail }}</div>
            <div>
              Salles :
              <ul>
                <li v-for="salle in event.sessionSalle" :key="salle.id">
                  {{ salle.nomSalle }}
                </li>
              </ul>
            </div>
            <div>Intervenants :</div>
            <div>
              {{ event.start.getHours() }}:{{ event.start.getMinutes() }} -
              {{ event.end.getHours() }}:{{ event.end.getMinutes() }}
            </div>
          </template>
        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar
              v-if="!$keycloak.hasRealmRole('student')"
              color="grey lighten-4"
            >
              <v-btn icon>
                <v-icon @click="editFormOpen = !editFormOpen"
                  >mdi-pencil</v-icon
                >
              </v-btn>
              <v-toolbar-title
                v-html="selectedSession.matiere.nom"
              ></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon @click="deleteSession()">mdi-delete</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span>{{ selectedSession.detail }}</span>
            </v-card-text>
            <v-card-text>
              Salles : [
              <span
                v-for="salle in selectedSession.sessionSalle"
                :key="salle.id"
                >{{ salle.nomSalle }};
              </span>
              ]
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Fermer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
    <EditSessionFormModal
      :editFormOpen="editFormOpen"
      @closeFormMessage="closeForm"
    />
  </v-row>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import SelectPromo from "@/components/SelectPromo";
import EditSessionFormModal from "../components/EditSessionFormModal";

export default {
  components: {
    SelectPromo,
    EditSessionFormModal,
  },
  data: () => ({
    selectedPromotion: 0,
    editFormOpen: false,
    focus: "",
    weekdays: [1, 2, 3, 4, 5],
    type: "week",
    typeToLabel: {
      month: "Mois",
      week: "Semaine",
      day: "Jour",
    },
    selectedElement: null,
    selectedOpen: false,
    start: "",
    end: "",
  }),
  computed: {
    ...mapGetters({
      events: "planning/getEventsForPlanning",
      getSessionById: "planning/getSessionById",
    }),
    ...mapState({
      selectedSession: (state) => state.planning.selectedSession,
    }),
  },
  watch: {
    selectedPromotion: function () {
      this.fetchSessions();
    },
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    deleteSession() {
      this.$store.dispatch("planning/deleteSessionBySelectedSession");
      this.selectedOpen = false;
    },
    closeForm() {
      this.editFormOpen = false;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.$store.commit(
          "planning/setSelectedSession",
          this.getSessionById(event.id)
        );
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    saveInterval({ start, end }) {
      this.start = this.getDateFromEvent(start);
      this.end = this.getDateFromEvent(end);
      this.fetchSessions();
    },
    getDateFromEvent(event) {
      Date.prototype.yyyymmdd = function () {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();

        return [
          this.getFullYear(),
          (mm > 9 ? "" : "0") + mm,
          (dd > 9 ? "" : "0") + dd,
        ].join("");
      };
      let date = new Date(event.date);
      return date.yyyymmdd();
    },
    fetchSessions() {
      if (this.start !== "" && this.end !== "") {
        if (this.$keycloak.hasRealmRole("student")) {
          this.$store.dispatch("planning/fetchSessions");
        } else {
          if (
            !(
              this.selectedPromotion &&
              Object.keys(this.selectedPromotion).length === 0 &&
              this.selectedPromotion.constructor === Object
            )
          ) {
            this.$store.dispatch("planning/fetchSessionsByIdPromotion", {
              id: this.selectedPromotion,
              start: this.start,
              end: this.end,
            });
          }
        }
      }
    },
    updateSelectedPromotion: function (selectedPromotion) {
      this.$store.dispatch("planning/clearSessions");
      this.selectedPromotion = selectedPromotion;
    },
  },
};
</script>
<style lang="css" scoped>
html {
  overflow-y: auto;
}

.v-event-draggable {
  padding-left: 6px;
}

.v-event-timed .v-event-draggable {
  user-select: none;
  -webkit-user-select: none;
}

.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;
}
</style>
