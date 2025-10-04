# Service

## ClusterIP / 파드와 파드 간의 통신
- ClusterIP (Default)
    - ClusterIP는 클러스터 전체에서 통용되는 IP 주소를 생성하는데, 이 IP 주소는 파드가 어느 노드에 있더라도 접근이 가능하다.
    - 하지만 이 IP 주소는 클러스터 내에서만 유효하기에 외부에서 접근이 불가능하여 클러스터 내 파드와 파드간의 통신에서만 사용된다.
    - 내부에서는 접근이 가능하되 외부의 접근은 차단해야 하는 분산 시스템 구축에 사용된다.

~~~yaml
apiVersion: v1
kind: Service

metadata:
    name: service-name-clusterip # 서비스의 이름은 쿠버네티스 내부에서 파드의 IP주소와 매칭되어 도메인 네임으로 사용된다.

spec:
    type: ClusterIP

    # 서비스로 들어온 트래픽을 아래 설정에 따라 해당 파드 그룹으로 트래픽을 전달한다.
    selector: 
        app: pod-label-app
        version: pod-label-version
    ports:
        # port로 들어온 트래픽을 파드의 targetPort로 트래픽을 전달한다.
        # targetPort가 생략되어 있다면 port와 동일한 포트로 트래픽을 전달한다.
        - port: 80
            targetPort: 80
~~~

## NodePort / 외부 트래픽을 파드로 전달
- NodePort
    - 노드포트는 외부 로드 밸런서 없이 클러스터를 구성하는 모든 노드가 이 서비스에 지정된 포트를 주시하며 들어온 트래픽을 대상 파드의 대상 포트로 전달한다.
~~~yaml
apiVersion: v1
kind: Service

metadata:
    name: service-name-nodeport

spec:
    type: NodePort
    selector:
        app: pod-label-app
        version: pod-label-version
    ports:
        - port: 8080
            targetPort: 80
            nodePort: 30080 # 서비스가 외부에 공개되는 포트
~~~

## LoadBalancer / 외부 트래픽을 파드로 전달
- LoadBalancer
    - LoadBalancer는 트래픽을 받은 노드가 아닌 노드에서 실행되는 파드에도 트래픽을 전달할 수 있다.

~~~yaml
apiVersion: v1
kind: Service

metadata:
    name: service-name-loadbalancer

spec:
    type: LoadBalancer
    selector:
        app: pod-label-app
        version: pod-label-version
    ports:
        # port로 들어온 트래픽을 파드의 targetPort로 트래픽을 전달한다.
        # targetPort가 생략되어 있다면 port와 동일한 포트로 트래픽을 전달한다.
        - port: 8080
            targetPort: 80
~~~

## ExternalName / 클러스터 외부로 트래픽 전달
- ExternalName
    - ExternalName은 애플리케이션 파드에서 로컬 도메인 네임을 사용하고 쿠버네티스 DNS 서버에 이 로컬 도메인 네임을 조회하면 외부 도메인으로 변환하여 외부 서버로 트래픽을 전달한다. 

~~~yaml
apiVersion: v1
kind: Service

metadata:
    name: service-name-externalname # 클러스터 안에서 쓰이는 로컬 도메인 네임

spec:
    type: ExternalName
    externalname: api-address
~~~