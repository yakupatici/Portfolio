function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

let originalTitle = "Yakup ATICI";
let newTitle = "Heyy, buradayım!";
let titles = [originalTitle, newTitle];
let index = 0;
let interval;

function animateTitle() {
  document.title = titles[index];
  index = (index + 1) % titles.length;
}

document.addEventListener("visibilitychange", function() {
  if (document.hidden) {
    interval = setInterval(animateTitle, 1000); // Her 1000 milisaniyede bir değiştir
  } else {
    clearInterval(interval);
    document.title = originalTitle;
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const toggleButton = document.getElementById("theme-toggle");
  const darkModeIcon = document.getElementById("dark-mode-icon");
  const lightModeIcon = document.getElementById("light-mode-icon");

  toggleButton.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      darkModeIcon.style.display = "block";
      lightModeIcon.style.display = "none";
    } else {
      darkModeIcon.style.display = "none";
      lightModeIcon.style.display = "block";
    }
  });
});

// Form gönderim işlevi
function handleSubmit(event) {
  event.preventDefault(); // Formun varsayılan gönderimini durdur
  
  const form = document.getElementById('contactForm');
  const responseMessage = document.getElementById('responseMessage');
  
  // Form verilerini topla
  const formData = new FormData(form);
  
  // AJAX isteği oluştur
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'send_email.php', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      responseMessage.style.display = 'block';
      responseMessage.style.color = 'green';
      responseMessage.textContent = translate('responseSuccess');
      form.reset(); // Formu sıfırla
    } else {
      responseMessage.style.display = 'block';
      responseMessage.style.color = 'red';
      responseMessage.textContent = translate('responseFailure');
    }
  };
  xhr.send(formData);
  
  return false;
}

// Çoklu dil desteği
let translations = {};

function setLanguage(language) {
  fetch(`./${language}.json`)
    .then(response => response.json())
    .then(data => {
      translations = data;
      translatePage();
    });
}

function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = translations[key];
  });
}

function translate(key) {
  return translations[key] || key;
}

// Sayfa yüklendiğinde varsayılan dili ayarla
document.addEventListener("DOMContentLoaded", function() {
  setLanguage('en'); // Varsayılan dil İngilizce olarak ayarlandı
});