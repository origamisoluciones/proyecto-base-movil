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
    IonButton,
    useIonRouter,
    menuController
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import defines from '../../defines.js';
import * as validations from '../../tools/validations.js';
import * as tools from '../../tools/tools.js';

/** @var {object} md5 Md5 object library */
import md5 from 'md5';

var routerAux = null;

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
        IonButton
    },
    ionViewDidEnter(){
        validations.cleanValidate('login-page', 'email');
        validations.cleanValidate('login-page', 'password');
    },
    ionViewWillLeave(){
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
            validations.validate('login-page', toValidate, event.target, fieldName, event.target.value, length);
        },
        /**
         * Goes log in
         */
        async goLogin(){
            var ionRouter = this.ionRouter;
            var router = routerAux;
            tools.$('.login-page').not('.ion-page-hidden').find('#goLogin').attr('disabled', true);

            var info = checkLogin();
            if(info.check == 0){
                await tools.openLoading();

                goLogin(ionRouter, router.fullPath, info.data);
            }else{
                tools.showAlert('warning', defines.WARNING_MESSAGE);
                tools.$('.login-page').not('.ion-page-hidden').find('#goLogin').attr('disabled', false);
                await tools.closeLoading();
            }
        },
        /**
         * Goes to recover password page
         */
        async goRecoverPassword(){
            this.ionRouter.push('/recuperar-contrasena');
        },
        /**
         * Goes to register page
         */
        async goRegister(){
            this.ionRouter.push('/registro');
        }
    },
    setup(){
        /** Ion router object */
        const ionRouter = useIonRouter();

        /** Route object */
        const router = useRoute();
        routerAux = router;
        
        /**
         * Inits page (before do anything)
         */
        async function init(){
            await tools.openLoading();

            // Checks network status
            var network = await tools.checkNetworkStatus(ionRouter, router);
            if(network.connected){
                tools.layouts.storage.get('session').then(function(result){
                    if(result != null){
                        tools.checkSession(ionRouter, result, 'out');
                    }else{
                        tools.$('.page').not('.ion-page-hidden').removeClass('d-none');
                    }
        
                    tools.closeLoading();
                });
            }else{
                ionRouter.replace('/no-internet');

                await tools.closeLoading();
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
function checkLogin(){
    var check = 0;
    var data = {};

    // Email
    check += validations.validate('login-page', ['isRequired', 'isEmail'], tools.$('.login-page').not('.ion-page-hidden').find('#email'), 'email', tools.$('.login-page').not('.ion-page-hidden').find('#email').val());
    data.email = tools.$('.login-page').not('.ion-page-hidden').find('#email').val();

    // Password
    check += validations.validate('login-page', ['isRequired'], tools.$('.login-page').not('.ion-page-hidden').find('#password'), 'password', tools.$('.login-page').not('.ion-page-hidden').find('#password').val());
    data.password = md5(tools.$('.login-page').not('.ion-page-hidden').find('#password').val());

    var info = [];

    info.check = check;
    info.data = data;

    return info;
}

/**
 * Goes login
 * 
 * @param {object} ionRouter Ion router
 * @param {object} router Router
 * @param {array} data Data
 */
function goLogin(ionRouter, router, data){
    var options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + defines.API_TOKEN
        },
        body: JSON.stringify(data)
    };

    fetch(defines.URL_API + 'users/login', options)
    .then(async response => {
        var data = await response.json();
        if(data.status){
            switch(data.data){
                case true:
                    tools.layouts.storage.set('session', data.session);

                    setTimeout(() => {
                        window.location.href = '/home';
                    }, 250);
                break;
                case 'email':
                    tools.showAlert('warning', 'El usuario no existe');

                    tools.$('.login-page').not('.ion-page-hidden').find('#goLogin').attr('disabled', false);
                    await tools.closeLoading();
                break;
                case 'password':
                    tools.showAlert('warning', 'La contraseña es incorrecta');

                    tools.$('.login-page').not('.ion-page-hidden').find('#goLogin').attr('disabled', false);
                    await tools.closeLoading();
                break;
                case 'validate':
                    tools.showAlert('warning', 'Formato incorrecto');

                    tools.$('.login-page').not('.ion-page-hidden').find('#goLogin').attr('disabled', false);
                    await tools.closeLoading();
                break;
                case 'missing_params':
                    tools.showAlert('warning', 'Faltan parámetros');

                    tools.$('.login-page').not('.ion-page-hidden').find('#goLogin').attr('disabled', false);
                    await tools.closeLoading();
                break;
                default:
                    tools.showAlert('danger', defines.ERROR_MESSAGE);

                    tools.$('.login-page').not('.ion-page-hidden').find('#goLogin').attr('disabled', false);
                    await tools.closeLoading();
                break;
            }
        }else{
            tools.showAlert('danger', defines.ERROR_MESSAGE);
            tools.$('.login-page').not('.ion-page-hidden').find('#goLogin').attr('disabled', false);
            await tools.closeLoading();
        }
    })
    .catch((e) => {
        tools.showAlert('danger', defines.ERROR_MESSAGE);
        tools.$('.login-page').not('.ion-page-hidden').find('#goLogin').attr('disabled', false);
        tools.closeLoading();
    })
}