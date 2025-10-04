# ConfigMap / Secret
- 애플리케이션의 비밀번호, 보안 설정은 Secret에 일반 설정은 ConfigMap에 저장한다.

## ConfigMap

~~~yaml
apiVersion: v1
kind: ConfigMap

metadata:
  name: configmap-name

data:
  # 키-값 쌍의 키 이름이 파일 이름이 된다. 
  # 파일 내용은 어떤 포맷이라도 가능하다.
  config.json: |-         
    {                     
      "key1": {
        "key2": true
      }
    }
~~~


## Secret

~~~yaml
apiVersion: v1
kind: Secret            # 리소스 유형은 비밀값

metadata:
  name: secret-name     # 비밀값 이름

type: Opaque            # 임의의 텍스트 데이터를 담고자 Opaque 유형 선택
stringData:             # 텍스트 데이터
  [KEY]: "secret-value" # 저장할 데이터 (키-값 쌍)
~~~