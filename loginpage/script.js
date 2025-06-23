
  function logout() {
    // Optional: clear local storage
    localStorage.removeItem('user');

    // Redirect to login page
    window.location.href = 'login.html';
  }

