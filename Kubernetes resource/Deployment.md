## Deployment

~~~yaml
apiVersion: apps/v1
kind: Deployment

metadata:
  name: deployment-name

# 디플로이먼트는 파드 관리의 상세 명세를 정의한다.
spec:
  replicas: 3     # replicas 필드를 생략할 경우 디폴트 1로 지정된다.

  # 디플로이먼트가 어떤 파드를 관리할지 정의한다.
  # 디플로이먼트로 파드를 생성하게 되면 따로 파드의 이름을 정의하지 않고 template.metadata.labels에 정의된 레이블을 통해 관리한다.
  selector:
    matchLabels:
      app: pod-label-app
      version: pod-label-version

  # 디플로이먼트가 생성할 파드 명세
  template:
    metadata:
      labels:
        # spec.selector.matchLabels와 동일한 설정
        app: pod-label-app 
        version: pod-label-version

    spec:
      containers:
        - name: container-name
          image: container-image

          env:			            # 환경변수 정의
            - name: env1-name	  # 새로운 환경 변수의 이름 정의
              value: env1-value	# 새로운 환경 변수의 값 정의

            - name: env2-name
              valueFrom:
                configMapKeyRef:                # 설정된 컨피그맵에서 조회  (kubectl create configmap configmap-name --from-literal=path='value')
                  name: [configmap-name]        # 설정된 컨피그맵의 이름
                  avlue: [value path in file]   # 설정된 컨피그맵에서 읽어 들일 항목
            
            - name: env3-name
              valueFrom: 
                secretKeyRef:           # 설정된 비밀값에서 조회
                  name: [secret-name]   # 비밀값 이름
                  key: [secret-key]     # 비밀값의 항목 이름

          envFrom:                    # envFrom 항목에서 컨피그맵에서 읽어 오기
            - configMapRef:           # 환경 변수 정의
              name: [configmap-name]

          volumeMounts:                     # 컨테이너에 마운트할 볼륨 설정
            # 컨피그맵 볼륨 마운트
            - name: configmap-config        # 마운트할 볼륨 이름
              mountPath: /configmap    # 볼륨이 마운트될 경로
              readOnly: true                # 읽기 전용 설정

            # 비밀값 볼륨 마운트
            - name: secret-config       # 마운트할 볼륨 이름
              mountPath: /secrets  # 마운트될 경로

            # 공디렉토리 볼륨 마운트
            - name: empty-dir-volume      # 마운트할 볼륨 이름
              mountPath: /empty-dir       # 마운트될 경로

            # 호스트경로 볼륨 마운트
            - name: host-path-volume      # 마운트할 볼륨 이름
              mountPath: /host-path       # 마운트될 경로

            - name: host-path-volume      # 마운트할 볼륨 이름
              mountPath: /host-path1      # 마운트 대상 컨테이너 경로
              subPath: var/log            # 마운트 대상 볼륨 내 경로

            # 영구볼륨클레임 볼륨 마운트
            - name: pvc-volume            # 마운트할 볼륨 이름
              mountPath: /pvc             # 마운트될 경로

      volumes:                          # 볼륨 정의 / 볼륨은 파드 수준에서 정의 된다.

        # 컨피그맵 볼륨 마운트
        - name: configmap-config        # 볼륨 이름
          configMap:                    # 볼륨의 원본은 컨피그맵
            name: [configmap-name]      # 내용을 읽어올 컨피그맵 이름

        # 비밀값 볼륨 마운트
        - name: secret-config
          secret:                           # 비밀값에서 볼륨 생성
            secretName: [secret-name]       # 볼륨을 만들 비밀값 이름
            defaultMode: 0400               # 파일의 권한 설정
            items:                          # 비밀값의 특정 데이터 항목을 지정 가능
              - key: [secret-key-name]
                path: [secret-value]

        # 공디렉토리 볼륨 마운트
        - name: empty-dir-volume        
          emptyDir: {}                  # 공 디렉토리 유형 설정

        # 호스트경로 볼륨 마운트
        - name: host-path-volume          
          hostPath:                                 # 노드의 디렉토리를 사용
            path: [node path]                       # 사용할 노드의 디렉토리
            type: [DirectoryOnCreate | Directory]   # 디렉토리가 없으면 생성

        # 영구볼륨클레임 볼륨 마운트
        - name: pvc-volume
          persistentVolumeClaim:      # 영구볼륨클레임을 볼륨으로 사용
            claimeName: [pvc-name]    # 사용할 영구볼륨클레임의 이름
~~~