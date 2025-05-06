import { apiFetch, API_URL } from '../../../api.js'
import { showView } from '../../../navigation.js'

export function renderAttendedEventDetailView() {
  return `
    <section id="attended-event-detail-view" class="view hidden">
      <button class="back-btn" id="attended-detail-back">Back to Events</button>
      
      <div id="attended-event-info-container"></div>
    </section>
  `
}

export function initAttendedEventDetailView() {
  document
    .getElementById('attended-detail-back')
    ?.addEventListener('click', (eve) => {
      eve.preventDefault()
      showView('attended-events-view', true)
    })
}

export async function loadAttendedEventDetail(eventId) {
  const app = document.getElementById('app')
  if (!document.getElementById('attended-event-detail-view')) {
    app.insertAdjacentHTML('beforeend', renderAttendedEventDetailView())
    initAttendedEventDetailView()
  }
  // uso insertAdjacent tomo como argumento el beforeend que qeuivale a un app.appendchild()
  // asi inserto el detelle del evento dentro de app despues de los renders que ya tengo
  showView('attended-event-detail-view', true)

  const infoContainer = document.getElementById('attended-event-info-container')
  infoContainer.innerHTML = ''

  try {
    const ev = await apiFetch(`${API_URL}/events/${eventId}`)
    infoContainer.innerHTML = `
      <div class="detail-card">
        <h2>${ev.title}</h2>
        <p><strong>Fecha:</strong> ${new Date(ev.date).toLocaleDateString()}</p>
        <h3>${ev.description}</h3>
        <img src="${ev.image}" alt="${ev.title}" />
      </div>
    `
  } catch (err) {
    console.error('Error cargando detalle de evento:', err)
    infoContainer.innerHTML = '<p class="error">Cannot load detail section.</p>'
  }
}
