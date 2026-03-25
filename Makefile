.PHONY: help serve build clean new-publication new-research new-experience new-conference

help:
	@echo "Common commands:"
	@echo "  make serve                # run local dev server"
	@echo "  make build                # build site into ./public"
	@echo "  make clean                # remove ./public"
	@echo ""
	@echo "Create new content (use NAME=some-slug):"
	@echo "  make new-publication NAME=my-paper"
	@echo "  make new-research NAME=my-note"
	@echo "  make new-experience NAME=my-role"
	@echo "  make new-conference NAME=my-talk"

serve:
	hugo server --disableFastRender

build:
	hugo

clean:
	rm -rf public

new-publication:
	@test -n "$(NAME)" || (echo "Missing NAME=..."; exit 1)
	hugo new "publications/$(NAME).md"

new-research:
	@test -n "$(NAME)" || (echo "Missing NAME=..."; exit 1)
	hugo new "research/$(NAME).md"

new-experience:
	@test -n "$(NAME)" || (echo "Missing NAME=..."; exit 1)
	hugo new "experience/$(NAME).md"

new-conference:
	@test -n "$(NAME)" || (echo "Missing NAME=..."; exit 1)
	hugo new "conferences/$(NAME).md"

