# -- BUILD AND INSTALL 'feature-toggle' --

# Declare varibles
apidomain=$1
apiport=$2
domain=$3
port=$4

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

docker run --name feature-toggle-db -v /opt/mongodb:/data/db -d mongo

# -- BUILD 'feature-toggle-service' project --

# Clone 'feature-toggle-service' repository
git clone https://github.com/barend-erasmus/feature-toggle-service.git

# Change to cloned directory
cd ./feature-toggle-service

# Replace domain
sed -i -- "s/yourapidomain.com/$apidomain/g" ./src/config.prod.ts
sed -i -- "s/yourdomain.com/$domain/g" ./src/config.prod.ts

# Replace port
sed -i -- "s/yourapiport/$apiport/g" ./src/config.prod.ts
sed -i -- "s/yourport/$port/g" ./src/config.prod.ts

# Replace port
sed -i -- "s/localhost:3000/$apidomain:$apiport/g" ./src/swagger.json.ts

# Install node packages
npm install

# Build project
npm run build

# Build docker image
docker build --no-cache -t feature-toggle-service ./

# Run docker as deamon
docker run -d -p "$apiport":3000 --name feature-toggle-service -v /logs:/logs --link feature-toggle-db:mongo -t feature-toggle-service

# -- BUILD 'feature-toggle-ui' project --

# Clone 'feature-toggle-ui' repository
git clone https://github.com/barend-erasmus/feature-toggle-ui.git

# Change to cloned directory
cd ./feature-toggle-ui

# Replace domain
sed -i -- "s/yourapidomain.com/$apidomain/g" ./src/environments/environment.prod.config

# Replace port
sed -i -- "s/yourapiport.com/$apiport/g" ./src/environments/environment.prod.config

# Install node packages
npm install

# Build project
npm run build

# Build docker image
docker build --no-cache -t feature-toggle-ui ./

# Run docker as deamon
docker run -d -p "$port":4200 --name feature-toggle-ui -t feature-toggle-ui
