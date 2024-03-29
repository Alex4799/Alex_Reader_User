import { createApp } from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue';
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).use(CKEditor).mount('#app')
