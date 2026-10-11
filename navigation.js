// Navbar appearance and menus adapted from code 2, with shared accessible controls.
const navbar = document.querySelector('.navbar-fixed');
const navMenu = navbar.querySelector('.nav-menu');
const mobileToggle = navbar.querySelector('.mobile-nav-toggle');
const navItems = [...navbar.querySelectorAll('.nav-item')];
const mobileNavigation = window.matchMedia('(max-width:992px)');
let clickedItem = null;

const closeDropdowns = () => {
  clickedItem = null;
  navItems.forEach(item => {
    item.classList.remove('open');
    item.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
  });
};

const closeMobileNavigation = () => {
  navMenu.classList.remove('mobile-active');
  mobileToggle.classList.remove('active');
  mobileToggle.setAttribute('aria-expanded', 'false');
  closeDropdowns();
};

const openDropdown = item => {
  closeDropdowns();
  item.classList.add('open');
  item.querySelector('.nav-link').setAttribute('aria-expanded', 'true');
};

navItems.forEach(item => {
  const trigger = item.querySelector('.nav-link');
  const links = [...item.querySelectorAll('.nav-dropdown a')];
  trigger.addEventListener('click', () => {
    const shouldClose = mobileNavigation.matches
      ? item.classList.contains('open')
      : clickedItem === item && item.classList.contains('open');
    if (shouldClose) closeDropdowns();
    else {
      openDropdown(item);
      clickedItem = item;
    }
  });
  item.addEventListener('pointerenter', event => {
    if (!mobileNavigation.matches && event.pointerType !== 'touch') openDropdown(item);
  });
  item.addEventListener('pointerleave', event => {
    if (!mobileNavigation.matches && event.pointerType !== 'touch' && !item.contains(document.activeElement)) closeDropdowns();
  });
  item.addEventListener('focusout', event => {
    if (!item.contains(event.relatedTarget)) {
      item.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
  item.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      closeDropdowns();
      trigger.focus();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      openDropdown(item);
      const current = links.indexOf(document.activeElement);
      const next = event.key === 'ArrowDown' ? (current + 1) % links.length : (current < 0 ? links.length - 1 : (current - 1 + links.length) % links.length);
      links[next].focus();
    }
  });
});

mobileToggle.addEventListener('click', () => {
  const open = !navMenu.classList.contains('mobile-active');
  closeDropdowns();
  navMenu.classList.toggle('mobile-active', open);
  mobileToggle.classList.toggle('active', open);
  mobileToggle.setAttribute('aria-expanded', String(open));
});

navbar.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileNavigation));
document.addEventListener('click', event => {
  if (!navbar.contains(event.target)) closeMobileNavigation();
  else if (!event.target.closest('.nav-item')) closeDropdowns();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const wasOpen = navMenu.classList.contains('mobile-active');
    closeMobileNavigation();
    if (wasOpen) mobileToggle.focus();
  }
});
mobileNavigation.addEventListener('change', closeMobileNavigation);
const updateNavbarScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', updateNavbarScroll, { passive:true });
updateNavbarScroll();
