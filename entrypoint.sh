#!/bin/bash

yarn db:migration:run
node dist/main.js