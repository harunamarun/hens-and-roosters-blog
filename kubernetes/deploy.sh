#!/bin/bash

set -eu
docker build -t gcr.io/hens-and-roosters/backend:latest ../backend
docker build -t gcr.io/hens-and-roosters/frontend:latest ../frontend
docker push gcr.io/hens-and-roosters/backend
docker push gcr.io/hens-and-roosters/frontend
kubectl delete deployment backend
kubectl delete deployment frontend
kubectl apply -f backend.yaml
kubectl apply -f frontend.yaml
kubectl apply -f ingress.yaml
kubectl get deployment
kubectl get services