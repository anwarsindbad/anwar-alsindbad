const translations = {
  ar: {dir: "rtl", label: "English"},
  en: {dir: "ltr", label: "العربية"}
};
let currentLang = "ar";
const toggle = document.getElementById("languageToggle");

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = translations[lang].dir;
  document.title = lang === "ar"
    ? "أنوار السندباد | Anwar Al-Sindbad Travel & Tourism"
    : "Anwar Al-Sindbad | Travel & Tourism";
  document.querySelectorAll("[data-ar][data-en]").forEach(el => {
    el.textContent = el.dataset[lang];
  });
  document.querySelectorAll("option[data-ar][data-en]").forEach(el => {
    el.textContent = el.dataset[lang];
  });
  toggle.textContent = translations[lang].label;
}
toggle.addEventListener("click", () => setLanguage(currentLang === "ar" ? "en" : "ar"));
document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("flightForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const from = document.getElementById("from").value.trim();
  const to = document.getElementById("to").value.trim();
  const depart = document.getElementById("depart").value;
  const ret = document.getElementById("return").value || (currentLang === "ar" ? "غير محدد" : "Not specified");
  const passengers = document.getElementById("passengers").value;
  const tripType = document.getElementById("tripType");
  const type = tripType.options[tripType.selectedIndex].text;
  let message;
  if (currentLang === "ar") {
    message = `السلام عليكم، أريد الاستفسار عن حجز طيران من خلال أنوار السندباد.%0Aمدينة المغادرة: ${from}%0Aالوجهة: ${to}%0Aتاريخ الذهاب: ${depart}%0Aتاريخ العودة: ${ret}%0Aعدد المسافرين: ${passengers}%0Aنوع الرحلة: ${type}`;
  } else {
    message = `Hello, I would like to request a flight booking with Anwar Al-Sindbad.%0AFrom: ${from}%0ATo: ${to}%0ADeparture: ${depart}%0AReturn: ${ret}%0APassengers: ${passengers}%0ATrip type: ${type}`;
  }
  window.open(`https://wa.me/9647717199399?text=${message}`, "_blank", "noopener");
});
