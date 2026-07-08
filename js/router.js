/* ============================================
   StadiumAI 2026 — Router
   Hash-based client-side routing
   ============================================ */

"use strict";

const Router = (() => {
  let currentView = null;
  let routes = {};
  let onChangeCallbacks = [];

  function init(routeMap) {
    routes = routeMap;
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  function handleRoute() {
    const hash = window.location.hash.slice(1) || 'overview';
    navigate(hash, false);
  }

  function navigate(viewId, updateHash = true) {
    if (currentView === viewId) return;

    // Hide current view
    const views = document.querySelectorAll('.view');
    views.forEach(v => {
      v.classList.remove('active');
      v.style.display = 'none';
    });

    // Show target view
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
      target.style.display = 'block';
      // Trigger reflow for animation
      target.offsetHeight;
      target.classList.add('active');
    }

    // Update navigation active state
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === viewId);
    });

    // Update header
    const headerTitle = document.getElementById('header-title');
    if (headerTitle && routes[viewId]) {
      headerTitle.textContent = routes[viewId].title || viewId;
    }

    const prevView = currentView;
    currentView = viewId;

    if (updateHash) {
      window.location.hash = viewId;
    }

    // Notify callbacks
    onChangeCallbacks.forEach(cb => cb(viewId, prevView));
  }

  function onChange(callback) {
    onChangeCallbacks.push(callback);
  }

  function getCurrentView() {
    return currentView;
  }

  return { init, navigate, onChange, getCurrentView };
})();
