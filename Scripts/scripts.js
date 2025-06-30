// Preloader modal
currentPercent = 0;
setInterval(function () {
  currentPercent =
    currentPercent >= 100 ? 0 : currentPercent + Math.random() / 2;
  preloadFunction(currentPercent);
}, 10);

preloadFunction = function (percent) {
  $(".preloadNumber").text(Math.floor(percent) + "%");
};

$(window).load(function () {
  $(".preloadModal").fadeOut("slow");
  $(".preloadNumber").remove();
});

// Random BG for rotate to view modal
$(document).ready(function () {
  window.onload = choosePic;

  var myPix = new Array(
    "assets/img/akinola-davies-jr-image-1.jpg",
    "assets/img/akinola-davies-jr-image-2.jpg",
    "assets/img/akinola-davies-jr-image-3.jpg",
    "assets/img/akinola-davies-jr-image-4.jpg",
    "assets/img/akinola-davies-jr-image-5.jpg"
  );

  function choosePic() {
    var randomNum = Math.floor(Math.random() * myPix.length);
    document.getElementById("rotatetoViewRandomImage").style.backgroundImage =
      "url(" + myPix[randomNum] + ")";
  }
});

// Setting up custom cursors
// and hiding hiding them on devices that don't support hover eg. tablets and phones
$(document).ready(function () {
  // Setting up media query event handler
  // Everything here mirrors values in our CSS
  if (matchMedia) {
    const mediaQuery = window.matchMedia("(hover: hover)");
    mediaQuery.addListener(WidthChange);
    WidthChange(mediaQuery);
  }

  // Listening to media query changes
  function WidthChange(mediaQuery) {
    if (mediaQuery.matches) {
      // Set page background when hovering over a sectionContainer
      $(".sectionContainer").mouseenter(function () {
        var sectionImage = $(this).find(".imageContainer img").attr("src");
        $(".mainContainer").css("background-image", "url(" + sectionImage + "");
      });

      // If our browser supports hover
      // Setting up variable for cursor using the div with customCursor class
      // See cursors.css for styling
      var cursor = $(".customCursor");

      // Making the custom cursor follow the input device and offsetting
      // the position to center the custom cursor container
      $(window).mousemove(function (e) {
        cursor.css({
          top: e.clientY - cursor.height() / 2,
          left: e.clientX - cursor.width() / 2
        });
      });

      // Change cursor to "Play" when hovering over sectionContainer div
      $(".sectionContainer")
        .mouseenter(function () {
          cursor.html("Play");
          cursor.css({
            background: "transparent",
            color: "#ffffff",
            "mix-blend-mode": "difference"
          });
        })
        .mouseleave(function () {
          cursor.css({
            background: "#000000"
          });
        });

      // Custom cursor for "Contact" modal trigger
      $(".logoContainer")
        .mouseenter(function () {
          cursor.html("Contact");
          cursor.css({
            background: "transparent"
          });
        })
        .mouseleave(function () {
          cursor.css({
            background: "#000000"
          });
        });

      // "Back" cursor on contact page close zone
      $(".contact__closeZone")
        .mouseenter(function () {
          cursor.html("Back");
          cursor.css({
            background: "transparent"
          });
        })
        .mouseleave(function () {
          cursor.html("");
          cursor.css({
            background: "#000000"
          });
        });

      // Contact modal dot cursor
      $(".contact__innerContainer")
        .mouseenter(function () {
          cursor.html("");
          cursor.css({
            background: "#000000",
            color: "#000000",
            "mix-blend-mode": "normal"
          });
        })
        .mouseleave(function () {
          cursor.html("");
          cursor.css({
            background: "transparent"
          });
        });

      // Link cursor on contact page
      $(".contact__innerContainer a")
        .mouseenter(function () {
          cursor.html("");
          cursor.css({
            background: "transparent"
          });
        })
        .mouseleave(function () {
          cursor.html("");
          cursor.css({
            background: "#000000"
          });
        });

      // "Close" cursor on videoContainer
      $(".videoClose")
        .mouseenter(function () {
          cursor.html("Close");
          cursor.css({
            background: "transparent"
          });
        })

        .mousemove(function () {
          var timer;
          var fadeInBuffer = false;
          if (!fadeInBuffer) {
            if (timer) {
              clearTimeout(timer);
              timer = 0;
            }
            cursor.css({
              opacity: "1"
            });
          } else {
            fadeInBuffer = false;
          }

          timer = setTimeout(function () {
            cursor.css({
              opacity: "0"
            });
            fadeInBuffer = true;
          }, 2000);
        })

        .mouseleave(function () {

          cursor.css({
            background: "transparent"
          });
        });

      // Hiding the custom cursor when input device leaves the browser window
      $(window)
        .mouseleave(function () {
          
          cursor.css({
            opacity: "0"
          });
        })
        .mouseenter(function () {
      
          cursor.css({
            opacity: "1"
          });
        });
    } else {
      // If browser doesn't support hover
    }
  }
});

// Main functions
$(document).ready(function () {
  // Contact modal toggle
  $(".contact__modalTrigger").click(function () {
    $(".contact__outerContainer").fadeToggle().css("display", "flex");

    // Kill video here
    $(".videoContainer").hide(function () {
    });
  });
});

$(document).ready(function () {
  // Triggering player modal and using Vimeo API to control it
  $(".sectionContainer").click(function () {
    // Kill all existing video players
    $(".videoContainer").hide();

    // Open video close overlay
    $(".videoClose").show();

    // Set up a variable for the video container
    var activeVideoContainer = $(this).find(".videoContainer");

    // Construct a player using Vimeo API
    var vimeoIframe = $(this).find("iframe");
    var vimeoPlayer = new Vimeo.Player(vimeoIframe);

    // Fade in the video container and log it into the console
    activeVideoContainer.fadeIn();


    // Trigger play event and log it into the console
    vimeoPlayer.play();
    vimeoPlayer.on("play", function () {

      vimeoPlayer.setLoop(true);
    });

    $(".videoClose").click(function () {
      // event.stopPropagation();
      vimeoPlayer.pause();
      vimeoPlayer
        .unload()
        .then(function () {

        })
        .catch(function (error) {
          console.log("error unloading vimeo player!");
        });

      activeVideoContainer.fadeOut();


      $(this).hide();
    });
  });
});
