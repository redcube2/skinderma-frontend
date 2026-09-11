import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  PAYMENT_METHODS,
  SHIPPING_CZ_HU,
  SHIPPING_SK,
  withThreshold,
  type Method,
} from "@/lib/delivery";

/**
 * Locale-parametrised shipping/payment page.
 *
 * Prices and the method list come from lib/delivery.ts, the wording from the
 * locale dictionary — so a price change is one edit and all three languages
 * move with it.
 */

type LabelledRow = { label: string; note?: string; value: string };

function Row({ row }: { row: LabelledRow }) {
  return (
    <li className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-x-4 sm:gap-y-1">
      <div className="min-w-0">
        <div className="break-words font-medium text-navy">{row.label}</div>
        {row.note && (
          <div className="break-words text-xs text-brand-gray">{row.note}</div>
        )}
      </div>
      <div className="font-semibold text-gold sm:text-right">{row.value}</div>
    </li>
  );
}

export default function DeliveryPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).delivery;

  /** Join a fact (price) with its translated name. */
  function toRows<Id extends string>(
    methods: Method<Id>[],
    labels: Record<Id, { label: string; note?: string }>
  ): LabelledRow[] {
    return methods.map((m) => ({
      label: labels[m.id].label,
      note: labels[m.id].note,
      value: m.price ?? t.free,
    }));
  }

  const sk = toRows(SHIPPING_SK, t.methods);
  const czhu = toRows(SHIPPING_CZ_HU, t.methods);
  const payment = toRows(PAYMENT_METHODS, t.payments);

  return (
    <section className="container-page py-12 md:py-16">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        {t.eyebrow}
      </span>
      <h1 className="mt-2 text-4xl font-bold text-navy md:text-5xl">
        {t.title}
      </h1>
      <p className="mt-4 max-w-2xl text-brand-gray">{t.intro}</p>

      <div className="mt-10 rounded-2xl border border-cream-dark/60 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-navy">{t.shippingHeading}</h2>

        <div className="mt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-gray">
            {t.countrySk}
          </h3>
          <ul className="mt-3 divide-y divide-cream-dark/60">
            {sk.map((r) => (
              <Row key={r.label} row={r} />
            ))}
          </ul>
          <p className="mt-2 text-xs text-brand-gray">{t.noFreeShippingSk}</p>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-gray">
            {t.countryCzHu}
          </h3>
          <ul className="mt-3 divide-y divide-cream-dark/60">
            {czhu.map((r) => (
              <Row key={r.label} row={r} />
            ))}
          </ul>
          <p className="mt-2 text-xs text-brand-gray">
            {withThreshold(t.freeShippingCzHu)}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-cream-dark/60 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-navy">{t.paymentHeading}</h2>
        <ul className="mt-4 divide-y divide-cream-dark/60">
          {payment.map((r) => (
            <Row key={r.label} row={r} />
          ))}
        </ul>
        <p className="mt-2 text-xs text-brand-gray">{t.noCod}</p>
      </div>

      <div className="mt-10 rounded-2xl bg-cream p-6 text-sm text-brand-gray">
        <div className="font-semibold text-navy">{t.timeHeading}</div>
        <p className="mt-1">{t.timeBody}</p>
      </div>
    </section>
  );
}
