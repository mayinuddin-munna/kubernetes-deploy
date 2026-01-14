#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
ECR_REPO="YOUR_ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/academic-department-api"
CLUSTER_NAME="academic-cluster"
REGION="us-east-1"
NAMESPACE="development"

echo -e "${GREEN}Starting deployment...${NC}"

# 1. Build Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
docker build -t academic-department-api:latest -f docker/Dockerfile .

# 2. Tag for ECR
docker tag academic-department-api:latest ${ECR_REPO}:latest

# 3. Login to ECR
echo -e "${YELLOW}Logging into ECR...${NC}"
aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin ${ECR_REPO}

# 4. Push to ECR
echo -e "${YELLOW}Pushing to ECR...${NC}"
docker push ${ECR_REPO}:latest

# 5. Update k8s context
echo -e "${YELLOW}Updating kubeconfig...${NC}"
aws eks update-kubeconfig --region ${REGION} --name ${CLUSTER_NAME}

# 6. Apply Kubernetes manifests
echo -e "${YELLOW}Applying Kubernetes manifests...${NC}"
kubectl apply -f kubernetes/namespaces/
kubectl apply -f kubernetes/configmaps/
kubectl apply -f kubernetes/secrets/
kubectl apply -f kubernetes/deployments/
kubectl apply -f kubernetes/services/
kubectl apply -f kubernetes/networking/

# 7. Wait for rollout
echo -e "${YELLOW}Waiting for rollout...${NC}"
kubectl -n ${NAMESPACE} rollout status deployment/academic-department-api --timeout=300s

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"