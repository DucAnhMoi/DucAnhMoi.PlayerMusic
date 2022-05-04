$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);

var btnSigninBox = $(".sign_form-main-btn-box-in"),
  btnSignupBox = $(".sign_form-main-btn-box-up"),
  btnSignin = $(".sign_form-main-btn-in"),
  btnSignup = $(".sign_form-main-btn-up"),
  form = $(".sign_form-main"),
  signFormin = $(".sign_form-in"),
  signFormup = $(".sign_form-up"),
  playPauseBtn = $(".content-handle-main-play"),
  rotatoBtn = $(".content-handle-main-rotato"),
  preBtn = $(".content-handle-main-pre"),
  nextBtn = $(".content-handle-main-next"),
  shuffleBtn = $(".content-handle-main-shuffle"),
  listSong = $(".footer-list-song");

Validator({
  form: ".sign_form-in",
  errorSelector: ".sign_form-message",
  rules: [Validator.isRequired("#fullname"), Validator.isRequired("#password")],
});
// Validator sign up
Validator({
  form: ".sign_form-up",
  errorSelector: ".sign_form-message",
  rules: [
    Validator.isRequired("#fullname"),
    Validator.isRequired("#email"),
    Validator.isEmail("#email"),
    Validator.isRequired("#password"),
    Validator.minLength("#password", 6),
    Validator.isRequired("#password_confirmation"),
    Validator.isPasswordConfirmation(
      "#password_confirmation",
      "#password",
      ".sign_form-up"
    ),
  ],
});

function start() {
  // runCode signin sign up
  btnChangeFormMain();
  handleOnTouchMove();
  $$(".sign_form-group-other-item").forEach(function (btn) {
    btn.onclick = () => {
      alert("Chả có gì đâu, ấn con cua nhé!!!!");
    };
  });
  $(".sign_form-forgetps").onclick = () => {
    alert("Chả có gì đâu, ấn con cua nhé!!!!");
  };
  app();
}

function btnSignUp() {
  form.classList.add("sign_form-main-change");
  btnSigninBox.classList.remove("opacity");
  btnSignupBox.classList.add("opacity");
  changeVariableColor("#f43648", "#03a9f4");
  signFormin.classList.add("sign_form-in-change");
  signFormup.classList.add("sign_form-up-change");
}

function btnSignIn() {
  form.classList.remove("sign_form-main-change");
  btnSigninBox.classList.add("opacity");
  btnSignupBox.classList.remove("opacity");
  changeVariableColor("#03a9f4", "#f43648");
  signFormin.classList.remove("sign_form-in-change");
  signFormup.classList.remove("sign_form-up-change");
}

// sign in and sign up
function btnChangeFormMain() {
  // click btn to change form
  btnSignup.onclick = function () {
    btnSignUp();
  };
  btnSignin.onclick = function () {
    btnSignIn();
  };
}

// Change color change variable func
function changeVariableColor(value1, value2) {
  document.documentElement.style.setProperty("--color-sign-change-1", value1);
  document.documentElement.style.setProperty("--color-sign-change-2", value2);
}

// Change form by scroll
function handleOnTouchMove() {
  var i = 0;
  document.querySelector("body").ontouchmove = function () {
    i = i + 1;
    if (i >= 50 && btnSigninBox.contains(document.querySelector(".opacity"))) {
      btnSignUp();
      i = 0;
    } else if (
      i >= 50 &&
      btnSignupBox.contains(document.querySelector(".opacity"))
    ) {
      btnSignIn();
      i = 0;
    }
  };
}

// Run code App
function app() {
  var i = 0;
  isPlaying = false;
  isRandom = false;
  isRotato = false;
  returnSign();
  renderListSong();
  renderSong(i);

  $(".content-audio").onended = function () {
    if (isRandom) {
      randomHandle();
    } else if (isRotato) {
      renderSong(i);
    } else {
      if (i >= 6) {
        i = 0;
        renderSong(i);
        $(".content-audio").play();
      } else {
        i = i + 1;
        renderSong(i);
        $(".content-audio").play();
      }
    }
  };

  timeLineHandle();

  nextBtn.onclick = function () {
    if (isRandom) {
      randomHandle();
    } else {
      if (i >= 6) {
        i = 0;
        renderSong(i);
        $(".content-audio").play();
      } else {
        i = i + 1;
        renderSong(i);
        $(".content-audio").play();
      }
    }
  };

  preBtn.onclick = function () {
    if (isRandom) {
      randomHandle();
    } else {
      if (i >= 6) {
        i = 0;
        renderSong(i);
        $(".content-audio").play();
      } else {
        i = i + 1;
        renderSong(i);
        $(".content-audio").play();
      }
    }
  };

  rotatoHandle();
  shuffleHandle();

  // pauseHandle();
  // playHandle();
  playPauseBtn.onclick = function () {
    if (isPlaying) {
      $(".content-audio").pause();
    } else {
      $(".content-audio").play();
    }
  };

  $(".content-audio").onplay = function () {
    isPlaying = true;
    $(".content-handle-main-play-i").classList.add("none");
    $(".content-handle-main-pause-i").classList.remove("none");
  };

  $(".content-audio").onpause = function () {
    isPlaying = false;
    $(".content-handle-main-play-i").classList.remove("none");
    $(".content-handle-main-pause-i").classList.add("none");
  };

  $(".content-audio").ontimeupdate = function () {
    if ($(".content-audio").duration) {
      const progressPercent =
        $(".content-audio").currentTime / $(".content-audio").duration;
      $(".content-handle-time-line-current").style.width =
        progressPercent * $(".content-handle-time-line").clientWidth + "px";
      if ($(".content-audio").currentTime <= 10) {
        $(".content-handle-timing").innerHTML = `0:0${Math.floor(
          $(".content-audio").currentTime
        )}`;
      } else if ($(".content-audio").currentTime <= 60) {
        $(".content-handle-timing").innerHTML = `0:${Math.floor(
          $(".content-audio").currentTime
        )}`;
      } else if ($(".content-audio").currentTime <= 70) {
        $(".content-handle-timing").innerHTML = `1:0${
          Math.floor($(".content-audio").currentTime) - 60
        }`;
      } else if ($(".content-audio").currentTime <= 120) {
        $(".content-handle-timing").innerHTML = `1:${
          Math.floor($(".content-audio").currentTime) - 60
        }`;
      } else if ($(".content-audio").currentTime <= 130) {
        $(".content-handle-timing").innerHTML = `2:0${
          Math.floor($(".content-audio").currentTime) - 120
        }`;
      } else if ($(".content-audio").currentTime <= 180) {
        $(".content-handle-timing").innerHTML = `2:${
          Math.floor($(".content-audio").currentTime) - 120
        }`;
      } else if ($(".content-audio").currentTime <= 190) {
        $(".content-handle-timing").innerHTML = `3:0${
          Math.floor($(".content-audio").currentTime) - 180
        }`;
      } else if ($(".content-audio").currentTime <= 240) {
        $(".content-handle-timing").innerHTML = `3:${
          Math.floor($(".content-audio").currentTime) - 180
        }`;
      } else if ($(".content-audio").currentTime <= 250) {
        $(".content-handle-timing").innerHTML = `4:0${
          Math.floor($(".content-audio").currentTime) - 240
        }`;
      } else if ($(".content-audio").currentTime <= 300) {
        $(".content-handle-timing").innerHTML = `4:${
          Math.floor($(".content-audio").currentTime) - 240
        }`;
      } else if ($(".content-audio").currentTime <= 310) {
        $(".content-handle-timing").innerHTML = `5:0${
          Math.floor($(".content-audio").currentTime) - 300
        }`;
      } else if ($(".content-audio").currentTime <= 360) {
        $(".content-handle-timing").innerHTML = `5:${
          Math.floor($(".content-audio").currentTime) - 300
        }`;
      } else if ($(".content-audio").currentTime <= 290) {
        $(".content-handle-timing").innerHTML = `6:0${
          Math.floor($(".content-audio").currentTime) - 360
        }`;
      } else if ($(".content-audio").currentTime <= 300) {
        $(".content-handle-timing").innerHTML = `6:${
          Math.floor($(".content-audio").currentTime) - 360
        }`;
      }
    }
  };

  songFavorite();
  pushlist();

  $$(".footer-list-song-item").forEach(function(e, index){
    e.onclick = function () {
      i = index
      renderSong(index)
      returnpushlistScroll();
    };
  })
}

var htmlListSong = "";
function renderListSong() {
  Songs.forEach(function (e, index) {
    htmlListSong += `<div class="footer-list-song-item">
                        <div class="footer-list-song-poster"><img src=${Songs[index].urlPoster} alt=""></div>
                        <div class="footer-list-song-title">
                            <div class="footer-list-song-title-time">${Songs[index].timeSong}</div>
                            <div class="footer-list-song-title-name">${Songs[index].nameSong}</div>
                            <div class="footer-list-song-title-singer">${Songs[index].nameSinger}</div>
                        </div>
                        <div class="footer-list-song-icon"><i class="fa-solid fa-ellipsis"></i></div>
                    </div>`;
  });
  listSong.innerHTML = htmlListSong;
}

function playHandle() {
  $(".content-audio").onplay = function () {
    $(".content-handle-main-play-i").classList.add("none");
    $(".content-handle-main-pause-i").classList.remove("none");
    playPauseBtn.onclick = function () {
      $(".content-audio").pause();
    };
  };
}
function pauseHandle() {
  $(".content-audio").onpause = function () {
    $(".content-handle-main-play-i").classList.remove("none");
    $(".content-handle-main-pause-i").classList.add("none");
    playPauseBtn.onclick = function () {
      $(".content-audio").play();
    };
  };
}

function nextHandle() {
  nextBtn.onclick = function () {
    renderSong(2);
  };
}

function preHandle() {
  preBtn.onclick = function () {
    preBtn.classList.toggle("active");
  };
}

function rotatoHandle() {
  rotatoBtn.onclick = function () {
    if (isRotato) {
      rotatoBtn.classList.remove("active");
      isRotato = false;
    } else {
      rotatoBtn.classList.add("active");
      isRotato = true;
    }
  };
}

function shuffleHandle() {
  shuffleBtn.onclick = function () {
    if (isRandom) {
      shuffleBtn.classList.remove("active");
      isRandom = false;
    } else {
      shuffleBtn.classList.add("active");
      isRandom = true;
    }
  };
}

function randomHandle() {
  renderSong(Math.floor(Math.random() * 7));
}

var timeLineElement = $(".content-handle-time-line");
var timeLineCurrentElement = $(".content-handle-time-line-current");

function timeLineHandle() {
  timeLineElement.ontouchmove = function (event) {
    if (
      (event.changedTouches[0].clientX - 32) / timeLineElement.clientWidth <=
      1
    ) {
      timeLineCurrentElement.style.width =
        ((event.changedTouches[0].clientX - 32) / timeLineElement.clientWidth) *
          timeLineElement.clientWidth +
        "px";
    }
    $(".content-audio").currentTime =
      (timeLineCurrentElement.clientWidth / timeLineElement.clientWidth) *
      $(".content-audio").duration;
  };
  timeLineElement.onmousedown = function (event) {
    timeLineCurrentElement.style.width =
      ((event.clientX - 32) / timeLineElement.clientWidth) *
        timeLineElement.clientWidth +
      "px";
    $(".content-audio").currentTime =
      (timeLineCurrentElement.clientWidth / timeLineElement.clientWidth) *
      $(".content-audio").duration;
  };
}

function renderSong(index) {
  $(".content-audio").src = Songs[index].urlSong;
  $(".content-poster-img").src = Songs[index].urlPoster;
  $(".content-title-song-name").innerHTML = Songs[index].nameSong;
  $(".content-title-song-singer").innerHTML = Songs[index].nameSinger;

  for (var i = 0; i < Songs.length; i++) {
    if (i == index) {
      $$(".footer-list-song-item")[i].classList.add(
        "footer-list-song-item-active"
      );
    } else {
      $$(".footer-list-song-item")[i].classList.remove(
        "footer-list-song-item-active"
      );
    }
  }
  renderTimeSong(index);
}

function renderTimeSong(index) {
  $(".content-handle-time-end").innerHTML = Songs[index].timeSong;
}

function returnSign() {
  $$(".header-icon-box")[0].onclick = function (e) {
    $(".sign_form").classList.remove("none");
    $(".app").classList.add("none");
  };
}

function songFavorite() {
  $(".content-title-icon").onclick = function (e) {
    $(".content-title-icon").classList.toggle("content-title-icon--active");
  };
}

function pushlist() {
  $$(".header-icon-box")[1].onclick = function (e) {
    if (window.scrollY >= 600) {
      returnpushlistScroll();
    } else {
      pushlistScroll();
    }
  };
}

function pushlistScroll() {
  window.scroll({
    top: 600,
    behavior: "smooth",
  });
}

function returnpushlistScroll() {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Run code all
start();
