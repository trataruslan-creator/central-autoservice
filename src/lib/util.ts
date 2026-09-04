export function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function fmtPrice(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n) + " ₽";
}

export function ruDate(d: Date, opts?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("ru-RU", opts ?? { day: "numeric", month: "long" }).format(d);
}

/* Пн–Сб 9:00–20:00, Вс — выходной */
export function openState(now: Date = new Date()) {
  const day = now.getDay(); // 0 = вс
  const mins = now.getHours() * 60 + now.getMinutes();
  const days = ["воскресенье", "понедельник", "вторник", "среду", "четверг", "пятницу", "субботу"];
  if (day === 0) {
    return { open: false, label: "Закрыто · воскресенье выходной, ждём вас в понедельник с 9:00" };
  }
  const open = mins >= 9 * 60 && mins < 20 * 60;
  if (open) {
    return { open: true, label: "Открыто · сегодня до 20:00" };
  }
  if (mins < 9 * 60) {
    return { open: false, label: "Закрыто · откроемся сегодня в 9:00" };
  }
  const next = day === 6 ? "понедельник" : days[day + 1];
  return { open: false, label: `Закрыто · откроемся в ${next} в 9:00` };
}

export function hoursFor(day: number) {
  return day === 0 ? "выходной" : "9:00–20:00";
}

export const DAY_NAMES = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
