const idfBlade = document.getElementById('idf-2016-blade');
let isInView = false;
const onLoad = window.addEventListener('load', checkIfScrolledIntoView);
const onScroll = window.addEventListener('scroll', checkIfScrolledIntoView);

function checkIfScrolledIntoView() {
    const bladeTop = idfBlade.getBoundingClientRect().top;
    const bladeBottom = idfBlade.getBoundingClientRect().bottom;
    if (bladeTop > 50 && bladeBottom < window.innerHeight - 50) {
        window.removeEventListener('load', onLoad, false);
        window.removeEventListener('scroll', onScroll, false);
        console.log('triggered');
        idfBlade.classList.add('visible');
    }
}
