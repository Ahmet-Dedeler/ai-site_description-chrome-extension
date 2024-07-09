#!/bin/sh
set -e

if [ "$ENVIRONMENT" = "development" ]; then
    exec uvicorn main:app --host 0.0.0.0 --reload
else
    exec "$@"
fi