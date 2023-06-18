async function loginUser(username, password) {
    const url = `https://extensionpracticefunc.azurewebsites.net/api/userLogin?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
  
    try {
      const response = await fetch(url)

      return response;
    } catch (error) {
      // Handle network or other errors
      throw new Error('An error occurred while processing the request.');
    }
}

window.loginUser = loginUser;