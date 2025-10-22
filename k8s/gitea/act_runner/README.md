# Gitea Action 구축하기

## act_runner 구축
### 0. Runner 이미지 생성
- gitea에서 제공하는 기본 이미지를 사용할 수 있지만 애플리케이션 개발 환경에 맞춰 커스텀 이미지를 제작하여 사용하는게 일반적이다.

~~~Dockerfile
# Custom Act Runner Image
# 베이스 이미지 : Alpine 기반의 공식 act_runner 이미지
FROM gitea/act_runner:latest

# CI/CD 구축에 필요한 Docker, Curl, nodejs, npm 설치
RUN apk update && \
    apk add --no-cache docker curl

RUN apk add --no-cache nodejs npm
~~~

- 이미지 Build / Push
    - 커스텀 이미지를 docker hub 사용 시
        - `docker build -f < Dockerfile > -t <docker hub ID>/< image name >:< image tag > .`
        - `docker push <docker hub ID>/< image name >:< image tag >`
    - 로컬 도커 데스크탑을 사용 시
        - `docker build -f < Dockerfile > -t <docker hub ID>/< image name >:< image tag > .`
        - `minikube image load < image-name >:< tag >`


### 1. Gitea에서 등록 토큰 발급
- Gitea 페이지에서 `사이트 관리` -> `Actions` -> `Runners` 로 이동하여 등록 토큰을 복사한다.
    - `q1CF6KKVsl7hDlJ62LkbZyA6vhf53tf8pxOZ3HmK`


### 2. 쿠버네티스 Secret 생성
- Gitea 등록 토큰을 Secret 리소스를 사용하여 저장한다.

~~~yaml
# kubectl create secret generic gitea-runner-secret --from-literal=token='token'

apiVersion: v1
kind: Secret

metadata:
  name: token-secret

stringData:
  token: < token-string >
~~~


### 3. act_runner를 배포하기 위한 리소스 yaml 파일 작성 및 배포
1. PersistentVolumeClaim
    - 러너의 설정 파일을 저장하기 위한 영구 볼륨 요청

2. Deployment
    - act_runner를 파드로 실행하고 관리하기 위한 Deployment

- `kubectl apply -f act-runner.yaml`
    - `kubectl logs -f deploy/gitea-runner-deploy` 로그 확인
    - 발생 오류
        - 만약 runner 파드의 상태가 pending 일 경우는 '파드가 쿠버네티스 클러스터에 생성 및 승인 되었지만 아직 실행 준비가 완료 되지 않은 상태'로 상태가 지속 될 경우, 파드를 정상적으로 실행할 수 없는 근본적인 원인이 있다는 것이다.
            - `kubectl describe pod <pod-name>` 을 통해 Events 섹션을 확인, 대부분의 원인은 이벤트 로그에 명확히 나타난다.

        - 기존의 gitea 이미지에는 Docker 빌드 기능이 없어 커스텀 이미지를 제작하여 새로운 파드 컨테이너를 만들기로 하였다. 하지만 이부분에서 에러가 발생한다. 제작한 이미지를 로컬 Docker-Desktop 에 올리고 리소스 생성을 하였지만 이미지를 찾이 못하여 파드 생성에 실패한다. 원인은 minikube 환경이 docker-desktop에서 돌아가긴 하지만 컨테이너 이미지는 docker-desktop과 분리된 독립적인 레지스트리에 저장이 되어 생성되기 때문에 로컬 환경에서의 이미지를 찾이 못하는 문제이다. 해결 방법은 docker-desktop이 아닌 docker hub에 올려 받으면 된다.
            - 여기서 이해가 안되는 점은 테스트를 위해 제작한 simple-server는 docker-desktop에 올리고 잘 빌드 되던데 두 리소스가 어떤 차이가 있어서 안되는 것인지 이해가 되질 않는다. 로컬 환경의 이미지를 minikube 레지스트리에 올리는 과정을 실행 하면 된다고 하는데 난 그런 명령어를 사용한 기록이 없다.
            - 아니다 있었다... 치매인가...
                - `minikube image load < image-name >:< tag >`

~~~yaml
# 러너의 설정 파일을 저장하기 위한 영구 볼륨 설정
apiVersion: v1
kind: PersistentVolumeClaim

metadata:
  name: < pvc-name >

spec:
  accessModes:
    - ReadWriteOnce

  resources:
    requests:
      storage: 1Gi

---

# act_runner를 파드로 실행하고 관리하기 위한 Deployment
apiVersion: apps/v1
kind: Deployment

metadata:
  name: < deploy-name >

spec:
  replicas: 1
  revisionHistoryLimit: 2   # 사용 완료된 레플리카셋 리소스 지우지 않고 남길 개수 (default: 10)
  selector:
    matchLabels:
      app: < pod-app-label >
  
  template:
    metadata:
      labels:
        app: < pod-app-label >

    spec:
      containers:
        - name: act-runner
          image: < docker hub ID >/< act-runner image >:<tag>

          env: 
            # Gitea 서버 URL 
            - name: GITEA_INSTANCE_URL
              value: "http://giteaServerURL:port"

            # Secret 리소스의 등록 토큰 참조
            - name: GITEA_RUNNER_REGISTRATION_TOKEN
              valueFrom:  
                secretKeyRef:
                  name: token-secret
                  key: token

            # 러너의 이름을 지정
            - name: GITEA_RUNNER_NAME
              value: "custom-runner"

            # 러너가 처리할 작업의 레이블을 지정
            - name: GITEA_RUNNER_LABELS
              value: "custom-runner-label:host"

          volumeMounts:
            # 호스트의 Docker 소켓을 컨테이너에 마운트
            - name: docker-sock
              mountPath: /var/run/docker.sock

            # 영구 볼륨을 컨테이너의 /data 디렉토리에 마운트
            - name: runner-data
              mountPath: /data

      volumes:
        # Docker 소켓을 볼륨으로 정의
        - name: docker-sock
          hostPath:
            path: /var/run/docker.sock  
            type: Socket
        
        # 정의한 pvc를 볼륨으로 사용
        - name: runner-data
          persistentVolumeClaim:
            claimName: < pvc-name >
~~~


### 4. 배포 확인
- act_runner 파드가 정상적으로 생성되고 실행 중이라면 Gitea 페이지의 `사이트 관리` -> `Actions` -> `Runners`에 deployment 에서 선언한 러너의 이름이 나타나고 상태가 Idle로 표시되는지 확인