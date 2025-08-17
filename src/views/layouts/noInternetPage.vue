<template>
	<ion-page class="no-internet-page">
		<ion-content :fullscreen="true" color="primary">
			<div class="content">
				<ion-card class="block-login">
					<ion-card-header>
						<ion-card-title class="ion-text-center">
							PROYECTO BASE MÓVIL
						</ion-card-title>
					</ion-card-header>
					<ion-card-content>
						<p class="ion-text-center"><strong>Lo sentimos, parece que no tienes conexión a internet.</strong></p>
					</ion-card-content>
				</ion-card>
			</div>
		</ion-content>
	</ion-page>
</template>

<script src="./noInternet.js"></script>