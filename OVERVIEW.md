# Rocket Chat  Versioning

## Quick overview

The task available in this extension is: `RocketChatHookNotification`

Check the [Github](https://github.com/damienaicheh/azure-devops-rocket-chat) repository for more informations!

## Basic usage

When Rocket Chat is correctly set up (see the tutorial link in the Github repository), send hook notification like this:

```yml
- task: RocketChatHookNotification@1
  inputs:
    hookUrl: 'YOUR_SERVER_URL/YOUR_HOOK_TOKEN'
    message: 'Your custom message'
    username: 'Bot Name' # Optional
    attachmentTitle: 'Title' # Optional
    attachmentTitleLink: 'https://www.mysite.com' # Optional
    attachmentText: 'This is for...' # Optional
    attachmentColor: '#00FF00' # Optional
    attachmentImageUrl: 'https://open.rocket.chat/avatar/rocket.cat.jpg' # Optional
```