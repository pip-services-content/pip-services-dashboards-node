# set variable for git tag
TAG="v${VERSION}-${TRAVIS_BUILD_NUMBER}-rc"

# update build version in upgrade-stage.sh
sed -i -e "s/BUILD_NUMBER=[0-9]*-rc/BUILD_NUMBER=$TRAVIS_BUILD_NUMBER-rc/g" ./deploy_scripts/upgrade-stage.sh

# configure git
git config --global user.email "krdima92@gmail.com" 
git config --global user.name "stee1" 

git checkout master

git remote rm origin 
git remote add origin "https://stee1:$GITHUB_API_KEY@github.com/pip-services-content/pip-services-dashboards-node.git"

# add tag
git tag $TAG

# commit & pus
git add ./deploy_scripts/upgrade-stage.sh
git commit -m "Travis build $TRAVIS_BUILD_NUMBER updated build number in stage deploy file [skip ci]" 
git push origin master --tags