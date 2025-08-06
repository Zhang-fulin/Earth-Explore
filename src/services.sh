apt update
apt install -y nodejs npm

apt install -y git nginx

mkdir -p /var/www/earth-explore

cd /var/www/earth-explore

git clone https://gitee.com/zhang_fulin/earth-explore-website.git

cd earth-explore-website

git checkout main

npm install
npm run build

cp -r dist/* /var/www/html/

systemctl restart nginx

systemctl status nginx