// Show success message
if (location.href.includes('success')) {
  nativeToast({
    message: 'Success!',
    position: 'north',
    // Self destroy in 5 seconds
    timeout: 3000,
    type: 'success'
  })
}

