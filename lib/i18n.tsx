"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "ta" | "hi";

const translations: Record<Language, Record<string,string>> = {
  en: {
    home:"Home", places:"Places", map:"Map", trip:"My Trip", restaurants:"Restaurants", planTrip:"Plan a Trip",
    discover:"Discover Kanyakumari.", heroKicker:"THE SOUTHERN EDGE OF INDIA", heroSubtitle:"From sunrise over the sea to waterfalls, temples, forests and living heritage — discover Kanyakumari with a better way to explore.", startExploring:"Start exploring", viewMap:"View the map", districtOnly:"Kanyakumari district", liveDirections:"Live directions", savePlaces:"Save your places", whyKicker:"WHY EXPLORE KK", whyTitle:"A simpler way to experience Kanyakumari.", whyText:"Explore KK brings the district into one clear travel guide — discover places, see them on a real map, save favourites, get directions from your live location and build an efficient trip.", startHere:"START HERE", categorySubtitle:"Choose a type of experience. You can always switch back to All places.", categoryExplore:"Explore", featuredKicker:"FEATURED PLACES", featuredSubtitle:"A first selection of places that make Kanyakumari unforgettable.", openMap:"Open map", planKicker:"PLAN YOUR DAY", planTitle:"Turn a list of places into a real trip.", planText:"Save the places you want, use your live location and let Explore KK build an efficient driving order.", buildTrip:"Build my trip", findFood:"Find food", curatedTitle:"Curated places", curatedText:"Useful information for the district’s key attractions, from beaches and temples to waterfalls and heritage sites.", directionTitle:"Directions that start with you", directionText:"Use your live location to get a direct route to any saved destination.", mapTitleShort:"One map, one district", mapText:"See destinations together inside the Kanyakumari district boundary.", details:"Details", placesFound:"places found", showAll:"Show all", locationPermission:"Please allow location access to get directions from your live location.", search:"Search places, beaches, temples, waterfalls...", viewAll:"View all →",
    whatLooking:"What are you looking for?", placesJourney:"Places worth the journey.", browsePlaces:"Browse places", saved:"saved",
    addToTrip:"Add to My Trip", savedToTrip:"Saved to My Trip", ratingUnavailable:"Rating unavailable", openNow:"Open now", closedNow:"Closed now", hoursUnavailable:"Hours unavailable",
    location:"Location", bestSeason:"Best season", timings:"Timings", entry:"Entry", visit:"Visit duration", specialty:"Specialty",
    directions:"Directions", directionsLive:"Directions from my location", fullPlace:"Full place page", useLive:"Use my live location",
    findingLocation:"Finding your location…", liveLocation:"Live location", calculateRoute:"Calculate efficient route", optimizing:"Optimizing route…",
    routeTitle:"Efficient route from your live location", totalDistance:"Total driving distance", drivingTime:"Estimated driving time", stops:"stops",
    viewRoute:"View route here", openGoogle:"View route here", remove:"Remove", noSaved:"No saved places yet. Open Places and add destinations to your trip.",
    days:"Days", budget:"Base budget (₹)", estimatedSpend:"Estimated trip spend", suggested:"Suggested itinerary", day:"Day",
    categoryAll:"All", phaseMap:"INTERACTIVE MAP", mapTitle:"Kanyakumari on one map.", mapSubtitle:"Tap any photo pin to open the complete place card and get directions.",
    language:"Language", english:"English", tamil:"தமிழ்", hindi:"हिन्दी", imageSource:"Image source", coordinates:"Coordinates",
  },
  ta: {
    home:"முகப்பு", places:"இடங்கள்", map:"வரைபடம்", trip:"என் பயணம்", restaurants:"உணவகங்கள்", planTrip:"பயணத்தை திட்டமிடு",
    discover:"கன்னியாகுமரியை கண்டறியுங்கள்.", heroKicker:"இந்தியாவின் தெற்குக் கரை", heroSubtitle:"கடல் உதயம் முதல் அருவிகள், கோவில்கள், காடுகள் மற்றும் பாரம்பரியம் வரை — கன்னியாகுமரியை புதிய முறையில் அனுபவிக்குங்கள்.", startExploring:"ஆராயத் தொடங்குங்கள்", viewMap:"வரைபடத்தை காண்க", districtOnly:"கன்னியாகுமரி மாவட்டம்", liveDirections:"நேரடி வழிகாட்டி", savePlaces:"இடங்களை சேமிக்கவும்", whyKicker:"ஏன் EXPLORE KK", whyTitle:"கன்னியாகுமரியை எளிதாக அனுபவிக்க ஒரு வழி.", whyText:"இடங்களை கண்டறிந்து, உண்மையான வரைபடத்தில் பார்க்க, பிடித்த இடங்களை சேமிக்க, நேரடி இருப்பிடத்திலிருந்து வழிகாட்டி பெற மற்றும் சிறந்த பயண வரிசையை உருவாக்க Explore KK உதவுகிறது.", startHere:"இங்கிருந்து தொடங்குங்கள்", categorySubtitle:"ஒரு அனுபவ வகையைத் தேர்ந்தெடுக்கவும். பின்னர் அனைத்தையும் பார்க்கலாம்.", categoryExplore:"ஆராயுங்கள்", featuredKicker:"சிறப்பு இடங்கள்", featuredSubtitle:"கன்னியாகுமரியை மறக்க முடியாததாக மாற்றும் சில முக்கிய இடங்கள்.", openMap:"வரைபடத்தை திறக்கவும்", planKicker:"உங்கள் நாளை திட்டமிடுங்கள்", planTitle:"இடங்களின் பட்டியலை ஒரு உண்மையான பயணமாக மாற்றுங்கள்.", planText:"இடங்களை சேமித்து, உங்கள் நேரடி இருப்பிடத்தை பயன்படுத்தி, சிறந்த பயண வரிசையை உருவாக்குங்கள்.", buildTrip:"என் பயணத்தை உருவாக்கு", findFood:"உணவை தேடுங்கள்", curatedTitle:"தேர்ந்தெடுக்கப்பட்ட இடங்கள்", curatedText:"கடற்கரைகள், கோவில்கள், அருவிகள் மற்றும் பாரம்பரிய இடங்களுக்கான பயனுள்ள தகவல்கள்.", directionTitle:"உங்களிலிருந்து தொடங்கும் வழிகாட்டி", directionText:"சேமித்த எந்த இடத்திற்கும் உங்கள் நேரடி இருப்பிடத்திலிருந்து வழியை பெறுங்கள்.", mapTitleShort:"ஒரே மாவட்டம், ஒரே வரைபடம்", mapText:"கன்னியாகுமரி மாவட்ட எல்லைக்குள் உள்ள இடங்களை ஒரே வரைபடத்தில் காணுங்கள்.", details:"விவரங்கள்", placesFound:"இடங்கள் கிடைத்தன", showAll:"அனைத்தையும் காண்க", locationPermission:"நேரடி இருப்பிடத்திலிருந்து வழிகாட்டியை பெற இருப்பிட அனுமதியை வழங்கவும்.", explore:"ஆராயுங்கள்", search:"கடற்கரை, கோவில், அருவி போன்ற இடங்களை தேடுங்கள்...", viewAll:"அனைத்தையும் காண்க →",
    whatLooking:"நீங்கள் எதைத் தேடுகிறீர்கள்?", placesJourney:"செல்ல வேண்டிய சிறந்த இடங்கள்.", browsePlaces:"இடங்களை காண்க", saved:"சேமிக்கப்பட்டது",
    addToTrip:"என் பயணத்தில் சேர்", savedToTrip:"என் பயணத்தில் சேமிக்கப்பட்டது", ratingUnavailable:"மதிப்பீடு கிடைக்கவில்லை", openNow:"இப்போது திறந்துள்ளது", closedNow:"இப்போது மூடப்பட்டுள்ளது", hoursUnavailable:"நேரம் கிடைக்கவில்லை",
    location:"இடம்", bestSeason:"சிறந்த காலம்", timings:"நேரம்", entry:"நுழைவு கட்டணம்", visit:"பார்வை நேரம்", specialty:"சிறப்பு",
    directions:"வழிகாட்டி", directionsLive:"என் இருப்பிடத்திலிருந்து வழிகாட்டி", fullPlace:"முழு இட விவரம்", useLive:"என் நேரடி இருப்பிடத்தை பயன்படுத்து",
    findingLocation:"உங்கள் இருப்பிடத்தை கண்டறிகிறது…", liveLocation:"நேரடி இருப்பிடம்", calculateRoute:"சிறந்த பாதையை கணக்கிடு", optimizing:"பாதையை கணக்கிடுகிறது…",
    routeTitle:"உங்கள் நேரடி இருப்பிடத்திலிருந்து சிறந்த பாதை", totalDistance:"மொத்த பயண தூரம்", drivingTime:"மதிப்பிடப்பட்ட பயண நேரம்", stops:"இடங்கள்",
    viewRoute:"பாதையை இங்கே காண்க", openGoogle:"பாதையை இங்கே காண்க", remove:"நீக்கு", noSaved:"இன்னும் இடங்கள் சேமிக்கப்படவில்லை. இடங்களை திறந்து உங்கள் பயணத்தில் சேர்க்கவும்.",
    days:"நாட்கள்", budget:"அடிப்படை பட்ஜெட் (₹)", estimatedSpend:"மதிப்பிடப்பட்ட செலவு", suggested:"பரிந்துரைக்கப்பட்ட திட்டம்", day:"நாள்",
    categoryAll:"அனைத்தும்", phaseMap:"இணைய வரைபடம்", mapTitle:"கன்னியாகுமரி ஒரே வரைபடத்தில்.", mapSubtitle:"எந்த புகைப்பட பின்னையும் தட்டி முழு விவரங்களையும் வழிகாட்டியையும் பெறுங்கள்.",
    language:"மொழி", english:"English", tamil:"தமிழ்", hindi:"हिन्दी", imageSource:"படத்தின் மூலம்", coordinates:"ஆயத்தொலைவுகள்",
  },
  hi: {
    home:"होम", places:"स्थान", map:"मानचित्र", trip:"मेरी यात्रा", restaurants:"रेस्टोरेंट", planTrip:"यात्रा योजना",
    discover:"कन्याकुमारी को खोजें।", heroKicker:"भारत का दक्षिणी छोर", heroSubtitle:"समुद्र के सूर्योदय से लेकर झरनों, मंदिरों, जंगलों और विरासत तक — कन्याकुमारी को बेहतर तरीके से देखें।", startExploring:"एक्सप्लोर शुरू करें", viewMap:"मानचित्र देखें", districtOnly:"कन्याकुमारी जिला", liveDirections:"लाइव दिशा", savePlaces:"स्थान सेव करें", whyKicker:"क्यों EXPLORE KK", whyTitle:"कन्याकुमारी को देखने का आसान तरीका।", whyText:"Explore KK में स्थान खोजें, उन्हें वास्तविक मानचित्र पर देखें, पसंदीदा जगहें सेव करें, अपने लाइव स्थान से दिशा पाएं और कुशल यात्रा क्रम बनाएं।", startHere:"यहाँ से शुरू करें", categorySubtitle:"अनुभव की एक श्रेणी चुनें। बाद में सभी स्थान देख सकते हैं।", categoryExplore:"देखें", featuredKicker:"विशेष स्थान", featuredSubtitle:"कन्याकुमारी को यादगार बनाने वाले कुछ प्रमुख स्थान।", openMap:"मानचित्र खोलें", planKicker:"अपना दिन प्लान करें", planTitle:"स्थान की सूची को वास्तविक यात्रा में बदलें।", planText:"स्थान सेव करें, अपना लाइव स्थान उपयोग करें और सबसे कुशल ड्राइविंग क्रम बनाएं।", buildTrip:"मेरी यात्रा बनाएं", findFood:"खाना खोजें", curatedTitle:"चुने हुए स्थान", curatedText:"समुद्र तट, मंदिर, झरने और विरासत स्थलों के लिए उपयोगी जानकारी।", directionTitle:"आपके स्थान से दिशा", directionText:"किसी भी सेव किए गए स्थान तक अपने लाइव स्थान से मार्ग पाएं।", mapTitleShort:"एक जिला, एक मानचित्र", mapText:"कन्याकुमारी जिले की सीमा के भीतर सभी स्थान एक मानचित्र पर देखें।", details:"विवरण", placesFound:"स्थान मिले", showAll:"सभी दिखाएं", locationPermission:"लाइव स्थान से दिशा पाने के लिए स्थान अनुमति दें।", explore:"एक्सप्लोर करें", search:"समुद्र तट, मंदिर, झरने खोजें...", viewAll:"सभी देखें →",
    whatLooking:"आप क्या खोज रहे हैं?", placesJourney:"घूमने लायक स्थान।", browsePlaces:"स्थान देखें", saved:"सहेजे गए",
    addToTrip:"मेरी यात्रा में जोड़ें", savedToTrip:"मेरी यात्रा में सहेजा गया", ratingUnavailable:"रेटिंग उपलब्ध नहीं", openNow:"अभी खुला है", closedNow:"अभी बंद है", hoursUnavailable:"समय उपलब्ध नहीं",
    location:"स्थान", bestSeason:"सबसे अच्छा मौसम", timings:"समय", entry:"प्रवेश शुल्क", visit:"दौरे की अवधि", specialty:"विशेषता",
    directions:"दिशा", directionsLive:"मेरे स्थान से दिशा", fullPlace:"पूरा स्थान विवरण", useLive:"मेरा लाइव स्थान उपयोग करें",
    findingLocation:"आपका स्थान खोजा जा रहा है…", liveLocation:"लाइव स्थान", calculateRoute:"सबसे कुशल मार्ग निकालें", optimizing:"मार्ग बनाया जा रहा है…",
    routeTitle:"आपके लाइव स्थान से सबसे कुशल मार्ग", totalDistance:"कुल ड्राइविंग दूरी", drivingTime:"अनुमानित यात्रा समय", stops:"स्टॉप",
    viewRoute:"मार्ग यहाँ देखें", openGoogle:"मार्ग यहाँ देखें", remove:"हटाएं", noSaved:"अभी कोई स्थान सहेजा नहीं गया। स्थान खोलकर अपनी यात्रा में जोड़ें।",
    days:"दिन", budget:"बेस बजट (₹)", estimatedSpend:"अनुमानित खर्च", suggested:"सुझाई गई यात्रा योजना", day:"दिन",
    categoryAll:"सभी", phaseMap:"इंटरैक्टिव मानचित्र", mapTitle:"कन्याकुमारी एक ही मानचित्र पर।", mapSubtitle:"किसी भी फोटो पिन पर टैप करके पूरा विवरण और दिशा देखें।",
    language:"भाषा", english:"English", tamil:"தமிழ்", hindi:"हिन्दी", imageSource:"चित्र स्रोत", coordinates:"निर्देशांक",
  }
};

const placeNames: Record<string, Record<Language,string>> = {
  "vivekananda-rock": {en:"Vivekananda Rock Memorial",ta:"விவேகானந்தர் பாறை நினைவகம்",hi:"विवेकानंद रॉक मेमोरियल"},
  "thiruvalluvar-statue": {en:"Thiruvalluvar Statue",ta:"திருவள்ளுவர் சிலை",hi:"तिरुवल्लुवर प्रतिमा"},
  "thirparappu-waterfalls": {en:"Thirparappu Waterfalls",ta:"திற்பரப்பு அருவி",hi:"थिरपरप्पु जलप्रपात"},
  "padmanabhapuram-palace": {en:"Padmanabhapuram Palace",ta:"பத்மநாபபுரம் அரண்மனை",hi:"पद्मनाभपुरम महल"},
  "mathoor-aqueduct": {en:"Mathoor Aqueduct",ta:"மாத்தூர் தொட்டிப்பாலம்",hi:"माथूर एक्वाडक्ट"},
  "vattakottai-fort": {en:"Vattakottai Fort",ta:"வட்டக்கோட்டை கோட்டை",hi:"वट्टकोट्टई किला"},
  "suchindram-temple": {en:"Thanumalayan Swamy Temple",ta:"தாணுமாலய சுவாமி கோவில்",hi:"थानुमालयन स्वामी मंदिर"},
  "pechiparai-dam": {en:"Pechiparai Dam",ta:"பேச்சிப்பாறை அணை",hi:"पेचिपाराई बांध"},
  "kumari-amman-temple": {en:"Kumari Amman Temple",ta:"குமரி அம்மன் கோவில்",hi:"कुमारी अम्मन मंदिर"},
  "muttom-beach": {en:"Muttom Beach",ta:"முட்டம் கடற்கரை",hi:"मुट्टम बीच"},
  "sunrise-point": {en:"Sunrise Point",ta:"சூரிய உதயப் புள்ளி",hi:"सूर्योदय स्थल"},
  "glass-bridge": {en:"Kanyakumari Glass Bridge",ta:"கன்னியாகுமரி கண்ணாடிப் பாலம்",hi:"कन्याकुमारी ग्लास ब्रिज"},
  "gandhi-mandapam": {en:"Gandhi Mandapam",ta:"காந்தி மண்டபம்",hi:"गांधी मंडपम"},
  "kamaraj-memorial": {en:"Kamaraj Memorial",ta:"காமராஜர் நினைவகம்",hi:"कामराज स्मारक"},
  "kovalam-beach-kanyakumari": {en:"Kovalam Beach, Kanniyakumari",ta:"கோவளம் கடற்கரை, கன்னியாகுமரி",hi:"कोवलम बीच, कन्याकुमारी"},
  "sri-nagaraja-temple": {en:"Sri Nagaraja Temple",ta:"ஸ்ரீ நாகராஜா கோவில்",hi:"श्री नागराजा मंदिर"},
  "chittar-dam": {en:"Chittar Dam",ta:"சித்தாறு அணை",hi:"चित्तर बांध"},
  "kalikesam": {en:"Kalikesam",ta:"காளிகேசம்",hi:"कालिकेसम"},
  "kodayar-twin-falls": {en:"Kodayar Twin Falls",ta:"கோதையாறு இரட்டை அருவி",hi:"कोडैयार ट्विन फॉल्स"},
};

const categoryNames: Record<string,Record<Language,string>> = {
  Beaches:{en:"Beaches",ta:"கடற்கரைகள்",hi:"समुद्र तट"}, Temples:{en:"Temples",ta:"கோவில்கள்",hi:"मंदिर"}, Waterfalls:{en:"Waterfalls",ta:"அருவிகள்",hi:"झरने"}, Dams:{en:"Dams",ta:"அணைகள்",hi:"बांध"}, Historical:{en:"Historical",ta:"வரலாறு",hi:"ऐतिहासिक"}, Nature:{en:"Nature",ta:"இயற்கை",hi:"प्रकृति"}
};

type LanguageContextValue={language:Language; setLanguage:(language:Language)=>void; t:(key:string)=>string; placeName:(id:string,fallback:string)=>string; categoryName:(category:string)=>string};
const LanguageContext=createContext<LanguageContextValue | null>(null);

export function LanguageProvider({children}:{children:React.ReactNode}){
  const [language,setLanguageState]=useState<Language>("en");
  useEffect(()=>{const saved=localStorage.getItem("explore-kk-language") as Language|null;if(saved&&translations[saved])setLanguageState(saved)},[]);
  const setLanguage=(next:Language)=>{setLanguageState(next);localStorage.setItem("explore-kk-language",next);window.dispatchEvent(new CustomEvent("explore-kk-language-change"))};
  const value=useMemo(()=>({language,setLanguage,t:(key:string)=>translations[language][key]||translations.en[key]||key,placeName:(id:string,fallback:string)=>placeNames[id]?.[language]||fallback,categoryName:(category:string)=>categoryNames[category]?.[language]||category}),[language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export function useLanguage(){const ctx=useContext(LanguageContext);if(!ctx)throw new Error("useLanguage must be used inside LanguageProvider");return ctx;}
