(function () {
    "use strict";

    /* ------------------------------------------------------------
       EmailJS Configuration
       1. Sign up at https://www.emailjs.com
       2. Create a Gmail service → copy the Service ID
       3. Create an Email Template → copy the Template ID
       4. Go to Account → copy your Public Key
       Replace the placeholder strings below with your real IDs.
    ------------------------------------------------------------ */
    var EMAILJS_PUBLIC_KEY = "pNmaT1-DPyj08MCFG";   // e.g. "abc123XYZ"
    var EMAILJS_SERVICE_ID = "service_orowjne";   // e.g. "service_xxxxxxx"
    var EMAILJS_TEMPLATE_ID = "template_mqi06xp";  // e.g. "template_xxxxxxx"

    // Initialise EmailJS once
    emailjs.init(EMAILJS_PUBLIC_KEY);

    /* ------------------------------------------------------------
       Config — WhatsApp Link
    ------------------------------------------------------------ */
    var WHATSAPP_LINK = "https://api.whatsapp.com/send?phone=447868175325&text=Hi%20I%20required%20more%20details";

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

    /* ------------------------------------------------------------
       Bootstrap-like Custom Modal
    ------------------------------------------------------------ */
    var modalTriggers = document.querySelectorAll('[data-bs-toggle="modal"]');
    var modalDismissers = document.querySelectorAll('[data-bs-dismiss="modal"]');

    function openModal(modal) {
        if (!modal) return;
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
        // Force reflow for CSS transitions
        modal.offsetHeight;
        modal.classList.add("show");
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove("show");
        setTimeout(function () {
            modal.style.display = "none";
            if (!document.querySelector(".modal.show")) {
                document.body.style.overflow = "";
            }
        }, 350);
    }

    modalTriggers.forEach(function (trigger) {
        trigger.addEventListener("click", function (e) {
            e.preventDefault();
            var targetSelector = trigger.getAttribute("data-bs-target");
            var modal = document.querySelector(targetSelector);
            openModal(modal);
        });
    });

    modalDismissers.forEach(function (dismiss) {
        dismiss.addEventListener("click", function (e) {
            e.preventDefault();
            var modal = dismiss.closest(".modal");
            closeModal(modal);
        });
    });

    window.addEventListener("click", function (e) {
        var modals = document.querySelectorAll(".modal");
        modals.forEach(function (modal) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    /* ------------------------------------------------------------
       Contact Form Submission — EmailJS + WhatsApp Redirect
    ------------------------------------------------------------ */
    document.querySelectorAll(".js-contact-form").forEach(function (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            var nameInput = form.querySelector('input[name="name"]');
            var phoneInput = form.querySelector('input[name="phone"]');

            if (!nameInput || !phoneInput) return;

            var nameVal = nameInput.value.trim();
            var phoneVal = phoneInput.value.trim();

            if (!nameVal || !phoneVal) return;

            // Disable submit button to prevent double-submit
            var submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = "0.7";
            }

            // Save to LocalStorage for offline lead recovery
            try {
                var storedLeads = localStorage.getItem("platform_leads");
                var leads = storedLeads ? JSON.parse(storedLeads) : [];
                leads.push({
                    name: nameVal,
                    phone: phoneVal,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem("platform_leads", JSON.stringify(leads));
            } catch (err) {
                console.error("Error saving lead:", err);
            }

            // Get current date & time for the {{time}} template variable
            var now = new Date();
            var timeVal = now.toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            });

            // Send via EmailJS — params exactly match {{name}}, {{time}}, {{mobile}}, {{message}} in template
            console.log("Sending email...", EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                name: nameVal,
                time: timeVal,
                mobile: phoneVal,
                message: "New platform enquiry — please respond at your earliest convenience."
            });
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                name: nameVal,
                time: timeVal,
                mobile: phoneVal,
                message: "New platform enquiry — please respond at your earliest convenience."
            })
                .then(function () {
                    console.log("Email sent successfully to syscorpfrontend@gmail.com");
                })
                .catch(function (err) {
                    console.error("EmailJS error:", err);
                    // Re-enable button on failure so user can retry
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = "";
                    }
                });

            // Show success message immediately
            var parent = form.parentElement;
            var successMessage = parent.querySelector(".js-success-message");
            if (successMessage) {
                form.style.display = "none";
                successMessage.style.display = "flex";
            }

            // Redirect to WhatsApp after 2 seconds
            setTimeout(function () {
                window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer");

                // Close modal (if inside one) and reset form
                var modal = form.closest(".modal");
                if (modal) {
                    closeModal(modal);
                    setTimeout(function () {
                        form.reset();
                        form.style.display = "block";
                        if (successMessage) successMessage.style.display = "none";
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.style.opacity = "";
                        }
                    }, 400);
                } else {
                    setTimeout(function () {
                        form.reset();
                        form.style.display = "block";
                        if (successMessage) successMessage.style.display = "none";
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.style.opacity = "";
                        }
                    }, 1000);
                }
            }, 2000);
        });
    });

    /* ------------------------------------------------------------
       Scroll to Top Floating Button Logic
    ------------------------------------------------------------ */
    var sttBtn = document.getElementById("scrollToTop");
    var fgsTop = document.getElementById("floatingGetStartedTop");
    var fgsBottom = document.getElementById("floatingGetStartedBottom");

    if (sttBtn || fgsTop || fgsBottom) {
        var sttCircle = sttBtn ? sttBtn.querySelector(".progress-ring__circle") : null;
        var lastScrollTop = 0;
        var ticking = false;

        function updateScrollToTop() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;

            // 1. Toggle scroll-to-top visibility
            if (sttBtn) {
                if (scrollTop > 150) {
                    sttBtn.classList.add("visible");
                } else {
                    sttBtn.classList.remove("visible", "scroll-up", "scroll-down");
                }
            }

            // 2. Toggle floating Get Started buttons visibility
            if (scrollTop > 400) {
                if (fgsTop) fgsTop.classList.add("visible");
                if (fgsBottom) fgsBottom.classList.add("visible");
            } else {
                if (fgsTop) fgsTop.classList.remove("visible");
                if (fgsBottom) fgsBottom.classList.remove("visible");
            }

            // 3. Update progress circle
            if (sttBtn && sttCircle && docHeight > 0) {
                var radius = parseFloat(sttCircle.getAttribute("r")) || 24;
                var circumference = 2 * Math.PI * radius;
                var scrollPercent = Math.min(Math.max(scrollTop / docHeight, 0), 1);
                
                sttCircle.style.strokeDasharray = circumference;
                sttCircle.style.strokeDashoffset = circumference - (scrollPercent * circumference);
            }

            // 4. Detect scroll direction & apply animation classes
            if (sttBtn && scrollTop > 150) {
                if (scrollTop > lastScrollTop) {
                    sttBtn.classList.add("scroll-down");
                    sttBtn.classList.remove("scroll-up");
                } else if (scrollTop < lastScrollTop) {
                    sttBtn.classList.add("scroll-up");
                    sttBtn.classList.remove("scroll-down");
                }
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            ticking = false;
        }

        var scrollTimeout;
        // Throttle scroll events using requestAnimationFrame for maximum performance
        window.addEventListener("scroll", function () {
            document.body.classList.add("is-scrolling");
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function () {
                document.body.classList.remove("is-scrolling");
            }, 150);

            if (!ticking) {
                window.requestAnimationFrame(updateScrollToTop);
                ticking = true;
            }
        }, { passive: true });

        // Smooth scroll to top on click
        if (sttBtn) {
            sttBtn.addEventListener("click", function (e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });
        }
    }

})();