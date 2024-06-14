const { RtcTokenBuilder, RtcRole, RtmTokenBuilder, ChatTokenBuilder } = require('agora-token');
const config = require('../config/config');
const { default: axios } = require('axios');

const APP_ID = config.agora.appId;
const APP_CERTIFICATE = config.agora.appCertificate;
const AGORA_CHAT_APP_NAME = config.agora.chatAppName;
const AGORA_CHAT_ORG_NAME = config.agora.chatOrgName;
const AGORA_CHAT_BASE_URL = config.agora.chatBaseUrl;
const AGORA_CUSTOMER_KEY = config.agora.customerKey;
const AGORA_CUSTOMER_SECRET = config.agora.customerSecret;
const agoraChatTokenExpireTime = 3600;

/**
 *
 * @param {Object} params
 * @param {string} params.channel
 * @param {string} params.role
 * @param {string} params.token_type
 * @param {string} params.uid
 * @param {string} expiry
 * @returns {string} token
 */

const generateRTCToken = (params, expiry) => {
  const channelName = params.channel;
  const { uid } = params;

  let role;

  if (params.role === 'publisher') {
    role = RtcRole.PUBLISHER;
  } else if (params.role === 'audience') {
    role = RtcRole.SUBSCRIBER;
  }
  // get the expire time
  let expireTime = expiry;
  if (!expireTime || expireTime === '') {
    expireTime = 3600;
  } else {
    expireTime = parseInt(expireTime, 10);
  }

  // calculate privilege expire time
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;
  // build the token

  let token;

  if (params.token_type === 'user_account') {
    token = RtcTokenBuilder.buildTokenWithAccount(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
  } else if (params.token_type === 'uid') {
    token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
  }

  // return the token
  return token;
};

/**
 * @param {Object} params
 * @param {string} params.uid
 * @param {string} expiry
 * @returns {string} token
 */

const generateRTMToken = (params, expiry) => {
  const { uid } = params;

  // get the expire time
  let expireTime = expiry;
  if (!expireTime || expireTime === '') {
    expireTime = 3600;
  } else {
    expireTime = parseInt(expireTime, 10);
  }
  // calculate privilege expire time
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;

  // build the token
  const token = RtmTokenBuilder.buildToken(APP_ID, APP_CERTIFICATE, uid, privilegeExpireTime);

  return token;
};

/**
 *
 * @param {Object} params
 * @param {string} params.channel
 * @param {string} params.role
 * @param {string} params.token_type
 * @param {string} params.uid
 * @param {string} expiry
 * @returns {Object} token
 * @returns {string} token.rtcToken
 * @returns {string} token.rtmToken
 */

const generateRTEToken = (params, expiry) => {
  const channelName = params.channel;

  const { uid } = params;

  let role;

  if (params.role === 'publisher') {
    role = RtcRole.PUBLISHER;
  } else if (params.role === 'audience') {
    role = RtcRole.SUBSCRIBER;
  }

  // get the expire time
  let expireTime = expiry;
  if (!expireTime || expireTime === '') {
    expireTime = 3600;
  } else {
    expireTime = parseInt(expireTime, 10);
  }

  // calculate privilege expire time
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;
  // build the token

  const rtcToken = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
  const rtmToken = RtmTokenBuilder.buildToken(APP_ID, APP_CERTIFICATE, uid, role, privilegeExpireTime);

  return {
    rtcToken,
    rtmToken,
  };
};

const generateChatToken = () => {
  return ChatTokenBuilder.buildAppToken(APP_ID, APP_CERTIFICATE, agoraChatTokenExpireTime);
};

const generateChatUserinAgora = async (user, password) => {
  try {
    const chatAppToken = generateChatToken();
    const chatUser = {
      username: user.id,
      password: password,
      nickname: 'username',
    };


    const chatUserResponse = await axios.post(
      `https://${AGORA_CHAT_BASE_URL}/${AGORA_CHAT_ORG_NAME}/${AGORA_CHAT_APP_NAME}/users`,
      JSON.stringify(chatUser),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${chatAppToken}`,
        },
      }
    );
   
    if (chatUserResponse?.status !== 200) {
      throw new Error('Error creating chat user');
    } else if (chatUserResponse?.data?.entities?.length !== 0) {
      return chatUserResponse?.data?.entities[0];
    } else {
      throw new Error('Error creating chat user');
    }
  } catch (error) {
    throw error;
  }
};

const getNumberOfUsersInChannel = async (channelName) => {
  try {
    if (!channelName) {
      throw new Error('Channel name is required');
    }
    const plainCredential = AGORA_CUSTOMER_KEY + ':' + AGORA_CUSTOMER_SECRET;

    // Encode with base64
    encodedCredential = Buffer.from(plainCredential).toString('base64');
    authorizationField = 'Basic ' + encodedCredential;

    const apiRes = await axios.get(`https://api.agora.io/dev/v1/channel/${APP_ID}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorizationField,
      },
    });

    if (apiRes?.status !== 200) {

      return 0;
      // throw new Error('Error getting number of users in channel');
    } else if (apiRes?.data?.data?.channels?.length !== 0) {
      const userCount = apiRes?.data?.data?.channels.find((channel) => channel.channel_name === channelName)?.user_count;
      if (userCount) {
        return userCount;
      } else {
        return 0;
      }
    } else {
      // throw new Error('Error getting number of users in channel');
      return 0;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateRTCToken,
  generateRTMToken,
  generateRTEToken,
  generateChatToken,
  generateChatUserinAgora,
  getNumberOfUsersInChannel,
};
