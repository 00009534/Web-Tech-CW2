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
const loginForm = document.querySelector('.login-form')
const createEmployeeForm = document.querySelector('.create-employee-form')
const updateEmployeeForm = document.querySelector('.update-employee-form')
if (loginForm) {
  validateForm(loginForm)
} else if (createEmployeeForm) {
  validateForm(createEmployeeForm)
}
if (updateEmployeeForm) {
  validateForm(updateEmployeeForm)
}


function validateForm(form) {
  addEventValidations(form)
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputs = Array.from(form.inputs)
    const isValid = inputs.some(el => {
      validateInputs(el)
      return el.isValid === false
    })
    if (!isValid) {
      form.submit()
    }
  })
}

function addEventValidations(form) {
  form.inputs = form.querySelectorAll('input')
  form.inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateInputs(input)
    })
  })
}

function validateInputs(input) {
  if (input.type === 'file') {
    return input.isValid = true
  }
  if (input.value === '') {
    input.classList.remove('success')
    input.classList.add('error')
    input.placeholder = 'This field cannot be empty'
    input.isValid = false
  } else {
    input.classList.remove('error')
    input.classList.add('success')
    input.isValid = true
  }
}

