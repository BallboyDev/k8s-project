# CI/CD
- CI/CD는 애플리케이션 개발부터 배포까지의 과정을 자동화하여 더 빠르고 안정적으로 사용자에게 제공하기 위한 방법론이다.

## CI (Continuous Integration, 지속적 통합)
- CI는 개발자가 작성한 코드를 정기적으로 중앙 저장소(Github, Gitlab, Gitea 등)에 통합하고, 자동으로 빌드 및 테스트하는 과정을 말한다. 이를 통해 코드의 문제점을 조기에 발견하고 해결할 수 있다.


## CD (Continuous Deployment, 지속적 배포)
- CD는 CI 과정을 통과한 코드를 자동으로 테스트 환경이나 실제 운영 환경까지 배포하는 것을 의미한다.
    - 지속적 제공 (Continuous Delivery)
        - 배포 직전 단계까지 자동화하고, 실제 배포는 수동으로 승인하는 방식
    - 지속적 배포 (Continuous Deployment)
        - 모든 단계를 자동화하여 CI를 통과한 코드가 자동으로 운영 환경에 배포되는 방식


## CI/CD 구성
- 시나리오
    - 코드가 변경될 때마다 자동으로 Docker 이미지를 빌드하고, 컨테이너 레지스트리에 푸시 하기

### 1. 애플리케이션 및 Dockerfile 제작
- [Dockerfile 제작 명령어](https://ballboydev.github.io/post/84)

### 2. 컨테이너 레지스트리 접속 정보 설정
- 빌드된 Docker 이미지를 업로드 하려면 레지스트리(이미지 저장소)에 로그인 해야 한다. 이 때 사용할 사용자 이름과 비밀번호 (또는 토큰)를 Gitea의 secret 기능을 통해 관리한다.
    - `사이트 관리` -> `Actions` -> `Secrets`

### 3. gitea actions 워크플로우 파일 작성
