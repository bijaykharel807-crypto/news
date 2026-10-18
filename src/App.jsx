import React, { useState, useEffect, useMemo, useRef } from 'react';

/**
 * =============================================================================
 * eKantipur (कान्तिपुर) - Complete Portal Component (app.jsx)
 * Tech: React (JSX) + Tailwind CSS
 * Features:
 *  - Full Nepali News Portal UI with authentic Kantipur branding & typography
 *  - Live Breaking News Ticker (auto-cycles every 6s)
 *  - Real-time Category Filtering (गृहपृष्ठ, राजनीति, अर्थ, खेलकुद, विचार, etc.)
 *  - Infinite / Load More News Pagination
 *  - Live Instant Search with Debounced Query & Category Highlighting
 *  - In-Page Article Reader Modal with Web Speech Nepali Audio Reader
 *  - Interactive Public Opinion Poll (कान्तिपुर जनमत) with Live Bar Charts
 *  - Floating Radio Kantipur 96.1 FM Live Audio Player
 *  - Stock Market (NEPSE), Gold/Silver Bullion & Foreign Exchange Rates
 *  - Bikram Sambat (BS) & Gregorian Calendar Display
 *  - Dark / Light Mode Toggle
 * =============================================================================
 */

// Category Definitions
const CATEGORIES = [
  { id: 'all', name: 'गृहपृष्ठ' },
  { id: 'news', name: 'समाचार' },
  { id: 'politics', name: 'राजनीति' },
  { id: 'economy', name: 'अर्थ / वाणिज्य' },
  { id: 'opinion', name: 'विचार' },
  { id: 'sports', name: 'खेलकुद' },
  { id: 'entertainment', name: 'मनोरञ्जन' },
  { id: 'world', name: 'विश्व' },
  { id: 'tech', name: 'प्रविधि' },
  { id: 'lifestyle', name: 'जीवनशैली' }
];

// Rich Nepali News Dataset
const INITIAL_ARTICLES = [
  {
    id: '1',
    category: 'राजनीति',
    category_id: 'politics',
    is_breaking: true,
    title: 'संसदको चालु अधिवेशन अन्त्य गर्ने मन्त्रिपरिषद्को सिफारिस, राष्ट्रपति कार्यालयमा पत्र पठाइयो',
    summary: 'सिंहदरबारमा बसेको मन्त्रिपरिषद् बैठकले संसदको बर्खे अधिवेशन अन्त्य गर्न राष्ट्रपतिसमक्ष सिफारिस गर्ने निर्णय गरेको छ। सरकारको यो निर्णयसँगै विभिन्न विचाराधीन विधेयकहरूको भविष्य अन्योलमा परेको छ।',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    author: 'कान्तिपुर संवाददाता',
    location: 'काठमाडौं',
    time_ago: '१२ मिनेट अगाडि',
    date_bs: '२०८१ असोज १९, आइतबार',
    views: '४,३२०',
    read_time: 4,
    tags: ['संसद', 'मन्त्रिपरिषद्', 'राजनीति', 'विधेयक'],
    paragraphs: [
      'सिंहदरबारस्थित प्रधानमन्त्री तथा मन्त्रिपरिषद्को कार्यालयमा आइतबार अपराह्न बसेको मन्त्रिपरिषद्को आकस्मिक बैठकले प्रतिनिधि सभा र राष्ट्रिय सभा दुवैको चालु अधिवेशन आजै राति १२ बजेदेखि लागू हुने गरी अन्त्य गर्न राष्ट्रपति रामचन्द्र पौडेलसमक्ष सिफारिस गरेको छ।',
      'बैठकपछि सरकारका प्रवक्ता तथा सञ्चार तथा सूचना प्रविधि मन्त्रीले अधिवेशनको कार्यतालिका अनुसार बजेट पारित भइसकेको र महत्वपूर्ण छलफल सम्पन्न भइसकेकाले अधिवेशन अन्त्यको सिफारिस गरिएको जानकारी दिए।',
      'यद्यपि, प्रमुख प्रतिपक्षी दलले भने महत्वपूर्ण संक्रमणकालीन न्याय सम्बन्धी र नागरिकता सम्बन्धी संशोधन विधेयकहरू संसदीय समितिमा विचाराधीन रहेकै बेला हठात् अधिवेशन अन्त्य गरिएको भन्दै असन्तुष्टि व्यक्त गरेको छ।'
    ]
  },
  {
    id: '2',
    category: 'अर्थ / वाणिज्य',
    category_id: 'economy',
    is_breaking: false,
    title: 'विदेशी मुद्रा सञ्चिति ऐतिहासिक उच्च विन्दुमा, १५ महिनाको वस्तु तथा सेवा आयात धान्न पर्याप्त',
    summary: 'नेपाल राष्ट्र बैंकको पछिल्लो प्रतिवेदन अनुसार रेमिट्यान्स आप्रवाहमा भएको उच्च वृद्धि र पर्यटन क्षेत्रको पुनरुत्थानसँगै विदेशी मुद्रा सञ्चिति २० खर्ब रुपैयाँ नाघेको छ।',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    author: 'यज्ञ बन्जाडे',
    location: 'काठमाडौं',
    time_ago: '२८ मिनेट अगाडि',
    date_bs: '२०८१ असोज १९, आइतबार',
    views: '७,८४०',
    read_time: 3,
    tags: ['अर्थतन्त्र', 'नेपाल_राष्ट्र_बैंक', 'विदेशी_मुद्रा', 'रेमिट्यान्स'],
    paragraphs: [
      'नेपाल राष्ट्र बैंकले सार्वजनिक गरेको आर्थिक वर्ष २०८१/८२ को पहिलो त्रैमासिक वित्तीय विवरण अनुसार देशको विदेशी विनिमय सञ्चिति २० खर्ब ४२ अर्ब रुपैयाँ पुगेको छ।',
      'यो सञ्चितिले हालको आयात दरका आधारमा झण्डै १५ महिनाको वस्तु तथा सेवा आयात धान्न सक्ने केन्द्रीय बैंकले जनाएको छ। गत वर्षको सोही अवधिको तुलनामा विदेशी मुद्रा सञ्चितिमा २२.४ प्रतिशतको उल्लेख्य वृद्धि देखिएको हो।'
    ]
  },
  {
    id: '3',
    category: 'खेलकुद',
    category_id: 'sports',
    is_breaking: true,
    title: 'आईसीसी विश्वकप लिग-२: नेपालद्वारा क्यानडा ६ विकेटले पराजित, रोहित पौडेलको उत्कृष्ट अर्धशतक',
    summary: 'कीर्तिपुरस्थित त्रिवि क्रिकेट मैदानमा भएको रोमाञ्चक खेलमा कप्तान रोहित पौडेलको कप्तानी इनिङ्स र कुशल भुर्तेलको अलराउन्ड प्रदर्शनको मद्दतमा नेपालले क्यानडालाई सहजै हरायो।',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    author: 'विनोद पाण्डे',
    location: 'कीर्तिपुर, काठमाडौं',
    time_ago: '४५ मिनेट अगाडि',
    date_bs: '२०८१ असोज १९, आइतबार',
    views: '१२,९१०',
    read_time: 3,
    tags: ['क्रिकेट', 'रोहित_पौडेल', 'क्यानडा', 'त्रिवि_मैदान'],
    paragraphs: [
      'आईसीसी क्रिकेट विश्वकप लिग-२ अन्तर्गत त्रिकोणात्मक एकदिवसीय शृंखलाको खेलमा नेपालले क्यानडाविरुद्ध ६ विकेटको शानदार जित दर्ता गरेको छ।',
      'टस जितेर पहिले ब्याटिङ गरेको क्यानडाले ४८.२ ओभरमा सबै विकेट गुमाएर २३२ रन बनाएको थियो। नेपालका लागि करण केसी र सन्दीप लामिछानेले समान ३-३ विकेट लिएका थिए।',
      'जवाफी ब्याटिङमा उत्रिएको नेपालले ४२.४ ओभरमै ४ विकेटको क्षतिमा २३३ रनको लक्ष्य पूरा गर्‍यो। कप्तान रोहित पौडेलले ७२ बलमा ६ चौका र २ छक्कासहित ७४ रनको संयमित पारी खेले।'
    ]
  },
  {
    id: '4',
    category: 'प्रविधि',
    category_id: 'tech',
    is_breaking: false,
    title: 'नेपालमै विकसित एआई मोडेलले नेपाली भाषाको अनुवाद र आवाज पहिचानमा ल्यायो क्रान्ति',
    summary: 'नेपाली इन्जिनियरहरूको टोलीले स्थानीय लवज, भाषिका र व्याकरण बुझ्ने गरी १५ अर्ब टोकनमा तालिम प्राप्त ‘हिमाल-एलएलएम’ ओपन-सोर्स सार्वजनिक गरेको छ।',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    author: 'सुरज कुँवर',
    location: 'ललितपुर',
    time_ago: '१ घण्टा अगाडि',
    date_bs: '२०८१ असोज १९, आइतबार',
    views: '५,२१०',
    read_time: 4,
    tags: ['एआई', 'नेपाली_भाषा', 'प्रविधि', 'स्टार्टअप'],
    paragraphs: [
      'ललितपुरको झम्सिखेलस्थित एआई अनुसन्धान केन्द्रका युवा इन्जिनियरहरूले नेपाली भाषाका विविध भाषिका र जटिल व्याकरणलाई ९८ प्रतिशत शुद्धताका साथ बुझ्न सक्ने वृहत् भाषा मोडेल (एलएलएम) सार्वजनिक गरेका छन्।',
      'यस परियोजनाले स्वास्थ्य, शिक्षा र सरकारी सेवा प्रवाहमा सर्वसाधारणलाई आफ्नै मातृभाषामा प्रविधिमैत्री सेवा लिन सहज बनाउने दाबी गरिएको छ।'
    ]
  },
  {
    id: '5',
    category: 'विचार',
    category_id: 'opinion',
    is_breaking: false,
    title: 'संघीयताको दश वर्ष: समीक्षा, उपलब्धि र अझै सुल्झन नसकेका गाँठाहरू',
    summary: 'संविधान जारी भएको एक दशक पुग्दै गर्दा वित्तीय संघीयता, कर्मचारी समायोजन र स्थानीय तहको स्वायत्ततामा देखिएका व्यवहारिक चुनौतीहरूको गहिरो विश्लेषण।',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    author: 'प्रा. डा. पीताम्बर शर्मा',
    location: 'काठमाडौं',
    time_ago: '२ घण्टा अगाडि',
    date_bs: '२०८१ असोज १९, आइतबार',
    views: '८,१५०',
    read_time: 6,
    tags: ['विचार', 'संघीयता', 'संविधान', 'सम्पादकीय'],
    paragraphs: [
      'नेपालको नयाँ संविधानले परिकल्पना गरेको तीन तहको संघीय संरचना अभ्यासमा आएको एक दशक पूरा भएको छ। यस अवधिमा स्थानीय स्तरमै नागरिकले सिंहदरबारको अधिकार अनुभव गर्न पाएका उदाहरणहरू प्रशस्त छन्।',
      'तर, वित्तीय स्रोतको न्यायोचित बाँडफाँट, प्रदेशहरूको क्षेत्राधिकार र संघको केन्द्रीकृत मानसिकताले अझै पनि संघीयतालाई पूर्ण संस्थागत हुन दिएको छैन।'
    ]
  },
  {
    id: '6',
    category: 'विश्व',
    category_id: 'world',
    is_breaking: false,
    title: 'मध्यपूर्वमा तनाव चर्किएपछि राष्ट्रसंघीय सुरक्षा परिषदको आकस्मिक बैठक आह्वान',
    summary: 'लेबनान र गाजा क्षेत्रमा जारी तनाव थप हिंसात्मक बन्दै गएपछि विश्व नेताहरूले तत्काल युद्धविरामका लागि दबाब दिएका छन्। तेलको मूल्यमा विश्वबजारमै वृद्धि।',
    image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=1200&q=80',
    author: 'अन्तर्राष्ट्रिय डेस्क',
    location: 'न्युयोर्क',
    time_ago: '३ घण्टा अगाडि',
    date_bs: '२०८१ असोज १९, आइतबार',
    views: '६,४२०',
    read_time: 3,
    tags: ['मध्यपूर्व', 'सुरक्षा_परिषद', 'संयुक्त_राष्ट्रसंघ', 'विश्व'],
    paragraphs: [
      'संयुक्त राष्ट्रसंघीय सुरक्षा परिषदले मध्यपूर्वको पछिल्लो द्वन्द्वबारे छलफल गर्न न्युयोर्कस्थित मुख्यालयमा आकस्मिक सत्र बोलाएको छ।',
      'महासचिव एन्टोनियो गुटेरेसले दुवै पक्षलाई संयमता अपनाउन र मानवीय सहायताको बाटो खुला गर्न आग्रह गरेका छन्।'
    ]
  },
  {
    id: '7',
    category: 'मनोरञ्जन',
    category_id: 'entertainment',
    is_breaking: false,
    title: 'नेपाली चलचित्र ‘गाउँ आएको बाटो’ अन्तर्राष्ट्रिय फेस्टिभलमा सम्मानित, निर्देशक राईलाई बधाईको ओइरो',
    summary: 'नेपालको हिमाली जनजीवन र बाटो विस्तारले ल्याएको सामाजिक प्रभावलाई जीवन्त उतारेको फिल्मले टोरोन्टो र बुसानपछि युरोपेली फिल्म महोत्सवमा विशेष जुरी अवार्ड जितेको छ।',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    author: 'सुशीला तामाङ',
    location: 'काठमाडौं',
    time_ago: '४ घण्टा अगाडि',
    date_bs: '२०८१ असोज १९, आइतबार',
    views: '९,३१०',
    read_time: 3,
    tags: ['चलचित्र', 'गाउँ_आएको_बाटो', 'अवार्ड', 'सिनेमा'],
    paragraphs: [
      'निर्देशक नवीन सुब्बाद्वारा निर्देशित बहुप्रतीक्षित नेपाली कथानक चलचित्र ‘गाउँ आएको बाटो’ ले प्रतिष्ठित युरोपेली फिल्म फेस्टिभलमा ‘उत्कृष्ट कलात्मक प्रस्तुति’ तर्फ जुरी अवार्ड हासिल गरेको छ।'
    ]
  },
  {
    id: '8',
    category: 'समाचार',
    category_id: 'news',
    is_breaking: false,
    title: 'पोखरा अन्तर्राष्ट्रिय विमानस्थलबाट नियमित चार्टर उडान सुरु हुने, चिनियाँ र भारतीय पर्यटकमा उत्साह',
    summary: 'पोखरालाई प्रत्यक्ष अन्तर्राष्ट्रिय गन्तव्यहरूसँग जोड्न विभिन्न एयरलाइन्सहरूले हप्ताको तीन उडान सञ्चालन गर्ने सहमति जनाएका छन्। होटल व्यवसायीहरूले गरे स्वागत।',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    author: 'दीपक परियार',
    location: 'पोखरा',
    time_ago: '५ घण्टा अगाडि',
    date_bs: '२०८१ असोज १९, आइतबार',
    views: '४,८९०',
    read_time: 4,
    tags: ['पोखरा', 'पर्यटन', 'विमानस्थल', 'होटल'],
    paragraphs: [
      'पोखरा अन्तर्राष्ट्रिय विमानस्थल सञ्चालनमा आएको झण्डै दुई वर्षपछि नियमित अन्तर्राष्ट्रिय चार्टर उडान सुरु हुने सुनिश्चित भएको छ।'
    ]
  },
  {
    id: '9',
    category: 'जीवनशैली',
    category_id: 'lifestyle',
    is_breaking: false,
    title: 'दसैं र तिहारको मुखमा घरेलु उत्पादनका परम्परागत ढाका र हस्तकलाको माग ह्वात्तै बढ्यो',
    summary: 'स्थानीय सीप र मौलिक संस्कृति झल्काउने पाल्पाली ढाका, भक्तपुरे कालो टोपी र हस्तनिर्मित सामग्रीहरूको व्यापार काठमाडौं उपत्यकामा उत्साहजनक रूपमा बढेको छ।',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    author: 'प्रतिमा पोखरेल',
    location: 'भक्तपुर',
    time_ago: '६ घण्टा अगाडि',
    date_bs: '२०८१ असोज १९, आइतबार',
    views: '३,४५०',
    read_time: 3,
    tags: ['जीवनशैली', 'दसैं', 'ढाका_टोपी', 'हस्तकला'],
    paragraphs: [
      'चाडपर्वको आगमनसँगै बजारमा आयातित रेडिमेड कपडाको सट्टा परम्परागत नेपाली ढाकाका कपडा र हस्तकला सामग्री रोज्ने ग्राहकहरूको आकर्षण बढेको छ।'
    ]
  }
];

// Breaking ticker data
const BREAKING_NEWS = [
  { id: '1', title: 'संसदको चालु अधिवेशन आजै राति १२ बजेदेखि अन्त्य गर्न मन्त्रिपरिषद्को सिफारिस', time: '२ मिनेट अगाडि' },
  { id: '3', title: 'आईसीसी विश्वकप लिग-२: नेपालले क्यानडालाई ६ विकेटले हरायो', time: '७ मिनेट अगाडि' },
  { id: '2', title: 'नेपालको विदेशी मुद्रा सञ्चिति २० खर्ब रुपैयाँ नाघ्यो - राष्ट्र बैंक', time: '१४ मिनेट अगाडि' },
  { id: '8', title: 'पोखराबाट अन्तर्राष्ट्रिय चार्टर उडान आगामी महिनादेखि सुरु हुने सहमति', time: '२० मिनेट अगाडि' }
];

export default function App() {
  // State
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [displayedCount, setDisplayedCount] = useState(6);
  const [breakingIndex, setBreakingIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRadioOpen, setIsRadioOpen] = useState(false);
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Poll state
  const [poll, setPoll] = useState({
    question: 'के चालु आर्थिक वर्षमा सरकारले अघि सारेको आर्थिक सुधार नीतिले बजारको मन्दी कम गर्न सक्ला?',
    total_votes: 14820,
    hasVoted: false,
    options: [
      { id: 'yes', text: 'सक्छ (सकारात्मक संकेत देखिन थालेको छ)', votes: 8150, percentage: 55 },
      { id: 'no', text: 'सक्दैन (कार्यान्वयन पक्ष कमजोर छ)', votes: 5180, percentage: 35 },
      { id: 'not_sure', text: 'भन्न सकिन्न / पर्ख र हेर', votes: 1490, percentage: 10 }
    ]
  });

  const [selectedPollOption, setSelectedPollOption] = useState('');
  const radioAudioRef = useRef(null);

  // Auto-cycle breaking ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setBreakingIndex(prev => (prev + 1) % BREAKING_NEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Sync theme class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Toast helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  // Filtered articles
  const filteredArticles = useMemo(() => {
    let list = INITIAL_ARTICLES;
    if (activeCategory !== 'all') {
      list = list.filter(a => a.category_id === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(a => 
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  // Lead story & trending
  const leadStory = INITIAL_ARTICLES[0];
  const editorialStory = INITIAL_ARTICLES[4];
  const trendingStories = useMemo(() => {
    return [...INITIAL_ARTICLES]
      .sort((a, b) => parseInt(b.views.replace(/,/g, ''), 10) - parseInt(a.views.replace(/,/g, ''), 10))
      .slice(0, 5);
  }, []);

  // Poll vote submission
  const handlePollVote = (e) => {
    e.preventDefault();
    if (!selectedPollOption || poll.hasVoted) return;

    setPoll(prev => {
      const newTotal = prev.total_votes + 1;
      const updatedOptions = prev.options.map(opt => {
        const newVotes = opt.id === selectedPollOption ? opt.votes + 1 : opt.votes;
        return {
          ...opt,
          votes: newVotes,
          percentage: Math.round((newVotes / newTotal) * 100)
        };
      });
      return {
        ...prev,
        total_votes: newTotal,
        hasVoted: true,
        options: updatedOptions
      };
    });
    showToast('तपाईँको मत सुरक्षित भयो!');
  };

  // Web Speech synthesis for Nepali audio reading
  const toggleTTS = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('तपाईँको ब्राउजरमा अडियो वाचन सुविधा उपलब्ध छैन।');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ne-NP';
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Radio toggle
  const toggleRadio = () => {
    if (!radioAudioRef.current) return;
    if (isRadioPlaying) {
      radioAudioRef.current.pause();
      setIsRadioPlaying(false);
    } else {
      radioAudioRef.current.play().catch(e => console.log('Audio autoplay prevented:', e));
      setIsRadioPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Hidden Radio Audio Tag */}
      <audio ref={radioAudioRef} src="https://stream.zeno.fm/2v1wz9b0wz8uv" preload="none" />

      {/* Global Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 px-4 py-2.5 rounded-lg shadow-2xl text-xs font-semibold animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* ================= 1. UTILITY TOP BAR ================= */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-1.5 font-medium">
              <span className="text-red-600 font-bold">📅</span>
              <span className="text-neutral-900 dark:text-neutral-200 font-semibold">२०८१ असोज १९, आइतबार</span>
              <span className="text-neutral-400 hidden sm:inline">(Sunday, Oct 5, 2026)</span>
            </div>
            
            <div className="hidden md:flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md text-neutral-700 dark:text-neutral-300">
              <span>⛅ काठमाडौं</span>
              <span className="font-bold text-neutral-900 dark:text-neutral-100">२२° से.</span>
              <span className="text-neutral-400 text-[11px]">आंशिक बदली</span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 text-neutral-500">
              <span>📈 नेप्से:</span>
              <span className="font-semibold text-emerald-600">२,४१२.४० (+१२.३०)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setIsRadioOpen(true); toggleRadio(); }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40 font-semibold hover:bg-red-600 hover:text-white transition-all"
            >
              <span className={`w-2 h-2 rounded-full bg-red-600 ${isRadioPlaying ? 'animate-ping' : ''}`} />
              <span>रेडियो कान्तिपुर ९६.१</span>
            </button>

            <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline">|</span>

            <a href="https://kathmandupost.com" target="_blank" rel="noreferrer" className="hover:text-red-600 transition-colors font-medium hidden sm:inline">
              The Kathmandu Post
            </a>

            <span className="text-neutral-300 dark:text-neutral-700">|</span>

            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
              title="डार्क मोड टगल"
            >
              {isDarkMode ? '☀️ दिन' : '🌙 रात'}
            </button>
          </div>

        </div>
      </header>

      {/* ================= 2. MASTHEAD BRANDING & SEARCH ================= */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}>
              <div className="w-11 h-11 rounded-xl bg-red-600 text-white font-serif font-black text-2xl flex items-center justify-center shadow-md">
                का
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-extrabold font-serif tracking-tight text-neutral-900 dark:text-white hover:text-red-600 transition-colors">
                  कान्तिपुर
                </span>
                <span className="text-red-600 font-extrabold text-3xl">.</span>
              </div>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
              नेपालको नम्बर १ समाचार पोर्टल • Kantipur Media Group
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="समाचार, विचार वा लेखक खोज्नुहोस्..."
              className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 text-sm rounded-full pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-neutral-400"
            />
            <span className="absolute left-3.5 top-3 text-neutral-400">🔍</span>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-xs text-neutral-400 hover:text-neutral-700"
              >
                ✕
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ================= 3. NAVIGATION CATEGORY TABS ================= */}
      <nav className="sticky top-0 z-30 bg-red-700 text-white shadow-md border-b border-red-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center space-x-1 sm:space-x-2 text-sm font-semibold overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
                  activeCategory === cat.id 
                    ? 'bg-red-900 text-white shadow-inner' 
                    : 'text-white/90 hover:text-white hover:bg-red-800/80'
                }`}
              >
                {{ ...cat }.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ================= 4. BREAKING NEWS LIVE TICKER ================= */}
      <div className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
          <div className="flex items-center gap-3 overflow-hidden text-sm">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-red-600 text-white px-2.5 py-1 rounded shadow-sm shrink-0">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              ताजा अपडेट
            </span>
            <span className="text-neutral-400 text-xs shrink-0">{BREAKING_NEWS[breakingIndex].time}</span>
            <span 
              onClick={() => {
                const found = INITIAL_ARTICLES.find(a => a.id === BREAKING_NEWS[breakingIndex].id);
                if (found) setSelectedArticle(found);
              }}
              className="font-medium text-neutral-800 dark:text-neutral-100 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer truncate"
            >
              {BREAKING_NEWS[breakingIndex].title}
            </span>
          </div>
        </div>
      </div>

      {/* ================= 5. MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-10">

        {/* Lead Hero + Sidebar (Shown primarily on 'all' without active search) */}
        {activeCategory === 'all' && !searchQuery && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Top Lead Big Story */}
            <article className="lg:col-span-8 bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm group">
              <div className="relative overflow-hidden aspect-[16/9] bg-neutral-100 dark:bg-neutral-800">
                <img 
                  src={leadStory.image} 
                  alt={leadStory.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md uppercase">
                  {leadStory.category}
                </span>
                <span className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 rounded-xl text-white text-xs hidden sm:block">
                  {leadStory.time_ago} • {leadStory.author} ({leadStory.location})
                </span>
              </div>
              
              <div className="p-6 md:p-8 space-y-4">
                <h1 
                  onClick={() => setSelectedArticle(leadStory)}
                  className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-serif text-neutral-900 dark:text-neutral-50 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors cursor-pointer leading-tight"
                >
                  {leadStory.title}
                </h1>
                
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
                  {leadStory.summary}
                </p>
                
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
                  <span className="font-medium">कान्तिपुर विशेष कभरेज</span>
                  <button 
                    onClick={() => setSelectedArticle(leadStory)}
                    className="text-red-600 dark:text-red-400 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    विस्तृत समाचार पढ्नुहोस् →
                  </button>
                </div>
              </div>
            </article>

            {/* Trending & Editorial Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Trending 24 Hours */}
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100 dark:border-neutral-800">
                  <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-white flex items-center gap-2">
                    <span className="text-red-600">🔥</span> धेरै पढिएका (Trending)
                  </h3>
                  <span className="text-[11px] font-semibold text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">२४ घण्टा</span>
                </div>
                
                <div className="space-y-4 divide-y divide-neutral-100 dark:divide-neutral-800">
                  {trendingStories.map((item, idx) => (
                    <div 
                      key={item.id} 
                      onClick={() => setSelectedArticle(item)}
                      className="pt-3.5 first:pt-0 flex gap-4 items-start group cursor-pointer"
                    >
                      <span className="font-serif font-black text-2xl text-red-600/40 group-hover:text-red-600 transition-colors w-6 shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] text-red-600 font-bold uppercase tracking-wider">{item.category}</span>
                        <h4 className="text-sm font-bold font-serif text-neutral-800 dark:text-neutral-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-neutral-400 mt-1">{item.time_ago} • {item.views} पटक हेरिएको</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opinion & Editorial Box */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 dark:from-neutral-900 dark:to-neutral-850 p-6 rounded-2xl border border-amber-200/60 dark:border-neutral-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 rounded-md">
                    ✍️ विचार र दृष्टिकोण
                  </span>
                  <span className="text-xs text-neutral-500">सम्पादकीय</span>
                </div>
                <h4 
                  onClick={() => setSelectedArticle(editorialStory)}
                  className="text-base font-bold font-serif text-neutral-900 dark:text-neutral-100 hover:text-red-600 cursor-pointer transition-colors leading-snug"
                >
                  {editorialStory.title}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 line-clamp-3">
                  {editorialStory.summary}
                </p>
                <div className="mt-4 pt-3 border-t border-amber-200/50 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
                  <span>{editorialStory.author}</span>
                  <button onClick={() => setSelectedArticle(editorialStory)} className="text-red-600 hover:underline">
                    पढ्नुहोस् →
                  </button>
                </div>
              </div>

            </div>

          </section>
        )}

        {/* Dynamic News Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-red-600 pb-3">
            <h2 className="text-xl md:text-2xl font-bold font-serif text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-600 rounded-sm" />
              {activeCategory === 'all' ? 'ताजा समाचार र विश्लेषण' : CATEGORIES.find(c => c.id === activeCategory)?.name}
            </h2>
            <div className="text-xs text-neutral-500 font-medium">
              कूल {filteredArticles.length} समाचार
            </div>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-neutral-400">
              यस खण्डमा कुनै समाचार भेटिएन ।
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.slice(0, displayedCount).map(item => (
                <article key={item.id} className="news-card bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="relative overflow-hidden aspect-[16/10] bg-neutral-100 dark:bg-neutral-800">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 bg-red-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
                        {item.category}
                      </span>
                      {item.is_breaking && (
                        <span className="absolute top-3 right-3 bg-amber-500 text-neutral-950 text-xs font-bold px-2 py-0.5 rounded shadow flex items-center gap-1 animate-pulse">
                          <span className="w-2 h-2 rounded-full bg-neutral-950" /> ताजा
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                        <span>{item.time_ago}</span>
                        <span>•</span>
                        <span>{item.author}</span>
                      </div>
                      <h3 
                        onClick={() => setSelectedArticle(item)}
                        className="text-lg md:text-xl font-bold font-serif text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug cursor-pointer line-clamp-2"
                      >
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed font-sans">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-2 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between text-xs text-neutral-500">
                    <span>👁️ {item.views} पटक हेरिएको</span>
                    <button 
                      onClick={() => setSelectedArticle(item)}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 font-semibold flex items-center gap-1"
                    >
                      पूरा पढ्नुहोस् →
                    </button>
                  </div>
                </article>
              ))}

              {/* Load More Button */}
              {displayedCount < filteredArticles.length && (
                <div className="col-span-full text-center py-6">
                  <button 
                    onClick={() => setDisplayedCount(prev => prev + 3)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-sm hover:bg-red-600 dark:hover:bg-red-500 dark:hover:text-white transition-all shadow-sm active:scale-95"
                  >
                    थप समाचार लोड गर्नुहोस् (थप {filteredArticles.length - displayedCount} वटा) ↓
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ================= 6. INTERACTIVE POLL & FINANCIAL INDICES ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-neutral-200 dark:border-neutral-800">
          
          {/* Public Poll */}
          <div className="lg:col-span-7 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-850 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 dark:bg-red-950/50 px-2.5 py-1 rounded-md border border-red-200 dark:border-red-900/50">
                📊 कान्तिपुर जनमत
              </span>
              <span className="text-xs text-neutral-500">
                कुल मत: <strong>{poll.total_votes.toLocaleString()}</strong>
              </span>
            </div>
            
            <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 font-serif leading-snug">
              {poll.question}
            </h3>

            {!poll.hasVoted ? (
              <form onSubmit={handlePollVote} className="space-y-3">
                {poll.options.map(opt => (
                  <label key={opt.id} className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 cursor-pointer hover:border-red-500 transition-all">
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="pollOption" 
                        value={opt.id} 
                        onChange={() => setSelectedPollOption(opt.id)}
                        className="text-red-600 focus:ring-red-500 h-4 w-4"
                      />
                      <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                        {opt.text}
                      </span>
                    </div>
                  </label>
                ))}

                <div className="pt-4 flex items-center justify-between">
                  <button 
                    type="submit"
                    disabled={!selectedPollOption}
                    className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm active:scale-95"
                  >
                    मतदान गर्नुहोस् (Vote Now)
                  </button>
                  <span className="text-xs text-neutral-400 italic">
                    * तुरुन्त परिणाम देखिन्छ
                  </span>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mb-2">
                  ✓ तपाईँको मत सुरक्षित भयो!
                </div>
                {poll.options.map((opt, i) => (
                  <div key={opt.id}>
                    <div className="flex justify-between text-xs font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                      <span>{opt.text}</span>
                      <span>{opt.percentage}% ({opt.votes.toLocaleString()} मत)</span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${
                          i === 0 ? 'bg-red-600' : i === 1 ? 'bg-blue-600' : 'bg-neutral-500'
                        }`}
                        style={{ width: `${opt.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Forex & Bullion Rates */}
          <div className="lg:col-span-5 bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                💰 बजार भाउ र विदेशी विनिमय दर
              </h3>
              <span className="text-[11px] text-neutral-400">नेपाल राष्ट्र बैंक</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200/50 dark:border-amber-900/30">
                <div className="text-[11px] text-amber-800 dark:text-amber-400 font-semibold">छापावाल सुन (तोला)</div>
                <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mt-1">रु १,६०,५००</div>
                <div className="text-[10px] text-emerald-600 mt-0.5">▲ +रु ५००</div>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                <div className="text-[11px] text-neutral-600 dark:text-neutral-400 font-semibold">चाँदी (तोला)</div>
                <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mt-1">रु १,९८०</div>
                <div className="text-[10px] text-red-500 mt-0.5">▼ -रु १०</div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400">
                    <th className="py-2">मुद्रा</th>
                    <th className="py-2">एकाइ</th>
                    <th className="py-2">खरिद</th>
                    <th className="py-2">बिक्री</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
                  <tr>
                    <td className="py-2 font-medium">🇺🇸 अमेरिकी डलर (USD)</td>
                    <td className="py-2">१</td>
                    <td className="py-2">१३५.२०</td>
                    <td className="py-2 font-bold text-neutral-900 dark:text-neutral-100">१३५.८०</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">🇪🇺 युरो (EUR)</td>
                    <td className="py-2">१</td>
                    <td className="py-2">१४७.५०</td>
                    <td className="py-2 font-bold text-neutral-900 dark:text-neutral-100">१४८.१५</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">🇬🇧 पाउन्ड (GBP)</td>
                    <td className="py-2">१</td>
                    <td className="py-2">१७४.१०</td>
                    <td className="py-2 font-bold text-neutral-900 dark:text-neutral-100">१७४.८५</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </section>

      </main>

      {/* ================= 7. ARTICLE READER MODAL ================= */}
      {selectedArticle && (
        <div 
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedArticle(null); }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto"
        >
          <div className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-850 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-0.5 rounded uppercase">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-neutral-500">{selectedArticle.date_bs}</span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleTTS(`${selectedArticle.title}. ${selectedArticle.summary}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-xs font-semibold hover:bg-red-600 hover:text-white transition-colors"
                >
                  <span>{isSpeaking ? '⏹️ रोक्नुहोस्' : '🔊 समाचार सुन्नुहोस्'}</span>
                </button>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:bg-red-600 hover:text-white flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-serif leading-tight">
                {selectedArticle.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 font-bold flex items-center justify-center">
                    का
                  </div>
                  <div>
                    <div className="font-bold text-neutral-800 dark:text-neutral-200">{selectedArticle.author}</div>
                    <div>{selectedArticle.location}, नेपाल</div>
                  </div>
                </div>
                <div>{selectedArticle.read_time} मिनेट पढाइ • {selectedArticle.views} अवलोकन</div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-md">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title} 
                  className="w-full max-h-[420px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="text-lg md:text-xl font-medium font-serif leading-relaxed border-l-4 border-red-600 pl-4 py-1 text-neutral-800 dark:text-neutral-200">
                {selectedArticle.summary}
              </div>

              <div className="font-sans leading-relaxed text-base space-y-4 text-neutral-700 dark:text-neutral-300">
                {selectedArticle.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Share & Copy Link */}
              <div className="p-4 bg-neutral-50 dark:bg-neutral-850 rounded-xl flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-500">सेयर गर्नुहोस्:</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    showToast('समाचारको लिंक कपी भयो!');
                  }}
                  className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700"
                >
                  🔗 लिंक कपी गर्नुहोस्
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ================= 8. FLOATING RADIO FM PLAYER ================= */}
      {isRadioOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-900/95 backdrop-blur-md text-white border-t border-neutral-800 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center font-bold text-xs shrink-0">
                FM
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  लाइभ: रेडियो कान्तिपुर ९६.१ मेगाहर्ज
                </div>
                <div className="text-xs text-neutral-300 truncate font-medium">
                  कान्तिपुर समाचार बुलेटिन
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={toggleRadio}
                className="px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow"
              >
                {isRadioPlaying ? 'रोक्नुहोस् (Pause)' : 'बजाउनुहोस् (Play)'}
              </button>
              <button 
                onClick={() => { setIsRadioOpen(false); if (radioAudioRef.current) radioAudioRef.current.pause(); setIsRadioPlaying(false); }}
                className="p-1.5 text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 9. FOOTER ================= */}
      <footer className="bg-neutral-900 text-neutral-400 border-t border-neutral-800 mt-20 pt-16 pb-12 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white font-serif font-black text-lg flex items-center justify-center">का</div>
                <span className="text-2xl font-bold font-serif text-white">कान्तिपुर</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                कान्तिपुर पब्लिकेशन्स लिमिटेड नेपालको प्रमुख समाचार संस्था हो।
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">प्रमुख खण्ड</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setActiveCategory('news')} className="hover:text-red-500">समाचार</button></li>
                <li><button onClick={() => setActiveCategory('politics')} className="hover:text-red-500">राजनीति</button></li>
                <li><button onClick={() => setActiveCategory('economy')} className="hover:text-red-500">अर्थ / वाणिज्य</button></li>
                <li><button onClick={() => setActiveCategory('sports')} className="hover:text-red-500">खेलकुद</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">कान्तिपुर नेटवर्क</h4>
              <ul className="space-y-2 text-xs">
                <li>The Kathmandu Post</li>
                <li>रेडियो कान्तिपुर ९६.१</li>
                <li>Kantipur TV HD</li>
                <li>नारी म्यागजिन</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">सम्पर्क</h4>
              <div className="text-xs space-y-1 text-neutral-500">
                <p>सुविधानगर, तीनकुने, काठमाडौं, नेपाल</p>
                <p>फोन: +९७७-१-५११११११</p>
                <p>इमेल: ekantipur@kmg.com.np</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500">
            <p>© २०२६ कान्तिपुर पब्लिकेशन्स लिमिटेड | सर्वाधिकार सुरक्षित।</p>
            <p>Built with React (app.jsx) & Jinja2 (ekantipur.jinja)</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
