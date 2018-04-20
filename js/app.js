(function() {
  const DATA = [
    {
      _id: 1,
      name: 'iPhone 6s 128Gb Gold',
      group_id: 2,
      discount: true,
      img: 'iphone-6s-gold.jpg',
      price: 1121,
    },
    {
      _id: 2,
      name: 'iPhone 6s 128Gb Rose',
      group_id: 2,
      discount: false,
      img: 'iphone-6s-rose.jpg',
      price: 1389,
    },
    {
      _id: 3,
      name: 'iPhone 6s 128Gb Silver',
      group_id: 2,
      discount: false,
      img: 'iphone-6s-silver.jpg',
      price: 1499,
    },
    {
      _id: 4,
      name: 'iPhone 6s 128Gb Space',
      group_id: 2,
      discount: false,
      img: 'iphone-6s-gray.jpg',
      price: 1200,
    },
    {
      _id: 5,
      name: 'iPhone 6s Plus 128Gb Gold',
      group_id: 3,
      discount: true,
      img: 'iphone-6s-plus-gold.jpg',
      price: 1121,
    },
    {
      _id: 6,
      name: 'iPhone 6s Plus 128Gb Rose',
      group_id: 3,
      discount: false,
      img: 'iphone-6s-plus-rose.jpg',
      price: 1530,
    },
    {
      _id: 7,
      name: 'iPhone 6s Plus 128Gb Silver',
      group_id: 3,
      discount: false,
      img: 'iphone-6s-plus-silver.jpg',
      price: 1530,
    },
    {
      _id: 8,
      name: 'iPhone 6s Plus 128Gb Space',
      group_id: 3,
      discount: false,
      img: 'iphone-6s-plus-gray.jpg',
      price: 1530,
    },
    {
      _id: 9,
      name: 'iPhone 6 16Gb Gold',
      group_id: 4,
      discount: true,
      img: 'iphone-6-gold.jpg',
      price: 848,
    },
    {
      _id: 10,
      name: 'iPhone 6 16Gb Silver',
      group_id: 4,
      discount: false,
      img: 'iphone-6-silver.jpg',
      price: 848,
    },
    {
      _id: 11,
      name: 'iPhone 6 16Gb Space',
      group_id: 4,
      discount: false,
      img: 'iphone-6-gray.jpg',
      price: 848,
    },
    {
      _id: 12,
      name: 'iPhone 6 Plus 64Gb Gold',
      group_id: 5,
      discount: true,
      img: 'iphone-6-plus-gold.jpg',
      price: 1039,
    },
    {
      _id: 13,
      name: 'iPhone 6 Plus 64Gb Silver',
      group_id: 5,
      discount: false,
      img: 'iphone-6-plus-silver.jpg',
      price: 1039,
    },
    {
      _id: 14,
      name: 'iPhone 6 Plus 64Gb Space',
      group_id: 5,
      discount: false,
      img: 'iphone-6-plus-gray.jpg',
      price: 1039,
    },
    {
      _id: 15,
      name: 'iPhone 5s 16Gb Gold A1530',
      group_id: 6,
      discount: true,
      img: 'iphone-5s-gold.jpg',
      price: 590,
    },
    {
      _id: 16,
      name: 'iPhone 5s 16Gb Silver A1530',
      group_id: 6,
      discount: false,
      img: 'iphone-5s-silver.jpg',
      price: 590,
    },
    {
      _id: 17,
      name: 'iPhone 5s 16Gb Space',
      group_id: 6,
      discount: false,
      img: 'iphone-5s-gray.jpg',
      price: 590,
    },
    {
      _id: 18,
      name: 'iPhone 7 Plus 256Gb Black',
      group_id: 1,
      discount: true,
      img: 'iphone-7-plus-black.jpg',
      price: 1990,
    },
    {
      _id: 19,
      name: 'iPhone 7 Plus 256Gb Gold',
      group_id: 1,
      discount: false,
      img: 'iphone-7-plus-gold.jpg',
      price: 1990,
    },
    {
      _id: 20,
      name: 'iPhone 7 Plus 256Gb JetBlack',
      group_id: 1,
      discount: false,
      img: 'iphone-7-plus-jetblack.jpg',
      price: 1990,
    },
    {
      _id: 21,
      name: 'iPhone 7 Plus 256Gb Rose',
      group_id: 1,
      discount: false,
      img: 'iphone-7-plus-rose.jpg',
      price: 1990,
    }
  ];
  let cart = [];

//Function auth for open account on header
  function auth() {
    const btn = document.querySelector('.open-submenu');
    const submenu = document.querySelector('.auth--submenu');

    function handleClick(e) {
      e.preventDefault();
      this.classList.toggle('active');
      submenu.classList.toggle('active');
    }

    function closedSubmenu(e) {
      if (e.target === btn || e.target === submenu) {
        return false;
      }
      if (!submenu.classList.contains('active')) return false;
      btn.classList.remove('active');
      submenu.classList.remove('active');

    }

    btn.addEventListener('click', handleClick);
    window.addEventListener('click', closedSubmenu);
  }

  auth();

  function addToCart() {
    const buttonsAddCart = document.querySelectorAll('.product--add');

    function handleClick() {
      const parent = this.parentElement;
      const _id = parent.querySelector('.product--name').dataset.id;
      const name = parent.querySelector('.product--name').textContent;
      const price = parseInt(parent.querySelector('.product--price').textContent, 10);
      const cartBlock = document.querySelector('.cart');
      const image = parent.querySelector('.product--img img').src.split('/');

      let index;
      let total = {};

      let newProduct = {
        _id,
        name,
        price,
        image: image[image.length-1],
        quantity: 1
      };

      index = cart.findIndex(item => item._id === newProduct._id);

      if (index === -1) {
        cart.push(newProduct);
      } else {
        cart[index].quantity++;
      }

      if (cart.length === 1) {
        total.quantity = cart[0].quantity;
        total.cost = cart[0].price * cart[0].quantity;
        cartBlock.textContent = `Товаров ${ total.quantity } (${ total.cost }.00 руб.)`;
      } else {
        total.quantity = cart.reduce(function(sum, current) {
          return sum + current.quantity;
        }, 0);
        total.cost = cart.reduce(function(sum, current) {
          return sum + current.price * current.quantity;
        }, 0);
        cartBlock.textContent = `Товаров ${ total.quantity } (${ total.cost }.00 руб.)`;
      }

    }

    buttonsAddCart.forEach(button => button.addEventListener('click', handleClick));
  }

  function removeToCart() {
    const removeButtons = document.querySelectorAll('.delete');

    function handleClick() {
      const parent = this.parentElement.parentElement;
      const id = parent.dataset.id;
      const index = cart.findIndex(item => item._id === id);
      console.log(cart.splice(index, 1));

      refreshCart();
    }

    removeButtons.forEach(button => button.addEventListener('click', handleClick));
  }

  function refreshCart() {
    const root = document.getElementById('root');
    const cartBlock = document.querySelector('.cart');
    let content;
    let total = {};

    if (!cart.length) {
      content = "Ваша корзина пуста.";
      cartBlock.textContent = `Товаров 0 (0.00 руб.)`;
      total.cost = 0;
      total.quantity = 0;
    } else {
      total.quantity = cart.reduce(function(sum, current) {
        return sum + current.quantity;
      }, 0);
      total.cost = cart.reduce(function(sum, current) {
        return sum + current.price * current.quantity;
      }, 0);

      if (cart.length === 1) {
        total.quantity = cart[0].quantity;
        total.cost = cart[0].price * cart[0].quantity;
        cartBlock.textContent = `Товаров ${ total.quantity } (${ total.cost }.00 руб.)`;
      } else {
        total.quantity = cart.reduce(function(sum, current) {
          return sum + current.quantity;
        }, 0);
        total.cost = cart.reduce(function(sum, current) {
          return sum + current.price * current.quantity;
        }, 0);
        cartBlock.textContent = `Товаров ${ total.quantity } (${ total.cost }.00 руб.)`;
      }

      content = cart.map(item => (
        `
        <div class="cart-list--item" data-id="${ item._id }">
          <div class="cl-item--img">
            <img src="./assets/img/products/${ item.image }" alt="">
          </div>
          <div class="cl-item--name">${ item.name }</div>
          <div class="cl-item--sum">
            <div class="cl-item--price">${ item.price }.00 руб.</div>
            <div class="cl-item--quantity">${ item.quantity } шт.</div>
            <div class="cl-item--total">${ item.price * item.quantity }.00 руб.</div>
            <button type="button" class="delete">Удалить</button>
          </div>
        </div>
        `
      )).join('');
    }

    root.innerHTML = `
      <div class="cart-list">
        ${ content }
        <div class="cart-list--sum">
          <div class="cl-item--sum">
            <div class="cl-item--quantity">${ total.quantity } шт.</div>
            <div class="cl-item--total">${ total.cost }.00 руб.</div>
          </div>
        </div>
        <button type="button" class="success">Подтвердить и оформить</button>
      </div>
    `;

    removeToCart();
  }

  function renderCart() {
    const cartBlock = document.querySelector('.cart');

    cartBlock.addEventListener('click', refreshCart);
  }

//Function for render data and render groups
  function renderGroups(id, data) {
    const root = document.getElementById('root');
    let products;
    let content;

    if (id === 0) {
      products = data;
    } else if (id === 7) {
      products = data.filter((item) => !item.discount);
    } else {
      products = data.filter((item) => item.group_id === id);
    }

    content = products.map(product => (
      `
        <div class="products--item">
          <div class="product">
            <div class="product--img">
              <img src="./assets/img/products/${ product.img }" alt="">
            </div>
            <a href="" class="product--name" data-id="${ product._id }">${ product.name }</a>
            <p class="product--price">${ product.price }.00 руб.</p>
            <button type="button" class="product-btn product--add">Добавить в корзину</button>
            <button type="button" class="product-btn product--one-click">Купить в один клик</button>
          </div>
        </div>
      `
    )).join('');

    root.innerHTML = content;

    addToCart();

    return products;
  }

//Function for find data of search form
  function findProducts(search, data) {
    return data.filter(item => {
      const regex = new RegExp(search, 'gi');
      return item.name.match(regex);
    });
  }

//Refreshing search before render new group data
  function refreshSearchForm(id, data) {
    const search = document.querySelector('.sf--search');

    function handleChange() {
      const filterData = findProducts(this.value, data);
      renderGroups(id, filterData);
    }

    search.addEventListener('change', handleChange);
    search.addEventListener('keyup', handleChange);
  }

//Routing for group data
  function router() {
    const asideNavigation = document.querySelectorAll('.categories--item a');
    const parentsGroups = document.querySelectorAll('.categories--item');

    function handleClick(e) {
      e.preventDefault();
      const _id = parseInt(this.dataset.groupid, 10);
      const parent = this.parentElement;

      parentsGroups.forEach(item => item.classList.remove('active'));
      parent.classList.add('active');

      refreshSearchForm(_id, renderGroups(_id, DATA));
    }

    asideNavigation.forEach(item => item.addEventListener('click', handleClick));
  }

//First load
  renderCart();
  renderGroups(0, DATA);
  refreshSearchForm(0, DATA);
  router();
})();


