import Vue from 'vue'

//! Based Components Needed
//! Just Import The vuetify components in the component if needed
//! To Get A Lower Bundle Size
import {
    transitions,
    VApp,
    VBtn,
    VCard,
    VGrid,
    VToolbar,
    VProgressCircular,
    VList,
    Vuetify
} from 'vuetify'

//! Available Directives : ClickOutside, Ripple, Resize, Scroll, Touch
import { Ripple } from 'vuetify/es5/directives'

Vue.use(Vuetify, {
    components: {
        transitions,
        VApp,
        VBtn,
        VCard,
        VGrid,
        VToolbar,
        VList,
        Vuetify,
        VProgressCircular
    },
    directives: {
        Ripple
    },
    //! Define Your Theme Here
    theme: {
        primary: '#ef9a9a',
        secondary: '#607d8b',
        accent: '#4db6ac',
        error: '#b71c1c',
        info: '#bbdefb',
        success: '#a5d6a7',
        warning: '#ffc107'
    }
})
