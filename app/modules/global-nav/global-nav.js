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
        this.getFlyoutObjects();
        if (this.nav.classList.contains('transparent')) {
            this.initNavTransparency();
        }
        this.attachEventHandlers({
            '[data-flyout]': this.toggleFlyout,
            '.open-plank': this.pushPlank,
            '.plank .back': this.popPlank,
            '.macrosite-menu': this.toggleLayout,
            '.flyout-close': this.closeFlyout,
            '.shader': this.closeFlyout,
        });
        document.addEventListener('keyup', event => {
            if (event.keyCode === 27) {
                this.closeFlyout();
            }
        });
    }
    getFlyoutObjects() {
        const flyouts = this.nav.getElementsByClassName('flyout');
        this.flyouts = [];
        for (var i = 0; i < flyouts.length; i++) {
            this.flyouts[i] = flyouts[i];
            const planks = this.flyouts[i].getElementsByClassName('plank');
            this.flyouts[i].planks = [];
            for (var j = 0; j < planks.length; j++) {
                this.flyouts[i].planks.push(planks[j]);
            }
        }
        const topNavButtons = this.nav.querySelectorAll('[data-flyout]');
        this.navButtons = [];
        for (var i = 0; i < topNavButtons.length; i++) {
            this.navButtons.push(topNavButtons[i]);
        }
    }
    initNavTransparency() {
        function getPageYOffset() {
            return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
        }
        if (getPageYOffset() > 10) {
            this.nav.classList.add('transparency-off');
        }
        const updateTransparencyOnScroll = throttle(event => {
            if (getPageYOffset() > 10) {
                this.nav.classList.add('transparency-off');
            } else {
                this.nav.classList.remove('transparency-off');
            }
        }, 175);
        window.addEventListener('scroll', updateTransparencyOnScroll);
    }
    attachEventHandlers(events) {
        Object.keys(events).forEach(selector => {
            delegate(this.nav, selector, 'click', events[selector].bind(this));
        });
    }
    toggleFlyout(event) {
        const clickedButton = event.delegateTarget;
        const targetFlyout = document.getElementById(clickedButton.getAttribute('data-flyout'));
        const targetPlank = document.getElementById(clickedButton.getAttribute('data-plank'));
        if (this.activePlanks && targetPlank === this.activePlanks[0]) {
            this.closeFlyout();
        } else {
            this.openFlyout(targetFlyout, targetPlank);
        }
    }
    toggleLayout() {
        if (this.activeFlyout) {
            this.closeFlyout();
        } else {
            this.openFlyout(this.flyouts[0], this.flyouts[0].planks[0]);
        }
    }
    openFlyout(targetFlyout, targetPlank) {
        this.activeFlyout = targetFlyout;
        this.activePlanks = [targetPlank];
        this.updateStateClasses();
    }
    closeFlyout() {
        if (this.activeFlyout) {
            this.nav.classList.remove(`${this.activeFlyout.id}-active`);
            this.activeFlyout = undefined;
            this.activePlanks = undefined;
            this.updateStateClasses();
        }
    }
    pushPlank(event) {
        event.preventDefault();
        const targetPlank = document.getElementById(event
            .delegateTarget
            .getAttribute('href')
            .slice(1));
        if (targetPlank) {
            this.activePlanks.push(targetPlank);
            this.updateStateClasses();
        }
    }
    popPlank() {
        event.preventDefault();
        this.activePlanks.pop();
        this.updateStateClasses();
    }
    updateStateClasses() {
        if (this.activeFlyout) {
            this.nav.classList.add('flyout-active');
            if (this.activeFlyout.classList.contains('from-right') === false) {
                this.nav.classList.add('from-left');
            }
        } else {
            this.nav.classList.remove('flyout-active', 'from-left');
        }
        this.flyouts.forEach(flyout => {
            if (flyout === this.activeFlyout) {
                flyout.classList.add('active');
                flyout.planks.forEach(plank => {
                    const plankIndex = this.activePlanks.indexOf(plank);
                    if (plankIndex >= 0) {
                        if (plankIndex === this.activePlanks.length - 1) {
                            plank.classList.add('active');
                            plank.classList.remove('pushed');
                        } else {
                            plank.classList.add('active', 'pushed');
                        }
                    } else {
                        plank.classList.remove('active', 'pushed');
                    }
                });
            } else {
                flyout.classList.remove('active');
                flyout.planks.forEach(plank => {
                    plank.classList.remove('active', 'pushed');
                });
            }
        });
        this.navButtons.forEach(button => {
            if (this.activePlanks && button.getAttribute('data-plank') === this.activePlanks[0].id) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
}

const navElement = document.getElementsByClassName('global-navigation')[0];
const globalNav = navElement ? new IntelGlobalNavigation(navElement) : undefined;
export default globalNav;
