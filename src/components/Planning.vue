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
          <SelectPromo v-if="!isEtudiant" class="mt-5" />
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[typeCalendar] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="typeCalendar = 'day'">
                <v-list-item-title>Jour</v-list-item-title>
              </v-list-item>
              <v-list-item @click="typeCalendar = 'week'">
                <v-list-item-title>Semaine</v-list-item-title>
              </v-list-item>
              <v-list-item @click="typeCalendar = 'month'">
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
          :type="typeCalendar"
          :first-interval="7"
          :interval-minutes="60"
          :interval-count="13"
          :weekdays="weekdays"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="saveInterval"
          @mousedown:event="startDrag"
          @mousedown:time="startTime"
          @mousemove:time="mouseMove"
          @mouseup:time="endDrag"
          @mouseleave.native="cancelDrag"
        >
          <template #event="{ event }">
            <div class="v-event-draggable">
              <h3>{{ event.matiere.nom }}</h3>
              <div>Description : {{ event.detail }}</div>
              <div>Type : {{ event.type }}</div>
              <div>
                Salles :
                <span v-for="salle in event.sessionSalle" :key="salle.id">
                  {{ salle.nomSalle }} ,
                </span>
              </div>
              <div>
                {{ event.dateDebut.getHours() }}:{{
                  event.dateDebut.getMinutes()
                }}
                - {{ event.dateFin.getHours() }}:{{
                  event.dateFin.getMinutes()
                }}
              </div>
            </div>
            <div
              class="v-event-drag-bottom"
              @mousedown.stop="extendBottom(event)"
            ></div>
          </template>
        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar color="grey lighten-4">
              <v-btn
                v-if="!isEtudiant"
                @click="editFormOpen = !editFormOpen"
                icon
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title
                v-html="selectedSession.matiere.nom"
              ></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn v-if="!isEtudiant" icon @click="deleteSession()">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <div>Description : {{ selectedSession.detail }}</div>
              <div> Type : {{ selectedSession.type }} </div>
              <div>
                Salles :
                <ul>
                  <li
                    v-for="salle in selectedSession.sessionSalle"
                    :key="salle.id"
                  >
                    {{ salle.nomSalle }}
                  </li>
                </ul>
              </div>
              <div>
                Horaires : {{ new Date(selectedSession.dateDebut).getHours() }}:{{
                  new Date(selectedSession.dateDebut).getMinutes()
                }}
                - {{ new Date(selectedSession.dateFin).getHours() }}:{{
                  new Date(selectedSession.dateFin).getMinutes()
                }}
              </div>
              <div v-if="selectedSession.obligatoire"> Obligatoire </div>
              <div v-else> Non obligatoire </div>
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
  props: ["edition"],
  data: () => ({
    editFormOpen: false,
    focus: "",
    weekdays: [1, 2, 3, 4, 5],
    typeCalendar: "week",
    typeToLabel: {
      month: "Mois",
      week: "Semaine",
      day: "Jour",
    },
    selectedElement: null,
    selectedOpen: false,
    dragEvent: null,
    dragStart: null,
    createEvent: null,
    createStart: null,
    extendOriginal: null,
    start: "",
    end: "",
  }),
  computed: {
    ...mapGetters({
      events: "planning/getEventsForPlanning",
      getSessionById: "planning/getSessionById",
      isEtudiant: "user/isEtudiant",
      duree: "planning/getDuree",
    }),
    ...mapState({
      selectedSession: (state) => state.planning.selectedSession,
      selectedPromotion: (state) => state.promotions.selectedPromotion,
      selectedMatiere: (state) => state.matieres.selectedMatiere,
      details: (state) => state.planning.details,
      obligatoire: (state) => state.planning.obligatoire,
      type: (state) => state.planning.type,
    }),
  },
  watch: {
    selectedPromotion: function () {
      this.$store.dispatch("planning/clearSessions");
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
    startDrag({ event, timed }) {
      if (!this.isEtudiant && !this.edition && event && timed) {
        this.dragEvent = event;
        this.dragTime = null;
        this.extendOriginal = null;
      }
    },
    startTime(tms) {
      if (!this.isEtudiant && !this.edition) {
        const mouse = this.toTime(tms);

        if (this.dragEvent && this.dragTime === null) {
          const start = this.dragEvent.start;

          this.dragTime = mouse - start;
        } else {
          if (this.selectedPromotion !== null) {
            if (this.selectedMatiere !== null) {
              this.createStart = this.roundTime(mouse);
              this.createEvent = {
                matiere: this.selectedMatiere,
                detail: this.details,
                type: this.type,
                obligatoire: this.obligatoire,
                dateDebut: new Date(this.createStart),
                dateFin: new Date(this.createStart + this.duree),
              };
              this.$store.dispatch("planning/addSession", this.createEvent);
            } else {
              this.$store.dispatch("snackbar/error", {
                text:
                  "Erreur : Selectionner une matière pour pouvoir créer un cours",
              });
            }
          } else {
            this.$store.dispatch("snackbar/error", {
              text:
                "Erreur : Selectionner une promotion pour pouvoir créer un cours",
            });
          }
        }
      }
    },
    extendBottom(event) {
      this.createEvent = event;
      this.createStart = event.start;
      this.extendOriginal = event.end;
    },
    mouseMove(tms) {
      if (!this.isEtudiant && !this.edition) {
        const mouse = this.toTime(tms);

        if (this.dragEvent && this.dragTime !== null) {
          const start = this.dragEvent.start;
          const end = this.dragEvent.end;
          const duration = end - start;
          const newStartTime = mouse - this.dragTime;
          const newStart = this.roundTime(newStartTime);
          const newEnd = newStart + duration;

          this.dragEvent.start = newStart;
          this.dragEvent.end = newEnd;
          this.$store.dispatch("planning/updateTimeSession", this.dragEvent);
        } else if (this.createEvent && this.createStart !== null) {
          const mouseRounded = this.roundTime(mouse, false);
          const min = Math.min(mouseRounded, this.createStart);
          const max = Math.max(mouseRounded, this.createStart);

          this.createEvent.start = min;
          this.createEvent.end = max;
          this.$store.dispatch("planning/updateTimeSession", this.createEvent);
        }
      }
    },
    endDrag() {
      if (!this.isEtudiant && !this.edition) {
        this.dragTime = null;
        this.dragEvent = null;
        this.createEvent = null;
        this.createStart = null;
        this.extendOriginal = null;
      }
    },
    cancelDrag() {
      if (!this.isEtudiant && !this.edition) {
        if (this.createEvent) {
          if (this.extendOriginal) {
            this.createEvent.end = this.extendOriginal;
            this.$store.dispatch(
              "planning/updateTimeSession",
              this.createEvent
            );
          } else {
            this.$store.dispatch("planning/deleteSession", this.createEvent);
          }
        }
        this.createEvent = null;
        this.createStart = null;
        this.dragTime = null;
        this.dragEvent = null;
      }
    },
    roundTime(time, down = true) {
      const roundTo = 15; // minutes
      const roundDownTime = roundTo * 60 * 1000;

      return down
        ? time - (time % roundDownTime)
        : time + (roundDownTime - (time % roundDownTime));
    },
    toTime(tms) {
      return new Date(
        tms.year,
        tms.month - 1,
        tms.day,
        tms.hour,
        tms.minute
      ).getTime();
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
        if (this.isEtudiant) {
          this.$store.dispatch("planning/fetchSessions", {
            start: this.start,
            end: this.end,
          });
        } else if (this.selectedPromotion !== null) {
          {
            this.$store.dispatch("planning/fetchSessionsByIdPromotion", {
              id: this.selectedPromotion,
              start: this.start,
              end: this.end,
            });
          }
        }
      }
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
