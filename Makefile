# Description: Makefile for running the project
# Step of running on docker:
# Step 1: make docker-build
# Step 2: make docker-run (ctrl + c to stop)
# Step 3: make docker-remove (if you want to remove the image)
# make sure to remove and build the image if you have any update on the code
run:
	npm i 
	npm run dev
docker-build:
	docker build -t fyp .
docker-run: 
	docker run -it --rm -p 8000:8000 fyp 
docker-remove:
	docker rmi fyp
docker-start: docker-build docker-run
