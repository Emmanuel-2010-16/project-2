/* ============================================
   LANDING PAGE SCRIPT
   Write the code under each comment.
   ============================================ */


/* ---------- 1. MOBILE MENU ----------
   - Select #menuToggle and #navLinks
   - On click of the toggle, toggle the "show" class on #navLinks
*/


/* ---------- 2. SLIDER ----------
   - Select all .slide, all .dot, #previousButton, #nextButton
   - Create: let currentSlide = 0
   - Write showSlide(index):
       a) remove "active" from all slides and dots
       b) add "active" to slides[index] and dots[index]
       c) set currentSlide = index
   - Next button: currentSlide++, wrap to 0 if past the last slide, showSlide
   - Previous button: currentSlide--, wrap to the last slide if below 0, showSlide
   - Dots: on click, read data-slide, convert with Number(), call showSlide
*/


/* ---------- 3. SLIDER AUTO-PLAY ----------
   - Use setInterval to go to the next slide every 4000ms
   - Store the timer in a variable: let timer = setInterval(...)
   - BONUS A: pause when the mouse enters .slider, resume on leave
   - BONUS B: restart the timer whenever a button or dot is clicked
     (hint: clearTimeout / clearInterval, then set a new one)
*/


/* ---------- 4. SIGNUP FORM VALIDATION ----------
   - Select the form, the three inputs, the three error spans,
     and #successMessage
   - Listen for "submit", call event.preventDefault()
   - Clear all old errors and the success message
   - Create: let valid = true
   - Name: not empty (use trim)
   - Email: regex check
   - Phone: remove spaces first, then test digits only and length >= 10
       (hint: value.replace(/\s/g, "") and /^\d+$/)
   - For each failure: show the error and set valid = false
   - If valid: show success message, call showToast(), reset the form
*/


/* ---------- 5. TOAST ----------
   - Select #toast
   - Write showToast(): add "show", then remove it after 3 seconds
   - Prevent overlapping timers (clearTimeout)
*/


/* ---------- 6. SCROLL-TO-TOP ----------
   - Select #scrollTopButton
   - On window "scroll": add "show" if scrollY > 300, else remove it
   - On click: window.scrollTo with top: 0 and behavior: "smooth"
*/


const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');
const slider = document.querySelector('.slider');

let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  if (slides[index]) slides[index].classList.add('active');
  if (dots[index]) dots[index].classList.add('active');
  currentSlide = index;
}
function nextSlide() {
  let nextIndex = currentSlide + 1;
  if (nextIndex >= slides.length) {
    nextIndex = 0; 
  }
  showSlide(nextIndex);
}
function prevSlide() {
  let prevIndex = currentSlide - 1;
  if (prevIndex < 0) {
    prevIndex = slides.length - 1; 
  }
  showSlide(prevIndex);
}
nextButton.addEventListener('click', () => {
  nextSlide();
  resetAutoPlay(); 
});
previousButton.addEventListener('click', () => {
  prevSlide();
  resetAutoPlay(); 
});
dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    const slideIndex = Number(e.target.getAttribute('data-slide'));
    showSlide(slideIndex);
    resetAutoPlay(); 
  });
});
let timer = setInterval(nextSlide, 4000);
if (slider) {
  slider.addEventListener('mouseenter', () => {
    clearInterval(timer);
  });
  slider.addEventListener('mouseleave', () => {
    startAutoPlay();
  });
}
function startAutoPlay() {
  clearInterval(timer);
  timer = setInterval(nextSlide, 4000);
}
function resetAutoPlay() {
  startAutoPlay();
}
const signupForm = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const successMessage = document.getElementById('successMessage');

if (signupForm) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (phoneError) phoneError.textContent = '';
    if (successMessage) {
      successMessage.textContent = '';
      successMessage.classList.remove('show');
    }

    let valid = true;
    const nameValue = nameInput ? nameInput.value.trim() : '';
    if (nameValue === '') {
      if (nameError) nameError.textContent = 'Please enter your name.';
      valid = false;
    }
    const emailValue = emailInput ? emailInput.value.trim() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      if (emailError) emailError.textContent = 'Please enter a valid email address.';
      valid = false;
    }
    const rawPhone = phoneInput ? phoneInput.value : '';
    const cleanPhone = rawPhone.replace(/\s/g, '');
    const isDigitsOnly = /^\d+$/.test(cleanPhone);
    if (!isDigitsOnly || cleanPhone.length < 10) {
      if (phoneError) phoneError.textContent = 'Phone number must contain at least 10 digits.';
      valid = false;
    }
    if (valid) {
      if (successMessage) {
        successMessage.textContent = 'Signup Complete';
        successMessage.classList.add('show');
      }

      if (typeof window.showToast === 'function') {
        window.showToast('Signup successful!');
      }

      signupForm.reset();
    }
  });
}

const toast = document.getElementById('toast');
let toastTimer;

function showToast() {
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.classList.add('show');
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
const scrollTopButton = document.getElementById('scrollTopButton');

if (scrollTopButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopButton.classList.add('show');
    } else {
      scrollTopButton.classList.remove('show');
    }
  });
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}