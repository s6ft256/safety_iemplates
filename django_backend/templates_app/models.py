from django.db import models

class Template(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50)
    file_path = models.CharField(max_length=200)
    format = models.CharField(max_length=10)
    size = models.CharField(max_length=20)
    image = models.CharField(max_length=200)
    tags = models.JSONField(default=list)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Download(models.Model):
    template = models.ForeignKey(Template, on_delete=models.CASCADE)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()
    downloaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Download of {self.template.title}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
