function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

const alacrityApp = {

  elems: {
    sectWrapper: document.querySelector(".sections-list"),
    sectList: document.querySelectorAll(".sections-list__item"),
    actSect: "",
    nav: document.querySelector(".main-nav"),
    navList: document.querySelectorAll(".main-nav__item"),
    navItemAct: "",
    mirrorNavList: document.querySelectorAll(".mirror-nav__item"),
    mirrorNavItemAct: "",
    upButton: document.querySelector(".swipe__button--top"),
    downButton: document.querySelector(".swipe__button--bottom")
  },

  selectors: {
    sectActClass: "sections-list__item--active",
    navActClass: "main-nav__item--active",
    mirrorNavActClass: "mirror-nav__item--active"
  },

  hashes: [],

  location: function () {

    this.hashes = (() => {
      let hashes = [];
      this.elems.navList.forEach((el, i, arr) => {
        hashes.push(el.dataset.name);
      });
      return hashes;
    })();
    if (location.hash !== "") {
      let hash = location.hash.slice(1),
        test;
      for (let i = this.hashes.length; i--;) {
        if (this.hashes[i] === hash) test = true;
      }
      if (test) {
        this.elems.navList.forEach((el, i, arr) => {
          if (el.dataset.name === hash) {
            el.classList.add(this.selectors.navActClass);
            this.elems.navItemAct = el;
          }
        });
        this.elems.mirrorNavList.forEach((el, i, arr) => {
          if (el.dataset.name === hash) {
            el.classList.add(this.selectors.mirrorNavActClass);
            this.elems.mirrorNavItemAct = el;
          }
        });
        this.elems.sectList.forEach((el, i, arr) => {
          if (el.dataset.name === hash) {
            el.classList.add(this.selectors.sectActClass);
            this.elems.actSect = el;
          }
        });
      }
    } else {
      this.elems.navList[0].classList.add(this.selectors.navActClass);
      this.elems.navItemAct = this.elems.navList[0];
      this.elems.mirrorNavList[0].classList.add(this.selectors.mirrorNavActClass);
      this.elems.mirrorNavItemAct = this.elems.mirrorNavList[0];
      this.elems.sectList[0].classList.add(this.selectors.sectActClass);
      this.elems.actSect = this.elems.sectList[0];
    }

  },

  updateLocation: function (locationPoint) {

    location.hash = locationPoint.dataset.name;

  },

  menuToggle: function () {

    this.elems.navList.forEach((el, i, arr) => {

      el.addEventListener("click", (e) => {
        e.preventDefault();
        this.elems.navItemAct.classList.remove(this.selectors.navActClass);
        el.classList.add(this.selectors.navActClass);
        this.elems.navItemAct = el;
        this.elems.actSect.classList.remove(this.selectors.sectActClass);
        this.elems.sectList[i].classList.add(this.selectors.sectActClass);
        this.elems.actSect = this.elems.sectList[i];
        this.elems.mirrorNavItemAct.classList.remove(this.selectors.mirrorNavActClass);
        this.elems.mirrorNavList[i].classList.add(this.selectors.mirrorNavActClass);
        this.elems.mirrorNavItemAct = this.elems.mirrorNavList[i];
        this.updateLocation(this.elems.actSect);

      });
    });
  },

  countToggle: function (indication) {

    if (((1 * this.elems.navItemAct.dataset.num < this.elems.navList.length - 1) && (indication > 0)) || ((1 * this.elems.navItemAct.dataset.num > 0) && (indication < 0))) {
      this.elems.navItemAct.classList.remove(this.selectors.navActClass);
      this.elems.navList[1 * this.elems.navItemAct.dataset.num + indication].classList.add(this.selectors.navActClass);
      this.elems.navItemAct = this.elems.navList[1 * this.elems.navItemAct.dataset.num + indication];

      this.elems.mirrorNavItemAct.classList.remove(this.selectors.mirrorNavActClass);
      this.elems.mirrorNavList[1 * this.elems.mirrorNavItemAct.dataset.num + indication].classList.add(this.selectors.mirrorNavActClass);
      this.elems.mirrorNavItemAct = this.elems.mirrorNavList[1 * this.elems.mirrorNavItemAct.dataset.num + indication];

      this.elems.actSect.classList.remove(this.selectors.sectActClass);
      this.elems.sectList[1 * this.elems.actSect.dataset.num + indication].classList.add(this.selectors.sectActClass);
      this.elems.actSect = this.elems.sectList[1 * this.elems.actSect.dataset.num + indication];

      this.updateLocation(this.elems.actSect);
    }
  },

  mouseWheel: function () {

    this.elems.sectWrapper.addEventListener("wheel", (e) => {

      e.preventDefault();
      if (e.deltaY > 0) this.countToggle(1);
      else if (e.deltaY < 0) this.countToggle(-1);

    });
  },

  swipe: function () {

    let startPointY,
      nowPointY,
      pointsDifference,
      startTime,
      endTime,
      timeDifference;

    return (() => {

      this.elems.sectWrapper.addEventListener("touchstart", (e) => {

        //e.preventDefault();
        //e.stopPropagation();
        startPointY = e.changedTouches[0].pageY;
        startTime = new Date();

      });

      this.elems.sectWrapper.addEventListener("touchmove", (e) => {

        e.preventDefault();
        e.stopPropagation();
        nowPointY = e.changedTouches[0].pageY;
        pointsDifference = startPointY - nowPointY;

        if (Math.abs(pointsDifference) > 200) {
          startPointY = nowPointY;
          if (pointsDifference > 0) this.countToggle(1);
          else if (pointsDifference < 0) this.countToggle(-1);
        }

      });

      this.elems.sectWrapper.addEventListener("touchend", (e) => {

        nowPointY = e.changedTouches[0].pageY;
        pointsDifference = startPointY - nowPointY;
        endTime = new Date;
        timeDifference = endTime.getTime() - startTime.getTime();

        if (Math.abs(pointsDifference) > 20 && timeDifference < 200) {
          if (pointsDifference > 0) this.countToggle(1);
          else if (pointsDifference < 0) this.countToggle(-1);
        }

      });

    })();

  },

  buttonUp: function () {
    this.elems.upButton.addEventListener("click", (e) => {
      this.countToggle(-1);
    });
  },

  buttonDown: function () {
    this.elems.downButton.addEventListener("click", (e) => {
      this.countToggle(1);
    });
  },

  run: function () {

    this.location();
    this.menuToggle();
    this.buttonUp();
    this.buttonDown();
    if (/(iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone|WPDesktop|WP7|IEMobile|Opera Mini)/i.test(navigator.userAgent)) {
      this.swipe();
    } else {
      this.mouseWheel();
    }
  }
}

ready(function () {
  console.log('DOM ready');
  particlesJS("particles-js", "/assets/particlesjs-config.json");
  alacrityApp.run();
});
