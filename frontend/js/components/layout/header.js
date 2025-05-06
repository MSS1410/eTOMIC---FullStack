// header para login y registro

import { initUploadMediaView } from '../views/upload/uploadMediaView.js'
import { initProfileView } from '../views/profile/profileView.js'
import { showView } from '../../navigation.js'

export function renderAuthHeader() {
  return `
    <header class="auth-header">
      <div class="auth-header-content">
        <img src="../assets/elogo.png" alt="ETOMIC Logo" class="auth-logo"/>
        <h1>ETOMIC</h1>
      </div>
    </header>
  `
}

// header completo para home y sub views
export function renderAppHeader() {
  return `
    <header class="app-header">
      <div class="app-header-left">
        <img src="../assets/elogo.png" alt="ETOMIC Logo" class="app-logo"/>
        <h1 class="app-tittle">Electronic Techno Music Events </h1>
      </div>
      <nav class="clicks-subVista">
        <ul>
          <li><a href="#" id="click-upload">Upload Media</a></li>
          <li><a href="#" id="click-tickets">Tickets</a></li>
          <li><a href="#" id="click-profile">Profile</a></li>
          <li><a href="#" id="logOut-click">Log Out</a></li>
        </ul>
        
      </nav>
    </header>
  `
}

export function innitAppHeader() {
  document.getElementById('click-upload')?.addEventListener('click', (ev) => {
    ev.preventDefault()
    showView('upload-media-view', true)
    initUploadMediaView()
  })
  document.getElementById('click-profile')?.addEventListener('click', (ev) => {
    ev.preventDefault()
    showView('profile-view', true)
    initProfileView()
  })
  document.getElementById('logOut-click')?.addEventListener('click', () => {
    sessionStorage.removeItem('token')
    showView('login-view', true)
  })
}
