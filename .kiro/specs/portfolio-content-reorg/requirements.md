# Requirements Document

## Introduction

This feature reorganizes the content of the "What I Build" portfolio section to prioritize Data Engineering expertise over Trading Infrastructure. The goal is to showcase SEC Financial Data Platform as the hero project (large card) while maintaining all existing functionality and visual layout. This is a content-only change that repositions the professional narrative without modifying the component structure.

## Glossary

- **Hero Project Card**: The large, prominent card spanning 2 columns in the portfolio grid that showcases the primary project
- **Supporting Project Cards**: The two medium-sized cards (1 column each) that display secondary projects
- **Portfolio Section**: The "What I Build" section component displaying project cards in a responsive grid
- **Content Swap**: Changing the data/content of cards without modifying the component structure or layout

## Requirements

### Requirement 1

**User Story:** As a potential client visiting the portfolio, I want to see Data Engineering expertise prominently featured, so that I understand the primary service offering immediately.

#### Acceptance Criteria

1. WHEN the Portfolio Section loads, THE Hero Project Card SHALL display "SEC Financial Data Platform" as the title
2. WHEN the Portfolio Section loads, THE Hero Project Card SHALL display "16.5 MB/s Peak Throughput" as the badge text
3. WHEN the Portfolio Section loads, THE Hero Project Card SHALL include a link to "/portfolio#sec-parser"
4. THE Hero Project Card SHALL maintain the existing visual layout and component structure
5. THE Hero Project Card SHALL display Data Engineering-focused content in the description and architecture sections

### Requirement 2

**User Story:** As a potential client, I want to see Data Architecture principles as a supporting project, so that I understand the breadth of data engineering services offered.

#### Acceptance Criteria

1. WHEN the Portfolio Section loads, THE first Supporting Project Card SHALL display "Data Architecture Principles" as the title
2. THE first Supporting Project Card SHALL maintain Data Engineering focus in its content
3. THE first Supporting Project Card SHALL include a link to "/services#data-architecture"
4. THE first Supporting Project Card SHALL maintain the existing visual layout and component structure

### Requirement 3

**User Story:** As a potential client, I want to see Trading Infrastructure as a supporting project, so that I can still learn about this experience without it dominating the portfolio.

#### Acceptance Criteria

1. WHEN the Portfolio Section loads, THE second Supporting Project Card SHALL display "Trading Data Infrastructure" as the title
2. THE second Supporting Project Card SHALL include a link to "/portfolio#trading-bot"
3. THE second Supporting Project Card SHALL maintain the existing visual layout and component structure
4. THE second Supporting Project Card SHALL display condensed Trading Infrastructure content appropriate for a supporting card format

### Requirement 4

**User Story:** As a developer maintaining the codebase, I want the content reorganization to be implemented through data changes only, so that the risk of breaking the layout or functionality is minimized.

#### Acceptance Criteria

1. THE Portfolio Section SHALL NOT modify any component files (index.tsx, HeroProjectCard.tsx, SupportingProjectCard.tsx)
2. THE Portfolio Section SHALL implement changes exclusively in the data file (lib/data/projects.ts)
3. WHEN the changes are applied, THE Portfolio Section SHALL maintain all existing animations, hover effects, and responsive behavior
4. THE Portfolio Section SHALL maintain all existing TypeScript type definitions without modification
