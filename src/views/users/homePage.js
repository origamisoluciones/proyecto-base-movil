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
import * as tools from '../../tools/tools.js';

import moment from 'moment';

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
    ionViewWillLeave(){
        tools.closeAlert();
        tools.layouts.initSetup = false;
        tools.addLoading();
    },
    ionViewWillEnter(){
        tools.layouts.flagLogout = false;
        tools.layouts.initFuncLoads = 0;
        tools.layouts.initMaxFuncLoads = 1;
    },
    ionViewDidEnter(){
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
            validations.validate('home-page', toValidate, event.target, fieldName, event.target.value, length);
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

    tools.checkInitLoading();
}