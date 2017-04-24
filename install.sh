# -- BUILD AND INSTALL 'feature-toggle' --

# Declare varibles
domain=$1
port=$2

# Update machine package indexes
sudo apt-get update

# Download and run script to install node 7
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

# Install node 7
apt-get install -y nodejs

# Install 'typescript' node package
npm install -g typescript

# Install 'gulp' node package
npm install -g gulp

# -- BUILD 'featue-toggle-db' project --

docker run --name feature-toggle-db -d mongo

# -- BUILD 'feature-toggle-service' project --

# Clone 'feature-toggle-service' repository
git clone https://github.com/barend-erasmus/feature-toggle-service.git

# Change to cloned directory
cd ./feature-toggle-service

# Replace domain
sed -i -- "s/yourdomain.com/$domain/g" ./src/config.prod.ts

# Install node packages
npm install

# Build project
npm run build

# Build docker image
docker build --no-cache -t feature-toggle-service ./

# Stop docker container
docker stop feature-toggle-service

# Run docker as deamon
docker run -d -p $port:3000 --name feature-toggle-service --link feature-toggle-db:mongo -t feature-toggle-service
