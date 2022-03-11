---
inject: true
to: src/uikit/index.ts
append: true
skip_if: <%= name %>
---
export * from './<%= name %>/<%= name %>'
