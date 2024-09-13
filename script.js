function hamburg() {
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(0px)";
}

function cancel() {
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(-500px)";
}

const texts = [
    "SOFTWARE DEVELOPER",
    "WEB DESIGNER",
    "SYSTEM ANALYST",
    "passionate developer from Ghana. I specialize in web development, system design, and more. Here’s a little more about my journey and interests!"
];

let speed = 100;
const textElements = document.querySelector(".typewriter-text");

let textIndex = 0;
let characterIndex = 0;

function typeWriter() {
    if (characterIndex < texts[textIndex].length) {
        textElements.innerHTML += texts[textIndex].charAt(characterIndex);
        characterIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(eraseText, 1000);
    }
}

function eraseText() {
    const baseText = "<span class='white-text'>I'm a</span> "; // The text to leave intact
    if (textElements.innerHTML.length > baseText.length) {
        textElements.innerHTML = textElements.innerHTML.slice(0, -1);
        setTimeout(eraseText, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        characterIndex = 0;
        setTimeout(typeWriter, 500);
    }
}

window.onload = function() {
    textElements.innerHTML = "<span class='white-text'>I'm a</span> "; // Initialize with the base text
    typeWriter();
};
