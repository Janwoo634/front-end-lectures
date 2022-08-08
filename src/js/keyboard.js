// addEventListener(type, listener, options);
// addEventListener(type, listener, useCapture);
// option과 useCapture는 선택사항
// type : 수신할 이벤트 유형을 나타내는 대소문자 구분 문자열(지정된 이벤트명이 있음)
// listener : 지정한 이벤트를 수신할 객체, 자바스크립트 함수여야 함
// options : 이벤트 수신기의 특징을 지정할 수 있다
// useCapture : 이벤트 대상의 DOM트리 하위에 위치한 자손 EventTarget으로 이벤트가 전달되기 전에,
//              이 수신기가 먼저 발동돼야 함을 나타내는 boolean값, 디폴트는 false

/* eslint-disable prettier/prettier */
export class Keyboard {
  #switchEl;
  //#를 붙이면 값이 private가 되어 버리기 때문에 다른 파일에서 값을 변경할 수 없다
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }
  #assignElement() {
    this.#containerEl = document.getElementById("container");
    this.#switchEl = this.#containerEl.querySelector("#switch");
    //this.#switchEl = document.getElementById("switch");보다 비용이 절감됨
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");

  }
  // eslint-disable-next-line prettier/prettier
    #addEvent(){
    this.#switchEl.addEventListener("change",this.#onChangeTheme
      //true일 때 다크테마모드가,false일 때 일반 모드가 적용되어야 함
    );
    this.#fontSelectEl.addEventListener("change",this.#onChangeFont
        // console.log(event.target.value);
        //event.target.value(콘솔 창에 값을 가져와보기), event.target까지는 같음
    );
    document.addEventListener("keydown", (event) => {
      if(this.#keyboardEl.querySelector(`[data-code=${event.code}]`)){
        console.log(event.code);
        //event.code에는 "KeyM", "keyA"와 같은 데이터 코드가 입력되어 있음 html에
        this.#keyboardEl
        .querySelector(`[data-code=${event.code}]`)
        //[data-code=${event.code}]는 data-code="KeyM"로 해당 키보드의 데이터코드가 치환됨
        .classList.add("active");
        //css의 active기능도 추가
      }
    });
    document.addEventListener("keyup", (event) => {
     
        this.#keyboardEl
        .querySelector(`[data-code=${event.code}]`)
        .classList.remove("active")
      
    });
  }
  #onChangeTheme(event){
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : ""
    );
  }
  #onChangeFont(event){
    document.body.style.fontFamily = event.target.value;
  }
}

