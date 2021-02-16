echo "Publish"

cd RocketChatHookTask/
npm install
tsc

cd ..

tfx extension create --manifest-globs vss-extension.json