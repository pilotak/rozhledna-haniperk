import fullpage from 'fullpage.js';
import moment from 'moment';
import '../styles/index.scss';

moment.locale('cs');

document.addEventListener('DOMContentLoaded', () => {
  const fp = new fullpage('#fullpage', {
    licenseKey: 'B!m3OxD@i9',
    autoScrolling: true,
    scrollBar: true,
    responsiveHeight: 600,
  });

  document.getElementById('logo')?.addEventListener('click', (event) => {
    event.preventDefault();

    // Don't run if right-click
    if (event.button !== 0) {
      return;
    }

    fp.moveTo('footer');
  });

  // converts datetime
  document.querySelectorAll('p.maximum, p.minimum')?.forEach((el) => {
    let title = moment(el.getAttribute('title')).format('LLL');

    if (title == 'Invalid date') {
      title = '--';
    }

    el.setAttribute('title', title);
  });

  // set last updated
  const lastUpdate = document.querySelector('p.last-update > span');

  if (lastUpdate) {
    let text = moment(lastUpdate.textContent).fromNow();
    let title = moment(lastUpdate.textContent).format('LLL');

    if (text == 'Invalid date' || title == 'Invalid date') {
      text = title = '--';
    }

    lastUpdate.textContent = text;
    lastUpdate.parentElement?.setAttribute('title', title);
  }

  const nav = document.querySelector('.nav > a');

  if (nav) {
    nav.addEventListener('click', (event) => {
      event.preventDefault();

      fp.moveTo(nav.classList.contains('home') ? 'home' : 'footer');
    });

    document.addEventListener('scroll', () => {
      if (document.body.classList.contains('fp-viewing-home')) {
        nav.classList.remove('home');
        nav.classList.add('footer');
        nav.setAttribute('title', 'Přejít na mapu');
      } else {
        nav.classList.remove('footer');
        nav.classList.add('home');
        nav.setAttribute('title', 'Přejít na úvod');
      }
    });
  }
});
