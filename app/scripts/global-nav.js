///////////////////////////////////////////////////////////////
//                                                           //
//                 Intel Global Navigation                   //
//                    by: Adam Trimble                       //
//                 © Intel Corporation 2016                  //
//                                                           //
///////////////////////////////////////////////////////////////

import delegate from 'delegate';

class IntelGlobalNavigation {
    constructor(navDomElement) {
        this.nav = navDomElement;
        this.attachEventHandlers({
            '[data-flyout]': this.onFlyoutTrigger,
            '.submenu': this.openPlank,
            '.shader': this.closeFlyout,
        });
    }
    attachEventHandlers(events) {
        Object.keys(events).forEach(selector => {
            delegate(this.nav, selector, 'click', events[selector].bind(this));
            delegate(this.nav, selector, 'touchend', events[selector].bind(this));
        });
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
        console.log(targetPlank);
    }
}

const navElement = document.getElementsByClassName('global-navigation')[0];
export default new IntelGlobalNavigation(navElement);
