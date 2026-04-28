#!/bin/bash
set -e

echo "Starting Django application..."

# Railway deploys everything to /app, navigate to the backend directory
cd /app/ERP_Backend

# Run migrations
echo "Running Django migrations..."
python manage.py migrate

# Start Gunicorn
echo "Starting Gunicorn server..."
exec gunicorn ERP_Backend.wsgi --bind 0.0.0.0:${PORT:-8000} --workers 4
