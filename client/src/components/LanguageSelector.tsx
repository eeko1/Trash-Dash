import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className='flex space-x-2 self-end mt-4 mb-2 px-4'>
      <span
        className={`cursor-pointer text-l px-2 py-2 ${i18n.language === 'fi' ? 'bg-main_medium_turquoise rounded' : 'hover:bg-main_medium_turquoise/50 rounded'}`}
        onClick={() => i18n.changeLanguage('fi')}
        title='Suomi'
      >FI</span>
      <span
        className={`cursor-pointer text-l px-2 py-2 ${i18n.language === 'en' ? 'bg-main_medium_turquoise rounded' : 'hover:bg-main_medium_turquoise/50 rounded'}`}
        onClick={() => i18n.changeLanguage('en')}
        title='English'
      >EN</span>
      <span
        className={`cursor-pointer text-l px-2 py-2  ${i18n.language === 'sv' ? 'bg-main_medium_turquoise rounded' : 'hover:bg-main_medium_turquoise/50 rounded'}`}
        onClick={() => i18n.changeLanguage('sv')}
        title='Svenska'
      >SV</span>
    </div>
  );
};

export default LanguageSelector;