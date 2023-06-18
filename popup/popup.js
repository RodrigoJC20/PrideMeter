document.addEventListener('DOMContentLoaded', async function() {

    await getCurrentTab()

    const loginPage = document.getElementById('login-page');
    const homePage = document.getElementById('home-page');
    const navBar = document.getElementById('nav-bar');
    const signInTag = document.getElementById('btnToSignIn');
    const signUpTag = document.getElementById('btnToSignUp');
    const formSignIn = document.getElementById('formSignIn');
    const formSignUp = document.getElementById('formSignUp');
    const btnSignIn = document.getElementById('subSignInBtn');
    const btnSignUp = document.getElementById('subSignUpBtn');
    const btnSubmit = document.getElementById('submit-review');

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
    
    btnSignIn.addEventListener('click', async (event) => {
        event.preventDefault()

        const usernameInput = document.getElementById('signin-name');
        const passwordInput = document.getElementById('signin-password');

        const username = usernameInput.value;
        const password = passwordInput.value;

        await loginUser(username, password)
            .then(async (response) => {
                await chrome.storage.sync.set({ user: username });
            })
            .catch((error) => {
                console.log(error);
            });

        showHomePage()
    })

    btnSignUp.addEventListener('click', async () => {

        const usernameInput = document.getElementById('signup-name');
        const passwordInput = document.getElementById('signup-password');
    
        const username = usernameInput.value;
        const password = passwordInput.value;

        await registerUser(username, password)
            .then(async (response) => {
                await chrome.storage.sync.set({ user: username });
            })
            .catch((error) => {
                console.log(error);
            });
    
        showHomePage();
    });

    btnSubmit.addEventListener('click', async () => {
        const data = await chrome.storage.sync.get(["user"]);

        console.log(data)

        const reviewInput = document.getElementById('review');
        const rateInput = document.getElementById('rate-num');
        const rate = rateInput.value;
        const review = reviewInput.value;

        // await submitReview(username, review)
        //     .then((response) => {
        //         console.log(response);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    })

    signInTag.addEventListener('click', (event) => {
        event.preventDefault()
        showSignIn()
    })

    signUpTag.addEventListener('click', async (event) => {
        ratedUser = "RodrigoJC20";
        rating = 99;
        ratedBy = "Mikel";
        comment = "He is pretty cool and trustworthy";

        await submitReview(ratedUser, rating, ratedBy, comment)
            .then(() => {
                console.log("Review Subida");
            })
            .catch((error) => {
                console.log(error);
            });
        

        event.preventDefault()
        showSignUp()
    })
});

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