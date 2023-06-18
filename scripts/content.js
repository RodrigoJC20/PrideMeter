(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log("content.js loaded");

        const username = chrome.storage.sync.get(["user"])

        console.log(username)

        if (username) {
            document.getElementById('login-page').loginPage.style.display = 'none';
            document.getElementById('home-page').homePage.style.display = 'block';
            document.getElementById('nav-bar').navBar.style.display = 'block';  
        }
    });
})();