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
      navMenuHeight = navLinks.clientHeight;
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
            navMenuHeight = navLinks.clientHeight;
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
        navLinks.style.height = navMenuExtended ? navMenuHeight + "px" : 0;
      }
    }
  }
})