## Pod

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