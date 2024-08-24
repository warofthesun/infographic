window.addEventListener("message", function (event) {
  if (event.source !== window) {
    // check origin of the message
    const frames = document.getElementsByTagName("iframe");
    const framesLength = frames.length;
    // loop through all iframes
    for (var i = 0; i < framesLength; i++) {
      if (frames[i].contentWindow === event.source) {
        if (event.data.data && typeof event.data.data.height !== "undefined") {
          // set the height of the iframe from the message
          frames[i].style.height = event.data.data.height + "px";
        }
        break;
      }
    }
  }
});

// refresh the iframes when they are scrolled into view to load animations
function checkIframes() {
  const toRefresh = document.querySelectorAll("iframe.refresh");
  toRefresh.forEach(function (element) {
    const top_of_element = element.getBoundingClientRect().top + window.scrollY;
    const bottom_of_element = top_of_element + element.offsetHeight;
    const bottom_of_screen = window.scrollY + window.innerHeight;
    const top_of_screen = window.scrollY;

    if (
      bottom_of_screen > top_of_element &&
      top_of_screen < bottom_of_element
    ) {
      element.classList.remove("refresh");
      element.src = element.src;
    }
  });
}
window.addEventListener("scroll", checkIframes);
document.addEventListener("DOMContentLoaded", checkIframes);
