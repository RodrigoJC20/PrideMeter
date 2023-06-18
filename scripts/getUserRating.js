async function getUserRating(username) {
    const url = "https://extensionpracticefunc.azurewebsites.net/api/getUserReputation?username=" + username
    
    const response = await fetch(url);
      
    if (response.ok) {
      // Extract the username from the response
      return response.json();
    } else {
      // Handle error cases
      throw new Error('Invalid username');
    }
}

window.getUserRating = getUserRating;