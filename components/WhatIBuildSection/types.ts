export interface TechnicalMetric {
  label: string;
  value: string;
  icon?: string;
}

export interface ArchitectureDetail {
  component: string;
  details: string;
}

export interface ImpactStatement {
  primary: string;
  secondary?: string;
}

export interface Badge {
  text: string;
  color: 'blue' | 'teal' | 'purple';
}

export interface Gradient {
  from: string;
  to: string;
}

export interface HeroProjectCardProps {
  id: string;
  title: string;
  subtitle: string;
  badge: Badge;
  icon: string;
  gradient: Gradient;
  description: string;
  architecture: ArchitectureDetail[];
  techStack: string[];
  features: string[];
  link?: string;
}

export interface SupportingProjectCardProps {
  id: string;
  title: string;
  subtitle: string;
  badge: Badge;
  icon: string;
  gradient: Gradient;
  primaryMetric?: {
    value: string;
    label: string;
  };
  description: string;
  features: string[];
  techStack?: string[];
}
