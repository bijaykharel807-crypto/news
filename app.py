#!/usr/bin/env python3
"""
=============================================================================
eKantipur.com - Complete Portal in Python Flask with Single Jinja Template & HTMX
=============================================================================
Run locally:
    pip install -r requirements.txt
    python app.py
Open:
    http://localhost:5000 (or http://localhost:3000)
"""

from flask import Flask, render_template, request, jsonify, send_file
import os

app = Flask(__name__, template_folder='templates')

CATEGORIES = [
    {"id": "all", "name": "गृहपृष्ठ"},
    {"id": "news", "name": "समाचार"},
    {"id": "politics", "name": "राजनीति"},
    {"id": "economy", "name": "अर्थ / वाणिज्य"},
    {"id": "opinion", "name": "विचार"},
    {"id": "sports", "name": "खेलकुद"},
    {"id": "entertainment", "name": "मनोरञ्जन"},
    {"id": "world", "name": "विश्व"},
    {"id": "tech", "name": "प्रविधि"},
    {"id": "lifestyle", "name": "जीवनशैली"},
]

ARTICLES = [
    {
        "id": "1",
        "category": "राजनीति",
        "category_id": "politics",
        "is_breaking": True,
        "title": "संसदको चालु अधिवेशन अन्त्य गर्ने मन्त्रिपरिषद्को सिफारिस, राष्ट्रपति कार्यालयमा पत्र पठाइयो",
        "summary": "सिंहदरबारमा बसेको मन्त्रिपरिषद् बैठकले संसदको बर्खे अधिवेशन अन्त्य गर्न राष्ट्रपतिसमक्ष सिफारिस गर्ने निर्णय गरेको छ। सरकारको यो निर्णयसँगै विभिन्न विचाराधीन विधेयकहरूको भविष्य अन्योलमा परेको छ।",
        "image": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
        "author": "कान्तिपुर संवाददाता",
        "location": "काठमाडौं",
        "time_ago": "१२ मिनेट अगाडि",
        "date_bs": "२०८१ असोज १९, आइतबार",
        "views": "४,३२०",
        "read_time": 4,
        "tags": ["संसद", "मन्त्रिपरिषद्", "राजनीति", "विधेयक"],
        "paragraphs": [
            "सिंहदरबारस्थित प्रधानमन्त्री तथा मन्त्रिपरिषद्को कार्यालयमा आइतबार अपराह्न बसेको मन्त्रिपरिषद्को आकस्मिक बैठकले प्रतिनिधि सभा र राष्ट्रिय सभा दुवैको चालु अधिवेशन आजै राति १२ बजेदेखि लागू हुने गरी अन्त्य गर्न राष्ट्रपति रामचन्द्र पौडेलसमक्ष सिफारिस गरेको छ।",
            "बैठकपछि सरकारका प्रवक्ता तथा सञ्चार तथा सूचना प्रविधि मन्त्रीले अधिवेशनको कार्यतालिका अनुसार बजेट पारित भइसकेको र महत्वपूर्ण छलफल सम्पन्न भइसकेकाले अधिवेशन अन्त्यको सिफारिस गरिएको जानकारी दिए।",
            "प्रमुख प्रतिपक्षी दलले भने महत्वपूर्ण संक्रमणकालीन न्याय सम्बन्धी विधेयक संसदीय समितिमा विचाराधीन रहेकै बेला हठात् अधिवेशन अन्त्य गरिएको भन्दै असन्तुष्टि व्यक्त गरेको छ।",
        ],
    },
    {
        "id": "2",
        "category": "अर्थ / वाणिज्य",
        "category_id": "economy",
        "is_breaking": False,
        "title": "विदेशी मुद्रा सञ्चिति ऐतिहासिक उच्च विन्दुमा, १५ महिनाको वस्तु तथा सेवा आयात धान्न पर्याप्त",
        "summary": "नेपाल राष्ट्र बैंकको पछिल्लो प्रतिवेदन अनुसार रेमिट्यान्स आप्रवाहमा भएको उच्च वृद्धि र पर्यटन क्षेत्रको पुनरुत्थानसँगै विदेशी मुद्रा सञ्चिति २० खर्ब रुपैयाँ नाघेको छ।",
        "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
        "author": "यज्ञ बन्जाडे",
        "location": "काठमाडौं",
        "time_ago": "२८ मिनेट अगाडि",
        "date_bs": "२०८१ असोज १९, आइतबार",
        "views": "७,८४०",
        "read_time": 3,
        "tags": ["अर्थतन्त्र", "नेपाल_राष्ट्र_बैंक", "विदेशी_मुद्रा", "रेमिट्यान्स"],
        "paragraphs": [
            "नेपाल राष्ट्र बैंकले सार्वजनिक गरेको आर्थिक वर्ष २०८१/८२ को पहिलो त्रैमासिक वित्तीय विवरण अनुसार देशको विदेशी विनिमय सञ्चिति २० खर्ब ४२ अर्ब रुपैयाँ पुगेको छ।",
            "यो सञ्चितिले हालको आयात दरका आधारमा झण्डै १५ महिनाको वस्तु तथा सेवा आयात धान्न सक्ने केन्द्रीय बैंकले जनाएको छ।",
        ],
    },
    {
        "id": "3",
        "category": "खेलकुद",
        "category_id": "sports",
        "is_breaking": True,
        "title": "आईसीसी विश्वकप लिग-२: नेपालद्वारा क्यानडा ६ विकेटले पराजित, रोहित पौडेलको उत्कृष्ट अर्धशतक",
        "summary": "कीर्तिपुरस्थित त्रिवि क्रिकेट मैदानमा भएको रोमाञ्चक खेलमा कप्तान रोहित पौडेलको कप्तानी इनिङ्स र कुशल भुर्तेलको अलराउन्ड प्रदर्शनको मद्दतमा नेपालले क्यानडालाई सहजै हरायो।",
        "image": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
        "author": "विनोद पाण्डे",
        "location": "कीर्तिपुर",
        "time_ago": "४५ मिनेट अगाडि",
        "date_bs": "२०८१ असोज १९, आइतबार",
        "views": "१२,९१०",
        "read_time": 3,
        "tags": ["क्रिकेट", "रोहित_पौडेल", "क्यानडा", "त्रिवि_मैदान"],
        "paragraphs": [
            "आईसीसी क्रिकेट विश्वकप लिग-२ अन्तर्गत त्रिकोणात्मक एकदिवसीय शृंखलाको खेलमा नेपालले क्यानडाविरुद्ध ६ विकेटको शानदार जित दर्ता गरेको छ।",
            "जवाफी ब्याटिङमा उत्रिएको नेपालले ४२.४ ओभरमै ४ विकेटको क्षतिमा २३३ रनको लक्ष्य पूरा गर्‍यो। कप्तान रोहित पौडेलले ७२ बलमा ६ चौका र २ छक्कासहित ७४ रन बनाए।",
        ],
    },
    {
        "id": "4",
        "category": "प्रविधि",
        "category_id": "tech",
        "is_breaking": False,
        "title": "नेपालमै विकसित एआई मोडेलले नेपाली भाषाको अनुवाद र आवाज पहिचानमा ल्यायो क्रान्ति",
        "summary": "नेपाली इन्जिनियरहरूको टोलीले स्थानीय लवज, भाषिका र व्याकरण बुझ्ने गरी १५ अर्ब टोकनमा तालिम प्राप्त ‘हिमाल-एलएलएम’ ओपन-सोर्स सार्वजनिक गरेको छ।",
        "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        "author": "सुरज कुँवर",
        "location": "ललितपुर",
        "time_ago": "१ घण्टा अगाडि",
        "date_bs": "२०८१ असोज १९, आइतबार",
        "views": "५,२१०",
        "read_time": 4,
        "tags": ["एआई", "नेपाली_भाषा", "प्रविधि", "स्टार्टअप"],
        "paragraphs": [
            "ललितपुरको झम्सिखेलस्थित युवा इन्जिनियरहरूले नेपाली भाषाका विविध भाषिका बुझ्न सक्ने वृहत् भाषा मोडेल (एलएलएम) सार्वजनिक गरेका छन्।",
            "यो मोडेललाई गिटहबमा खुला स्रोतका रूपमा उपलब्ध गराइएको छ।",
        ],
    },
    {
        "id": "5",
        "category": "विचार",
        "category_id": "opinion",
        "is_breaking": False,
        "title": "संघीयताको दश वर्ष: समीक्षा, उपलब्धि र अझै सुल्झन नसकेका गाँठाहरू",
        "summary": "संविधान जारी भएको एक दशक पुग्दै गर्दा वित्तीय संघीयता, कर्मचारी समायोजन र स्थानीय तहको स्वायत्ततामा देखिएका व्यवहारिक चुनौतीहरूको गहिरो विश्लेषण।",
        "image": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
        "author": "प्रा. डा. पीताम्बर शर्मा",
        "location": "काठमाडौं",
        "time_ago": "२ घण्टा अगाडि",
        "date_bs": "२०८१ असोज १९, आइतबार",
        "views": "८,१५०",
        "read_time": 6,
        "tags": ["विचार", "संघीयता", "संविधान", "सम्पादकीय"],
        "paragraphs": [
            "नेपालको नयाँ संविधानले परिकल्पना गरेको तीन तहको संघीय संरचना अभ्यासमा आएको एक दशक पूरा भएको छ।",
            "स्थानीय तहले नागरिकलाई सेवा प्रवाहमा नजिक बनाए पनि वित्तीय स्वायत्ततामा अझै समस्या छ।",
        ],
    },
]

BREAKING_NEWS = [
    {"id": "1", "title": "संसदको चालु अधिवेशन आजै राति १२ बजेदेखि अन्त्य गर्न मन्त्रिपरिषद्को सिफारिस", "time": "२ मिनेट अगाडि"},
    {"id": "3", "title": "आईसीसी विश्वकप लिग-२: नेपालले क्यानडालाई ६ विकेटले हरायो", "time": "७ मिनेट अगाडि"},
    {"id": "2", "title": "नेपालको विदेशी मुद्रा सञ्चिति २० खर्ब रुपैयाँ नाघ्यो - राष्ट्र बैंक", "time": "१४ मिनेट अगाडि"},
]

poll_data = {
    "question": "के चालु आर्थिक वर्षमा सरकारले अघि सारेको आर्थिक सुधार नीतिले बजारको मन्दी कम गर्न सक्ला?",
    "total_votes": 14820,
    "options": [
        {"id": "yes", "text": "सक्छ (सकारात्मक संकेत देखिन थालेको छ)", "votes": 8150, "percentage": 55},
        {"id": "no", "text": "सक्दैन (कार्यान्वयन पक्ष कमजोर छ)", "votes": 5180, "percentage": 35},
        {"id": "not_sure", "text": "भन्न सकिन्न / पर्ख र हेर", "votes": 1490, "percentage": 10},
    ],
}

ticker_index = 0

@app.route('/')
def home():
    lead_story = ARTICLES[0]
    editorial_story = ARTICLES[4] if len(ARTICLES) > 4 else ARTICLES[0]
    trending_stories = ARTICLES[:5]
    regular_articles = ARTICLES[1:]

    return render_template(
        'ekantipur.jinja',
        fragment=None,  # Full HTML page
        categories=CATEGORIES,
        current_category='all',
        lead_story=lead_story,
        editorial_story=editorial_story,
        trending_stories=trending_stories,
        articles=regular_articles,
        next_page=2 if len(regular_articles) > 4 else None,
        remaining_count=0,
        poll=poll_data,
        current_breaking=BREAKING_NEWS[0],
        nepali_date="२०८१ असोज १९, आइतबार",
        english_date="Sunday, Oct 5, 2026",
        weather={"city": "काठमाडौं", "temp": "२२° से.", "condition": "आंशिक बदली"},
    )

@app.route('/api/category/<cat_id>')
def category_filter(cat_id):
    filtered = ARTICLES if cat_id == 'all' else [a for a in ARTICLES if a.get('category_id') == cat_id]
    return render_template(
        'ekantipur.jinja',
        fragment='news_feed',
        articles=filtered,
        next_page=None,
        current_category=cat_id,
        remaining_count=0,
    )

@app.route('/api/news')
def load_more():
    cat_id = request.args.get('category', 'all')
    filtered = ARTICLES if cat_id == 'all' else [a for a in ARTICLES if a.get('category_id') == cat_id]
    return render_template(
        'ekantipur.jinja',
        fragment='news_feed',
        articles=filtered,
        next_page=None,
        current_category=cat_id,
        remaining_count=0,
    )

@app.route('/api/ticker')
def ticker():
    global ticker_index
    ticker_index = (ticker_index + 1) % len(BREAKING_NEWS)
    return render_template(
        'ekantipur.jinja',
        fragment='ticker',
        current_breaking=BREAKING_NEWS[ticker_index],
    )

@app.route('/api/search')
def search():
    query = request.args.get('q', '').strip().lower()
    if not query:
        return ''
    results = [
        a for a in ARTICLES
        if query in a['title'].lower() or query in a['summary'].lower() or query in a['category'].lower()
    ]
    return render_template(
        'ekantipur.jinja',
        fragment='search_results',
        results=results,
        query=query,
    )

@app.route('/api/article/<article_id>')
def article_modal(article_id):
    article = next((a for a in ARTICLES if a['id'] == article_id), ARTICLES[0])
    return render_template(
        'ekantipur.jinja',
        fragment='article_modal',
        article=article,
    )

@app.route('/api/poll', methods=['POST'])
def vote_poll():
    chosen = request.form.get('option')
    opt = next((o for o in poll_data['options'] if o['id'] == chosen), None)
    if opt:
        opt['votes'] += 1
        poll_data['total_votes'] += 1
        for o in poll_data['options']:
            o['percentage'] = round((o['votes'] / poll_data['total_votes']) * 100)

    return render_template(
        'ekantipur.jinja',
        fragment='poll_result',
        poll=poll_data,
    )

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"eKantipur running on http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)
