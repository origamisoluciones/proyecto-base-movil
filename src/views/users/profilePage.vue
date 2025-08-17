<template color="primary">
	<ion-page class="page profile-page" id="main-content">
		<ion-header class="page-header">
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button></ion-menu-button>
				</ion-buttons>
				<ion-title>Perfil</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true" class="content-scroll">
			<div class="page-content d-none">
                <ion-accordion-group>
                    <ion-accordion value="first">
                        <ion-item slot="header" color="secondary">
                            <ion-label>Información personal</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">
                            <ion-grid>
                                <ion-row>
                                    <ion-col size="12" size-sm="8" size-md="4" size-lg="4" size-xl="3">
                                        <ion-input
                                            type="email"
                                            class="ion-touched"
                                            name="email"
                                            id="email"
                                            placeholder="Correo electrónico..."
                                            label="Correo electrónico"
                                            label-placement="stacked"
                                            @ionInput="validate($event, ['isRequired', 'isEmail', 'checksMaxLength'], 'email', 100)"
                                        ></ion-input>
                                    </ion-col>
                                    <ion-col size="12" size-sm="6" size-md="6" size-lg="4" size-xl="3">
                                        <ion-input
                                            type="text"
                                            class="ion-touched"
                                            name="userName"
                                            id="userName"
                                            placeholder="Nombre..."
                                            label="Nombre"
                                            label-placement="stacked"
                                            @ionInput="validate($event, ['isRequired', 'checksMaxLength'], 'userName', 50)"
                                        ></ion-input>
                                    </ion-col>
                                    <ion-col size="12" size-sm="6" size-md="6" size-lg="4" size-xl="3">
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
                                    </ion-col>
                                    <ion-col size="12">
                                        <ion-button color="primary" id="goSaveProfile" @click="goSaveProfile()">Guardar</ion-button>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </div>
                    </ion-accordion>
                </ion-accordion-group>
                <ion-accordion-group>
                    <ion-accordion value="second">
                        <ion-item slot="header" color="secondary">
                            <ion-label>Seguridad</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">
                            <ion-grid>
                                <ion-row>
                                    <ion-col size="12" size-sm="6" size-md="6" size-lg="4" size-xl="3">
                                        <ion-input
                                            type="password"
                                            class="ion-touched"
                                            name="currentPassword"
                                            id="currentPassword"
                                            placeholder="Contraseña actual..."
                                            label="Contraseña actual"
                                            label-placement="stacked"
                                            @ionInput="validate($event, ['isRequired', 'isPassword'], 'currentPassword')"
                                        ></ion-input>
                                    </ion-col>
                                    <ion-col size="12" size-sm="6" size-md="6" size-lg="4" size-xl="3">
                                        <ion-input
                                            type="password"
                                            class="ion-touched"
                                            name="newPassword"
                                            id="newPassword"
                                            placeholder="Nueva contraseña..."
                                            label="Nueva contraseña"
                                            label-placement="stacked"
                                            @ionInput="validate($event, ['isRequired', 'isPassword'], 'newPassword')"
                                        ></ion-input>
                                    </ion-col>
                                    <ion-col size="12" size-sm="6" size-md="6" size-lg="4" size-xl="3">
                                        <ion-input
                                            type="password"
                                            class="ion-touched"
                                            name="newPasswordConfirm"
                                            id="newPasswordConfirm"
                                            placeholder="Repite contraseña..."
                                            label="Repite contraseña"
                                            label-placement="stacked"
                                            @ionInput="validate($event, ['isRequired', 'isPassword'], 'newPasswordConfirm')"
                                        ></ion-input>
                                    </ion-col>
                                    <ion-col size="12">
                                        <ion-button color="primary" id="goSavePassword" @click="goSavePassword()">Guardar</ion-button>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </div>
                    </ion-accordion>
                </ion-accordion-group>
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

<script src="./profilePage.js"></script>