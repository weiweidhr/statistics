export function parseString(obj = {}) {
    return Object.keys(obj).map(item => {
        return `${item}=${encodeURIComponent(obj[item])}`;
    }).join('&');
}
export function transformTimestamp(date) {
    // 格式 "2021-01-01 18:00"
    let d = new Date(Date.parse(date.replace(/-/g, "/")));
    return d.getTime();
}
export function withData (i) {
    return `${i < 10 ? 0 : ''}${i}`
}
export function getDate(s, m = 'YYYY-MM-DD') {
    // m输入: YYYY MM DD hh mm ss
    let date = new Date(s);
    let mod = m;
    let d = {
        YYYY: withData(date.getFullYear()),
        MM: withData(date.getMonth() + 1),
        DD: withData(date.getDate()),
        hh: withData(date.getHours()),
        mm: withData(date.getMinutes()),
        ss: withData(date.getSeconds())
    };
    let reg = /(Y.*Y|M.*M|D.*D|h.*h|m.*m|s.*s)([^YMDhms])?/g;
    return mod.replace(reg, function (m, ...arr) {
        return `${d[arr[0]]}${arr[1] ? arr[1] : ''}`;
    })
}
export let clipboard = (text) =>{
    let textArea;
    // 判断是不是ios端
    function isOS() {
      return navigator.userAgent.match(/ipad|iphone/i);
    }
    //创建文本元素
    function createTextArea(text) {
      textArea = document.createElement('input');
      textArea.setAttribute('readonly', 'readonly');
      textArea.setAttribute('value', text);
      document.body.appendChild(textArea);
    }
    //选择内容
    function selectText() {
      var range,
          selection;
      if (isOS()) {
        range = document.createRange();
        range.selectNodeContents(textArea);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, 10000);
      } else {
        textArea.select();
      }
    }
    createTextArea(text);
    selectText();
    return new Promise( (resolve, reject) => {
      try{
        if(document.execCommand("Copy")){
          resolve('复制成功');  
        }else{
          reject("复制失败!");
        }
      }catch(err){
        reject("复制错误!")
      }
      document.body.removeChild(textArea);
    })
  }