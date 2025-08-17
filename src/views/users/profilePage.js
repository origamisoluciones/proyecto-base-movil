import {
    IonPage,
    IonHeader,
    IonContent,
    IonFooter,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,
    IonTabs,
    IonTab,
    IonTabBar,
    IonTabButton,
    useIonRouter,
    menuController
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import defines from '../../defines.js';
import * as validations from '../../tools/validations.js';
import * as tools from '../../tools/tools.js';
import moment from 'moment';
import md5 from 'md5';

export default defineComponent({
    components: {
        IonPage,
        IonHeader,
        IonContent,
        IonFooter,
        IonToolbar,
        IonButtons,
        IonMenuButton,
        IonTitle,
        IonGrid,
        IonRow,
        IonCol,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonImg,
        IonTabs,
        IonTab,
        IonTabBar,
        IonTabButton
    },
    ionViewWillEnter(){
        tools.layouts.flagLogout = false;
        tools.layouts.initFuncLoads = 0;
        tools.layouts.initMaxFuncLoads = 1;
    },
    ionViewWillLeave(){
        tools.closeAlert();
        tools.layouts.initSetup = false;
        tools.addLoading();
    },
    ionViewDidEnter(){
        validations.cleanValidate('profile-page', 'email');
        validations.cleanValidate('profile-page', 'userName');
        validations.cleanValidate('profile-page', 'userSurname');
        validations.cleanValidate('profile-page', 'currentPassword');
        validations.cleanValidate('profile-page', 'newPassword');
        validations.cleanValidate('profile-page', 'newPasswordConfirm');
        
        var ionRouter = this.ionRouter;
        var router = this.router;
        if(tools.layouts.initSetup === false){
            tools.layouts.storage.get('session').then(function(result){
                if(result != null){
                    tools.openLoading();
                    setTimeout(() => {
                        getInfoPage(result, ionRouter, router);
                    }, 250);
                }
            });
        }
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
            validations.validate('profile-page', toValidate, event.target, fieldName, event.target.value, length);
        },
        /**
         * Goes save profile
         */
        async goSaveProfile(){
            tools.$('.profile-page').not('.ion-page-hidden').find('#goSaveProfile').attr('disabled', true);

            var info = checkSaveProfile();
            if(info.check == 0){
                await tools.openLoading();

                tools.layouts.storage.get('session').then(function(result){
                    if(result != null){
                        goSaveProfile(result, info.data);
                    }else{
                        tools.showAlert('danger', defines.ERROR_MESSAGE);
                        tools.$('.profile-page').not('.ion-page-hidden').find('#goSaveProfile').attr('disabled', false);
                        tools.closeLoading();
                    }
                });
            }else{
                tools.showAlert('warning', defines.WARNING_MESSAGE);
                tools.$('.profile-page').not('.ion-page-hidden').find('#goSaveProfile').attr('disabled', false);
                await tools.closeLoading();
            }
        },
        /**
         * Goes save password
         */
        async goSavePassword(){
            tools.$('.profile-page').not('.ion-page-hidden').find('#goSavePassword').attr('disabled', true);

            var ionRouter = this.ionRouter;
            var router = this.router;

            var info = checkSavePassword();
            if(info.check == 0){
                await tools.openLoading();

                tools.layouts.storage.get('session').then(function(result){
                    if(result != null){
                        goSavePassword(result, ionRouter, router.fullPath, info.data);
                    }else{
                        tools.showAlert('danger', defines.ERROR_MESSAGE);
                        tools.$('.profile-page').not('.ion-page-hidden').find('#goSavePassword').attr('disabled', false);
                        tools.closeLoading();
                    }
                });

            }else{
                tools.showAlert('warning', defines.WARNING_MESSAGE);
                tools.$('.profile-page').not('.ion-page-hidden').find('#goSavePassword').attr('disabled', false);
                await tools.closeLoading();
            }
        },
    },
    setup(){
        /** Ion router object */
        const ionRouter = useIonRouter();
        
        /** Router object */
        const router = useRouter();

        /**
         * Inits page (before do anything)
         */
        async function init(){
            await tools.openLoading();

            var network = await tools.checkNetworkStatus();
            if(network.connected){
                tools.layouts.storage.get('session').then(function(result){
                    if(result != null){
                        tools.checkSession(ionRouter, result);

                        getInfoPage(result, ionRouter, router);
                    }else{
                        ionRouter.replace('/login');
                    }
                });
            }else{
                ionRouter.replace('/no-internet');

                await tools.closeLoading();
            }

            menuController.enable(true);
        }

        router.beforeEach((to) => {
            if(to.name == 'Login'){
                if(!tools.layouts.flagLogout){
                    tools.layouts.storage.get('session').then(function(result){
                        if(result == null){
                            tools.layouts.flagLogout = true;
                            ionRouter.replace('/login');
                        }
                    });
                    return false;
                }
            }
        })

        init();

        tools.layouts.initSetup = true;

        return { ionRouter, router };
    }
});

/**
 * Gets info for page
 * 
 * @param {string} token Token
 * @param {string} ionRouter Ion router
 * @param {object} router Router
 */
function getInfoPage(token, ionRouter, router){
    tools.layouts.initSetup = true;

    getInfoProfile(token);
}

/**
 * Gets info profile
 * 
 * @param {array} token Token
 */
function getInfoProfile(token){
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    fetch(defines.URL_API + 'users', options)
    .then(async response => {
        var data = await response.json();
        if(data.status){
            printInfoProfile(data.data);
        }else{
            tools.showAlert('danger', defines.ERROR_MESSAGE);
            tools.closeLoading();
            tools.checkInitLoading();
        }
    })
    .catch((e) => {
        tools.showAlert('danger', defines.ERROR_MESSAGE);
        tools.closeLoading();
        tools.checkInitLoading();
    })
}

/**
 * Prints profile info
 * 
 * @param {array} data Data
 */
function printInfoProfile(data){
    // Personal info
    tools.$('.profile-page').not('.ion-page-hidden').find('#email').val(data.user.email);
    tools.$('.profile-page').not('.ion-page-hidden').find('#userName').val(data.user.name);
    tools.$('.profile-page').not('.ion-page-hidden').find('#userSurname').val(data.user.surname);

    tools.checkInitLoading();
}

/**
 * Checks save profile
 */
function checkSaveProfile(){
    var check = 0;
    var data = {};

    // Email
    check += validations.validate('profile-page', ['isRequired', 'isEmail', 'checksMaxLength'], tools.$('.profile-page').not('.ion-page-hidden').find('#email'), 'email', tools.$('.profile-page').not('.ion-page-hidden').find('#email').val(), 100);
    data.email = tools.$('.profile-page').not('.ion-page-hidden').find('#email').val();

    // User name
    check += validations.validate('profile-page', ['isRequired', 'checksMaxLength'], tools.$('.profile-page').not('.ion-page-hidden').find('#userName'), 'userName', tools.$('.profile-page').not('.ion-page-hidden').find('#userName').val(), 25);
    data.name = tools.$('.profile-page').not('.ion-page-hidden').find('#userName').val();

    // User surname
    check += validations.validate('profile-page', ['isRequired', 'checksMaxLength'], tools.$('.profile-page').not('.ion-page-hidden').find('#userSurname'), 'userSurname', tools.$('.profile-page').not('.ion-page-hidden').find('#userSurname').val(), 100);
    data.surname = tools.$('.profile-page').not('.ion-page-hidden').find('#userSurname').val();

    var info = [];

    info.check = check;
    info.data = data;

    return info;
}

/**
 * Goes save profile
 * 
 * @param {string} token Token
 * @param {array} data Data
 */
function goSaveProfile(token, data){
    var options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    };

    fetch(defines.URL_API + 'users', options)
    .then(async response => {
        var data = await response.json();
        if(data.status){
            switch(data.data){
                case true:
                    tools.showAlert('success', 'Tu perfil ha sido actualizado');

                    tools.layouts.storage.set('session', data.session);
                break;
                case 'username':
                    tools.showAlert('warning', 'Ya existe otro usuario con ese nombre de usuario');
                break;
                case 'email':
                    tools.showAlert('warning', 'Ya existe otro usuario con ese correo');
                break;
                case 'validate':
                    tools.showAlert('warning', 'Formato incorrecto');
                break;
                case 'missing_params':
                    tools.showAlert('warning', 'Faltan parámetros');
                break;
                default:
                    tools.showAlert('danger', defines.ERROR_MESSAGE);
                break;
            }
        }else{
            tools.showAlert('danger', defines.ERROR_MESSAGE);
        }

        tools.$('.profile-page').not('.ion-page-hidden').find('#goSaveProfile').attr('disabled', false);
        await tools.closeLoading();
    })
    .catch((e) => {
        tools.showAlert('danger', defines.ERROR_MESSAGE);
        tools.$('.profile-page').not('.ion-page-hidden').find('#goSaveProfile').attr('disabled', false);
        tools.closeLoading();
    })
}

/**
 * Checks save password
 */
function checkSavePassword(){
    var check = 0;
    var data = {};

    // Current password
    check += validations.validate('profile-page', ['isRequired', 'isPassword'], tools.$('.profile-page').not('.ion-page-hidden').find('#currentPassword'), 'currentPassword', tools.$('.profile-page').not('.ion-page-hidden').find('#currentPassword').val());
    data.currentPassword = md5(tools.$('.profile-page').not('.ion-page-hidden').find('#currentPassword').val());

    // New password
    check += validations.validate('profile-page', ['isRequired', 'isPassword'], tools.$('.profile-page').not('.ion-page-hidden').find('#newPassword'), 'newPassword', tools.$('.profile-page').not('.ion-page-hidden').find('#newPassword').val());
    data.newPassword = md5(tools.$('.profile-page').not('.ion-page-hidden').find('#newPassword').val());

    // New password confirm
    check += validations.validate('profile-page', ['isRequired', 'isPassword'], tools.$('.profile-page').not('.ion-page-hidden').find('#newPasswordConfirm'), 'newPasswordConfirm', tools.$('.profile-page').not('.ion-page-hidden').find('#newPasswordConfirm').val());

    if(check == 0){
        check += validations.validate(
            'profile-page',
            ['matchPassword'],
            tools.$('.profile-page').not('.ion-page-hidden').find('#newPasswordConfirm'),
            'newPasswordConfirm',
            tools.$('.profile-page').not('.ion-page-hidden').find('#newPassword').val(),
            tools.$('.profile-page').not('.ion-page-hidden').find('#newPasswordConfirm').val()
        );
    }

    var info = [];

    info.check = check;
    info.data = data;

    return info;
}

/**
 * Goes save password
 * 
 * @param {string} token Token
 * @param {object} ionRouter Ion router
 * @param {object} router Router
 * @param {array} data Data
 */
function goSavePassword(token, ionRouter, router, data){
    var options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    };

    fetch(defines.URL_API + 'users/password', options)
    .then(async response => {
        var data = await response.json();
        if(data.status){
            switch(data.data){
                case true:
                    tools.showAlert('success', 'Tu contraseña ha sido modificada');

                    tools.layouts.storage.set('session', data.session);
                break;
                case 'notMatchPassword':
                    tools.showAlert('warning', 'La contraseña actual no es correcta');
                break;
                case 'email':
                    tools.showAlert('warning', 'Ya existe otro usuario con ese correo');
                break;
                case 'validate':
                    tools.showAlert('warning', 'Formato incorrecto');
                break;
                case 'missing_params':
                    tools.showAlert('warning', 'Faltan parámetros');
                break;
                default:
                    tools.showAlert('danger', defines.ERROR_MESSAGE);
                break;
            }
        }else{
            tools.showAlert('danger', defines.ERROR_MESSAGE);
        }

        tools.$('.profile-page').not('.ion-page-hidden').find('#goSavePassword').attr('disabled', false);
        await tools.closeLoading();
    })
    .catch((e) => {
        tools.showAlert('danger', defines.ERROR_MESSAGE);
        tools.$('.profile-page').not('.ion-page-hidden').find('#goSavePassword').attr('disabled', false);
        tools.closeLoading();
    })
}