// ===================== Configuração do Show do AgriX =====================
// Configuração do Firebase (Configurações do projeto → Seus apps → Web).
// Esses dados não são senha: foram feitos para ficar no site.
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCpK63gzEbIUDL1vX5MxFc6eJ5xA_gbA14",
  authDomain: "show-do-agrix-b1145.firebaseapp.com",
  projectId: "show-do-agrix-b1145",
  storageBucket: "show-do-agrix-b1145.firebasestorage.app",
  messagingSenderId: "848458485612",
  appId: "1:848458485612:web:fa1afd295b608be94f6d49"
};

// Gestor principal (fixo). Outros gestores são adicionados no Painel do gestor → Gestores.
const GESTORES = ["dhiegocosta14@gmail.com"];

// Opcional: domínio de e-mail da empresa liberado automaticamente (ex.: "suaempresa.com.br").
// Deixe vazio para aprovar cada pessoa no Painel do gestor.
const DOMINIO_LIBERADO = "";

// Aviso por e-mail aos gestores quando alguém novo pede acesso.
// Cole aqui o endereço do App da Web do Google Apps Script (termina em /exec). Vazio = sem e-mail.
const AVISO_EMAIL_URL = "https://script.google.com/macros/s/AKfycbzhBzQBTH9Y69aEYHqrHfGeE3GmK4gOEiPNMgOpgT1JiFdPJpP5WNfdlV2bUvA0fKPn/exec";
