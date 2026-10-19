const fs = require('fs');

let content = fs.readFileSync('e:/Willovate_store/willovate-store-ui/src/pages/TemplatePreview.tsx', 'utf8');

content = content.replace("import { useState } from 'react';", "import { useState, Suspense, lazy } from 'react';");

content = content.replace(/import\s+(\w+)\s+from\s+'\.\.\/templates\/food-restaurants\/([^']+)'/g, "const $1 = lazy(() => import('../templates/food-restaurants/$2'))");

content = content.replace("<div style={{ flex: 1, overflowY: 'auto', background: template.palette.background }}>", "<div style={{ flex: 1, overflowY: 'auto', background: template.palette.background }}>\n            <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', fontSize: '1.5rem', color: '#666' }}>Loading template...</div>}>");

// Replace the end tags
// It ends with:
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
content = content.replace("              </div>\n            )}\n          </div>\n        </div>\n      </main>", "              </div>\n            )}\n            </Suspense>\n          </div>\n        </div>\n      </main>");

fs.writeFileSync('e:/Willovate_store/willovate-store-ui/src/pages/TemplatePreview.tsx', content);
console.log("Refactoring complete");
