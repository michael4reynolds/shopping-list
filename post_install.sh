#!/usr/bin/env bash

npm install babel-cli babel-preset-es2015 babel-preset-stage-2

babel src -d dist

npm uninstall babel-cli babel-preset-es2015 babel-preset-stage-2
