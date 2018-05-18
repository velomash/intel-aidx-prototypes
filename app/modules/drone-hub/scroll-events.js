import ScrollMagic from 'scrollmagic';
import { TweenLite } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

class ScrollBehaviors {

  constructor() {
    this.controller = new ScrollMagic.Controller();
    this.setupScrollToLinking();
  }

  setupScrollToLinking() {
    this.controller.scrollTo(newPos => TweenLite.to(window, 0.5, {scrollTo: {y: newPos}}));
    $(document).on('click', "a[href^='#']", event => {
      const id = $(event.currentTarget).attr('href');
      if ($(id).length > 0) {
        event.preventDefault();
        this.controller.scrollTo(id);
      }
    });
  }

  setupTextFades() {
    const sections = document.querySelectorAll('section');
    for (var i=0, l=sections.length; i<l; i++) {
      new ScrollMagic.Scene({
        triggerElement: sections[i],
        // triggerHook: 'onLeave',
      })
      .setClassToggle(sections[i], 'activate-text')
      .addTo(this.controller);
    }
  }

  heroAnimation() {
    const hero = document.querySelector('header.hero');
    if (!hero) { return false; }
    const animationDuration = 1250;
    const text = {
      futureOf: hero.querySelector('h5'),
      commercial: hero.querySelector('.commercial'),
      drones: hero.querySelector('.drones'),
    };
    const clouds = [...hero.querySelectorAll('.cloud')];
    const drone = hero.querySelector('.drone');
    const timelineAnimation = new TimelineLite();
    timelineAnimation
      .to(clouds[0], animationDuration / 3, {
        x: '-=200',
        y: '-=50',
        opacity: 0,
      }, 0)
      .to(clouds[1], animationDuration / 3, {
        x: '+=200',
        y: '-=50',
        opacity: 0,
      }, 0)
      .to(text.futureOf, animationDuration / 3, {
        y: '-=100',
        opacity: 0,
      }, 2)
      .to(text.commercial, animationDuration / 3, {
        y: '-=75',
        opacity: 0,
      }, 2)
      .to(text.drones, animationDuration / 3, {
        y: '+=75',
        opacity: 0,
      }, 2);
    const scene = new ScrollMagic
      .Scene({
        triggerElement: hero,
        triggerHook: 'onLeave',
        duration: animationDuration,
      })
      .setTween(timelineAnimation)
      .setPin(hero)
      .addTo(this.controller);
  }
}

export default new ScrollBehaviors();
