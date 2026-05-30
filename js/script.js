$(document).ready(() => {

  const SCHEMA_LIGHT = "light";
  const SCHEMA_DARK = "dark";
  const pathCss = "/css";
  let currentSchema;

  const getSchema = () => localStorage.getItem("schema");
  const setSchema = (schema) => localStorage.setItem("schema", schema);

  const getFileSchema = () => `${currentSchema}-theme.css`;

  const loadCss = (file) => {
    if (file) {
      $("#theme-css").remove();
      $("<link>")
        .attr({
          id: "theme-css",
          rel: "stylesheet",
          href: `${pathCss}/${file}?t=${Date.now()}`,
        })
        .appendTo("head");
    }
  };

  $("#toggle-btn").on("click", () => {
    currentSchema = currentSchema === SCHEMA_LIGHT ? SCHEMA_DARK : SCHEMA_LIGHT;
    setSchema(currentSchema);
    loadCss(getFileSchema());
    $("html").attr("data-bs-theme", currentSchema);
  });

  (() => {
    currentSchema = getSchema();
    if (!currentSchema) {
      currentSchema = SCHEMA_LIGHT;
      setSchema(currentSchema);
    }
    loadCss(getFileSchema());
    $("html").attr("data-bs-theme", currentSchema);
  })();












  const loginPage = window.location.pathname.includes("login.html");
  if (!localStorage.getItem("isAuth") && !loginPage) {
    window.location.href = "login.html";
  }

  $(document).on("click", "#logoutBtn", function () {
    if (confirm("Вы действительно хотите выйти из аккаунта?")) {
      localStorage.removeItem("isAuth");
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    }
  });

  $(document).on("submit", "#loginForm", function (e) {
    e.preventDefault();
    const email = $("#email").val().trim();
    const pass = $("#password").val().trim();

    if (email === "admin@example.com" && pass === "admin123") {
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("currentUser", "Администратор");
      window.location.href = "dashboard.html";
    } else {
      $("#loginAlert").removeClass("d-none").text("❌ Неверный email или пароль.");
    }
  });






  let users = [
    { id: 1, name: "Алексей Иванов", email: "alex@example.com", role: "Администратор" },
    { id: 2, name: "Мария Петрова", email: "maria@example.com", role: "Менеджер" },
    { id: 3, name: "Дмитрий Смирнов", email: "dmitry@example.com", role: "Пользователь" },
    { id: 4, name: "Елена Козлова", email: "elena@example.com", role: "Пользователь" },
    { id: 5, name: "Сергей Новиков", email: "sergey@example.com", role: "Менеджер" },
  ];

  let products = [
    { id: 1, name: "Ноутбук Apple MacBook Air 13", price: 1299, category: "Электроника" },
    { id: 2, name: "Смартфон Samsung Galaxy S23", price: 899, category: "Электроника" },
    { id: 3, name: "Наушники Sony WH-1000XM5", price: 399, category: "Аудио" },
    { id: 4, name: "Клавиатура Logitech MX Keys", price: 119, category: "Аксессуары" },
    { id: 5, name: "Монитор Dell 27 4K", price: 649, category: "Электроника" },
    { id: 6, name: "Мышь Razer DeathAdder V3", price: 79, category: "Аксессуары" },
    { id: 7, name: "Внешний SSD 1TB", price: 149, category: "Хранение" },
  ];

  let orders = [
    { id: 101, userId: 2, products: [1, 3], total: 1299 + 399, status: "Доставлен", date: "2025-05-10" },
    { id: 102, userId: 1, products: [4, 6], total: 119 + 79, status: "Оплачен", date: "2025-05-12" },
    { id: 103, userId: 5, products: [2, 5], total: 899 + 649, status: "В обработке", date: "2025-05-14" },
    { id: 104, userId: 3, products: [7], total: 149, status: "Доставлен", date: "2025-05-09" },
    { id: 105, userId: 4, products: [1, 2, 3], total: 1299 + 899 + 399, status: "Отменён", date: "2025-05-11" },
  ];






  function getUserNameById(userId) {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Неизвестный";
  }

  function getProductsCount(order) {
    return order.products.length;
  }

  function formatPrice(price) {
    return `$${price.toFixed(2)}`;
  }







  if (window.location.pathname.includes("dashboard.html")) {
    function loadDashboard() {
      $("#userCount").text(users.length);
      $("#productCount").text(products.length);
      $("#orderCount").text(orders.length);

      const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
      $("#revenue").text(formatPrice(totalRevenue));

      const recentOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
      let html = "";
      recentOrders.forEach((order) => {
        html += `
          <tr>
            <td>${order.id}</td>
            <td>${getUserNameById(order.userId)}</td>
            <td>${formatPrice(order.total)}</td>
            <td><span class="badge bg-secondary">${order.status}</span></td>
          </tr>
        `;
      });
      $("#recentOrders").html(html || `<tr><td colspan="4" class="text-center">Нет заказов</td></tr>`);
    }
    loadDashboard();
  }













  if (window.location.pathname.includes("users.html")) {
    $("body").append(`
      <div class="modal fade" id="userModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="userModalLabel">Пользователь</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <input type="hidden" id="userId">
              <div class="mb-3">
                <label class="form-label">Имя</label>
                <input type="text" class="form-control" id="userName" placeholder="Введите имя">
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" id="userEmail" placeholder="email@example.com">
              </div>
              <div class="mb-3">
                <label class="form-label">Роль</label>
                <select class="form-select" id="userRole">
                  <option>Администратор</option>
                  <option>Менеджер</option>
                  <option>Пользователь</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
              <button type="button" class="btn btn-success" id="saveUserBtn">Сохранить</button>
            </div>
          </div>
        </div>
      </div>
    `);

    function renderUsers() {
      let html = "";
      users.forEach((user) => {
        html += `
          <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td class="text-end">
              <button class="btn btn-sm btn-outline-primary edit-user me-1" data-id="${user.id}">✏️</button>
              <button class="btn btn-sm btn-outline-danger delete-user" data-id="${user.id}">🗑️</button>
            </td>
          </tr>
        `;
      });
      $("#usersTableBody").html(html || `<tr><td colspan="5" class="text-center">Нет пользователей</td></tr>`);
    }

    $("#addUserBtn").click(() => {
      $("#userId").val("");
      $("#userName").val("");
      $("#userEmail").val("");
      $("#userRole").val("Пользователь");
      $("#userModalLabel").text("Добавить пользователя");
      $("#userModal").modal("show");
    });

    $(document).on("click", ".edit-user", function () {
      const id = parseInt($(this).data("id"));
      const user = users.find((u) => u.id === id);
      if (user) {
        $("#userId").val(user.id);
        $("#userName").val(user.name);
        $("#userEmail").val(user.email);
        $("#userRole").val(user.role);
        $("#userModalLabel").text("Редактировать пользователя");
        $("#userModal").modal("show");
      }
    });

    $(document).on("click", ".delete-user", function () {
      const id = parseInt($(this).data("id"));
      if (confirm("Удалить пользователя?")) {
        users = users.filter((u) => u.id !== id);
        renderUsers();
      }
    });

    $("#saveUserBtn").click(() => {
      const id = $("#userId").val();
      const name = $("#userName").val().trim();
      const email = $("#userEmail").val().trim();
      const role = $("#userRole").val();

      if (!name || !email) {
        alert("Заполните имя и email");
        return;
      }

      if (id) {
        const index = users.findIndex((u) => u.id === parseInt(id));
        if (index !== -1) {
          users[index] = { ...users[index], name, email, role };
        }
      } else {
        const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
        users.push({ id: newId, name, email, role });
      }
      renderUsers();
      $("#userModal").modal("hide");
    });

    renderUsers();
  }









  if (window.location.pathname.includes("products.html")) {
    $("body").append(`
      <div class="modal fade" id="productModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Товар</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <input type="hidden" id="productId">
              <div class="mb-3">
                <label class="form-label">Название товара</label>
                <input type="text" class="form-control" id="productName" placeholder="Введите название">
              </div>
              <div class="mb-3">
                <label class="form-label">Цена ($)</label>
                <input type="number" class="form-control" id="productPrice" placeholder="0.00" step="0.01">
              </div>
              <div class="mb-3">
                <label class="form-label">Категория</label>
                <input type="text" class="form-control" id="productCategory" placeholder="Например: Электроника">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
              <button type="button" class="btn btn-success" id="saveProductBtn">Сохранить</button>
            </div>
          </div>
        </div>
      </div>
    `);

    function renderProducts() {
      let html = "";
      products.forEach((product) => {
        html += `
          <div class="col-md-6 col-lg-4">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text text-muted">${product.category}</p>
                <h6 class="text-primary">${formatPrice(product.price)}</h6>
              </div>
              <div class="card-footer bg-transparent d-flex justify-content-between">
                <button class="btn btn-sm btn-outline-primary edit-product" data-id="${product.id}">✏️</button>
                <button class="btn btn-sm btn-outline-danger delete-product" data-id="${product.id}">🗑️</button>
              </div>
            </div>
          </div>
        `;
      });
      $("#productsContainer").html(html || `<div class="col-12 text-center">Нет товаров</div>`);
    }

    $("#addProductBtn").click(() => {
      $("#productId").val("");
      $("#productName").val("");
      $("#productPrice").val("");
      $("#productCategory").val("");
      $("#productModal").modal("show");
    });

    $(document).on("click", ".edit-product", function () {
      const id = parseInt($(this).data("id"));
      const product = products.find((p) => p.id === id);
      if (product) {
        $("#productId").val(product.id);
        $("#productName").val(product.name);
        $("#productPrice").val(product.price);
        $("#productCategory").val(product.category);
        $("#productModal").modal("show");
      }
    });

    $(document).on("click", ".delete-product", function () {
      const id = parseInt($(this).data("id"));
      if (confirm("Удалить товар?")) {
        products = products.filter((p) => p.id !== id);
        renderProducts();
      }
    });

    $("#saveProductBtn").click(() => {
      const id = $("#productId").val();
      const name = $("#productName").val().trim();
      const price = parseFloat($("#productPrice").val());
      const category = $("#productCategory").val().trim();

      if (!name || isNaN(price) || !category) {
        alert("Заполните все поля");
        return;
      }

      if (id) {
        const index = products.findIndex((p) => p.id === parseInt(id));
        if (index !== -1) {
          products[index] = { ...products[index], name, price, category };
        }
      } else {
        const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
        products.push({ id: newId, name, price, category });
      }
      renderProducts();
      $("#productModal").modal("hide");
    });

    renderProducts();
  }











  if (window.location.pathname.includes("orders.html")) {
    $("body").append(`
      <div class="modal fade" id="orderModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">📋 Детали заказа</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body" id="orderDetailsContent">Загрузка...</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    `);

    function renderOrders() {
      let html = "";
      orders.forEach((order) => {
        html += `
          <tr>
            <td>${order.id}</td>
            <td>${getUserNameById(order.userId)}</td>
            <td>${order.products.length}</td>
            <td>${formatPrice(order.total)}</td>
            <td>
              <select class="form-select form-select-sm status-change" data-id="${order.id}" style="width: auto;">
                <option ${order.status === "В обработке" ? "selected" : ""}>В обработке</option>
                <option ${order.status === "Оплачен" ? "selected" : ""}>Оплачен</option>
                <option ${order.status === "Доставлен" ? "selected" : ""}>Доставлен</option>
                <option ${order.status === "Отменён" ? "selected" : ""}>Отменён</option>
              </select>
            </td>
            <td class="text-end">
              <button class="btn btn-sm btn-outline-info view-order" data-id="${order.id}">📄</button>
            </td>
          </tr>
        `;
      });
      $("#ordersTableBody").html(html || `<tr><td colspan="6" class="text-center">Нет заказов</td></tr>`);
    }

    $(document).on("change", ".status-change", function () {
      const orderId = parseInt($(this).data("id"));
      const newStatus = $(this).val();
      const order = orders.find((o) => o.id === orderId);
      if (order) {
        order.status = newStatus;
        renderOrders();
      }
    });

    $(document).on("click", ".view-order", function () {
      const orderId = parseInt($(this).data("id"));
      const order = orders.find((o) => o.id === orderId);
      if (order) {
        const user = users.find((u) => u.id === order.userId);
        let productsHtml = "<ul>";
        order.products.forEach((prodId) => {
          const product = products.find((p) => p.id === prodId);
          if (product) productsHtml += `<li>${product.name} — ${formatPrice(product.price)}</li>`;
        });
        productsHtml += "</ul>";

        $("#orderDetailsContent").html(`
          <p><strong>Заказ #${order.id}</strong></p>
          <p><strong>Клиент:</strong> ${user ? user.name : "Неизвестный"} (${user ? user.email : ""})</p>
          <p><strong>Статус:</strong> ${order.status}</p>
          <p><strong>Дата:</strong> ${order.date}</p>
          <p><strong>Сумма:</strong> ${formatPrice(order.total)}</p>
          <p><strong>Товары:</strong></p>
          ${productsHtml}
        `);
        $("#orderModal").modal("show");
      }
    });

    renderOrders();
  }
});









// ======================== БУРГЕР-МЕНЮ ========================
function initBurgerMenu() {
    // Добавляем CSS для бургер-меню, если его нет
    if (!$('#burgerStyles').length) {
        $('head').append(`
            <style id="burgerStyles">
                .hamburger-btn {
                    display: none;
                    position: fixed;
                    top: 15px;
                    left: 15px;
                    z-index: 1001;
                    background: #fff;
                    border: 1px solid #dee2e6;
                    border-radius: 8px;
                    padding: 8px 12px;
                    cursor: pointer;
                    font-size: 24px;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                
                .hamburger-btn:hover {
                    background: #f8f9fa;
                }
                
                .sidebar-overlay {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    z-index: 999;
                    backdrop-filter: blur(2px);
                }
                
                .sidebar {
                    transition: transform 0.3s ease;
                }
                
                @media (max-width: 750px) {
                    .hamburger-btn {
                        display: block;
                    }
                    
                    .sidebar {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 280px;
                        height: 100%;
                        z-index: 1000;
                        transform: translateX(-100%);
                        background: #fff;
                        box-shadow: 2px 0 15px rgba(0,0,0,0.1);
                        overflow-y: auto;
                    }
                    
                    html[data-bs-theme="dark"] .sidebar {
                        background: #2c2c2c;
                    }
                    
                    .sidebar.show {
                        transform: translateX(0);
                    }
                    
                    main {
                        padding-top: 60px !important;
                    }
                    
                    .col-md-10 {
                        width: 100% !important;
                        margin-left: 0 !important;
                    }
                }
            </style>
        `);
    }
    
    // Добавляем кнопку-бургер и оверлей
    if (!$('.hamburger-btn').length) {
        $('body').prepend('<button class="hamburger-btn" id="hamburgerBtn">☰</button>');
        $('body').append('<div class="sidebar-overlay" id="sidebarOverlay"></div>');
    }
    
    // Функция закрытия меню
    function closeMenu() {
        $('.sidebar').removeClass('show');
        $('#sidebarOverlay').fadeOut();
        $('body').css('overflow', '');
    }
    
    // Функция открытия меню
    function openMenu() {
        $('.sidebar').addClass('show');
        $('#sidebarOverlay').fadeIn();
        $('body').css('overflow', 'hidden');
    }
    
    // Обработчик кнопки бургера
    $('#hamburgerBtn').off('click').on('click', function(e) {
        e.stopPropagation();
        if ($('.sidebar').hasClass('show')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Закрытие по клику на оверлей
    $('#sidebarOverlay').off('click').on('click', function() {
        closeMenu();
    });
    
    // Закрытие по клику на ссылку в меню (опционально)
    $(document).off('click', '.sidebar .nav-link').on('click', '.sidebar .nav-link', function() {
        if ($(window).width() <= 750) {
            setTimeout(() => closeMenu(), 150);
        }
    });
    
    // При изменении размера окна
    $(window).off('resize.burger').on('resize.burger', function() {
        if ($(window).width() > 750) {
            closeMenu();
            $('.sidebar').removeAttr('style');
            $('body').css('overflow', '');
        } else {
            // Для мобильных - восстанавливаем позиционирование
            $('.sidebar').css('transform', '');
        }
    });
}

// Инициализируем бургер-меню при загрузке
$(document).ready(function() {
    initBurgerMenu();
});