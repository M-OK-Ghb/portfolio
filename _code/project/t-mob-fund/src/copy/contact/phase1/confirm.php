<?php header("Content-Type:text/html;charset=utf-8"); ?>
<?php //error_reporting(E_ALL | E_STRICT);
if (version_compare(PHP_VERSION, '5.1.0', '>=')) {//PHP5.1.0以上の場合のみタイムゾーンを定義
  date_default_timezone_set('Asia/Tokyo');//タイムゾーンの設定（日本以外の場合には適宜設定ください）
}
//---------------------------　必須設定　必ず設定してください　-----------------------
$protocol = "https:";
$domain = "toyotamobilityfoundation.jp";
//サイトのトップページのURL　※デフォルトでは送信完了後に「トップページへ戻る」ボタンが表示されますので
$site_top = $protocol . "//" . $domain . "/";
// 管理者メールアドレス ※メールを受け取るメールアドレス(複数指定する場合は「,」で区切ってください 例 $to = "aa@aa.aa,bb@bb.bb";)
$to = "info@toyota-mf.org";
//$to = "info@toyota-mf.org";
//フォームのメールアドレス入力箇所のname属性の値（name="○○"　の○○部分）
$Email = "e-mail";
//$EmailCheck = "メールアドレス確認";
//フォームのフリガナ入力箇所のname属性の値（name="○○"　の○○部分）
$furigana = "kana";
/*------------------------------------------------------------------------------------------------
以下スパム防止のための設定　
※有効にするにはこのファイルとフォームページが同一ドメイン内にある必要があります
------------------------------------------------------------------------------------------------*/
//スパム防止のためのリファラチェック（フォームページが同一ドメインであるかどうかのチェック）(する=1, しない=0)
$Referer_check = 0;
//リファラチェックを「する」場合のドメイン ※以下例を参考に設置するサイトのドメインを指定して下さい。
$Referer_check_domain = $domain;
//---------------------------　必須設定　ここまで　------------------------------------
//---------------------- 任意設定　以下は必要に応じて設定してください ------------------------
// 管理者宛のメールで差出人を送信者のメールアドレスにする(する=1, しない=0)
// する場合は、メール入力欄のname属性の値を「$Email」で指定した値にしてください。
//メーラーなどで返信する場合に便利なので「する」がおすすめです。
$userMail = 1;
// Bccで送るメールアドレス(複数指定する場合は「,」で区切ってください 例 $BccMail = "aa@aa.aa,bb@bb.bb";)
$BccMail = "";
// 管理者宛に送信されるメールのタイトル（件名）
$subject = "一般財団法人 トヨタ・モビリティ基金 | お問い合わせを受け付けました";
// 送信確認画面の表示(する=1, しない=0)
$confirmDsp = 1;
// 送信完了後に自動的に指定のページ(サンクスページなど)に移動する(する=1, しない=0)
// CV率を解析したい場合などはサンクスページを別途用意し、URLをこの下の項目で指定してください。
// 0にすると、デフォルトの送信完了画面が表示されます。
$jumpPage = 1;
// 送信完了後に表示するページURL（上記で1を設定した場合のみ）※httpから始まるURLで指定ください。
$thanksPage = $site_top . "contact/complete.html";
// 必須入力項目を設定する(する=1, しない=0)
$requireCheck = 1;
/* 必須入力項目(入力フォームで指定したname属性の値を指定してください。（上記で1を設定した場合のみ）
値はシングルクォーテーションで囲み、複数の場合はカンマで区切ってください。フォーム側と順番を合わせると良いです。 
配列の形「name="○○[]"」の場合には必ず後ろの[]を取ったものを指定して下さい。*/
$require = array('last-name', 'first-name', 'country', 'e-mail', 'content', 'agree-check');
//----------------------------------------------------------------------
//  自動返信メール設定(START)
//----------------------------------------------------------------------
// 差出人に送信内容確認メール（自動返信メール）を送る(送る=1, 送らない=0)
// 送る場合は、フォーム側のメール入力欄のname属性の値が上記「$Email」で指定した値と同じである必要があります
$remail = 1;
//自動返信メールの送信者欄に表示される名前　※あなたの名前や会社名など（もし自動返信メールの送信者名が文字化けする場合ここは空にしてください）
$refrom_name = "一般財団法人 トヨタ・モビリティ基金";
// 差出人に送信確認メールを送る場合のメールのタイトル（上記で1を設定した場合のみ）
$re_subject = "一般財団法人 トヨタ・モビリティ基金 | お問い合わせいただきありがとうございます";
//フォーム側の「名前」箇所のname属性の値　※自動返信メールの「○○様」の表示で使用します。
//指定しない、または存在しない場合は、○○様と表示されないだけです。あえて無効にしてもOK
$dsp_name = '';
//自動返信メールの冒頭の文言 ※日本語部分のみ変更可
$remail_text = <<< TEXT
※このメールはシステムにより、自動で返信しています。ご返信をいただいても対応できかねますことをご了承ください。

改めて、担当者よりご連絡させていただきますので、今しばらくお待ちください。

以下の内容で、お問い合わせをお受けいたしました。
TEXT;
//自動返信メールに署名（フッター）を表示(する=1, しない=0)※管理者宛にも表示されます。
$mailFooterDsp = 1;
//上記で「1」を選択時に表示する署名（フッター）（FOOTER～FOOTER;の間に記述してください）
$mailSignature = <<< FOOTER
一般財団法人 トヨタ・モビリティ基金
03-3817-9960（代）
FOOTER;
//----------------------------------------------------------------------
//  自動返信メール設定(END)
//----------------------------------------------------------------------
//メールアドレスの形式チェックを行うかどうか。(する=1, しない=0)
//※デフォルトは「する」。特に理由がなければ変更しないで下さい。メール入力欄のname属性の値が上記「$Email」で指定した値である必要があります。
$mail_check = 1;
//全角英数字→半角変換を行うかどうか。(する=1, しない=0)
$hankaku = 1;
//全角英数字→半角変換を行う項目のname属性の値（name="○○"の「○○」部分）
//※複数の場合にはカンマで区切って下さい。（上記で「1」を指定した場合のみ有効）
//配列の形「name="○○[]"」の場合には必ず後ろの[]を取ったものを指定して下さい。
$hankaku_array = array('e-mail');
//フリガナの形式チェックを行うかどうか。(する=1, しない=0)
//※デフォルトは「する」。特に理由がなければ変更しないで下さい。メール入力欄のname属性の値が上記「$furigana」で指定した値である必要があります。
$furigana_check = 0;
//------------------------------- 任意設定ここまで ---------------------------------------------
// 以下の変更は知識のある方のみ自己責任でお願いします。
//----------------------------------------------------------------------
//  関数実行、変数初期化
//----------------------------------------------------------------------
$encode = "UTF-8";//このファイルの文字コード定義（変更不可）
if (isset($_GET)) $_GET = sanitize($_GET);//NULLバイト除去//
if (isset($_POST)) $_POST = sanitize($_POST);//NULLバイト除去//
if (isset($_COOKIE)) $_COOKIE = sanitize($_COOKIE);//NULLバイト除去//
if ($encode == 'SJIS') $_POST = sjisReplace($_POST, $encode);//Shift-JISの場合に誤変換文字の置換実行
$funcRefererCheck = refererCheck($Referer_check, $Referer_check_domain);//リファラチェック実行
//変数初期化
$sendmail = 0;
$empty_flag = 0;
$post_mail = '';
$errm = '';
$header = '';
if ($requireCheck == 1) {
  $requireResArray = requireCheck($require);//必須チェック実行し返り値を受け取る
  $errm = $requireResArray['errm'];
  $empty_flag = $requireResArray['empty_flag'];
}
//形式チェック
if (empty($errm)) {
  foreach ($_POST as $key => $val) {
    if ($val == "confirm_submit") $sendmail = 1;
    if ($key == $Email) $post_mail = h($val);
    if ($key == $Email && $mail_check == 1 && !empty($val)) {
      if (!checkMail($val)) {
        $errm .= "<p class=\"error_messe\">【" . $key . "】はメールアドレスの形式が正しくありません。</p>\n";
        $empty_flag = 1;
      }
      /*
      if(!sameMail($val)){
        $errm .= "<p class=\"error_messe\">【".$key."】はメールアドレスが正しくありません。</p>\n";
        $empty_flag = 1;
      }
      */
    }
//    if($key == $furigana && $furigana_check == 1 && !empty($val)){
//			if(!checkFurigana($val)){
//				$errm .= "<p class=\"error_messe\">【".$key."】はカタカナ以外が含まれています。</p>\n";
//				$empty_flag = 1;
//			}
//		}
  }
}

if (($confirmDsp == 0 || $sendmail == 1) && $empty_flag != 1) {

  //差出人に届くメールをセット
  if ($remail == 1) {
    $userBody = mailToUser($_POST, $dsp_name, $remail_text, $mailFooterDsp, $mailSignature, $encode);
    $reheader = userHeader($refrom_name, $to, $encode);
    $re_subject = "=?iso-2022-jp?B?" . base64_encode(mb_convert_encoding($re_subject, "JIS", $encode)) . "?=";
  }
  //管理者宛に届くメールをセット
  $adminBody = mailToAdmin($_POST,$subject,$mailFooterDsp,$mailSignature,$encode,$confirmDsp);
  $header = adminHeader($userMail,$post_mail,$BccMail,$to);
  $subject = "=?iso-2022-jp?B?".base64_encode(mb_convert_encoding($subject,"JIS",$encode))."?=";
  mail($to,$subject,$adminBody,$header);

  if ($remail == 1) mail($post_mail, $re_subject, $userBody, $reheader);

} else if ($confirmDsp == 1) {
  /*　▼▼▼送信確認画面のレイアウト※編集可　オリジナルのデザインも適用可能▼▼▼　*/
  ?>
  <!DOCTYPE html>
  <html lang="ja">
  <head>
  <meta charset="UTF-8">
    <title>お問い合わせ | 一般財団法人 トヨタ・モビリティ基金</title>
    <meta name="description" content="一般財団法人 トヨタ・モビリティ基金のお問い合わせページです。">
    <meta name="author" content="TOYOTA Mobility Foundation">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="format-detection" content="telephone=no">
    <meta name="robots" content="max-image-preview:large">
    <meta name="thumbnail" content="/apple-touch-icon.png">
    <link rel="icon" href="/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" href="/android-chrome.png" sizes="192x192">
    <link rel="canonical" href="https://toyotamobilityfoundation.jp/contact/">
    <link rel="start" href="https://toyotamobilityfoundation.jp/" title="Home">
    <!-- Ptengine Tag -->
    <script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script><script async="" src="https://www.googletagmanager.com/gtm.js?id=GTM-N29KTZK"></script><script src="https://js.ptengine.jp/15n75npi.js"></script>
    <!-- End Ptengine Tag -->
    <meta property="og:locale" content="ja_JP">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="一般財団法人 トヨタ・モビリティ基金">
    <meta property="og:title" content="お問い合わせ | 一般財団法人 トヨタ・モビリティ基金">
    <meta property="og:url" content="https://toyotamobilityfoundation.jp/">
    <meta property="og:description" content="一般財団法人 トヨタ・モビリティ基金のお問い合わせページです。">
    <meta property="article:published_time" content="2022-11-10T18:28:24+09:00">
    <meta property="og:image" content="https://toyotamobilityfoundation.jp/images/common/og-image.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="お問い合わせ | 一般財団法人 トヨタ・モビリティ基金">
    <meta name="twitter:description" content="一般財団法人 トヨタ・モビリティ基金のお問い合わせページです。">
    <meta name="twitter:url" content="https://toyotamobilityfoundation.jp/contact/">
    <meta name="twitter:image" content="https://toyotamobilityfoundation.jp/images/common/og-image.jpg">
    <link rel="stylesheet" href="/css/swiper.min.css">
    <link rel="stylesheet" href="/css/style.css">
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-N29KTZK');</script>
    <!-- End Google Tag Manager -->
  </head>
  <body class="js-contact-body">
    <!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N29KTZK"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  <div class="p-sub__container">
    <header class="l-header" id="js-header">
      <div class="l-header__inner">
        <div class="l-header__logo">
          <a href="/">
            <img src="/images/common/logo_gray.svg" alt="TOYOTA Mobility Foundation">
          </a>
        </div>
        <nav class="l-header__nav">
          <ul class="l-header__linkList">
            <li class="l-header__linkItem">

              <div class="l-header__linkFirst">

                <a href="/">
                  <span>トップ</span>
                </a>
              </div>
            </li>
            <li class="l-header__linkItem">

              <div class="l-header__linkFirst">

                <a href="/about/">
                  <span>当財団について</span>
                </a>
              </div>
            </li>
            <li class="l-header__linkItem">

              <div class="l-header__linkFirst">

                <a href="/topic/">
                  <span>主な活動分野</span>
                </a>
              </div>
            </li>
            <li class="l-header__linkItem">

              <div class="l-header__linkFirst">

                <a href="/activity/">
                  <span>活動内容</span>
                  <div class="l-header__linkSpaceAdjust"></div>
                </a>
              </div>
              <div class="l-header__secondTriggerWrap">
                <button class="l-header__secondTriggerBtn js-link-second-trigger">
                  <span></span>
                  <span></span>
                </button>
              </div>
              <div class="l-header__linkSecondWrap">
                <ul class="l-header__linkSecond js-link-second">
                  <li>
                    <a href="/activity/">すべて</a>
                  </li>
                  <li>
                    <a href="/activity/traffic_safety/">交通安全</a>
                  </li>
                  <li>
                    <a href="/activity/traffic_congestion/">渋滞対策</a>
                  </li>
                  <li>
                    <a href="/activity/support_for_people/">移動困難者の支援</a>
                  </li>
                  <li>
                    <a href="/activity/hydrogen_energy/">水素・エネルギー</a>
                  </li>
                  <li>
                    <a href="/activity/local_mobility_support/">地域の移動支援</a>
                  </li>
                  <li>
                    <a href="/activity/contests/">コンテスト・公募</a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="l-header__linkItem">

              <div class="l-header__linkFirst">

                <a href="/news/">
                  <span>お知らせ</span>
                  <div class="l-header__linkSpaceAdjust"></div>
                </a>
              </div>
              <div class="l-header__secondTriggerWrap">
                <button class="l-header__secondTriggerBtn js-link-second-trigger">
                  <span></span>
                  <span></span>
                </button>
              </div>
              <div class="l-header__linkSecondWrap">
                <ul class="l-header__linkSecond js-link-second">
                  <li>
                    <a href="/news/">すべて</a>
                  </li>
                  <li>
                    <a href="/news/info/">INFO</a>
                  </li>
                  <li>
                    <a href="/news/update/">UPDATE</a>
                  </li>
                  <li>
                    <a href="/news/release/">RELEASE</a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="l-header__linkItem">

              <div class="l-header__linkFirst current">

                <a href="/contact/">
                  <span>お問い合わせ</span>
                </a>
              </div>
            </li>
            <li class="l-header__linkItem">
              <div class="l-header__linkFirst langChange">
                <a href="https://toyotamobilityfoundation.org/en/" target="_blank">
                  <span>EN</span>
                </a>
              </div>
            </li>
          </ul>
        </nav>
        <div class="l-header__spBtnWrap">
          <button class="l-header__spBtn" id="js-spBtn">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
    <main class="c-main">
      <div class="p-contact">
        <section id="js-heading-subMv" class="p-contact__headingWrap c-headingWrap--subMv">
          <h1 class="c-heading">お問い合わせ</h1>
          <p class="c-headingSub">
            <span class="c-headingSub__decoration"></span>
          </p>
        </section>


        <!-- ▲ Headerやその他コンテンツなど　※自由に編集可 ▲-->

        <!-- ▼************ 送信内容表示部　※編集は自己責任で ************ ▼-->

        <?php if ($empty_flag == 1){ ?>
        <div class="p-contact__contents js-load-fadeIn">
          <p class="p-contact__headText">入力内容をご確認ください。<br>この内容で送信する場合は、ページ下部<br class="is-sp">「送信する」ボタンを押してください。</p>
          <div id="js-contact-form">
            <div class="p-contact__formArea">
              <dl class="p-contact__list confirm">
                <dt>お名前 <span>*</span></dt>
                <dd>
                  <p class="p-contact__confirmText nameArea">
                    <span><?php echo nl2br($_POST["last-name"]); ?></span>
                    <span><?php echo nl2br($_POST["first-name"]); ?></span>
                  </p>
                  <?php
                  $lNameC = requireCheck(array('last-name'));
                  $lNamErrm = $lNameC['errm'];
                  echo $lNamErrm; ?>
                  <?php
                  $fNameC = requireCheck(array('first-name'));
                  $fNameErrm = $fNameC['errm'];
                  echo $fNameErrm; ?>
                </dd>
              </dl>
              <dl class="p-contact__list confirm">
                <dt>国 <span>*</span></dt>
                <dd>
                  <p class="p-contact__confirmText"><?php echo nl2br($_POST["country"]); ?></p>
                  <?php
                  $countryC = requireCheck(array('country'));
                  $countryErrm = $countryC['errm'];
                  echo $countryErrm; ?>
                </dd>
              </dl>
              <dl class="p-contact__list confirm">
                <dt>Email Address <span>*</span></dt>
                <dd>
                  <p class="p-contact__confirmText"><?php echo nl2br($_POST["e-mail"]); ?></p>
                  <?php
                  $mailC = requireCheck(array('e-mail'));
                  $mailErrm = $mailC['errm'];
                  if (!checkMail($_POST["e-mail"])) {
                    $mailErrm .= "<p class=\"error_messe\">メールアドレスの形式が正しくありません。</p>";
                  }
                  echo $mailErrm; ?>
                </dd>
              </dl>
              <dl class="p-contact__list confirm">
                <dt>Website URL (任意)</dt>
                <dd>
                  <p class="p-contact__confirmText"><?php echo nl2br($_POST["website"]); ?></p>
                </dd>
              </dl>
              <dl class="p-contact__list confirm">
                <dt>所属部署/所属会社名　(任意)</dt>
                <dd>
                  <p class="p-contact__confirmText"><?php echo nl2br($_POST["affiliation"]); ?></p>
                </dd>
              </dl>
              <dl class="p-contact__list confirm">
                <dt>お問い合わせ内容 <span>*</span></dt>
                <dd>
                  <p class="p-contact__confirmText"><?php echo nl2br($_POST["content"]); ?></p>
                  <?php
                  $contentC = requireCheck(array('country'));
                  $contentErrm = $contentC['errm'];
                  echo $contentErrm; ?>
                </dd>
              </dl>
              <dl class="p-contact__list confirm">
                <dt>自由入力</dt>
                <dd>
                  <p class="p-contact__confirmText freeInput"><?php echo nl2br($_POST["free-input"]); ?></p>
                </dd>
              </dl>
              <div class="p-contact__bottom">
                <div class="p-contact__checkArea c-checkBox">
                  <?php
                  $agreeCheckC = requireCheck(array('agree-check'));
                  $agreeCheckErrm = $agreeCheckC['errm'];
                  echo $agreeCheckErrm; ?>
                </div>
                <div class="p-contact__confirmBtnWrap">
                  <button type="button" value="入力画面に戻る" class="c-button--confirm" onClick="history.back();  return false;">入力画面に戻る</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <?php } else { ?>
        <div class="p-contact__contents js-load-fadeIn">
          <p class="p-contact__headText">入力内容をご確認ください。<br>この内容で送信する場合は、ページ下部<br class="is-sp">「送信する」ボタンを押してください。</p>
          <div id="js-contact-form">
            <form action="<?php echo h($_SERVER['SCRIPT_NAME']); ?>" method="POST">
              <div class="p-contact__formArea">
                <dl class="p-contact__list confirm">
                  <dt>お名前 <span>*</span></dt>
                  <dd>
                    <p class="p-contact__confirmText nameArea">
                      <span>
                        <?php echo nl2br($_POST["last-name"]); ?>
                        <input type="hidden" name="last-name" value="<?php echo str_replace(array("\r\n", "\r", "\n"), " ", $_POST["last-name"]); ?>"/>
                      </span>
                      <span>
                        <?php echo nl2br($_POST["first-name"]); ?>
                        <input type="hidden" name="first-name" value="<?php echo str_replace(array("\r\n", "\r", "\n"), " ", $_POST["first-name"]); ?>"/>
                      </span>
                    </p>
                  </dd>
                </dl>
                <dl class="p-contact__list confirm">
                  <dt>国 <span>*</span></dt>
                  <dd>
                    <p class="p-contact__confirmText">
                      <?php echo nl2br($_POST["country"]); ?>
                      <input type="hidden" name="country" value="<?php echo str_replace(array("\r\n", "\r", "\n"), " ", $_POST["country"]); ?>"/>
                    </p>
                  </dd>
                </dl>
                <dl class="p-contact__list confirm">
                  <dt>Email Address <span>*</span></dt>
                  <dd>
                    <p class="p-contact__confirmText">
                      <?php echo nl2br($_POST["e-mail"]); ?>
                      <input type="hidden" name="e-mail" value="<?php echo str_replace(array("\r\n", "\r", "\n"), " ", $_POST["e-mail"]); ?>"/>
                    </p>
                  </dd>
                </dl>
                <dl class="p-contact__list confirm">
                  <dt>Website URL (任意)</dt>
                  <dd>
                    <p class="p-contact__confirmText">
                      <?php echo nl2br($_POST["website"]); ?>
                      <input type="hidden" name="website" value="<?php echo str_replace(array("\r\n", "\r", "\n"), " ", $_POST["website"]); ?>"/>
                    </p>
                  </dd>
                </dl>
                <dl class="p-contact__list confirm">
                  <dt>所属部署/所属会社名　(任意)</dt>
                  <dd>
                    <p class="p-contact__confirmText">
                      <?php echo nl2br($_POST["affiliation"]); ?>
                      <input type="hidden" name="affiliation" value="<?php echo str_replace(array("\r\n", "\r", "\n"), " ", $_POST["affiliation"]); ?>"/>
                    </p>
                  </dd>
                </dl>
                <dl class="p-contact__list confirm">
                  <dt>お問い合わせ内容 <span>*</span></dt>
                  <dd>
                    <p class="p-contact__confirmText">
                      <?php echo nl2br($_POST["content"]); ?>
                      <input type="hidden" name="content" value="<?php echo str_replace(array("\r\n", "\r", "\n"), " ", $_POST["content"]); ?>"/>
                    </p>
                  </dd>
                </dl>
                <dl class="p-contact__list confirm">
                  <dt>自由入力</dt>
                  <dd>
                    <p class="p-contact__confirmText freeInput">
                      <?php echo nl2br($_POST["free-input"]); ?>
                      <input type="hidden" name="free-input" value="<?php echo str_replace(array("\r\n", "\r", "\n"), " ", $_POST["free-input"]); ?>"/>
                    </p>
                  </dd>
                </dl>
                <input type="hidden" name="agree-check" value="<?php echo str_replace(array("\r\n", "\r", "\n"), " ", $_POST["agree-check"]); ?>"/>
                <input type="hidden" name="mail_set" value="confirm_submit">
                <input type="hidden" name="httpReferer" value="<?php echo h($_SERVER['HTTP_REFERER']); ?>">

                <div class="p-contact__bottom">
                  <p class="p-contact__confirmNote">以上の内容で送信します。<br>ご確認の上、「この内容で送信する」ボタンを押してください。</p>
                  <div class="p-contact__confirmBtnWrap">
                    <button type="button" value="入力画面に戻る" class="c-button--confirm" onClick="history.back();  return false;">入力画面に戻る</button>
                    <button type="submit" value="送信する" class="c-button" onclick="document.forms[0].submit(); return false;">この内容で送信する</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <?php } ?>
          <!-- ▲ *********** 送信内容確認部　※編集は自己責任で ************ ▲-->

          <!-- ▼ Footerその他コンテンツなど　※編集可 ▼-->

      </div>
    </main>
    <footer class="l-footer">
      <div class="l-footer__inner">
        <div class="l-footer__main">
          <div class="l-footer__logo">
            <a href="/">
              <img src="/images/common/logo_white.svg" alt="TOYOTA Mobility Foundation">
            </a>
          </div>
          <ul class="l-footer__pageListWrap">
            <li>
              <ul class="l-footer__pageList">
                <li>
                  <a href="/">トップ</a>
                </li>
                <li>
                  <a href="/about/">当財団について</a>
                </li>
                <li>
                  <a href="/topic/">主な活動分野</a>
                </li>
                <li>
                  <a href="/activity/">活動内容</a>
                </li>
                <li>
                  <a href="/news/">お知らせ</a>
                </li>
              </ul>
            </li>
            <li>
              <ul class="l-footer__pageList">
                <li>
                  <a href="/announcement.html">公告</a>
                </li>
                <li>
                  <a href="https://2979uw1smka44bifib3z527y-wpengine.netdna-ssl.com/wp-content/uploads/2021/07/20210623_tmf-articles-of-incorporation_jp.pdf" target="_blank">定款</a>
                </li>
                <li>
                  <a href="/privacy_policy.html">個人情報に関する保護方針</a>
                </li>
                <li>
                  <a href="/legal_terms.html">ご利用に関して</a>
                </li>
                <li>
                  <a href="/contact/">お問い合わせ</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="l-footer__sub">
          <p class="l-footer__copy">©2022 Toyota Mobility Foundation All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  </div>
  <script src="../js/swiper.min.js"></script>
  <script src="../js/main.js"></script>
  </body>
  </html>
  <?php
  /* ▲▲▲送信確認画面のレイアウト　※オリジナルのデザインも適用可能▲▲▲　*/
}
if (($jumpPage == 0 && $sendmail == 1) || ($jumpPage == 0 && ($confirmDsp == 0 && $sendmail == 0))) {
/* ▼▼▼送信完了画面のレイアウト　編集可 ※送信完了後に指定のページに移動しない場合のみ表示▼▼▼　*/
?>
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>お問い合わせ | 一般財団法人 トヨタ・モビリティ基金</title>
    <meta name="description" content="一般財団法人 トヨタ・モビリティ基金の公式サイトです。モビリティを通じて、より豊かな社会の実現を目指します。">
    <meta name="author" content="TOYOTA Mobility Foundation">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="format-detection" content="telephone=no">
    <meta name="thumbnail" content="/apple-touch-icon.png">
    <link rel="icon" href="/favicon.ico">
    <link rel="canonical" href="https://toyotamobilityfoundation.jp/">
    <link rel="start" href="https://toyotamobilityfoundation.jp/" title="Home">
    <!-- Ptengine Tag -->
    <script src="https://js.ptengine.jp/15n75npi.js"></script>
    <!-- End Ptengine Tag -->
    <meta property="og:locale" content="ja_JP">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="一般財団法人 トヨタ・モビリティ基金">
    <meta property="og:title" content="一般財団法人 トヨタ・モビリティ基金">
    <meta property="og:url" content="https://toyotamobilityfoundation.jp/contact/">
    <meta property="og:description" content="一般財団法人 トヨタ・モビリティ基金の公式サイトです。モビリティを通じて、より豊かな社会の実現を目指します。">
    <meta property="og:image" content="https://toyotamobilityfoundation.jp/images/common/og-image.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="一般財団法人 トヨタ・モビリティ基金">
    <meta name="twitter:description" content="一般財団法人 トヨタ・モビリティ基金の公式サイトです。モビリティを通じて、より豊かな社会の実現を目指します。">
    <meta name="twitter:url" content="https://toyotamobilityfoundation.jp/">
    <meta name="twitter:image" content="https://toyotamobilityfoundation.jp/images/common/og-image.jpg">
    <link rel="stylesheet" href="/css/swiper.min.css">
    <link rel="stylesheet" href="/css/style.css">
  </head>
  <body class="js-contact-body">
    <div class="p-sub__container">
      <header class="l-header" id="js-header">
  <div class="l-header__inner">
    <div class="l-header__logo">
      <a href="/">
        <img src="/images/common/logo_gray.svg" alt="TOYOTA Mobility Foundation">
      </a>
    </div>
    <nav class="l-header__nav">
      <ul class="l-header__linkList">
        <li class="l-header__linkItem">

          <div class="l-header__linkFirst">

            <a href="/">
              <span>トップ</span>
            </a>
          </div>
        </li>
        <li class="l-header__linkItem">

          <div class="l-header__linkFirst">

            <a href="/about/">
              <span>当財団について</span>
            </a>
          </div>
        </li>
        <li class="l-header__linkItem">

          <div class="l-header__linkFirst">

            <a href="/topic/">
              <span>主な活動分野</span>
            </a>
          </div>
        </li>
        <li class="l-header__linkItem">

          <div class="l-header__linkFirst">

            <a href="/activity/">
              <span>活動内容</span>
              <div class="l-header__linkSpaceAdjust"></div>
            </a>
          </div>
          <div class="l-header__secondTriggerWrap">
            <button class="l-header__secondTriggerBtn js-link-second-trigger">
              <span></span>
              <span></span>
            </button>
          </div>
          <div class="l-header__linkSecondWrap">
            <ul class="l-header__linkSecond js-link-second">
              <li>
                <a href="/activity/">すべて</a>
              </li>
              <li>
                <a href="/activity/traffic_safety/">交通安全</a>
              </li>
              <li>
                <a href="/activity/traffic_congestion/">渋滞対策</a>
              </li>
              <li>
                <a href="/activity/support_for_people/">移動困難者の支援</a>
              </li>
              <li>
                <a href="/activity/hydrogen_energy/">水素・エネルギー</a>
              </li>
              <li>
                <a href="/activity/local_mobility_support/">地域の移動支援</a>
              </li>
              <li>
                <a href="/activity/contests/">コンテスト・公募</a>
              </li>
            </ul>
          </div>
        </li>
        <li class="l-header__linkItem">

          <div class="l-header__linkFirst">

            <a href="/news/">
              <span>お知らせ</span>
              <div class="l-header__linkSpaceAdjust"></div>
            </a>
          </div>
          <div class="l-header__secondTriggerWrap">
            <button class="l-header__secondTriggerBtn js-link-second-trigger">
              <span></span>
              <span></span>
            </button>
          </div>
          <div class="l-header__linkSecondWrap">
            <ul class="l-header__linkSecond js-link-second">
              <li>
                <a href="/news/">すべて</a>
              </li>
              <li>
                <a href="/news/info/">INFO</a>
              </li>
              <li>
                <a href="/news/update/">UPDATE</a>
              </li>
              <li>
                <a href="/news/release/">RELEASE</a>
              </li>
            </ul>
          </div>
        </li>
        <li class="l-header__linkItem">

          <div class="l-header__linkFirst current">

            <a href="/contact/">
              <span>お問い合わせ</span>
            </a>
          </div>
        </li>
        <li class="l-header__linkItem">
          <div class="l-header__linkFirst langChange">
            <a href="https://toyotamobilityfoundation.org/en/" target="_blank">
              <span>EN</span>
            </a>
          </div>
        </li>
      </ul>
    </nav>
    <div class="l-header__spBtnWrap">
      <button class="l-header__spBtn" id="js-spBtn">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
</header>
      <main class="c-main">
        <div class="p-contact">
        <?php if($empty_flag == 1){ ?>
        <section id="js-heading-subMv" class="p-contact__headingWrap c-headingWrap--subMv">
            <h1 class="c-heading">お問い合わせ</h1>
            <p class="c-headingSub">
              <span class="c-headingSub__decoration"></span>
            </p>
          </section>
          <div><?php echo $errm; ?></div>
        <input type="button" value=" 前画面に戻る " onClick="history.back()">
        <?php } else { ?>
        <section id="js-heading-subMv" class="p-contact__headingWrap c-headingWrap--subMv">
            <h1 class="c-heading">お問い合わせ - 送信完了</h1>
            <p class="c-headingSub">
              <span class="c-headingSub__decoration"></span>
            </p>
          </section>
          <div class="p-contact__complete js-load-fadeIn">
            <p>お問い合わせいただきありがとうございます。</p>
            <p>入力いただいた内容の送信が完了いたしました。</p>
            <div class="p-contact__backTopBtn">
              <a href="<?php echo $site_top ;?>" class="c-button">TOPに戻る</a>
            </div>
          </div>
        <?php } ?>
        </div>
      </main>
      <footer class="l-footer">
  <div class="l-footer__inner">
    <div class="l-footer__main">
      <div class="l-footer__logo">
        <a href="/">
          <img src="/images/common/logo_white.svg" alt="TOYOTA Mobility Foundation">
        </a>
      </div>
      <ul class="l-footer__pageListWrap">
        <li>
          <ul class="l-footer__pageList">
            <li>
              <a href="/">トップ</a>
            </li>
            <li>
              <a href="/about/">当財団について</a>
            </li>
            <li>
              <a href="/topic/">主な活動分野</a>
            </li>
            <li>
              <a href="/activity/">活動内容</a>
            </li>
            <li>
              <a href="/news/">お知らせ</a>
            </li>
          </ul>
        </li>
        <li>
          <ul class="l-footer__pageList">
            <li>
              <a href="/announcement.html">公告</a>
            </li>
            <li>
              <a href="/pdf/20210623_tmf-articles-of-incorporation_jp.pdf" target="_blank">定款</a>
            </li>
            <li>
              <a href="/privacy_policy.html">個人情報に関する保護方針</a>
            </li>
            <li>
              <a href="/legal_terms.html">ご利用に関して</a>
            </li>
            <li>
              <a href="/contact/">お問い合わせ</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="l-footer__sub">
      <p class="l-footer__copy">©2022 Toyota Mobility Foundation All Rights Reserved.</p>
    </div>
  </div>
</footer>
    </div>
    <script src="/js/swiper.min.js"></script>
<script src="/js/main.js"></script>
  </body>
</html>

<?php 
  /* ▲▲▲送信完了画面のレイアウト 編集可 ※送信完了後に指定のページに移動しない場合のみ表示▲▲▲　*/
  //確認画面無しの場合の表示、指定のページに移動する設定の場合、エラーチェックで問題が無ければ指定ページヘリダイレクト
} else if (($jumpPage == 1 && $sendmail == 1) || $confirmDsp == 0) {
  if ($empty_flag == 1) { ?>
    <div align="center"><h4>入力にエラーがあります。下記をご確認の上「戻る」ボタンにて修正をお願い致します。</h4>
      <div style="color:red"><?php echo $errm; ?></div>
      <br/><br/><input type="button" value=" 前画面に戻る " onClick="history.back()"></div>
    <?php
  } else {
    header("Location: " . $thanksPage);
  }
}
// 以下の変更は知識のある方のみ自己責任でお願いします。
//----------------------------------------------------------------------
//  関数定義(START)
//----------------------------------------------------------------------
function checkMail($str)
{
  $mailaddress_array = explode('@', $str);
  if (preg_match("/^[\.!#%&\-_0-9a-zA-Z\?\/\+]+\@[!#%&\-_0-9a-z]+(\.[!#%&\-_0-9a-z]+)+$/", "$str") && count($mailaddress_array) == 2) {
    return true;
  } else {
    return false;
  }
}

function sameMail($str)
{
  if ($str == $_POST["メールアドレス確認"]) {
    return true;
  } else {
    return false;
  }

}

function checkFurigana($str)
{
  if (preg_match("/^[ァ-ヾ]+$/u", $str)) {
    return true;
  } else {
    return false;
  }
}

function h($string)
{
  global $encode;
  return htmlspecialchars($string, ENT_QUOTES, $encode);
}

function sanitize($arr)
{
  if (is_array($arr)) {
    return array_map('sanitize', $arr);
  }
  return str_replace("\0", "", $arr);
}

//Shift-JISの場合に誤変換文字の置換関数
function sjisReplace($arr, $encode)
{
  foreach ($arr as $key => $val) {
    $key = str_replace('＼', 'ー', $key);
    $resArray[$key] = $val;
  }
  return $resArray;
}

//送信メールにPOSTデータをセットする関数
function postToMail($arr)
{
  global $hankaku, $hankaku_array;
  $resArray = '';
  foreach ($arr as $key => $val) {
    $out = '';
    if (is_array($val)) {
      foreach ($val as $key02 => $item) {
        //連結項目の処理
        if (is_array($item)) {
          $out .= connect2val($item);
        } else {
          $out .= $item . ', ';
        }
      }
      $out = rtrim($out, ', ');

    } else {
      $out = $val;
    }//チェックボックス（配列）追記ここまで
    if (get_magic_quotes_gpc()) {
      $out = stripslashes($out);
    }

    //全角→半角変換
    if ($hankaku == 1) {
      $out = zenkaku2hankaku($key, $out, $hankaku_array);
    }
    if ($out != "confirm_submit" && $key != "httpReferer") {
      $resArray .= "【 " . h($key) . " 】 " . h($out) . "\n";
    }
  }
  return $resArray;
}

//確認画面の入力内容出力用関数
function confirmOutput($arr)
{
  global $hankaku, $hankaku_array;
  $html = '';
  foreach ($arr as $key => $val) {
    $out = '';
    if (is_array($val)) {
      foreach ($val as $key02 => $item) {
        //連結項目の処理
        if (is_array($item)) {
          $out .= connect2val($item);
        } else {
          $out .= $item . ', ';
        }
      }
      $out = rtrim($out, ', ');

    } else {
      $out = $val;
    }//チェックボックス（配列）追記ここまで
    if (get_magic_quotes_gpc()) {
      $out = stripslashes($out);
    }
    $out = nl2br(h($out));//※追記 改行コードを<br>タグに変換
    $key = h($key);

    //全角→半角変換
    if ($hankaku == 1) {
      $out = zenkaku2hankaku($key, $out, $hankaku_array);
    }

    $html .= "<tr><th>" . $key . "</th><td>" . $out;
    $html .= '<input type="hidden" name="' . $key . '" value="' . str_replace(array("<br />", "<br>"), "", $out) . '" />';
    $html .= "</td></tr>\n";
  }
  return $html;
}

//全角→半角変換
function zenkaku2hankaku($key, $out, $hankaku_array)
{
  global $encode;
  if (is_array($hankaku_array) && function_exists('mb_convert_kana')) {
    foreach ($hankaku_array as $hankaku_array_val) {
      if ($key == $hankaku_array_val) {
        $out = mb_convert_kana($out, 'a', $encode);
      }
    }
  }
  return $out;
}

//配列連結の処理
function connect2val($arr)
{
  $out = '';
  foreach ($arr as $key => $val) {
    if ($key === 0 || $val == '') {//配列が未記入（0）、または内容が空のの場合には連結文字を付加しない（型まで調べる必要あり）
      $key = '';
    } elseif (strpos($key, "円") !== false && $val != '' && preg_match("/^[0-9]+$/", $val)) {
      $val = number_format($val);//金額の場合には3桁ごとにカンマを追加
    }
    $out .= $val . $key;
  }
  return $out;
}

//管理者宛送信メールヘッダ
function adminHeader($userMail, $post_mail, $BccMail, $to)
{
  $header = '';
  if ($userMail == 1 && !empty($post_mail)) {
    $header = "From: $post_mail\n";
    if ($BccMail != '') {
      $header .= "Bcc: $BccMail\n";
    }
    $header .= "Reply-To: " . $post_mail . "\n";
  } else {
    if ($BccMail != '') {
      $header = "Bcc: $BccMail\n";
    }
    $header .= "Reply-To: " . $to . "\n";
  }
  $header .= "Content-Type:text/plain;charset=iso-2022-jp\nX-Mailer: PHP/" . phpversion();
  return $header;
}

//管理者宛送信メールボディ
function mailToAdmin($arr, $subject, $mailFooterDsp, $mailSignature, $encode, $confirmDsp)
{
  $adminBody = "以下の内容で、お問い合わせを受け付けました。\n\n";
  $adminBody .= "＜お問い合わせ内容＞\n\n";
  $adminBody.= "【 お名前 】 ".nl2br($_POST["last-name"]).nl2br($_POST["first-name"])."\n";
  $adminBody.= "【 国 】 ".nl2br($_POST["country"])."\n";
  $adminBody.= "【 Email Address 】 ".nl2br($_POST["e-mail"])."\n";
  $adminBody.= "【 Website URL (任意) 】 ".nl2br($_POST["website"])."\n";
  $adminBody.= "【 所属部署/所属会社名　(任意) 】 ".nl2br($_POST["affiliation"])."\n";
  $adminBody.= "【 お問い合わせ内容 】 ".nl2br($_POST["content"])."\n";
  $adminBody.= "【 自由入力 】 ".nl2br($_POST["free-input"])."\n";
  $adminBody .= "\n＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n\n";
  if ($mailFooterDsp == 1) $adminBody .= $mailSignature;
  return mb_convert_encoding($adminBody, "JIS", $encode);
}

//ユーザ宛送信メールヘッダ
function userHeader($refrom_name, $to, $encode)
{
  $reheader = "From: ";
  if (!empty($refrom_name)) {
    $default_internal_encode = mb_internal_encoding();
    if ($default_internal_encode != $encode) {
      mb_internal_encoding($encode);
    }
    $reheader .= mb_encode_mimeheader($refrom_name) . " <" . $to . ">\nReply-To: " . $to;
  } else {
    $reheader .= "$to\nReply-To: " . $to;
  }
  $reheader .= "\nContent-Type: text/plain;charset=iso-2022-jp\nX-Mailer: PHP/" . phpversion();
  return $reheader;
}

//ユーザ宛送信メールボディ
function mailToUser($arr, $dsp_name, $remail_text, $mailFooterDsp, $mailSignature, $encode)
{
  $userBody = '';
  //if(isset($arr[$dsp_name])) $userBody = h($arr[$dsp_name]). " 様\n";
  $userBody .= $remail_text;
  $userBody.="\n\n＜お問い合わせ内容＞\n\n";
  $userBody.= "【 お名前 】 ".nl2br($_POST["last-name"]).nl2br($_POST["first-name"])."\n";
  $userBody.= "【 国 】 ".nl2br($_POST["country"])."\n";
  $userBody.= "【 Email Address 】 ".nl2br($_POST["e-mail"])."\n";
  $userBody.= "【 Website URL (任意) 】 ".nl2br($_POST["website"])."\n";
  $userBody.= "【 所属部署/所属会社名　(任意) 】 ".nl2br($_POST["affiliation"])."\n";
  $userBody.= "【 お問い合わせ内容 】 ".nl2br($_POST["content"])."\n";
  $userBody.= "【 自由入力 】 ".nl2br($_POST["free-input"])."\n";
  $userBody .= "\n＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n\n";
  //$userBody.="送信日時：".date( "Y/m/d (D) H:i:s", time() )."\n";
  if ($mailFooterDsp == 1) $userBody .= $mailSignature;
  return mb_convert_encoding($userBody, "JIS", $encode);
}

//必須チェック関数
function requireCheck($require)
{
  $res['errm'] = '';
  $res['empty_flag'] = 0;
  foreach ($require as $requireVal) {
    $existsFalg = '';
    foreach ($_POST as $key => $val) {
      if ($key == $requireVal) {

        //連結指定の項目（配列）のための必須チェック
        if (is_array($val)) {
          $connectEmpty = 0;
          foreach ($val as $kk => $vv) {
            if (is_array($vv)) {
              foreach ($vv as $kk02 => $vv02) {
                if ($vv02 == '') {
                  $connectEmpty++;
                }
              }
            }

          }
          if ($connectEmpty > 0) {
            $res['errm'] .= "<p class=\"error_messe\">必須項目です。</p>\n";//【".h($key)."】は
            $res['empty_flag'] = 1;
          }
        } //デフォルト必須チェック
        elseif ($val == '') {
          $res['errm'] .= "<p class=\"error_messe\">必須項目です。</p>\n";//【".h($key)."】は
          $res['empty_flag'] = 1;
        } elseif (mb_strlen($val, "UTF-8") > 300) {
          $res['errm'] .= "<p class=\"error_messe\">全角300文字以内です。</p>\n";//【".h($key)."】は
          $res['empty_flag'] = 1;
        }

        $existsFalg = 1;
        break;
      }

    }
    if ($existsFalg != 1) {
      $res['errm'] .= "<p class=\"error_messe\">【" . $requireVal . "】が未選択です。</p>\n";
      $res['empty_flag'] = 1;
    }
  }

  return $res;
}

//リファラチェック
function refererCheck($Referer_check, $Referer_check_domain)
{
  if ($Referer_check == 1 && !empty($Referer_check_domain)) {
    if (strpos($_SERVER['HTTP_REFERER'], $Referer_check_domain) === false) {
      return exit('<p align="center">リファラチェックエラー。フォームページのドメインとこのファイルのドメインが一致しません</p>');
    }
  }
}

//----------------------------------------------------------------------
//  関数定義(END)
//----------------------------------------------------------------------
?>
