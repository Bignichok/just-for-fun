import renderSubCatalog from "./renderSubCatalog.js";
import { getData } from "./getData.js";

const Catalog = () => {
  const updateSubCatalog = renderSubCatalog();
  const btnBurger = document.querySelector(".btn-burger");
  const catalog = document.querySelector(".catalog");

  const subCatalog = document.querySelector(".subcatalog");

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.insertAdjacentElement("beforeend", overlay);

  const keyClose = (e) => {
    if (e.code === "Escape") {
      closeMenu();
    }
  };
  const openMenu = () => {
    catalog.classList.add("open");
    overlay.classList.add("active");
    document.addEventListener("keydown", keyClose);
  };

  const closeMenu = (e) => {
    catalog.classList.remove("open");
    overlay.classList.remove("active");
    subCatalog.classList.remove("subopen");

    document.removeEventListener("keydown", keyClose);
    closeSubMenu();
  };

  const handlerCatalog = (e) => {
    e.preventDefault();
    const target = e.target;
    const itemList = target.closest(".catalog-list__item");

    if (itemList) {
      getData.subCatalog(target.textContent, (data) => {
        updateSubCatalog(target.textContent, data);
        subCatalog.classList.add("subopen");
      });
    }

    if (target.closest(".btn-close")) {
      closeMenu();
    }
  };

  const closeSubMenu = (e) => {
    const target = e.target;
    if (target.closest(".btn-return")) {
      subCatalog.classList.remove("subopen");
    }
  };

  btnBurger.addEventListener("click", openMenu);

  overlay.addEventListener("click", closeMenu);
  catalog.addEventListener("click", handlerCatalog);
  subCatalog.addEventListener("click", closeSubMenu);
};

export default Catalog;
