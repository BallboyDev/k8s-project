# Gitea 설정

## values.yaml
- 전체적인 옵션 확인은 `helm show values [gitea]/gitea`

1. Gitea 애플리케이션 동작 정의 설정

~~~yaml
gitea:
    # Gitea 최초 관리자 계정 설정
    admin:
        username: [username]
        password: [password]
    
    # Gitea의 상세 설정을 app.ini 형식으로 직접 주입 할 수도 있습니다.
    config: 
        server:
            ROOT_URL: [server-url]
        service:    
            DISABLE_REGISTRATION: false
        ui:
            DEFAULT_THEME: gitea-auto
~~~

2. 데이터 베이스 설정 (database / postgresq)
- Gitea의 데이터를 저장할 데이터베이스를 선택하고 설정한다.

~~~yaml
# 1. 내장 PostgreSQL 사용 (개발 / 테스트용)
postgresql:
    enabled: true
    postgresqlUsername: gitea
    postgresqlPassword: [password]
    postgresqlDatabase: gitea


# 2. 외부 데이터 베이스 사용 (프로덕션 환경)
postgresql: 
    enabled: false

gitea:
    database:
        type: [postgre | mysql ...] 
        host: [database-url]
        name: gitea
        user: gitea
        password: [password]


# 3. SQLite 사용 (테스트 용)
postgresql:
    enabled: false

gitea:
    database:
        tyep: sqlite3
        path: /data/gitea/gitea.db
~~~

3. 네트워크 서비스 설정 (service 옵션)
- 쿠버네티스 클러스터 외부에서 Gitea에 어떻게 접근할 지 정의

~~~yaml
service:
    http:
        type: LoadBalancer
        port: 3000
    ssh:
        type: LoadBalancer
        port: 22
~~~

4. Ingress 설정 (Ingress 옵션)
- service.type=LoadBalancer 대신, 도메인 이름을 기반으로 트래픽을 라우팅하는 Ingress를 사용하는 것이 프로덕션 환경의 표준적인 방법이며 HTTPS를 적용하기 위해 필수적이다.

- 사전 조건
    - 클러스터에 NGINX Ingress Controller와 같은 Ingress Controller가 미리 설치 되어 있어야 한다.

~~~yaml
ingress:
    enabled: true
    
    # Gitea에 연결할 도메인
    hosts:
        - host: [gitea-url]
            paths:
                - path: /
                    pathType: prefix

    # HTTPS 적용을 위한 TLS 설정
    tls: 
        - secretName: [secret-name]
            hosts:
                - [gitea-url]
~~~

5. 데이터 영구성 설정 (persistence 옵션)
- Gitea가 생성하는 Git 저장소, 데이터 베이스 파일 등을 영구적으로 저장하기위한 옵션.

~~~yaml
persistance:
    enabled: true
    # 클러스터에 설정된 StorageClass 이름. 비워두번 기본 값 사용
    storageClassName: [storageclass-name]
    # 요청할 저장 공간 크기
    size: [10Gi]
~~~


## 외부 접근
- Gitea 서버를 쿠버네티스에 구축을 하는 중 리소스는 모두 잘 올라간거 같은데 브라우저에서 접근이 되질 않는 현상이 발생한다. 처음에는 서비스 리소스의 타입을 잘 못 설정한 건가 여러 방향으로 수정, 테스트를 하고 지웠다 다시 올리고도 해보다가 드디어 원인을 찾았다.

### 원인
- https://mythpoy.tistory.com/50
- https://code1212-uh.tistory.com/19
