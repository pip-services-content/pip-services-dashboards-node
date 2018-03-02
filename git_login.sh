git config --global user.email "krdima92@gmail.com" 
git config --global user.name "stee1" 

git checkout master

git remote rm origin 
git remote add origin "https://stee1:$GITHUB_API_KEY@github.com/pip-services-content/pip-services-dashboards-node.git"