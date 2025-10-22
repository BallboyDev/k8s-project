# FROM ubuntu:22.04
FROM gitea/act_runner:latest

# ENV DEBIAN_FRONTEND=noninteractive

# RUN apt-get update && \
#     apt-get install -y ca-certificates curl && \
#     install -m 0755 -d /etc/apt/keyrings && \
#     curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc && \
#     chmod a+r /etc/apt/keyrings/docker.asc && \
#     echo \
#         "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
#         bullseye stable" | \
#         tee /etc/apt/sources.list.d/docker.list > /dev/null && \
#     apt-get update && \
#     apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin && \
#     # 설치 후 불필요한 apt 캐시를 삭제하여 이미지 용량을 줄입니다.
#     rm -rf /var/lib/apt/lists/*

RUN apk update && \
    apk add --no-cache docker curl

RUN apk add --no-cache nodejs npm