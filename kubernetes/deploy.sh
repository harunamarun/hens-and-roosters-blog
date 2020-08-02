#!/bin/bash

set -eux
docker build -t gcr.io/hens-and-roosters-2/backend:latest ../backend
docker build -t gcr.io/hens-and-roosters-2/frontend:latest ../frontend
docker push gcr.io/hens-and-roosters-2/backend
docker push gcr.io/hens-and-roosters-2/frontend
kubectl delete deployment backend
kubectl delete deployment frontend
kubectl apply -f backend.yaml
kubectl apply -f frontend.yaml
kubectl apply -f ingress.yaml
kubectl get deployment
kubectl get services