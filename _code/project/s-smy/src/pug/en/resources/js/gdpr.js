;(function(){

    /*--------------------------------------------------------------------------------
        Cookie Manager for GDPR
    --------------------------------------------------------------------------------*/
    var CookieManager = (function(){
        var cookieManager = function(){
            this.$target = $('.js-gdpr');
            this.$banner = this.$target.find('.js-gdpr-banner');
            this.$panel = this.$target.find('.js-gdpr-panel');
            this.$toggle = this.$target.find('.js-gdpr-toggle');
            this.$overlay = this.$target.find('.js-gdpr-overlay');
            this.$accepter = this.$target.find('.js-gdpr-accepter');
            this.$disabler = this.$target.find('.js-gdpr-disabler');
            this.$panelOpener = this.$target.find('.js-gdpr-panelOpener');
            this.$switch = this.$target.find('.js-gdpr-switch');
            this.isBannerShown = true;
            this.acceptedCookies = '';
            this.init();
            return this;
        }

        var proto = cookieManager.prototype;

        proto.init = function() {
            var scope = this;
            var _acceptedCookies = localStorage.getItem('acceptedCookies') || [];

            if (_acceptedCookies.length) {
                if (_acceptedCookies.indexOf(',') !== -1) {
                    _acceptedCookies = _acceptedCookies.split(',');
                } else {
                    _acceptedCookies = [_acceptedCookies];
                }
                scope.isBannerShown = false;
            }

            _acceptedCookies.forEach(function(value){
                var _$switch = scope.$switch.find('input[type="checkbox"][value="' + value + '"]');
                if (_$switch.length) _$switch.get(0).checked = true;
            });

            if (scope.isBannerShown) {
                scope.$banner.addClass('is-show');
                scope.$overlay.addClass('is-show');
            }

            if (_acceptedCookies.indexOf('functional-and-analytics') !== -1) {
                scope.startTracking();
            }

            scope.handleEvents();
        }

        // イベント
        proto.handleEvents = function(){
            var scope = this;

            // 画面左下 Cアイコン押下時
            scope.$toggle.find('a').on('click', function(e){
                e.preventDefault();
                if (scope.$panel.hasClass('is-show')) {
                    scope.panelClose();
                } else {
                    scope.panelOpen();
                }
            });
    
            // 画面下 バナー部 の「I Do Not Accept or Settings」ボタン押下時
            scope.$panelOpener.find('a').on('click', function(e){
                e.preventDefault();
                scope.panelOpen();
            });
    
            // 画面下 バナー部のCLOSEボタン押下時
            scope.$banner.find('.js-gdpr-closer').find('a').on('click', function(e){
                e.preventDefault();
                scope.$banner.removeClass('is-show');
                scope.$overlay.removeClass('is-show');
                scope.isBannerShown = false;
            });
    
            // 画面左 パネル部のCLOSEボタン押下時
            scope.$panel.find('.js-gdpr-closer').find('a').on('click', function(e){
                e.preventDefault();
                scope.$panel.removeClass('is-show');
                if (scope.isBannerShown) scope.$banner.addClass('is-show');
                if (!scope.isBannerShown) scope.$overlay.removeClass('is-show');
            });
    
            // 画面下 バナー部 / 画面左 パネル部 の「Accept All」ボタン押下時
            scope.$accepter.find('a').on('click', function(e){
                e.preventDefault();
                scope.acceptAll();
                scope.$panel.removeClass('is-show');
                scope.$overlay.removeClass('is-show');
                if (scope.$banner.hasClass('is-show')) {
                    scope.$banner.removeClass('is-show');
                } else {
                    scope.$banner.hide();
                }
                scope.isBannerShown = false;
                // acceptイベントを発行
                scope.$target.trigger($.Event('accept'), scope.acceptedCookies);
            });
    
            // 画面左 パネル部 の「I Do Not Accept」ボタン押下時
            scope.$disabler.find('a').on('click', function(e){
                e.preventDefault();
                scope.disableAll();
                scope.$panel.removeClass('is-show');
                scope.$overlay.removeClass('is-show');
                if (scope.$banner.hasClass('is-show')) {
                    scope.$banner.removeClass('is-show');
                } else {
                    scope.$banner.hide();
                }
                scope.isBannerShown = false;
                // acceptイベントを発行
                scope.$target.trigger($.Event('disable'));
            });
    
            // 画面左 パネル内 チェックボックス押下時
            scope.$switch.find('input[type="checkbox"]').on('change', function(){
                var value = this.value;
                var $checked = scope.$switch.find('input[type="checkbox"]').filter(':checked');
                scope.getCheckedCookies($checked);
                // acceptイベントを発行
                scope.$target.trigger($.Event('accept'));
            });

            // cookie同意時
            scope.$target.on('accept', function(e){
                if (scope.acceptedCookies.indexOf('functional-and-analytics') !== -1) {
                    scope.startTracking();
                } else {
                    scope.stopTracking();
                }
            });

            // cookie非同意時
            scope.$target.on('disable', function(e){
                scope.stopTracking();
            });
        }
        
        // 選択されたcookieを取得して保存
        proto.getCheckedCookies = function($target){
            var scope = this;
            // チェックされているチェックボックスの　valueをlocalstorageにカンマ区切りの文字列として保存
            scope.acceptedCookies = $target.map(function(i, ele){
                return ele.value;
            }).get().join(',') || '';
            //console.log(scope.acceptedCookies)
            localStorage.setItem('acceptedCookies', scope.acceptedCookies);
        }

        // パネルを開く
        proto.panelOpen = function(){
            var scope = this;
            if (scope.isBannerShown) scope.$banner.removeClass('is-show');
            scope.$panel.addClass('is-show');
            scope.$overlay.addClass('is-show');
        }

        // パネルを閉じる
        proto.panelClose = function(){
            var scope = this;
            if (scope.isBannerShown) scope.$banner.addClass('is-show');
            scope.$panel.removeClass('is-show');
            if (!scope.sBannerShown) scope.$overlay.removeClass('is-show');
        }

        // cookieを全て許容する
        proto.acceptAll = function(){
            var scope = this;
            scope.$switch.find('input[type="checkbox"]').each(function(){
                this.checked = true;
            });
            scope.getCheckedCookies(scope.$switch.find('input[type="checkbox"]'));
        }

        // cookieを全て拒否する
        proto.disableAll = function(){
            var scope = this;
            scope.$switch.find('input[type="checkbox"]').each(function(){
                this.checked = false;
            });
            scope.getCheckedCookies(scope.$switch.find('input[type="checkbox"]').filter(':checked'));
            localStorage.removeItem('acceptedCookies');
        }

        // 計測タグを挿入
        proto.startTracking = function() {
            var scope = this;
            var GTMscript = "<!-- Google Tag Manager --><script id='js-inserted-gtm'>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KFPGG2W');<\/script><!-- End Google Tag Manager -->";
            $('head').prepend(GTMscript);
        }

        // 計測用cookieを削除
        proto.stopTracking = function(){
            var scope = this;
            //console.log(Cookies.get())
            var cookieNames = Object.keys(Cookies.get()).filter(function(key){
                return key.match(/^_gid/) || key.match(/^_ga(_)?/) || key.match(/^_gat_UA/)
            });
            cookieNames.forEach(function(name){
                Cookies.remove(name, { path: '/', domain: '.' + location.host });
            });
        }

        return cookieManager;
    })();

    document.addEventListener('DOMContentLoaded', function(){
        new CookieManager();
    }, false);
})(jQuery);