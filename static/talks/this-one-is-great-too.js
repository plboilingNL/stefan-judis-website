navigator.geolocation.getCurrentPosition(() => {}, () => {});
navigator.getUserMedia(
  { audio: true, video: { width: 1280, height: 720 } },
  () => {},
  () => {}
);
