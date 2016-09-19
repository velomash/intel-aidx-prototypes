class videoHover {
    constructor(element) {
        this.container = element;
        this.video = element.getElementsByTagName('video')[0];
        if (this.video) {
            this.initVideo();
            element.addEventListener('mouseenter', this.startVideo.bind(this));
            element.addEventListener('mouseleave', this.stopVideo.bind(this));
        }
    }
    initVideo() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        const videoWidth = this.video.clientWidth;
        const videoHeight = this.video.clientHeight;
        const ratio = videoWidth / videoHeight;
        const newVideoWidth = height * ratio * 1.5;
        const newVideoHeight = newVideoWidth / ratio;
        const offset = videoWidth - width / 2;
        this.video.volume = 0;
        this.video.style.width = `${newVideoWidth}px`;
        this.video.style.height = `${newVideoHeight}px`;
        this.video.style.left = `-${offset}px`;
        this.video.style.top = '-100px';
        this.video.style.opacity = 0;
    }
    startVideo() {
        this.video.currentTime = this.video.getAttribute('data-start');
        this.video.play();
        this.video.style.opacity = 1;
    }
    stopVideo() {
        this.video.pause();
        this.video.style.opacity = 0;
    }
}

const videoHovers = document.getElementsByClassName('video-hover');
for (var i = 0; i < videoHovers.length; i++) {
    const vh = videoHovers[i];
    new videoHover(vh);
}
