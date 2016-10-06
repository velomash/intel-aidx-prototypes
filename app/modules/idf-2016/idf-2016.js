import throttle from 'lodash.throttle';

class idfBlade {
    constructor() {
        this.idfBlade = document.getElementById('idf-2016-blade');
        if (this.idfBlade) {
            const checkScroll = throttle(this.checkIfScrolledIntoView.bind(this), 75);
            this.onLoad = window.addEventListener('load', this.checkIfScrolledIntoView.bind(this));
            this.onScroll = window.addEventListener('scroll', checkScroll);
        }
    }
    checkIfScrolledIntoView() {
        const bladeTop = this.idfBlade.getBoundingClientRect().top;
        const bladeBottom = this.idfBlade.getBoundingClientRect().bottom;
        if (bladeTop > -50 && bladeBottom < window.innerHeight + 50) {
            window.removeEventListener('load', this.onLoad, false);
            window.removeEventListener('scroll', this.onScroll, false);
            this.idfBlade.classList.add('visible');
        }
    }
}

export default new idfBlade();
