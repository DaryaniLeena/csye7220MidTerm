#! /bin/bash
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install nodejs
git clone https://github.com/DaryaniLeena/csye7220MidTerm.git
cd uberfe
sudo apt update
sudo apt-get install python3
sudo apt install python3-pip -y
sudo apt install gunicorn -y
sudo apt-get install python3-venv -y
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
# gunicorn --bind 0.0.0.0 main:app -D
gunicorn -w 4 -b 0.0.0.0 main:app