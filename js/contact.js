/* ==========================================================================
   Demon Store — contact page
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const contactLink = document.getElementById("contactWhatsappLink");
  if (contactLink) {
    contactLink.href = whatsappLink("Hello Demon Store, I have a question about your products.");
  }

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const message = `Hello Demon Store, my name is ${data.get("name")} (${data.get("phone")}).\n\n${data.get("message")}`;
      window.open(whatsappLink(message), "_blank", "noopener");
    });
  }
});
