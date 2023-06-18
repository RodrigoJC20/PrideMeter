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

    const loginButton = document.getElementById('login-button');

    loginButton.addEventListener('click', async function() {
        console.log("Hola, si srive el boton :D")

        const username = 'yohn';
        const password = '1234';

        await registerUser(username, password)
            .then(() => {
                console.log("Usuario registrado");
            })
            .catch((error) => {
                console.log(error);
            });
        

        showHomePage();
    });

    section1Button.addEventListener('click', function() {
        showSection1();
    });

    section2Button.addEventListener('click', function() {
        showSection2();
    });

    section3Button.addEventListener('click', function() {
        showSection3();
    });
});