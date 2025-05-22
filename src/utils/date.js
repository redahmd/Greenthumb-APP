import moment from "moment";
import 'moment/locale/fr';

export function formatDateGroup(date) {
  const now = moment();
  const msgDate = moment(date);

  if (msgDate.isSame(now, 'day')) return "Aujourd’hui";
  if (msgDate.isSame(now.clone().subtract(1, 'day'), 'day')) return "Hier";
  return msgDate.format("dddd D MMMM YYYY"); // ex : Lundi 20 Mai 2025
}
