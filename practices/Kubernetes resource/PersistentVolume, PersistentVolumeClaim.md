# PersistentVolume, PersistentVolumeClaim

## PersistentVolume

~~~yaml
apiVersion: v1
kind: PersistentVolume

metadata:
  name: [volume-name]         # 볼륨 이름

spec:
  capacity:
    storage: 50Mi             # 볼륨 용량
  accessModes:                # 파드의 접근 유형
    - ReadWriteOnce           # 파드 하나에서만 사용 가능
  nfs:                        # NFS 스토리지를 사용하는 볼륨
    server: nfs.my.network    # NFS 서버의 도메인 네임
    path: [storage-path]      # 스토리지 경로
~~~

## PersistentVolumeClaim

### 정적 볼륨 프로비저닝
~~~yaml
apiVersion: v1
kind: PersistentVolumeClaim

metadata:
  name: [volumeClaim-name]    # 애플리케이션은 영구볼륨클레임을 통해 영구볼륨을 사용한다.

spec:
  accessModes:                # 접근 유형은 필수 설정이다.
    - ReadWriteOnce
  resources:
    requests:
      storage: 40Mi           # 요청하는 스토리지 용량
  storageClassName: ""        # 스토리지 유형을 지정하지 않음 / 필드가 없으면 기본 유형이 쓰인다.
~~~