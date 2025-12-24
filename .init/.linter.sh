#!/bin/bash
cd /home/kavia/workspace/code-generation/audiobook-explorer-190966-190975/audio_book_store_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

