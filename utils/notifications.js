import notifee from '@notifee/react-native';

const scheduleReminder = async (linkId, days) => {
  await notifee.requestPermission();
  
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.createTriggerNotification({
    title: 'Link Reminder',
    body: 'You wanted to check this link again!',
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  }, {
    timestamp: Date.now() + (days * 24 * 60 * 60 * 1000),
  });
};