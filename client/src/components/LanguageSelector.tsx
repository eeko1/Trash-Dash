import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
   <div className='flex space-x-2 self-end mt-4 mb-2 px-4'>
  {['fi', 'en', 'sv'].map((lang) => (
    <button
      key={lang}
      className={`px-2 py-2 text-l ${
        i18n.language === lang
          ? 'bg-main_medium_turquoise rounded'
          : 'hover:bg-main_medium_turquoise/50 rounded'
      }`}
      onClick={() => i18n.changeLanguage(lang)}
      title={lang.toUpperCase()}
    >
      {lang.toUpperCase()}
    </button>
  ))}
</div>
  );
};

export default LanguageSelector;