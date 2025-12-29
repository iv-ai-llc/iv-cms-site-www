---
id: task-1
title: Define Block Type Schema Package (@iv-cms/block-types)
status: In Progress
assignee:
  - '@claude'
created_date: '2025-12-29 15:17'
updated_date: '2025-12-29 16:49'
labels:
  - backend
  - schema
  - foundation
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create a new package with TypeScript interfaces and Zod schemas for all block types. Each block must have a versioned type field (e.g., 'hero/v1'), required and optional fields, and be extensible for site-specific custom blocks.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Create packages/block-types directory in iv-cms-platform
- [ ] #2 Define base BlockSchema interface with type, version, and data fields
- [ ] #3 Define core block types: HeroBlock, FeaturesBlock, StatsBlock, PillarsBlock, CTABlock, RichTextBlock, ImageBlock, VideoBlock, CodeBlock, ListBlock, GridBlock
- [ ] #4 Each block schema includes Zod validation
- [ ] #5 Export block type registry interface for custom blocks
- [ ] #6 Add package to workspace and build configuration
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create feature/blocks-v1 branch in iv-cms-platform
2. Create packages/block-types directory structure
3. Define base block interfaces (BlockBase, BlockData)
4. Create versioned type system (e.g., hero/v1)
5. Define all core block schemas with Zod
6. Create block registry interface
7. Add package.json and tsconfig
8. Update workspace configuration
<!-- SECTION:PLAN:END -->
