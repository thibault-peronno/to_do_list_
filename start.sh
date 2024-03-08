#!/bin/sh
rm -rf node_modules && npm prune && npm install && chmod -R 777 /web_to_do_list/node_modules && npm run build

