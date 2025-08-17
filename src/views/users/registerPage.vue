<template>
	<ion-page class="page register-page d-none">
		<ion-content :fullscreen="true">
			<ion-grid class="register-grid">
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
									@ionInput="validate($event, ['isRequired', 'isEmail', 'checksMaxLength'], 'email', 100)"
								></ion-input>
								<ion-input
									type="password"
									class="ion-touched"
									name="password"
									id="password"
									placeholder="Contraseña..."
									label="Contraseña"
									label-placement="stacked"
									@ionInput="validate($event, ['isRequired', 'isPassword', 'checksMaxLength'], 'password', 25)"
								>
									<ion-input-password-toggle slot="end"></ion-input-password-toggle>
								</ion-input>
								<ion-input
									type="text"
									class="ion-touched"
									name="userName"
									id="userName"
									placeholder="Nombre..."
									label="Nombre"
									label-placement="stacked"
									@ionInput="validate($event, ['isRequired', 'checksMaxLength'], 'userName', 25)"
								></ion-input>
								<ion-input
									type="text"
									class="ion-touched"
									name="userSurname"
									id="userSurname"
									placeholder="Apellidos..."
									label="Apellidos"
									label-placement="stacked"
									@ionInput="validate($event, ['isRequired', 'checksMaxLength'], 'userSurname', 50)"
								></ion-input>
								<ion-button type="button" id="goRegister" color="primary" expand="block" @click="goRegister()">Regístrate</ion-button>
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

<script src="./registerPage.js"></script>