import Vue from 'vue'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

//! https://fontawesome.com/how-to-use/use-with-node-js#tree-shaking
//! available alias = fs fab far fal
// import { } from '@fortawesome/fontawesome-free-regular'

import {
    faCommentAlt, faMapMarker, faMap, faBuilding, faFlag, faPhone, faRecycle, faLink, faIdCard, faCheckCircle, faUserCircle, faHome, faArrowLeft, faUndo, faEye, faEyeSlash, faEnvelope, faCaretDown, faUser, faLock, faSignOutAlt, faCog, faUserPlus, faSignInAlt, faLifeRing, faTachometerAlt
} from '@fortawesome/fontawesome-free-solid'
// import {
//   faGithub
// } from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(
    faCommentAlt, faMapMarker, faMap, faBuilding, faFlag, faPhone, faRecycle, faLink, faIdCard, faCheckCircle, faUserCircle, faHome, faArrowLeft, faUndo, faEye, faEyeSlash, faEnvelope, faCaretDown, faUser, faLock, faSignOutAlt, faCog, faUserPlus, faSignInAlt, faLifeRing, faTachometerAlt
)

fontawesome.config.autoAddCss = false

Vue.component('fa', FontAwesomeIcon)
