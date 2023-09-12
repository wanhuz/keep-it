// import './components/wysiwyg/tiptap.js';
// import './components/card/card.js';
// import './components/sidebar/sidebar.js';
// import './components/editor/edit.js';
// import './misc/misc.js';
// import './components/search/search.js';
// import './init.js';

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js"
import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

createInertiaApp({
    resolve: (name) => resolvePageComponent(`./views/${name}.vue`, import.meta.glob('./views/**/*.vue')),
    setup({ el, App, props, plugin }) {
      return createApp({ render: () => h(App, props) })
        .use(plugin, bootstrap)
        .mount(el)
    },
  });
  