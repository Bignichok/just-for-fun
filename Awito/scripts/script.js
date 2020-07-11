"use strict";

const dataBase = JSON.parse(localStorage.getItem("awito")) || [];

let counter = 0;
const modalAdd = document.querySelector(".modal__add"),
  addAd = document.querySelector(".add__ad"),
  modalBtnSubmit = document.querySelector(".modal__btn-submit"),
  modalSubmit = document.querySelector(".modal__submit"),
  catalog = document.querySelector(".catalog"),
  modalItem = document.querySelector(".modal__item"),
  modalBtnWarning = document.querySelector(".modal__btn-warning"),
  modalFileInput = document.querySelector(".modal__file-input"),
  modalFileBtn = document.querySelector(".modal__file-btn"),
  modalImageAdd = document.querySelector(".modal__image-add");

const modalImageItem = document.querySelector(".modal__image-item"),
  modalHeaderItem = document.querySelector(".modal__header-item"),
  modalStatusItem = document.querySelector(".modal__status-item"),
  modalDescriptionItem = document.querySelector(".modal__description-item"),
  modalCostItem = document.querySelector(".modal__cost-item");

const searchInput = document.querySelector(".search__input"),
  menuContainer = document.querySelector(".menu__container");

//Временные переменные
const textFileBtn = modalFileBtn.textContent;
const srcModalImage = modalImageAdd.src;

const elementsModalSubmit = [...modalSubmit.elements].filter((elem) => {
  return elem.tagName !== "BUTTON";
});

//work with photo

const infoPhoto = {};

// work with local storage
const saveDB = () => localStorage.setItem("awito", JSON.stringify(dataBase));

// check form
const checkForm = () => {
  const validForm = elementsModalSubmit.every((elem) => elem.value);
  modalBtnSubmit.disabled = !validForm;
  modalBtnWarning.style.display = validForm ? "none" : "";
};

//функциb закрития модального окна
const closeModal = function (event) {
  const target = event.target;

  if (
    target.closest(".modal__close") ||
    target.classList.contains("modal") ||
    event.code === "Escape"
  ) {
    modalAdd.classList.add("hide");
    modalItem.classList.add("hide");
    document.removeEventListener("keydown", closeModal);
    //очистка формы
    modalSubmit.reset();
    //очистка фото
    modalImageAdd.src = srcModalImage;
    modalFileBtn.textContent = textFileBtn;
    checkForm();
  }
};

//вывод объявлений

const renderCard = (DB = dataBase) => {
  catalog.textContent = "";
  DB.forEach((item) => {
    catalog.insertAdjacentHTML(
      "beforeend",
      `  <li class="card" data-id-item="${item.id}">
            <img class="card__image" src="data:image/jpeg;base64,${item.image}" alt="test" />
            <div class="card__description">
              <h3 class="card__header">${item.nameItem}</h3>
              <div class="card__price">${item.costItem} $</div>
            </div>
          </li>
          `
    );
  });
};

//поиск
searchInput.addEventListener("input", () => {
  const valueSearch = searchInput.value.trim().toLowerCase();

  if (valueSearch.length > 2) {
    const result = dataBase.filter(
      (item) =>
        item.nameItem.toLowerCase().includes(valueSearch) ||
        item.descriptionItem.toLowerCase().includes(valueSearch)
    );
    renderCard(result);
  }
});

//Photo

modalFileInput.addEventListener("change", (event) => {
  const target = event.target;

  const reader = new FileReader();

  const file = target.files[0];

  infoPhoto.filename = file.name;
  infoPhoto.size = file.size;

  reader.readAsBinaryString(file);
  reader.addEventListener("load", (event) => {
    if (infoPhoto.size < 400000) {
      modalFileBtn.textContent = infoPhoto.filename;
      infoPhoto.base64 = btoa(event.target.result);
      modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`;
    } else {
      modalFileBtn.textContent = " Файл не должен превышать 400кб";
      modalFileInput.value = "";
      checkForm();
    }
  });
});
//работа с формой

modalSubmit.addEventListener("input", checkForm);

modalSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  const itemObject = {};

  for (const elem of elementsModalSubmit) {
    itemObject[elem.name] = elem.value;
  }
  itemObject.id = counter++;
  itemObject.image = infoPhoto.base64;
  dataBase.push(itemObject);
  modalSubmit.reset();
  saveDB();
  renderCard();
  closeModal({ target: modalAdd });
});

//открытие модального окна
addAd.addEventListener("click", () => {
  modalAdd.classList.remove("hide");
  modalBtnSubmit.disabled = true;
  document.addEventListener("keydown", closeModal);
});

//открытие модального окна
catalog.addEventListener("click", (event) => {
  const target = event.target;
  const card = target.closest(".card");

  if (card) {
    // const item = dataBase[card.dataset.idItem];
    const item = dataBase.find((obj) => obj.id === +card.dataset.idItem);

    modalImageItem.src = `data:image/jpeg;base64,${item.image}`;
    modalHeaderItem.textContent = item.nameItem;
    modalStatusItem.textContent = item.status === "new" ? "Новый" : "Б/У";
    modalDescriptionItem.textContent = item.descriptionItem;
    modalCostItem.textContent = item.costItem;

    modalItem.classList.remove("hide");
    document.addEventListener("keydown", closeModal);
  }
});

//категории
menuContainer.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName === "A") {
    const result = dataBase.filter(
      (item) => item.category === target.dataset.category
    );
    renderCard(result);
  }
});

modalAdd.addEventListener("click", closeModal);
modalItem.addEventListener("click", closeModal);
renderCard();
