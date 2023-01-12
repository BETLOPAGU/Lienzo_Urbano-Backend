# deploy.sh
#!/bin/bash

yarn build
git add .
git commit -m "commit"
git push
echo 'OK'