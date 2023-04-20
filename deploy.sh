rm -rf dist &&
yarn build &&
cd dist &&
git init &&
git add . &&
git commit -m 'update' &&
git branch -M main &&
git remote add origin git@github.com:haxiedaimala/Cloud-Notes-website.git &&
git push -f -u origin main &&
cd -
echo https://haxiedaimala.github.io/Cloud-Notes-website/