class videoHover {
    constructor(element) {
        this.container = element;
        this.video = element.getElementsByTagName('video')[0];
        if (this.video) {
            element.addEventListener('mouseenter', this.startVideo.bind(this));
            element.addEventListener('mouseleave', this.stopVideo.bind(this));
            window.addEventListener('resize', this.initVideo.bind(this));
            this.initVideo();
        }
    }
    initVideo() {
        const videoAspectRatio = this.video.clientWidth / this.video.clientHeight;
        const newVideoWidth = this.container.clientWidth * videoAspectRatio * 1.5;
        const newVideoHeight = newVideoWidth / videoAspectRatio;
        const offsetLeft = (newVideoWidth - this.container.clientWidth) / 2;
        const offsetTop = (newVideoHeight - this.container.clientHeight) / 2;
        this.video.volume = 0;
        this.video.style.width = `${newVideoWidth}px`;
        this.video.style.height = `${newVideoHeight}px`;
        this.video.style.left = `-${offsetLeft}px`;
        this.video.style.top = `-${offsetTop}px`;
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
