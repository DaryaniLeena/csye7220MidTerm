#! /bin/bash
# Will need github id and pwd
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install nodejs git nginx python3-pip 
sudo apt install npm
cd /home/ubuntu
git clone https://DaryaniLeena:Gitpass03@github.com/DaryaniLeena/csye7220MidTerm.git
cd /home/ubuntu/csye7220MidTerm/uberfe
npm install
npm run build
sudo rm /etc/nginx/sites-enabled/default
sudo cp /home/ubuntu/csye7220MidTerm/uberfe/uber.nginx /etc/nginx/sites-available/uber.nginx
sudo chmod 777 /etc/nginx/sites-available/uber.nginx
sudo ln -s /etc/nginx/sites-available/uber.nginx /etc/nginx/sites-enabled/uber.nginx
sudo systemctl reload nginx


sudo cp /home/ubuntu/csye7220MidTerm/uberbe/uberbe.service /etc/systemd/system/uberbe.service
# python3 -m venv .venv
# source .venv/bin/activate
cd /home/ubuntu/csye7220MidTerm/uberbe
pip3 install gunicorn
pip3 install -r /home/ubuntu/csye7220MidTerm/uberbe/requirements.txt
sudo systemctl daemon-reload
sudo systemctl start uberbe
# gunicorn --bind 0.0.0.0 main:app -D
# gunicorn -w 4 -b 0.0.0.0:5000 --chdir /home/ubuntu/csye7220MidTerm/uberbe wsgi:app
