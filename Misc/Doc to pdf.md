---
tags:
  - tool
---
```bash
find ./corp -type f -name '*.docx' -exec unoconv -f pdf -o ./corp {} +
```