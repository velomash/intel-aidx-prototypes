import throttle from 'lodash.throttle';

class idfBlade {
    constructor() {
        this.idfBlade = document.getElementById('idf-2016-blade');
        this.onScroll = throttle(this.checkIfScrolledIntoView.bind(this), 75);
        if (this.idfBlade) {
            window.addEventListener('load', this.onScroll);
            window.addEventListener('scroll', this.onScroll);
        }
    }
    checkIfScrolledIntoView() {
        const bladeTop = this.idfBlade.getBoundingClientRect().top;
        const bladeBottom = this.idfBlade.getBoundingClientRect().bottom;
        if (bladeTop < window.innerHeight / 3) {
            window.removeEventListener('load', this.onScroll, false);
            window.removeEventListener('scroll', this.onScroll, false);
            this.idfBlade.classList.add('visible');
        }
    }
}

export default new idfBlade();
