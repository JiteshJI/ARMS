export class ConfigRaw {
  keyNme: string;
  value: string;

  static CreateNotification(notificationTxt: string): ConfigRaw {
    var notif: ConfigRaw = {
      keyNme: 'notification',
      value: notificationTxt,
    };
    return notif;
  }
};
