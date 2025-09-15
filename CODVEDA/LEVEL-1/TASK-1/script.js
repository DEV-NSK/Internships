// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function () {
    document.querySelector('.nav-links').classList.toggle('show');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


const images = {
    Telangana: [
        "golconda-ts.png",
        "charminar-ts.png",
        "birlamandir-ts.png",
        "tankbund-ts.png",
        "shilatoranam-ts.png"
    ],
    Karnataka: [
        "ka-humpi.png",
        "ka-badami.png",
        "ka-mrudeshwara.png",
        "ka-mysore.png",
        "ka-nandiHills.png",
    ],
    Kerala: [
        "k-allepyBackWaters.png",
        "k-munnar.png",
        "k-padmanabhaswamytemple.png",
        "k-athirapallyFalls.png",
        "k-marariBeach.png",
    ]
}

const placeLinks = document.querySelectorAll('#place-links a');
const cards = document.querySelectorAll('#parent-div .card');

// Add event listeners to each link
placeLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const state = link.textContent.trim();
    const imgs = images[state];
    if (imgs) {
      cards.forEach((card, idx) => {
        const imgTag = card.querySelector('img');
        imgTag.src = imgs[idx] || "";
        imgTag.alt = state + " image " + (idx + 1);
      });
    }
  });
});

// Optionally, load Telangana images by default
placeLinks[0].click();
