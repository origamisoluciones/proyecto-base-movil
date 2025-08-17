<template>
	<ion-page class="page login-page d-none">
		<ion-content :fullscreen="true">
			<ion-grid class="login-grid">
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
									placeholder="Correo electrónico..."
									value=""
									label="Correo electrónico"
									label-placement="stacked"
									@ionInput="validate($event, ['isRequired', 'isEmail'], 'email')"
								></ion-input>
								<ion-input
									type="password"
									class="ion-touched"
									name="password"
									id="password"
									placeholder="Contraseña..."
									value=""
									label="Contraseña"
									label-placement="stacked"
									@ionInput="validate($event, ['isRequired'], 'password')"
								></ion-input>
								<ion-button type="button" id="goLogin" color="primary" expand="block" @click="goLogin()">Acceder</ion-button>
								<ion-button color="medium" expand="block" @click="goRecoverPassword()">¿Has olvidado tu contraseña?</ion-button>
								<div class="ion-text-center">
									<ion-text>¿Todavía no tienes una cuenta? Regístrate <span class="go-register" @click="goRegister()">aquí</span></ion-text>
								</div>
							</ion-card-content>
						</ion-card>
					</ion-col>
					<ion-col size="0" size-sm="1" size-md="2" size-lg="3" size-xl="4"></ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>

<script src="./loginPage.js"></script>