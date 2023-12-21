# Backend Dockerfile
FROM python:3.6

# Copy the contents of the current directory to /server in the image
ADD . /server

# Set the working directory to /server
WORKDIR /server

# Set environment variables
ENV FLASK_DEBUG=1

# Install dependencies
RUN pip install -r requirements.txt

CMD [ "python" ,"-u","start"]
