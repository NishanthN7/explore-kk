"use client";
import { Languages } from "lucide-react";
import { useLanguage, type Language } from "@/lib/i18n";
export default function LanguageSelector(){
 const {language,setLanguage,t}=useLanguage();
 return <label className="language-select" title={t("language")}><Languages size={15}/><select value={language} onChange={e=>setLanguage(e.target.value as Language)} aria-label={t("language")}><option value="en">{t("english")}</option><option value="ta">{t("tamil")}</option><option value="hi">{t("hindi")}</option></select></label>
}
