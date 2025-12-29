---
id: task-2
title: Update Page Schema with Blocks Array
status: In Progress
assignee:
  - '@claude'
created_date: '2025-12-29 15:17'
updated_date: '2025-12-29 17:23'
labels:
  - backend
  - schema
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Extend the page schema to support a 'blocks' array field alongside the existing 'content' JSON. The blocks array stores structured block data while content continues to support TipTap JSON during migration. Add 'renderedHtml' field to store pre-rendered block output.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Add 'blocks' field to pageSchemaV2 as array of versioned block objects
- [ ] #2 Add 'renderedHtml' field for cached HTML output
- [ ] #3 Update SavePagePayloadV2 to accept blocks array
- [ ] #4 Update buildPageRecordV2 to handle blocks
- [ ] #5 Ensure backwards compatibility - content field remains supported
- [ ] #6 Add migration flag to track pages using new block format
<!-- AC:END -->
