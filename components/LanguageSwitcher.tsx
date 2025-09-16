import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLocalization();

  const inactiveClasses = "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white";
  const activeClasses = "bg-indigo-500 text-white";

  return (
    <div className="flex rounded-md shadow-sm" role="group">
      <button
        type="button"
        className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-colors duration-200 ${locale === 'en' ? activeClasses : inactiveClasses}`}
        onClick={() => setLocale('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-colors duration-200 ${locale === 'ar' ? activeClasses : inactiveClasses}`}
        onClick={() => setLocale('ar')}
      >
        AR
      </button>
    </div>
  );
};

export default LanguageSwitcher;
