const navList = document.querySelector("#nav-list");
const menuToggle = document.querySelector("#menu-toggle");

menuToggle?.addEventListener("click", () => {
  navList?.classList.toggle("open");
});

// Publications filter (by tag)
const pubFilter = document.querySelector("#pub-filter");
const pubCards = document.querySelectorAll(".pub-card");

function applyPubFilter() {
  const selected = pubFilter?.value ?? "*";
  pubCards.forEach((card) => {
    const tags = (card.getAttribute("data-tags") ?? "").split("|").filter(Boolean);
    const show = selected === "*" || tags.includes(selected);
    card.style.display = show ? "" : "none";
  });
}

pubFilter?.addEventListener("change", applyPubFilter);
applyPubFilter();
