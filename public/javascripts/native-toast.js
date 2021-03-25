if (location.href.includes('success')) {
  nativeToast({
    message: 'Success!',
    position: 'north',
    // Self destroy in 5 seconds
    timeout: 5000,
    type: 'success'
  })
}

