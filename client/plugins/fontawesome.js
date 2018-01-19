import Vue from 'vue'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

// import { } from '@fortawesome/fontawesome-free-regular/shakable.js'

import {
  faCaretDown, faUser, faLock, faSignOutAlt, faCog, faUserPlus, faSignInAlt, faLifeRing, faTachometerAlt
} from '@fortawesome/fontawesome-free-solid/shakable.js'

// import {
//   faGithub
// } from '@fortawesome/fontawesome-free-brands/shakable.js'

fontawesome.library.add(
  faCaretDown, faUser, faLock, faSignOutAlt, faCog, faUserPlus, faSignInAlt, faLifeRing, faTachometerAlt
)

fontawesome.config.autoAddCss = false

Vue.component('fa', FontAwesomeIcon)
