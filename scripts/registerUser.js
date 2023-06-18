async function registerUser(username, password) {
    const url = `https://extensionpracticefunc.azurewebsites.net/api/registerUser?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
  
    try {
      const response = await fetch(url);
      // Handle the response
    } catch (error) {
      // Handle error
    }
  }
  
  window.registerUser = registerUser;
  