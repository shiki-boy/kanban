FROM oven/bun:1.1 as base


# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get update \
&& apt-get install -y curl \
&& apt-get -y autoclean

# installs NVM (Node Version Manager)
RUN curl --silent -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
ENV NVM_DIR /root/.nvm
RUN ls
ENV NODE_VERSION 20
# download and install Node.js
# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
RUN chown bun /temp/dev
USER bun

COPY --chown=bun:node package.json /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS development-build
COPY --chown=bun:node --from=install /temp/dev/node_modules node_modules
COPY . .

# run the app
CMD [ "nodemon" ]
