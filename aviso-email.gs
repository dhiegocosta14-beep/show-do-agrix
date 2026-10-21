// AgriX Show — aviso por e-mail aos gestores quando alguém novo pede acesso.
// Implantar como App da Web: Executar como "Eu", Quem pode acessar "Qualquer pessoa".
const PROJETO = "show-do-agrix-b1145";
const PRINCIPAL = ["dhiegocosta14@gmail.com"];
const SITE = "https://dhiegocosta14-beep.github.io/show-do-agrix/";

function doPost(e) {
  try {
    const b = JSON.parse(e.postData.contents);
    if (!b.uid || !b.token) return out("faltou");
    const base = "https://firestore.googleapis.com/v1/projects/" + PROJETO + "/databases/(default)/documents/";
    const h = { headers: { Authorization: "Bearer " + b.token }, muteHttpExceptions: true };
    // Lê o perfil com o token da própria pessoa: só funciona se o pedido for real.
    const r = UrlFetchApp.fetch(base + "usuarios/" + encodeURIComponent(b.uid), h);
    if (r.getResponseCode() !== 200) return out("sem-perfil");
    const f = JSON.parse(r.getContentText()).fields || {};
    const v = k => (f[k] && f[k].stringValue) || "";
    if (v("status") !== "pendente") return out("nao-pendente");
    const props = PropertiesService.getScriptProperties();
    if (props.getProperty("u_" + b.uid)) return out("ja-avisado");
    let dest = PRINCIPAL.slice();
    const g = UrlFetchApp.fetch(base + "config/gestores", h);
    if (g.getResponseCode() === 200) {
      const gf = JSON.parse(g.getContentText()).fields || {};
      ((gf.emails && gf.emails.arrayValue && gf.emails.arrayValue.values) || []).forEach(x => { if (x.stringValue) dest.push(x.stringValue); });
    }
    dest = Array.from(new Set(dest.map(x => String(x).trim().toLowerCase()).filter(Boolean)));
    const nome = v("nome") || "Sem nome", email = v("email");
    const link = SITE + "#painel";
    MailApp.sendEmail({
      to: dest.join(","),
      subject: "AgriX Show: " + nome + " pediu acesso",
      name: "AgriX Show",
      htmlBody:
        '<div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#0b2545">' +
        '<h2 style="color:#1565c0;margin:0 0 12px">Novo pedido de acesso</h2>' +
        '<p><b>' + esc(nome) + '</b> (' + esc(email) + ') entrou no AgriX Show com o Google e está aguardando aprovação.</p>' +
        '<p style="margin:24px 0"><a href="' + link + '" style="background:#1565c0;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:bold">Abrir o painel e aprovar</a></p>' +
        '<p style="font-size:13px;color:#555">No painel, vá em <b>Pessoas</b> e toque em <b>Aprovar</b> ou <b>Recusar</b>. Você precisa entrar com a sua conta Google de gestor.</p>' +
        '</div>'
    });
    props.setProperty("u_" + b.uid, new Date().toISOString());
    return out("enviado");
  } catch (err) {
    return out("erro");
  }
}
function doGet() { return out("ok"); }
function out(s) { return ContentService.createTextOutput(s); }
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]); }
