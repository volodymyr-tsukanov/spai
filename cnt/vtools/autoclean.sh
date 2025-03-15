#!/bin/ash
# AutoClean alpine v.0.1
 # packages
composer clear-cache
npm cache clean --force
 # system
apk cache clean
rm -rf /tmp/*
rm -rf /var/log/*
rm -rf storage/logs/*
rm -rf /root/.cache /root/.npm
 # traces
rm -f /root/.ash_history
