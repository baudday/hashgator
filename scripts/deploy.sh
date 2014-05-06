#!/bin/bash

# Make sure we're in the right dir
cd /home/willem/projects/hashgator

export BRANCH=$1
git checkout $BRANCH

export COMMIT=$(git rev-parse --short HEAD)
export FILE=$COMMIT.tar.gz
export HOST="hashgator.com"

# Build css files
lessc --clean-css css/style.less > css/style.css

# Build it (will employ this later)
# r.js -o build/app.build.js

tar -cvzf $FILE index.html css/style.css img/ js/ lib/ templates/
scp -r $FILE ubuntu@$HOST:/home/ubuntu/ && rm $FILE &&
ssh ubuntu@$HOST "cd /var/www/hashgator.com/releases && sudo mkdir $COMMIT && sudo tar -xf /home/ubuntu/$FILE -C $COMMIT && rm /home/ubuntu/$FILE && cd /var/www/hashgator.com && sudo rm /var/www/hashgator.com/public_html && sudo ln -s /var/www/hashgator.com/releases/$COMMIT /var/www/hashgator.com/public_html"

