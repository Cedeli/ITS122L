#!/bin/sh

envsubst < /app/src/environments/environment.ts > /app/src/environments/environment.ts.tmp && mv /app/src/environments/environment.ts.tmp /app/src/environments/environment.ts

nginx -g "daemon off;"
