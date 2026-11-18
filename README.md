# Albi Lubila | DevOps & Cloud Portfolio

I’m a computer science student in Kraków with a background in technical support. My hands-on projects cover containerizing a multi-service application with Docker and deploying a web application across two AWS Availability Zones.

## DataPulse — Multi-service Docker lab

I containerized a static frontend served by Nginx, a FastAPI backend, and a PostgreSQL 15 database. Docker Compose starts the API after PostgreSQL passes its health check. A named volume preserves database data, and a local `.env` file supplies the database password at runtime.

The project guide includes setup instructions and endpoints for checking API health and API-to-database connectivity.

[Read the DataPulse project guide](docker/datapulse-devops-starter/README.md) · [View the Compose configuration](docker/datapulse-devops-starter/docker-compose.yml)

## MyClothes — Multi-AZ AWS infrastructure lab

I deployed a web application across two Availability Zones. A public Application Load Balancer routes traffic to EC2 instances in private subnets, managed by an Auto Scaling group. The application uses an Amazon RDS for PostgreSQL Multi-AZ deployment.

The EC2 bootstrap script retrieves database credentials from AWS Secrets Manager using an IAM role scoped to the database secret. The project documents seven-day backup retention, point-in-time recovery, and deletion protection.

[View the architecture and deployment screenshots](https://github.com/AlLubila/aws-myclothes-infrastructure#deployment-evidence) · [View the bootstrap script](https://github.com/AlLubila/aws-myclothes-infrastructure/blob/main/scripts/user-data.sh) · [View the IAM policy](https://github.com/AlLubila/aws-myclothes-infrastructure/blob/main/policies/iam_policy.json)
