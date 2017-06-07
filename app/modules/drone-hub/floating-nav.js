class FloatingNav {
  constructor() {
    // create nav parent
    this.nav = document.createElement('nav');
    this.nav.classList.add('floating-nav');

    // get elements with a label and process them as nav items
    const elements = document.querySelectorAll('[data-floating-nav-label]');
    this.elements = [];
    for (let i=0; i<elements.length; i++) {
      const navElement = document.createElement('div');
      navElement.classList.add('nav-item');
      navElement.targetElement = elements[i];
      navElement.textContent = elements[i].getAttribute('data-floating-nav-label');
      navElement.addEventListener('click', this.onClickNavElement);
      this.elements.push(navElement);
      this.nav.appendChild(navElement);
    }
    document.body.appendChild(this.nav);
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
