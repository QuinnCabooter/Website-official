const navList = document.querySelector("#nav-list");
const menuToggle = document.querySelector("#menu-toggle");
const siteHeader = document.querySelector(".site-header");

menuToggle?.addEventListener("click", () => {
  navList?.classList.toggle("open");
});

function applyHeaderScrolled() {
  const scrolled = window.scrollY > 8;
  siteHeader?.classList.toggle("site-header--scrolled", scrolled);
}

window.addEventListener("scroll", applyHeaderScrolled, { passive: true });
applyHeaderScrolled();

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
