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
          :first-interval="7"
          :interval-minutes="60"
          :interval-count="13"
          :weekdays="weekdays"
          @mousedown:event="startDrag"
          @mousedown:time="startTime"
          @mousemove:time="mouseMove"
          @mouseup:time="endDrag"
          @mouseleave.native="cancelDrag"
        >
          <template v-slot:event="{ event, timed, eventSummary }">
            <div class="v-event-draggable" v-html="eventSummary()"></div>
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
              <span v-html="selectedSession.detail"></span>
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
import EditSessionFormModal from "../components/EditSessionFormModal";
export default {
  props: ["selectedMatiere"],
  data: () => ({
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
    dragEvent: null,
    dragStart: null,
    createEvent: null,
    createStart: null,
    extendOriginal: null,
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
  created() {
    this.$store.dispatch("planning/getAllSessions");
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  components: {
    EditSessionFormModal,
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
      if (event && timed) {
        this.dragEvent = event;
        this.dragTime = null;
        this.extendOriginal = null;
      }
    },
    startTime(tms) {
      const mouse = this.toTime(tms);

      if (this.dragEvent && this.dragTime === null) {
        const start = this.dragEvent.start;

        this.dragTime = mouse - start;
      } else {
        if (this.selectedMatiere !== null) {
          this.createStart = this.roundTime(mouse);
          this.createEvent = {
            matiere: this.selectedMatiere,
            detail: "TODO",
            type: "TD",
            obligatoire: true,
            dateDebut: new Date(this.createStart),
            dateFin: new Date(this.createStart),
          };
          this.$store.dispatch("planning/addSession", this.createEvent);
        }else {
          
        }
      }
    },
    extendBottom(event) {
      this.createEvent = event;
      this.createStart = event.start;
      this.extendOriginal = event.end;
    },
    mouseMove(tms) {
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
        this.$store.dispatch("planning/updateSessionByEvent", this.dragEvent);
      } else if (this.createEvent && this.createStart !== null) {
        const mouseRounded = this.roundTime(mouse, false);
        const min = Math.min(mouseRounded, this.createStart);
        const max = Math.max(mouseRounded, this.createStart);

        this.createEvent.start = min;
        this.createEvent.end = max;
        this.$store.dispatch("planning/updateSessionByEvent", this.createEvent);
      }
    },
    endDrag() {
      this.dragTime = null;
      this.dragEvent = null;
      this.createEvent = null;
      this.createStart = null;
      this.extendOriginal = null;
    },
    cancelDrag() {
      if (this.createEvent) {
        if (this.extendOriginal) {
          this.createEvent.end = this.extendOriginal;
          this.$store.dispatch(
            "planning/updateSessionByEvent",
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
