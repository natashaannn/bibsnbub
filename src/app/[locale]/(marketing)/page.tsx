import { getTranslations } from 'next-intl/server';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Index' });

  return (
    <div className="py-5 text-xl">
      <h1 className="text-3xl font-bold">{t('meta_title')}</h1>
      <p className="mt-4">{t('meta_description')}</p>
    </div>
  );
}
