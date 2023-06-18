async function loginUser(username, password) {
    const url = `https://extensionpracticefunc.azurewebsites.net/api/userLogin?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
  
    try {
      const response = await fetch(url);
      
      if (response.ok) {
        // Extract the username from the response
        const username = await response.text();
        return username;
      } else {
        // Handle error cases
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      // Handle network or other errors
      throw new Error('An error occurred while processing the request.');
    }
}

window.loginUser = loginUser;
  