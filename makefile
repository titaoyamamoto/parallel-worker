up:
	docker-compose up --scale worker=5 -d

# down:
# 	docker-compose down
#	docker volume prune -f

down:
	docker-compose down --rmi all -v
	docker rmi 'node:alpine'

rabbitmq:
	docker-compose up -d rabbitmq

redisdb:
	docker-compose up -d redisdb

worker:
	docker-compose --file './workers/docker-compose.yaml' up --scale worker=2 -d