///////////////////////////////////////////////////////////////
//                                                           //
//                 Intel Global Navigation                   //
//                    by: Adam Trimble                       //
//                 © Intel Corporation 2016                  //
//                                                           //
///////////////////////////////////////////////////////////////

import delegate from 'delegate';
import throttle from 'lodash.throttle';

class IntelGlobalNavigation {
    constructor(navDomElement) {
        this.nav = navDomElement;
        this.attachEventHandlers({
            '[data-flyout]': this.onFlyoutTrigger,
            '.open-plank': this.openPlank,
            '.plank .back': this.popPlank,
            '.macrosite-menu': this.toggleLayout,
            '.flyout-close': this.closeFlyout,
            '.shader': this.closeFlyout,
        });
        window.addEventListener('scroll', throttle(this.onScroll, 50).bind(this));
    }
    attachEventHandlers(events) {
        Object.keys(events).forEach(selector => {
            delegate(this.nav, selector, 'click', events[selector].bind(this));
            delegate(this.nav, selector, 'touchend', events[selector].bind(this));
        });
    }
    onScroll(event) {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        console.log(scrollY);
        if (scrollY > 10) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
    }
    onFlyoutTrigger(event) {
        const targetFlyout = document.getElementById(event
            .delegateTarget
            .getAttribute('data-flyout'));
        if (targetFlyout === this.activeFlyout) {
            this.closeFlyout();
        } else {
            this.openFlyout(targetFlyout);
        }
    }
    toggleLayout() {
        if (this.activeFlyout) {
            this.closeFlyout();
        } else {
            const flyout = document.getElementById('products-flyout');
            this.openFlyout(flyout);
        }
    }
    openFlyout(targetFlyout) {
        if (this.activeFlyout) {
            this.nav.classList.remove(`${this.activeFlyout.id}-active`);
        }
        this.activeFlyout = targetFlyout;
        this.activePlanks = [this.activeFlyout.querySelector('.plank.active')];
        this.nav.classList.add('flyout-active', `${this.activeFlyout.id}-active`);
    }
    closeFlyout() {
        this.nav.classList.remove('flyout-active', `${this.activeFlyout.id}-active`);
        for (var i=0; i<this.activePlanks.length; i++) {
            this.activePlanks[i].classList.remove('pushed', 'active');
        }
        this.activePlanks[0].classList.add('active');
        this.activePlanks = undefined;
        this.activeFlyout = undefined;
    }
    openPlank(event) {
        event.preventDefault();
        const targetPlank = document.getElementById(event
            .delegateTarget
            .getAttribute('href')
            .slice(1));
        if (targetPlank) {
            targetPlank.classList.add('active');
            this.activePlanks[this.activePlanks.length - 1].classList.add('pushed');
            this.activePlanks.push(targetPlank);
        }
    }
    popPlank() {
        event.preventDefault();
        this.activePlanks[this.activePlanks.length - 1].classList.remove('active');
        this.activePlanks.pop();
        this.activePlanks[this.activePlanks.length - 1].classList.remove('pushed');
    }
}

const navElement = document.getElementsByClassName('global-navigation')[0];
export default new IntelGlobalNavigation(navElement);
