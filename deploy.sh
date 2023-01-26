#!/bin/bash

apt-get update
apt-get upgrade -y
apt-get update
apt-get upgrade -y
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common python3-pip git docker-ce docker-ce-cli containerd.io docker-compose-plugin nginx
cd /root/
git clone https://github.com/davidkhanpk/wtx-challange.git
cp .env.example .env
sed -i '/POSTGRES_DB=/c\POSTGRES_DB=wtx-challenge' .env
sed -i '/POSTGRES_USER/c\POSTGRES_USER=wtx-challenge' .env
sed -i '/POSTGRES_PASSWORD=/c\POSTGRES_PASSWORD=wtx-challenge' .env
docker-compose up 