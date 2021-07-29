# How to start

```bash
pip install -r requirement.txt
python manage.py makemigrations
python manage.py migrate
nohup python manage.py runserver 0.0.0.0:8000 >> /root/stat.log 2>&1 &
```

