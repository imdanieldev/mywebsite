const DURATION_MS = 800;
const EXTRA_DELAY_MS = 120;

let observer: IntersectionObserver | null = null;

const getDelay = (el: Element) => {
  const value = Number((el as HTMLElement).dataset.aosDelay ?? 0);
  const parsedValue = Number.isFinite(value) ? value : 0;
  return Math.max(0, parsedValue + EXTRA_DELAY_MS);
};

const getDuration = (el: Element) => {
  const value = Number((el as HTMLElement).dataset.aosDuration ?? DURATION_MS);
  return Number.isFinite(value) && value > 0 ? value : DURATION_MS;
};

const revealElement = (el: Element) => {
  const node = el as HTMLElement;
  const delay = getDelay(el);
  const duration = getDuration(el);

  node.style.setProperty('--aos-delay', `${delay}ms`);
  node.style.setProperty('--aos-duration', `${duration}ms`);
  node.classList.add('aos-in');

  window.setTimeout(() => {
    node.classList.remove('aos-in');
    node.style.removeProperty('--aos-delay');
    node.style.removeProperty('--aos-duration');
    node.removeAttribute('data-aos');
    node.removeAttribute('data-aos-delay');
    node.removeAttribute('data-aos-duration');
  }, delay + duration + 34);
};

const initScrollAnimations = () => {
  if (process.server) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = Array.from(document.querySelectorAll('[data-aos]'));

  document.documentElement.classList.add('aos-observer');

  if (prefersReducedMotion) {
    for (const el of elements) {
      revealElement(el);
    }
    return;
  }

  observer?.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }

        revealElement(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -8% 0px',
    },
  );

  for (const el of elements) {
    observer.observe(el);
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', initScrollAnimations);
  nuxtApp.hook('page:finish', initScrollAnimations);
});
