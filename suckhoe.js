function slideLeft() {
  document.getElementById("articleSlider")
    .scrollBy({ left: -300, behavior: "smooth" });
}

function slideRight() {
  document.getElementById("articleSlider")
    .scrollBy({ left: 300, behavior: "smooth" });
}

/* SEARCH */

document.getElementById("searchInput")
  .addEventListener("keyup", function () {

    let value = this.value.toLowerCase();
    let cards = document.querySelectorAll(".health-card");

    cards.forEach(card => {
      let text = card.innerText.toLowerCase();
      card.style.display = text.includes(value) ? "block" : "none";
    });
});