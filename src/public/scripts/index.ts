import fullpage from 'fullpage.js';
import moment from 'moment';

import '../styles/index.scss';

moment.locale('cs');

const fp = new fullpage('#fullpage', {
  licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
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
document.querySelectorAll('span.max, span.min')?.forEach((el) => {
  let title = moment(el.getAttribute('title')).format('LLL');

  if (title == 'Invalid date') {
    title = '---';
  }

  el.setAttribute('title', title);
});

// set last updated
const lastUpdate = document.querySelector('p.last-update > span');

if (lastUpdate) {
  let text = moment(lastUpdate.textContent).fromNow();
  let title = moment(lastUpdate.textContent).format('LLL');

  if (text == 'Invalid date' || title == 'Invalid date') {
    text = title = '---';
  }

  lastUpdate.textContent = text;
  lastUpdate.parentElement?.setAttribute('title', title);
}
