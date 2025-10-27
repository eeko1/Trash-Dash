import { useTranslation } from 'react-i18next';

const RecydleGuide = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className='text-center text-2xl font-bold font-sans mb-2'>
                <h3>{t('How to play')}</h3>
            </div>
            <div className=''>
                <p className='mb-2 text-black-700 font-sans'>{t('Guide')}</p>
            </div>
        </>
    )
}

export default RecydleGuide
