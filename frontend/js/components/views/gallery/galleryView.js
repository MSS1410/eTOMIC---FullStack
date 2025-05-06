import { apiFetch, API_URL } from '../../../api.js'
import { showView } from '../../../navigation.js'

export function renderGalleryView() {
  return `
    <section id="gallery-view" class="view hidden">
      <button class="back-btn" id="galleryBack">Back</button>
   
      <div id="gallery-mosaic-view" class="gallery-mosaic hidden"></div>
      <div id="gallery-list-view" class="gallery-list"></div>
    </section>
  `
}

export async function initGalleryView() {
  showView('gallery-view')

  // back en home
  document.getElementById('galleryBack')?.addEventListener('click', (e) => {
    e.preventDefault()
    showView('main-menu-view', true)
  })
  // quito mosaico y muestro eventos
  document.getElementById('gallery-mosaic-view').classList.add('hidden')
  const listView = document.getElementById('gallery-list-view')
  listView.innerHTML = ''

  try {
    // fecth
    const events = await apiFetch(`${API_URL}/events/attended`)
    const media = await apiFetch(`${API_URL}/event-media`)

    // cada evento con su conectada imagen
    const mediaByEvent = media.reduce((acc, item) => {
      const id = typeof item.event === 'string' ? item.event : item.event._id // saco el id del evento si es objeto extraigo ._id.

      // acc es objeto empty donde metere grupos   // me aseguro de que exista
      acc[id] = acc[id] || []
      //  añado item a array correspondiente por id
      acc[id].push(item)
      return acc
    }, {})

    // por cada evento dejo 5 imagenes maximo
    events.forEach((ev) => {
      const imgs = mediaByEvent[ev._id.toString()].slice(0, 5)
      const section = document.createElement('div')
      section.className = 'gallery-event-section'
      section.innerHTML = `
 
          <h3>${ev.title}</h3> 
          
          <div class="gallery-event-imgs">
            ${imgs
              .map((img) => `<img src="${img.imageUrl}" alt="${ev.title}" />`)
              .join('')}
          </div>
        `
      listView.appendChild(section)
    })
  } catch (error) {
    console.error('Error loading gallery list by event:', error)
    listView.innerHTML = '<p class="error">Error while loading GALLERYTY.</p>'
  }
}

// inyecto ev.title
// por cada img del array le coloco el titulo inyectado antes y los uno en string con join OK
