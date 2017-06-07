import { TweenMax } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

class FloatingNav {

  constructor() {
    this.nav = this.createParentNavElement();
    this.elements = this.createNavElements(
      document.querySelectorAll('[data-floating-nav-label]')
    );
    this.elements.forEach(element => {
      element.addEventListener('click', this.onClickNavElement);
      this.nav.appendChild(element);
    });
    // insert nav before first labeled element
    const firstLabeledElement = this.elements[0].targetElement;
    firstLabeledElement.parentElement.insertBefore(this.nav, firstLabeledElement);
  }

  createParentNavElement() {
    const nav = document.createElement('nav');
    nav.classList.add('floating-nav');
    nav.setAttribute('role', 'navigation');
    return nav;
  }

  createNavElements(HTMLDomNodeList) {
    const elements = [];
    for (let i = 0; i < HTMLDomNodeList.length; i++) {
      const navElement = document.createElement('a');
      navElement.classList.add('nav-item');
      navElement.targetElement = HTMLDomNodeList[i];
      navElement.textContent = HTMLDomNodeList[i].getAttribute('data-floating-nav-label');
      const elementId = HTMLDomNodeList[i].id ? HTMLDomNodeList[i].id : navElement.textContent.replace(/\s/, '');
      if (!HTMLDomNodeList[i].id) {
        HTMLDomNodeList[i].id = elementId;
      }
      navElement.setAttribute('href', `#${elementId}`);
      elements.push(navElement);
    }
    return elements;
  }

  onClickNavElement(event) {
    console.log(event);
  }

  saveElementHeight(element) {
    const boundingRect = element.getBoundingClientRect();
    element.posFromTop = window.scrollY + boundingRect.top;
  }
}

export default new FloatingNav();
