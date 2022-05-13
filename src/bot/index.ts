import { BOT_TOKEN, ENABLE_KICK_URL } from '../config';
import { ChatMember, Message } from 'node-telegram-bot-api';

const botMessage: any = require('../config/bot-message.json');
const blackList: string[] = require('../config/black-list.json').rules;
const whiteList: string[] = require('../config/white-list.json').rules;

function telegramBotStart () {
    const TelegramBot = require('node-telegram-bot-api');
    const bot = new TelegramBot(BOT_TOKEN, { polling: true });
    let chatId: number;
    let administrators: ChatMember[];

    bot.on('polling_error', (error: Error) => {
        console.error(error.stack);
        process.exit();
    });
    bot.on('message', _inspectText);
    bot.on('edited_message', _inspectText);

    async function _inspectText(msg: Message) {
        await _initChatConfig(msg);
        if (!_isAdmin(msg.chat.id, msg.from.id)) {
            _checkMessage(msg);
        }
    }

    async function _initChatConfig(msg: Message) {
        if (!chatId) chatId = msg.chat.id;
        if (chatId && !administrators) administrators = await bot.getChatAdministrators(chatId);
    }

    function _isAdmin(_chatId: number, userId: number) {
        if (chatId === _chatId) {
            return administrators.some((chatMember: ChatMember) => chatMember.user.id === userId);
        }

        return false;
    }


    function _checkMessage(msg: Message) {
        const reg: RegExp = new RegExp(blackList.join('|'), 'gi');
        if (blackList.length && reg.test(msg.text)) {
            _banAndKick(msg);
        }

        if (ENABLE_KICK_URL && msg.entities){
            msg.entities.forEach((item: any) => {
                if (item.type === 'url'){
                    const url: string = msg.text.substr(item.offset, item.length)
                        .replace(/http\:\/\/|https\:\/\//gi, '');

                    const isGoodUrl: boolean = new RegExp(whiteList.join('*|')).test(url);

                    if (!isGoodUrl) {
                        _banAndKick(msg);
                    }
                }
            });
        }
    }

    function _banAndKick(msg: Message) {
        const {first_name, last_name} = msg.from;
        const chatId = msg.chat.id;
        const userId = msg.message_id;
        const message: string = botMessage.kick.delete;

        bot.deleteMessage(chatId, userId);
        bot.sendMessage(chatId, `👮️ ${first_name} ${last_name} ${message}`);
    }
}

export default telegramBotStart;