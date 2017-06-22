import ScrollMagic from 'scrollmagic';
import { TweenLite } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

class ScrollBehaviors {

  constructor() {
    this.controller = new ScrollMagic.Controller();
    this.setupScrollToLinking();
  }

  setupScrollToLinking() {
    this.controller.scrollTo(newPos => TweenLite.to(window, 0.5, {scrollTo: {y: newPos-60}}));
    $(document).on('click', "a[href^='#']", event => {
      const id = $(event.currentTarget).attr('href');
      if ($(id).length > 0) {
        event.preventDefault();
        this.controller.scrollTo(id);
      }
    });
  }
}

export default new ScrollBehaviors();
