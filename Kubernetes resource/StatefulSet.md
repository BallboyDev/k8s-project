# StatefulSet
- 스테이트풀셋은 디플로이먼트와 같이 애플리케이션의 스케일링을 지원하는 파드 컨트롤러 이지만 디플로이먼트와의 차이점은 스테이트풀셋에는 도메인 테임으로 각각 식별되는 규칙적인 이름이 부여된 파드를 생성한다. 처음 생성된 파드는 주 인스턴스, 다음에 생성된 파드는 부 인스턴스로 지정되어 서로 데이터가 동기화 된다. 스테이트풀셋은 데이터베이스의 마스터 서버/슬레이브 서버와 같은 형태로 구성된다.

~~~yaml
apiVersion: apps/v1
kind: StatefulSet
metadata: statefulSet-name

spec:
    selector: 
        matchLabels: 
            app: app-label
    serviceName: service-name       # 스테이트풀셋은 서로 동기화 하기 위한 연결된 서비스가 필요하다.
    replicas: 3
    tamplate:
        # 파드의 정의
~~~