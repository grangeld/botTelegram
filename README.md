# telegram-spam-bot
Node.js Telegram Chatbot handling spam messages.

## Getting Started

#### 1. Install npm packages
```
npm install
```

#### 2. Set telegram bot token
Set your telegram bot token in a `src/config/index.ts`.
(How do I get a token?: see [Telegram bot api guide](https://core.telegram.org/bots/api).)
```javascript
export const BOT_TOKEN = ${your_telegram_bot_token};
```

#### 3. Set prohibited words
Set the word that the bot will delete to `src/config/black-list.json`.
```json
{
  "rules":[
    "aaa", // Delete messages containing "aaa"
  ],
}
```

#### 4. Set (Optional)
You can set it to only allow certain URLs to prevent sharing of dangerous links.
Set the URL in a `src/config/white-list.json`
```json
{
  "rules":[
    "www.safesite.com"
  ]
}
```
And change `ENABLE_KICK_URL` to true. (`src/config/index.ts`)
```javascript
export const ENABLE_KICK_URL = true; // default -> false
```

#### 5. Run Bot 
```shell
npm run start

```

> The bot must have administrator privileges.