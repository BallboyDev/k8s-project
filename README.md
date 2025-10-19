# 쿠버네티스 구축

## Local

### Docker Desktop
- Docker Desktop에 포함된 쿠버네티스 기능을 활성화하는 방법
    1. Docker Desktop 설치
    1. 쿠버네티스 활성화
        - Docker Desktop을 실행하고, Kubernetes 탭에서 kubeadm과 kind 옵션 중 선택하여 쿠버네티스를 활성화 한다.
    1. 설치 확인
        - `kubectl get nodes` - docker-desktop / desktop-control-plane

### Minikube
- minikube는 로컬에 단일 노드 쿠버네티스 클러스터를 만들어주는 가장 널리 사용되는 도구
    1. Minikube 설치
        - `brew install minikube`
    1. 클러스터 시작
        - `minikube start`
    1. 설치 확인
        - `kubectl get nodes` - minikube

### Kind
- Docker 컨테이너를 쿠버네티스 노드로 사용하여 클러스터를 만든다. 빠르고 가벼워 CI/CD나 네트스 환경에 많이 사용된다.
    1. kind 설치
        - `brew install kind`
    1. 클러스터 생성
        - `kind create cluster`
    1. 설치 확인
        - `kubectl get nodes` - kind-control-plane


## Product
