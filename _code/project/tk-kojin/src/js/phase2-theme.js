(function ($) {
  $.fn.widetable = function () {
      return this.each(function () {
          var $this = $(this),
              width = $this.parents('div').innerWidth();
          $($this).each(function () {
              var tablew = $this.outerWidth(true);
              var tabchi = $('tbody', this).outerWidth(true);
              if (tablew > tabchi) {
                  if (tablew > width - 10) {
                      $this.addClass('wide_table');
                  } else {
                      $this.removeClass('wide_table');
                  }
              } else {
                  if (width > tabchi) {
                      $this.removeClass('wide_table');
                  }
              }
          });
      });
  };
}(jQuery));/* jQuery widetable v2 */

$(function () {

  'use strict';

  function isDesktop() {
      return !isMobile();
  }

  function isMobile() {
      return window.matchMedia('(max-width: 1000px)').matches;
  }

  function isIE11() {
      return !!window.MSInputMethodContext && !!document.documentMode;
  }

  ///////////////////////////////////////////////////////////////////////////
  // for IE11
  ///////////////////////////////////////////////////////////////////////////
  objectFitImages();

  if (isIE11()) {
      (function () {
          var $sections = $('.main .main-primary .section, .main .main-primary section:not([class])');

          function patchIE11() {
              var left;
              var right;
              var docWidth = document.documentElement.clientWidth || document.body.clientWidth;
              if (window.matchMedia('(min-width: 1201px)').matches) {
                  left = parseInt((docWidth * 0.5) - (850 - 250 - 20), 10);
                  right = parseInt((docWidth * 0.5) - (250 + 60 - 40), 10);
              } else {
                  left = '';
                  right = '';
              }
              $sections.css({
                  'padding-left': left,
                  'padding-right': right
              });
          }
          $(window).on('resize', function () {
              patchIE11();
          });
          patchIE11();
      })();
  }

  ///////////////////////////////////////////////////////////////////////////
  // normalize section
  ///////////////////////////////////////////////////////////////////////////
  $('.phase2-theme .main .main-primary .section .safe-area > .section, .phase2-theme .main .main-primary .section .safe-area > section:not([class])').each(function () {
      if ($(this).parent().is('.safe-area')) {
          $(this).unwrap('.safe-area');
      }
      if ($(this).parent().is('.section, section:not([class])')) {
          $(this).unwrap('.section');
      }
  });
  $('.phase2-theme .main h1, .phase2-theme .main .h1').each(function () {
      $(this).closest('.main-primary').find('.section .safe-area, section:not([class]) .safe-area').first().prepend(this);
  });

  ///////////////////////////////////////////////////////////////////////////
  // normalize table and widetale
  ///////////////////////////////////////////////////////////////////////////
  $('.phase2-theme .main table').widetable();
  $(window).on('resize', function () {
      $('.phase2-theme .main table').widetable();
  });

  ///////////////////////////////////////////////////////////////////////////
  // side nav
  ///////////////////////////////////////////////////////////////////////////
  // show current
  function changeSideNavCurrent() {
      var baseUrl = location.protocol + '//' + location.host;
      var path = location.pathname;
      var hash = location.hash;
      var search = location.search;
      var normalizedPath = path.replace(/index\.html/, '');
      var normalizedPath2 = path.replace(/[^\/]*?\.html$/, '');
      var currentUrl = baseUrl + normalizedPath + search + hash; // index page
      var currentUrl2 = baseUrl + normalizedPath2 + search + hash;

      $('.js-side-nav a').removeClass('is-active');
      $('.js-side-nav a').each(function () {
          var self = this;
          var href = this.href;
          var normalizedHref = ('' + href).replace(/index\.html/, '');
          var isHeaderLink = $(this).hasClass('side-nav-item02-header') || $(this).hasClass('side-nav-item02-header-alt');
          var currentUrlList = isHeaderLink ? [currentUrl] : [currentUrl, currentUrl2];

          currentUrlList.forEach(function (curUrl) {
              if (normalizedHref === curUrl) {
                  $(self)
                      .closest('.side-nav-item02-inner')
                      .parent()
                      .find('.side-nav-item02-header, .side-nav-item02-header-alt')
                      .addClass('is-active');
                  $(self)
                      .closest('.side-nav-accordion-inner')
                      .parent()
                      .find('.side-nav-accordion-header')
                      .addClass('is-active');
                  $(self).addClass('is-active');
              }
          });
      });
  }

  $(window).on('hashchange', function () {
      //console.log('#hashchange');
      changeSideNavCurrent();
  });
  changeSideNavCurrent();

  $('.js-side-nav .side-nav-accordion-inner').hide();

  function toggleSideNav(target) {
      var $target;
      var curSideNavHeight;
      var newSideNavHeight;

      $target = $(target);
      curSideNavHeight = $('.js-side-nav').height();
      $target.next('.side-nav-accordion-inner').toggle();
      newSideNavHeight = $('.js-side-nav').height();
      $target.next('.side-nav-accordion-inner').toggle();
      if (curSideNavHeight < newSideNavHeight) {
          updateSideNavHeight(newSideNavHeight);
          $target.next('.side-nav-accordion-inner').slideToggle();
      } else {
          $target.next('.side-nav-accordion-inner').slideToggle().promise().done(function () {
              updateSideNavHeight(newSideNavHeight);
          });
      }
      $target.toggleClass('is-open');
  }

  $('.js-side-nav .side-nav-accordion-item .side-nav-accordion-header')
      .on('click', function () {
          toggleSideNav(this);
      })
      .filter('.is-active').each(function () {
          toggleSideNav(this);
      });

  function updateSideNavHeight(value) {
      var newValue;
      var margin = 80;

      if (isMobile()) {
          newValue = '';
      } else {
          newValue = value != null ? value + margin : $('.js-side-nav').height() + margin;
      }
      $('.main').css('min-height', newValue);
  }

  $(window).on('resize', function () {
      updateSideNavHeight();
  });
  updateSideNavHeight();
  $('.js-side-nav').removeClass('is-initial');

  var sideNavMediaQueryList = window.matchMedia('(max-width: 1000px)');

  function watchSideNavCollapse(mql) {
      if (mql.matches) {
          //sp
          $('.js-side-nav .collapse').removeClass('in');
          $('.js-side-nav .collapse + *').hide();
      } else {
          //pc
          $('.js-side-nav .collapse').addClass('in');
          $('.js-side-nav .collapse + *').show();
      }
  }

  sideNavMediaQueryList.addListener(watchSideNavCollapse); // sideNavMediaQueryList.addEventListener("change", watchSideNavCollapse);
  watchSideNavCollapse(sideNavMediaQueryList);

  ///////////////////////////////////////////////////////////////////////////
  // accordion
  ///////////////////////////////////////////////////////////////////////////
  $('.js-accordion .collapse').on('click', function () {
      var $target;
      var curHeight = 0;
      var newHeight = 0;
      var space;

      $target = $(this);
      if ($target.next().is(':visible')) {
          curHeight = $target.next().height();
      } else {
          $target.next().toggle();
          newHeight = $target.next().height();
          $target.next().toggle();
      }
      space = newHeight - curHeight;
      $('body').css({ 'margin-bottom': space });
      $target.addClass('collapsing').next().slideToggle(300, function () {
          $target.removeClass('collapsing');
          $target.toggleClass('in');
          $('body').css({ 'margin-bottom': '' });
          updateSideNavHeight();
      });

      return false;
  });

  ///////////////////////////////////////////////////////////////////////////
  // page nav list
  ///////////////////////////////////////////////////////////////////////////
  var $pageNavList = $('.js-page-nav-list');
  var $pageNavListLinks = $pageNavList.find('a');
  function watchPageNav() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var winHeight = window.innerHeight;
      var regions = $pageNavListLinks
          .toArray()
          .map(function (el) {
              return $(el.hash).length ? { hash: el.hash, top: $(el.hash).offset().top } : null;
          })
          .filter(Boolean)
          .reverse();
      var headerHeight = 100;
      var navTop = $pageNavList.parent().offset().top;
      var middle;
      var isSticky = scrollTop > navTop - headerHeight - 10;
      var activeRegion = null;

      if (regions.length === 0) {
          return;
      }
      $pageNavList.parent().css({ 'min-height': $pageNavList.height() });
      $pageNavList.toggleClass('is-sticky', isSticky);
      for (var i = 0; i < regions.length; i++) {
          middle = scrollTop + winHeight * 0.5;
          if (middle > regions[i].top) {
              activeRegion = regions[i];
              break;
          }
      }
      if (activeRegion === null) {
          activeRegion = regions[regions.length - 1];
      }
      $pageNavListLinks.removeClass('is-active').each(function () {
          if ($(this).attr('href') === activeRegion.hash) {
              $(this).addClass('is-active');
          }
      });
  }

  if ($pageNavList.length) {
      $(window).on('scroll resize', function () {
          watchPageNav();
      });
      watchPageNav();
  }

  ///////////////////////////////////////////////////////////////////////////
  // page link
  ///////////////////////////////////////////////////////////////////////////
  $(document).on('click', '.phase2-theme a', function () {
      var hash;
      var targetElement;
      var rectTop;
      var offsetTop;
      var headerHeight;
      var pageNavHeight;
      var margin;
      var top;

      hash = this.hash;
      if (hash) {
          targetElement = document.querySelector(hash);
          rectTop = targetElement.getBoundingClientRect().top;
          offsetTop = window.pageYOffset;
          headerHeight = isMobile() ? 70 : 100;
          pageNavHeight = $('.js-page-nav-list').length ? 100 : 0;
          margin = headerHeight + pageNavHeight + 30;
          top = rectTop + offsetTop - margin;

          window.scrollTo({
              top: top,
              behavior: 'smooth'
          });

          setTimeout(function () {
              history.replaceState(null, null, hash);
              window.dispatchEvent(new HashChangeEvent('hashchange'));
          }, 200);

          return false;
      }
  });

  ///////////////////////////////////////////////////////////////////////////
  // category list
  ///////////////////////////////////////////////////////////////////////////
  $('.js-category-list .category-list-link').on('click', function () {
      var $target;

      if (isDesktop()) {
          return true;
      }
      $target = $(this);
      $target.addClass('collapsing').next().slideToggle(300, function () {
          $target.removeClass('collapsing');
          $target.toggleClass('in');
      });

      return false;
  });

  ///////////////////////////////////////////////////////////////////////////
  // read more
  ///////////////////////////////////////////////////////////////////////////
  $('.js-read-more').each(function () {
      var $children;
      var $target;
      var initialCount;

      $target = $('' + $(this).data('read-more-target'));
      initialCount = $(this).is('[data-read-more-initial-count]') ? parseInt($(this).data('read-more-initial-count'), 10) : 10;
      // console.log(initialCount);
      if (!$target.length) {
          return true; // continue
      }
      $children = $target.children();
      if ($children.length <= initialCount) {
          $(this).hide();
      }
      $children.filter(':gt(' + (initialCount - 1) + ')').css({ display: 'none' });
  });
  $('.js-read-more').on('click', function (event) {
      var $children;
      var $target;
      var currentTop;
      var dfds;

      if ($(this).attr('href') === '#') {
          event.preventDefault();
      }
      $target = $('' + $(this).data('read-more-target'));
      if (!$target.length) {
          return true;
      }
      currentTop = $(window).scrollTop();
      $children = $target.children().filter(':hidden');
      $children.css({ display: '' });
      $(window).scrollTop(currentTop);
      $(this).hide();
  });

});
