(function () {
    "use strict";

    /* ------------------------------------------------------------
       Config — Edit your WhatsApp Link
    ------------------------------------------------------------ */
    var WHATSAPP_LINK = "https://chat.whatsapp.com/KeqzOIXYTn1LgxJwCaclFX?s=cl&p=a&ilr=0";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ------------------------------------------------------------
       Cycling Typewriter
    ------------------------------------------------------------ */
    var typewriterEl = document.getElementById("heroTypewriter");

    if (typewriterEl) {
        var phrases = [
            "Business In Namibia",
            "Your Business",
            "Your Success",
            "Your Brand",
            "Your Platform",
            "Low Investment",
            "High Returns"
        ];
// vsdgdf
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
                typewriterEl.textContent = current.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === current.length) {
                    isErasing = true;
                    setTimeout(typewriterTick, pauseAfterType);
                } else {
                    setTimeout(typewriterTick, typeSpeed);
                }
            } else {
                typewriterEl.textContent = current.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isErasing = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(typewriterTick, pauseAfterErase);
                } else {
                    setTimeout(typewriterTick, eraseSpeed);
                }
            }
        }

        setTimeout(typewriterTick, 1000);
    }

    /* ------------------------------------------------------------
       WhatsApp CTA
    ------------------------------------------------------------ */
    function openWhatsApp(e) {
        if (e) e.preventDefault();

        window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer");
    }

    document.querySelectorAll(".js-whatsapp").forEach(function (el) {
        el.addEventListener("click", openWhatsApp);
    });

    /* ------------------------------------------------------------
       Falling Coin Animation
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
            coin.style.fontSize = size * 0.45 + "px";
            coin.style.animationDuration =
                duration + "s, " + spinDuration + "s";
            coin.style.animationDelay = delay + "s, 0s";

            container.appendChild(coin);

            setTimeout(function () {
                coin.remove();
            }, (duration + delay) * 1000 + 200);
        }

        for (var i = 0; i < count; i++) {
            setTimeout(makeCoin, i * (intervalMs / count));
        }

        setInterval(makeCoin, intervalMs / count);
    }

    spawnCoins(document.getElementById("coin-field"), 2, 4000);

    var ctaCoinField = document.querySelector(".cta-coins");
    if (ctaCoinField) {
        spawnCoins(ctaCoinField, 5, 2400);
    }

    /* ------------------------------------------------------------
       Sparkle Animation
    ------------------------------------------------------------ */
    function spawnSparkles(container, count) {
        if (!container || reduceMotion) return;

        for (var i = 0; i < count; i++) {
            var spark = document.createElement("div");
            spark.className = "spark";
            spark.style.left = Math.random() * 100 + "%";
            spark.style.top = Math.random() * 100 + "%";
            spark.style.animationDuration = 2 + Math.random() * 3 + "s";
            spark.style.animationDelay = Math.random() * 3 + "s";

            container.appendChild(spark);
        }
    }

    spawnSparkles(document.getElementById("sparkle-field"), 40);

    /* ------------------------------------------------------------
       Scroll Reveal Animation
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
            {
                threshold: 0.15
            }
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
    document.querySelectorAll(".faq-question").forEach(function (button) {
        button.addEventListener("click", function () {
            var item = button.parentElement;

            document.querySelectorAll(".faq-item").forEach(function (otherItem) {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                }
            });

            item.classList.toggle("active");
        });
    });

})();