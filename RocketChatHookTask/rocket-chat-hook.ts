import task = require('azure-pipelines-task-lib/task');
const https = require('https');

export class HookConfig {
    hookUrl: string;
    username: string;
    message: string;
    attachmentTitle: string;
    attachmentTitleLink: string;
    attachmentText: string;
    attachmentImageUrl: string;
    attachmentColor: string;

    constructor(
        hookUrl: string,
        username: string,
        message: string) {
        this.hookUrl = hookUrl;
        this.username = username;
        this.message = message;
    }
}

async function run() {
    try {
        const hookUrl: string | undefined = task.getInput('hookUrl', true);
        if (hookUrl == undefined) {
            task.setResult(task.TaskResult.Failed, 'Hook Url is mandatory');
            return;
        }

        const message: string | undefined = task.getInput('message', true);
        if (message == undefined) {
            task.setResult(task.TaskResult.Failed, 'Message is mandatory');
            return;
        }

        const username: string | undefined = task.getInput('username', false);

        const config = new HookConfig(hookUrl, username, message);

        const attachmentTitleLink: string | undefined = task.getInput('attachmentTitleLink', false);
        if (attachmentTitleLink && !isValidHttpUrl(attachmentTitleLink)) {
            task.setResult(task.TaskResult.Failed, 'The attachment is not a valid url, it must start with http or https.');
            return;
        } else {
            config.attachmentTitleLink = attachmentTitleLink;
        }

        config.attachmentTitle = task.getInput('attachmentTitle', false);
        config.attachmentText = task.getInput('attachmentText', false);

        const attachmentImageUrl: string | undefined = task.getInput('attachmentImageUrl', false);
        if (attachmentImageUrl && !isValidHttpUrl(attachmentImageUrl)) {
            task.setResult(task.TaskResult.Failed, 'The attachment image url is not a valid url, it must start with http or https.');
            return;
        } else {
            config.attachmentImageUrl = attachmentImageUrl;
        }

        config.attachmentColor = task.getInput('attachmentColor', false);

        await send(config);

        task.setResult(task.TaskResult.Succeeded, 'The notification was successfully sent.');
    }
    catch (err) {
        task.setResult(task.TaskResult.Failed, err.message);
    }
}

function isValidHttpUrl(value: string) {
    let url;

    try {
        url = new URL(value);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

async function send(config: HookConfig): Promise<any> {

    return new Promise<any>((resolve, reject) => {

        const data = JSON.stringify(
            {
                "username": config.username,
                "text": config.message,
                "attachments": [{
                    "title": config.attachmentTitle,
                    "title_link": config.attachmentTitleLink,
                    "text": config.attachmentText,
                    "color": config.attachmentColor,
                    "image_url": config.attachmentImageUrl,
                }]
            })

        const url = new URL(config.hookUrl);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname,
            method: 'POST'
        };

        const req = https.request(options, (res) => {
            res.on('data', (d) => {
                process.stdout.write(d)
            })
        })

        req.on('end', () => {
            try {
                resolve(JSON.parse(data))
            }
            catch (e) {
                reject(e);
            }
        });

        req.on('error', (error) => {
            console.error(error);
            reject(error);
        })

        req.write(data)
        req.end()

    });
}

run();



