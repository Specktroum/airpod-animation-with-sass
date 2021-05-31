const animateCase = gsap.timeline({ paused: true });
const animateEarPod = new TimelineMax({ paused: true, repeat: -1, yoyo: true });
const animatePlugCharger = new TimelineMax({ paused: true });

animateCase
  .to(".case-wrapper", 0.1, {
    rotateZ: "-3em"
  })
  .to(".case-wrapper", 0.1, {
    rotateZ: "3em"
  })
  .set(".case-wrapper", { rotateZ: 0 })
  .set(".case-opening-front", { borderBottom : 0 })
  .to(".case-opening-front", 0.75, {
    rotateX: 180,
    transformOrigin: "center center"
  })
  .set(".case-opening-front", { borderRadius: "0 0 60px 60px" })
  .to(".ear-pod-wrapper", 1, {
    ease: "back",
    translateY: -180
  });
animateEarPod
  .to(".ear-pod-wrapper", 2, {
    translateY: -190
  }, 0);
animatePlugCharger
  .to(".charger-wire", 0.1, {
    bottom: "calc(50% - 360px)"
  })
  .to(".case-wrapper", 0.1, {
    rotateZ: "-3em"
  })
  .to(".case-wrapper", 0.1, {
    rotateZ: "3em"
  })
  .set(".case-wrapper", { rotateZ: 0 });
let toggle = true;
$(".case-wrapper").click(() => {
  if (toggle) {
    animateEarPod.kill();
    animateCase.restart();
    modeSwitchToggle ?
    $(".case .indicator").css("backgroundColor", "#FFF") :
    $(".case .indicator").css("backgroundColor", "#111") ;
  } else {
    animateEarPod.kill();
    animateCase.reverse();
    chargerToggle
      ? $(".case .indicator").css("backgroundColor", "lightgreen")
      : $(".case .indicator").css("backgroundColor", "#eb0029");
  }
  toggle = !toggle;
});

let chargerToggle = true;
$(".charger-text").click(() => {
  if (chargerToggle) {
    animatePlugCharger.restart();
    $(".case .indicator").css("backgroundColor", "#eb0029");
    $(".charger-text").text("Unplug the Charger");
  } else {
    animatePlugCharger.reverse();
    $(".case .indicator").css("backgroundColor", "lightgreen");
    $(".charger-text").text("Plug the Charger");
  }
  chargerToggle = !chargerToggle;
});

let modeSwitchToggle = true;
$(".mode-switch").click(function () {
  $("body").toggleClass("light-mode");
  $(".case").toggleClass("light-mode");
  $(".case-opening-front").toggleClass("light-mode");
  $(".ear-pod .line").toggleClass("light-mode");
  $(".ear-pod .bud").toggleClass("light-mode");
  $(".charger-text").toggleClass("light-mode");
  $(".menu:first-child").toggleClass("light-mode");
  if (modeSwitchToggle) {
    $("#light-mode-switch").css("display", "none");
    $("#dark-mode-switch").css("display", "block");
    toggle ?
    chargerToggle ? $(".case .indicator").css("backgroundColor", "lightgreen") : $(".case .indicator").css("backgroundColor", "#eb0029"):
    $(".case .indicator").css("backgroundColor", "#111");
    ;
  } else {
    $("#light-mode-switch").css("display", "block");
    $("#dark-mode-switch").css("display", "none");
    toggle ?
    chargerToggle ? $(".case .indicator").css("backgroundColor", "lightgreen") : $(".case .indicator").css("backgroundColor", "#eb0029") :
    $(".case .indicator").css("backgroundColor", "#FFF");
  }
  modeSwitchToggle = !modeSwitchToggle;
});
animateCase.eventCallback("onComplete", () => {
  animateEarPod.restart();
});