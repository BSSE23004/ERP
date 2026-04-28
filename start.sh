#!/bin/bash
set -e

echo "Starting Django application..."

# Change to the Django project directory
cd ERP_Backend

# Run migrations
echo "Running Django migrations..."
python manage.py migrate

# Start Gunicorn
echo "Starting Gunicorn server..."
exec gunicorn ERP_Backend.wsgi --bind 0.0.0.0:${PORT:-8000} --workers 4
