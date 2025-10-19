## ReplicaSet

~~~yaml
apiVersion: apps/v1
kind: ReplicaSet            # 디플로이먼트와 정의 내용이 거의 같다.

memtadata:
  name: replicaset-name

spec:
  replicas: 1
  selector:                 # 관리 대상 파드를 찾기 위한 셀렉터
    matchLabels:
      app: pod-label-app
  template:
    metadata:
      labels:
        app: pod-label-app
    spec:
      containers:
        - name: container-name
          image: container-image
~~~