
// === Bandeau Cookies Global ===

// Vérifie si l'utilisateur a déjà fait un choix
document.addEventListener('DOMContentLoaded', function() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return; // sécurité si la div n’existe pas sur une page

  // Si aucun choix n’a été fait, afficher le bandeau
  if (!localStorage.getItem('cookiesAccepted')) {
    banner.style.display = 'block';
  }

  const acceptBtn = document.getElementById('accept-cookies');
  const declineBtn = document.getElementById('decline-cookies');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function() {
      localStorage.setItem('cookiesAccepted', 'true');
      banner.style.display = 'none';
      console.log('✅ Cookies acceptés');
      // Ici, tu peux activer ton outil d’analyse (Google Analytics, etc.)
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', function() {
      localStorage.setItem('cookiesAccepted', 'false');
      banner.style.display = 'none';
      console.log('🚫 Cookies refusés');
      // Ici, tu pourrais désactiver les scripts de tracking
    });
  }
});
