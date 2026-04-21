const elements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
} else {
  elements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

function openHashDetails() {
  const hash = window.location.hash;

  if (!hash) {
    return;
  }

  const target = document.querySelector(hash);

  if (!target) {
    return;
  }

  if (target.tagName === "DETAILS") {
    target.open = true;
  }

  requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") {
      return;
    }

    const target = document.querySelector(href);

    if (!target) {
      return;
    }

    event.preventDefault();

    if (target.tagName === "DETAILS") {
      target.open = true;
    }

    history.pushState(null, "", href);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

window.addEventListener("hashchange", openHashDetails);
window.addEventListener("load", openHashDetails);


const demoDrawers = document.querySelectorAll(".demo-drawer");

if (demoDrawers.length) {
  demoDrawers.forEach((drawer) => {
    drawer.addEventListener("toggle", () => {
      const currentVideo = drawer.querySelector(".demo-video");

      if (!currentVideo) {
        return;
      }

      if (drawer.open) {
        demoDrawers.forEach((otherDrawer) => {
          if (otherDrawer !== drawer) {
            const otherVideo = otherDrawer.querySelector(".demo-video");
            otherDrawer.open = false;

            if (otherVideo) {
              otherVideo.pause();
              otherVideo.currentTime = 0;
            }
          }
        });

        currentVideo.play().catch(() => {});
      } else {
        currentVideo.pause();
        currentVideo.currentTime = 0;
      }
    });
  });
}