#! /bin/bash
# Will need github id and pwd
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install nodejs git nginx python3-pip python3-venv gunicorn -y
sudo apt install npm
python3 -m venv env
source env/bin/activate
cd /home/ubuntu
git clone https://DaryaniLeena:Gitpass03@github.com/DaryaniLeena/csye7220MidTerm.git
cd /home/ubuntu/csye7220MidTerm/uberfe
npm install
npm run build
sudo rm /var/www/html -r
sudo mv ./build /var/www/html
cd /home/ubuntu/csye7220MidTerm/uberbe
pip3 install -r requirements.txt
# gunicorn --bind 0.0.0.0 main:app -D
gunicorn -w 4 -b 0.0.0.0 main:app