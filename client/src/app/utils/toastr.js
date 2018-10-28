import { NotificationManager } from 'react-notifications';

export default {
    info: msg => NotificationManager.info(msg),
    success: msg => NotificationManager.success(msg),
    error: msg => NotificationManager.error(msg),
    warning: msg => NotificationManager.warning(msg),
};
