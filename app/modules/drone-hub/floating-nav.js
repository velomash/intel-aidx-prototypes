import ScrollMagic from 'scrollmagic';
import { TweenLite } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

class FloatingNav {

  constructor() {
    const links = this.createNavLinks();
    if (links.length) {
      const nav = this.createParentNavLink();
      const scrollController = new ScrollMagic.Controller();
      links.forEach(navLink => {
        navLink.addEventListener('click', this.onClickNavLink);
        this.addScrollHighlighting(navLink, scrollController);
        nav.appendChild(navLink);
      });
      // insert nav before first labeled element
      const firstLabeledSection = links[0].navSection;
      firstLabeledSection.parentElement.insertBefore(nav, firstLabeledSection);
    }
  }

  createParentNavLink() {
    const nav = document.createElement('nav');
    nav.classList.add('floating-nav');
    nav.setAttribute('role', 'navigation');
    return nav;
  }

  createNavLinks() {
    const labeledHTMLDomNodes = document.querySelectorAll('[data-floating-nav-label]');
    const elements = [];
    for (let i = 0; i < labeledHTMLDomNodes.length; i++) {
      const navElement = document.createElement('a');
      navElement.classList.add('nav-item');
      navElement.navSection = labeledHTMLDomNodes[i];
      navElement.textContent = labeledHTMLDomNodes[i].getAttribute('data-floating-nav-label');
      let elementId;
      if (labeledHTMLDomNodes[i].id) {
        elementId = labeledHTMLDomNodes[i].id;
      } else {
        elementId = `FloatingNav-${navElement.textContent.replace(/\s/, '')}`;
        labeledHTMLDomNodes[i].id = elementId;
      }
      navElement.setAttribute('href', `#${elementId}`);
      elements.push(navElement);
    }
    return elements;
  }

  addScrollHighlighting(navLink, controller) {
    navLink.scrollScene = new ScrollMagic.Scene({
        triggerElement: navLink.navSection,
        duration: navLink.navSection.offsetHeight,
      })
      .setClassToggle(navLink, 'active')
      .addTo(controller);
  }

  onClickNavLink(event) {
    event.preventDefault();
    TweenMax.to(window, 0.5, {
      scrollTo: {
        y: event.target.navSection,
        autoKill: true,
      },
      ease: Cubic.easeInOut,
    });
  }
}

export default new FloatingNav();
