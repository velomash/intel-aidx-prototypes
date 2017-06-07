import { TweenMax } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

class FloatingNav {

  constructor() {
    this.nav = this.createParentNavElement();
    this.links = this.createNavLinks();
    this.scrollController = new ScrollMagic.Controller();
    this.links.forEach(navLink => {
      navLink.addEventListener('click', this.onClickNavElement);
      this.addScrollHighlighting(navLink);
      this.nav.appendChild(navLink);
    });
    // insert nav before first labeled element
    const firstLabeledElement = this.links[0].navSection;
    firstLabeledElement.parentElement.insertBefore(this.nav, firstLabeledElement);
  }

  createParentNavElement() {
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
        elementId = `FloatingNav-${labeledHTMLDomNodes[i].id}`;
      } else {
        elementId = `FloatingNav-${navElement.textContent.replace(/\s/, '')}`;
        labeledHTMLDomNodes[i].id = elementId;
      }
      navElement.setAttribute('href', `#${elementId}`);
      elements.push(navElement);
    }
    return elements;
  }

  addScrollHighlighting(navLink) {
    navLink.scrollScene = new ScrollMagic.Scene({
        triggerElement: navLink.navSection,
        duration: navLink.navSection.offsetHeight,
      })
      .setClassToggle(navLink, 'active')
      .addTo(this.scrollController);
  }

  onClickNavElement(event) {
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
