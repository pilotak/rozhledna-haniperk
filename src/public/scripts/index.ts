import fullpage from 'fullpage.js';
import '../styles/index.scss';

const fp = new fullpage('#fullpage', {
  licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
  autoScrolling: true,
  scrollBar: true,
  responsiveHeight: 500,
});

document.getElementById('logo')?.addEventListener('click', (event) => {
  event.preventDefault();

  // Don't run if right-click
  if (event.button !== 0) {
    return;
  }

  fp.moveTo('footer');
});
