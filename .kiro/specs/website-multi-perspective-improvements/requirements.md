# Requirements Document

## Introduction

This document outlines requirements for improving datawithjose.tech based on multi-perspective audits from three distinct user personas: a Tech Recruiter evaluating candidates for full-time positions, a Data Department Manager assessing technical fit and team compatibility, and a Freelance Client seeking consulting services. The improvements aim to eliminate confusion, clarify positioning, and optimize conversion for each audience.

## Glossary

- **Website**: The datawithjose.tech portfolio and services site
- **Recruiter**: HR or technical recruiter evaluating candidates for full-time Data Engineering positions
- **Department Manager**: Head of Data/Engineering department evaluating technical fit and leadership potential
- **Freelance Client**: Business owner or decision-maker seeking data engineering consulting services
- **CTA**: Call-to-action button or link
- **Hero Section**: The first visible section of a webpage above the fold
- **Availability Statement**: Clear declaration of current employment status and priorities

## Requirements

### Requirement 1: Clarify Employment Status and Availability

**User Story:** As a Recruiter, I want to immediately understand the candidate's employment status, location, and availability, so that I can quickly determine if they match our open positions.

#### Acceptance Criteria

1. WHEN a Recruiter visits the homepage, THE Website SHALL display a dedicated "Current Status" section within the hero area containing employment status, location, work authorization, and availability timeline
2. WHEN a Recruiter views the about page, THE Website SHALL present the same availability information in a consistent format
3. THE Website SHALL specify remote work preferences (remote-only, hybrid, or onsite) in the availability section
4. THE Website SHALL include expected start date or notice period in the availability statement
5. WHERE the candidate is open to relocation, THE Website SHALL explicitly state relocation willingness and preferred locations

### Requirement 2: Separate Professional Experience from Personal Projects

**User Story:** As a Department Manager, I want to clearly distinguish between paid professional work and personal side projects, so that I can accurately assess real-world production experience.

#### Acceptance Criteria

1. THE Website SHALL create two distinct sections: "Professional Experience" and "Personal Projects"
2. WHEN displaying professional experience, THE Website SHALL include company names, employment dates, and job titles
3. WHEN displaying personal projects, THE Website SHALL clearly label them as "Personal" or "Side Project"
4. THE Website SHALL present professional experience with standard resume format including responsibilities and achievements
5. THE Website SHALL include metrics and outcomes for each professional role

### Requirement 3: Resolve Dual-Focus Messaging Confusion

**User Story:** As a Freelance Client, I want to know if the engineer is focused on my project or distracted by job hunting, so that I can assess their commitment and availability.

#### Acceptance Criteria

1. THE Website SHALL display a single, clear primary focus statement (either "Seeking Full-Time" or "Accepting Consulting Projects")
2. WHERE both full-time and consulting are offered, THE Website SHALL explicitly rank them as "Primary" and "Secondary"
3. THE Website SHALL specify weekly hour availability for consulting clients (e.g., "20-30 hours/week")
4. THE Website SHALL include response time commitments for each engagement type
5. THE Website SHALL clarify project acceptance criteria (e.g., "Accepting 1-2 select projects per quarter")

### Requirement 4: Add Detailed Service Process Information

**User Story:** As a Freelance Client, I want to understand the complete engagement process from discovery to delivery, so that I can set proper expectations and budget accordingly.

#### Acceptance Criteria

1. WHEN a Freelance Client views the services page, THE Website SHALL display a week-by-week process timeline for each service package
2. THE Website SHALL specify the number of revision rounds included in each package
3. THE Website SHALL define what happens when project scope changes beyond initial estimates
4. THE Website SHALL include post-delivery support duration and terms
5. THE Website SHALL specify training or handover sessions included in each package

### Requirement 5: Expand Technical Skills and Team Experience

**User Story:** As a Department Manager, I want to see comprehensive technical skills, team collaboration experience, and leadership capabilities, so that I can assess fit for mid-level or senior positions.

#### Acceptance Criteria

1. THE Website SHALL display a skills matrix categorizing technologies by proficiency level (Expert, Advanced, Intermediate)
2. THE Website SHALL include a "Team Experience" section describing collaboration methodologies (Agile, code reviews, pair programming)
3. WHERE the candidate has mentoring experience, THE Website SHALL specify number of developers mentored and duration
4. THE Website SHALL describe experience with on-call rotations and incident response
5. THE Website SHALL include scale metrics (data volume, user count, system throughput) for major projects

### Requirement 6: Add Location and Logistics Information

**User Story:** As a Recruiter, I want to know the candidate's physical location, timezone, and visa status, so that I can determine eligibility for our positions without wasting time on initial screening.

#### Acceptance Criteria

1. THE Website SHALL display current location (city and country) in the hero section
2. THE Website SHALL specify timezone and working hours availability
3. WHERE applicable, THE Website SHALL state work authorization status (e.g., "US Citizen", "Work Visa", "Requires Sponsorship")
4. THE Website SHALL indicate willingness to work across timezones with specific hour ranges
5. THE Website SHALL clarify remote work setup (home office, coworking space, etc.)

### Requirement 7: Specify Ideal Client and Project Fit

**User Story:** As a Freelance Client, I want to know if my company size, budget, and project type match the engineer's ideal client profile, so that I don't waste time on consultations that won't be a good fit.

#### Acceptance Criteria

1. WHEN a Freelance Client views the services page, THE Website SHALL display an "Ideal Client Profile" section
2. THE Website SHALL specify target company size range (e.g., "10-500 employees")
3. THE Website SHALL define typical project budget ranges for each service tier
4. THE Website SHALL list preferred industries or domains with specific examples
5. THE Website SHALL include typical project timeline ranges (e.g., "1-6 month engagements")

### Requirement 8: Add Seniority Level Clarification

**User Story:** As a Department Manager, I want to understand the candidate's current seniority level and target level, so that I can match them to appropriate roles and set realistic salary expectations.

#### Acceptance Criteria

1. THE Website SHALL explicitly state current experience level (Junior, Mid-Level, Senior)
2. THE Website SHALL specify target role level for full-time positions
3. WHERE leadership experience exists, THE Website SHALL quantify team sizes led and project scopes managed
4. THE Website SHALL include a career progression statement (e.g., "Mid-level seeking Senior roles")
5. THE Website SHALL align project complexity examples with stated seniority level

### Requirement 9: Include FAQ Section for Common Questions

**User Story:** As a Freelance Client, I want answers to common questions about scope changes, maintenance, and working arrangements, so that I can make an informed decision without scheduling a call first.

#### Acceptance Criteria

1. THE Website SHALL include a dedicated FAQ section on the services page
2. THE Website SHALL answer at least 8 frequently asked questions covering scope, pricing, support, and process
3. WHEN a question relates to pricing, THE Website SHALL provide specific examples or ranges
4. THE Website SHALL address timezone and communication preferences in the FAQ
5. THE Website SHALL include questions about ongoing maintenance and post-project support

### Requirement 10: Add Testimonials Categorized by Use Case

**User Story:** As a Freelance Client, I want to see success stories from projects similar to mine, so that I can assess the engineer's relevant experience and expected outcomes.

#### Acceptance Criteria

1. THE Website SHALL organize testimonials by project type (e.g., "Real-time Pipelines", "Data Migration", "Analytics Dashboards")
2. WHEN displaying a testimonial, THE Website SHALL include the specific challenge, solution approach, and measurable result
3. THE Website SHALL include client company size and industry for each testimonial
4. THE Website SHALL display project timeline and budget range (where permitted) for testimonials
5. THE Website SHALL include at least 3 testimonials per major service category
