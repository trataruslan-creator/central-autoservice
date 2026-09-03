export const MONTHS_SHORT = ["ЯНВ", "ФЕВ", "МАР", "АПР", "МАЙ", "ИЮН", "ИЮЛ", "АВГ", "СЕН", "ОКТ", "НОЯ", "ДЕК"];

export function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function ruDate(d: Date, opts?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("ru-RU", opts ?? { day: "numeric", month: "long" }).format(d);
}

export function fmtPrice(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n) + " ₽";
}

export function fmtKm(n: number) {
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(n) + " км";
}

/* ---------------- маршруты ---------------- */

export interface City {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export const CITIES: City[] = [
  { id: "msk", name: "Москва", lat: 55.75, lon: 37.62 },
  { id: "spb", name: "Санкт-Петербург", lat: 59.94, lon: 30.31 },
  { id: "kzn", name: "Казань", lat: 55.79, lon: 49.12 },
  { id: "sochi", name: "Сочи", lat: 43.6, lon: 39.73 },
  { id: "mvody", name: "Минеральные Воды", lat: 44.21, lon: 43.14 },
  { id: "ekb", name: "Екатеринбург", lat: 56.84, lon: 60.61 },
  { id: "nsk", name: "Новосибирск", lat: 55.03, lon: 82.92 },
  { id: "irk", name: "Иркутск (Байкал)", lat: 52.29, lon: 104.28 },
  { id: "vlk", name: "Владивосток", lat: 43.12, lon: 131.89 },
  { id: "mrm", name: "Мурманск", lat: 68.97, lon: 33.08 },
];

function haversineKm(a: City, b: City) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

export interface RouteInfo {
  km: number;
  hours: number;
  days: number;
  fuel: number;
  fuelCost: number;
}

export function routeInfo(from: City, to: City): RouteInfo {
  const straight = haversineKm(from, to);
  const km = Math.round(straight * 1.32); // дорожный коэффициент
  const hours = km / 82; // средняя техническая скорость с заправками
  const days = Math.max(1, Math.ceil(hours / 8)); // 8 часов за рулём в день
  const fuel = Math.round((km * 9.2) / 100);
  const fuelCost = Math.round(fuel * 62);
  return { km, hours, days, fuel, fuelCost };
}

/* ---------------- сезоны ---------------- */

export interface SeasonInfo {
  name: string;
  note: string;
  label: string;
  tone: "amberstar" | "nebula" | "skyc" | "flare";
}

export function seasonInfo(d: Date): SeasonInfo {
  const m = d.getMonth();
  if (m === 11 || m <= 1) {
    return {
      name: "Зимний драйв",
      note: "Лёд Байкала и снежные коридоры Эльбруса. Обязательны шипы, а в колонне всегда едет техничка с тросом и лопатами",
      label: "лёд и снег",
      tone: "skyc",
    };
  }
  if (m === 2 || m === 3) {
    return {
      name: "Межсезонье",
      note: "Перевалы только открываются: днём сухо, на теневых участках лёд. Самые красивые туманы в долинах — именно сейчас",
      label: "перевалы открываются",
      tone: "flare",
    };
  }
  if (m >= 4 && m <= 7) {
    return {
      name: "Большой сезон",
      note: "Сухой асфальт от Сочи до Хунзаха, все перевалы открыты, световой день до полуночи. Лучшее время для первой экспедиции",
      label: "сухой асфальт",
      tone: "nebula",
    };
  }
  return {
    name: "Золотая осень",
    note: "Клёны на серпантинах, прозрачный воздух и пустые дороги. Фотоэкипажи бронируют сентябрь за полгода",
    label: "золотые серпантины",
    tone: "amberstar",
  };
}

/* ---------------- ближайший заезд ---------------- */

export function daysTo(iso: string) {
  const now = new Date();
  const target = new Date(iso);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86_400_000));
}
