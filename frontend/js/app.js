// js/app.js
import { renderAuthHeader } from './components/layout/header.js'

import { showView } from './navigation.js'

import {
  renderLoginView,
  initLoginView
} from './components/views/Log-Reg/loginView.js'

import {
  initRegisterView,
  renderRegisterView
} from './components/views/Log-Reg/registerView.js'

import {
  renderHomeView,
  initHomeView
} from './components/views/home/homeView.js'

import {
  renderUpcomingEventsView,
  initUpcomingEventsView
} from './components/views/upcoming/upcomingEventsView.js'

import {
  renderAttendedEventsView,
  initAttendedEventsView
} from './components/views/attended/attendedEventsView.js'

import {
  renderAttendedEventDetailView,
  initAttendedEventDetailView
} from './components/views/attended/attendedEventDetailView.js'

import {
  renderGalleryView,
  initGalleryView
} from './components/views/gallery/galleryView.js'

import {
  renderUploadMediaView,
  initUploadMediaView
} from './components/views/upload/uploadMediaView.js'

import {
  renderProfileView,
  initProfileView
} from './components/views/profile/profileView.js'

import { renderFooter } from './components/layout/footer.js'

// RENDERS
const app = document.getElementById('app')
app.innerHTML = `
<div id="header-container">
${renderAuthHeader()}

</div>

<main class="main-content">
  ${renderLoginView()}
  ${renderRegisterView()}
  ${renderHomeView()}
  ${renderUpcomingEventsView()}
  ${renderAttendedEventsView()}
  ${renderAttendedEventDetailView()}
  ${renderGalleryView()}
  ${renderUploadMediaView()}
  ${renderProfileView()}
</main>
${renderFooter()}
`

// fuerzo el login e inicio los init en el DOM
document.addEventListener('DOMContentLoaded', () => {
  // inits
  initLoginView()
  initRegisterView()
  initHomeView()
  initUpcomingEventsView()
  initAttendedEventsView()
  initAttendedEventDetailView()
  initGalleryView()
  initUploadMediaView()

  // Login
  showView('login-view', true)
})
