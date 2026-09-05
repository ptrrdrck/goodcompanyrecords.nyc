/**
 * Turns the static strip of album art into a seamless, looping marquee.
 *
 * The markup ships one group of covers so the page works without JavaScript
 * (it stays a horizontally scrollable row). Here we clone that group, which
 * gives the CSS animation an identical second copy to scroll into place, and
 * derive the duration from the measured width so the covers always travel at
 * the same speed no matter how many there are or how wide the viewport is.
 */
(function () {
  "use strict";

  var PIXELS_PER_SECOND = 70;

  var marquee = document.querySelector("[data-marquee]");
  if (!marquee) return;

  var track = marquee.querySelector("[data-marquee-track]");
  var group = track && track.firstElementChild;
  if (!group) return;

  var clone = group.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  track.appendChild(clone);

  function updateDuration() {
    var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    // One cycle travels a full group plus the gap that follows it.
    var distance = group.getBoundingClientRect().width + gap;
    if (!distance) return;
    marquee.style.setProperty(
      "--marquee-duration",
      (distance / PIXELS_PER_SECOND).toFixed(2) + "s"
    );
  }

  updateDuration();
  marquee.classList.add("is-animated");

  // The cover size is a clamp() of the viewport, so the distance changes on resize.
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateDuration, 150);
  });
})();
