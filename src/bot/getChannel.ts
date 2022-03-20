import { client } from '.';

export const getFirstsChannel = () => {
  const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL);

  if (channel?.isText()) {
    return channel;
  } else throw new Error('Bot is configured to use non-text channel');
};
export const getLogChannel = () => {
  const channel = client.channels.cache.get(process.env.DISCORD_LOG_CHANNEL);

  if (channel?.isText()) {
    return channel;
  } else throw new Error('Bot is configured to use non-text channel');
};
