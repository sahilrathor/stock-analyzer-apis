// export interface TelegramMessageInterface {
//     text: string;
//     parse_mode?: string;
//     reply_markup?: {
//         inline_keyboard: {
//             text: string;
//             url: string;
//         }[];
//     }[];
// }


export interface TelegramMessageInterface {
    text: string;
    parse_mode?: string;
    reply_markup?: {
        inline_keyboard: Array<{ text: string; url: string }[]>;
    };
}

export interface TelegramMessagePayloadInterface {
    chat_id: string;
    text: string;
    parse_mode?: string;
    reply_markup?: {
        inline_keyboard: Array<{ text: string; url: string }[]>;
    };
}