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

## CI/CD 워크플로우 파일
- 워크 플로우 파일은 특정 이벤트가 발생했을 때 정의된 작업(Job)들 실행하는 자동화된 프로세스 정의한다.

### 주요 필드
- 최상위 주요 필드 
    1. `name`
        - 워크 플로우의 이름을 지정
        - `name: ci`

    2. `on`
        - 워크플로우를 언제 실행할지 정의하는 트리거(trigger)조건
        ~~~yaml
        # `main`, `release`, `develop` 브랜치로 `Pull Request`가 발생할 때 실행
        on: 
          pull_request:
            branches:
              - main
              - release
              - develop

        # dev-로 시작하는 태그가 push될 때 실행
        on:
          push:
            tags:
              - 'dev-*'
        ~~~

    3. `jobs`
        - 워크플로우에서 실행될 하나 이상의 작업(jobs)들을 포함하는 컨테이너, 작업들은 병렬 또는 순차적으로 실행된다.

- jobs 내부의 주요 필드
    1. `<JOB_ID>`
        - 각 작업을 식별하는 고유한 ID로 일부 문자의 사용 제한과 대소문자 구분, 숫자 시작 제한을 제외하고는 특별한 명명 규칙은 없다.
        - JOB_ID를 작성할때는 JOB을 구분할 수 있는 고유해야 하며, 작업의 목적을 명확하게 나타내도록 작성하는 것이 좋다.
        
    2. `name`
        - 작업의 이름으로, UI에 표시되어 각 작업의 작업 내용을 표시한다.

    3. `runs-on`
        - 작업을 실행할 가상 환경(runner)을 지정한다.
        - `runs-on: ubuntu-latest` (최신 버전의 ubuntu 환경에서 실행)

    4. `staps`
        - 작업 내에서 순차적으로 실행될 단계(step)들의 목록이다. 각 step은 셀 명령을 실행하거나, 미리 만들어진 Action을 사용할 수 있다.

- steps 내부의 주요 필드
    1. `name`
        - 해당 단계의 목적을 설명하는 이름
        - `name: Checkout the repo`, `name: Login to Docker Registry` 등

    2. `uses`
        - 다른 사람이 만들어서 공유한 재사용 가능한 코드 묶음 (action)을 가져와 사용한다. 워크 플로우를 간결하게 만드는 핵심 기능이다.
        - `uses: actions/checkout@v4`

    3. `run`
        - Runner의 셸에서 실행할 명령어를 직접 지정
        - `run: npm ci` (npm 패키지 설치)

    4. `with` 
        - uses로 지정한 Action에 필요한 파라키터를 전달
        ~~~yaml
        - name: Login to Private Docker Registry
          uses: docker/login-action@v2
          with: 
            registry: ${{ secrets.PRIVATE_DOCKER_REGISTRY_SERVER }} 
            username: ${{ secrets.PRIVATE_DOCKER_REGISTRY_USERNAME }}
            password: ${{ secrets.PRIVATE_DOCKER_REGISTRY_TOKEN }}
        ~~~
    
    5. `env`
        - 해당 단계에서 사용할 환경 변수를 설정
        ~~~yaml
        - name: action-slack
          uses: 839817/action-slack@v3
          env:
            SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_DEV_URL }}
        ~~~
    


## CI/CD 구성
- 시나리오
    - 코드가 변경될 때마다 자동으로 Docker 이미지를 빌드하고, 컨테이너 레지스트리에 푸시 하기

### 1. 애플리케이션 및 Dockerfile 제작
- [Dockerfile 제작 명령어](https://ballboydev.github.io/post/84)

### 2. 컨테이너 레지스트리 접속 정보 및 기타 설정
- 빌드된 Docker 이미지를 업로드 하려면 레지스트리(이미지 저장소)에 로그인 해야 한다. 이 때 사용할 사용자 이름과 비밀번호 (또는 토큰)를 Gitea의 secret 기능을 통해 관리한다.
    - 공통 설정
        - 모든 레포지토리에서 공통으로 쓰이는 설정 정보 (ex. Docker 접속 정보, 클라우드 정보 등)
        - `사이트 관리` -> `Actions` -> `Secrets`
            - `DOCKER_USERNAME` : Docker hub 아이디
            - `DOCKER_PASSWORD` : Docker hub 패드워드 / Access Token
    - 개벌 설정
        - 레포지토리 별로 구성되는 개별 설정 정보 (ex. docker image 정보 등)
        - `레포지토리` -> `설정` -> `Actions` -> `Secrets`


### 3. gitea actions 워크플로우 파일 작성




