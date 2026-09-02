const SYNODIC = 29.530588853;

export interface MoonState {
  phase: number; // 0 = новолуние, 0.5 = полнолуние
  illum: number; // 0..1 освещённость диска
  name: string;
  short: string;
}

const NAMES: Array<[number, string, string]> = [
  [0.03, "Новолуние", "новолуние"],
  [0.22, "Растущий серп", "раст. серп"],
  [0.28, "Первая четверть", "I четверть"],
  [0.47, "Растущая Луна", "растущая"],
  [0.53, "Полнолуние", "полнолуние"],
  [0.72, "Убывающая Луна", "убывающая"],
  [0.78, "Последняя четверть", "III четверть"],
  [1.01, "Старый серп", "старый серп"],
];

export function moonPhase(date: Date): MoonState {
  const ref = Date.UTC(2000, 0, 6, 18, 14);
  const days = (date.getTime() - ref) / 86400000;
  let phase = (days % SYNODIC) / SYNODIC;
  if (phase < 0) phase += 1;
  const illum = (1 - Math.cos(2 * Math.PI * phase)) / 2;
  let name = "Новолуние";
  let short = "новолуние";
  for (const [limit, n, s] of NAMES) {
    if (phase < limit) {
      name = n;
      short = s;
      break;
    }
  }
  return { phase, illum, name, short };
}

export function nextNewMoon(from: Date): Date {
  const { phase } = moonPhase(from);
  const daysToNew = (1 - phase) % 1;
  return new Date(from.getTime() + daysToNew * SYNODIC * 86400000);
}

export interface DarkQuality {
  label: string;
  note: string;
  tone: "nebula" | "amberstar" | "flare";
}

export function darkQuality(illum: number): DarkQuality {
  if (illum < 0.35)
    return {
      label: "Отличная",
      note: "Луна почти не мешает — Млечный Путь виден до самого горизонта",
      tone: "nebula",
    };
  if (illum < 0.65)
    return {
      label: "Хорошая",
      note: "Зодиакальный свет и ядро Галактики различимы без труда",
      tone: "amberstar",
    };
  return {
    label: "Луна мешает",
    note: "Светлое небо — время для планет и двойных звёзд",
    tone: "flare",
  };
}

export function ruDate(d: Date, opts?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("ru-RU", opts ?? { day: "numeric", month: "long" }).format(d);
}

export const MONTHS_SHORT = ["ЯНВ", "ФЕВ", "МАР", "АПР", "МАЙ", "ИЮН", "ИЮЛ", "АВГ", "СЕН", "ОКТ", "НОЯ", "ДЕК"];

export const fmtPrice = (n: number) => new Intl.NumberFormat("ru-RU").format(n) + " ₽";
