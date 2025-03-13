// 팝업 버튼 스타일
const BUTTON_STYLES = `
  position: absolute;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  z-index: 10000;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: all 0.2s;
`;

// 버튼 요소 생성
let transformButton = null;

// 선택 영역이 변경될 때마다 호출되는 함수
function handleSelection() {
  if (!window.location.href.includes("mail.google.com")) {
    return; // Do nothing if not on Gmail
  }

  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  // 기존 버튼 제거
  removeTransformButton();

  // 선택된 텍스트가 있는 경우에만 버튼 표시
  if (selectedText.length > 0) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // 새 버튼 생성
    transformButton = document.createElement("button");
    transformButton.textContent = "Gentlemail로 변환";
    transformButton.setAttribute("style", BUTTON_STYLES);

    // 버튼 위치 설정 (선택 영역 바로 아래)
    transformButton.style.left = `${rect.left + window.scrollX}px`;
    transformButton.style.top = `${rect.bottom + window.scrollY + 5}px`;

    // 버튼 클릭 이벤트
    transformButton.addEventListener("click", () => {
      // 팝업이 열려있는지 여부에 관계없이 동일한 동작 수행
      chrome.runtime.sendMessage({
        action: "openPopupWithTextAndTransform",
        text: selectedText,
      });

      // 버튼 숨기기
      removeTransformButton();
    });

    // 문서에 버튼 추가
    document.body.appendChild(transformButton);
  }
}

// 버튼 제거 함수
function removeTransformButton() {
  if (transformButton && transformButton.parentNode) {
    transformButton.parentNode.removeChild(transformButton);
    transformButton = null;
  }
}

// 마우스 클릭 이벤트 (다른 곳 클릭 시 버튼 제거)
document.addEventListener("mousedown", (e) => {
  if (transformButton && e.target !== transformButton) {
    removeTransformButton();
  }
});

// 텍스트 선택 이벤트
document.addEventListener("mouseup", () => {
  // 약간의 지연을 두어 선택이 완료된 후 처리
  setTimeout(handleSelection, 10);
});

// 스크롤 이벤트 (스크롤 시 버튼 위치 조정 또는 제거)
document.addEventListener("scroll", () => {
  if (transformButton) {
    const selection = window.getSelection();
    if (selection.toString().trim().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      transformButton.style.left = `${rect.left + window.scrollX}px`;
      transformButton.style.top = `${rect.bottom + window.scrollY + 5}px`;
    } else {
      removeTransformButton();
    }
  }
});

// 메시지 리스너
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSelectedText") {
    sendResponse({ text: window.getSelection().toString().trim() });
  }
});
