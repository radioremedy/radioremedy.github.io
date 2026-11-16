document.querySelectorAll('[data-load-player]').forEach((button) => {
  const container = button.closest('[data-track]');
  const title = container.closest('article').querySelector('h3').textContent;
  const status = document.createElement('p');
  status.className = 'player-status';
  status.setAttribute('role', 'status');
  container.append(status);
  let frame;
  let timer;
  let attempt = 0;
  button.addEventListener('click', () => {
    clearTimeout(timer);
    frame?.remove();
    const currentAttempt = ++attempt;
    frame = document.createElement('iframe');
    frame.title = `SoundCloud: ${title}`;
    frame.allow = 'autoplay';
    const setState = (state, message) => {
      if (currentAttempt !== attempt) return;
      container.dataset.state = state;
      status.textContent = message;
      button.disabled = state === 'loading';
      button.textContent = state === 'loading' ? 'Loading player…' : 'Reload player';
      button.setAttribute('aria-label', `${button.textContent}: ${title}`);
    };
    setState('loading', 'Connecting to SoundCloud…');
    frame.addEventListener('load', () => {
      clearTimeout(timer);
      setState('loaded', 'Player opened. Press play to listen. If it won’t play, use the SoundCloud link below.');
    }, {once: true});
    frame.addEventListener('error', () => {
      clearTimeout(timer);
      setState('error', 'Couldn’t open the player. Try reloading or use the SoundCloud link below.');
    }, {once: true});
    timer = setTimeout(() => {
      setState('slow', 'SoundCloud is taking longer than expected. Try reloading or use the link below.');
    }, 12000);
    frame.src = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${container.dataset.track}&auto_play=false&hide_related=false`;
    container.append(frame);
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
