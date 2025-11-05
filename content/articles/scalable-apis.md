---
title: "Building Scalable APIs: From Monolith to Microservices"
date: "2024-03-05"
author: "Jose Acosta"
excerpt: "A comprehensive guide to designing and scaling APIs, from monolithic architectures to microservices, with practical implementation examples."
image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&crop=center"
---

## Building Scalable APIs: From Monolith to Microservices

As applications grow in complexity and user base, the architecture that once served a few hundred users may struggle to handle thousands or millions. This article explores the journey from monolithic APIs to scalable microservices architectures, with practical implementation examples and best practices.

### Understanding API Scaling Challenges

Before diving into solutions, let's understand the common scaling challenges:

```python
from dataclasses import dataclass
from typing import Dict, List, Optional, Any
from datetime import datetime
import asyncio
import logging
from enum import Enum

logger = logging.getLogger(__name__)

class ScalingChallenge(Enum):
    PERFORMANCE = "performance"
    RELIABILITY = "reliability"
    MAINTAINABILITY = "maintainability"
    DEPLOYMENT = "deployment"
    RESOURCE_UTILIZATION = "resource_utilization"

@dataclass
class APIMetrics:
    """Comprehensive API performance metrics"""
    endpoint: str
    timestamp: datetime
    request_count: int
    response_time_avg: float
    response_time_p95: float
    response_time_p99: float
    error_rate: float
    throughput_rps: float
    active_connections: int
    memory_usage_mb: float
    cpu_usage_percent: float

    @property
    def is_healthy(self) -> bool:
        """Check if API metrics indicate healthy performance"""
        return (
            self.error_rate < 0.05 and  # < 5% errors
            self.response_time_p95 < 1000 and  # < 1s p95 response time
            self.cpu_usage_percent < 80  # < 80% CPU usage
        )

class APIScalingAnalyzer:
    def __init__(self):
        self.metrics_history = []
        self.scaling_thresholds = {
            'cpu_threshold': 70.0,
            'memory_threshold': 80.0,
            'response_time_threshold': 500.0,  # ms
            'error_rate_threshold': 0.05,
            'concurrent_requests_threshold': 1000
        }

    def analyze_scaling_needs(self, current_metrics: APIMetrics) -> Dict[str, Any]:
        """Analyze current metrics to determine scaling needs"""

        scaling_recommendations = {
            'scale_up': False,
            'scale_out': False,
            'optimize': False,
            'reasons': [],
            'urgency': 'low'  # low, medium, high
        }

        # Check CPU usage
        if current_metrics.cpu_usage_percent > self.scaling_thresholds['cpu_threshold']:
            scaling_recommendations['scale_up'] = True
            scaling_recommendations['reasons'].append(f"High CPU usage: {current_metrics.cpu_usage_percent}%")
            scaling_recommendations['urgency'] = 'high'

        # Check memory usage
        if current_metrics.memory_usage_mb > self.scaling_thresholds['memory_threshold']:
            scaling_recommendations['scale_up'] = True
            scaling_recommendations['reasons'].append(f"High memory usage: {current_metrics.memory_usage_mb}MB")
            scaling_recommendations['urgency'] = 'high'

        # Check response time
        if current_metrics.response_time_p95 > self.scaling_thresholds['response_time_threshold']:
            scaling_recommendations['scale_out'] = True
            scaling_recommendations['reasons'].append(f"High response time: {current_metrics.response_time_p95}ms")
            if scaling_recommendations['urgency'] == 'low':
                scaling_recommendations['urgency'] = 'medium'

        # Check error rate
        if current_metrics.error_rate > self.scaling_thresholds['error_rate_threshold']:
            scaling_recommendations['optimize'] = True
            scaling_recommendations['reasons'].append(f"High error rate: {current_metrics.error_rate}")
            scaling_recommendations['urgency'] = 'high'

        # Check concurrent connections
        if current_metrics.active_connections > self.scaling_thresholds['concurrent_requests_threshold']:
            scaling_recommendations['scale_out'] = True
            scaling_recommendations['reasons'].append(f"High concurrent connections: {current_metrics.active_connections}")
            if scaling_recommendations['urgency'] == 'low':
                scaling_recommendations['urgency'] = 'medium'

        # Historical analysis
        if len(self.metrics_history) > 10:
            trend_analysis = self._analyze_trends()
            if trend_analysis['upward_trend']:
                scaling_recommendations['scale_out'] = True
                scaling_recommendations['reasons'].append("Upward usage trend detected")

        self.metrics_history.append(current_metrics)

        return scaling_recommendations

    def _analyze_trends(self) -> Dict[str, Any]:
        """Analyze historical trends in metrics"""
        recent_metrics = self.metrics_history[-10:]

        # Check for upward trends
        cpu_trend = self._calculate_trend([m.cpu_usage_percent for m in recent_metrics])
        memory_trend = self._calculate_trend([m.memory_usage_mb for m in recent_metrics])
        response_time_trend = self._calculate_trend([m.response_time_p95 for m in recent_metrics])

        return {
            'upward_trend': cpu_trend > 0.1 or memory_trend > 0.1 or response_time_trend > 0.1,
            'cpu_trend': cpu_trend,
            'memory_trend': memory_trend,
            'response_time_trend': response_time_trend
        }

    def _calculate_trend(self, values: List[float]) -> float:
        """Calculate linear trend slope"""
        if len(values) < 2:
            return 0

        x = list(range(len(values)))
        slope = np.polyfit(x, values, 1)[0]
        return slope
```

### Monolithic API Architecture

Let's start with a typical monolithic API structure and identify its limitations:

```python
from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import uvicorn
import redis
import os

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/db")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Redis setup
redis_client = redis.Redis(host='localhost', port=6379, db=0)

class MonolithicAPI:
    def __init__(self):
        self.app = FastAPI(title="Monolithic E-commerce API")
        self._setup_routes()
        self._setup_database()

    def _setup_database(self):
        """Setup database tables"""
        Base.metadata.create_all(bind=engine)

    def _setup_routes(self):
        """Setup all API routes in one place"""

        @self.app.get("/health")
        async def health_check():
            return {"status": "healthy"}

        @self.app.get("/products")
        async def get_products(db: Session = Depends(self.get_db)):
            """Get all products - business logic, data access, and API concerns mixed"""
            try:
                # Business logic mixed with data access
                products = db.query(Product).all()

                # Caching logic mixed in
                cache_key = "products:all"
                cached = redis_client.get(cache_key)
                if cached:
                    return json.loads(cached)

                # Serialization mixed in
                result = [{"id": p.id, "name": p.name, "price": p.price} for p in products]

                # Cache the result
                redis_client.setex(cache_key, 300, json.dumps(result))

                return result

            except Exception as e:
                # Error handling mixed in
                logger.error(f"Error fetching products: {e}")
                raise HTTPException(status_code=500, detail="Internal server error")

        @self.app.post("/orders")
        async def create_order(order_data: dict, db: Session = Depends(self.get_db)):
            """Create order - multiple concerns in one function"""
            try:
                # Input validation
                if not order_data.get('product_id') or not order_data.get('quantity'):
                    raise HTTPException(status_code=400, detail="Missing required fields")

                # Business logic
                product = db.query(Product).filter(Product.id == order_data['product_id']).first()
                if not product:
                    raise HTTPException(status_code=404, detail="Product not found")

                if product.stock < order_data['quantity']:
                    raise HTTPException(status_code=400, detail="Insufficient stock")

                # Calculate total
                total = product.price * order_data['quantity']

                # Data persistence
                order = Order(
                    product_id=order_data['product_id'],
                    quantity=order_data['quantity'],
                    total=total,
                    status="pending"
                )
                db.add(order)
                db.commit()

                # Update product stock
                product.stock -= order_data['quantity']
                db.commit()

                # Send notification (mixed concern)
                self._send_order_notification(order)

                # Cache invalidation (mixed concern)
                redis_client.delete("products:all")

                return {"order_id": order.id, "status": "created"}

            except Exception as e:
                db.rollback()
                logger.error(f"Error creating order: {e}")
                raise HTTPException(status_code=500, detail="Internal server error")

        @self.app.get("/analytics/sales")
        async def get_sales_analytics(db: Session = Depends(self.get_db)):
            """Analytics - heavy computation mixed with API"""
            try:
                # Complex analytics query mixed in API endpoint
                result = db.execute("""
                    SELECT
                        DATE_TRUNC('day', created_at) as date,
                        SUM(total) as daily_sales,
                        COUNT(*) as order_count
                    FROM orders
                    WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
                    GROUP BY DATE_TRUNC('day', created_at)
                    ORDER BY date DESC
                """).fetchall()

                # Data processing mixed in
                analytics = {
                    "total_sales": sum(row[1] for row in result),
                    "total_orders": sum(row[2] for row in result),
                    "daily_breakdown": [
                        {"date": row[0].isoformat(), "sales": row[1], "orders": row[2]}
                        for row in result
                    ]
                }

                return analytics

            except Exception as e:
                logger.error(f"Error fetching analytics: {e}")
                raise HTTPException(status_code=500, detail="Internal server error")

    def get_db(self):
        """Database dependency - mixed with API logic"""
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()

    def _send_order_notification(self, order):
        """Notification logic mixed in API class"""
        # Email sending logic here
        pass

# Database models mixed in same file
class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    price = Column(Integer)
    stock = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer)
    quantity = Column(Integer)
    total = Column(Integer)
    status = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

# Problems with monolithic architecture:
# 1. All concerns mixed together (API, business logic, data access, caching)
# 2. Single point of failure
# 3. Difficult to scale individual components
# 4. Tight coupling between features
# 5. Large codebase hard to maintain
# 6. Technology lock-in
```

### Microservices Architecture Design

Now let's design a microservices architecture that addresses these issues:

```python
from abc import ABC, abstractmethod
import json
from typing import Protocol
import aiohttp
from fastapi import Request, Response
import consul  # Service discovery

class ServiceClient(Protocol):
    """Protocol for service communication"""
    async def call_service(self, service_name: str, endpoint: str, method: str = "GET", data: dict = None) -> dict:
        ...

class ConsulServiceDiscovery:
    def __init__(self, consul_host: str = "localhost", consul_port: int = 8500):
        self.consul = consul.Consul(host=consul_host, port=consul_port)

    def get_service_address(self, service_name: str) -> tuple:
        """Get service address from Consul"""
        services = self.consul.catalog.service(service_name)
        if not services:
            raise ValueError(f"Service {service_name} not found")

        service = services[0]
        return service['Address'], service['Port']

class HTTPServiceClient:
    def __init__(self, service_discovery: ConsulServiceDiscovery):
        self.service_discovery = service_discovery
        self.session = None

    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()

    async def call_service(self, service_name: str, endpoint: str,
                          method: str = "GET", data: dict = None) -> dict:
        """Call a microservice via HTTP"""
        try:
            host, port = self.service_discovery.get_service_address(service_name)
            url = f"http://{host}:{port}{endpoint}"

            async with self.session.request(method, url, json=data) as response:
                if response.status == 200:
                    return await response.json()
                else:
                    error_text = await response.text()
                    raise Exception(f"Service call failed: {response.status} - {error_text}")

        except Exception as e:
            logger.error(f"Error calling service {service_name}: {e}")
            raise

class AbstractService(ABC):
    """Abstract base class for microservices"""

    def __init__(self, service_name: str, port: int):
        self.service_name = service_name
        self.port = port
        self.app = FastAPI(title=service_name)
        self._setup_routes()
        self._setup_health_check()

    @abstractmethod
    def _setup_routes(self):
        """Setup service-specific routes"""
        pass

    def _setup_health_check(self):
        """Setup health check endpoint"""
        @self.app.get("/health")
        async def health_check():
            return {
                "service": self.service_name,
                "status": "healthy",
                "timestamp": datetime.utcnow().isoformat()
            }

    def start_service(self):
        """Start the service"""
        uvicorn.run(self.app, host="0.0.0.0", port=self.port)

class ProductService(AbstractService):
    """Product management microservice"""

    def __init__(self, port: int = 8001):
        super().__init__("product-service", port)
        self._setup_database()

    def _setup_database(self):
        """Setup product database"""
        # Product-specific database setup
        pass

    def _setup_routes(self):
        @self.app.get("/products")
        async def get_products():
            """Get all products - focused only on product concerns"""
            try:
                # Only product-related logic
                products = await self._get_products_from_db()
                return products
            except Exception as e:
                logger.error(f"Error in product service: {e}")
                raise HTTPException(status_code=500, detail="Product service error")

        @self.app.get("/products/{product_id}")
        async def get_product(product_id: int):
            """Get single product"""
            product = await self._get_product_from_db(product_id)
            if not product:
                raise HTTPException(status_code=404, detail="Product not found")
            return product

        @self.app.put("/products/{product_id}/stock")
        async def update_stock(product_id: int, stock_update: dict):
            """Update product stock - called by order service"""
            try:
                await self._update_product_stock(product_id, stock_update['quantity'])
                return {"status": "updated"}
            except Exception as e:
                logger.error(f"Error updating stock: {e}")
                raise HTTPException(status_code=500, detail="Stock update failed")

    async def _get_products_from_db(self):
        """Product-specific data access"""
        # Implementation here
        pass

    async def _get_product_from_db(self, product_id: int):
        """Product-specific data access"""
        # Implementation here
        pass

    async def _update_product_stock(self, product_id: int, quantity: int):
        """Product-specific business logic"""
        # Implementation here
        pass

class OrderService(AbstractService):
    """Order processing microservice"""

    def __init__(self, port: int = 8002):
        super().__init__("order-service", port)
        self.service_client = None  # Will be injected

    def set_service_client(self, client: ServiceClient):
        """Dependency injection for service communication"""
        self.service_client = client

    def _setup_routes(self):
        @self.app.post("/orders")
        async def create_order(order_data: dict):
            """Create order - orchestrates multiple services"""
            try:
                # Validate input
                if not self._validate_order_data(order_data):
                    raise HTTPException(status_code=400, detail="Invalid order data")

                # Check product availability via product service
                product = await self.service_client.call_service(
                    "product-service",
                    f"/products/{order_data['product_id']}"
                )

                if product['stock'] < order_data['quantity']:
                    raise HTTPException(status_code=400, detail="Insufficient stock")

                # Calculate total
                total = product['price'] * order_data['quantity']

                # Create order in order database
                order_id = await self._create_order_in_db(order_data, total)

                # Update product stock via product service
                await self.service_client.call_service(
                    "product-service",
                    f"/products/{order_data['product_id']}/stock",
                    "PUT",
                    {"quantity": -order_data['quantity']}
                )

                # Send notification via notification service
                await self.service_client.call_service(
                    "notification-service",
                    "/notifications/order",
                    "POST",
                    {"order_id": order_id, "type": "order_created"}
                )

                return {"order_id": order_id, "status": "created"}

            except Exception as e:
                logger.error(f"Error creating order: {e}")
                raise HTTPException(status_code=500, detail="Order creation failed")

        @self.app.get("/orders/{order_id}")
        async def get_order(order_id: int):
            """Get order details"""
            order = await self._get_order_from_db(order_id)
            if not order:
                raise HTTPException(status_code=404, detail="Order not found")
            return order

    def _validate_order_data(self, data: dict) -> bool:
        """Order-specific validation logic"""
        required_fields = ['product_id', 'quantity']
        return all(field in data and data[field] for field in required_fields)

    async def _create_order_in_db(self, order_data: dict, total: float) -> int:
        """Order-specific data persistence"""
        # Implementation here
        pass

    async def _get_order_from_db(self, order_id: int):
        """Order-specific data access"""
        # Implementation here
        pass

class AnalyticsService(AbstractService):
    """Analytics and reporting microservice"""

    def __init__(self, port: int = 8003):
        super().__init__("analytics-service", port)

    def _setup_routes(self):
        @self.app.get("/analytics/sales")
        async def get_sales_analytics(days: int = 30):
            """Get sales analytics - heavy computation isolated"""
            try:
                # Analytics-specific logic
                analytics = await self._calculate_sales_analytics(days)
                return analytics
            except Exception as e:
                logger.error(f"Error in analytics service: {e}")
                raise HTTPException(status_code=500, detail="Analytics error")

        @self.app.get("/analytics/products")
        async def get_product_analytics():
            """Get product performance analytics"""
            try:
                analytics = await self._calculate_product_analytics()
                return analytics
            except Exception as e:
                logger.error(f"Error in product analytics: {e}")
                raise HTTPException(status_code=500, detail="Analytics error")

    async def _calculate_sales_analytics(self, days: int) -> dict:
        """Heavy analytics computation in dedicated service"""
        # Can use different database optimized for analytics
        # Can scale independently
        pass

    async def _calculate_product_analytics(self) -> dict:
        """Product analytics computation"""
        pass

class APIGateway(AbstractService):
    """API Gateway for routing and cross-cutting concerns"""

    def __init__(self, port: int = 8000):
        super().__init__("api-gateway", port)
        self.service_client = None
        self.rate_limiter = None
        self.auth_middleware = None

    def set_service_client(self, client: ServiceClient):
        self.service_client = client

    def _setup_routes(self):
        # Route to product service
        @self.app.get("/api/products")
        async def get_products(request: Request):
            """Gateway route with cross-cutting concerns"""
            # Authentication
            if not await self._authenticate_request(request):
                raise HTTPException(status_code=401, detail="Unauthorized")

            # Rate limiting
            if not await self._check_rate_limit(request):
                raise HTTPException(status_code=429, detail="Rate limit exceeded")

            # Logging
            await self._log_request(request)

            # Route to product service
            try:
                response = await self.service_client.call_service(
                    "product-service", "/products"
                )
                return response
            except Exception as e:
                # Circuit breaker logic could go here
                raise HTTPException(status_code=503, detail="Service unavailable")

        # Route to order service
        @self.app.post("/api/orders")
        async def create_order(order_data: dict, request: Request):
            """Order creation with gateway concerns"""
            # Authentication and validation
            if not await self._authenticate_request(request):
                raise HTTPException(status_code=401, detail="Unauthorized")

            # Input validation
            if not self._validate_order_request(order_data):
                raise HTTPException(status_code=400, detail="Invalid request")

            # Route to order service
            response = await self.service_client.call_service(
                "order-service", "/orders", "POST", order_data
            )
            return response

        # Route to analytics service
        @self.app.get("/api/analytics/sales")
        async def get_sales_analytics(request: Request, days: int = 30):
            """Analytics with additional security"""
            # Check if user has analytics permission
            if not await self._check_permission(request, "analytics.read"):
                raise HTTPException(status_code=403, detail="Forbidden")

            response = await self.service_client.call_service(
                "analytics-service", f"/analytics/sales?days={days}"
            )
            return response

    async def _authenticate_request(self, request: Request) -> bool:
        """Authentication logic"""
        # JWT validation, API key checking, etc.
        pass

    async def _check_rate_limit(self, request: Request) -> bool:
        """Rate limiting logic"""
        # Redis-based rate limiting
        pass

    async def _check_permission(self, request: Request, permission: str) -> bool:
        """Permission checking"""
        pass

    async def _log_request(self, request: Request):
        """Request logging"""
        pass

    def _validate_order_request(self, data: dict) -> bool:
        """Input validation at gateway level"""
        pass
```

### Service Communication Patterns

Implement different communication patterns for microservices:

```python
import asyncio
from concurrent.futures import ThreadPoolExecutor
import aio_pika
import json
from typing import Callable, Any

class MessageBroker:
    """Asynchronous message broker for service communication"""

    def __init__(self, rabbitmq_url: str = "amqp://guest:guest@localhost/"):
        self.rabbitmq_url = rabbitmq_url
        self.connection = None
        self.channel = None
        self.executor = ThreadPoolExecutor(max_workers=4)

    async def connect(self):
        """Connect to RabbitMQ"""
        self.connection = await aio_pika.connect_robust(self.rabbitmq_url)
        self.channel = await self.connection.channel()

    async def publish_event(self, exchange_name: str, routing_key: str, message: dict):
        """Publish event to message broker"""
        await self.channel.default_exchange.publish(
            aio_pika.Message(body=json.dumps(message).encode()),
            routing_key=routing_key
        )

    async def consume_events(self, queue_name: str, callback: Callable):
        """Consume events from queue"""
        queue = await self.channel.declare_queue(queue_name)

        async def process_message(message: aio_pika.IncomingMessage):
            async with message.process():
                try:
                    data = json.loads(message.body.decode())
                    await callback(data)
                except Exception as e:
                    logger.error(f"Error processing message: {e}")

        await queue.consume(process_message)

class EventDrivenOrderService(OrderService):
    """Order service with event-driven architecture"""

    def __init__(self, port: int = 8002):
        super().__init__(port)
        self.message_broker = MessageBroker()

    async def initialize(self):
        """Initialize service with message broker"""
        await self.message_broker.connect()

        # Subscribe to events
        await self.message_broker.consume_events(
            "order_events",
            self._handle_order_event
        )

    async def create_order_event_driven(self, order_data: dict):
        """Create order using event-driven approach"""
        try:
            # Validate and prepare order
            order_id = await self._prepare_order(order_data)

            # Publish order created event
            await self.message_broker.publish_event(
                "order_exchange",
                "order.created",
                {
                    "order_id": order_id,
                    "product_id": order_data['product_id'],
                    "quantity": order_data['quantity'],
                    "timestamp": datetime.utcnow().isoformat()
                }
            )

            return {"order_id": order_id, "status": "processing"}

        except Exception as e:
            logger.error(f"Error in event-driven order creation: {e}")
            raise

    async def _handle_order_event(self, event_data: dict):
        """Handle order-related events"""
        event_type = event_data.get('event_type')

        if event_type == 'payment.completed':
            await self._process_payment_completion(event_data)
        elif event_type == 'inventory.reserved':
            await self._process_inventory_reservation(event_data)
        elif event_type == 'shipping.scheduled':
            await self._finalize_order(event_data)

    async def _process_payment_completion(self, event_data: dict):
        """Process payment completion event"""
        order_id = event_data['order_id']

        # Update order status
        await self._update_order_status(order_id, 'paid')

        # Publish inventory reservation request
        await self.message_broker.publish_event(
            "inventory_exchange",
            "inventory.reserve",
            {
                "order_id": order_id,
                "product_id": event_data['product_id'],
                "quantity": event_data['quantity']
            }
        )

    async def _process_inventory_reservation(self, event_data: dict):
        """Process inventory reservation event"""
        order_id = event_data['order_id']

        # Update order status
        await self._update_order_status(order_id, 'inventory_reserved')

        # Publish shipping request
        await self.message_broker.publish_event(
            "shipping_exchange",
            "shipping.schedule",
            {"order_id": order_id}
        )

    async def _finalize_order(self, event_data: dict):
        """Finalize order after shipping is scheduled"""
        order_id = event_data['order_id']

        # Update final order status
        await self._update_order_status(order_id, 'shipped')

        # Send notification
        await self._send_order_shipped_notification(order_id)

class SagaPattern:
    """Saga pattern for distributed transactions"""

    def __init__(self, message_broker: MessageBroker):
        self.message_broker = message_broker
        self.sagas = {}

    async def start_saga(self, saga_id: str, saga_definition: dict):
        """Start a new saga"""
        saga = {
            'id': saga_id,
            'definition': saga_definition,
            'current_step': 0,
            'completed_steps': [],
            'compensating_actions': [],
            'status': 'running'
        }

        self.sagas[saga_id] = saga

        # Execute first step
        await self._execute_saga_step(saga)

    async def _execute_saga_step(self, saga: dict):
        """Execute next saga step"""
        if saga['current_step'] >= len(saga['definition']['steps']):
            # Saga completed
            saga['status'] = 'completed'
            await self._notify_saga_completion(saga)
            return

        step = saga['definition']['steps'][saga['current_step']]

        try:
            # Execute step
            result = await self._execute_step_action(step['action'])

            # Record successful step
            saga['completed_steps'].append(step)
            saga['current_step'] += 1

            # Execute next step
            await self._execute_saga_step(saga)

        except Exception as e:
            # Step failed, execute compensating actions
            logger.error(f"Saga step failed: {e}")
            await self._compensate_saga(saga)

    async def _execute_step_action(self, action: dict) -> Any:
        """Execute a saga step action"""
        service = action['service']
        endpoint = action['endpoint']
        method = action.get('method', 'POST')
        data = action.get('data', {})

        # Call service
        async with HTTPServiceClient(self.service_discovery) as client:
            return await client.call_service(service, endpoint, method, data)

    async def _compensate_saga(self, saga: dict):
        """Execute compensating actions for failed saga"""
        saga['status'] = 'compensating'

        # Execute compensating actions in reverse order
        for step in reversed(saga['completed_steps']):
            if 'compensation' in step:
                try:
                    await self._execute_step_action(step['compensation'])
                except Exception as e:
                    logger.error(f"Compensation failed: {e}")

        saga['status'] = 'compensated'
        await self._notify_saga_failure(saga)

    async def _notify_saga_completion(self, saga: dict):
        """Notify saga completion"""
        await self.message_broker.publish_event(
            "saga_exchange",
            "saga.completed",
            {"saga_id": saga['id']}
        )

    async def _notify_saga_failure(self, saga: dict):
        """Notify saga failure"""
        await self.message_broker.publish_event(
            "saga_exchange",
            "saga.failed",
            {"saga_id": saga['id']}
        )
```

### Scaling Strategies

Implement various scaling strategies for microservices:

```python
from kubernetes import client, config
import docker
from typing import Dict, List
import asyncio

class AutoScaler:
    """Automatic scaling for microservices"""

    def __init__(self, k8s_config_path: str = None):
        if k8s_config_path:
            config.load_kube_config(k8s_config_path)
        else:
            config.load_incluster_config()

        self.apps_v1 = client.AppsV1Api()
        self.core_v1 = client.CoreV1Api()
        self.metrics_collector = ServiceMetricsCollector()

    async def monitor_and_scale(self):
        """Continuously monitor services and scale as needed"""
        while True:
            try:
                services = await self._get_services_to_monitor()

                for service in services:
                    metrics = await self.metrics_collector.get_service_metrics(service)
                    scaling_decision = self._analyze_scaling_needs(metrics)

                    if scaling_decision['scale_needed']:
                        await self._scale_service(service, scaling_decision)

                await asyncio.sleep(60)  # Check every minute

            except Exception as e:
                logger.error(f"Error in auto-scaling: {e}")
                await asyncio.sleep(60)

    def _analyze_scaling_needs(self, metrics: Dict) -> Dict:
        """Analyze if service needs scaling"""
        decision = {
            'scale_needed': False,
            'scale_type': None,  # 'horizontal' or 'vertical'
            'replicas': None,
            'resources': None
        }

        cpu_usage = metrics.get('cpu_percent', 0)
        memory_usage = metrics.get('memory_percent', 0)
        response_time = metrics.get('response_time_p95', 0)
        active_connections = metrics.get('active_connections', 0)

        # Horizontal scaling (add more instances)
        if (cpu_usage > 70 or memory_usage > 80 or
            response_time > 1000 or active_connections > 1000):
            decision['scale_needed'] = True
            decision['scale_type'] = 'horizontal'
            decision['replicas'] = min(10, current_replicas + 1)  # Max 10 replicas

        # Vertical scaling (increase resources)
        elif cpu_usage > 80 or memory_usage > 85:
            decision['scale_needed'] = True
            decision['scale_type'] = 'vertical'
            decision['resources'] = {
                'cpu': '1000m',  # Increase CPU
                'memory': '2Gi'  # Increase memory
            }

        return decision

    async def _scale_service(self, service_name: str, scaling_decision: Dict):
        """Scale a service based on decision"""
        try:
            if scaling_decision['scale_type'] == 'horizontal':
                await self._scale_horizontally(service_name, scaling_decision['replicas'])
            elif scaling_decision['scale_type'] == 'vertical':
                await self._scale_vertically(service_name, scaling_decision['resources'])

            logger.info(f"Scaled service {service_name}: {scaling_decision}")

        except Exception as e:
            logger.error(f"Error scaling service {service_name}: {e}")

    async def _scale_horizontally(self, service_name: str, replicas: int):
        """Scale service horizontally by changing replica count"""
        deployment = self.apps_v1.read_namespaced_deployment(
            name=service_name,
            namespace="default"
        )

        deployment.spec.replicas = replicas

        self.apps_v1.patch_namespaced_deployment(
            name=service_name,
            namespace="default",
            body=deployment
        )

    async def _scale_vertically(self, service_name: str, resources: Dict):
        """Scale service vertically by changing resource limits"""
        deployment = self.apps_v1.read_namespaced_deployment(
            name=service_name,
            namespace="default"
        )

        # Update resource requests and limits
        container = deployment.spec.template.spec.containers[0]
        container.resources = client.V1ResourceRequirements(
            requests=resources,
            limits=resources
        )

        self.apps_v1.patch_namespaced_deployment(
            name=service_name,
            namespace="default",
            body=deployment
        )

    async def _get_services_to_monitor(self) -> List[str]:
        """Get list of services to monitor for scaling"""
        # Get all deployments in the namespace
        deployments = self.apps_v1.list_namespaced_deployment(namespace="default")
        return [d.metadata.name for d in deployments.items]

class LoadBalancer:
    """Intelligent load balancing for microservices"""

    def __init__(self):
        self.service_health = {}
        self.load_balancer = None  # Could use NGINX, Traefik, etc.

    async def distribute_request(self, service_name: str, request_data: Dict) -> str:
        """Distribute request to healthy service instance"""
        healthy_instances = await self._get_healthy_instances(service_name)

        if not healthy_instances:
            raise Exception(f"No healthy instances for service {service_name}")

        # Simple round-robin for now
        instance = self._select_instance_round_robin(service_name, healthy_instances)

        return instance

    async def _get_healthy_instances(self, service_name: str) -> List[str]:
        """Get healthy instances of a service"""
        # Check service registry or health endpoints
        instances = []
        # Implementation depends on service discovery mechanism
        return instances

    def _select_instance_round_robin(self, service_name: str, instances: List[str]) -> str:
        """Select instance using round-robin algorithm"""
        if service_name not in self.service_health:
            self.service_health[service_name] = {'current_index': 0}

        current_index = self.service_health[service_name]['current_index']
        selected_instance = instances[current_index % len(instances)]

        self.service_health[service_name]['current_index'] = (current_index + 1) % len(instances)

        return selected_instance

class CircuitBreaker:
    """Circuit breaker pattern for resilient service communication"""

    def __init__(self, failure_threshold: int = 5, recovery_timeout: int = 60):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.service_states = {}  # service_name -> {'state': 'closed|open|half_open', 'failures': int, 'last_failure': datetime}

    async def call_service_with_circuit_breaker(self, service_name: str, call_func, *args, **kwargs):
        """Call service with circuit breaker protection"""
        state = self.service_states.get(service_name, {'state': 'closed', 'failures': 0, 'last_failure': None})

        if state['state'] == 'open':
            # Check if recovery timeout has passed
            if datetime.now() - state['last_failure'] > timedelta(seconds=self.recovery_timeout):
                state['state'] = 'half_open'
                self.service_states[service_name] = state
            else:
                raise Exception(f"Circuit breaker open for service {service_name}")

        try:
            # Make the service call
            result = await call_func(*args, **kwargs)

            # Success - reset failure count
            if state['state'] == 'half_open':
                state['state'] = 'closed'
            state['failures'] = 0
            self.service_states[service_name] = state

            return result

        except Exception as e:
            # Failure - increment failure count
            state['failures'] += 1
            state['last_failure'] = datetime.now()

            if state['failures'] >= self.failure_threshold:
                state['state'] = 'open'
                logger.warning(f"Circuit breaker opened for service {service_name}")

            self.service_states[service_name] = state
            raise e
```

### Monitoring and Observability

Implement comprehensive monitoring for microservices:

```python
from prometheus_client import Counter, Histogram, Gauge, start_http_server
import time
from typing import Dict, Any

class ServiceMetricsCollector:
    """Collect and expose service metrics"""

    def __init__(self, service_name: str):
        self.service_name = service_name

        # Define metrics
        self.request_counter = Counter(
            f'{service_name}_requests_total',
            'Total number of requests',
            ['method', 'endpoint', 'status']
        )

        self.request_latency = Histogram(
            f'{service_name}_request_latency_seconds',
            'Request latency in seconds',
            ['method', 'endpoint']
        )

        self.active_connections = Gauge(
            f'{service_name}_active_connections',
            'Number of active connections'
        )

        self.error_counter = Counter(
            f'{service_name}_errors_total',
            'Total number of errors',
            ['error_type']
        )

    def record_request(self, method: str, endpoint: str, status: int, duration: float):
        """Record request metrics"""
        self.request_counter.labels(method=method, endpoint=endpoint, status=status).inc()
        self.request_latency.labels(method=method, endpoint=endpoint).observe(duration)

    def record_error(self, error_type: str):
        """Record error metrics"""
        self.error_counter.labels(error_type=error_type).inc()

    def update_active_connections(self, count: int):
        """Update active connections gauge"""
        self.active_connections.set(count)

class DistributedTracing:
    """Distributed tracing for microservices"""

    def __init__(self, service_name: str):
        self.service_name = service_name
        self.tracer = None  # Initialize with Jaeger, Zipkin, etc.

    def start_span(self, operation_name: str, parent_span=None):
        """Start a new tracing span"""
        # Implementation depends on tracing backend
        pass

    def inject_trace_context(self, headers: Dict[str, str]):
        """Inject trace context into headers"""
        # Implementation depends on tracing backend
        pass

    def extract_trace_context(self, headers: Dict[str, str]):
        """Extract trace context from headers"""
        # Implementation depends on tracing backend
        pass

class LogAggregator:
    """Centralized logging for microservices"""

    def __init__(self, elk_url: str = None):
        self.elk_url = elk_url
        self.log_buffer = []
        self.buffer_size = 100

    async def log_event(self, level: str, message: str, extra_data: Dict = None):
        """Log event with structured data"""
        log_entry = {
            'timestamp': datetime.utcnow().isoformat(),
            'service': self.service_name,
            'level': level,
            'message': message,
            'extra': extra_data or {}
        }

        self.log_buffer.append(log_entry)

        if len(self.log_buffer) >= self.buffer_size:
            await self._flush_logs()

    async def _flush_logs(self):
        """Flush log buffer to centralized logging system"""
        if not self.log_buffer:
            return

        try:
            # Send to ELK stack, CloudWatch, etc.
            # Implementation depends on logging backend
            pass

            # Clear buffer
            self.log_buffer.clear()

        except Exception as e:
            logger.error(f"Error flushing logs: {e}")

class HealthChecker:
    """Health checking for services"""

    def __init__(self, service_name: str):
        self.service_name = service_name
        self.health_checks = []

    def add_health_check(self, name: str, check_func):
        """Add a health check function"""
        self.health_checks.append({
            'name': name,
            'check_func': check_func
        })

    async def perform_health_checks(self) -> Dict[str, Any]:
        """Perform all health checks"""
        results = {
            'service': self.service_name,
            'timestamp': datetime.utcnow().isoformat(),
            'overall_status': 'healthy',
            'checks': []
        }

        for check in self.health_checks:
            try:
                start_time = time.time()
                check_result = await check['check_func']()
                duration = time.time() - start_time

                check_status = {
                    'name': check['name'],
                    'status': 'healthy' if check_result else 'unhealthy',
                    'duration_seconds': duration
                }

                if not check_result:
                    results['overall_status'] = 'unhealthy'

                results['checks'].append(check_status)

            except Exception as e:
                results['checks'].append({
                    'name': check['name'],
                    'status': 'unhealthy',
                    'error': str(e)
                })
                results['overall_status'] = 'unhealthy'

        return results

    async def check_database_connection(self) -> bool:
        """Check database connectivity"""
        # Implementation here
        pass

    async def check_external_service(self, service_name: str) -> bool:
        """Check external service availability"""
        # Implementation here
        pass

    async def check_disk_space(self) -> bool:
        """Check available disk space"""
        # Implementation here
        pass
```

### Conclusion

Scaling APIs from monolithic to microservices architecture requires careful planning and implementation. The key benefits of microservices include:

- **Independent scaling**: Scale individual services based on their specific needs
- **Technology diversity**: Use different technologies for different services
- **Fault isolation**: Failure in one service doesn't bring down the entire system
- **Team autonomy**: Different teams can work on different services independently
- **Easier maintenance**: Smaller, focused codebases are easier to understand and maintain

However, microservices also introduce complexity in areas like service communication, distributed transactions, and monitoring. The patterns and implementations shown above provide a solid foundation for building scalable, resilient microservices architectures.

Key takeaways:
- Start with a clear domain-driven design to identify service boundaries
- Implement proper service communication patterns (synchronous, asynchronous, event-driven)
- Use circuit breakers, retries, and timeouts for resilience
- Implement comprehensive monitoring and observability
- Plan for automated scaling and deployment
- Consider using service mesh technologies like Istio for cross-cutting concerns

Remember that microservices are not a silver bullet. They work best for large, complex applications with multiple development teams. For smaller applications, a well-structured monolithic architecture might be more appropriate.