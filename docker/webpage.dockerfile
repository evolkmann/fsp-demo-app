FROM node:14-alpine

ARG BUILD_ENV='development'
ARG DEPLOY_USER
ARG DEPLOY_PASS
ARG HOSTING_DOMAIN
ARG LOCAL_PATH="/app/packages/webpage/dist/webpage"
ARG REMOTE_PATH="/fsp.enzo-volkmann.de"

WORKDIR /app
COPY packages/webpage packages/webpage
COPY package.json package-lock.json lerna.json ./

RUN npm ci && npm run postinstall -- --ci
RUN npm run build:${BUILD_ENV} --prefix packages/webpage

RUN apk add sshpass openssh
RUN if [ -z "$DEPLOY_USER" -o -z "$DEPLOY_PASS" -o -z "$HOSTING_DOMAIN" ]; then \
        echo ' ---> Supply DEPLOY_USER anf DEPLOY_PASS to deploy'; \
    else \
        sshpass -p $DEPLOY_PASS ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$HOSTING_DOMAIN "rm -rf $REMOTE_PATH/*" && \
        sshpass -p $DEPLOY_PASS scp -o StrictHostKeyChecking=no -r $LOCAL_PATH/* $DEPLOY_USER@$HOSTING_DOMAIN:$REMOTE_PATH; \
    fi;
