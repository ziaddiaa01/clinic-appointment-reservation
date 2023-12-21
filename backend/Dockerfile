FROM python:3.6

# Set the working directory
WORKDIR /server

# Add the application code
COPY . /server

# Set environment variables
ENV FLASK_DEBUG=1

# Install dependencies
RUN pip install -r requirements.txt

# Set the entry point for the container
ENTRYPOINT ["python", "-u", "app.py"]
