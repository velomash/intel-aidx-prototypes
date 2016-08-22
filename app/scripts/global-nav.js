///////////////////////////////////////////////////////////////
//                                                           //
//                 Intel Global Navigation                   //
//                    by: Adam Trimble                       //
//                 © Intel Corporation 2016                  //
//                                                           //
///////////////////////////////////////////////////////////////

class IntelGlobalNavigation {
    constructor(navDomElement) {
    }
}

const navElement = document.getElementsByClassName('global-navigation')[0];
export default new IntelGlobalNavigation(navElement);
