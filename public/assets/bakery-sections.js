/**
 * Vanilla Bakery Sections Controller
 * Shopify OS 2.0 / Vanilla Standalone Pipeline
 * Zero jQuery, Zero App Dependencies
 */
(function () {
  'use strict';

  // 1. Pincode / Local Delivery Checker
  function initPincodeCheckers() {
    document.querySelectorAll('.bk-pincode-check').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('.bk-pincode-input');
        if (!input) return;
        var val = input.value.trim();
        var output = form.querySelector('.bk-pincode-output') || document.createElement('span');
        output.className = 'bk-pincode-output';
        output.style.fontSize = '0.78rem';
        output.style.color = '#fbbf24';
        output.style.marginLeft = '0.5rem';

        if (val.length >= 4) {
          output.textContent = '✓ Same-day delivery available (order before 2:00 PM).';
        } else {
          output.textContent = 'Please enter a valid pincode/zip.';
        }
        if (!form.contains(output)) {
          form.appendChild(output);
        }
      });
    });
  }

  // 2. Custom Cake Stepper
  function initCakeSteppers() {
    document.querySelectorAll('.bk-builder-card').forEach(function (container) {
      var stepBtns = container.querySelectorAll('.bk-step-btn');
      var stepPanels = container.querySelectorAll('[data-step-panel]');

      stepBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var stepIndex = btn.getAttribute('data-step-target');
          stepBtns.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');

          stepPanels.forEach(function (panel) {
            panel.style.display = panel.getAttribute('data-step-panel') === stepIndex ? 'block' : 'none';
          });
        });
      });
    });
  }

  // 3. Corporate Gifting Volume Slider
  function initCorporateSliders() {
    document.querySelectorAll('[data-bulk-slider]').forEach(function (slider) {
      var output = document.querySelector('[data-bulk-estimate]');
      if (!output) return;

      slider.addEventListener('input', function () {
        var qty = parseInt(slider.value, 10) || 24;
        var unitPrice = qty > 120 ? 3.8 : qty > 48 ? 4.2 : 4.5;
        output.textContent = '$' + (qty * unitPrice).toFixed(2);
      });
    });
  }

  // 4. Quick Add & Cart Drawer Sync
  function initQuickAdd() {
    document.querySelectorAll('[data-quick-add]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var itemTitle = btn.getAttribute('data-quick-add') || 'Bakery Item';
        var toast = document.createElement('div');
        toast.className = 'bk-toast';
        toast.textContent = '🥖 Added "' + itemTitle + '" to basket.';
        toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#1c140e;color:#fff;padding:12px 24px;border-radius:8px;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,0.2);font-size:0.9rem;';
        document.body.appendChild(toast);
        setTimeout(function () {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 3000);
      });
    });
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initPincodeCheckers();
      initCakeSteppers();
      initCorporateSliders();
      initQuickAdd();
    });
  } else {
    initPincodeCheckers();
    initCakeSteppers();
    initCorporateSliders();
    initQuickAdd();
  }
})();
