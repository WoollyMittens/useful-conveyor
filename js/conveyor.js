/*
	Source:
	van Creij, Maurice (2019). "conveyor.js: Flexible Carousel", http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var Conveyor = function(cfg) {

	// PROPERTIES

	this.cfg = cfg;
  this.slides = null;
  this.index = null;
  this.busy = false;

	// METHODS

	this.init = function() {
    // store the slides
    this.slides = this.cfg.carousel.querySelectorAll('.conveyor-item');
    // add a previous button
    var prev = document.createElement('button');
    prev.innerHTML = 'Previous slide';
    prev.setAttribute('class', 'conveyor-prev');
    prev.addEventListener('click', this.update.bind(this, -1));
    this.cfg.control.appendChild(prev);
    // add a next button
    var next = document.createElement('button');
    next.innerHTML = 'Next slide';
    next.setAttribute('class', 'conveyor-next');
    next.addEventListener('click', this.update.bind(this, 1));
    this.cfg.control.appendChild(next);
    // reset after animation ends
    this.cfg.carousel.addEventListener('transitionend', this.finalise.bind(this, false));
    // add touch controls
    this.cfg.carousel.addEventListener('touchstart', this.onSwiped.bind(this, 'start'));
    this.cfg.carousel.addEventListener('touchmove', this.onSwiped.bind(this, 'move'));
    this.cfg.carousel.addEventListener('touchend', this.onSwiped.bind(this, 'end'));
  };

  this.update = function(delta) {
    // reject spammed clicks
    if (this.busy) return false;
    this.busy = true;
    setTimeout(this.unbusy.bind(this), 500);
    // update the counter
    this.index += delta;
    if (this.index < 0) this.index = this.slides.length - 1;
    if (this.index >= this.slides.length) this.index = 0;
    // if the carousel is moving to the left
    var carousel = this.cfg.carousel;
    if (delta < 0) {
      // allow transitions
      carousel.style.transition = 'transform ease 500ms';
      // translate the carousel the length of one slide in the required direction
      carousel.style.transform = 'translateX(' + (delta * this.slides[this.index].offsetWidth) + 'px)';
    } else {
      // set the offset to the left first
      carousel.style.transform = 'translateX(-' + this.slides[this.index].offsetWidth + 'px)';
      // translate back to 0
      window.requestAnimationFrame(this.finalise.bind(this, true));
    }
  };

  this.finalise = function(animated, evt) {
    // (dis)allow transitions
    this.cfg.carousel.style.transition = animated ? 'transform ease 500ms' : null;
    // reset the position
    this.cfg.carousel.style.transform = 'translateX(0px)';
    // increment the slides
    for (var a = 0, b = this.slides.length; a < b; a += 1) {
      this.slides[a].style.order = (a + this.index) % this.slides.length;
    };
  };

  this.unbusy = function() {
    // allow more clicks
    this.busy = false;
  };

	this.previous = function() {
		this.update(-1);
	}

	this.next = function() {
		this.update(1);
	}

	// EVENTS

	this.onSwiped = function(phase, evt) {
    switch(phase) {
      case 'start':
        // store the interaction
        this.touched = { 'clientX': evt.touches[0].clientX };
        break;
      case 'move':
        // cancel drag interaction
        evt.preventDefault();
        // cycle the carousel the swipe was far enough
        var delta = evt.touches[0].clientX - this.touched.clientX;
        if (delta < -50) { this.update(-1); this.touched.clientX = evt.touches[0].clientX; }
        else if (delta > 50) { this.update(1); this.touched.clientX = evt.touches[0].clientX; }
        break;
      case 'end':
        // reset the touch
        this.touched = null;
        break;
      default:
    }
  };

  this.init();
};

// return as a require.js module
if (typeof define != 'undefined') define([], function () { return Conveyor });
if (typeof module != 'undefined') module.exports = Conveyor;
