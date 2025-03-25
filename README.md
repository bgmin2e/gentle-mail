# GentleMail 📩

이메일을 k-직장인 정서에 맞추어 친절하고 예의바르게 바꿔주는 AI 기반 Chrome 확장 프로그램입니다. 소통에 서툰 현대인들을 위해 개발되었습니다.  
A simple and opinionated Chrome extension that helps you write emails in a more friendly and polite way using AI. Made for modern people who are not good at communication.

---

## ✨ Features

- 📩 **이메일 다듬기 (Email Polishing)**  
  이메일을 더욱 정중하고 부드럽게 변환합니다.  
  _Before:_ "파일 보내줘잉"  
  _After:_ "파일을 보내주시면 감사하겠습니다. 😊"

  <img src="https://github.com/user-attachments/assets/45bb941a-cc02-4ea4-af13-dfa4d90ab55c" width="350" alt="Before_and_after_example">

- 🎛 **이메일 톤 조절 (Adjustable Email Tone)**  
  상대에 따라 원하는 톤을 직접 조절할 수 있습니다. (호감도/공손함)

  **"너무 딱딱한가?"** 👉 호감도를 높이면 더 부드러워집니다.  
  **"상대가 갑인가?"** 👉 공손함을 높이면 더 예의를 갖추어집니다.

- 🎯 **목적 기반 변환 (Purpose-Based Refinement)**  
  이메일의 목적(요청 | 보고 | 사과 | 기타)을 설정하여 더욱 정확한 변환을 제공합니다.
  
  **"사과" 선택 시** 👉  
  _Before:_ "보고서가 조금 지연될 것 같습니다."  
  _After:_ "보고서 제출이 예상보다 늦어질 것 같습니다. 이로 인해 불편을 끼쳐드려 죄송합니다."   
  
  <img width="350" alt="image" src="https://github.com/user-attachments/assets/b0bd4511-eb86-4598-8757-71326fe873b5" />

---

## 📦 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Shadcn UI
- **Chrome Extension**: Manifest V3 기반
- **AI Model**: OpenAI GPT-4o
- **Build Tools**: Webpack

---

## 📦 Install

1. Chrome Web Store  
   Chrome 웹 스토어에서 플러그인을 설치하세요. 이 [링크](https://chromewebstore.google.com/detail/gentlemail/cfjlofaccpgfndneamahkbojglkabhbl?hl=ko&utm_source=ext_sidebar)를 통해 찾을 수 있습니다. 이 방법이 권장되며, 업데이트는 자동으로 설치됩니다.  
   Install this plugin using Chrome Web Store. Please find the link above. This is the preferred way of installation. Updates are installed automatically.

2. (Optional) Manual Installation  
   수동으로 설치하는 방법도 있습니다. 아래 단계를 따라주세요.  
   You can also install the plugin manually. Please follow the steps below.

- Download the project ZIP or clone this repository
- Update OPENAI_API_KEY in `.env.local` with your own OpenAI API key
- Run `npm install` to install the dependencies
- Run `npm run dev` to start the development server. This is necessary to activate Next.js API routes.
- Run `npm run dev:extension` to build the extension.
- Go to chrome://extensions
- Enable Developer mode by toggling the switch on top right corner
- Click "Load unpacked"
- Select the entire Gentlemail folder

---

## 🚀 Usage

Gentlemail 을 설치한 후, 플러그인을 클릭하면 팝업창이 나타납니다.  
팝업창에서 이메일을 입력하고 변환 버튼을 누르면 변환된 이메일을 확인할 수 있습니다.

**⭐️ Gmail 에서는 텍스트 선택 시 변환 버튼이 바로 나타납니다.** 보다 빠르게 이메일을 변환해보세요!

<img width="1799" alt="gmail_full_screenshot" src="https://github.com/user-attachments/assets/01348034-4d86-4bdf-94a2-393d8d160f7b" />

---

## 📜 License

MIT – see LICENSE.md for details.
