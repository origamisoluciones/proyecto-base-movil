import {
    toastController,
    loadingController,
} from '@ionic/vue';
import { Network } from '@capacitor/network';
import { Browser } from '@capacitor/browser';
import { Storage } from '@ionic/storage';
import { App } from '@capacitor/app';

import $ from 'jquery';
import defines from '../defines.js';
import moment from 'moment';

/** Storage object */
const storage = new Storage();
storage.create();

/**
 * Layouts class
 */
class Layouts{
    /** @var {boolean} flagLogout Flag to check if goes log out */
    #flagLogout = false;
    get flagLogout(){
        return this.#flagLogout;
    }
    set flagLogout(flagLogout){
        this.#flagLogout = flagLogout;
    }

    /** @var {int} initFuncLoads Functions launched at init */
    #initFuncLoads = 0;
    get initFuncLoads(){
        return this.#initFuncLoads;
    }
    set initFuncLoads(initFuncLoads){
        this.#initFuncLoads = initFuncLoads;
    }

    /** @var {int} initMaxFuncLoads Max number of function to launch at init */
    #initMaxFuncLoads = 0;
    get initMaxFuncLoads(){
        return this.#initMaxFuncLoads;
    }
    set initMaxFuncLoads(initMaxFuncLoads){
        this.#initMaxFuncLoads = initMaxFuncLoads;
    }

    /** @var {boolean} initSetup Flag to check if the init function has been launched */
    #initSetup = false;
    get initSetup(){
        return this.#initSetup;
    }
    set initSetup(initSetup){
        this.#initSetup = initSetup;
    }

    /** @var {object} loading Loading screen */
    #loading = loadingController;
    get loading(){
        return this.#loading;
    }
    set loading(loading){
        this.#loading = loading;
    }

    /** @var {object} loadingRunning Loading running flag */
    #loadingRunning = false;
    get loadingRunning(){
        return this.#loadingRunning;
    }
    set loadingRunning(loadingRunning){
        this.#loadingRunning = loadingRunning;
    }

    /** @var {object} toast Toast */
    #toast = null;
    get toast(){
        return this.#toast;
    }
    set toast(toast){
        this.#toast = toast;
    }

    /** @var {object} storage Storage object library */
    #storage = new Storage();
    get storage(){
        return this.#storage;
    }

    /** @var {boolean} canGoBack Flag to check if can go back */
    #canGoBack = false;
    get canGoBack(){
        return this.#canGoBack;
    }
    set canGoBack(canGoBack){
        this.#canGoBack = canGoBack;
    }
}
const layouts = new Layouts;
layouts.storage.create();

/**
 * Checks network status
 * 
 * @param {object} ionRouter Ion router object
 * @param {object} route Route object
 */
async function checkNetworkStatus(ionRouter, route){
    const status = await Network.getStatus();
    if(status.connected){
        storage.set('network-status', true);
    }else{
        storage.get('network-status').then(function(result){
            if((result == null || result === true) && route.name != 'No internet'){
                storage.set('network-status', false);
                storage.set('network-connected-last-route', route.path);

                // ionRouter.replace('no-internet');
                window.location.href = '/no-internet';
            }
        });
    }
    return status
}

/**
 * Shows an alert
 * 
 * @param {string} type Type
 * @param {string} message Message
 */
async function showAlert(type, message){
    if(layouts.toast != null){
        layouts.toast.dismiss();
    }

    layouts.toast = await toastController.create({
        message: message,
        duration: 1500,
        position: 'bottom',
        color: type
    });

    await layouts.toast.present();
}

/**
 * Closes an alert
 */
async function closeAlert(){
    if(layouts.toast != null){
        layouts.toast.dismiss();
    }
}

/**
 * Checks user session
 * 
 * @param {object} router Router
 * @param {string} token Token
 * @param {string} mode Mode (out, in)
 */
function checkSession(router, token, mode = 'in'){
    // $('.page').removeClass('d-none');
    // return false;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    fetch(defines.URL_API + 'users/check', options)
    .then(async response => {
        var data = await response.json();
        if(data.status){
            App.getInfo().then(function(appInfo){
                // Device section
                layouts.storage.set('updated', appInfo.version);
    
                var currentUpdated = appInfo.version;
                if(Capacitor.getPlatform() == 'android'){
                    var newUpdated = data.updated_android;
                }else{
                    var newUpdated = data.updated_ios;
                }

                if(currentUpdated != newUpdated){
                    window.location.href = '/actualizar';
                    // router.replace('/actualizar');
                }else if(data.data == 'upkeep_mode'){
                    window.location.href = '/mantenimiento';
                    // router.replace('/mantenimiento');
                }else{
                    if(mode == 'out'){
                        if(data.data){
                            window.location.href = '/home';
                            // router.replace('/home');
                        }else{
                            $('.page').removeClass('d-none');
                        }
                    }else{
                        if(data.data === false){
                            window.location.href = '/login';
                            // router.push('/login');
                        }else{
                            printSessionInfo(data);
                        }
                    }
                }
            }).catch(function(e){
                // Web section
                if(mode == 'out'){
                    if(data.data){
                        window.location.href = '/home';
                        // router.replace('/home');
                    }else{
                        $('.page').removeClass('d-none');
                    }
                }else{
                    if(data.data === false){
                        window.location.href = '/login';
                        // router.replace('/login');
                    }else{
                        printSessionInfo(data);
                    }
                }
            })
        }else{
            showAlert('danger', defines.ERROR_MESSAGE);
        }
    })
    .catch((e) => {
        showAlert('danger', defines.ERROR_MESSAGE);
    })
}

/**
 * Prints session info
 * 
 * @param {array} data Data
 */
function printSessionInfo(data){
    $('#appMenu').not('.ion-page-hidden').find('#userName').text(data.info.user.name + ' ' + data.info.user.surname);
}

/**
 * Opens the loading screen
 */
async function openLoading(){
    if(layouts.loadingRunning === false){
        layouts.loadingRunning = true;

        layouts.loading.create({
            message: 'Cargando...',
            spinner: 'circles'
        }).then((response) => {
            response.present();
        }).catch((e) => {
            console.log('Open loading: ' + e);
        })
    }
}

/**
 * Closes the loading screen
 */
async function closeLoading(){
    layouts.loading.dismiss()
    .then(() => {
        layouts.loadingRunning = false;
    })
    .catch((e) => {
        console.log('Close loading: ' + e);
    });
}

/**
 * Goes to RRHH department
 */
function removeLoading(){
    $('.page-content').removeClass('d-none');
    $('.loading-content').addClass('d-none');
}

/**
 * Goes to RRHH department
 */
function addLoading(){
    $('.page-content').addClass('d-none');
    $('.loading-content').removeClass('d-none');
}

/**
 * Checks if the init loading has finished to remove spinner loading
 */
async function checkInitLoading(){
    layouts.initFuncLoads++;
    
    if(layouts.initFuncLoads == layouts.initMaxFuncLoads){
        await closeLoading();
        removeLoading();

        layouts.initFuncLoads = 0;
        
        layouts.canGoBack = true;
    }
}

/**
 * Converts month in number format to text format
 * 
 * @param {int} month Month in number format
 * @return {string} monthText Month in text format
 */
function monthToText(month){
    var monthText = '';
    switch(month){
        case 1:
            monthText = 'Enero';
        break;
        case 2:
            monthText = 'Febrero';
        break;
        case 3:
            monthText = 'Marzo';
        break;
        case 4:
            monthText = 'Abril';
        break;
        case 5:
            monthText = 'Mayo';
        break;
        case 6:
            monthText = 'Junio';
        break;
        case 7:
            monthText = 'Julio';
        break;
        case 8:
            monthText = 'Agosto';
        break;
        case 9:
            monthText = 'Septiembre';
        break;
        case 10:
            monthText = 'Octubre';
        break;
        case 11:
            monthText = 'Noviembre';
        break;
        case 12:
            monthText = 'Diciembre';
        break;
    }
    return monthText;
}

/**
 * Replace all
 * 
 * @param {string} string String
 * @param {string} search Search
 * @param {string} replace 
 */
function replaceAllCustom(string, search, replace){
    return string.split(search).join(replace);
}

/**
 * Formats float number
 * 
 * @param {*} num Number
 */
function toFormatNumber(num){
    return num.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export {
    $,
    
    checkNetworkStatus,
    checkSession,

    layouts,

    openLoading,
    closeLoading,
    addLoading,
    removeLoading,
    showAlert,
    closeAlert,
    checkInitLoading,

    monthToText,
    replaceAllCustom,
    toFormatNumber,
}