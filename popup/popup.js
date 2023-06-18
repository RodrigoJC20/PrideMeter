document.addEventListener('DOMContentLoaded', function() {
    const loginPage = document.getElementById('login-page');
    const homePage = document.getElementById('home-page');
    const section1Button = document.getElementById('section1-button');
    const section2Button = document.getElementById('section2-button');
    const section3Button = document.getElementById('section3-button');
    const section1 = document.getElementById('section1');
    const section2 = document.getElementById('section2');
    const section3 = document.getElementById('section3');
    const navBar = document.getElementById('nav-bar');
    const signInTag = document.getElementById('btnToSignIn');
    const signUpTag = document.getElementById('btnToSignUp');
    const formSignIn = document.getElementById('formSignIn');
    const formSignUp = document.getElementById('formSignUp');

    function showHomePage() {
        loginPage.style.display = 'none';
        homePage.style.display = 'block';
        navBar.style.display = 'block';
    }

    function showSection1() {
        section3.style.display = 'none';
        section2.style.display = 'none';
        section1.style.display = 'block';
    }

    function showSection2() {
        section1.style.display = 'none';
        section3.style.display = 'none';
        section2.style.display = 'block';
    }

    function showSection3() {
        section1.style.display = 'none';
        section2.style.display = 'none';
        section3.style.display = 'block';
    }

    const showSignIn = () => {
        formSignIn.style.display = 'block';
        formSignUp.style.display = 'none';
    }

    const showSignUp = () => {
        formSignIn.style.display = 'none';
        formSignUp.style.display = 'block';
    }

    section1Button.addEventListener('click', function() {
        showSection1();
    });

    section2Button.addEventListener('click', function() {
        showSection2();
    });

    section3Button.addEventListener('click', function() {
        showSection3();
    });

    signInTag.addEventListener('click', (event) => {
        event.preventDefault()
        showSignIn()
    })

    signUpTag.addEventListener('click', (event) => {
        event.preventDefault()
        showSignUp()
    })
});