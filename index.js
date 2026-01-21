document.addEventListener("DOMContentLoaded", () => {
  feather.replace();

  const song = document.getElementById("song");
  const progress = document.getElementById("progress");
  const time = document.getElementById("time");
  const ctrlIcon = document.getElementById("ctrlIcon");
  const rewind = document.getElementById("rewind");
  const fastForward = document.getElementById("fastForward");
  const lyricsContainer = document.getElementById("lyricsContainer");

  ctrlIcon.innerHTML = feather.icons.play.toSvg({
    width: 28,
    height: 28,
  });

  song.onloadedmetadata = () => {
    progress.max = song.duration;
    progress.value = song.currentTime;
  };

  window.playPause = function () {
    if (song.paused) {
      song.play();
      ctrlIcon.innerHTML = feather.icons.pause.toSvg({
        width: 28,
        height: 28,
      });
    } else {
      song.pause();
      ctrlIcon.innerHTML = feather.icons.play.toSvg({
        width: 28,
        height: 28,
      });
    }
  };
  const lyrics = [
    { time: 23, text: "Crawling in my skin" },
    { time: 27, text: "These wounds, they will not heal" },
    { time: 32, text: "Fear is how I fall" },
    { time: 37, text: "Confusing what is real" },
    {
      time: 51,
      text: "There's something inside me that pulls beneath the surface",
    },
    { time: 56, text: "Consuming, confusing" },
    { time: 61, text: "This lack of self control I fear is never ending" },
    { time: 66, text: "Controlling" },
    { time: 67, text: "I can't seem" },
    { time: 70, text: "To find myself again" },
    { time: 72, text: "My walls are closing in" },
    { time: 74, text: "(Without a sense of confidence, I'm convinced)" },
    { time: 77, text: "(That there's just too much pressure to take)" },
    { time: 80, text: "I've felt this way before" },
    { time: 82, text: "So insecure" },
    { time: 87, text: "Crawling in my skin" },
    { time: 92, text: "These wounds, they will not heal" },
    { time: 97, text: "Fear is how I fall" },
    { time: 101, text: "Confusing what is real" },
    { time: 106, text: "Discomfort, endlessly has pulled itself upon me" },
    { time: 111, text: "Distracting, reacting" },
    { time: 116, text: "Against my will I stand beside my own reflection" },
    { time: 120, text: "It's haunting" },
    { time: 122, text: "How I can't seem" },
    { time: 126, text: "To find myself again" },
    { time: 127, text: "My walls are closing in" },
    { time: 128, text: "(Without a sense of confidence, I'm convinced)" },
    { time: 129, text: "(That there's just too much pressure to take)" },
    { time: 134, text: "I've felt this way before" },
    { time: 137, text: "So insecure" },
    { time: 145, text: "Crawling in my skin" },
    { time: 149, text: "These wounds, they will not heal" },
    { time: 153, text: "Fear is how I fall" },
    { time: 158, text: "Confusing what is real" },
    { time: 163, text: "Crawling in my skin" },
    { time: 167, text: "These wounds, they will not heal" },
    { time: 172, text: "Fear is how I fall" },
    { time: 178, text: "Confusing, confusing what is real" },
    {
      time: 181,
      text: "There's something inside me that pulls beneath the surface",
    },
    { time: 186, text: "Consuming (confusing what is real)" },
    { time: 191, text: "This lack of self control I fear is never ending" },
    { time: 196, text: "Controlling (confusing what is real)" },
  ];

  // Render lirik
  lyrics.forEach((line) => {
    const p = document.createElement("p");
    p.textContent = line.text;
    lyricsContainer.appendChild(p);
  });
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }
  song.addEventListener("timeupdate", () => {
    progress.value = song.currentTime;
    time.textContent = formatTime(song.currentTime);

    lyrics.forEach((line, index) => {
      const p = lyricsContainer.children[index];
      if (
        song.currentTime >= line.time &&
        (index === lyrics.length - 1 || progress.value < lyrics[index + 1].time)
      ) {
        p.classList.add("text-red-600", "font-bold");
        const containerTop = lyricsContainer.getBoundingClientRect().top;
        const pTop = p.getBoundingClientRect().top;
        const offset = 50;
        lyricsContainer.scrollTop += pTop - containerTop - offset;
      } else {
        p.classList.remove("text-red-600", "font-bold");
      }
    });
  });

  progress.addEventListener("input", () => {
    song.currentTime = progress.value;
  });

  rewind.addEventListener("click", () => {
    song.currentTime = Math.max(0, song.currentTime - 5);
  });

  fastForward.addEventListener("click", () => {
    song.currentTime = Math.min(song.duration, song.currentTime + 5);
  });
});
