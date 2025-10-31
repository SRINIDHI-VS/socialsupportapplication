# 🌐 Frontend Developer Case Study

## 📖 Overview

This project is a **3-step intelligent form wizard** built using **React (TypeScript)**, **Tailwind CSS**, and **Framer Motion**.  
It allows users to fill structured data, validate fields dynamically, auto-save progress, and even get **AI-powered suggestions** from OpenAI — all with a clean, responsive, and accessible UI.

---

## ✨ Features

### 🪜 Multi-Step Form

- Three interactive form steps (`Step1`, `Step2`, `Step3`).
- Dynamic step progress indicator with animated transitions.
- Keyboard navigation support (Enter → Next step).
- Inline error messages and validation per step.

### 💾 Auto-Save & Persistence

- Built-in local storage integration (`useFormPersistence`).
- Automatically saves form state and restores on reload.
- Displays “Saved” status when data is persisted.

### 🤖 AI-Powered Suggestions

- Users can open an **AI Assistance Modal** for any field in Step 3.
- Generates contextual text suggestions via the **OpenAI API**.
- Edit, discard, or accept the generated text.
- Requires the user’s API key — securely stored in the browser.

### 🔔 Visual Feedback

- Modern **toast notifications** (`Submit` component) for success, warning, and error states.
- Mobile-friendly and accessible to screen readers.
- Simulated submission delay for realistic feedback.

### 🌍 Localization & RTL Support

- Integrated `useApp()` context for translation handling.
- Automatic right-to-left (RTL) layout support.
- Easily extendable to multiple languages.

### ♿ Accessibility

- ARIA attributes (`role="progressbar"`, `aria-valuenow`, etc.).
- `aria-live="polite"` for toasts and real-time updates.
- Semantic and keyboard-friendly form design.

### 💅 UI/UX Design

- Clean, professional layout using **Tailwind CSS**.
- Smooth animations with **Framer Motion**.
- Responsive grid system that works seamlessly on all devices.

---

## 🧠 Tech Stack

| Category             | Technology             |
| -------------------- | ---------------------- |
| **Framework**        | React (TypeScript)     |
| **Styling**          | Tailwind CSS           |
| **Animation**        | Framer Motion          |
| **Icons**            | Lucide React           |
| **AI Integration**   | OpenAI API             |
| **State Management** | React Hooks            |
| **Persistence**      | LocalStorage           |
| **Accessibility**    | ARIA, Keyboard Support |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/frontend-case-study.git
cd frontend-case-study
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the development server

```bash
npm run dev
```

Visit: 👉 [http://localhost:3000](http://localhost:3000)

---

## 🔑 Adding Your OpenAI API Key (User Input)

You don’t need environment variables.  
The app securely manages the OpenAI API key through the UI.

### 🧭 Steps:

1. When you use AI assistance for the first time (e.g., in Step 3),  
   a **modal will appear** asking for your OpenAI API key.
2. Paste your key (format: `sk-xxxxxxxxxxxxxxxx`) and click **Save**.
3. Your key is securely stored in **localStorage** under:
   ```
   CONFIG.STORAGE_KEYS.API_KEY
   ```
4. You can change or remove the key anytime by reopening the modal.

> 🛡️ The API key never leaves your browser — it’s used only for AI requests you initiate.

---

## 🧱 Folder Structure

```
src/
 ┣ components/
 ┃ ┣ common/
 ┃ ┃ ┗ Modal.tsx
 ┃ ┣ form/
 ┃ ┃ ┣ Input.tsx
 ┃ ┃ ┣ Select.tsx
 ┃ ┃ ┗ Submit.tsx
 ┃ ┗ steps/
 ┃    ┣ Step1.tsx
 ┃    ┣ Step2.tsx
 ┃    ┗ Step3.tsx
 ┣ context/
 ┃ ┗ AppContext.tsx
 ┣ hooks/
 ┃ ┣ useAIHelper.ts
 ┃ ┗ useFormPersistence.ts
 ┣ utils/
 ┃ ┣ validate.ts
 ┃ ┗ constants/
 ┃    ┗ config.ts
 ┣ pages/
 ┃ ┗ LandingPage.tsx
 ┗ types/
    ┗ form.ts
```

---

## 🧩 Custom Hooks Overview

### 🔹 `useFormPersistence`

Handles automatic local saving and restoring of form data.

```ts
const { form, setForm, saved, clearForm } = useFormPersistence(initialForm);
```

### 🔹 `useAIHelper`

Manages AI modal logic, API key handling, and OpenAI text generation.

```ts
const { aiModal, aiLoading, handleAI, saveKey } = useAIHelper(t);
```

---
