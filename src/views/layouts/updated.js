import {
    IonPage,
    IonContent,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { Storage } from '@ionic/storage';

/** @var {object} storage Storage object library */
const storage = new Storage();
storage.create();

export default defineComponent({
    components: {
        IonPage,
        IonContent
    }
});