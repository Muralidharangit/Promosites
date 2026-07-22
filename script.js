(function () {
    "use strict";

    /* ------------------------------------------------------------
       Config — edit this number to your real WhatsApp business line
    ------------------------------------------------------------ */
    var WHATSAPP_NUMBER = "264813278786"; // replace with real number, digits only, country code first
    var WHATSAPP_MESSAGE = "Hi! I'm interested in launching a gaming platform with Golden Stake. Please share more details.";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ------------------------------------------------------------
       Cycling typewriter — type, pause, erase, next
    ------------------------------------------------------------ */
    var typewriterEl = document.getElementById("heroTypewriter");
    var phrases = ["Business In Namibia", "Your Business", "Your Success", "Your Brand", "Your Platform", "Low Investment", "High Returns"];
    var phraseIndex = 0;
    var charIndex = 0;
    var isErasing = false;
    var typeSpeed = 80;
    var eraseSpeed = 50;
    var pauseAfterType = 1800;
    var pauseAfterErase = 400;

    function typewriterTick() {
        var current = phrases[phraseIndex];

        if (!isErasing) {
            // Typing
            typewriterEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === current.length) {
                // Done typing — pause then erase
                isErasing = true;
                setTimeout(typewriterTick, pauseAfterType);
            } else {
                setTimeout(typewriterTick, typeSpeed);
            }
        } else {
            // Erasing
            typewriterEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                // Done erasing — move to next phrase
                isErasing = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typewriterTick, pauseAfterErase);
            } else {
                setTimeout(typewriterTick, eraseSpeed);
            }
        }
    }

    // Start after a short delay
    setTimeout(typewriterTick, 1000);

    /* ------------------------------------------------------------
       WhatsApp CTA wiring
    ------------------------------------------------------------ */
    function openWhatsApp(e) {
        if (e) e.preventDefault();
        var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);
        window.open(url, "_blank", "noopener");
    }
    document.querySelectorAll(".js-whatsapp").forEach(function (el) {
        el.addEventListener("click", openWhatsApp);
    });

    /* ------------------------------------------------------------
       Falling coin field (ambient ¦ skipped if reduced motion)
    ------------------------------------------------------------ */
    function spawnCoins(container, count, intervalMs) {
        if (!container || reduceMotion) return;

        function makeCoin() {
            var coin = document.createElement("div");
            coin.className = "coin";
            coin.innerHTML = "N$";
            var left = Math.random() * 100;
            var size = 24 + Math.random() * 20;
            var duration = 8 + Math.random() * 6;
            var spinDuration = 1.5 + Math.random() * 2;
            var delay = Math.random() * 2;

            coin.style.left = left + "%";
            coin.style.width = size + "px";
            coin.style.height = size + "px";
            coin.style.fontSize = (size * 0.45) + "px";
            coin.style.animationDuration = duration + "s, " + spinDuration + "s";
            coin.style.animationDelay = delay + "s, 0s";

            container.appendChild(coin);

            window.setTimeout(function () {
                coin.remove();
            }, (duration + delay) * 1000 + 200);
        }

        for (var i = 0; i < count; i++) {
            window.setTimeout(makeCoin, i * (intervalMs / count));
        }
        window.setInterval(makeCoin, intervalMs / count);
    }

    spawnCoins(document.getElementById("coin-field"), 2, 4000);

    var ctaCoinField = document.querySelector(".cta-coins");
    if (ctaCoinField) spawnCoins(ctaCoinField, 5, 2400);

    /* ------------------------------------------------------------
       Sparkle field
    ------------------------------------------------------------ */
    function spawnSparkles(container, count) {
        if (!container || reduceMotion) return;
        for (var i = 0; i < count; i++) {
            var s = document.createElement("div");
            s.className = "spark";
            s.style.left = Math.random() * 100 + "%";
            s.style.top = Math.random() * 100 + "%";
            s.style.animationDuration = 2 + Math.random() * 3 + "s";
            s.style.animationDelay = Math.random() * 3 + "s";
            container.appendChild(s);
        }
    }
    spawnSparkles(document.getElementById("sparkle-field"), 40);

    /* ------------------------------------------------------------
       Scroll reveal
    ------------------------------------------------------------ */
    var revealEls = document.querySelectorAll("[data-reveal]");
    if ("IntersectionObserver" in window && !reduceMotion) {
        var io = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        revealEls.forEach(function (el) {
            io.observe(el);
        });
    } else {
        revealEls.forEach(function (el) {
            el.classList.add("in-view");
        });
    }

    /* ------------------------------------------------------------
       FAQ Accordion
    ------------------------------------------------------------ */
    document.querySelectorAll('.faq-question').forEach(function (button) {
        button.addEventListener('click', function () {
            var item = button.parentElement;

            // Close other items
            document.querySelectorAll('.faq-item').forEach(function (otherItem) {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

})();