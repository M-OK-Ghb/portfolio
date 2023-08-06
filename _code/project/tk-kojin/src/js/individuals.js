(function ($) {
  // @see https://stackoverflow.com/a/28302447
  $(document).ready(function () {
      $('select').each(function () {
          var select = $(this);
          var selectedValue = select.find('option[selected]').val();
          if (selectedValue) {
              select.val(selectedValue);
          } else {
              select.prop('selectedIndex', 0);
          }
      });
  });

  $('.js-individuals-lineup-accordion').on('click', function (e) {
      e.preventDefault();
      $(this).closest('.individuals-lineup-block-body').find('.individuals-lineup-block-list-wrap').toggleClass('is-hide');
      if ($(this).hasClass('is-alt')) {
          $(this).removeClass('is-alt');
          $(this).text($(this).attr('data-label-default'));
      } else {
          $(this).addClass('is-alt');
          $(this).text($(this).attr('data-label-alt'));
      }
  });
  $('.js-individuals-qa-accordion').on('click', function (e) {
      e.preventDefault();
      $(this).closest('.individuals-qa-dl').toggleClass('is-open');
  });

  // form入力画面
  if ($('[name="__mode"][value="confirm"]').length) {
      $('#uketoritenpo li[data-region]').css({
          opacity: 0,
          width: 0,
          height: 0,
          margin: 0,
          padding: 0,
          overflow: 'hidden'
      });
      setTimeout(function () {
          var curRegionValue = $('#uketoritenpo-region').val();
          $('#uketoritenpo-region')
              .on('change', function () {
                  curRegionValue = $(this).val();
                  // reset
                  if (!$('input[type="radio"][name="uketoritenpo"]:checked').length || curRegionValue === '') {
                      $('input[type="radio"][name="uketoritenpo"]').each(function () {
                          $(this).prop('checked', false);
                      });
                  }
                  // hide
                  $('#uketoritenpo li[data-region]')
                      .filter(function () {
                          return $(this).attr('data-region') !== curRegionValue;
                      })
                      .css({
                          opacity: 0,
                          width: 0,
                          height: 0,
                          margin: 0,
                          padding: 0,
                          overflow: 'hidden'
                      });
                  // show
                  $('#uketoritenpo li[data-region]')
                      .filter(function () {
                          return $(this).attr('data-region') === curRegionValue;
                      })
                      .css({
                          opacity: '',
                          width: '',
                          height: '',
                          margin: '',
                          padding: '',
                          overflow: ''
                      });
              })
              .trigger('change');
      }, 1000);
  }

  // form確認画面
  if ($('[name="__mode"][value="submit"]').length) {
      $('.contact-form-submit').append('<button class="contact-form-back" onclick="window.history.back(); return false;">戻る</button>');
      $('.contact-form-submit input[type=submit]').val('送信');

      // // 送信無効
      // $('#contactform form').on('submit.disabled-submit', function () {
      //     return false;
      // });
      // $.ajax({
      //     url: "/individuals/form.json",
      //     type: "GET",
      //     dataType: "json",
      //     timespan: 10000
      // }).done(function (data) {
      //     // 送信時にobject_id変更
      //     $('#contactform form').on('submit.switch-object_id', function () {
      //         var uketoritenpoValue = $('input[type="hidden"][name="uketoritenpo"]').val();
      //         var newObjectID = null;
      //         for (var i = 0; i < data['data'].length; i++) {
      //             if (data['data'][i]['tenpo_title'] === uketoritenpoValue) {
      //                 newObjectID = data['data'][i]['page_id'];
      //                 break;
      //             }
      //         }
      //         if (newObjectID === null) {
      //             return false; // 送信無効
      //         }
      //         $('input[type="hidden"][name="object_id"]').val(newObjectID);
      //     });
      //     // 送信無効解除
      //     $('#contactform form').off('submit.disabled-submit');
      // }).fail(function (_, __, errorThrown) {
      //     alert("読み込みエラー。\n時間を置いてもう一度お試しください。\n\n" + errorThrown);
      // });
  }

})(jQuery);
