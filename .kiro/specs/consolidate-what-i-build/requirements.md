# Requirements Document

## Introduction

This specification addresses the consolidation of two competing sections on the homepage ("What I Build" and "What I've Built") into a single, modern, and elegant section that positions the user as a Data Engineer. The current structure dilutes the message by presenting similar content in two places, with the "What I've Built" section giving excessive visual weight to non-technical projects (Construction) and trading returns rather than data engineering infrastructure. The goal is to create one cohesive section that showcases data engineering expertise with modern visual effects and clear technical focus.

## Glossary

- **Homepage**: The main landing page (app/page.tsx) of the portfolio website
- **What I Build Section**: The current services preview section showcasing Real-Time Pipelines, Time-Series Analytics, and Data Architecture
- **What I've Built Section**: The current case studies section showcasing Construction, Trading Bot, and SEC Parser projects
- **Hero Project Card**: A visually dominant card (2x-3x larger than standard cards) that showcases the primary technical achievement
- **Data Engineering Focus**: Technical content emphasizing infrastructure, pipelines, architecture, and data systems rather than business outcomes or soft skills
- **Visual Hierarchy**: The arrangement and sizing of elements to guide viewer attention and communicate importance
- **Motion Effects**: Framer Motion animations including hover states, transitions, and entrance animations

## Requirements

### Requirement 1: Section Consolidation

**User Story:** As a hiring manager visiting the portfolio, I want to see one clear section showcasing data engineering work, so that I can quickly understand the candidate's technical capabilities without confusion from duplicate content.

#### Acceptance Criteria

1. WHEN the Homepage loads, THE Homepage SHALL display exactly one section titled "What I Build"
2. WHEN the Homepage loads, THE Homepage SHALL NOT display any section titled "What I've Built"
3. WHEN the consolidated section renders, THE Homepage SHALL display all content between the hero section and the "About Preview" section
4. THE Homepage SHALL remove the duplicate "What I've Built" section that currently appears in the "Results & Impact Section"

### Requirement 2: Visual Hierarchy and Hero Project

**User Story:** As a recruiter scanning the portfolio, I want to immediately see the most impressive data engineering project prominently displayed, so that I can quickly assess technical depth.

#### Acceptance Criteria

1. THE consolidated section SHALL display one Hero Project Card that occupies 60-70% of the visual space
2. THE Hero Project Card SHALL feature the Trading Data Infrastructure project with technical focus
3. THE Hero Project Card SHALL be 2x to 3x larger than supporting project cards
4. THE Hero Project Card SHALL appear first in the visual hierarchy before other project cards
5. WHEN a user views the section, THE Hero Project Card SHALL emphasize data infrastructure components over trading returns
6. THE Hero Project Card SHALL display technical metrics including throughput, latency, and system architecture details

### Requirement 3: Technical Content Focus

**User Story:** As a technical interviewer, I want to see data engineering technical details and infrastructure components, so that I can evaluate the candidate's hands-on experience with production systems.

#### Acceptance Criteria

1. THE Hero Project Card SHALL display architecture details including "WebSocket → Kafka → TimescaleDB" data flow
2. THE Hero Project Card SHALL list technical stack including "Python, SQL, Kafka, TimescaleDB, PostgreSQL, Airflow"
3. THE Hero Project Card SHALL describe fault-tolerant design patterns including "automatic failover, health checks, retry logic"
4. THE Hero Project Card SHALL include technical impact metrics such as "sub-second latency" and "5x throughput improvement"
5. THE SEC Parser project card SHALL display technical metrics including "16.5 MB/s peak throughput"
6. THE SEC Parser project card SHALL describe data engineering challenges including "fault-tolerant parsing" and "data quality validation"
7. THE Construction background SHALL be minimized to a brief context card occupying no more than 20% of visual space
8. THE Construction card SHALL frame experience as "architecture principles" rather than as a standalone technical project

### Requirement 4: Modern Visual Design

**User Story:** As a visitor to the portfolio, I want to experience smooth, elegant animations and modern design patterns, so that the site feels professional and current.

#### Acceptance Criteria

1. WHEN a user hovers over any project card, THE project card SHALL scale to 1.03x size with smooth transition
2. WHEN a user hovers over any project card, THE project card SHALL translate vertically by -8px
3. WHEN a user hovers over any project card, THE project card SHALL display enhanced shadow effects
4. WHEN project cards enter the viewport, THE project cards SHALL animate from opacity 0 to 1 with y-axis translation
5. THE Hero Project Card SHALL use gradient backgrounds from the existing color palette (blues and teals)
6. THE project cards SHALL use backdrop-blur effects for glassmorphism aesthetic
7. THE section SHALL maintain responsive design working on mobile, tablet, and desktop viewports
8. WHEN a user hovers over the Hero Project Card, THE card SHALL display subtle 3D rotation effects using rotateY transform

### Requirement 5: Content Structure

**User Story:** As a site visitor, I want to understand the data engineer's complete skill set through well-organized project cards, so that I can see both depth and breadth of experience.

#### Acceptance Criteria

1. THE consolidated section SHALL display exactly three project cards: one Hero Project Card and two supporting cards
2. THE Hero Project Card SHALL showcase "Trading Data Infrastructure" with full technical details
3. THE first supporting card SHALL showcase "SEC Financial Data Platform" with parsing and data quality focus
4. THE second supporting card SHALL showcase "Data Architecture Principles" derived from construction background
5. THE section SHALL include an introductory paragraph stating "Data infrastructure engineered for real-world conditions—not just the happy path"
6. THE section SHALL include a "Why Choose My Data Engineering?" subsection with reliability, business-alignment, and cost-consciousness highlights
7. THE section SHALL include call-to-action buttons linking to "/services" and contact options
8. THE section SHALL remove all references to "4 Years" construction project management as a standalone achievement card

### Requirement 6: Accessibility and Performance

**User Story:** As a user with accessibility needs or slow internet connection, I want the consolidated section to load quickly and be fully accessible, so that I can access the content regardless of my circumstances.

#### Acceptance Criteria

1. THE consolidated section SHALL use semantic HTML with proper heading hierarchy (h2, h3, h4)
2. THE project cards SHALL include proper ARIA labels for interactive elements
3. THE section SHALL lazy-load images and heavy assets using Next.js Image component or lazy loading attributes
4. THE section SHALL maintain Lighthouse performance score above 90
5. THE section SHALL be keyboard navigable with visible focus indicators
6. THE motion effects SHALL respect prefers-reduced-motion media query for users with motion sensitivity
7. THE section SHALL load critical content within 2 seconds on 3G connection
