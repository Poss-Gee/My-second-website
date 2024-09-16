<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
    <link rel="stylesheet" href="style.css">
    <title>My Poetfolio</title>
    <style>
        /* Highlighted box */
        .highlight {
            position: absolute;
            border: 2px solid #28a745;
            background-color: rgba(0, 0, 0, 0.1);
            z-index: 1000;
            padding: 10px;
            pointer-events: none;
        }

        /* Tooltip container */
        #tutorial-tooltip {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: #fff;
            padding: 20px;
            border-radius: 10px;
            width: 300px;
            text-align: center;
            z-index: 1001;
            display: none;
        }

        #tutorial-tooltip button {
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #28a745;
            border: none;
            color: white;
            cursor: pointer;
        }

        #tutorial-tooltip button:hover {
            background-color: #218838;
        }
    </style>
</head>
<body>
    <nav>
        <div class="nav-container">
            <div id="logo" class="logo" data-aos="zoom-in" data-aos-duration="1500">
               Possi <span>Gee</span>
            </div>
        <div class="links">
            <div class="link" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="100"><a href="index.html">Home</a></div>
            <div class="link" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200"><a href="about.html">About</a></div>
            <div class="link" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="300"><a href="#">Skills</a></div>
            <div class="link" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="400"><a href="services.html">Service</a></div>
            <div class="link" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500"><a href="#">Contact</a></div>
        </div>
            <i class="fa-solid fa-bars hamburg" onclick="hamburg()"></i>
        </div>
    </nav>
    <section>
        <div class="main-container">
            <div class="image" data-aos="zoom-in" data-aos-duration="3000">
                <img src="Mickie.jpg">
            </div>
            <div id="main-content" class="content">
                <h1 data-aos="fade-left" data-aos-duration="1500" data-aos-delay="700">Hey It's <span>Mickie</span></h1>
                <div class="typewriter" data-aos="fade-right" data-aos-duration="1500" data-aos-delay="900">
                    <span class="typewriter-text"><span class='white-text'>I'm a</span> </span>
                </div>
            </div>
        </div>
    </section>

    <!-- Tooltip for the tutorial -->
    <div id="tutorial-tooltip">
        <p id="tutorial-text"></p>
        <button id="next-step">Next</button>
    </div>

    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <script>
      AOS.init({offset:0});

      // Hamburger menu functions
      function hamburg() {
        const navbar = document.querySelector(".dropdown");
        navbar.style.transform = "translateY(0px)";
      }

      function cancel() {
        const navbar = document.querySelector(".dropdown");
        navbar.style.transform = "translateY(-500px)";
      }

      // Typewriter effect
      const texts = [
        "SOFTWARE DEVELOPER",
        "WEB DESIGNER",
        "SYSTEM ANALYST",
        "passionate developer from Ghana. I specialize in web development, system design, and more."
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
          const baseText = "<span class='white-text'>I'm a</span> ";
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
          textElements.innerHTML = "<span class='white-text'>I'm a</span> ";
          typeWriter();
          if (!localStorage.getItem('tutorialDone')) {
              startTutorial();
          }
      };

      // Tutorial steps
      const steps = [
        {
          element: document.getElementById('logo'),
          text: "This is the logo of the site, Possi Gee."
        },
        {
          element: document.querySelector('.links'),
          text: "These are the navigation links. Click them to visit different sections."
        },
        {
          element: document.querySelector('.typewriter'),
          text: "This is a typewriter effect that introduces you to Mickie's professional roles."
        },
        {
          element: document.getElementById('main-content'),
          text: "This is the main content area. It gives you an overview of Mickie's profile."
        }
      ];

      let currentStep = 0;

      function startTutorial() {
        showStep();
        document.getElementById('tutorial-tooltip').style.display = 'block';
      }

      function showStep() {
        const step = steps[currentStep];
        const rect = step.element.getBoundingClientRect();

        // Highlight box
        const highlight = document.createElement('div');
        highlight.classList.add('highlight');
        highlight.style.top = rect.top + 'px';
        highlight.style.left = rect.left + 'px';
        highlight.style.width = rect.width + 'px';
        highlight.style.height = rect.height + 'px';
        document.body.appendChild(highlight);

        // Update the tooltip text
        document.getElementById('tutorial-text').innerText = step.text;

        // Remove existing highlights
        document.querySelectorAll('.highlight').forEach(el => el.remove());
        document.body.appendChild(highlight);

        // Read the text aloud
        speakText(step.text);
      }

      document.getElementById('next-step').addEventListener('click', function() {
        currentStep++;
        if (currentStep < steps.length) {
          showStep();
        } else {
          endTutorial();
        }
      });

      function endTutorial() {
        document.getElementById('tutorial-tooltip').style.display = 'none';
        document.querySelectorAll('.highlight').forEach(el => el.remove());
        localStorage.setItem('tutorialDone', 'true');
      }

      // Text-to-speech function for Twi
      function speakText(text) {
        const speech = new SpeechSynthesisUtterance();
        speech.text = text;
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;
        speech.lang = 'ak'; // Akan (Twi)

        const voices = window.speechSynthesis.getVoices();
        const twiVoice = voices.find(voice => voice.lang.includes('ak'));

        if (twiVoice) {
            speech.voice = twiVoice;
        }

        window.speechSynthesis.speak(speech);
      }
    </script>
    <script src="script.js"></script>
</body>
</html>
