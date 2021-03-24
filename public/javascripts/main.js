onload = () => {
  if (location.href.includes('login-required')) {
    alert('You are not allowed. Please log in!')
  } else if (location.href.includes('login-error')) {
    alert('Please log in again!')
  }
}
const logOutBtn = document.querySelector('[data-log="out"]')
if (logOutBtn) {
  logOutBtn.addEventListener('click', () => {
    fetch('/api/v1/logout').then()
  })
}
