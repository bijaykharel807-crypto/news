import express from 'express';
import nunjucks from 'nunjucks';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure Nunjucks (Jinja2 compatible engine)
const nunjucksEnv = nunjucks.configure(path.join(__dirname, 'templates'), {
  autoescape: true,
  express: app,
  watch: process.env.NODE_ENV !== 'production',
  noCache: true
});

// Categories for eKantipur
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
const ARTICLES = [
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
      'यद्यपि, प्रमुख प्रतिपक्षी दलले भने महत्वपूर्ण संक्रमणकालीन न्याय सम्बन्धी र नागरिकता सम्बन्धी संशोधन विधेयकहरू संसदीय समितिमा विचाराधीन रहेकै बेला हठात् अधिवेशन अन्त्य गरिएको भन्दै असन्तुष्टि व्यक्त गरेको छ।',
      'सभामुखले अधिवेशन समापनका लागि सोमबार दिउँसो १ बजे प्रतिनिधि सभाको बैठक आह्वान गरेका थिए, तर सिफारिस लगत्तै राष्ट्रपति कार्यालयबाट अधिवेशन अन्त्य सम्बन्धी औपचारिक पत्र जारी हुने भएको छ।'
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
      'यो सञ्चितिले हालको आयात दरका आधारमा झण्डै १५ महिनाको वस्तु तथा सेवा आयात धान्न सक्ने केन्द्रीय बैंकले जनाएको छ। गत वर्षको सोही अवधिको तुलनामा विदेशी मुद्रा सञ्चितिमा २२.४ प्रतिशतको उल्लेख्य वृद्धि देखिएको हो।',
      'अर्थविद्हरूका अनुसार बाह्य क्षेत्र अत्यन्त सबल रहे पनि आन्तरिक बजारमा पुँजीगत खर्च न्यून हुनु र बैंकहरूमा अत्यधिक तरलता थुप्रिनु चिन्ताको विषय बनेको छ। निजी क्षेत्रबाट कर्जाको माग बढाउन मौद्रिक नीतिमा थप लचकता आवश्यक रहेको व्यवसायीहरूको भनाइ छ।'
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
      'जवाफी ब्याटिङमा उत्रिएको नेपालले ४२.४ ओभरमै ४ विकेटको क्षतिमा २३३ रनको लक्ष्य पूरा गर्‍यो। कप्तान रोहित पौडेलले ७२ बलमा ६ चौका र २ छक्कासहित ७४ रनको संयमित पारी खेले।',
      'यो जितसँगै नेपालले अंक तालिकामा महत्वपूर्ण २ अंक जोड्दै विश्वकप छनोटको सम्भावनालाई बलियो बनाएको छ।'
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
      'यस परियोजनाले स्वास्थ्य, शिक्षा र सरकारी सेवा प्रवाहमा सर्वसाधारणलाई आफ्नै मातृभाषामा प्रविधिमैत्री सेवा लिन सहज बनाउने दाबी गरिएको छ।',
      'विकासकर्ता टोलीका संयोजकले भने, "हाम्रो लक्ष्य विश्वस्तरीय प्रविधिलाई नेपाली मौलिकता र भाषासँग जोड्नु हो ताकि डिजिटल खाडल कम हुन सकोस्।" यो मोडेललाई विकासकर्ताहरूका लागि गिटहबमा निःशुल्क उपलब्ध गराइएको छ।'
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
      'तर, वित्तीय स्रोतको न्यायोचित बाँडफाँट, प्रदेशहरूको क्षेत्राधिकार र संघको केन्द्रीकृत मानसिकताले अझै पनि संघीयतालाई पूर्ण संस्थागत हुन दिएको छैन।',
      'जबसम्म प्रदेशहरूलाई प्रशासनिक र वित्तीय रूपमा सशक्त बनाइँदैन, तबसम्म स्थानीय विकासको गति राष्ट्रिय विकाससँग तालमेलमा आउन कठिन छ।'
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
      'महासचिव एन्टोनियो गुटेरेसले दुवै पक्षलाई संयमता अपनाउन र मानवीय सहायताको बाटो खुला गर्न आग्रह गरेका छन्।',
      'द्वन्द्व चर्किएसँगै अन्तर्राष्ट्रिय बजारमा कच्चा तेलको मूल्य प्रति ब्यारेल ८० डलर नाघेको छ, जसको प्रत्यक्ष असर एसियाली मुलुकहरूको इन्धन मूल्यमा पर्ने देखिएको छ।'
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
      'निर्देशक नवीन सुब्बाद्वारा निर्देशित बहुप्रतीक्षित नेपाली कथानक चलचित्र ‘गाउँ आएको बाटो’ (अ रोड टु अ भिलेज) ले प्रतिष्ठित युरोपेली फिल्म फेस्टिभलमा ‘उत्कृष्ट कलात्मक प्रस्तुति’ तर्फ जुरी अवार्ड हासिल गरेको छ।',
      'दयाहाङ राई, पशुपति राई र प्रसन राईको मुख्य अभिनय रहेको यस चलचित्रले पूर्वी नेपालको दुर्गम भेगमा पहिलो पटक सडक पुग्दा एउटा बाँसको चोया बुन्ने परिवारमा परेको मनोवैज्ञानिक प्रभावलाई संवेदनशील ढंगले प्रस्तुत गरेको छ।',
      'नेपालमा प्रदर्शन भइरहेको फिल्मले दर्शक र समीक्षक दुवैबाट अभूतपूर्व प्रशंसा पाइरहेको छ।'
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
      'पोखरा अन्तर्राष्ट्रिय विमानस्थल सञ्चालनमा आएको झण्डै दुई वर्षपछि नियमित अन्तर्राष्ट्रिय चार्टर उडान सुरु हुने सुनिश्चित भएको छ।',
      'नेपाल नागरिक उड्डयन प्राधिकरण (क्यान) र निजी एयरलाइन्सबीच भएको पछिल्लो छलफलमा आगामी महिनादेखि पोखरा-छेन्दु र पोखरा-नयाँ दिल्ली सिधा उडान गर्ने प्रारम्भिक सम्झौता भएको हो।',
      'यस कदमले पोखरा, अन्नपूर्ण पदमार्ग र मुस्ताङ भ्रमणमा आउने विदेशी पर्यटकहरूको संख्या दोब्बर हुने विश्वास पश्चिमाञ्चल होटल संघले व्यक्त गरेको छ।'
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
      'चाडपर्वको आगमनसँगै बजारमा आयातित रेडिमेड कपडाको सट्टा परम्परागत नेपाली ढाकाका कपडा र हस्तकला सामग्री रोज्ने ग्राहकहरूको आकर्षण बढेको छ।',
      'भक्तपुर र पाल्पाका स्थानीय बुनकरहरू यतिबेला माग धान्न व्यस्त छन्। युवा पुस्तामाझ ढाकाका दौरा-सुरुवाल, साडी र कोटहरूको फेसन लोकप्रिय बनेको व्यापारीहरू बताउँछन्।'
    ]
  }
];

// Breaking news cycling list
const BREAKING_NEWS = [
  { id: '1', title: 'संसदको चालु अधिवेशन आजै राति १२ बजेदेखि अन्त्य गर्न मन्त्रिपरिषद्को सिफारिस', time: '२ मिनेट अगाडि' },
  { id: '3', title: 'आईसीसी विश्वकप लिग-२: नेपालले क्यानडालाई ६ विकेटले हरायो', time: '७ मिनेट अगाडि' },
  { id: '2', title: 'नेपालको विदेशी मुद्रा सञ्चिति २० खर्ब रुपैयाँ नाघ्यो - राष्ट्र बैंक', time: '१४ मिनेट अगाडि' },
  { id: '8', title: 'पोखराबाट अन्तर्राष्ट्रिय चार्टर उडान आगामी महिनादेखि सुरु हुने सहमति', time: '२० मिनेट अगाडि' }
];

let breakingIndex = 0;

// Poll State
let pollData = {
  question: 'के चालु आर्थिक वर्षमा सरकारले अघि सारेको आर्थिक सुधार नीतिले बजारको मन्दी कम गर्न सक्ला?',
  total_votes: 14820,
  options: [
    { id: 'yes', text: 'सक्छ (सकारात्मक संकेत देखिन थालेको छ)', votes: 8150, percentage: 55 },
    { id: 'no', text: 'सक्दैन (कार्यान्वयन पक्ष कमजोर छ)', votes: 5180, percentage: 35 },
    { id: 'not_sure', text: 'भन्न सकिन्न / पर्ख र हेर', votes: 1490, percentage: 10 }
  ]
};

// Date utilities (Nepali Bikram Sambat)
function getNepaliDateString() {
  const nepaliDays = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार'];
  const nepaliMonths = ['वैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पुस', 'माघ', 'फागुन', 'चैत'];
  const nepaliNumbers = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

  const now = new Date();
  const dayName = nepaliDays[now.getDay()];
  
  // Approximate BS calculation
  const bsYear = 2081;
  const bsMonth = 'असोज';
  const bsDay = 19;
  
  const toNepaliNum = (num) => num.toString().split('').map(d => nepaliNumbers[parseInt(d, 10)] || d).join('');

  return `${toNepaliNum(bsYear)} ${bsMonth} ${toNepaliNum(bsDay)}, ${dayName}`;
}

function getEnglishDateString() {
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
}

// ---------------- ROUTES ----------------

// 1. FULL PAGE: Renders eKantipur with single Jinja template
app.get('/', (req, res) => {
  const leadStory = ARTICLES[0];
  const editorialStory = ARTICLES[4];
  const trendingStories = [...ARTICLES].sort((a, b) => parseInt(b.views.replace(/,/g, ''), 10) - parseInt(a.views.replace(/,/g, ''), 10)).slice(0, 5);
  const regularArticles = ARTICLES.slice(1, 7);

  res.render('ekantipur.jinja', {
    fragment: null, // Full page shell
    categories: CATEGORIES,
    current_category: 'all',
    lead_story: leadStory,
    editorial_story: editorialStory,
    trending_stories: trendingStories,
    articles: regularArticles,
    next_page: 2,
    remaining_count: ARTICLES.length - 7 > 0 ? ARTICLES.length - 7 : 0,
    poll: pollData,
    current_breaking: BREAKING_NEWS[0],
    nepali_date: getNepaliDateString(),
    english_date: getEnglishDateString(),
    weather: {
      city: 'काठमाडौं',
      temp: '२२° से.',
      condition: 'आंशिक बदली'
    }
  });
});

// 2. HTMX PARTIAL: Category Tab Click -> returns only news_feed partial
app.get('/api/category/:catId', (req, res) => {
  const catId = req.params.catId;
  let filtered = ARTICLES;
  if (catId !== 'all') {
    filtered = ARTICLES.filter(a => a.category_id === catId);
  }

  res.render('ekantipur.jinja', {
    fragment: 'news_feed',
    articles: filtered.slice(0, 6),
    next_page: filtered.length > 6 ? 2 : null,
    current_category: catId,
    remaining_count: Math.max(0, filtered.length - 6)
  });
});

// 3. HTMX PARTIAL: Infinite / Load More News -> returns only news_feed partial
app.get('/api/news', (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const catId = req.query.category || 'all';
  const pageSize = 3;

  let filtered = ARTICLES;
  if (catId !== 'all') {
    filtered = ARTICLES.filter(a => a.category_id === catId);
  }

  const startIndex = (page - 1) * pageSize;
  const pageArticles = filtered.slice(startIndex, startIndex + pageSize);
  const hasNext = startIndex + pageSize < filtered.length;

  res.render('ekantipur.jinja', {
    fragment: 'news_feed',
    articles: pageArticles,
    next_page: hasNext ? page + 1 : null,
    current_category: catId,
    remaining_count: Math.max(0, filtered.length - (startIndex + pageSize))
  });
});

// 4. HTMX PARTIAL: Auto-polled Live Breaking Ticker (every 10s)
app.get('/api/ticker', (req, res) => {
  breakingIndex = (breakingIndex + 1) % BREAKING_NEWS.length;
  const current = BREAKING_NEWS[breakingIndex];

  res.render('ekantipur.jinja', {
    fragment: 'ticker',
    current_breaking: current
  });
});

// 5. HTMX PARTIAL: Live Search
app.get('/api/search', (req, res) => {
  const query = (req.query.q || '').trim().toLowerCase();
  if (!query) {
    return res.send('');
  }

  const results = ARTICLES.filter(a => 
    a.title.toLowerCase().includes(query) ||
    a.summary.toLowerCase().includes(query) ||
    a.category.toLowerCase().includes(query) ||
    a.author.toLowerCase().includes(query) ||
    a.tags.some(t => t.toLowerCase().includes(query))
  );

  res.render('ekantipur.jinja', {
    fragment: 'search_results',
    results: results,
    query: query
  });
});

// 6. HTMX PARTIAL: Article Reader Modal
app.get('/api/article/:id', (req, res) => {
  const article = ARTICLES.find(a => a.id === req.params.id) || ARTICLES[0];

  res.render('ekantipur.jinja', {
    fragment: 'article_modal',
    article: article
  });
});

// 7. HTMX PARTIAL: Poll Voting (POST)
app.post('/api/poll', (req, res) => {
  const selectedOption = req.body.option;
  const optionObj = pollData.options.find(o => o.id === selectedOption);
  
  if (optionObj) {
    optionObj.votes += 1;
    pollData.total_votes += 1;
    
    // Recalculate percentages
    pollData.options.forEach(opt => {
      opt.percentage = Math.round((opt.votes / pollData.total_votes) * 100);
    });
  }

  res.render('ekantipur.jinja', {
    fragment: 'poll_result',
    poll: pollData
  });
});

// 8. Download pure single Jinja template
app.get('/api/download/jinja', (req, res) => {
  const filePath = path.join(__dirname, 'templates', 'ekantipur.jinja');
  res.download(filePath, 'ekantipur.jinja');
});

// 9. Download Python Flask code
app.get('/api/download/python', (req, res) => {
  const filePath = path.join(__dirname, 'app.py');
  res.download(filePath, 'app.py');
});

// Start Express Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[eKantipur] Server running at http://0.0.0.0:${PORT}`);
  console.log(`[eKantipur] Powered by HTMX & Single Jinja Template (templates/ekantipur.jinja)`);
});
