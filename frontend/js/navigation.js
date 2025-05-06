// historial back
let viewHistory = []

export function showView(viewId, clearHistory = false) {
  if (clearHistory) viewHistory = []
  const current = document.querySelector('.view:not(.hidden)')
  if (current && current.id !== viewId) viewHistory.push(current.id)

  document.querySelectorAll('.view').forEach((v) => v.classList.add('hidden'))
  const target = document.getElementById(viewId)
  if (target) target.classList.remove('hidden')

  // header logim y registro
  document
    .getElementById('auth-header')
    ?.classList.toggle(
      'hidden',
      !(viewId === 'login-view' || viewId === 'register-view')
    )

  // header para app
  document
    .getElementById('main-header')
    ?.classList.toggle('hidden', viewId !== 'main-menu-view')

  // quito para login
  document
    .getElementById('view-header')
    ?.classList.toggle(
      'hidden',
      ['login-view', 'register-view', 'main-menu-view'].includes(viewId)
    )
}

export function goBack() {
  const prev = viewHistory.pop() || 'main-menu-view'
  showView(prev)
}
