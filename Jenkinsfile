pipeline {
  agent any

  options {
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr:'3'))
  }

  environment {
    HOSTING_CREDS_DEV = credentials('hosting109443')
    BUILD_ID = "${GIT_COMMIT}-${BUILD_ID}"
  }

  stages {
    stage('Set Initial Variables') {
      steps {
        script {
          if (env.TAG_NAME) {
            env.DOCKER_IMAGE_TAG = env.TAG_NAME
          } else {
            // Branch name might contain unusable chars for a docker tag
            def branch = env.GIT_BRANCH.hashCode().toString().replace('-', '')
            env.DOCKER_IMAGE_TAG = branch + '-' + env.BUILD_NUMBER
          }
          env.WEBPAGE_HOSTING_DOMAIN = 'hosting109443.a2f18.netcup.net'
          env.WEBPAGE_BUILD_ENV = 'development'
        }
      }
    }

    stage('Build Only') {
      when {
        anyOf {
          branch 'renovate/*';
          branch 'dependabot/*';
          branch 'PR-*';
          branch 'main';
        }
      }
      failFast true

      parallel {
        stage('@fsp-demo-app/webpage') {
          environment {
            IMAGE = "fsp-demo-app-webpage:$DOCKER_IMAGE_TAG"
            DOCKERFILE_PATH = "./docker/webpage.dockerfile"
            LABEL = "Webpage"
          }

          steps {
            sh script: "docker build --no-cache -t $IMAGE -f $DOCKERFILE_PATH .", label: "Build $LABEL Docker Image"
          }

          post {
            cleanup {
              sh script: "docker image rm $IMAGE", label: "Remove $LABEL Docker Image"
            }
          }
        }
      }
    }

    stage('Build & Deploy') {
      when {
        anyOf {
          tag "v*"
        }
      }

      parallel {
        stage('@fsp-demo-app/webpage') {
          environment {
            IMAGE = "fsp-demo-app-webpage:$DOCKER_IMAGE_TAG"
            DOCKERFILE_PATH = "./docker/webpage.dockerfile"
            LABEL = "Webpage"
            WEBPAGE_BUILD_ENV = "production"
            DEPLOY_USER = "$HOSTING_CREDS_DEV_USR"
            DEPLOY_PASS = "$HOSTING_CREDS_DEV_PSW"
          }

          steps {
            sh script: """
              sed -i \
                's+version?: string+version = "$TAG_NAME"+' \
                packages/webpage/src/app/navigation/components/footer/footer.component.ts
            """, label: "Substitute Git Tag into Footer"
            sh script: """
              docker build \
                --no-cache \
                --build-arg HOSTING_DOMAIN=$WEBPAGE_HOSTING_DOMAIN \
                --build-arg BUILD_ENV=$WEBPAGE_BUILD_ENV \
                --build-arg DEPLOY_USER=$DEPLOY_USER \
                --build-arg DEPLOY_PASS=$DEPLOY_PASS \
                -t $IMAGE \
                -f $DOCKERFILE_PATH \
                .
            """, label: "Build $LABEL Docker Image"
          }

          post {
            cleanup {
              sh script: "docker image rm $IMAGE", label: "Remove $LABEL Docker Image"
            }
          }
        }
      }
    }
  }
  post {
    cleanup {
      deleteDir()
    }
  }
}
