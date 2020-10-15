import * as fullpage from 'fullpage.js';
import './style.scss';

const fp = new fullpage('#fullpage', {
  //options here
  autoScrolling: true,
  scrollHorizontally: true,
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
