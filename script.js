(function(){
  function setHTML(selector, html){
    var el=document.querySelector(selector);
    if(el) el.innerHTML=html;
  }
  function setText(selector, text){
    var el=document.querySelector(selector);
    if(el) el.textContent=text;
  }
  function replaceVisibleText(from,to){
    var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    var nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function(node){
      var parent=node.parentElement;
      if(!parent || /^(SCRIPT|STYLE|NOSCRIPT)$/i.test(parent.tagName)) return;
      if(node.nodeValue.indexOf(from)!==-1) node.nodeValue=node.nodeValue.split(from).join(to);
    });
  }
  function removeMessageSignature(){
    var section=document.querySelector('.message');
    if(!section) return;

    section.querySelectorAll('[class~="signature"],[class$="-signature"],[class*="message-sign"],[id*="signature"]').forEach(function(el){
      el.remove();
    });

    section.querySelectorAll('img').forEach(function(img){
      var meta=[img.className,img.id,img.getAttribute('alt'),img.getAttribute('src')].filter(Boolean).join(' ');
      if(/signature|sign-|hirahara|署名|サイン/i.test(meta)){
        var wrapper=img.closest('figure,p,div');
        if(wrapper && wrapper!==section) wrapper.remove();
        else img.remove();
      }
    });

    section.querySelectorAll('*').forEach(function(el){
      if(el.children.length===0 && /^平原\s*こうや$/.test((el.textContent||'').trim())) el.remove();
    });
  }
  function applyCopy(){
    setHTML('.hero-catch','改革を、<br>暮らしの前進へ。');
    setHTML('.hero-sub','現場の声を聞き、課題と向き合い、行動する。<br>政治の現場で培った経験を、育った兵庫の未来へ。');

    setHTML('.message h2','政治を、もっと身近に。<br><span class="acc-red">暮らしを、もっと前へ。</span>');
    setHTML('.message p','政治は、特別な人たちだけのものではありません。<br><br>毎日の暮らし、子育て、教育、仕事、地域の未来。<br>私たちの生活のすぐそばにあるものだと考えています。<br><br>これまで会社員として働き、国政・地方政治の現場で秘書として経験を重ね、2023年には自ら選挙にも挑戦しました。<br><br>政治の内側と外側、その両方を経験してきたからこそ、制度や数字だけではなく、一人ひとりの暮らしから政治を考えていきたい。<br><br>現場に足を運び、声を聞き、自分の言葉で伝え、行動する。<br><br>改革を、県民生活の向上につなげる政治へ。<br><br>これからも、一歩ずつ前へ進んでいきます。');

    setHTML('.prof-text','大阪府で生まれ、兵庫県で育つ。<br><br>会社員として社会人経験を積んだ後、衆議院議員公設秘書、参議院議員私設秘書、大阪維新の会副代表秘書など、国政・地方政治の現場で経験を重ねてきました。<br><br>2023年には大阪市会議員選挙に挑戦。<br><br>これまで培ってきた経験を、育った兵庫の未来のために生かしたい。<br><br>地域を歩き、さまざまな声に耳を傾けながら、次の時代の政治を目指して活動しています。');

    setText('.timeline li:first-child h3','大阪府で生まれ、兵庫県で育つ');
    setText('.timeline li:first-child p','大阪府で生まれ、兵庫県で育ちました。人生の長い時間を兵庫で過ごし、地域の中で成長してきました。');

    setText('.cta h2','SNSでも発信しています');
    setText('.cta p','日々の活動や地域での出来事、政治について考えていることなどを発信しています。');

    replaceVisibleText('兵庫県で生まれ育つ','大阪府で生まれ、兵庫県で育つ');
    replaceVisibleText('兵庫で生まれ育ち','大阪府で生まれ、兵庫県で育ち');
    removeMessageSignature();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',applyCopy);
  else applyCopy();
})();
