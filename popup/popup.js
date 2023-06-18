document.addEventListener('DOMContentLoaded', async function() {

    await getCurrentTab()

    const loginPage = document.getElementById('login-page');
    const homePage = document.getElementById('home-page');
    const ratingPage = document.getElementById('rating-page');
    const navBar = document.getElementById('nav-bar');
    const signInTag = document.getElementById('btnToSignIn');
    const signUpTag = document.getElementById('btnToSignUp');
    const formSignIn = document.getElementById('formSignIn');
    const formSignUp = document.getElementById('formSignUp');
    const btnSignIn = document.getElementById('subSignInBtn');
    const btnSignUp = document.getElementById('subSignUpBtn');
    const btnSubmit = document.getElementById('submit-review');
    const commentDiv1 = document.getElementById('comment1');
    const commentDiv2 = document.getElementById('comment2');

    function showHomePage() {
        loginPage.style.display = 'none';
        homePage.style.display = 'block';
    }

    const showSignIn = () => {
        formSignIn.style.display = 'block';
        formSignUp.style.display = 'none';
    }

    const showSignUp = () => {
        formSignIn.style.display = 'none';
        formSignUp.style.display = 'block';
    }

    const showRating = async (ratedUser) => {
        loginPage.style.display = 'none';
        homePage.style.display = 'none';
        ratingPage.style.display = 'block';

        const name = document.getElementById('current-user2');
        const rating = document.getElementById('user-rating')

        const rate = await getUserRating(ratedUser)

        const comments = await getUserComments(ratedUser)

        name.innerHTML = ratedUser;
        rating.innerHTML = rate[0].average.toFixed(2)
        commentDiv1.innerHTML = comments[0].comment
        commentDiv2.innerHTML = comments[1].comment
    }
    
    btnSignIn.addEventListener('click', async (event) => {
        event.preventDefault()

        const usernameInput = document.getElementById('signin-name');
        const passwordInput = document.getElementById('signin-password');

        const username = usernameInput.value;
        const password = passwordInput.value;

        await loginUser(username, password)
            .then(async (response) => {
                userSession = username
                await chrome.storage.sync.set({ user: username });
            })
            .catch((error) => {
                console.log(error);
            });

        showHomePage()
    })

    btnSignUp.addEventListener('click', async (event) => {
        event.preventDefault()

        const usernameInput = document.getElementById('signup-name');
        const passwordInput = document.getElementById('signup-password');
    
        const username = usernameInput.value;
        const password = passwordInput.value;

        await registerUser(username, password)
            .then(async (response) => {
                await chrome.storage.sync.set({ user: username });
                userSession = username
            })
            .catch((error) => {
                console.log(error);
            });
    
        showHomePage();
    });

    btnSubmit.addEventListener('click', async () => {
        const ratedBy = userSession;

        const reviewInput = document.getElementById('review');
        const rateInput = document.getElementById('rate-num');
        const rate = parseInt(rateInput.value);
        const review = reviewInput.value;
        const ratedUser = document.getElementById('current-user').innerHTML;

        console.log(ratedUser, rate, ratedBy, review)

        await submitReview(ratedUser, rate, ratedBy, review)
            .then(async (response) => {
                await showRating(ratedUser)
            })
            .catch((error) => {
                console.log(error);
            });
    })

    signInTag.addEventListener('click', (event) => {
        event.preventDefault()
        showSignIn()
    })

    signUpTag.addEventListener('click', (event) => {
        event.preventDefault()
        showSignUp()
    })
});

let userSession
let accessToken

const getCurrentTab = async () => {
    const activeTab = await getActiveTabURL();
    const url = activeTab.url.split("/");
    const activeUser = url[url.length - 1];

    

    if (activeTab.url.includes("twitter.com/") && activeUser != "home") {
        const user = document.getElementById('current-user');
        user.innerHTML = activeUser;
    } else {
        const container = document.getElementById("main-content");
    
        container.innerHTML = '<div class="title">This is not a twitter profile.</div>';
    }
}

async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });

    return tabs[0];
}