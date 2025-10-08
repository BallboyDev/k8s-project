# Pod
- 실제 운영 환경에서는 선언적 명세로 파드를 직접 생성하는 경우는 드물다.
파드는 비정상 종료 시 자동으로 재시작 되지 않으며, 복제본을 관리하는 기능도 없기 때문에 쿠버네티스의 기본 목적에 반하기 때문이다.
- 일반적으로 파드의 명세(spec)는 deployment, statefulSet, daemonSet 등의 상위 컨트롤러 리소스의 spec.template 필드 안에 정의하여 사용한다.

~~~yaml
apiVersion: v1
kind: Pod

# 리소스의 메타데이터에는 이름(필수)과 레이블(선택)이 있다.
metadata:
  name: pod-name

# spec은 리소스의 실제 정의 내용이다.
# 파드의 경우 실행할 컨테이너를 정의한다.
spec: 
  containers:
    - name: web
      image: container-image
~~~

## Pod yaml 파일의 전체 구조

### 최상위 필드
- `apiVersion` (필수): 파드는 쿠버네티스의 핵심 API 그룹에 속하며, 안정화된 버전인 v1을 사용한다.

- `kind` (필수): 생성하려는 리소스의 종류가 'Pod'임을 명시

- `metadata` (필수): 파드를 식별하기 위한 메타데이터
    - `name` (필수) : 파드의 고유한 이름.
    - `namespace`: 파드가 속한 네임스페이스 (지정하지 않으면 default)
    - `labels`: 파드를 식별하고 그룹화 하기 위한 레이블
    - `annotations`: 파드에 대한 추가적인 설명 정보

- `spec` (필수): 파드가 어떻게 동작해야 하는지에 대한 '원하는 상태'를 상세하게 기술하는 핵심 부분


### spec 필드의 주요 하위 필드 (PodSpec)
- `spec` 필드는 파드의 모든 동작을 정의한다.

- `conatiners` <배열, 필수>: 이 파드 안에서 실행될 하나 이상의 컨테이너 목록이다. 파드는 최소 하나이상의 컨테이너를 가진다.
    - `name` <문자열, 필수>: 컨테이너의 고유한 이름
    - `image` <문자열, 필수>: 컨테이너를 생성할 도커 이미지
    - `ports` <배열>: 컨테이너가 외부에 노출할 포드 목록
        - `conttainerPort`: 컨테이너 내부에서 리스닝 하는 포트 번호
    - `env` / `envForm`: 컨테이너에 주입할 환경변수 목록. ConfigMap이나 Secret의 값을 참조
    - `resources`: 컨테이너가 사용할 리소스 (CPU, 메모리)의 양을 지정.
        - `requests`: 컨테이너 실행에 필요한 최소 리소스 양, 스케줄링에 사용된다.
        - `limits`: 컨테이너가 사용할 수 있는 최대 리소스 양. 이 값을 초과하면 컨테이너가 종료될 수 있다.
    - `volumeMounts` <배열>: spec.volumes에 정의된 볼륨을 컨테이너 내부의 어떤 경로(mountPath)에 마운트할지 지정한다.
    - `command` / `args` <배열>: 컨테이너 이미지의 기본 ENTRYPOINT나 CMD를 덮어쓰고 싶을 때 사용한다.
    - `livenessProbe` / `readinessProbe` / `startupProbe` : 컨테이너의 상태를 주기적으로 확인하는 헬스 체크 (Health Check) 설정. 애플리케이션의 안정성을 위해 매우 중요하다.

- `volumes` <배열>: 파드 내의 컨테이너들이 공유하여 사용할 수 있는 볼륨의 목록을 정의한다. 여기서 정의된 볼륨은 containers.volumeMounts를 통해 실제 컨테이너에 연결된다.
    - 주요 볼륨 타입:   
        - `configMap`: ConfigMap의 데이터를 파일 형태로 마운트
        - `secret`: Secret의 데이터를 파일 형태로 마운트
        - `emptyDir`: 파드가 생성될 때 만들어지고 파드가 사라질 때 함께 삭제되는 임시 볼륨. (컨테이너 간 데이터 공유용)
        - `hostPath`: 호스트 노드의 파일시스템 경로를 직접 마운트.
        - `persistentVolumeClaim`: 영구적인 스토리지를 사용하기 위해 미리 요청한 PVC를 지정

- 파드 생명주기 및 정책 관련
    - `restartPolicy` <문자열>
        - 파드 내 컨테이너가 종료되었을 때의 재시작 정책을 결정한다.
        - `Always` (기본값): 항상 재시작한다.
        - `OnFailure`: 비정상 종료 (Exit Code가 0이 아님) 시에만 재시작 한다.
        - `Never`: 재시작 하지 않는다.
    - 