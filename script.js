document.addEventListener("DOMContentLoaded", function () {

    const menuOpenButton = document.querySelector("#menu-open-button");
    const menuCloseButton = document.querySelector("#menu-close-button");

    if(menuOpenButton){
        menuOpenButton.addEventListener("click", () => {
            document.body.classList.toggle("show-mobile-menu");
        });
    }

    if(menuCloseButton){
        menuCloseButton.addEventListener("click", () => {
            document.body.classList.remove("show-mobile-menu");
        });
    }

    const currentPage = location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach(link => {
        if(link.getAttribute("href") === currentPage){
            link.classList.add("active");
        }
    });

});

let facilityIndex = 0;

function slideFacility(direction) {
  const slider = document.getElementById("facilitySlider");
  const cards = document.querySelectorAll(".facility-card");

  const itemsPerPage = 3;
  const totalPages = Math.ceil(cards.length / itemsPerPage);

  facilityIndex += direction;

  if (facilityIndex < 0) facilityIndex = totalPages - 1;
  if (facilityIndex >= totalPages) facilityIndex = 0;

  const moveWidth = slider.parentElement.offsetWidth;
  slider.style.transform = `translateX(-${facilityIndex * moveWidth}px)`;
}

let doctorIndex = 0;

function slideDoctor(direction) {
  const slider = document.getElementById("doctorSlider");
  const cards = document.querySelectorAll(".doctor-card");
  const cardWidth = cards[0].offsetWidth + 40; // 40 là gap

  doctorIndex += direction * 4;

  if (doctorIndex < 0) doctorIndex = 0;
  if (doctorIndex > cards.length - 4) doctorIndex = cards.length - 4;

  slider.style.transform = `translateX(-${doctorIndex * cardWidth}px)`;
}