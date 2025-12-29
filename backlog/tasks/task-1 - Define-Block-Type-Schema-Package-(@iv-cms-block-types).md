---
id: task-1
title: Define Block Type Schema Package (@iv-cms/block-types)
status: Done
assignee:
  - '@claude'
created_date: '2025-12-29 15:17'
updated_date: '2025-12-29 17:03'
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
- [x] #1 Create packages/block-types directory in iv-cms-platform
- [x] #2 Define base BlockSchema interface with type, version, and data fields
- [x] #3 Define core block types: HeroBlock, FeaturesBlock, StatsBlock, PillarsBlock, CTABlock, RichTextBlock, ImageBlock, VideoBlock, CodeBlock, ListBlock, GridBlock
- [x] #4 Each block schema includes Zod validation
- [x] #5 Export block type registry interface for custom blocks
- [x] #6 Add package to workspace and build configuration
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

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Created @iv-cms/block-types package with:

- Base block schema with versioned type system (e.g., hero/v1)
- 11 core block types: Hero, Features, Stats, Pillars, CTA, RichText, Image, Video, Code, List, Grid
- Block registry with validation and migration support
- Full TypeScript + Zod schemas for all blocks
- Default data for each block type

Files created:
- packages/block-types/src/base.ts - Core interfaces and utilities
- packages/block-types/src/blocks/*.ts - Individual block schemas
- packages/block-types/src/registry.ts - Block registry implementation
- packages/block-types/src/index.ts - Public API exports

Build successful, ready for use in other packages.
<!-- SECTION:NOTES:END -->
