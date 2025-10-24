kubectl port-forward service/simple-server-service -n server 8080:8000 \
& kubectl port-forward service/gitea-http -n gitea 59457:3000

