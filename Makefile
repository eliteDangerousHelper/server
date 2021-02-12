# Default make ENV is development. use make [target] ENV=production for production
ENV ?= dev

.DEFAULT_GOAL:=up

ifeq ($(filter $(ENV),dev production),)
$(error The ENV variable is invalid. must be one of <production|dev>)
endif

.PHONY: build deploy start stop logs restart shell up rm help

deploy:			## Deploy Prod Image (alias for `make up ENV=prod`)
	@make up ENV=production

up:				## Start service, rebuild if necessary
	cd .docker && docker-compose -f docker-compose.yml up --build -d

shell:			## Enter container shell
	cd .docker && docker-compose -f docker-compose.yml exec app /bin/sh -l

logs:			## Tail container logs with -n 1000
	cd .docker && docker-compose -f docker-compose.yml logs --follow --tail=1000

restart:		## Restart container
	cd .docker && docker-compose -f docker-compose.yml restart
