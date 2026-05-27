document.addEventListener('DOMContentLoaded', function() {
  var header = document.querySelector('header.header-one');
  var menu = document.querySelector('.main-menu-wrapper');
  var overlay = document.querySelector('.sidebar-overlay');

  if (!header || !menu) {
    return;
  }

  function closeSidebar() {
    menu.classList.remove('show');
    if (overlay) {
      overlay.classList.remove('show');
    }
    document.body.classList.remove('sidebar-open');
  }

  function openSidebar() {
    menu.classList.add('show');
    if (overlay) {
      overlay.classList.add('show');
    }
    document.body.classList.add('sidebar-open');
  }

  function toggleSidebar() {
    if (menu.classList.contains('show')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  var mobileBtn = document.querySelector('#mobile_btn');
  if (!mobileBtn) {
    mobileBtn = document.createElement('a');
    mobileBtn.id = 'mobile_btn';
    mobileBtn.href = 'javascript:void(0);';
    mobileBtn.className = 'mobile-menu-toggle';
    mobileBtn.innerHTML = '<span class="bar-icon"><span></span><span></span><span></span></span>';
    mobileBtn.style.display = 'inline-flex';
    mobileBtn.style.alignItems = 'center';
    mobileBtn.style.justifyContent = 'center';
    mobileBtn.style.marginLeft = 'auto';
    header.appendChild(mobileBtn);
  }

  mobileBtn.addEventListener('click', function (e) {
    e.preventDefault();
    toggleSidebar();
  });

  var menuClose = document.querySelector('#menu_close');
  if (menuClose) {
    menuClose.addEventListener('click', function (e) {
      e.preventDefault();
      closeSidebar();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function () {
      closeSidebar();
    });
  }

  menu.addEventListener('click', function (e) {
    if (e.target.matches('.main-nav a') && window.innerWidth <= 991) {
      var parent = e.target.parentElement;
      if (parent && parent.classList.contains('has-submenu')) {
        e.preventDefault();
        parent.classList.toggle('show-submenu');
        var submenu = parent.querySelector('.submenu, .mega-submenu');
        if (submenu) {
          submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        }
      }
    }
  });
});