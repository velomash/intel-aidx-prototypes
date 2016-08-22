///////////////////////////////////////////////////////////////
//                                                           //
//                 Intel Global Navigation                   //
//                    by: Adam Trimble                       //
//                 © Intel Corporation 2016                  //
//                                                           //
///////////////////////////////////////////////////////////////

class IntelGlobalNavigation {
    constructor(navDomElement) {
        this.nav = navDomElement;

        // init nav events
        $(this.nav).on('click touchstart', '[data-flyout]', this.openFlyout.bind(this));
        $(this.nav).on('click touchstart', '.shader', this.closeFlyout.bind(this));
    }
    openFlyout(event) {
        const panelId = event.currentTarget.getAttribute('data-flyout');
        this.nav.classList.add('flyout-active');
    }
    closeFlyout(event) {
        this.nav.classList.remove('flyout-active');
    }
}

const navElement = document.getElementsByClassName('global-navigation')[0];
export default new IntelGlobalNavigation(navElement);
