import delegate from 'delegate';

class Accordian {
    constructor(element) {
        this.sections = element.querySelectorAll('section');
        window.addEventListener('resize', this.clearActiveSections.bind(this));
        delegate(element, 'section h3', 'click', this.onClickSection.bind(this));
    }
    onClickSection(event) {
        const section = event.delegateTarget.parentElement;
        for (var i=0; i<this.sections.length; i++) {
            if (this.sections[i] !== section) {
                this.sections[i].classList.remove('active');
            }
        }
        section.classList.toggle('active');
    }
    clearActiveSections() {
        for (var i=0; i<this.sections.length; i++) {
            this.sections[i].classList.remove('active');
        }
    }
}

const accordianBlades = document.getElementsByClassName('accordian-blade');
for (var n=0; n<accordianBlades.length; n++) {
    new Accordian(accordianBlades[n]);
}
