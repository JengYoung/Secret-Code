/*
* title: Toggle button class
* description: toggle button ui component
* configuration:
    selector: toggle button을 display할 영역,
    data: button으로 표현할 리스트,
    changeEvent: 버튼 클릭 시 이벤트
*/ 
export class ToggleButton {
    constructor(configuration) {
        // 내부 변수
        // toggle 된 버튼을 알기 위한 현재 선택된 button index
        this.selectedIndex = -1;

        // 설정정보
        // callback setup
        this.callback = configuration.changeEvent;

        // 초기 템플릿 display
        this.buttonElements = this.initialize(
            document.querySelector(configuration.selector), 
            configuration.data
        );

        // event listen
        this.eventBinding();
    }

    /*
    * title: toggle button display method
    * input: display 되는 element
    * output: button element list
    * description: 최초 생성할 때 button list를 출력한다. 템플릿을 관리한다.
    */
    initialize(selector, data) {
        // q1. index.html을 참고하여 toggle button을 출력하시오.
        // TODO: Write JS code here!'
        let renderStr = '';
        /*
                <button class="toggle-button">
                    <span class="border">Italic</span>
                </button>
        */ 
        for (let i=0; i < data.length; i++) {
            renderStr += `
                <button class="toggle-button">
                    <span class="${i > 0 ? 'border' : ''}">${data[i]}</span>
                </button>
            `
            selector.innerHTML = renderStr;
        }
        return document.querySelectorAll('.toggle-button');
    }

    /*
    * title: event binding method
    * description: 모든 이벤트를 처리한다.
    */
    eventBinding() {
        // q2. 한개의 버튼만이 toggle이 될 수 있도록 style을 적용하시오.
        // TODO: Write JS code here!'
        console.log(this.buttonElements)
        this.buttonElements.forEach((element, index) => {
            element.addEventListener('click', () => {
                if (this.selectedIndex === index) {
                    return;
                }
                // 하나라도 선택된 게 있다면
                if (this.selectedIndex > - 1) {
                    this.buttonElements[this.selectedIndex].classList.remove('select');
                }
                this.selectedIndex = index;

                this.buttonElements[index].classList.add('select');

                this.callback(this.selectedIndex)
            })
        })

        // q3. 선택된 버튼의 인덱스 정보를 어플리케이션으로 전달하시오.
        // TODO: Write JS code here!'
    }
}
