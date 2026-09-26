import { useState, useEffect } from "react";
import { IconCheck, IconStar } from "./Icons";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
}

export function ReviewModal({ open, onClose }: ReviewModalProps) {
  const [form, setForm] = useState({ name: "", rating: 5, text: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const set = (k: keyof typeof form, v: string | number) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Введите имя";
    if (form.text.trim().length < 10) errs.text = "Отзыв должен быть не короче 10 символов";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    setTimeout(() => {
      const reviews = JSON.parse(localStorage.getItem("aps_reviews") || "[]");
      const newReview: Review = {
        id: Date.now().toString(),
        name: form.name,
        rating: form.rating,
        text: form.text,
        date: new Date().toLocaleDateString("ru-RU"),
      };
      reviews.unshift(newReview);
      localStorage.setItem("aps_reviews", JSON.stringify(reviews));
      setStatus("done");
      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", rating: 5, text: "" });
        onClose();
      }, 1500);
    }, 800);
  };

  if (!open) return null;

  const inputCls = (err?: string) =>
    `w-full border bg-ink-950 px-4 py-3.5 text-sm text-star outline-none transition-colors duration-300 placeholder:text-mutd/60 focus:border-amber ${
      err ? "border-warn/70" : "border-linedark"
    }`;

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="anim-fadeup relative max-h-[92vh] w-full max-w-lg overflow-y-auto border border-linedark bg-ink-900 shadow-2xl shadow-black/50">
        <div className="hazard h-1.5" />
        <div className="flex items-center justify-between border-b border-linedark px-6 py-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mutd">Оставить отзыв</p>
          <button onClick={onClose} className="relative h-8 w-8 text-mutd transition-colors hover:text-amber">
            <span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
            <span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
          </button>
        </div>

        {status === "done" ? (
          <div className="anim-fadeup px-6 py-12 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center border-2 border-go text-go">
              <IconCheck className="h-8 w-8" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-semibold uppercase tracking-wide">Спасибо за отзыв!</h3>
            <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-mutd">
              Ваш отзыв успешно добавлен. Мы ценим обратную связь от наших клиентов.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-4 px-6 py-6">
            <div>
              <label htmlFor="rev-name" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-mutd">Ваше имя *</label>
              <input id="rev-name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Иван" className={inputCls(errors.name)} />
              {errors.name && <p className="mt-1.5 text-xs text-warn">{errors.name}</p>}
            </div>

            <div>
              <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-mutd">Оценка *</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => set("rating", star)}
                    className={`transition-all duration-200 ${star <= form.rating ? "text-amber scale-110" : "text-mutd/40 hover:text-mutd"}`}
                  >
                    <IconStar className="h-8 w-8" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="rev-text" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-mutd">Ваш отзыв *</label>
              <textarea
                id="rev-text"
                rows={4}
                value={form.text}
                onChange={(e) => set("text", e.target.value)}
                placeholder="Расскажите о вашем опыте обслуживания..."
                className={`${inputCls(errors.text)} resize-none`}
              />
              {errors.text && <p className="mt-1.5 text-xs text-warn">{errors.text}</p>}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group flex w-full items-center justify-center gap-3 bg-amber px-7 py-4 font-display text-base font-semibold uppercase tracking-[0.06em] text-ink-950 transition-all duration-300 hover:bg-amber2 disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <span className="spin-slow h-4 w-4 rounded-full border-2 border-ink-950/30 border-t-ink-950" style={{ animationDuration: "0.8s" }} />
                  Отправляем…
                </>
              ) : (
                "Отправить отзыв"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function ReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("aps_reviews") || "[]");
    setReviews(stored);
  }, [showModal]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-5 lg:px-8 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-steel">
            Отзывы клиентов
          </p>
          <h2 className="mt-5 font-display text-3xl font-semibold uppercase leading-tight lg:text-[2.6rem]">
            Что говорят о нас
          </h2>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="group flex items-center gap-3 border border-amber px-7 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-amber transition-all duration-300 hover:bg-amber hover:text-ink-950"
        >
          Оставить отзыв
        </button>
      </div>

      {reviews.length === 0 ? (
        <div className="mt-12 border border-linedark bg-ink-950/60 p-12 text-center">
          <p className="text-mutd">Пока нет отзывов. Будьте первым!</p>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.id} className="card-hover border border-linedark bg-ink-950/60 p-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-amber">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <IconStar key={i} className="h-4 w-4" />
                  ))}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mutd">{review.date}</span>
              </div>
              <p className="mt-4 font-display text-base font-semibold">{review.name}</p>
              <p className="mt-3 text-sm leading-relaxed text-mutd">{review.text}</p>
            </div>
          ))}
        </div>
      )}

      <ReviewModal open={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
}
