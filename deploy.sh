#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m '$1'

git push -f git@github.com:ianshortridge/chinese-checkers-solution.git master:gh-pages

cd -
