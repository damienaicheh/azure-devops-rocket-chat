"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var task = require("azure-pipelines-task-lib/task");
var https = require('https');
var HookConfig = /** @class */ (function () {
    function HookConfig(hookUrl, username, message) {
        this.hookUrl = hookUrl;
        this.username = username;
        this.message = message;
    }
    return HookConfig;
}());
exports.HookConfig = HookConfig;
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var hookUrl, message, username, config, attachmentTitleLink, attachmentImageUrl, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    hookUrl = task.getInput('hookUrl', true);
                    if (hookUrl == undefined) {
                        task.setResult(task.TaskResult.Failed, 'Hook Url is mandatory');
                        return [2 /*return*/];
                    }
                    message = task.getInput('message', true);
                    if (message == undefined) {
                        task.setResult(task.TaskResult.Failed, 'Message is mandatory');
                        return [2 /*return*/];
                    }
                    username = task.getInput('username', false);
                    config = new HookConfig(hookUrl, username, message);
                    attachmentTitleLink = task.getInput('attachmentTitleLink', false);
                    if (attachmentTitleLink && !isValidHttpUrl(attachmentTitleLink)) {
                        task.setResult(task.TaskResult.Failed, 'The attachment is not a valid url, it must start with http or https.');
                        return [2 /*return*/];
                    }
                    else {
                        config.attachmentTitleLink = attachmentTitleLink;
                    }
                    config.attachmentTitle = task.getInput('attachmentTitle', false);
                    config.attachmentText = task.getInput('attachmentText', false);
                    attachmentImageUrl = task.getInput('attachmentImageUrl', false);
                    if (attachmentImageUrl && !isValidHttpUrl(attachmentImageUrl)) {
                        task.setResult(task.TaskResult.Failed, 'The attachment image url is not a valid url, it must start with http or https.');
                        return [2 /*return*/];
                    }
                    else {
                        config.attachmentImageUrl = attachmentImageUrl;
                    }
                    config.attachmentColor = task.getInput('attachmentColor', false);
                    return [4 /*yield*/, send(config)];
                case 1:
                    _a.sent();
                    task.setResult(task.TaskResult.Succeeded, 'The notification was successfully sent.');
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    task.setResult(task.TaskResult.Failed, err_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function isValidHttpUrl(value) {
    var url;
    try {
        url = new URL(value);
    }
    catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}
function send(config) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var data = JSON.stringify({
                        "username": config.username,
                        "text": config.message,
                        "attachments": [{
                                "title": config.attachmentTitle,
                                "title_link": config.attachmentTitleLink,
                                "text": config.attachmentText,
                                "color": config.attachmentColor,
                                "image_url": config.attachmentImageUrl,
                            }]
                    });
                    var url = new URL(config.hookUrl);
                    var options = {
                        hostname: url.hostname,
                        port: url.port,
                        path: url.pathname,
                        method: 'POST'
                    };
                    var req = https.request(options, function (res) {
                        res.on('data', function (d) {
                            process.stdout.write(d);
                        });
                    });
                    req.on('end', function () {
                        try {
                            resolve(JSON.parse(data));
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                    req.on('error', function (error) {
                        console.error(error);
                        reject(error);
                    });
                    req.write(data);
                    req.end();
                })];
        });
    });
}
run();
