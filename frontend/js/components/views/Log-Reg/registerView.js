import { renderAppHeader } from '../../layout/header.js'
import { showView } from '../../../navigation.js'
import { apiFetch, API_URL, setAuthToken } from '../../../api.js'

export function renderRegisterView() {
  return `
    <section id="register-view" class="view register-page hidden">

      <div class="register-container-mix">
        <div class="register-left">

          <h2>Already have an account?</h2>
          <button id="show-login" class="login-btn">Log In</button>
        </div>


        <div class="register-right">
          <h2>Create your account</h2>

          <form id="register-form">
            <label for="register-name">Name</label>
            <input type="text" id="register-name" placeholder="Name" required />

            <label for="register-email">Email</label>
            <input type="email" id="register-email" placeholder="Email" required />

            <label for="register-password">Password</label>
            <div class="password-field">
              <input type="password" id="register-password" placeholder="Password" required />
              <button type="button" id="toggle-register-password" class="toggle-pwd-btn">Show</button>
            </div>

            <label for="register-confirm-password">Repeat Password</label>
            <div class="password-field">
              <input type="password" id="register-confirm-password" placeholder="Repeat Password" required />
              <button type="button" id="toggle-register-confirm-password" class="toggle-pwd-btn">Show</button>
            </div>

            <p id="register-error" class="error"></p>
            <button type="submit" class="register-submit-btn">Register</button>
          </form>

        </div>
      </div>
    </section>
  `
}

export function initRegisterView() {
  // envia form registro
  document
    .getElementById('register-form')
    .addEventListener('submit', async (event) => {
      event.preventDefault()
      const name = document.getElementById('register-name').value
      const email = document.getElementById('register-email').value
      const password = document.getElementById('register-password').value
      try {
        // clavo token
        const { token } = await apiFetch(`${API_URL}/users/register`, {
          method: 'POST',
          body: JSON.stringify({ name, email, password })
        })

        //  limpio token si habia
        setAuthToken(null)
        // vuelvo login
        showView('login-view', true)
      } catch (error) {
        document.getElementById('register-error').textContent = error.message
      }
    })

  // ocultar contraseña
  document
    .getElementById('toggle-register-password')
    .addEventListener('click', () => {
      const pasw = document.getElementById('register-password')
      pasw.type = pasw.type === 'password' ? 'text' : 'password'
    })

  document
    .getElementById('toggle-register-confirm-password')
    .addEventListener('click', () => {
      const pasw = document.getElementById('register-confirm-password')
      pasw.type = pasw.type === 'password' ? 'text' : 'password'
    })

  // Volver a login
  document.getElementById('show-login').addEventListener('click', (evlog) => {
    evlog.preventDefault()
    showView('login-view', true)
  })
}
