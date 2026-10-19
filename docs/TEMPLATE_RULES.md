# Template rules

- Register every template in `src/templates/registry.ts`; do not add a separate route map.
- A registered component must be a real, default-exported responsive page, loaded through the registry's `component` loader.
- Keep the route hierarchy data-driven: `/templates`, `/templates/:groupId`, `/templates/:groupId/:categorySlug`, and `/templates/:groupId/:categorySlug/:templateSlug`.
- “Use Template” creates a website through the workspace API and then opens its editor route.
- Gallery cards use live preview iframes, not screenshots.
