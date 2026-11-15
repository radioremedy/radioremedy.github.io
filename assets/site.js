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
