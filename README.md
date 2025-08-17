# Pre-requisites
## Install chocolatey
- https://chocolatey.org/install

## Install npm
- chocolatey install npm
- node --version
- npm --version

## Install ionic
- npm install -g @ionic/cli@latest 

# Getting started
## Start an app
- ionic start myApp blank --type vue --package-id com.domain.name
- cd myApp
- ionic serve

## Change TypeScript by JavaScript
- npm uninstall --save typescript @types/jest @typescript-eslint/eslint-plugin @typescript-eslint/parser @vue/cli-plugin-typescript @vue/eslint-config-typescript vue-tsc
- Change all .ts files to .js. In a blank Ionic Vue app, this should only be router/index.ts and main.ts
- Remove @vue/typescript/recommended and @typescript-eslint/no-explicit-any: ‘off’, from .eslintrc.js
- Remove Array<RouteRecordRaw> from router/index.js
- Delete the shims-vue.d.ts file
- Delete the src/vite-env.d.ts file if it exists
- Remove lang="ts" from the script tags in any of your Vue components that have them. In a blank Ionic Vue app, this should only be App.vue and views/Home.vue
- In package.json, change the build script from "build": "vue-tsc && vite build" to "build": "vite build"
- Install terser npm i -D terser.
- Remove import { RouteRecordRaw } from 'vue-router'; from index.js
- At index.html change <script type="module" src="/src/main.ts"></script> to <script type="module" src="/src/main.js"></script>

# Plugins
## Storage
- npm install @ionic/storage

## jQuery
### Install
- npm install jquery

### Use
- import $ from "jquery";

## Md5
### Install
- npm install md5

### Use
- var md5 = require('md5');

## Md5
### Install
- npm install moment

### Use
- var moment = require('moment');

## Network
### Install
- npm install @capacitor/network
- npx cap sync

### Use
import { Network } from '@capacitor/network';

## Swiper (slides)
### Install
- npm install swiper

### Use
import { Swiper, SwiperSlide } from "swiper/vue";

## Filesystem
### Install
- npm install @capacitor/filesystem

### Use
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

## Fontawesome
### Install
- npm i --save @fortawesome/vue-fontawesome
- npm i --save @fortawesome/fontawesome-svg-core
- npm i --save @fortawesome/free-solid-svg-icons
- npm i --save @fortawesome/free-regular-svg-icons
- npm i --save @fortawesome/free-brands-svg-icons

### Use
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
library.add(faFolder);

import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

const app = createApp(App)
	.use(IonicVue, {
		// mode: 'ios',
		innerHTMLTemplatesEnabled: true
	})
	.use(router)
	.component('font-awesome-icon', FontAwesomeIcon)
;

## Splash Screen
### Install
- npm install @capacitor/assets --save-dev

resources/
├── icon-only.png
├── icon-foreground.png
├── icon-background.png
├── splash.png
└── splash-dark.png

npx capacitor-assets generate

https://capacitorjs.com/docs/guides/splash-screens-and-icons

## Datatables
### Install
- npm install --save datatables.net-dt
- npm install --save datatables.net-vue3
- npm install --save datatables.net-select
- npm install --save datatables.net-responsive
- npm install --save datatables.net-responsive-dt

### Use
import DataTable from 'datatables.net-dt';
import DataTable from 'datatables.net-vue3';

DataTable.use(DataTablesCore);

https://datatables.net/manual/vue

## JS Year calendar
### Install
- npm install js-year-calendar

### Use
import Calendar from 'js-year-calendar';
import 'js-year-calendar/dist/js-year-calendar.css';
import 'js-year-calendar/locales/js-year-calendar.es';

## Browser
### Install
- npm install @capacitor/browser
- npx cap sync

### Use
import { Browser } from '@capacitor/browser';

Browser.open({
	url: 'https://...'
});

# Dev code
## Dark / Light mode
<ion-list :inset="true">
	<ion-item>
		<ion-toggle :checked="paletteToggle" @ionChange="toggleChange($event)" justify="space-between">Dark Mode</ion-toggle>
	</ion-item>
</ion-list>

setup(){
	const toggleDarkPalette = (shouldAdd) => {
		document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
	};

	const toggleChange = (ToggleCustomEvent) => {
		toggleDarkPalette(event.detail.checked);
	};

	return{
		toggleChange,
		toggleDarkPalette
	};
}

# Deploy Android
- ionic capacitor add android (only first time)
- ionic capacitor copy android
- npx cap copy
- npx cap sync
- npx cap open android

# Android Store
- Cambiar los siguientes datos en /android/app/build.gradle
	versionCode 17
	versionName "1.10"

En Android Studio:
- Build -> Generate Signed Bundle / APK
- Elegir Android App Bundle
- Seleccionar las claves (ya están por defecto)
- Seleccionar release
- Archivo generado en android/app/release/app-release.aab

Android Store
- Subir el archivo a la Android Store

# Deploy iOS
- ionic capacitor add ios (only first time)
...