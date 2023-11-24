import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from "../../06-MeetupView/components/MeetupView";

export default defineComponent({
  name: 'PageMeetup',
  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  components: {
    MeetupView,
    UiAlert,
    UiContainer,
  },

  data() {
    return {
      meetup: null,
      error: null,
    };
  },

  watch: {
    meetupId: {
      immediate: true,
      handler() {
        this.meetup = null;
        this.error = null;
        fetchMeetupById(this.meetupId)
          .then((data) => {
            this.meetup = data;
          })
          .catch((error) => {
            this.meetup = null;
            this.error = error?.message;
          });
      }
    }
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup" :meetup="meetup" />

      <UiContainer v-if="error">
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>

      <UiContainer v-else>
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

    </div>`,
});
