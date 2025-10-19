# Namespace

~~~yaml
# 네임스페이스의 정의는 이름만 있으면 된다.
apiVersion: v1
kind: Namespace
metadata:
    name: [namespace-name]

---

apiVersion: apps/v1
kind: Deployment
metadata:                           # 소속 네임스페이스는 메테데이터로 관리된다.
    name: [deploy-name]             # 네임스페이스가 이미 정의되어 있어야 하며 정의되어 있지 않다면 리소스 배치가 실패한다.
    namespace: [namespace-name]

...
~~~