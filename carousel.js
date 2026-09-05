/**
 * Turns the static strip of album art into a seamless, looping marquee.
 *
 * The markup ships one group of covers so the page works without JavaScript
 * (it stays a horizontally scrollable row). Here we clone that group, which
 * gives the CSS animation an identical second copy to scroll into place, and
 * derive the duration from the measured width so the covers always travel at
 * the same speed no matter how many there are or how wide the viewport is.
 *
 * It also wires up touch-hold pausing; the cursor and keyboard equivalents are
 * handled in CSS.
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

  // Touch-hold pauses, matching what the cursor does on a pointer device.
  // The listeners sit on the strip itself, so a finger resting anywhere in it
  // counts — on a cover or in the gap between two.
  var hold = function () {
    marquee.classList.add("is-held");
  };
  var release = function (event) {
    // Only resume once every finger is off; a second touch keeps it paused.
    if (event.touches && event.touches.length) return;
    marquee.classList.remove("is-held");
  };

  // Passive: these never call preventDefault, so page scrolling stays smooth.
  marquee.addEventListener("touchstart", hold, { passive: true });
  marquee.addEventListener("touchend", release, { passive: true });
  marquee.addEventListener("touchcancel", release, { passive: true });

  // CSS suppresses the iOS callout; browsers that route a long press through
  // contextmenu instead (Android Chrome) need this. Only while a finger is
  // down, so a right-click on a desktop still opens the normal menu.
  marquee.addEventListener("contextmenu", function (event) {
    if (marquee.classList.contains("is-held")) event.preventDefault();
  });

  // The cover size is a clamp() of the viewport, so the distance changes on resize.
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateDuration, 150);
  });
})();
