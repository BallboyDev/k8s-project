# Gitea Action 구축하기

## act_runner 구축
### 1. Gitea에서 등록 토큰 발급
- Gitea 페이지에서 `사이트 관리` -> `Actions` -> `Runners` 로 이동하여 등록 토큰을 복사한다.
    - `64DiHAWnwRKDr26tAUukbSSbqPFIhX5wCxAm3d6t`

### 2. 쿠버네티스 Secret 생성
- Gitea 등록 토큰을 Secret 리소스를 사용하여 저장한다.

~~~yaml
# kubectl create secret generic gitea-runner-secret --from-literal=token='token'

apiVersion: v1
kind: Secret

metadata:
  name: token-secret

stringData:
  token: 'token'
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
                - `minikube image load [image-name]:[tag]`
        

### 4. 배포 확인
- act_runner 파드가 정상적으로 생성되고 실행 중이라면 Gitea 페이지의 `사이트 관리` -> `Actions` -> `Runners`에 deployment 에서 선언한 러너의 이름이 나타나고 상태가 Idle로 표시되는지 확인


## CI/CD 구성
- 시나리오
    - 코드가 변경될 때마다 자동으로 Docker 이미지를 빌드하고, 컨테이너 레지스트리에 푸시 하기

### 1. 애플리케이션 및 Dockerfile 제작

### 2. 컨테이너 레지스트리 접속 정보 설정
- 빌드된 Docker 이미지를 업로드 하려면 레지스트리(이미지 저장소)에 로그인 해야 한다. 이 때 사용할 사용자 이름과 비밀번호 (또는 토큰)를 Gitea의 secret 기능을 통해 관리한다.
    - `사이트 관리` -> `Actions` -> `Secrets`

### 3. gitea actions 워크플로우 파일 작성
