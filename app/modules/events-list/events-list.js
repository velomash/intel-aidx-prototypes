///////////////////////////////////////////////////////////////
//                                                           //
//                    Intel Event List                       //
//                    by: Adam Trimble                       //
//                 © Intel Corporation 2016                  //
//                                                           //
///////////////////////////////////////////////////////////////

const $eventItems = $('.events-list .event-item');
const $loadMoreBtn = $('#load-more-events');

$eventItems.on('click', '.event-item-expander', event => {
  $(event.delegateTarget).toggleClass('expanded');
});

$loadMoreBtn.on('click', () => {
  $eventItems.slice(-6).clone().insertBefore($loadMoreBtn);
});
