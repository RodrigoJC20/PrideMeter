async function submitReview(ratedUser, rating, ratedBy, comment) {
    const url = `https://extensionpracticefunc.azurewebsites.net/api/submitReview?ratedUser=${encodeURIComponent(ratedUser)}&rating=${encodeURIComponent(rating)}&ratedBy=${encodeURIComponent(ratedBy)}&comment=${encodeURIComponent(comment)}`;
  
    try {
      const response = await fetch(url);
      return response
    } catch (error) {
      // Handle error
    }
  }
  
  window.submitReview = submitReview;
  