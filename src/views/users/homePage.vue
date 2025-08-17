<template color="primary">
	<ion-page class="page home-page" id="main-content">
		<ion-header class="page-header">
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button></ion-menu-button>
				</ion-buttons>
				<ion-title>Inicio</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true" class="content-scroll">
			<div class="page-content d-none">
				PROYECTO BASE MOVIL
			</div>
		</ion-content>

		<ion-footer class="page-footer">
			<ion-toolbar>
				<ion-tabs>
					<ion-router-outlet></ion-router-outlet>
					<ion-tab-bar slot="bottom">
						<ion-tab-button tab="home" href="/home">
							<i class="tab-icon fas fa-home"></i>
							<span class="tab-text">Inicio</span>
						</ion-tab-button>
					</ion-tab-bar>
				</ion-tabs>
			</ion-toolbar>
		</ion-footer>
	</ion-page>
</template>

<script src="./homePage.js"></script>