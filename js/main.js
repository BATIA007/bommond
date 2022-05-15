document.addEventListener("DOMContentLoaded", () => {
  let cart = {};
  let like = {};
  if (localStorage.getItem("cartBommond")) {
    cart = JSON.parse(localStorage.getItem("cartBommond"));
  }
  if (localStorage.getItem("likeBommond")) {
    like = JSON.parse(localStorage.getItem("likeBommond"));
  }
  // HEADER

  const burger = document.querySelector(".header__burger");
  const headerList = document.querySelector(".header__list");

  burger.addEventListener("click", (e) => {
    burger.classList.toggle("header__burger-active");
    handleOpen(headerList, burger.classList.contains("header__burger-active"));
  });

  // FOOTER

  const selects = document.querySelectorAll(".footer__select");
  for (let select of selects) {
    const list = select.querySelector(".footer__hide");
    const trig = select.querySelector(".footer__select-text");

    trig.addEventListener("click", () => {
      select.classList.toggle("footer__select-active");
      handleOpen(list, select.classList.contains("footer__select-active"));
    });
  }

  // MAIN PAGE

  const more = document.querySelector(".brands__more");
  const brands = document.querySelector(".brands__hidden");
  if (brands) {
    more.addEventListener("click", () => {
      more.textContent === "скрыть"
        ? (more.textContent = "все")
        : (more.textContent = "скрыть");
      handleOpen(brands, more.textContent === "скрыть");
    });
  }

  const catalogItems = document.querySelectorAll(".catalog__item");
  if (catalogItems.length) {
    for (let item of catalogItems) {
      const likeBtn1 = item.querySelector(".catalog__like");
      const id = item.dataset.id;
      for (let obj of Object.values(like)) {
        obj.id === id ? likeBtn1.classList.add("catalog__like-active") : null;
      }

      item.addEventListener("click", (e) => {
        e.preventDefault();
        const likeBtn = e.target.closest(".catalog__like");
        if (likeBtn) {
          if (likeBtn.classList.contains("catalog__like-active")) {
            delete like[id];
            localStorage.setItem("likeBommond", JSON.stringify(like));
          } else {
            addToLike(item);
          }
          likeBtn.classList.toggle("catalog__like-active");
        } else {
          location.href = item.href;
        }
      });
    }
  }

  // CATALOG

  const filter = document.querySelector(".filter");
  if (filter) {
    const filter = document.querySelector(".filter");
    const sort = document.querySelector(".sort");

    const trigSort = document.querySelector(".sort-btn");
    const trigFilter = document.querySelector(".filter-btn");

    const sortClose = sort.querySelector(".sort__close");
    const filterClose = filter.querySelector(".filter__close");

    const filterShow = filter.querySelector(".filter__show");
    const sortShow = sort.querySelector(".sort__button");

    trigFilter.addEventListener("click", (e) => handleShow(filter));
    trigSort.addEventListener("click", (e) => handleShow(sort));

    filterClose.addEventListener("click", (e) => handleHide(filter));
    sortClose.addEventListener("click", (e) => handleHide(sort));

    filterShow.addEventListener("click", (e) => handleHide(filter));
    sortShow.addEventListener("click", (e) => handleHide(sort));

    function handleShow(elem) {
      elem.classList.add("sort-active");
      document.body.style.overflowY = "hidden";
    }

    function handleHide(elem) {
      elem.classList.remove("sort-active");
      document.body.style.overflowY = "auto";
    }

    const selects = document.querySelectorAll(".filter__select");
    for (let select of selects) {
      const trig = select.querySelector(".filter__select-text");
      const list = select.querySelector(".filter__select-hidden");

      trig.addEventListener("click", () => {
        select.classList.toggle("filter__select-active");
        handleOpen(list, select.classList.contains("filter__select-active"));
      });
    }

    let inputLeft = document.getElementById("input-left");
    let inputRight = document.getElementById("input-right");
    let range = document.querySelector(".slider > .range");
    let priceFrom = document.querySelector(".price-from");
    let priceTo = document.querySelector(".price-to");

    function setLeftValue() {
      let _this = inputLeft,
        min = parseInt(_this.min),
        max = parseInt(_this.max);

      _this.value = Math.min(
        parseInt(_this.value),
        parseInt(inputRight.value) - 50
      );
      priceFrom.value = prettify(_this.value);

      let percent = ((_this.value - min) / (max - min)) * 100;

      range.style.left = percent + "%";
    }

    setLeftValue();

    function setRightValue() {
      let _this = inputRight,
        min = parseInt(_this.min),
        max = parseInt(_this.max);

      _this.value = Math.max(
        parseInt(_this.value),
        parseInt(inputLeft.value) + 50
      );
      priceTo.value = prettify(_this.value);

      let percent = ((_this.value - min) / (max - min)) * 100;

      range.style.right = 100 - percent + "%";
    }

    priceFrom.addEventListener("change", () => {
      inputLeft.value = Number(priceFrom.value.replace(/[^0-9]/g, ""));
      setLeftValue();
    });

    priceTo.addEventListener("change", () => {
      inputRight.value = Number(priceTo.value.replace(/[^0-9]/g, ""));
      setRightValue();
    });

    setRightValue();

    inputLeft.addEventListener("input", setLeftValue);
    inputRight.addEventListener("input", setRightValue);
  }

  // CARD ITEM PAGE

  const items = document.querySelectorAll(".card__select");
  if (items.length) {
    const likeBtn = document.querySelector(".item__like");

    const id1 = document.querySelector(".card__id").textContent;
    for (let obj of Object.values(like)) {
      console.log(obj.id);
      obj.id === id1 ? likeBtn.classList.add("catalog__like-active") : null;
    }

    likeBtn.addEventListener("click", (e) => {
      if (likeBtn.classList.contains("catalog__like-active")) {
        delete like[id1];
        localStorage.setItem("likeBommond", JSON.stringify(like));
      } else {
        addToLike2();
      }
      likeBtn.classList.toggle("catalog__like-active");
    });

    const btnCart = document.querySelector(".card__buy");
    const id = document.querySelector(".card__id").textContent;
    for (let obj of Object.values(cart)) {
      obj.id === id ? btnReplace() : null;
    }
    btnCart.addEventListener("click", () => {
      btnReplace();
      addToCart();
    });

    function btnReplace() {
      btnCart.parentNode.insertAdjacentHTML(
        "beforeend",
        `<a href="${location.origin}/cart.html" class="card__buy btn btn-primary">в корзине</a>`
      );
      btnCart.parentNode.removeChild(btnCart);
    }

    for (let item of items) {
      const list = item.querySelector(".card__select-hidden");
      const trig = item.querySelector(".card__select-text");
      const read = item.querySelector(".card__read");
      const trig1 = item.querySelector(".card__read-text");
      const list1 = item.querySelector(".card__read-hidden");

      if (read) {
        trig1.addEventListener("click", () => {
          read.classList.toggle("card__read-active");
          handleOpen(list1, read.classList.contains("card__read-active"));
        });
      }

      trig.addEventListener("click", () => {
        item.classList.toggle("card__select-active");
        handleOpen(list, item.classList.contains("card__select-active"));
      });
    }

    const slider1 = new Swiper(".item__slider", {
      slidesPerView: 1,
      spaceBetween: 40,
      pagination: {
        el: ".item__pagination",
        clickable: true,
      },
    });

    const btn = document.querySelector(".famous__button");
    const modal = document.querySelector(".form__modal");
    const close = document.querySelector(".form__close");

    btn.addEventListener("click", (e) => {
      document.body.style.overflowY = "hidden";
      modal.classList.add("form__modal-active");
    });

    close.addEventListener("click", formClose);

    modal.addEventListener("click", (e) => {
      if (!e.target.closest(".form__wrapper")) formClose();
    });

    const minus = document.querySelector(".card__minus");
    const num = document.querySelector(".card__num");
    const plus = document.querySelector(".card__plus");

    minus.addEventListener("click", () => {
      Number(num.value) - 1 === 0 ? null : num.value--;
    });

    plus.addEventListener("click", () => {
      num.value++;
    });

    const starBlocks = document.querySelectorAll(".card__stars");

    for (let starBlock of starBlocks) {
      const stars = starBlock.children;
      for (let i = 0; i < Number(starBlock.dataset.rating); i++) {
        stars[i].style.fill = "#FFC769";
      }
    }

    const formStarBlock = document.querySelector(".form__stars");
    const stars = formStarBlock.children;

    for (let star of stars) {
      star.addEventListener("click", (e) => {
        for (let star1 of stars) {
          star1.style.fill = "#979797";
        }
        for (let i = 0; i < Number(star.dataset.star); i++) {
          stars[i].style.fill = "#FFC769";
        }
      });
    }

    function formClose() {
      document.body.style.overflowY = "auto";
      modal.classList.remove("form__modal-active");
    }
  }

  // CART PAGE

  const promoBtn = document.querySelector(".product__button");

  if (promoBtn) {
    const slider2 = new Swiper(".add__slider", {
      slidesPerView: 2,
      spaceBetween: 35,
      slidesPerGroup: 2,
      pagination: {
        el: ".add__pagination",
        clickable: true,
      },
    });

    promoBtn.addEventListener("click", (e) => {
      const inp = document.querySelector(".product__input");
      const promoBlock = document.querySelector(".promokod");
      const promoCode = document.querySelector(".promokod__promo");
      const promoLink = document.querySelector(".product__link-promo");

      if (promoBtn.textContent === "добавить" && inp.value) {
        promoBlock.classList.add("promokod-active");
        promoBtn.textContent = "удалить";
        promoCode.textContent = inp.value;
        promoLink.style.display = "flex";
        inp.value = "";
        localStorage.setItem("isPromo", true);
        renderCart();
      } else if (promoBtn.textContent === "удалить") {
        promoBlock.classList.remove("promokod-active");
        promoBtn.textContent = "добавить";
        promoLink.style.display = "none";
        localStorage.setItem("isPromo", false);
        renderCart();
      } else {
        inp.focus();
      }
    });

    const list = document.querySelector(".cart__list");

    for (let obj of Object.values(cart)) {
      list.insertAdjacentHTML(
        "beforeend",
        generateCartItem(
          obj.id,
          obj.imgSrc,
          obj.imgSrcset,
          obj.title,
          obj.volume,
          obj.sum,
          obj.sumDiscount,
          obj.num,
          obj.left,
          obj.link
        )
      );
    }

    const items = list.children;

    const btnNext = document.querySelector(".product__next");
    const length = Object.values(cart).length;

    if (length === 0) {
      btnNext.addEventListener("click", (e) => {
        e.preventDefault();
      });
    }

    if (items.length) {
      for (let item of items) {
        const plus = item.querySelector(".cart__plus");
        const minus = item.querySelector(".cart__minus");
        const num = item.querySelector(".cart__num");
        const del = item.querySelector(".cart__delete");

        renderCart();

        plus.addEventListener("click", () => {
          num.value++;
          const id = plus.closest(".cart__item").dataset.id;
          cart[id].num = Number(num.value);
          renderCart();
        });

        minus.addEventListener("click", () => {
          Number(num.value) - 1 !== 0 ? num.value-- : (num.value = 1);
          const id = minus.closest(".cart__item").dataset.id;
          cart[id].num = Number(num.value);
          renderCart();
        });

        num.addEventListener("change", () => {
          const id = num.closest(".cart__item").dataset.id;
          cart[id].num = Number(num.value);
          renderCart();
        });

        del.addEventListener("click", () => {
          const item = del.closest(".cart__item");
          const id = item.dataset.id;
          delete cart[id];
          item.remove();
          renderCart();
        });
      }
    }
  }

  // ORDER PAGE

  const edits = document.querySelectorAll(".order__edit");

  if (edits.length) {
    const list = document.querySelector(".edit__list");
    for (let obj of Object.values(cart)) {
      list.insertAdjacentHTML(
        "beforeend",
        generateOrderItem(obj.imgSrc, obj.imgSrcset, obj.title)
      );
    }

    renderOrder();

    const orderSelects = document.querySelectorAll(".edit__select");

    for (let select of orderSelects) {
      const trig = select.querySelector(".edit__select-title");
      const labels = select.querySelector(".edit__select-hidden");

      trig.addEventListener("click", (e) => {
        select.classList.toggle("edit__select-active");
        handleOpen(labels, select.classList.contains("edit__select-active"));
      });
    }

    for (let edit of edits) {
      const orderSection = document.querySelector(".order");
      const editSection = document.querySelector(".edit");
      const next = document.querySelector(".edit__continue");
      edit.addEventListener("click", (e) => {
        orderSection.style.display = "none";
        editSection.style.display = "block";
        window.scrollTo(0, 0);
      });
      next.addEventListener("click", (e) => {
        editSection.style.display = "none";
        orderSection.style.display = "block";
        window.scrollTo(0, 0);
      });
    }

    const labels = document.querySelectorAll(".edit__radio-container");
    for (let label of labels) {
      const inp = label.querySelector(".edit__radio");

      inp.addEventListener("change", () => {
        const text = label.querySelector(".edit__text");
        const value = label.querySelector(".edit__value");
        const orderVariant = document.querySelector(".order__del-val");
        const orderSum = document.querySelector(".edit__del-sum");
        const payVariant = document.querySelector(".order__pay-sum");
        const orderVal = document.querySelector(".order__del-pay");

        if (inp.checked && label.closest(".edit-del")) {
          orderVariant.textContent = text.textContent;
          orderVal.textContent = value.textContent;
          orderSum.textContent = value.textContent;
          renderOrder();
        }
        if (inp.checked && label.closest(".edit-pay")) {
          payVariant.textContent = text.textContent;
          inp.classList.contains("edit__online")
            ? renderOrder(true)
            : renderOrder(false);
        }
      });
    }

    const form = document.querySelector(".order__form");
    form.addEventListener("submit", () => {
      localStorage.clear();
    });
  }

  // CART SCRIPT

  function addToCart() {
    const title = document.querySelector(".card__title").textContent;
    const imgSrc = document.querySelector(".item__image").src;
    const imgSrcset = document.querySelector(".item__image").srcset;
    const sum = document.querySelector(".card__sum").textContent;
    let sumDiscount = document.querySelector(".card__sum-discount");
    if (sumDiscount) {
      sumDiscount = sumDiscount.textContent;
    }
    const volume = document.querySelector(".card__volume").textContent;
    const num = Number(document.querySelector(".card__num").value);
    const left = document.querySelector(".card__left-num").textContent;
    const id = document.querySelector(".card__id").textContent;

    const obj = {
      id: id,
      imgSrc: imgSrc,
      imgSrcset: imgSrcset,
      title: title,
      volume: volume,
      sum: sum,
      sumDiscount: sumDiscount,
      num: num,
      left: left,
      link: location.href,
    };

    cart[id] = obj;

    localStorage.setItem("cartBommond", JSON.stringify(cart));
  }

  function addToLike(item) {
    const title = item.querySelector(".catalog__item-title").textContent;
    const imgSrc = item.querySelector(".catalog__image").src;
    const imgSrcset = item.querySelector(".catalog__image").srcset;
    const sum = item.querySelector(".catalog__sum").textContent;
    let sumDiscount = item.querySelector(".catalog__discout-sum");
    if (sumDiscount) {
      sumDiscount = sumDiscount.textContent;
    }
    const volume = item.querySelector(".catalog__volume").textContent;
    const num = 1;
    const left = item.dataset.left;
    const id = item.dataset.id;
    const link = item.href;

    const obj = {
      id: id,
      imgSrc: imgSrc,
      imgSrcset: imgSrcset,
      title: title,
      volume: volume,
      sum: sum,
      sumDiscount: sumDiscount,
      num: num,
      left: left,
      link: link,
    };

    like[id] = obj;

    localStorage.setItem("likeBommond", JSON.stringify(like));
  }

  function addToLike2() {
    const title = document.querySelector(".card__title").textContent;
    const imgSrc = document.querySelector(".item__image").src;
    const imgSrcset = document.querySelector(".item__image").srcset;
    const sum = document.querySelector(".card__sum").textContent;
    let sumDiscount = document.querySelector(".card__sum-discount");
    if (sumDiscount) {
      sumDiscount = sumDiscount.textContent;
    }
    const volume = document.querySelector(".card__volume").textContent;
    const num = 1;
    const left = document.querySelector(".card__left-num").textContent;
    const id = document.querySelector(".card__id").textContent;

    const obj = {
      id: id,
      imgSrc: imgSrc,
      imgSrcset: imgSrcset,
      title: title,
      volume: volume,
      sum: sum,
      sumDiscount: sumDiscount,
      num: num,
      left: left,
      link: location.href,
    };

    like[id] = obj;

    localStorage.setItem("likeBommond", JSON.stringify(like));
  }

  function renderCart() {
    localStorage.setItem("cartBommond", JSON.stringify(cart));

    const length = Object.values(cart).length;

    const btnNext = document.querySelector(".product__next");
    if (length === 0) {
      btnNext.addEventListener("click", (e) => {
        e.preventDefault();
      });
    }

    const cartLength = document.querySelector(".cart__length");
    cartLength.textContent = length ? length : 0;

    const fullSum = document.querySelector(".product__sum");
    const fullPrice = document.querySelector(".product__price");
    const promoItem = document.querySelector(".promokod__promo");
    const promo = Number(
      document
        .querySelector(".product__promo-sum")
        .textContent.replace(/[^0-9]/g, "")
    );
    let sum = 0;
    let price = 0;

    for (let val of Object.values(cart)) {
      sum += val.sumDiscount
        ? Number(val.sumDiscount.replace(/[^0-9]/g, "")) * val.num
        : Number(val.sum.replace(/[^0-9]/g, "")) * val.num;
    }

    price = promoItem.closest(".promokod-active") ? sum - promo : sum;

    fullSum.textContent = prettify(sum);
    fullPrice.textContent = prettify(price);
  }

  function renderOrder(isPay) {
    const fullSum = document.querySelector(".edit__full-sum");
    const editSum = document.querySelector(".edit__sum");
    const promoItem = document.querySelector(".edit__promo-sum");
    const promoSum = Number(promoItem.textContent.replace(/[^0-9]/g, ""));
    let delSum = Number(
      document
        .querySelector(".edit__del-sum")
        .textContent.replace(/[^0-9]/g, "")
    );
    const fullPrice = document.querySelector(".edit__price");
    let sum = 0;
    let promo = 0;

    for (let val of Object.values(cart)) {
      sum += val.sumDiscount
        ? Number(val.sumDiscount.replace(/[^0-9]/g, "")) * val.num
        : Number(val.sum.replace(/[^0-9]/g, "")) * val.num;
    }

    const isPromo = JSON.parse(localStorage.getItem("isPromo"));

    if (isPay && isPromo) {
      promo = Math.ceil(promoSum + sum * 0.03);
    } else if (isPromo) {
      promo = Number(promoItem.dataset.promo);
    } else if (isPay) {
      promo = Math.ceil(promoSum + sum * 0.03);
    } else {
      promo = 0;
    }

    promoItem.textContent = prettify(promo);
    fullSum.textContent = prettify(sum);
    fullPrice.textContent = prettify(sum - promo + delSum);
    editSum.textContent = prettify(sum - promo + delSum);
  }

  function prettify(num) {
    let n = num.toString();
    let separator = " ";
    return (
      n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator) + " ₽"
    );
  }

  function generateCartItem(
    id,
    imgSrc,
    imgSrcset,
    title,
    volume,
    sum,
    sumDiscount,
    num,
    left,
    link
  ) {
    return `
    <li class="cart__item ${
      sumDiscount ? "cart__item-discount" : ""
    }" data-id="${id}">
              <img
                src="${imgSrc}"
                srcset="${imgSrcset}"
                alt="cart-image"
                class="cart__image"
              />
              <div class="cart__content">
                <a href="${link}" class="cart__item-title"
                  >${title}
                  <span class="cart__volume"
                    >/ <span class="cart__volume-num">${volume}</span></span
                  >
                </a>
                <div class="cart__bottom">
                  <div class="cart__left">
                    <div class="cart__flex">
                      <div class="cart__quantity card__quantity">
                        <span class="cart__minus card__minus">-</span>
                        <input
                          class="cart__num card__num"
                          value="${num}"
                          inputmode="numeric"
                        />
                        <span class="cart__plus card__plus">+</span>
                      </div>
                      <span class="cart__delete">
                        <svg width="12" height="12" fill="#DADADA">
                          <use href="images/sprite.svg#close" />
                        </svg>
                      </span>
                    </div>
                    <span class="cart__leave">осталась ${left} шт.</span>
                  </div>
                  <p class="cart__price">
                    ${
                      sumDiscount
                        ? "<span class='cart__sum-discount'>" +
                          sumDiscount +
                          "</span>"
                        : ""
                    }
                    <span class="cart__sum">${sum}</span>
                  </p>
                </div>
              </div>
            </li>
            `;
  }

  function generateOrderItem(imgSrc, imgSrcset, title) {
    return `
    <li class="edit__link">
              <img src="${imgSrc}" srcset="${imgSrcset}" alt="edit-image" class="edit__image">
              <h4 class="edit__item-title">
                ${title}
              </h4>
            </li>
    `;
  }

  const handleOpen = (elBlock, active, x = 1) => {
    if (active) {
      elBlock.style.height = `${x * elBlock.scrollHeight}px`;
    } else {
      elBlock.style.height = `${elBlock.scrollHeight}px`;
      window.getComputedStyle(elBlock, null).getPropertyValue("height");
      elBlock.style.height = "0";
    }

    elBlock.addEventListener("transitionend", () => {
      if (elBlock.style.height !== "0px") {
        elBlock.style.height = "auto";
      }
    });
  };

  [].forEach.call(
    document.querySelectorAll('input[type="tel"]'),
    function (input) {
      var keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___-__-__",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = new_value.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i);
        }
        var reg = matrix
          .substr(0, this.value.length)
          .replace(/_+/g, function (a) {
            return "\\d{1," + a.length + "}";
          })
          .replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (
          !reg.test(this.value) ||
          this.value.length < 5 ||
          (keyCode > 47 && keyCode < 58)
        )
          this.value = new_value;
        if (event.type == "blur" && this.value.length < 5) this.value = "";
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
    }
  );
});
