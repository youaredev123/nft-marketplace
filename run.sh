sudo docker run -d -v /var/memento/pictures:/app/memento.server/pictures -e PORT=3006 -p 80:3006 bryanwood/bryanwood:memento