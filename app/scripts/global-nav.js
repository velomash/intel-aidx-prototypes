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
        delegate(this.nav, '[data-flyout]', 'click', this.onFlyoutTrigger.bind(this));
        delegate(this.nav, '[data-flyout]', 'touchend', this.onFlyoutTrigger.bind(this));
        delegate(this.nav, '.shader', 'click', this.closeFlyout.bind(this));
        delegate(this.nav, '.shader', 'touchend', this.closeFlyout.bind(this));
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
        this.nav.classList.add('flyout-active', `${this.activeFlyout.id}-active`);
    }
    closeFlyout() {
        this.nav.classList.remove('flyout-active', `${this.activeFlyout.id}-active`);
        this.activeFlyout = undefined;
    }
}

const navElement = document.getElementsByClassName('global-navigation')[0];
export default new IntelGlobalNavigation(navElement);
