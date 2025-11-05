---
title: "AWS Cost Optimization: Strategies for Data Engineering"
date: "2024-03-08"
author: "Jose Acosta"
excerpt: "Comprehensive strategies for optimizing AWS costs in data engineering workloads, from storage to compute optimization."
image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop&crop=center"
---

## AWS Cost Optimization: Strategies for Data Engineering

Cloud cost optimization is crucial for data engineering teams working with large-scale data processing. AWS offers numerous services for data engineering, but without proper optimization strategies, costs can spiral out of control. This article explores comprehensive cost optimization techniques specifically tailored for data engineering workloads.

### Understanding AWS Data Engineering Costs

Before implementing optimization strategies, it's essential to understand the cost components:

```python
from dataclasses import dataclass
from typing import Dict, List, Optional, Any
from datetime import datetime, timedelta
import boto3
import pandas as pd
from decimal import Decimal
import json

@dataclass
class AWSCostAnalysis:
    """Comprehensive AWS cost analysis for data engineering"""
    total_cost: Decimal
    service_breakdown: Dict[str, Decimal]
    daily_costs: List[Dict]
    cost_trends: Dict[str, Any]
    optimization_opportunities: List[Dict]
    recommendations: List[str]

    @property
    def cost_per_tb_processed(self) -> Optional[Decimal]:
        """Calculate cost per TB of data processed"""
        # Implementation would track data volume
        pass

class AWSCostAnalyzer:
    def __init__(self, account_id: str, region: str = 'us-east-1'):
        self.account_id = account_id
        self.region = region
        self.cost_explorer = boto3.client('ce', region_name=region)
        self.cloudwatch = boto3.client('cloudwatch', region_name=region)

    def analyze_costs(self, start_date: datetime, end_date: datetime) -> AWSCostAnalysis:
        """Analyze AWS costs for the specified period"""

        # Get cost and usage data
        cost_data = self._get_cost_and_usage(start_date, end_date)

        # Analyze service breakdown
        service_breakdown = self._analyze_service_breakdown(cost_data)

        # Identify optimization opportunities
        opportunities = self._identify_optimization_opportunities(cost_data)

        # Generate recommendations
        recommendations = self._generate_recommendations(opportunities)

        return AWSCostAnalysis(
            total_cost=sum(service_breakdown.values()),
            service_breakdown=service_breakdown,
            daily_costs=self._get_daily_costs(start_date, end_date),
            cost_trends=self._analyze_cost_trends(cost_data),
            optimization_opportunities=opportunities,
            recommendations=recommendations
        )

    def _get_cost_and_usage(self, start_date: datetime, end_date: datetime) -> Dict:
        """Get detailed cost and usage data from Cost Explorer"""
        response = self.cost_explorer.get_cost_and_usage(
            TimePeriod={
                'Start': start_date.strftime('%Y-%m-%d'),
                'End': end_date.strftime('%Y-%m-%d')
            },
            Granularity='DAILY',
            Metrics=['BlendedCost', 'UsageQuantity'],
            GroupBy=[
                {'Type': 'DIMENSION', 'Key': 'SERVICE'},
                {'Type': 'DIMENSION', 'Key': 'AZ'}
            ]
        )

        return response

    def _analyze_service_breakdown(self, cost_data: Dict) -> Dict[str, Decimal]:
        """Analyze costs by service"""
        service_costs = {}

        for group in cost_data.get('ResultsByTime', []):
            for service_group in group.get('Groups', []):
                service_name = service_group['Keys'][0]
                cost = Decimal(service_group['Metrics']['BlendedCost']['Amount'])

                if service_name in service_costs:
                    service_costs[service_name] += cost
                else:
                    service_costs[service_name] = cost

        return service_costs

    def _identify_optimization_opportunities(self, cost_data: Dict) -> List[Dict]:
        """Identify potential cost optimization opportunities"""
        opportunities = []

        # Check for EC2 idle instances
        ec2_opportunities = self._check_ec2_optimization()
        opportunities.extend(ec2_opportunities)

        # Check for EBS optimization
        ebs_opportunities = self._check_ebs_optimization()
        opportunities.extend(ebs_opportunities)

        # Check for S3 storage optimization
        s3_opportunities = self._check_s3_optimization()
        opportunities.extend(s3_opportunities)

        # Check for data transfer costs
        data_transfer_opportunities = self._check_data_transfer_optimization()
        opportunities.extend(data_transfer_opportunities)

        return opportunities

    def _check_ec2_optimization(self) -> List[Dict]:
        """Check for EC2 cost optimization opportunities"""
        opportunities = []

        # Get EC2 instances
        ec2 = boto3.client('ec2', region_name=self.region)
        instances = ec2.describe_instances()

        for reservation in instances['Reservations']:
            for instance in reservation['Instances']:
                instance_id = instance['InstanceId']
                state = instance['State']['Name']

                if state == 'running':
                    # Check CPU utilization
                    cpu_metrics = self._get_cloudwatch_metric(
                        'AWS/EC2', 'CPUUtilization',
                        [{'Name': 'InstanceId', 'Value': instance_id}],
                        Statistics=['Average', 'Maximum']
                    )

                    if cpu_metrics:
                        avg_cpu = cpu_metrics['Average']
                        if avg_cpu < 20:  # Underutilized
                            opportunities.append({
                                'type': 'ec2_idle',
                                'resource_id': instance_id,
                                'current_cost': self._estimate_instance_cost(instance),
                                'potential_savings': self._estimate_instance_cost(instance) * 0.8,
                                'recommendation': 'Consider stopping or resizing underutilized instance'
                            })

        return opportunities

    def _check_ebs_optimization(self) -> List[Dict]:
        """Check for EBS optimization opportunities"""
        opportunities = []

        # Implementation for EBS optimization checks
        return opportunities

    def _check_s3_optimization(self) -> List[Dict]:
        """Check for S3 storage optimization opportunities"""
        opportunities = []

        # Implementation for S3 optimization checks
        return opportunities

    def _check_data_transfer_optimization(self) -> List[Dict]:
        """Check for data transfer cost optimization"""
        opportunities = []

        # Implementation for data transfer optimization
        return opportunities

    def _generate_recommendations(self, opportunities: List[Dict]) -> List[str]:
        """Generate actionable recommendations"""
        recommendations = []

        # Group opportunities by type
        opportunity_types = {}
        for opp in opportunities:
            opp_type = opp['type']
            if opp_type not in opportunity_types:
                opportunity_types[opp_type] = []
            opportunity_types[opp_type].append(opp)

        # Generate recommendations for each type
        for opp_type, opps in opportunity_types.items():
            if opp_type == 'ec2_idle':
                recommendations.append(f"Found {len(opps)} underutilized EC2 instances. Consider using AWS Instance Scheduler or spot instances.")

        return recommendations
```

### Storage Optimization Strategies

Data storage is often the largest cost component in data engineering:

```python
import boto3
from botocore.exceptions import ClientError
import pandas as pd
from datetime import datetime, timedelta
import json

class S3CostOptimizer:
    def __init__(self, bucket_name: str, region: str = 'us-east-1'):
        self.bucket_name = bucket_name
        self.region = region
        self.s3_client = boto3.client('s3', region_name=region)
        self.s3_resource = boto3.resource('s3', region_name=region)

    def analyze_storage_costs(self) -> Dict[str, Any]:
        """Analyze S3 storage costs and optimization opportunities"""

        # Get bucket objects
        objects = self._list_all_objects()

        # Analyze storage classes
        storage_analysis = self._analyze_storage_classes(objects)

        # Identify optimization opportunities
        opportunities = self._identify_storage_optimization(objects)

        # Calculate potential savings
        potential_savings = self._calculate_potential_savings(opportunities)

        return {
            'total_objects': len(objects),
            'total_size_gb': sum(obj['Size'] for obj in objects) / (1024**3),
            'storage_breakdown': storage_analysis,
            'optimization_opportunities': opportunities,
            'potential_savings': potential_savings
        }

    def _list_all_objects(self) -> List[Dict]:
        """List all objects in the bucket with metadata"""
        objects = []
        paginator = self.s3_client.get_paginator('list_objects_v2')

        for page in paginator.paginate(Bucket=self.bucket_name):
            for obj in page.get('Contents', []):
                # Get object metadata
                try:
                    metadata = self.s3_client.head_object(Bucket=self.bucket_name, Key=obj['Key'])
                    objects.append({
                        'Key': obj['Key'],
                        'Size': obj['Size'],
                        'LastModified': obj['LastModified'],
                        'StorageClass': metadata.get('StorageClass', 'STANDARD'),
                        'Tags': metadata.get('Metadata', {})
                    })
                except ClientError:
                    # Object might be deleted or inaccessible
                    continue

        return objects

    def _analyze_storage_classes(self, objects: List[Dict]) -> Dict[str, Any]:
        """Analyze distribution of storage classes"""
        storage_classes = {}
        total_size = 0

        for obj in objects:
            storage_class = obj['StorageClass']
            size = obj['Size']

            if storage_class not in storage_classes:
                storage_classes[storage_class] = {'count': 0, 'size_gb': 0}

            storage_classes[storage_class]['count'] += 1
            storage_classes[storage_class]['size_gb'] += size / (1024**3)
            total_size += size

        return {
            'classes': storage_classes,
            'total_size_gb': total_size / (1024**3)
        }

    def _identify_storage_optimization(self, objects: List[Dict]) -> List[Dict]:
        """Identify objects that can be optimized"""
        opportunities = []
        now = datetime.now()

        for obj in objects:
            last_modified = obj['LastModified']
            days_since_modified = (now - last_modified.replace(tzinfo=None)).days
            size_gb = obj['Size'] / (1024**3)
            storage_class = obj['StorageClass']

            # Intelligent Tiering recommendations
            if storage_class == 'STANDARD' and days_since_modified > 30:
                opportunities.append({
                    'type': 'intelligent_tiering',
                    'object_key': obj['Key'],
                    'current_class': storage_class,
                    'recommended_class': 'INTELLIGENT_TIERING',
                    'days_since_modified': days_since_modified,
                    'size_gb': size_gb,
                    'potential_savings': self._calculate_tiering_savings(size_gb, days_since_modified)
                })

            # Glacier recommendations for cold data
            elif storage_class in ['STANDARD', 'INTELLIGENT_TIERING'] and days_since_modified > 90:
                opportunities.append({
                    'type': 'glacier',
                    'object_key': obj['Key'],
                    'current_class': storage_class,
                    'recommended_class': 'GLACIER',
                    'days_since_modified': days_since_modified,
                    'size_gb': size_gb,
                    'potential_savings': self._calculate_glacier_savings(size_gb)
                })

        return opportunities

    def _calculate_tiering_savings(self, size_gb: float, days: int) -> float:
        """Calculate potential savings with Intelligent Tiering"""
        # Simplified calculation - in practice, use AWS pricing API
        standard_cost_per_gb = 0.023  # Standard storage cost
        intelligent_tiering_cost_per_gb = 0.023  # Similar base cost

        # Intelligent Tiering can save money for infrequently accessed data
        if days > 90:
            savings_percentage = 0.3  # 30% savings for cold data
        else:
            savings_percentage = 0.1  # 10% savings for warm data

        monthly_savings = size_gb * standard_cost_per_gb * savings_percentage
        return monthly_savings

    def _calculate_glacier_savings(self, size_gb: float) -> float:
        """Calculate potential savings with Glacier"""
        standard_cost_per_gb = 0.023
        glacier_cost_per_gb = 0.004  # Glacier storage cost

        monthly_savings = size_gb * (standard_cost_per_gb - glacier_cost_per_gb)
        return monthly_savings

    def implement_optimization(self, opportunities: List[Dict], dry_run: bool = True) -> Dict[str, Any]:
        """Implement storage optimization recommendations"""
        results = {'processed': 0, 'errors': 0, 'savings': 0}

        for opportunity in opportunities:
            try:
                if dry_run:
                    print(f"DRY RUN: Would change {opportunity['object_key']} from {opportunity['current_class']} to {opportunity['recommended_class']}")
                    results['processed'] += 1
                    results['savings'] += opportunity.get('potential_savings', 0)
                else:
                    # Implement the change
                    self._change_storage_class(
                        opportunity['object_key'],
                        opportunity['recommended_class']
                    )
                    results['processed'] += 1
                    results['savings'] += opportunity.get('potential_savings', 0)

            except Exception as e:
                print(f"Error processing {opportunity['object_key']}: {e}")
                results['errors'] += 1

        return results

    def _change_storage_class(self, key: str, new_class: str):
        """Change storage class of an object"""
        copy_source = {'Bucket': self.bucket_name, 'Key': key}

        self.s3_client.copy_object(
            CopySource=copy_source,
            Bucket=self.bucket_name,
            Key=key,
            StorageClass=new_class
        )

class DataLifecycleManager:
    """Manage data lifecycle policies for cost optimization"""

    def __init__(self, bucket_name: str):
        self.bucket_name = bucket_name
        self.s3_client = boto3.client('s3')

    def create_lifecycle_policy(self, rules: List[Dict]):
        """Create S3 lifecycle policy"""

        lifecycle_config = {
            'Rules': rules
        }

        self.s3_client.put_bucket_lifecycle_configuration(
            Bucket=self.bucket_name,
            LifecycleConfiguration=lifecycle_config
        )

    def create_data_engineering_lifecycle(self):
        """Create lifecycle policy optimized for data engineering"""

        rules = [
            # Move raw data to IA after 30 days
            {
                'ID': 'RawDataToIA',
                'Status': 'Enabled',
                'Prefix': 'raw/',
                'Transitions': [
                    {
                        'Days': 30,
                        'StorageClass': 'STANDARD_IA'
                    }
                ]
            },
            # Move processed data to Glacier after 90 days
            {
                'ID': 'ProcessedDataToGlacier',
                'Status': 'Enabled',
                'Prefix': 'processed/',
                'Transitions': [
                    {
                        'Days': 90,
                        'StorageClass': 'GLACIER'
                    }
                ]
            },
            # Delete temporary files after 7 days
            {
                'ID': 'DeleteTempFiles',
                'Status': 'Enabled',
                'Prefix': 'temp/',
                'Expiration': {
                    'Days': 7
                }
            },
            # Move old logs to Glacier after 365 days
            {
                'ID': 'LogsToGlacier',
                'Status': 'Enabled',
                'Prefix': 'logs/',
                'Transitions': [
                    {
                        'Days': 365,
                        'StorageClass': 'GLACIER'
                    }
                ]
            }
        ]

        self.create_lifecycle_policy(rules)

class RedshiftCostOptimizer:
    """Optimize Amazon Redshift costs"""

    def __init__(self, cluster_identifier: str, region: str = 'us-east-1'):
        self.cluster_identifier = cluster_identifier
        self.region = region
        self.redshift_client = boto3.client('redshift', region_name=region)
        self.cloudwatch = boto3.client('cloudwatch', region_name=region)

    def analyze_cluster_costs(self) -> Dict[str, Any]:
        """Analyze Redshift cluster costs and usage"""

        # Get cluster information
        cluster_info = self.redshift_client.describe_clusters(
            ClusterIdentifier=self.cluster_identifier
        )['Clusters'][0]

        # Get usage metrics
        usage_metrics = self._get_usage_metrics()

        # Analyze workload patterns
        workload_analysis = self._analyze_workload_patterns()

        # Identify optimization opportunities
        opportunities = self._identify_redshift_optimizations(cluster_info, usage_metrics)

        return {
            'cluster_info': cluster_info,
            'usage_metrics': usage_metrics,
            'workload_analysis': workload_analysis,
            'optimization_opportunities': opportunities
        }

    def _get_usage_metrics(self) -> Dict[str, Any]:
        """Get Redshift usage metrics from CloudWatch"""
        end_time = datetime.utcnow()
        start_time = end_time - timedelta(days=30)

        metrics = {}

        # CPU Utilization
        cpu_data = self._get_metric_data('CPUUtilization', start_time, end_time)
        metrics['cpu_utilization'] = {
            'average': sum(cpu_data) / len(cpu_data) if cpu_data else 0,
            'peak': max(cpu_data) if cpu_data else 0
        }

        # Database Connections
        connections_data = self._get_metric_data('DatabaseConnections', start_time, end_time)
        metrics['database_connections'] = {
            'average': sum(connections_data) / len(connections_data) if connections_data else 0,
            'peak': max(connections_data) if connections_data else 0
        }

        return metrics

    def _get_metric_data(self, metric_name: str, start_time: datetime, end_time: datetime) -> List[float]:
        """Get metric data from CloudWatch"""
        response = self.cloudwatch.get_metric_statistics(
            Namespace='AWS/Redshift',
            MetricName=metric_name,
            Dimensions=[
                {
                    'Name': 'ClusterIdentifier',
                    'Value': self.cluster_identifier
                }
            ],
            StartTime=start_time,
            EndTime=end_time,
            Period=3600,  # 1 hour
            Statistics=['Average']
        )

        return [datapoint['Average'] for datapoint in response['Datapoints']]

    def _analyze_workload_patterns(self) -> Dict[str, Any]:
        """Analyze workload patterns for optimization"""
        # This would analyze query patterns, peak usage times, etc.
        return {
            'peak_hours': [],  # Hours with high usage
            'idle_hours': [],  # Hours with low usage
            'query_patterns': {}  # Types of queries being run
        }

    def _identify_redshift_optimizations(self, cluster_info: Dict, usage_metrics: Dict) -> List[Dict]:
        """Identify Redshift optimization opportunities"""
        opportunities = []

        # Check for underutilized clusters
        avg_cpu = usage_metrics['cpu_utilization']['average']
        if avg_cpu < 30:
            opportunities.append({
                'type': 'underutilized_cluster',
                'description': f'Cluster CPU utilization is only {avg_cpu:.1f}%',
                'recommendation': 'Consider resizing to smaller instance type or using pause/resume',
                'potential_savings': self._estimate_resize_savings(cluster_info, 'smaller')
            })

        # Check for pause/resume opportunity
        if self._is_idle_during_off_hours(usage_metrics):
            opportunities.append({
                'type': 'pause_resume',
                'description': 'Cluster appears idle during off-hours',
                'recommendation': 'Implement automatic pause/resume schedule',
                'potential_savings': self._estimate_pause_savings(cluster_info)
            })

        return opportunities

    def _is_idle_during_off_hours(self, usage_metrics: Dict) -> bool:
        """Check if cluster is idle during off-hours"""
        # Simplified check - in practice, analyze hourly patterns
        avg_cpu = usage_metrics['cpu_utilization']['average']
        return avg_cpu < 10  # Very low utilization

    def _estimate_resize_savings(self, cluster_info: Dict, new_size: str) -> float:
        """Estimate savings from resizing cluster"""
        # Simplified calculation
        current_cost = self._get_cluster_cost(cluster_info)
        # Assume 50% savings for resizing to smaller instance
        return current_cost * 0.5

    def _estimate_pause_savings(self, cluster_info: Dict) -> float:
        """Estimate savings from pause/resume"""
        # Assume 16 hours per day of idle time
        daily_cost = self._get_cluster_cost(cluster_info)
        idle_hours_ratio = 16/24  # 16 hours idle per 24 hours
        return daily_cost * idle_hours_ratio * 30  # Monthly savings

    def _get_cluster_cost(self, cluster_info: Dict) -> float:
        """Get estimated cluster cost"""
        # Simplified - in practice, use AWS Pricing API
        node_type = cluster_info['NodeType']
        number_of_nodes = cluster_info['NumberOfNodes']

        # Rough cost estimates (would need to be updated)
        node_costs = {
            'dc2.large': 0.25,
            'dc2.8xlarge': 4.80,
            'ra3.xlplus': 1.086,
            'ra3.4xlarge': 3.26,
            'ra3.16xlarge': 13.04
        }

        hourly_cost = node_costs.get(node_type, 1.0) * number_of_nodes
        monthly_cost = hourly_cost * 24 * 30

        return monthly_cost

    def implement_pause_resume(self, schedule: Dict):
        """Implement automatic pause/resume schedule"""

        # Create CloudWatch Events rules for scheduling
        events_client = boto3.client('events')

        # Pause rule
        pause_rule = {
            'Name': f'{self.cluster_identifier}-pause',
            'ScheduleExpression': schedule['pause_schedule'],  # e.g., 'cron(0 2 * * ? *)' - 2 AM daily
            'State': 'ENABLED'
        }

        events_client.put_rule(**pause_rule)

        # Resume rule
        resume_rule = {
            'Name': f'{self.cluster_identifier}-resume',
            'ScheduleExpression': schedule['resume_schedule'],  # e.g., 'cron(0 6 * * ? *)' - 6 AM daily
            'State': 'ENABLED'
        }

        events_client.put_rule(**resume_rule)

        # Add Lambda targets for pause/resume actions
        # Implementation would add Lambda functions to handle pause/resume
```

### Compute Optimization Strategies

Optimizing compute resources is crucial for data processing workloads:

```python
import boto3
from datetime import datetime, timedelta
import pandas as pd

class EC2CostOptimizer:
    def __init__(self, region: str = 'us-east-1'):
        self.region = region
        self.ec2_client = boto3.client('ec2', region_name=region)
        self.cloudwatch = boto3.client('cloudwatch', region_name=region)

    def analyze_instances(self) -> Dict[str, Any]:
        """Analyze EC2 instances for cost optimization"""

        instances = self._get_running_instances()
        analysis_results = []

        for instance in instances:
            instance_id = instance['InstanceId']
            instance_type = instance['InstanceType']

            # Get utilization metrics
            metrics = self._get_instance_metrics(instance_id)

            # Analyze instance
            instance_analysis = self._analyze_instance(instance, metrics)
            analysis_results.append(instance_analysis)

        # Group by optimization type
        optimization_groups = self._group_optimizations(analysis_results)

        return {
            'instances_analyzed': len(analysis_results),
            'optimization_opportunities': optimization_groups,
            'total_potential_savings': sum opp.get('potential_savings', 0) for opp in analysis_results if 'potential_savings' in opp
        }

    def _get_running_instances(self) -> List[Dict]:
        """Get all running EC2 instances"""
        response = self.ec2_client.describe_instances(
            Filters=[
                {'Name': 'instance-state-name', 'Values': ['running']}
            ]
        )

        instances = []
        for reservation in response['Reservations']:
            instances.extend(reservation['Instances'])

        return instances

    def _get_instance_metrics(self, instance_id: str) -> Dict[str, Any]:
        """Get CloudWatch metrics for an instance"""
        end_time = datetime.utcnow()
        start_time = end_time - timedelta(days=7)

        metrics = {}

        # CPU Utilization
        cpu_data = self._get_metric_statistics(
            'AWS/EC2', 'CPUUtilization',
            [{'Name': 'InstanceId', 'Value': instance_id}],
            start_time, end_time
        )
        metrics['cpu'] = self._analyze_metric_data(cpu_data)

        # Network I/O
        network_in = self._get_metric_statistics(
            'AWS/EC2', 'NetworkIn',
            [{'Name': 'InstanceId', 'Value': instance_id}],
            start_time, end_time
        )
        metrics['network_in'] = self._analyze_metric_data(network_in)

        return metrics

    def _get_metric_statistics(self, namespace: str, metric_name: str,
                             dimensions: List[Dict], start_time: datetime,
                             end_time: datetime) -> List[Dict]:
        """Get metric statistics from CloudWatch"""
        response = self.cloudwatch.get_metric_statistics(
            Namespace=namespace,
            MetricName=metric_name,
            Dimensions=dimensions,
            StartTime=start_time,
            EndTime=end_time,
            Period=3600,  # 1 hour
            Statistics=['Average', 'Maximum', 'Minimum']
        )

        return response['Datapoints']

    def _analyze_metric_data(self, datapoints: List[Dict]) -> Dict[str, float]:
        """Analyze metric datapoints"""
        if not datapoints:
            return {'average': 0, 'maximum': 0, 'minimum': 0}

        averages = [dp['Average'] for dp in datapoints]
        maximums = [dp['Maximum'] for dp in datapoints]
        minimums = [dp['Minimum'] for dp in datapoints]

        return {
            'average': sum(averages) / len(averages),
            'maximum': max(maximums),
            'minimum': min(minimums)
        }

    def _analyze_instance(self, instance: Dict, metrics: Dict) -> Dict[str, Any]:
        """Analyze individual instance for optimization"""
        instance_id = instance['InstanceId']
        instance_type = instance['InstanceType']
        avg_cpu = metrics['cpu']['average']

        analysis = {
            'instance_id': instance_id,
            'instance_type': instance_type,
            'avg_cpu': avg_cpu,
            'recommendations': []
        }

        # Check for underutilization
        if avg_cpu < 20:
            analysis['recommendations'].append({
                'type': 'underutilized',
                'description': f'CPU utilization is only {avg_cpu:.1f}%',
                'action': 'Consider stopping, resizing, or using spot instances',
                'potential_savings': self._estimate_instance_savings(instance, 'stop')
            })

        # Check for consistent high utilization
        elif avg_cpu > 80:
            analysis['recommendations'].append({
                'type': 'overutilized',
                'description': f'CPU utilization is consistently high at {avg_cpu:.1f}%',
                'action': 'Consider resizing to larger instance type',
                'potential_savings': 0  # Might increase costs
            })

        return analysis

    def _estimate_instance_savings(self, instance: Dict, action: str) -> float:
        """Estimate potential savings for instance optimization"""
        instance_type = instance['InstanceType']

        # Simplified cost calculation
        instance_costs = {
            't3.micro': 0.0104,
            't3.small': 0.0208,
            't3.medium': 0.0416,
            'm5.large': 0.096,
            'm5.xlarge': 0.192,
            'c5.xlarge': 0.170,
        }

        current_cost = instance_costs.get(instance_type, 0.1)

        if action == 'stop':
            return current_cost * 24 * 30  # Monthly savings if stopped
        elif action == 'resize_down':
            return current_cost * 0.5  # Assume 50% savings

        return 0

    def _group_optimizations(self, analysis_results: List[Dict]) -> Dict[str, List]:
        """Group optimization opportunities by type"""
        groups = {
            'underutilized': [],
            'overutilized': [],
            'idle': []
        }

        for result in analysis_results:
            for recommendation in result['recommendations']:
                rec_type = recommendation['type']
                if rec_type in groups:
                    groups[rec_type].append({
                        'instance_id': result['instance_id'],
                        'instance_type': result['instance_type'],
                        'details': recommendation
                    })

        return groups

class SpotInstanceManager:
    """Manage EC2 Spot Instances for cost optimization"""

    def __init__(self, region: str = 'us-east-1'):
        self.region = region
        self.ec2_client = boto3.client('ec2', region_name=region)

    def analyze_spot_suitability(self, instance_types: List[str]) -> Dict[str, Any]:
        """Analyze which workloads are suitable for spot instances"""

        spot_prices = self._get_spot_prices(instance_types)
        on_demand_prices = self._get_on_demand_prices(instance_types)

        analysis = {}

        for instance_type in instance_types:
            spot_price = spot_prices.get(instance_type, 0)
            on_demand_price = on_demand_prices.get(instance_type, 0)

            if on_demand_price > 0:
                savings_percentage = (1 - spot_price / on_demand_price) * 100
                analysis[instance_type] = {
                    'spot_price': spot_price,
                    'on_demand_price': on_demand_price,
                    'savings_percentage': savings_percentage,
                    'recommended': savings_percentage > 50  # Recommend if >50% savings
                }

        return analysis

    def _get_spot_prices(self, instance_types: List[str]) -> Dict[str, float]:
        """Get current spot prices"""
        prices = {}

        for instance_type in instance_types:
            response = self.ec2_client.describe_spot_price_history(
                InstanceTypes=[instance_type],
                MaxResults=1,
                ProductDescriptions=['Linux/UNIX']
            )

            if response['SpotPriceHistory']:
                prices[instance_type] = float(response['SpotPriceHistory'][0]['SpotPrice'])

        return prices

    def _get_on_demand_prices(self, instance_types: List[str]) -> Dict[str, float]:
        """Get on-demand prices"""
        # In practice, use AWS Pricing API
        # Simplified mock prices
        prices = {
            't3.micro': 0.0104,
            't3.small': 0.0208,
            'm5.large': 0.096,
            'c5.xlarge': 0.170
        }

        return {it: prices.get(it, 0.1) for it in instance_types}

    def create_spot_fleet_request(self, config: Dict) -> str:
        """Create a spot fleet request"""

        spot_fleet_config = {
            'IamFleetRole': config['iam_fleet_role'],
            'AllocationStrategy': 'lowestPrice',
            'TargetCapacity': config['target_capacity'],
            'SpotPrice': str(config['max_spot_price']),
            'LaunchSpecifications': config['launch_specifications']
        }

        response = self.ec2_client.request_spot_fleet(
            SpotFleetRequestConfig=spot_fleet_config
        )

        return response['SpotFleetRequestId']

class EMRCostOptimizer:
    """Optimize Amazon EMR costs for data processing"""

    def __init__(self, region: str = 'us-east-1'):
        self.region = region
        self.emr_client = boto3.client('emr', region_name=region)

    def analyze_clusters(self) -> Dict[str, Any]:
        """Analyze EMR clusters for cost optimization"""

        clusters = self.emr_client.list_clusters(
            ClusterStates=['RUNNING', 'WAITING']
        )

        analysis_results = []

        for cluster_summary in clusters['Clusters']:
            cluster_id = cluster_summary['Id']
            cluster_details = self.emr_client.describe_cluster(
                ClusterId=cluster_id
            )['Cluster']

            # Analyze cluster utilization
            cluster_analysis = self._analyze_cluster(cluster_details)
            analysis_results.append(cluster_analysis)

        return {
            'clusters_analyzed': len(analysis_results),
            'optimization_opportunities': analysis_results
        }

    def _analyze_cluster(self, cluster_details: Dict) -> Dict[str, Any]:
        """Analyze individual EMR cluster"""
        cluster_id = cluster_details['Id']
        cluster_name = cluster_details['Name']
        instance_groups = cluster_details.get('InstanceGroups', [])

        analysis = {
            'cluster_id': cluster_id,
            'cluster_name': cluster_name,
            'recommendations': []
        }

        # Check instance types and counts
        for ig in instance_groups:
            instance_type = ig['InstanceType']
            instance_count = ig['RunningInstanceCount']

            # Check for over-provisioning
            if instance_count > 10:  # Arbitrary threshold
                analysis['recommendations'].append({
                    'type': 'instance_count',
                    'description': f'Large instance group with {instance_count} instances',
                    'action': 'Consider using fewer, larger instances or auto-scaling'
                })

        # Check for idle clusters
        if self._is_cluster_idle(cluster_id):
            analysis['recommendations'].append({
                'type': 'idle_cluster',
                'description': 'Cluster appears to be idle',
                'action': 'Consider terminating or using auto-termination'
            })

        return analysis

    def _is_cluster_idle(self, cluster_id: str) -> bool:
        """Check if cluster is idle"""
        # Simplified check - in practice, monitor job execution
        return False

    def implement_auto_termination(self, cluster_id: str, idle_timeout: int = 60):
        """Implement auto-termination for idle clusters"""

        self.emr_client.put_auto_termination_policy(
            ClusterId=cluster_id,
            AutoTerminationPolicy={
                'IdleTimeout': idle_timeout  # minutes
            }
        )

class LambdaCostOptimizer:
    """Optimize AWS Lambda costs"""

    def __init__(self, region: str = 'us-east-1'):
        self.region = region
        self.lambda_client = boto3.client('lambda', region_name=region)
        self.cloudwatch = boto3.client('cloudwatch', region_name=region)

    def analyze_functions(self) -> Dict[str, Any]:
        """Analyze Lambda functions for cost optimization"""

        functions = self.lambda_client.list_functions()['Functions']
        analysis_results = []

        for function in functions:
            function_name = function['FunctionName']

            # Get invocation metrics
            metrics = self._get_function_metrics(function_name)

            # Analyze function
            function_analysis = self._analyze_function(function, metrics)
            analysis_results.append(function_analysis)

        return {
            'functions_analyzed': len(analysis_results),
            'optimization_opportunities': analysis_results
        }

    def _get_function_metrics(self, function_name: str) -> Dict[str, Any]:
        """Get CloudWatch metrics for Lambda function"""
        end_time = datetime.utcnow()
        start_time = end_time - timedelta(days=30)

        # Invocations
        invocations = self._get_metric_sum('Invocations', function_name, start_time, end_time)

        # Duration
        duration = self._get_metric_average('Duration', function_name, start_time, end_time)

        # Errors
        errors = self._get_metric_sum('Errors', function_name, start_time, end_time)

        return {
            'invocations': invocations,
            'avg_duration': duration,
            'errors': errors,
            'error_rate': errors / invocations if invocations > 0 else 0
        }

    def _get_metric_sum(self, metric_name: str, function_name: str,
                       start_time: datetime, end_time: datetime) -> float:
        """Get sum of metric over time period"""
        response = self.cloudwatch.get_metric_statistics(
            Namespace='AWS/Lambda',
            MetricName=metric_name,
            Dimensions=[
                {'Name': 'FunctionName', 'Value': function_name}
            ],
            StartTime=start_time,
            EndTime=end_time,
            Period=86400,  # 1 day
            Statistics=['Sum']
        )

        return sum(dp['Sum'] for dp in response['Datapoints'])

    def _get_metric_average(self, metric_name: str, function_name: str,
                          start_time: datetime, end_time: datetime) -> float:
        """Get average of metric over time period"""
        response = self.cloudwatch.get_metric_statistics(
            Namespace='AWS/Lambda',
            MetricName=metric_name,
            Dimensions=[
                {'Name': 'FunctionName', 'Value': function_name}
            ],
            StartTime=start_time,
            EndTime=end_time,
            Period=86400,  # 1 day
            Statistics=['Average']
        )

        if response['Datapoints']:
            return sum(dp['Average'] for dp in response['Datapoints']) / len(response['Datapoints'])

        return 0

    def _analyze_function(self, function: Dict, metrics: Dict) -> Dict[str, Any]:
        """Analyze Lambda function for optimization"""
        function_name = function['FunctionName']
        memory_size = function['MemorySize']
        timeout = function['Timeout']

        analysis = {
            'function_name': function_name,
            'memory_size': memory_size,
            'timeout': timeout,
            'metrics': metrics,
            'recommendations': []
        }

        # Check memory optimization
        if metrics['avg_duration'] > 0:
            # Estimate optimal memory size
            optimal_memory = self._estimate_optimal_memory(metrics['avg_duration'], memory_size)
            if abs(optimal_memory - memory_size) / memory_size > 0.2:  # 20% difference
                analysis['recommendations'].append({
                    'type': 'memory_optimization',
                    'description': f'Current memory: {memory_size}MB, Recommended: {optimal_memory}MB',
                    'action': f'Adjust memory to {optimal_memory}MB for cost optimization'
                })

        # Check for underutilization
        if metrics['invocations'] < 100:  # Arbitrary threshold
            analysis['recommendations'].append({
                'type': 'low_utilization',
                'description': f'Only {metrics["invocations"]} invocations in 30 days',
                'action': 'Consider removing unused function or optimizing invocation pattern'
            })

        return analysis

    def _estimate_optimal_memory(self, avg_duration: float, current_memory: int) -> int:
        """Estimate optimal memory size based on duration"""
        # Simplified calculation - in practice, use more sophisticated analysis
        # Lower memory = higher duration = higher cost per GB-second
        # Higher memory = lower duration = lower cost per GB-second

        # Common memory sizes
        memory_options = [128, 256, 512, 1024, 2048, 3008]

        # Estimate cost efficiency
        current_cost_efficiency = current_memory / avg_duration  # Higher is better

        # Find optimal memory
        optimal_memory = current_memory
        for memory in memory_options:
            # Assume duration scales with memory (simplified)
            estimated_duration = avg_duration * (current_memory / memory) ** 0.8
            cost_efficiency = memory / estimated_duration

            if cost_efficiency > current_cost_efficiency:
                optimal_memory = memory

        return optimal_memory
```

### Data Transfer and Networking Optimization

Optimizing data transfer costs is crucial for data engineering:

```python
class DataTransferOptimizer:
    def __init__(self, region: str = 'us-east-1'):
        self.region = region
        self.cost_explorer = boto3.client('ce', region_name=region)

    def analyze_data_transfer_costs(self) -> Dict[str, Any]:
        """Analyze data transfer costs and identify optimization opportunities"""

        # Get data transfer costs
        transfer_costs = self._get_data_transfer_costs()

        # Analyze transfer patterns
        transfer_analysis = self._analyze_transfer_patterns(transfer_costs)

        # Identify optimization opportunities
        opportunities = self._identify_transfer_optimizations(transfer_analysis)

        return {
            'transfer_costs': transfer_costs,
            'analysis': transfer_analysis,
            'optimization_opportunities': opportunities
        }

    def _get_data_transfer_costs(self) -> Dict[str, Any]:
        """Get data transfer costs from Cost Explorer"""
        end_date = datetime.now()
        start_date = end_date - timedelta(days=30)

        response = self.cost_explorer.get_cost_and_usage(
            TimePeriod={
                'Start': start_date.strftime('%Y-%m-%d'),
                'End': end_date.strftime('%Y-%m-%d')
            },
            Granularity='MONTHLY',
            Metrics=['BlendedCost'],
            GroupBy=[
                {'Type': 'DIMENSION', 'Key': 'USAGE_TYPE'}
            ],
            Filter={
                'Dimensions': {
                    'Key': 'USAGE_TYPE_GROUP',
                    'Values': ['EC2: Data Transfer', 'S3: Data Transfer', 'RDS: Data Transfer']
                }
            }
        )

        return response

    def _analyze_transfer_patterns(self, transfer_costs: Dict) -> Dict[str, Any]:
        """Analyze data transfer patterns"""
        # Implementation would analyze transfer volumes, destinations, etc.
        return {
            'total_transfer_cost': 0,
            'cross_region_transfers': [],
            'internet_transfers': [],
            'patterns': {}
        }

    def _identify_transfer_optimizations(self, analysis: Dict) -> List[Dict]:
        """Identify data transfer optimization opportunities"""
        opportunities = []

        # Check for cross-region transfers
        # Check for internet transfers that could use CloudFront
        # Check for large data transfers that could use Snowball

        return opportunities

class VPCOptimizer:
    """Optimize VPC and networking costs"""

    def __init__(self, region: str = 'us-east-1'):
        self.region = region
        self.ec2_client = boto3.client('ec2', region_name=region)

    def analyze_vpc_costs(self) -> Dict[str, Any]:
        """Analyze VPC-related costs"""

        # Get VPC endpoints
        vpc_endpoints = self.ec2_client.describe_vpc_endpoints()

        # Analyze endpoint usage
        endpoint_analysis = self._analyze_vpc_endpoints(vpc_endpoints)

        # Check for NAT Gateway optimization
        nat_gateway_analysis = self._analyze_nat_gateways()

        return {
            'vpc_endpoints': endpoint_analysis,
            'nat_gateways': nat_gateway_analysis,
            'recommendations': []
        }

    def _analyze_vpc_endpoints(self, vpc_endpoints: Dict) -> Dict[str, Any]:
        """Analyze VPC endpoint usage"""
        # Implementation would check endpoint utilization
        return {}

    def _analyze_nat_gateways(self) -> Dict[str, Any]:
        """Analyze NAT Gateway usage and costs"""
        # Implementation would check NAT Gateway utilization
        return {}

class CostMonitoringDashboard:
    """Create cost monitoring dashboard"""

    def __init__(self, region: str = 'us-east-1'):
        self.region = region
        self.cloudwatch = boto3.client('cloudwatch', region_name=region)

    def create_cost_dashboard(self, dashboard_name: str):
        """Create CloudWatch dashboard for cost monitoring"""

        dashboard_body = {
            "widgets": [
                {
                    "type": "metric",
                    "x": 0,
                    "y": 0,
                    "width": 12,
                    "height": 6,
                    "properties": {
                        "metrics": [
                            ["AWS/Billing", "EstimatedCharges", "Currency", "USD"]
                        ],
                        "view": "timeSeries",
                        "stacked": False,
                        "region": self.region,
                        "title": "AWS Estimated Charges",
                        "period": 21600
                    }
                },
                {
                    "type": "metric",
                    "x": 12,
                    "y": 0,
                    "width": 12,
                    "height": 6,
                    "properties": {
                        "metrics": [
                            ["AWS/S3", "BucketSizeBytes", "BucketName", "my-data-bucket", "StorageType", "StandardStorage"]
                        ],
                        "view": "timeSeries",
                        "stacked": False,
                        "region": self.region,
                        "title": "S3 Storage Usage",
                        "period": 86400
                    }
                }
            ]
        }

        self.cloudwatch.put_dashboard(
            DashboardName=dashboard_name,
            DashboardBody=json.dumps(dashboard_body)
        )

class CostAlertSystem:
    """Create cost alerting system"""

    def __init__(self, region: str = 'us-east-1'):
        self.region = region
        self.cloudwatch = boto3.client('cloudwatch', region_name=region)

    def create_cost_alarms(self):
        """Create CloudWatch alarms for cost monitoring"""

        # Monthly cost alarm
        self.cloudwatch.put_metric_alarm(
            AlarmName='MonthlyCostAlarm',
            AlarmDescription='Alarm when monthly AWS charges exceed threshold',
            ActionsEnabled=True,
            AlarmActions=[],  # Add SNS topic ARN
            MetricName='EstimatedCharges',
            Namespace='AWS/Billing',
            Statistic='Maximum',
            Dimensions=[
                {
                    'Name': 'Currency',
                    'Value': 'USD'
                }
            ],
            Period=21600,  # 6 hours
            EvaluationPeriods=1,
            Threshold=1000.0,  # $1000 threshold
            ComparisonOperator='GreaterThanThreshold'
        )

        # Daily cost anomaly alarm
        # Implementation for anomaly detection alarms
```

### Conclusion

AWS cost optimization for data engineering requires a comprehensive approach that addresses storage, compute, data transfer, and monitoring. The strategies and tools presented above provide a solid foundation for implementing cost-effective data engineering solutions on AWS.

Key takeaways:
- **Storage optimization**: Use appropriate S3 storage classes and lifecycle policies
- **Compute optimization**: Right-size instances, use spot instances, and implement auto-scaling
- **Data transfer optimization**: Minimize cross-region transfers and use VPC endpoints
- **Monitoring and alerting**: Implement comprehensive cost monitoring and alerting
- **Continuous optimization**: Regularly review and adjust resources based on usage patterns

By implementing these strategies, organizations can significantly reduce their AWS costs while maintaining the performance and reliability required for data engineering workloads. Remember that cost optimization is an ongoing process that requires regular monitoring and adjustment as workloads evolve.