import { App, ExpressReceiver } from "@slack/bolt";
import * as awsServerlessExpress from "aws-serverless-express";
import { APIGatewayProxyEvent, Context } from "aws-lambda";

const processBeforeResponse = true;

const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET ?? "",
  processBeforeResponse,
});
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: expressReceiver,
  processBeforeResponse,
});

const server = awsServerlessExpress.createServer(expressReceiver.app);
export const handler = (
  event: APIGatewayProxyEvent,
  context: Context
): void => {
  awsServerlessExpress.proxy(server, event, context);
};

app.message("hello", async ({ message, say }) => {
  await say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Hey there <@${message.user}>!`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click Me",
          },
          action_id: "button_click",
        },
      },
    ],
    text: `Hey there <@${message.user}>!`,
  });
});

app.action("button_click", async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

if (process.env.IS_LOCAL === "true") {
  (async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log("⚡️ Bolt app is running!");
  })();
}
