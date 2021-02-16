export INPUT_HookUrl="FULL_URL_SERVER_HERE"
export INPUT_Username="Bot name here"
export INPUT_Message="A new version here"
export INPUT_AttachmentTitle="Attachment title"
export INPUT_AttachmentTitleLink="http://www.hello.com"
export INPUT_AttachmentText="Attachment text"
export INPUT_AttachmentImageUrl="https://images.unsplash.com/photo-1611262588019-db6cc2032da3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1334&q=80"
export INPUT_AttachmentColor="#FFFF00"
cd RocketChatHookTask &&
tsc &&
node rocket-chat-hook.js