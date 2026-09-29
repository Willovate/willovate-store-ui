import sys

css = """
.marketplace-controls {
  min-width: 0;
}
.marketplace-chips {
  min-width: 0;
  flex: 1;
}
/* RESPONSIVE LARGE PREVIEW */
.marketplace-large-preview {
  container-type: inline-size;
  width: 100%;
  max-width: 1200px;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(15, 23, 42, 0.1);
  background: #f1f5f9;
  position: relative;
  margin: 0 auto;
  border: 1px solid #e2e8f0;
}
.marketplace-large-preview-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 1440px;
  height: 810px;
  transform-origin: 0 0;
  transform: scale(calc(100cqw / 1440));
  border: none;
  pointer-events: none;
}
"""

with open('src/styles/template-gallery.css', 'a', encoding='utf-8') as f:
    f.write(css)
