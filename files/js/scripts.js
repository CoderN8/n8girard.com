gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    gsap.to('.background', {
        opacity: 1,
        duration: 0.5,
    });

    gsap.to('.figure', {
        x: 0,
        opacity: 1,
        duration: 0.5,
		ease: "power2.out",
        delay: 0.35
    });

    gsap.to('.text', {
        x: 0,
        opacity: 1,
        duration: 0.75,
		ease: "power2.out",
        delay: 0.5
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Nav bar animations
    const navLinks = document.querySelectorAll('#main-nav a');
    const sections = document.querySelectorAll('section');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    function updateNav() {
        let index = sections.length;

        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('selected'));
        navLinks[index].classList.add('selected');
    }

    updateNav();
    window.addEventListener('scroll', updateNav);
    
    
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    gsap.to('.case-studies h2', {
        scrollTrigger: {
            trigger: '.case-studies',
            start: 'top 90%',
            end: 'top 50%',
            scrub: true,
        },
        opacity: 1,
        x: 0,
        duration: 1,
    });

    // Case study animations
    const caseStudies = document.querySelectorAll('.case-study');
    caseStudies.forEach((study, index) => {
        gsap.fromTo(study, 
		{
            opacity: 0,
			clipPath: 'polygon(0% 0%, 0% 0%, 0% 50%, 0% 50%)',
		},
		{
            scrollTrigger: {
                trigger: study,
                start: 'top 90%',
                end: 'top 60%',
                scrub: true,
            },
            opacity: 1,
            clipPath: 'polygon(0 0, 100% 50%, 100% 100%, 0% 50%)',
            duration: 1,
            delay: index * 0.2, // Offset timing for each section
        });
    });

    // Demo Reel animations
    // Title animation
    gsap.to('.demo-reel-section .headingbar', {
        scrollTrigger: {
            trigger: '.demo-reel-section',
            start: 'top 90%',
            end: 'top 50%',
            scrub: true,
        },
        opacity: 1,
        clipPath: 'polygon(0% 0%, 70% 0%, 65% 100%, 0% 100%)',
        duration: 1,
    });
    gsap.from('.video-wrapper', {
        scrollTrigger: {
            trigger: '.video-wrapper',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });

    // Experience animations
    // Animate experience bars
    gsap.utils.toArray('.experience-bar .fill').forEach((bar, i) => {
        const years = bar.getAttribute('data-years');
        gsap.fromTo(bar, {
            width: 0
        }, {
            width: `${years / 34 * 100}%`,
            duration: 1.5,
            delay: i * 0.2,
            scrollTrigger: {
                trigger: bar,
                start: 'top 90%'
            },
            onUpdate: function() {
                bar.querySelector('.years').textContent = `${Math.round(bar.clientWidth / bar.parentElement.clientWidth * 34)} yrs`;
            }
        });
    });

    // Animate subsections
    gsap.from('.experience-subsection', {
        scrollTrigger: {
            trigger: '.experience-section',
            start: 'top 80%'
        },
        x: -100,
        opacity: 0,
        duration: 1
    });

    gsap.from('.proficiencies-subsection', {
        scrollTrigger: {
            trigger: '.experience-section',
            start: 'top 80%'
        },
        x: 100,
        opacity: 0,
        duration: 1
    });

    // Animate proficiencies logos
    gsap.utils.toArray('.logo-container').forEach((logo, i) => {
        gsap.fromTo(logo, {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.02,
            scrollTrigger: {
                trigger: logo,
                start: 'top 90%'
            }
        });
    });

    // Animate referrals
    gsap.utils.toArray('.referral').forEach((referral, i) => {
        gsap.to(referral, {
            scrollTrigger: {
                trigger: referral,
                start: 'top 80%'
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.1
        });
    });

     // Animate blog posts
     gsap.utils.toArray('.blog-post').forEach((post, i) => {
        gsap.to(post, {
            scrollTrigger: {
                trigger: post,
                start: 'top 80%'
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.1
        });
    });
});

// Get all the case study elements
const caseStudies = document.querySelectorAll('.case-study');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');

// Function to open modal
caseStudies.forEach(study => {
    study.addEventListener('click', (e) => {
        const modalId = `modal-${e.currentTarget.id}`;
        document.getElementById(modalId).style.display = 'block';
    });
});

// Function to close modal
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal').style.display = 'none';
    });
});

// Close the modal when clicking outside of it
window.onclick = function(event) {
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            form.reset();
            alert('Thank you for your message!');
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert('Oops! There was a problem submitting your form');
                }
            });
        }
    }).catch(error => {
        alert('Oops! There was a problem submitting your form');
    });
});