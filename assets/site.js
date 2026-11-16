document.querySelectorAll('[data-load-player]').forEach((button) => {
  button.addEventListener('click', () => {
    const container = button.closest('[data-track]');
    const frame = document.createElement('iframe');
    frame.title = `SoundCloud: ${container.closest('article').querySelector('h3').textContent}`;
    frame.src = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${container.dataset.track}&auto_play=false&hide_related=false`;
    frame.allow = 'autoplay';
    container.replaceChildren(frame);
    frame.focus();
  });
});

const navigation = document.querySelector('.navigation');
navigation.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.open) {
    navigation.open = false;
    navigation.querySelector('summary').focus();
  }
});
navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.open = false;
    // Keep keyboard focus at the chosen section after the disclosure closes.
    const section = document.querySelector(link.getAttribute('href'));
    section.setAttribute('tabindex', '-1');
    section.focus({ preventScroll: true });
  });
});
