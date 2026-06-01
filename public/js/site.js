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

// Conferences: classify upcoming vs past using the visitor's local date.
// Hugo also classifies at build time; this keeps the list correct between deploys.
function parseLocalDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function conferenceEndTime(endIso) {
  const end = parseLocalDate(endIso);
  end.setHours(23, 59, 59, 999);
  return end;
}

function isConferenceUpcoming(card) {
  const endIso = card.getAttribute("data-date-end") || card.getAttribute("data-date-start");
  if (!endIso) return false;
  return Date.now() <= conferenceEndTime(endIso).getTime();
}

function setConferenceUpcoming(card, upcoming) {
  card.classList.toggle("conf-card--upcoming", upcoming);
  const meta = card.querySelector(".pub-meta");
  if (!meta) return;
  let badge = meta.querySelector(".conf-status");
  if (upcoming) {
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "tag conf-status";
      badge.textContent = "Upcoming";
      meta.insertBefore(badge, meta.firstChild);
    }
  } else if (badge) {
    badge.remove();
  }
}

function updateConferenceList() {
  const root = document.querySelector("#conferences-list");
  if (!root) return;

  const upcomingCards = root.querySelector("#conf-upcoming-cards");
  const pastCards = root.querySelector("#conf-past-cards");
  const upcomingEmpty = root.querySelector("#conf-upcoming-empty");
  const pastEmpty = root.querySelector("#conf-past-empty");
  if (!upcomingCards || !pastCards) return;

  const cards = [
    ...upcomingCards.querySelectorAll(".conf-card"),
    ...pastCards.querySelectorAll(".conf-card"),
  ];

  cards.forEach((card) => {
    const upcoming = isConferenceUpcoming(card);
    setConferenceUpcoming(card, upcoming);
    (upcoming ? upcomingCards : pastCards).appendChild(card);
  });

  const hasUpcoming = upcomingCards.querySelector(".conf-card") !== null;
  const hasPast = pastCards.querySelector(".conf-card") !== null;
  upcomingCards.hidden = !hasUpcoming;
  pastCards.hidden = !hasPast;
  if (upcomingEmpty) upcomingEmpty.hidden = hasUpcoming;
  if (pastEmpty) pastEmpty.hidden = hasPast;
}

function updateConferenceDetail() {
  const meta = document.querySelector("#conference-detail-meta");
  if (!meta) return;
  const endIso = meta.getAttribute("data-date-end") || meta.getAttribute("data-date-start");
  if (!endIso) return;
  const upcoming = Date.now() <= conferenceEndTime(endIso).getTime();
  const badge = meta.querySelector(".conf-status");
  if (upcoming && !badge) {
    const span = document.createElement("span");
    span.className = "tag conf-status";
    span.textContent = "Upcoming";
    meta.insertBefore(span, meta.firstChild);
  } else if (!upcoming && badge) {
    badge.remove();
  }
}

updateConferenceList();
updateConferenceDetail();
