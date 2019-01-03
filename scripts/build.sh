#! /bin/bash

set -e

function build() {

	# webpack build
	webpack --config webpack-build.config.js

	# copy
	cp package.json ./dist/package.json
	cp README.md ./dist/README.md

	# create dist/index.js
	cat > dist/index.js <<- EOT
	require('./ccms-customer-view.js');
	module.exports = 'ccms.customerView';
	EOT
}

build $@
