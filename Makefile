CONTAINER_NAME=app

build:
	docker compose build

install:
	docker compose run --rm $(CONTAINER_NAME) npm install

shell:
	docker compose exec $(CONTAINER_NAME) bash

lint:
	docker compose run --rm $(CONTAINER_NAME) bash -c "npm run lint && npm run tsc"