from django.test import TestCase, Client
from django.core.cache import cache
from django.urls import reverse
from apps.core.models import CustomUser

class CachingTest(TestCase):
    def setUp(self):
        # Create a user
        self.user = CustomUser.objects.create_user(
            email='test@example.com',
            username='testuser',
            password='testpassword'
        )
        self.client = Client()

    def test_job_list_caching(self):
        url = reverse('job-list')
        self.client.force_login(self.user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        cache_key = f'job_list_{self.user.id}'

        cached_data = cache.get(cache_key)
        self.assertIsNotNone(cached_data)

        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, cached_data)

