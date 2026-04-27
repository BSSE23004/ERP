from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.db import connection

class Command(BaseCommand):
    help = 'Run migrations safely, creating tables if needed'

    def handle(self, *args, **options):
        try:
            # Try to run migrations
            call_command('migrate', verbosity=2)
            self.stdout.write(self.style.SUCCESS('Migrations completed successfully'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Migration error: {e}'))
            raise