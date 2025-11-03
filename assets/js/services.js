// JS léger pour l'animation des compteurs et insertion optionnelle du formulaire HubSpot.
// - Compteurs : lisent data-target et animera jusqu'à la valeur.
// - HubSpot : fonction utilitaire; pour l'activer, remplacez portalId & formId et appelez loadHubspotForm().

document.addEventListener('DOMContentLoaded', function () {
  // compteur simple
  const counters = document.querySelectorAll('.stat-number');
  const speed = 1200; // durée approximative en ms

  counters.forEach(counter => {
    const target = Number(counter.getAttribute('data-target')) || 0;
    let start = 0;
    const step = Math.max(1, Math.floor((target / (speed / 16))));

    function update() {
      start += step;
      if (start >= target) {
        counter.textContent = target + (counter.textContent.includes('%') ? '%' : '');
      } else {
        counter.textContent = start;
        requestAnimationFrame(update);
      }
    }
    // lancer l'animation avec léger délai pour meilleure visibilité
    setTimeout(() => requestAnimationFrame(update), 300);
  });

  // année dans le footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/**
 * Charger un formulaire HubSpot dans #hubspot-form
 * Utilisation: configurez hubspotPortalId et hubspotFormId, puis appelez loadHubspotForm()
 *
 * Exemple:
 *   const cfg = { portalId: "123456", formId: "abcdefg-1234-...", region: "eu1" };
 *   loadHubspotForm(cfg);
 */
function loadHubspotForm({ portalId, formId, region = "na1" } = {}) {
  if (!portalId || !formId) {
    console.warn("HubSpot: portalId et formId requis pour charger le formulaire.");
    return;
  }

  if (window.hbspt) {
    // si lib déjà chargée
    window.hbspt.forms.create({
      region,
      portalId,
      formId,
      target: "#hubspot-form"
    });
    return;
  }

  // charger script
  const script = document.createElement('script');
  script.src = "https://js.hsforms.net/forms/v2.js";
  script.async = true;
  script.onload = function () {
    if (window.hbspt && window.hbspt.forms) {
      window.hbspt.forms.create({
        region,
        portalId,
        formId,
        target: "#hubspot-form"
      });
    } else {
      console.error("HubSpot forms lib non disponible après chargement.");
    }
  };
  script.onerror = function () {
    console.error("Échec du chargement du script HubSpot.");
  };
  document.body.appendChild(script);
}

// Export pour usage manuel si besoin (module non-ESM pour compat)
window.loadHubspotForm = loadHubspotForm;
