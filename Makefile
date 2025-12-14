CONTAINER_NAME=app

build:
	docker compose build --no-cache

install:
	docker compose run --rm $(CONTAINER_NAME) npm install

shell:
	docker compose exec $(CONTAINER_NAME) bash

run:
	docker compose down && docker compose up

lint:
	docker compose run --rm $(CONTAINER_NAME) bash -c "npm run lint && npm run tsc"

test:
	docker compose exec $(CONTAINER_NAME) npm test
