#! /bin/bash

sudo apt-get update
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install nodejs git nginx python3-pip -y
sudo apt install npm
cd /home/ubuntu
git clone https://DaryaniLeena:Gitpass03@github.com/DaryaniLeena/csye7220MidTerm.git
sudo cp /home/ubuntu/csye7220MidTerm/uberfe/notfound.html /usr/share/nginx/html/notfound.html
cd /home/ubuntu/csye7220MidTerm/uberfe
npm install
npm run build
sudo rm /etc/nginx/sites-enabled/default
sudo cp /home/ubuntu/csye7220MidTerm/uberfe/uber.nginx /etc/nginx/sites-available/uber.nginx
sudo chmod 777 /etc/nginx/sites-available/uber.nginx
sudo ln -s /etc/nginx/sites-available/uber.nginx /etc/nginx/sites-enabled/uber.nginx
sudo systemctl reload nginx

##backend

sudo cp /home/ubuntu/csye7220MidTerm/uberbe/uberbe.service /etc/systemd/system/
cd /home/ubuntu/csye7220MidTerm/uberbe
pip3 install gunicorn 
pip3 install -r /home/ubuntu/csye7220MidTerm/uberbe/requirements.txt
sudo systemctl daemon-reload
sudo systemctl start uberbe 
