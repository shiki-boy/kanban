FROM oven/bun:1.1 as base

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
