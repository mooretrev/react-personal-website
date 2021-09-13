import cron from 'node-cron';
import saveTradeData from './scheduledTasks/saveTradeData';

export default function scheduleTasks(): void {
  cron.schedule('7 15 * * 1-5', saveTradeData);
}
