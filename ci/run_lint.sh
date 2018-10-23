#!/bin/bash

set -e

# Lint back-end
echo "Linting NodeJS"
echo ""
npm run lint

# Lint front-end
echo "Linting ReactJS"
echo ""
npm run lint --prefix ./client
