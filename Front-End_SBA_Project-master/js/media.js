document.addEventListener('DOMContentLoaded', () => {
  const videoData = [
    { src: 'videos/citytraffic.mp4', thumbId: 'city-drive' },
    { src: 'videos/desertdrive.mp4', thumbId: 'desert-drive' },
    { src: 'videos/javaclass.mp4', thumbId: 'java-class' },
    { src: 'videos/ontheroad.mp4', thumbId: 'the-road' },
    { src: 'videos/tunnel.mp4', thumbId: 'tunnel-drive' }
  ];

  const mainVideo = document.getElementById('main-video');

  videoData.forEach(({ src, thumbId }) => {
    // Create a hidden video element
    const videoElement = document.createElement('video');
    videoElement.src = src;
    videoElement.muted = true;
    videoElement.currentTime = 5; // Capture a frame at 5 seconds

    // Create a canvas for thumbnail generation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 150;
    canvas.height = 100;

    // Wait for the video to load
    videoElement.addEventListener('loadeddata', () => {
      console.log(`Generating thumbnail for: ${src}`);
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // Set the generated thumbnail as the source for the <img> tag
      const thumbnailImg = document.getElementById(thumbId);
      if (thumbnailImg) {
        thumbnailImg.src = canvas.toDataURL('image/jpeg'); // Generate the thumbnail
        thumbnailImg.dataset.videoSrc = src; // Store video path for playback
      }
    });

    // Add click event to play the video
    const thumbnailElement = document.getElementById(thumbId);
    if (thumbnailElement) {
      thumbnailElement.addEventListener('click', (event) => {
        console.log(`Playing video: ${event.target.dataset.videoSrc}`);
        mainVideo.src = event.target.dataset.videoSrc; // Update main video source
        mainVideo.play();
      });
    }
  });
});
