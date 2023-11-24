import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupAgendaItem from "./MeetupAgendaItem";

export default defineComponent({
  name: 'MeetupAgenda',
  components: {
    MeetupAgendaItem,
  },
  props: {
    agenda: {
      type: Array,
      required: true,
    }
  },

  template: `
    <ul class="agenda">
      <li class="agenda__item" v-for="agendaItem in agenda" :key="agenda.id">
        <MeetupAgendaItem :agendaItem="agendaItem" />
      </li>
    </ul>`,
});
