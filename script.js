document.addEventListener('DOMContentLoaded', () => {
    
    // =======================================
    // 1. OBSŁUGA RESPONSIVEGO MENU (Bez zmian)
    // =======================================
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav.querySelectorAll('a');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // =======================================
    // 2. OBSŁUGA LIGHTBOXA (Bez zmian)
    // =======================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.lightbox-trigger');

    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            lightbox.style.display = 'block';
            lightboxImg.src = item.href;
            lightboxCaption.innerHTML = item.getAttribute('data-title');
            document.body.style.overflow = 'hidden'; 
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && lightbox.style.display === 'block') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // =======================================
    // 3. OBSŁUGA SLIDERA OPINII (NOWA FUNKCJA)
    // =======================================
    function initSlider() {
        const slider = document.querySelector('.review-slider');
        const slides = document.querySelectorAll('.review-card');
        const prevButton = document.querySelector('.slider-button.prev');
        const nextButton = document.querySelector('.slider-button.next');
        
        // Jeśli nie ma elementów slidera, przerwij
        if (!slider || slides.length === 0) return;

        let currentIndex = 0;
        const totalSlides = slides.length;

        // Funkcja aktualizująca pozycję slidera
        function updateSlider() {
            const offset = -currentIndex * 100; // Przesunięcie o wielokrotność 100%
            slider.style.transform = `translateX(${offset}%)`;
        }

        // Obsługa przycisku "Następny"
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides; // Cykliczne przechodzenie
            updateSlider();
        });

        // Obsługa przycisku "Poprzedni"
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Cykliczne przechodzenie
            updateSlider();
        });
        
        // Opcjonalny autostart (co 5 sekund)
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 5000); 

        updateSlider(); // Początkowe ustawienie
    }
    
    // Uruchomienie slidera po załadowaniu DOM
    initSlider();
});

document.addEventListener('DOMContentLoaded', () => {
    
    // ... (Sekcje 1 i 2: Menu i Lightbox) ...

    // =======================================
    // 3. OBSŁUGA SLIDERA OPINII 
    // =======================================
    // ... (Kod funkcji initSlider pozostaje bez zmian) ...
    function initSlider() {
        const slider = document.querySelector('.review-slider');
        const slides = document.querySelectorAll('.review-card');
        const prevButton = document.querySelector('.slider-button.prev');
        const nextButton = document.querySelector('.slider-button.next');
        
        // Jeśli nie ma elementów slidera, przerwij
        if (!slider || slides.length === 0) return;

        let currentIndex = 0;
        const totalSlides = slides.length;

        function updateSlider() {
            const offset = -currentIndex * 100;
            slider.style.transform = `translateX(${offset}%)`;
        }

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 5000); 

        updateSlider();
    }
    
    initSlider();

    // =======================================
    // 4. EFEKT PÓŁPRZEZROCZYSTEGO NAGŁÓWKA (NOWA FUNKCJA)
    // =======================================
    const header = document.querySelector('header');
    const scrollThreshold = 50; // Próg w pikselach, po którym nagłówek staje się przezroczysty

    function handleScroll() {
        // Sprawdza, czy pozycja przewinięcia pionowego (scrollY) jest większa niż próg
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Dodanie nasłuchiwania zdarzenia przewijania
    window.addEventListener('scroll', handleScroll);
});

// =======================================
// 5. Kalendarz
// =======================================

// --- Modal ---
const modalOverlay = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");
const openModalButtons = document.querySelectorAll('#openModal');

openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modalOverlay.style.display = 'flex';
    });
});

closeModal.addEventListener('click', () => modalOverlay.style.display = 'none');
modalOverlay.addEventListener('click', e => {
    if(e.target === modalOverlay) modalOverlay.style.display = 'none';
});

// --- Kalendarz ---
const monthNames = ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec",
"Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];
let currentDate = new Date();
const monthNameEl = document.getElementById("monthName");
const calendarEl = document.getElementById("calendar");
const selectedDateInput = document.getElementById("selectedDateInput");

function renderCalendar(date){
    const year = date.getFullYear();
    const month = date.getMonth();
    monthNameEl.textContent = `${monthNames[month]} ${year}`;
    calendarEl.innerHTML = "";

    const daysOfWeek = ["Pn","Wt","Śr","Cz","Pt","Sb","Nd"];
    daysOfWeek.forEach(d=>{
        const label = document.createElement("div");
        label.className = "day-label";
        label.textContent = d;
        calendarEl.appendChild(label);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const emptyDays = firstDay === 0 ? 6 : firstDay-1;
    for(let i=0;i<emptyDays;i++){ calendarEl.appendChild(document.createElement("div")); }

    const daysInMonth = new Date(year, month+1, 0).getDate();
    const today = new Date();
    for(let day=1;day<=daysInMonth;day++){
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";

        const input = document.createElement("input");
        input.type="radio";
        input.id=`day${day}`;
        input.name="calendarDay";
        input.value=`${year}-${month+1}-${day}`;

        const label = document.createElement("label");
        label.htmlFor = input.id;
        label.textContent = day;

        if(day===today.getDate() && month===today.getMonth() && year===today.getFullYear()){
            label.style.border="2px solid #CBB994";
        }

        // Aktualizacja ukrytego inputa po kliknięciu
        input.addEventListener('change', () => {
            selectedDateInput.value = input.value;
        });

        dayDiv.appendChild(input);
        dayDiv.appendChild(label);
        calendarEl.appendChild(dayDiv);
    }
}

document.getElementById("prevMonth").addEventListener("click",()=>{
    currentDate.setMonth(currentDate.getMonth()-1);
    renderCalendar(currentDate);
});
document.getElementById("nextMonth").addEventListener("click",()=>{
    currentDate.setMonth(currentDate.getMonth()+1);
    renderCalendar(currentDate);
});

renderCalendar(currentDate);

// --- Formularz ---
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener('submit', e=>{
    e.preventDefault();
    if(!selectedDateInput.value){
        alert("Wybierz datę z kalendarza!");
        return;
    }
    const formData = new FormData(contactForm);
    alert(`Dziękujemy, ${formData.get("name")}!\nWybrana data: ${formData.get("selectedDate")}\nWiadomość wysłana.`);
    contactForm.reset();
});
