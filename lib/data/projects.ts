import { HeroProjectCardProps, SupportingProjectCardProps } from '../../components/WhatIBuildSection/types';

export const heroProject: HeroProjectCardProps = {
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
  description: `Built end-to-end data platform powering algorithmic trading with real capital. When your pipeline fails at market open, you lose money every second—taught me to build systems that stay up.`,
  architecture: [
    {
      component: 'Real-time ingestion',
      details: 'WebSocket → Kafka → TimescaleDB (sub-second latency for tick data)'
    },
    {
      component: 'Backtesting infrastructure',
      details: '5x throughput improvement (weeks → hours through parallelization)'
    },
    {
      component: 'Fault-tolerant design',
      details: 'Automatic failover, health checks, retry logic with dead letter queues'
    },
    {
      component: 'Production results',
      details: '17.89% CAGR, 2.34 Sharpe ratio over 4 years'
    }
  ],
  techStack: [
    'Python',
    'SQL',
    'Kafka',
    'TimescaleDB',
    'PostgreSQL',
    'Airflow'
  ],
  features: [
    'High-frequency data processing & anomaly detection',
    'Comprehensive monitoring, SLA-aware alerting'
  ]
};

export const supportingProjects: SupportingProjectCardProps[] = [
  {
    id: 'sec-parser',
    title: 'SEC Financial Data Platform',
    subtitle: '16.5 MB/s PEAK THROUGHPUT',
    badge: {
      text: '16.5 MB/s',
      color: 'teal'
    },
    icon: 'fa-bolt',
    gradient: {
      from: '#00BFA5',
      to: '#42A5F5'
    },
    primaryMetric: {
      value: '16.5 MB/s',
      label: 'Peak Throughput'
    },
    description: `Production-grade parser processing SEC filings with automatic recovery when parsing fails mid-document. In financial data, partial results are worse than no results.`,
    features: [
      'Python, PostgreSQL, 3 engines',
      'Fault-tolerant parsing',
      'Data quality validation'
    ]
  },
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
  }
];
