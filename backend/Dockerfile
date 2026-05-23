# Use official lightweight Python image
FROM python:3.11-slim

# Set environment system options
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory inside container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy and install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code to app directory
COPY . /app/

# Expose Django port
EXPOSE 8000

# Run migrations, seed database, and launch Gunicorn web server
CMD python manage.py migrate && \
    python manage.py seed_data && \
    gunicorn core.wsgi:application --bind 0.0.0.0:8000
