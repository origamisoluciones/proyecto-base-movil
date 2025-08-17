<template>
	<ion-page class="page recover-password-page d-none">
		<ion-content :fullscreen="true">
			<ion-grid class="recover-password-grid">
				<ion-row>
					<ion-col size="0" size-sm="1" size-md="2" size-lg="3" size-xl="4"></ion-col>
					<ion-col size="12" size-sm="10" size-md="8" size-lg="6" size-xl="4">
						<ion-card class="block-login">
							<ion-card-header>
								<ion-card-title class="ion-text-center">
									PROYECTO BASE MÓVIL
								</ion-card-title>
							</ion-card-header>
							<ion-card-content>
								<ion-input
									type="email"
									class="ion-touched"
									name="email"
									id="email"
									placeholder="Correo..."
									label="Correo"
									label-placement="stacked"
									@ionInput="validate($event, ['isRequired', 'isEmail'], 'email')"
								></ion-input>
								<ion-button type="button" id="goRecoverPassword" color="primary" expand="block" @click="goRecoverPassword()">Recupera tu contraseña</ion-button>
								<ion-button color="secondary" expand="block" @click="goBack()">Volver</ion-button>
							</ion-card-content>
						</ion-card>
					</ion-col>
					<ion-col size="0" size-sm="1" size-md="2" size-lg="3" size-xl="4"></ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>

<script src="./recoverPasswordPage.js"></script>