import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getActiveProducts } from "@/lib/products";

// نجيب المنتجات من قاعدة البيانات في كل طلب (بيانات حيّة)
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getActiveProducts();

  return (
    <>
      <Hero />

      {/* ليه تشتري مننا */}
      <section id="why" className="border-y border-line bg-surface/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Feature
  title="منتجات موثوقة"
  desc="كل منتج معروض بعد ما اتأكّدنا من جودته — تشتري وانت مطمّن."
  icon="✅"
/>
            <Feature
  title="تتبّع طلبك بسهولة"
  desc="اعرف حالة طلبك خطوة بخطوة من لحظة الشراء لحد الاستلام."
  icon="📦"
/>
            <Feature
  title="دفع سهل وآمن"
  desc="حوّل بأورنج كاش وارفع إثبات الدفع، ونأكّدلك طلبك بسرعة."
  icon="💳"
/>
          </div>
        </div>
      </section>

      {/* شبكة المنتجات */}
      <section id="products" className="scroll-mt-20 bg-bg">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-8">
            <span className="inline-flex items-center rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-semibold text-brand-300">
              المتجر
            </span>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <h2 className="flex items-center gap-2 text-2xl font-extrabold text-fg sm:text-3xl">
                  <span aria-hidden="true">🛍️</span> منتجاتنا
                </h2>
                <p className="mt-1 text-muted">
                  اختار منتجك وضيفه للسلة في ثواني.
                </p>
              </div>
              <span className="tnum shrink-0 rounded-full border border-line bg-surface px-3 py-1 text-sm font-semibold text-brand-300">
                {products.length} منتج
              </span>
            </div>
          </div>

          <ProductGrid products={products} />
        </div>
      </section>
    </>
  );
}

function Feature({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brand-600/50">
      <div className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-surface-2 text-2xl">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-bold text-fg">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{desc}</p>
    </div>
  );
}
