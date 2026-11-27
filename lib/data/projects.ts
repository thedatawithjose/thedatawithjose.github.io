import { HeroProjectCardProps, SupportingProjectCardProps } from '../../components/WhatIBuildSection/types';

export const heroProject: HeroProjectCardProps = {
  id: 'sec-parser',
  title: 'EDGAR SEC Parser',
  subtitle: 'FINANCIAL DATA INGESTION | BATCH PROCESSING',
  badge: { text: 'SGML / XBRL', color: 'teal' },
  icon: 'fa-database',
  gradient: { from: '#00BFA5', to: '#42A5F5' },
  description: 'Batch ingestion and normalization of SEC filings, with specialized parsers, failure isolation and structured PostgreSQL storage.',
  architecture: [
    { component: 'Format detection', details: 'Route SGML and XBRL filings to specialized parsers.' },
    { component: 'Failure handling', details: 'Log malformed documents and parser failures for targeted reprocessing.' },
    { component: 'Normalization', details: 'Normalize extracted metadata and financial facts into a stable schema.' },
    { component: 'Storage', details: 'PostgreSQL persistence for downstream research.' }
  ],
  techStack: ['Python', 'PostgreSQL', 'SQLAlchemy', 'pytest'],
  features: ['Batch ingestion and reprocessing', 'Unit, integration and basic performance tests'],
  link: '/portfolio/edgar-sec-parser/'
};

export const supportingProjects: SupportingProjectCardProps[] = [
  {
    id: 'architecture-principles',
    title: 'Data Architecture Principles',
    subtitle: 'ENGINEERING APPROACH',
    badge: { text: 'Cost-Aware', color: 'blue' },
    icon: 'fa-cogs',
    gradient: { from: '#005A9C', to: '#1976D2' },
    description: 'Design data systems with explicit failure modes, maintenance costs and scaling constraints.',
    features: ['Maintainability', 'Cost considerations', 'Reliability requirements']
  },
  {
    id: 'trading-infrastructure',
    title: 'Trading Data Infrastructure',
    subtitle: 'MARKET DATA | RESEARCH WORKFLOWS',
    badge: { text: 'Data Quality', color: 'blue' },
    icon: 'fa-stream',
    gradient: { from: '#005A9C', to: '#00BFA5' },
    description: 'Modular financial data pipelines for extraction, validation, transformation and storage across market data providers.',
    features: ['OHLCV validation', 'Multiple market data providers', 'Research data preparation'],
    techStack: ['Python', 'PostgreSQL', 'TimescaleDB']
  }
];
