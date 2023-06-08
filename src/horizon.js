let navMenuExtended = false;
let navMenuHeight = -1;

document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.getElementsByClassName("nav-menu")[0] ?? undefined;
  const navLinks = document.getElementsByClassName("nav-links")[0] ?? undefined;

  if (navMenu) {
    if (location.hash) {
      const currentHash = location.hash;
      for (const child of navLinks.children) {
        const linkNode = child.firstElementChild;
        if (linkNode.getAttribute("href") === currentHash) {
          linkNode.classList.add("active");
        } else {
          linkNode.classList.remove("active");
        }
      }
    }
    addEventListener("hashchange", (event) => {
      const currentHash = location.hash;
      for (const child of navLinks.children) {
        const linkNode = child.firstElementChild;
        if (linkNode.getAttribute("href") === currentHash) {
          linkNode.classList.add("active");
        } else {
          linkNode.classList.remove("active");
        }
      }
    });

    if (window.innerWidth <= 850) {
      const offset = Array.from(navLinks.children).reduce((acc, _child) => acc - (70 / 2), navLinks.clientHeight);
      navMenuHeight = offset;
      navLinks.style.height = "0px";
    }

    window.onresize = () => {
      if (navLinks) {
        const resizedTo = window.innerWidth;
        if (resizedTo > 850) {
          navLinks.classList.remove("extended");
          navLinks.style.height = "";
        } else {
          if (navMenuHeight === -1) {
            const offset = navLinks.clientHeight;
            navMenuHeight = offset;
            navLinks.style.height = "0px";
          }
          if (navMenuExtended) {
            navLinks.classList.add("extended");
            navLinks.style.height = navMenuHeight + "px";
          } else {
            navLinks.style.height = "0px";
          }
        }

      }
    }
    navMenu.onclick = () => {
      if (navLinks) {
        navMenuExtended = navLinks.classList.toggle("extended");
        if (navMenuExtended) navMenu.classList.add("extended");
        else navMenu.classList.remove("extended");

        navLinks.style.height = navMenuExtended ? navMenuHeight + "px" : 0;
      }
    }
  }
})