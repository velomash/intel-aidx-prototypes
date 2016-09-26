import TWEEN from 'tween.js';

class PhotoLinkBar {
    constructor(element) {
        this.container = element;
        this.nav = element.getElementsByTagName('nav')[0];
        this.next = document.getElementById('photo-link-bar-next');
        this.previous = document.getElementById('photo-link-bar-previous');
        this.addEventListeners();
    }
    addEventListeners() {
        this.nav.addEventListener('scroll', this.updateNavControls.bind(this));
        this.next.addEventListener('click', this.gotoNext.bind(this));
        this.next.addEventListener('touchend', this.gotoNext.bind(this));
        this.previous.addEventListener('click', this.gotoPrevious.bind(this));
        this.previous.addEventListener('touchend', this.gotoPrevious.bind(this));
        function updatePhotoLinkBar() {
            this.update();
            this.updateNavControls();
        }
        window.addEventListener('load', updatePhotoLinkBar.bind(this));
        window.addEventListener('resize', updatePhotoLinkBar.bind(this));
    }
    update() {
        if (this.isBarScrolling()) {
            this.container.classList.add('scrolling');
        } else {
            this.container.classList.remove('scrolling');
        }
        this.linkOffsets = [];
        const links = this.nav.getElementsByTagName('a');
        for (let i=0; i<links.length; i++) {
            this.linkOffsets.push(links[i].offsetLeft);
        }
    }
    updateNavControls() {
        if (this.nav.scrollLeft === 0) {
            this.previous.classList.add('disabled');
        } else {
            this.previous.classList.remove('disabled');
        }
        if (this.nav.scrollLeft >= this.nav.scrollWidth - this.nav.clientWidth) {
            this.next.classList.add('disabled');
        } else {
            this.next.classList.remove('disabled');
        }
    }
    isBarScrolling() {
        return this.nav.scrollWidth > this.nav.clientWidth;
    }
    gotoNext() {
        const newScrollLeft = (() => {
            const rightwardBound = this.nav.scrollLeft + this.nav.clientWidth;
            return this.linkOffsets.reduce((lastVal, linkOffset) => {
                if (linkOffset > rightwardBound) {
                    return lastVal;
                }
                return linkOffset;
            }, 0);
        })();
        this.gotoScrollPosition(newScrollLeft);
    }
    gotoPrevious() {
        const newScrollLeft = (() => {
            const scrollTarget = Math.max(0, this.nav.scrollLeft - this.nav.clientWidth);
            return this.linkOffsets.reduce((lastVal, linkOffset) => {
                if (linkOffset > scrollTarget) {
                    return lastVal;
                }
                return linkOffset;
            }, 0);
        })();
        this.gotoScrollPosition(newScrollLeft);
    }
    gotoScrollPosition(newScrollLeft = 0) {
        const tween = new TWEEN.Tween(this.nav)
            .to({
                scrollLeft: newScrollLeft,
            }, 400)
            .start();
        tween.onComplete(() => {
            this.animating = false;
        });
        this.animating = true;
        this.animate();
    }
    animate() {
        TWEEN.update();
        if (this.animating) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }
}

const linkBars = document.getElementsByClassName('photo-link-bar');
for (let i=0; i<linkBars.length; i++) {
    new PhotoLinkBar(linkBars[i]);
}

export default PhotoLinkBar;
