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
    ionViewWillEnter() {
        validations.cleanValidate('register-page', 'email');
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
            validations.validate('register-page', toValidate, event.target, fieldName, event.target.value, length);
        },
        /**
         * Goes log in
         */
        async goRegister(){
            tools.$('.register-page').not('.ion-page-hidden').find('#goRegister').attr('disabled', true);

            var info = checkRegister();
            if(info.check == 0){
                loading = await loadingController.create({
                    message: 'Cargando...',
                    spinner: 'circles'
                });
                await loading.present();

                goRegister(this.ionRouter, info.data);
            }else{
                tools.showAlert('warning', 'Faltan campos por completar o tienen un formato incorrecto');
                tools.$('.register-page').not('.ion-page-hidden').find('#goRegister').attr('disabled', false);
                loading.dismiss();
            }
        },
        /**
         * Goes to register page
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
 * Checks register
 */
function checkRegister(){
    var check = 0;
    var data = {};

    // Email
    check += validations.validate(
        'register-page',
        ['isRequired', 'isEmail'],
        tools.$('.register-page').not('.ion-page-hidden').find('#email'),
        'email',
        tools.$('.register-page').not('.ion-page-hidden').find('#email').val(),
        100
    );
    data.email = tools.$('.register-page').not('.ion-page-hidden').find('#email').val();

    // Password
    check += validations.validate(
        'register-page',
        ['isRequired', 'isPassword', 'checksMaxLength'],
        tools.$('.register-page').not('.ion-page-hidden').find('#password'),
        'password',
        tools.$('.register-page').not('.ion-page-hidden').find('#password').val(),
        25
    );
    data.password = tools.$('.register-page').not('.ion-page-hidden').find('#password').val();

    // User name
    check += validations.validate('register-page', ['isRequired', 'checksMaxLength'], tools.$('.register-page').not('.ion-page-hidden').find('#userName'), 'userName', tools.$('.register-page').not('.ion-page-hidden').find('#userName').val(), 25);
    data.name = tools.$('.register-page').not('.ion-page-hidden').find('#userName').val();

    // User surname
    check += validations.validate('register-page', ['isRequired', 'checksMaxLength'], tools.$('.register-page').not('.ion-page-hidden').find('#userSurname'), 'userSurname', tools.$('.register-page').not('.ion-page-hidden').find('#userSurname').val(), 100);
    data.surname = tools.$('.register-page').not('.ion-page-hidden').find('#userSurname').val();

    var info = [];

    info.check = check;
    info.data = data;

    return info;
}

/**
 * Goes register
 * 
 * @param {object} router Router
 * @param {array} data Data
 */
function goRegister(router, data){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + defines.API_TOKEN
        },
        body: JSON.stringify(data)
    };

    fetch(defines.URL_API + 'users', options)
    .then(async response => {
        var data = await response.json();
        if(data.status){
            switch(data.data){
                case true:
                    tools.showAlert('success', 'Has sido registrado con éxito');

                    tools.layouts.storage.set('session', data.session);

                    setTimeout(() => {
                        router.push('/home');

                        tools.$('.register-page').not('.ion-page-hidden').find('#goRegister').attr('disabled', false);
                    }, 1000);

                    loading.dismiss();
                break;
                case 'exists':
                    tools.showAlert('warning', 'El correo no es correcto');
                    tools.$('.register-page').not('.ion-page-hidden').find('#goRegister').attr('disabled', false);
                    loading.dismiss();
                break;
                case 'validate':
                    tools.showAlert('warning', 'Formato incorrecto');
                    tools.$('.register-page').not('.ion-page-hidden').find('#goRegister').attr('disabled', false);
                    loading.dismiss();
                break;
                case 'missing_params':
                    tools.showAlert('warning', 'Faltan parámetros');
                    tools.$('.register-page').not('.ion-page-hidden').find('#goRegister').attr('disabled', false);
                    loading.dismiss();
                break;
                default:
                    tools.showAlert('danger', 'Ha ocurrido un error. Contacta con el departamento de Recursos Humanos para resolver el problema.');
                    tools.$('.register-page').not('.ion-page-hidden').find('#goRegister').attr('disabled', false);
                    loading.dismiss();
                break;
            }
        }else{
            tools.showAlert('danger', 'Ha ocurrido un error. Contacta con el departamento de Recursos Humanos para resolver el problema.');
            tools.$('.register-page').not('.ion-page-hidden').find('#goRegister').attr('disabled', false);
            loading.dismiss();
        }
    })
    .catch(() => {
        tools.showAlert('danger', 'Ha ocurrido un error. Contacta con el departamento de Recursos Humanos para resolver el problema.');
        tools.$('.register-page').not('.ion-page-hidden').find('#goRegister').attr('disabled', false);
        loading.dismiss();
    })
}