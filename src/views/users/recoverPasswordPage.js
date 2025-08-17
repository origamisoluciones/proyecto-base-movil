import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonNote,
    IonButton,
    loadingController,
    useIonRouter,
    menuController
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { Storage } from '@ionic/storage';

import defines from '../../defines.js';
import * as validations from '../../tools/validations.js';
import * as tools from '../../tools/tools.js';

/** @var {object} storage Storage object library */
const storage = new Storage();
storage.create();

/** @var {object} loading Loading object library */
var loading = null;

export default defineComponent({
    components: {
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonItem,
        IonLabel,
        IonInput,
        IonNote,
        IonButton
    },
    ionViewDidEnter() {
        validations.cleanValidate('recover-password-page', 'email');
    },
    ionViewWillLeave() {
        tools.closeAlert();
    },
    methods: {
        /**
         * Validates inputs
         * 
         * @param {object} event Event
         * @param {array} toValidate To validate
         * @param {string} fieldName Field name
         * @param {int} length Length
         */
        validate(event, toValidate, fieldName, length = null){
            validations.validate('recover-password-page', toValidate, event.target, fieldName, event.target.value, length);
        },
        /**
         * Goes log in
         */
        async goRecoverPassword(){
            tools.$('.recover-password-page').not('.ion-page-hidden').find('#goRecoverPassword').attr('disabled', true);

            var info = checkRecoverPassword();
            if(info.check == 0){
                loading = await loadingController.create({
                    message: 'Cargando...',
                    spinner: 'circles'
                });
                await loading.present();

                goRecoverPassword(this.ionRouter, info.data);
            }else{
                tools.showAlert('warning', defines.WARNING_MESSAGE);
                tools.$('.recover-password-page').not('.ion-page-hidden').find('#goRecoverPassword').attr('disabled', false);
                loading.dismiss();
            }
        },
        /**
         * Goes to recover password page
         */
        async goBack(){
            loading = await loadingController.create({
                message: 'Cargando...',
                spinner: 'circles'
            });
            await loading.present();

            this.ionRouter.push('/login');

            loading.dismiss();
        }
    },
    setup(){
        /** Ion router object */
        const ionRouter = useIonRouter();

        /** Route object */
        const route = useRoute();
        
        /**
         * Inits page (before do anything)
         */
        async function init(){
            loading = await loadingController.create({
                message: 'Cargando...',
                spinner: 'circles'
            });
            await loading.present();

            // Checks network status
            var network = await tools.checkNetworkStatus(ionRouter, route);
            if(network.connected){
                storage.get('session').then(function(result){
                    if(result != null){
                        tools.checkSession(ionRouter, result, 'out');
                    }else{
                        tools.$('.page').not('.ion-page-hidden').removeClass('d-none');
                    }
        
                    loading.dismiss();
                });
            }else{
                ionRouter.replace('no-internet');

                loading.dismiss();
            }

            menuController.enable(false);
        }

        init();

        return { ionRouter };
    }
});

/**
 * Checks login
 */
function checkRecoverPassword(){
    var check = 0;
    var data = {};

    // Email
    check += validations.validate(
        'recover-password-page',
        ['isRequired', 'isEmail'],
        tools.$('.recover-password-page').not('.ion-page-hidden').find('#email'),
        'email',
        tools.$('.recover-password-page').not('.ion-page-hidden').find('#email').val()
    );
    data.email = tools.$('.recover-password-page').not('.ion-page-hidden').find('#email').val();

    var info = [];

    info.check = check;
    info.data = data;

    return info;
}

/**
 * Goes login
 * 
 * @param {object} router Router
 * @param {array} data Data
 */
function goRecoverPassword(router, data){
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + defines.API_TOKEN
        },
        body: JSON.stringify(data)
    };

    fetch(defines.URL_API + 'users/password', options)
    .then(async response => {
        var data = await response.json();
        if(data.status){
            switch(data.data){
                case true:
                    tools.showAlert('success', 'La contraseña ha sido modificada');

                    setTimeout(() => {
                        router.push('/login');

                        tools.$('.recover-password-page').not('.ion-page-hidden').find('#goRecoverPassword').attr('disabled', false);
                    }, 1000);

                    loading.dismiss();
                break;
                case 'exists':
                    tools.showAlert('warning', 'El correo no es correcto');
                    tools.$('.recover-password-page').not('.ion-page-hidden').find('#goRecoverPassword').attr('disabled', false);
                    loading.dismiss();
                break;
                case 'validate':
                    tools.showAlert('warning', 'Formato incorrecto');
                    tools.$('.recover-password-page').not('.ion-page-hidden').find('#goRecoverPassword').attr('disabled', false);
                    loading.dismiss();
                break;
                case 'missing_params':
                    tools.showAlert('warning', 'Faltan parámetros');
                    tools.$('.recover-password-page').not('.ion-page-hidden').find('#goRecoverPassword').attr('disabled', false);
                    loading.dismiss();
                break;
                default:
                    tools.showAlert('danger', defines.ERROR_MESSAGE);
                    tools.$('.recover-password-page').not('.ion-page-hidden').find('#goRecoverPassword').attr('disabled', false);
                    loading.dismiss();
                break;
            }
        }else{
            tools.showAlert('danger', defines.ERROR_MESSAGE);
            tools.$('.recover-password-page').not('.ion-page-hidden').find('#goRecoverPassword').attr('disabled', false);
            loading.dismiss();
        }
    })
    .catch(() => {
        tools.showAlert('danger', defines.ERROR_MESSAGE);
        tools.$('.recover-password-page').not('.ion-page-hidden').find('#goRecoverPassword').attr('disabled', false);
        loading.dismiss();
    })
}