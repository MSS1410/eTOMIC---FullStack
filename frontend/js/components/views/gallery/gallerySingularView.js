import { apiFetch, API_URL } from '../../../api.js'
import { showView } from '../../../navigation.js'

export function renderGallerySingularView() {
  return `
    <section id="gallery-singular-view" class="view hidden">
      <button class="back-btn" id="gallerySingularBack">Back to Gallery</button>
      <button class="back-btn" id="gallerySingularBackEvents">Back to Attended Events</button>
      <h2 id="gallery-singular-title"></h2>
      <div id="gallery-singular-container" class="images-list"></div>
    </section>
  `
}

export async function initGallerySingularView(eventId) {
  // asigno en main para los estilos
  const main = document.querySelector('main.main-content')

  // before end para la subview
  if (!document.getElementById('gallery-singular-view')) {
    main.insertAdjacentHTML('beforeend', renderGallerySingularView())
  }

  showView('gallery-singular-view')
  // back
  document
    .getElementById('gallerySingularBack')
    .addEventListener('click', () => {
      showView('gallery-view')
    })

  document
    .getElementById('gallerySingularBackEvents')
    .addEventListener('click', () => {
      showView('attended-events-view', true)
    })

  // titulo para cada evento
  const titleEl = document.getElementById('gallery-singular-title')
  const ev = await apiFetch(`${API_URL}/events/${eventId}`)
  titleEl.textContent = ev.title

  const container = document.getElementById('gallery-singular-container')
  container.innerHTML = ''
  try {
    const media = await apiFetch(`${API_URL}/event-media/${eventId}`)
    if (!Array.isArray(media) || media.length === 0) {
      container.innerHTML = '<There are no images to cover this event.</p>'
    } else {
      media.forEach((item) => {
        const img = document.createElement('img')
        img.src = item.imageUrl
        img.alt = ev.title
        container.appendChild(img)
      })
    }
  } catch (err) {
    console.error('Error loading singular gallery:', err)
    container.innerHTML =
      '<p class="error">Error while loading gallery detail.</p>'
  }
}
