export function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function fmtPrice(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n) + " ₽";
}

export function ruDate(d: Date, opts?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("ru-RU", opts ?? { day: "numeric", month: "long" }).format(d);
}

/* Пн–Сб 9:00–21:00, Вс 9:00–18:00 */
export function openState(now: Date = new Date()) {
  const day = now.getDay(); // 0 = вс
  const closeHour = day === 0 ? 18 : 21;
  const mins = now.getHours() * 60 + now.getMinutes();
  const open = mins >= 9 * 60 && mins < closeHour * 60;
  const days = ["воскресенье", "понедельник", "вторник", "среду", "четверг", "пятницу", "субботу"];
  if (open) {
    return { open: true, label: `Открыто · сегодня до ${closeHour}:00` };
  }
  if (mins < 9 * 60) {
    return { open: false, label: `Закрыто · откроемся сегодня в 9:00` };
  }
  const next = day === 0 ? "понедельник" : day === 6 ? "воскресенье" : days[day + 1];
  return { open: false, label: `Закрыто · откроемся в ${next} в 9:00` };
}

export function hoursFor(day: number) {
  return day === 0 ? "9:00–18:00" : "9:00–21:00";
}

export const DAY_NAMES = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
