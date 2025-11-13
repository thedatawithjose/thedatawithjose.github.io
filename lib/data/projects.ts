import { HeroProjectCardProps, SupportingProjectCardProps } from '../../components/WhatIBuildSection/types';

export const heroProject: HeroProjectCardProps = {
  id: 'sec-parser',
  title: 'SEC Financial Data Platform',
  subtitle: 'PRODUCTION-GRADE PARSER | 16.5 MB/s THROUGHPUT',
  badge: {
    text: '16.5 MB/s',
    color: 'teal'
  },
  icon: 'fa-bolt',
  gradient: {
    from: '#00BFA5',
    to: '#42A5F5'
  },
  description: `Production-grade parser processing SEC financial filings at scale with automatic recovery when parsing fails mid-document. Built with three specialized parsing engines to handle diverse document formats—because in financial data, partial results are worse than no results. Designed for reliability: comprehensive error handling, data quality validation at every stage, and fault-tolerant architecture that keeps processing even when individual documents fail.`,
  architecture: [
    {
      component: 'Multi-engine parsing system',
      details: 'Three specialized engines (BeautifulSoup, lxml, html5lib) with automatic fallback for maximum document coverage'
    },
    {
      component: 'Fault-tolerant processing',
      details: 'Automatic recovery from mid-document failures, transaction-based commits, dead letter queue for problematic filings'
    },
    {
      component: 'Data quality validation',
      details: 'Multi-stage validation pipeline ensuring financial data accuracy, completeness checks, and anomaly detection'
    },
    {
      component: 'Performance & scale',
      details: '16.5 MB/s peak throughput, PostgreSQL for structured storage, optimized for batch and real-time processing'
    }
  ],
  techStack: [
    'Python',
    'PostgreSQL',
    'BeautifulSoup',
    'lxml',
    'html5lib',
    'Pandas',
    'SQLAlchemy',
    'Airflow'
  ],
  features: [
    'Automatic parser fallback and error recovery',
    'Comprehensive data quality validation and monitoring'
  ],
  link: '/portfolio#sec-parser'
};

export const supportingProjects: SupportingProjectCardProps[] = [
  {
    id: 'architecture-principles',
    title: 'Data Architecture Principles',
    subtitle: 'FROM CONSTRUCTION TO CLOUD',
    badge: {
      text: 'Cost-Optimized',
      color: 'blue'
    },
    icon: 'fa-cogs',
    gradient: {
      from: '#005A9C',
      to: '#1976D2'
    },
    description: `Four years managing construction projects taught me: bad architecture is expensive to fix later. I design data systems the same way—thinking about failure modes, maintenance costs, and what happens at 3x scale.`,
    features: [
      'Modern stack (dbt, Snowflake)',
      'Cost-optimization strategies',
      'Reliability by design'
    ]
  },
  {
    id: 'trading-infrastructure',
    title: 'Trading Data Infrastructure',
    subtitle: 'REAL-TIME SYSTEMS | 4 YEARS PRODUCTION',
    badge: {
      text: 'High-Availability',
      color: 'blue'
    },
    icon: 'fa-stream',
    gradient: {
      from: '#005A9C',
      to: '#00BFA5'
    },
    primaryMetric: {
      value: '17.89% CAGR',
      label: '4-Year Performance'
    },
    description: `Built end-to-end data platform powering algorithmic trading with real capital. When your pipeline fails at market open, you lose money every second—taught me to build systems that stay up.`,
    features: [
      'Real-time ingestion: Kafka, TimescaleDB',
      'Fault-tolerant: auto-failover, health checks',
      'Production results: 17.89% CAGR, 2.34 Sharpe'
    ],
    techStack: [
      'Python',
      'Kafka',
      'TimescaleDB',
      'PostgreSQL',
      'Airflow'
    ],
    link: '/portfolio#trading-bot'
  }
];
