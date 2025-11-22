# Implementation Plan

- [x] 1. Swap content in lib/data/projects.ts to prioritize Data Engineering



  - Move SEC Financial Data Platform content from supportingProjects[0] to heroProject position
  - Expand SEC content to include architecture details (4 points), expanded tech stack (6-8 items), and fuller description
  - Move Trading Infrastructure content from heroProject to supportingProjects[1] position
  - Condense Trading content to supporting card format (remove architecture, add primaryMetric, condense features to 3 items)
  - Keep Data Architecture Principles at supportingProjects[0] unchanged
  - Update all links: hero → /portfolio#sec-parser, supporting[1] → /portfolio#trading-bot
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 4.1, 4.2_

- [ ]* 2. Verify changes work correctly
  - Run TypeScript compiler to check for type errors
  - Test in browser to verify visual rendering and links work
  - _Requirements: 4.3, 4.4_
