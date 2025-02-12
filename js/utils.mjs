export function renderWithTemplate(template, parentElement, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback();
  }
}

export async function loadTemplate(path) {
  const html = await fetch(path);
  const template = await html.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerElement = document.querySelector("#index-header");
  const headerTemplate = await loadTemplate("../partials/header.html");

  const footerElement = document.querySelector("#index-footer");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  renderWithTemplate(headerTemplate, headerElement, hamButton);
  renderWithTemplate(footerTemplate, footerElement, currentYear);
}

export async function currentYear() {
  const year = document.querySelector("#currentYear");
  const date = new Date();
  const cYear = date.getFullYear();
  year.innerHTML = cYear;
}

export function hamButton() {
  const hamButton = document.querySelector("#hamburguer-menu");
  const nav = document.querySelector("#header-nav");
  hamButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    hamButton.classList.toggle("open");
    if (hamButton.classList.contains("open")) {
      hamButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>`;
    } else {
      hamButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>`;
    }
  });
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export async function Search(id, callback) {
  const search = document.querySelector("#search");
  const searchBtn = document.querySelector("#btn-search");
  const message = document.querySelector("#results-message");

  searchBtn.addEventListener("click", () => {
    const searchValue = search.value.trim();
    if (searchValue !== "") {
      //window.location.href = `${path}.html?search=${encodeURIComponent(searchValue)}`;
      const htmlElement = document.getElementById(id);
      message.innerHTML = `Results for: <strong>"${searchValue}"</strong>`;
      htmlElement.innerHTML = "";

      if (callback) {
        callback(searchValue);
      }
    }
  });

  search.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      searchBtn.click();
    }
  });
}

export function modalModel(template, callback) {
  const modal = document.querySelector("#modal");
  const close = document.createElement("span");
  modal.innerHTML = "";
  modal.innerHTML = template;

  close.classList.add("close");
  close.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="48px" fill="#000"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>`;
  modal.appendChild(close);
  if (callback) {
    callback();
  }
  modal.showModal();
  close.addEventListener("click", () => {
    modal.close();
  });
}

export function removeItem(key, index) {
  let storage = getLocalStorage(key);
  storage.splice(index, 1);
  setLocalStorage(key, storage);
}
