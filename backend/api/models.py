from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class JobApplication(models.Model):
    STAGE_CHOICES=[
        ("Applied","Applied"),
        ("Interview","Interview"),
        ("Rejected","Rejected"),
        ("Offered","Offered")
    ]
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    company=models.CharField(max_length=150)
    stage=models.CharField(max_length=100,choices=STAGE_CHOICES)
    position=models.CharField(max_length=300)
    apply_date=models.DateField()
    response_date=models.DateField()
    job_url=models.URLField()
    referral=models.BooleanField(default=False)
    resume=models.FileField(upload_to="resume/", blank=True, null=True)

    def __str__(self):
        return f"{self.company} - {self.position}"

