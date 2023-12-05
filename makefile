IMAGE_NAME = toxiplantes
IMAGE_VERSION = latest
DOCKERFILE_DIR = .

# Build docker image
docker-build:
	docker buildx build -t $(IMAGE_NAME):$(IMAGE_VERSION) $(DOCKERFILE_DIR)

docker-run:
	docker run -dp 3000:3000 $(IMAGE_NAME)

docker-stop:
	docker stop $(IMAGE_NAME)