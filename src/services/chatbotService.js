import request from "request";

require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        recipient: {
            id: sender_psid,
        },
        message: response,
    };

    // Send the HTTP request to the Messenger Platform
    request(
        {
            uri: "https://graph.facebook.com/v9.0/me/messages",
            qs: { access_token: PAGE_ACCESS_TOKEN },
            method: "POST",
            json: request_body,
        },
        (err, res, body) => {
            if (!err) {
                console.log("message sent!");
            } else {
                console.error("Unable to send message:" + err);
            }
        }
    );
};

let getUserName = (sender_psid) => {
    return new Promise((resolve, reject) => {
        request(
            {
                uri: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
                method: "GET",
            },
            (err, res, body) => {
                if (!err) {
                    body = JSON.parse(res);

                    let username = `${responds.last_name} ${responds.first_name}`;
                    resolve(username);
                } else {
                    console.error("Unable to send message:" + err);
                    reject(err);
                }
            }
        );
    });
};

let handleGetStarted = async (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getUserName(sender_psid);
            let response = {
                text: `Xin chào ${username}. Chào mừng bạn đến với page của mình!`,
            };
            await callSendAPI(sender_psid, response);
            resolve("Done!");
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleGetStarted: handleGetStarted,
};
