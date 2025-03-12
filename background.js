// 확장 프로그램이 설치되거나 업데이트될 때 초기화
chrome.runtime.onInstalled.addListener(() => {
  console.log("GentleMail 확장 프로그램이 설치되었습니다.");
});

// 메시지 리스너 추가
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // 콘텐츠 스크립트에서 팝업 열기 요청
  if (request.action === "openPopupWithText") {
    // 팝업 열기
    chrome.windows.create(
      {
        url: chrome.runtime.getURL("popup.html"),
        type: "popup",
        width: 500,
        height: 600,
      },
      (popupWindow) => {
        // 팝업이 완전히 로드된 후 메시지 전송을 위해 지연
        setTimeout(() => {
          chrome.tabs.sendMessage(popupWindow.tabs[0].id, {
            action: "transformSelectedText",
            text: request.text,
          });
        }, 1000);
      }
    );
  }

  // 새로운 기능: 팝업이 있으면 사용하고, 없으면 열어서 텍스트 변환
  else if (request.action === "openPopupWithTextAndTransform") {
    chrome.tabs.query({}, (tabs) => {
      let popupTab = tabs.find(
        (tab) =>
          tab.url && tab.url.includes(chrome.runtime.getURL("popup.html"))
      );

      if (popupTab) {
        chrome.windows.update(popupTab.windowId, { focused: true });
        chrome.tabs.sendMessage(popupTab.id, {
          action: "transformSelectedText",
          text: request.text,
        });
      } else {
        chrome.windows.create(
          {
            url: chrome.runtime.getURL("popup.html"),
            type: "popup",
            width: 500,
            height: 600,
          },
          (popupWindow) => {
            if (popupWindow.tabs && popupWindow.tabs.length > 0) {
              let newTabId = popupWindow.tabs[0].id;
              chrome.tabs.onUpdated.addListener(function listener(
                tabId,
                changeInfo
              ) {
                if (tabId === newTabId && changeInfo.status === "complete") {
                  chrome.tabs.sendMessage(tabId, {
                    action: "transformSelectedText",
                    text: request.text,
                  });
                  chrome.tabs.onUpdated.removeListener(listener);
                }
              });
            }
          }
        );
      }
    });
  }

  // transformSelectedText 메시지 처리 (팝업이 이미 열려있는 경우)
  else if (request.action === "transformSelectedText") {
    sendResponse({ received: true });
  }
});
