// setting icon
document.querySelector(".toggle .sett").onclick = function () {
    this.classList.toggle("fa-spin")
    document.querySelector(".setting-box").classList.toggle("open")
}


// local storage    



// adding color change to local storage

let maincolor = localStorage.getItem("color_option")
if (maincolor !== null) {
    // i finally used the color from local storage and sv=aved it even after refresh
    document.documentElement.style.setProperty('--main-color', maincolor)

    // remove active class form colors list
    document.querySelectorAll(".color-list li").forEach(element => {

        element.classList.remove("active");

        // add active class on data-color 
        if (element.dataset.color === maincolor) {

            element.classList.add("active");

        }
    })
}

// color change
const colorLi = document.querySelectorAll(".color-list li")
colorLi.forEach(li => {
    {
        li.addEventListener("click", (e) => {
            // I changed the color in the root
            document.documentElement.style.setProperty('--main-color', e.target.dataset.color)

            // I added the color to localstorage
            localStorage.setItem("color_option", e.target.dataset.color)

            handleActive(e);
        })
    }
})


// adding background change to local storage

let bgO = true;
let IntervalOption;

let bgLocal = localStorage.getItem("background_option")
if (bgLocal !== null) {

    if (bgLocal === true) {
        bgO = true;
    } else {
        bgO = false;
    }

    // remove active class form random backgrounds
    document.querySelectorAll(".random-backgrounds span").forEach(element => {

        element.classList.remove("active");

        // add active class on data-back 
        if (element.dataset.color === maincolor) {

            element.classList.add("active");

        }
    })

    if (bgLocal === "true") {
        document.querySelector(".random-backgrounds .yes").classList.add("active")
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active")
    }
}

// random background option
const backgroundImage = document.querySelectorAll(".random-backgrounds span")
backgroundImage.forEach(span => {
    {
        span.addEventListener("click", (e) => {

            handleActive(e)

            if (e.target.dataset.back === "yes") {
                bgO = true;
                randomImgs();
                localStorage.setItem("background_option", true)
            }
            else {
                bgO = false;
                clearInterval(IntervalOption)
                localStorage.setItem("background_option", false)
            }
        })
    }
})

// change landing background
let landingPage = document.querySelector(".landing-page")
let imgsArray = ["0.jpg", "1.webp", "2.jpg", "4.jpg"]

function randomImgs() {
    if (bgO === true) {
        IntervalOption = setInterval(() => {
            let random = Math.floor(Math.random() * imgsArray.length)
            landingPage.style.backgroundImage = `url("images/${imgsArray[random]}")`;
        }, 2000)
    }
}



// adding shows bullets to local storage

let bulletLocal = localStorage.getItem("bullets-option")

let bulletsSpan = document.querySelectorAll(".show-bullets span")

let bulletsContainer = document.querySelector(".nav-b")

if (bulletLocal !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");

    });

    if (bulletLocal === 'block') {

        bulletsContainer.style.display = "block";
        document.querySelector(".show-bullets .yes").classList.add("active");

    } else {

        bulletsContainer.style.display = "none";
        document.querySelector(".show-bullets .no").classList.add("active");

    }

}

// Bullets in settings box

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if (span.dataset.show === "yes") {
            bulletsContainer.style.display = "block";

            localStorage.setItem("bullets-option", "block")
        } else {
            bulletsContainer.style.display = "none";

            localStorage.setItem("bullets-option", "none")
        }
        handleActive(e);
    })

})



// services prog Shows Up
let ourservices = document.querySelector(".services")

window.onscroll = function () {

    let servicesOfSetTop = ourservices.offsetTop;

    let servicesOuterHeight = ourservices.offsetHeight;

    let windowHeight = this.innerHeight;

    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (servicesOfSetTop + servicesOuterHeight - windowHeight)) {
        let allservices = document.querySelectorAll(".services-box .prog span");
        allservices.forEach(services => {
            services.style.width = services.dataset.prog;
        })
    }

}


// Create Popup With Images
let gallery = document.querySelectorAll(".gallery img");

gallery.forEach(img => {
    img.addEventListener("click", (e) => {

        // overlay 
        let overlay = document.createElement("div")
        overlay.className = "popup";
        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        if (img.alt !== null) {

            let altHead = document.createElement("h3")
            let headTxt = document.createTextNode(img.alt);
            altHead.appendChild(headTxt);
            popupBox.appendChild(altHead);


        }

        let popupImg = document.createElement("img");
        popupImg.src = img.src;

        popupBox.appendChild(popupImg);

        document.body.appendChild(popupBox);

        let closeButton = document.createElement("span");

        let closeTxt = document.createTextNode("X");

        closeButton.appendChild(closeTxt);

        closeButton.className = "close";

        popupBox.appendChild(closeButton);

    })
})


// close popup
document.addEventListener("click", function (e) {

    if (e.target.className === "close") {

        e.target.parentNode.remove()

        document.querySelector(".popup").remove()
    }

    if (e.target.className === "popup") {
        document.querySelector(".popup").remove()
        document.querySelector(".popup-box").remove()
    }

})


// Making the bullets actives
const allBullets = document.querySelectorAll(".nav-b .bullet");

// Making the links actives
const allLinks = document.querySelectorAll(".links a");

// Functions to Activating the bullets and links
function scrollIntoSomewhere(element) {
    element.forEach(ele => {

        ele.addEventListener("click", (e) => {

            e.preventDefault()

            document.querySelector(e.target.dataset.sec).scrollIntoView({
                behavior: "smooth"
            })

        })

    })
}

scrollIntoSomewhere(allBullets);
scrollIntoSomewhere(allLinks);


function handleActive(event) {
    // removing the active class form eles
    event.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    })
    // adding the active class
    event.target.classList.add("active");
}


// reset button
document.querySelector(".reset").onclick = function () {

    localStorage.clear();
    window.location.reload();

}


// landing page menu resposive

let toggle = document.querySelector(".toggle-menu")
let toggleLinks = document.querySelector(".links")

toggle.onclick = function (e) {

    e.stopPropagation()

    this.classList.toggle("menu-active")

    toggleLinks.classList.toggle("open")

}

document.addEventListener("click", (e) => {

    if (e.target !== toggle && e.target !== toggleLinks) {

        if (toggleLinks.classList.contains("open")) {

            toggle.classList.toggle("menu-active")

            toggleLinks.classList.toggle("open")
        }

    }

})

toggleLinks.onclick = function (e) {
    e.stopPropagation()
}
