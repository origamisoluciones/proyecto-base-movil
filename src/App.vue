<template>
	<ion-app>
		<ion-menu content-id="main-content" menu-id="app-menu" class="sidebar-menu" id="appMenu">
			<ion-header>
				<ion-toolbar>
					<ion-title class="ion-text-center">
						<a class="link-route top-title" href="/home">PROYECTO BASE MÓVIL</a>
					</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-content>
				<ion-item lines="none" color="secondary">
					<ion-label class="ion-text-center section-greating">
						<span id="greating"></span> <strong><span id="userName"></span></strong>
					</ion-label>
				</ion-item>

				<ion-accordion-group>
					<ion-accordion  class="ion-no-padding ion-no-margin" value="first">
						<ion-item lines="none" slot="header">
							<ion-label>
								<i class="section-icon fas fa-cog"></i>
								<span class="section-title">Ajustes</span>
							</ion-label>
						</ion-item>
						<div class="ion-no-padding" slot="content">
							<ion-item lines="full" href="/perfil">
								<i class="sub-section-icon fas fa-user"></i>
								<span class="sub-section-title">Perfil</span>
							</ion-item>
						</div>
						<div class="ion-no-padding" slot="content">
							<ion-item lines="full" @click="goLogout()">
								<i class="sub-section-icon fas fa-arrow-right-from-bracket"></i>
								<span class="sub-section-title">Salir</span>
							</ion-item>
						</div>
					</ion-accordion>
				</ion-accordion-group>
			</ion-content>
			<ion-footer>
				
			</ion-footer>
		</ion-menu>
		<ion-router-outlet id="main-content"></ion-router-outlet>
	</ion-app>
</template>

<script>
	import {
		IonApp,
		IonRouterOutlet,
		IonContent,
		IonHeader,
		IonMenu,
		IonTitle,
		IonToolbar,
		IonLabel,
		IonItem,
		IonButton,
		IonAccordion,
		IonAccordionGroup,
		IonFab,
    	IonFabButton,
		IonModal,
		useIonRouter,
		menuController,
		useBackButton
	} from '@ionic/vue';
	import { defineComponent } from 'vue';
	import { useRoute } from 'vue-router';
	import { Network } from '@capacitor/network';
	import { App } from '@capacitor/app';

	import { library } from '@fortawesome/fontawesome-svg-core';
	import { faHome } from '@fortawesome/free-solid-svg-icons';
	import { faUser } from '@fortawesome/free-solid-svg-icons';
	import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
	import { faCog } from '@fortawesome/free-solid-svg-icons';

	library.add(faHome);
	library.add(faUser);
	library.add(faArrowRightFromBracket);
	library.add(faCog);

	import { dom } from "@fortawesome/fontawesome-svg-core";
	dom.watch();

	import defines from './defines.js';
	import * as tools from './tools/tools.js';

	export default defineComponent({
		id: 'com.origamisoluciones.base',
		name: 'App',
		components: {
			IonApp,
			IonRouterOutlet,
			IonContent,
			IonHeader,
			IonMenu,
			IonTitle,
			IonToolbar,
			IonLabel,
			IonItem,
			IonButton,
			IonAccordion,
			IonAccordionGroup,
			IonFab,
        	IonFabButton,
			IonModal
		},
		methods: {
			/**
			 * Goes log out
			 */
			async goLogout(){
				await tools.openLoading();

				tools.layouts.storage.remove('session');

				this.ionRouter.replace('/login');

				menuController.close("app-menu");
			},
			/**
			 * Goes to financial page
			 */
			// async goUsers(){
			// 	this.ionRouter.push('/usuarios');
			// 	menuController.close();
			// },
		},
		setup(){
			/** Ion router object */
			const ionRouter = useIonRouter();

			/** Route object */
			const route = useRoute();

			// Checks network status event
			Network.addListener('networkStatusChange', status => {
				if(status.connected){
					tools.layouts.storage.get('network-status').then(function(result){
						if(result === false || result === null || result === undefined){
							tools.layouts.storage.get('network-connected-last-route').then(function(result){
								if(result != null){
									tools.layouts.storage.set('network-status', true);
									tools.layouts.storage.set('network-connected-last-route', null);

									ionRouter.replace(result);
								}else{
									ionRouter.replace('login');
								}
							});
						}
					})
				}else{
					tools.layouts.storage.get('network-status').then(function(result){
						if(result === true || result === null || result === undefined){
							tools.layouts.storage.set('network-status', false);
							tools.layouts.storage.set('network-connected-last-route', route.path);
							
							ionRouter.replace('no-internet');
						}
					})
				}
			});

			tools.layouts.storage.get('session').then(function(result){
				if(result === undefined || result === null){
					tools.layouts.storage.set('session', defines.API_TOKEN);
				}
			});

			var storageChange = true;
			setInterval(() => {
				tools.layouts.storage.get('storageChange').then(function(result){
					if(result != null && storageChange){
						storageChange = false;
						tools.layouts.storage.remove('storageChange');
					}
				});
			}, 1000);

			/**
			 * Back button manager
			 */
			useBackButton(10, () => {
				if(tools.layouts.canGoBack){
					tools.layouts.canGoBack = false;
					if(!ionRouter.canGoBack()){
						App.exitApp();
					}else{
						ionRouter.back();
					}
				}
			});

			return { ionRouter };
		}
	});
</script>