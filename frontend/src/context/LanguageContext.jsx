import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { translations } from "../data/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    () => sessionStorage.getItem("navigo_language") || "en"
  );

  useEffect(() => {
    sessionStorage.setItem("navigo_language", language);

    document.documentElement.lang =
      language === "te" ? "te" : "en";
  }, [language]);

  const value = {
    language,
    setLanguage,
    strings: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () =>
  useContext(LanguageContext);