FROM python:3.8

WORKDIR /server

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Set the entry point for the container
ENTRYPOINT ["python", "-u", "app.py"]
