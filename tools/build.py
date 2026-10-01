"""Builds every HTML page of the LXRY site.

Run from the repo root:  python3 tools/build.py
All content below comes from lxry.ae (plus the contact details supplied by the owner).
Never add prices, years in business, client counts or superlative claims.
"""
import html
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
E = html.escape
SITE = 'https://lxry-yachts.vercel.app'

YACHT_WA, YACHT_TEL, YACHT_DISP = 'https://wa.me/971552910101', '+971552910101', '+971 55 291 0101'
WS_WA, WS_TEL, WS_DISP = 'https://wa.me/971581258311', '+971581258311', '+971 58 125 8311'
EMAIL = 'lxryae@gmail.com'
MAPS_URL = 'https://www.google.com/maps/search/?api=1&amp;query=Jumeirah+3+Fishing+Harbour%2C+Umm+Suqeim+2%2C+Dubai'

SOCIALS = [
    ('instagram', 'Instagram', 'https://instagram.com/lxryae'),
    ('tiktok', 'TikTok', 'https://tiktok.com/@lxryae'),
    ('facebook', 'Facebook', 'https://facebook.com/lxryae'),
    ('snapchat', 'Snapchat', 'https://snapchat.com/add/lxryae'),
    ('youtube', 'YouTube', 'https://youtube.com/@lxryae'),
    ('linkedin', 'LinkedIn', 'https://www.linkedin.com/company/lxryae'),
    ('whatsapp', 'WhatsApp', 'https://wa.me/971581258311'),
]

NAV = [
    ('yachts.html', 'Yachts'),
    ('water-sports.html', 'Water Sports'),
    ('fishing-events.html', 'Fishing & Events'),
    ('gallery.html', 'Gallery'),
    ('about.html', 'About'),
    ('faq.html', 'FAQ'),
    ('contact.html', 'Contact'),
]

# ---------------------------------------------------------------- data
# Specs from each boat's page on lxry.ae
FLEET = [
    dict(slug='jet-boat-38ft', key='jetboat', kicker='Speed boat', name='Jet Boat 38 ft', guests=6, length=38,
         third=('Crew', 2), card_alt='Jet Boat 38 ft speed boat moored in the marina', photos=6,
         features=['Captain & sailor', 'Bluetooth sound system', 'Outdoor sunbed', 'Ice box', 'Life jackets', 'Cruising & swimming'],
         table=[('Length', '38 feet'), ('Activities', 'Cruising, swimming'), ('Crew', '1 captain, 1 sailor'), ('Capacity', '6 persons'),
                ('Sunbed', 'Outdoor'), ('Life jackets', 'Yes'), ('Sound system', 'Bluetooth'), ('Ice box', 'Available'),
                ('Included', 'Water, ice & soft drinks')]),
    dict(slug='yacht-44ft', key='y44', kicker='Yacht', name='Yacht 44 ft', guests=12, length=44, third=('Bedrooms', 1),
         card_alt='Yacht 44 ft moored in the marina', photos=8,
         features=['Living room', '1 bathroom', 'Sun deck', 'Kitchen', '2 screens', 'Bluetooth sound system', 'BBQ grill', 'Cruising, swimming & fun fishing'],
         table=[('Size', '44 feet'), ('Activities', 'Cruising, swimming, fun fishing'), ('Crew', '1 captain, 1 sailor'), ('Capacity', '12 persons'),
                ('Rooms', 'Living room, 1 bedroom'), ('Bathroom', '1'), ('Sunbed', 'Outdoor'), ('Screens', '2'), ('Sound system', 'Bluetooth'),
                ('Grill', 'BBQ machine'), ('Events', 'Decoration, cake'), ('Included', 'Soft drinks, water, ice')]),
    dict(slug='yacht-45ft', key='y45', kicker='Yacht', name='Yacht 45 ft', guests=12, length=45, third=('Bedrooms', 1),
         card_alt='Yacht 45 ft cruising at speed on open water', photos=8,
         features=['Living room', '1 bathroom', 'Sun deck', 'Kitchen', '2 screens', 'Bluetooth sound system', 'Electric grill', 'Events available'],
         table=[('Length', '45 feet'), ('Activities', 'Cruising, swimming'), ('Crew', '1 captain, 1 sailor'), ('Capacity', '12 persons'),
                ('Rooms', 'Living room, 1 bedroom'), ('Bathroom', '1'), ('Sunbed', 'Outdoor'), ('Screens', '2'), ('Sound system', 'Bluetooth'),
                ('Grill', 'Electric'), ('Events', 'Available'), ('Included', 'Water, ice & soft drinks')]),
    dict(slug='yacht-50ft', key='y50', kicker='Yacht', name='Yacht 50 ft', guests=18, length=50, third=('Bedrooms', 2),
         card_alt='Yacht 50 ft at sea in front of the Burj Al Arab', photos=8,
         features=['Living room', '2 bathrooms', 'Sun deck', 'Kitchen', '2 screens', 'Bluetooth sound system', 'Electric grill', 'Events available'],
         table=[('Length', '50 feet'), ('Activities', 'Cruising, swimming'), ('Crew', '1 captain, 1 sailor'), ('Capacity', '18 persons'),
                ('Rooms', 'Living room, 2 bedrooms'), ('Bathrooms', '2'), ('Sunbed', 'Outdoor'), ('Screens', '2'), ('Sound system', 'Bluetooth'),
                ('Grill', 'Electric'), ('Events', 'Available'), ('Included', 'Water, ice & soft drinks')]),
    dict(slug='yacht-55ft', key='y55', kicker='Yacht', name='Yacht 55 ft', guests=12, length=55, third=('Bedrooms', 2),
         card_alt='Yacht 55 ft cruising along the Dubai coast', photos=8,
         features=['Living room', '2 bathrooms', 'Sun deck', 'Kitchen', '2 screens', 'Bluetooth sound system', 'Electric grill', 'Events available'],
         table=[('Length', '55 feet'), ('Activities', 'Cruising, swimming'), ('Crew', '1 captain, 1 sailor'), ('Capacity', '12 persons'),
                ('Rooms', 'Living room, 2 bedrooms'), ('Bathrooms', '2'), ('Sunbed', 'Outdoor'), ('Screens', '2'), ('Sound system', 'Bluetooth'),
                ('Grill', 'Electric'), ('Events', 'Available'), ('Included', 'Water, ice & soft drinks')]),
    dict(slug='yacht-80ft', key='y80', kicker='Yacht', name='Yacht 80 ft', guests=32, length=80, third=('Bedrooms', 2),
         card_alt='Yacht 80 ft on turquoise water', photos=8,
         features=['Captain & 2 sailors', 'Living room', '2 bathrooms', 'Sun deck', 'Kitchen', '2 screens', 'Bluetooth sound system', 'Electric grill', 'Events available'],
         table=[('Length', '80 feet'), ('Activities', 'Cruising, swimming'), ('Crew', '1 captain, 2 sailors'), ('Capacity', 'Up to 32 persons'),
                ('Rooms', 'Living room, 2 bedrooms'), ('Bathrooms', '2'), ('Sunbed', 'Outdoor'), ('Screens', '2'), ('Sound system', 'Bluetooth'),
                ('Grill', 'Electric'), ('Events', 'Available'), ('Included', 'Water, ice & soft drinks')]),
    dict(slug='yacht-82ft', key='y82', kicker='Yacht', name='Yacht 82 ft', guests=35, length=82, third=('Bedrooms', 2),
         card_alt='Yacht 82 ft cruising on calm water', photos=8,
         features=['Captain & 2 sailors', 'Living room', '2 bathrooms', 'Sun deck', 'Kitchen', '2 screens', 'Bluetooth sound system', 'Electric grill', 'Events available'],
         table=[('Length', '82 feet'), ('Activities', 'Cruising, swimming'), ('Crew', '1 captain, 2 sailors'), ('Capacity', '35 persons'),
                ('Rooms', 'Living room, 2 bedrooms'), ('Bathrooms', '2'), ('Sunbed', 'Outdoor'), ('Screens', '2'), ('Sound system', 'Bluetooth'),
                ('Grill', 'Electric'), ('Events', 'Available'), ('Included', 'Water, ice & soft drinks')]),
    dict(slug='tarrad-40ft', key='tarrad', kicker='Fishing boat', name='Tarrad 40 ft', guests=12, length=40, third=('Crew', 2),
         card_alt='Tarrad 40 ft fishing boat in the marina', photos=6,
         features=['Captain & sailor', 'Fishing equipment', 'Bluetooth sound system', 'Outdoor sunbed', 'Ice box', 'Cruising & fishing'],
         table=[('Length', '40 feet'), ('Activities', 'Cruising, fishing'), ('Crew', '1 captain, 1 sailor'), ('Capacity', '12 persons'),
                ('Sunbed', 'Outdoor'), ('Fishing equipment', 'Yes'), ('Sound system', 'Bluetooth'), ('Ice box', 'Available'),
                ('Included', 'Water, ice & soft drinks')]),
]
YACHTS = [f for f in FLEET if f['key'] != 'tarrad']

SPORTS = [
    dict(key='jetski', name='Jet Ski', alt=['Jet ski riding in front of Atlantis, The Palm', 'Two riders on a jet ski', 'Couple on a jet ski near Dubai Marina'],
         specs=[('Model', 'Yamaha'), ('Engine', '1800cc'), ('Capacity', '2')], age='Driver 16+', notes=[],
         text='A Yamaha supercharged 1800cc jet ski for beginners and experienced riders. Each ride starts with a safety briefing. Ride past Palm Jumeirah, JBR and the Burj Al Arab.'),
    dict(key='parasailing', name='Parasailing', alt=['Parasail flying beside the Burj Al Arab', 'Tandem parasailing over turquoise water', 'View down from a parasail'],
         specs=[('Height', '120 m'), ('Boat', 'Parasail'), ('Capacity', '8')], age='[MINIMUM AGE]', notes=[],
         text='Fly up to 120 metres above the water and take in the Dubai skyline, the Burj Al Arab and the Palm. The mate goes over the safety instructions before the captain calls up the first flyers.'),
    dict(key='flyboard', name='Fly Board', alt=['Two flyboard riders above the water in Dubai Marina', 'Flyboard rider rising above the sea', 'Flyboard riders beside a jet ski'],
         specs=[('Powered by', 'Jet ski'), ('Height', '10 m'), ('Capacity', '1')], age='[MINIMUM AGE]', notes=[],
         text='The water jet can lift you up to 10 metres into the air, so you can fly, jump and dive over the water. Instructors guide you at your own pace; on average it takes 5 to 15 minutes to get comfortable.'),
    dict(key='wakeboard', name='Wake Board', alt=['Wakeboarder riding at sunset near Ain Dubai', 'Wakeboarder in silhouette at sunset', 'Wakeboarder carving through spray'],
         specs=[('Towed by', 'Jet boat'), ('Capacity', '6')], age='[MINIMUM AGE]', notes=[],
         text='Wakeboarding for beginners and skilled riders, with professional instructors on board. All the equipment is provided, along with free water and towels.'),
    dict(key='waterski', name='Water Ski', alt=['Water skier on the Dubai coast', 'Water skier in the spray', 'Water skier on calm water'],
         specs=[('Towed by', 'Jet boat')], age='[MINIMUM AGE]', notes=[],
         text='Water skiing behind our towing boats with professional instructors on board. We provide all the necessary equipment, free water and towels.'),
    dict(key='banana', name='Banana Boat', alt=['Group riding a banana boat', 'Friends waving from a banana boat', 'Banana boat ride in front of Dubai towers'],
         specs=[('Towed by', 'Jet boat'), ('Capacity', '5')], age='Over 6', notes=['Not suitable during pregnancy'],
         text='A 15-minute banana ride for family and friends, up to 5 persons. Life jackets and safety instructions from a professional instructor are included. Children must be over 6 years old.'),
    dict(key='donut', name='Donut Ride', alt=['Two riders on a towed donut ride', 'Guests laughing on a donut ride', 'Donut ride towed at speed'],
         specs=[('Towed by', 'Speed boat'), ('Capacity', '4')], age='Over 3', notes=['Not suitable during pregnancy'],
         text='A towed donut ride for up to 4 persons. Similar to the banana boat and easy for the whole family.'),
]

FISH = ['Orange Spotted Trevally (Jesh Um Al Hala)', 'Two Bar Seabream (Faskar)', 'Black-Streaked Monocle Bream (Ebzimi)',
        'Yellow Bar Angelfish (Anfooz)', 'Sordid Sweetlips (Yanam)', "Ehrenberg's Snapper (Naiser)", 'Yellow Fin Seabream (Shaam)',
        'Blackspotted Rubberlip (Hilali)', 'Giant Sea Catfish (Khan)', 'Yellow Tail Scad (Durduman)']

EVENT_SERVICES = [
    ('Parties', 'Meetings, birthdays, wedding anniversaries and more on a yacht in Dubai.'),
    ('Meals', 'Choose from a selection of menus to serve your guests on board.'),
    ('Photography', 'A photographer can join your cruise to capture the views and your moments.'),
    ('Roses', 'Add bouquets of roses to your trip to say what words cannot.'),
    ('Cake', 'A catalogue of cakes to suit every kind of occasion.'),
    ('Decoration', 'Decoration packages for every occasion, made to order.'),
]

DESTINATIONS = ['Burj Al Arab', 'Atlantis', 'Jumeira', 'Palm Jumeirah', 'JBR', 'Dubai Marina', 'Ain Dubai', 'Dubai Water Canal', 'Dubai Harbour']

REVIEWS = [
    ('Fantastic time with a personalized tour of the coast of Dubai and around the eye. The boat was clean and two stories and we had music and a great time.', 'Bassam Alamri'),
    ('It is a must do when in Dubai. One of the best ways to see the city and the beautiful high rise buildings, hotels, malls and the restaurants by sea.', 'Nabeel Choudhry'),
    ('Very beautiful decoration! The best birthday party. The crew is helpful and the yacht is very clean. We really enjoyed it. Thank you, Luxury Yachts!', 'Ex. Salama'),
]

GALLERY = [
    ('gallery-01', 'White yacht cruising past Atlantis The Royal on Palm Jumeirah', True),
    ('gallery-02', 'Yacht in front of Atlantis The Royal', False),
    ('gallery-03', 'Yacht beside Ain Dubai at Bluewaters', False),
    ('gallery-04', 'Yacht at sunset in front of Atlantis, The Palm', False),
    ('gallery-05', 'Shaded upper deck with white seating', False),
    ('gallery-06', 'Flybridge lounge with sea view', True),
    ('gallery-07', 'Main saloon with cream leather seating', True),
    ('gallery-08', 'Tandem parasailing over turquoise water', False),
    ('gallery-09', 'Yacht moored in the harbour', False),
    ('gallery-10', 'Two riders on a jet ski', False),
    ('gallery-12', 'Saloon with lounge seating and screen', False),
    ('gallery-11', 'Bow of the yacht heading towards the Burj Al Arab', True),
]

PHOTO_ALTS = {
    'jetboat': ['White and blue Jet Boat 38 ft moored in the marina', 'Bow of the Jet Boat with blue cushioned seating', 'Jet Boat cockpit with blue and white seats',
                'Jet Boat bow seating with blue cushions', 'Jet Boat rear seating and deck', 'Jet Boat helm and steering wheel'],
    'tarrad': ['Tarrad 40 ft fishing boat moored among yachts', 'Bow of the Tarrad 40 ft at its berth', 'Open deck of the Tarrad 40 ft',
               'Tarrad helm under the shade canopy', 'Tarrad deck and canopy in the marina', 'Tarrad helm console'],
    'y44': ['Yacht 44 ft moored at a marina pontoon', 'Yacht 44 ft flybridge seating under the canopy', 'Yacht 44 ft rear deck seating',
            'Yacht 44 ft saloon with cream L-shaped sofa', 'Yacht 44 ft saloon sofa and television', 'Yacht 44 ft bedroom with a double bed',
            'Yacht 44 ft bow sun deck in the marina', 'Yacht 44 ft bow with Dubai Marina towers behind'],
    'y45': ['Yacht 45 ft cruising at speed on open water', 'Yacht 45 ft upper deck seating', 'Yacht 45 ft white deck seating',
            'Yacht 45 ft saloon with wood panelling and cream seats', 'Yacht 45 ft saloon dining table', 'Yacht 45 ft helm and steering wheel',
            'Yacht 45 ft master bedroom', 'Yacht 45 ft bow on open water'],
    'y50': ['White 50 ft yacht at sea in front of the Burj Al Arab', 'Yacht 50 ft cruising past Atlantis The Royal', 'White 50 ft yacht cruising past Dubai Marina towers',
            'Yacht 50 ft saloon with cream sofas', 'Yacht 50 ft saloon with wooden bar', 'Yacht 50 ft rear deck seating with towers behind',
            'Yacht 50 ft flybridge seating facing the Burj Al Arab', 'Yacht 50 ft bedroom'],
    'y55': ['Yacht 55 ft cruising past Atlantis The Royal', 'Yacht 55 ft cruising along the Dubai coast', 'Yacht 55 ft beside Ain Dubai at Bluewaters',
            'Yacht 55 ft bow heading towards the Burj Al Arab', 'Yacht 55 ft flybridge lounge with a view of the Burj Al Arab', 'Yacht 55 ft flybridge seating',
            'Yacht 55 ft saloon with sofa and television', 'Yacht 55 ft cabin with a double bed'],
    'y80': ['Yacht 80 ft on turquoise water', 'Yacht 80 ft moored in the harbour', 'Yacht 80 ft rear deck seating with a table',
            'Yacht 80 ft shaded upper deck', 'Yacht 80 ft upper deck lounge', 'Yacht 80 ft saloon with red cushions',
            'Yacht 80 ft saloon lounge seating', 'Yacht 80 ft bedroom'],
    'y82': ['Yacht 82 ft in front of Atlantis The Royal', 'Yacht 82 ft cruising on calm water', 'Yacht 82 ft at speed on open water',
            'Yacht 82 ft flybridge helm and seating', 'Yacht 82 ft bow heading towards the Burj Al Arab', 'Yacht 82 ft main saloon',
            'Yacht 82 ft lower helm station', 'Yacht 82 ft bedroom'],
}

TRADE_LICENSE = '[TRADE LICENSE NO.]'
MAP_EMBED = 'https://maps.google.com/maps?q=Jumeirah%203%20Fishing%20Harbour%2C%20Umm%20Suqeim%202%2C%20Dubai&amp;t=m&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed'
VIDEO_EMBED = 'https://www.youtube-nocookie.com/embed/-a6D9CRf0Cg'
LEGAL = [('privacy.html', 'Privacy Policy'), ('terms.html', 'Terms &amp; Conditions'), ('cookies.html', 'Cookie Policy'), ('booking-policy.html', 'Booking &amp; Cancellation')]

# ---------------------------------------------------------------- helpers
SPRITE = open(os.path.join(ROOT, 'tools', 'sprite.svg')).read()


def icon(n):
    return f'<svg aria-hidden="true" focusable="false"><use href="#i-{n}"/></svg>'


def t(label):
    """Button label with the rolling-text hover effect."""
    return label


def btn(href, label, cls='btn-primary', ico=None, ext=False, aria=None, magnet=False, attrs=''):
    a = f' target="_blank" rel="noopener"' if ext else ''
    ar = f' aria-label="{E(aria)}"' if aria else ''
    i = icon(ico) if ico else ''
    h = f'<a class="btn {cls}" href="{href}"{a}{ar}{attrs}>{i}{t(label)}</a>'
    return h


def wa_call(kind, about, size='btn-sm', light=False, magnet=False):
    wa, tel = (YACHT_WA, YACHT_TEL) if kind == 'yacht' else (WS_WA, WS_TEL)
    c1, c2 = ('btn-light', 'btn-ghost') if light else ('btn-primary', 'btn-outline')
    return ('<div class="btn-row">'
            + btn(wa, 'WhatsApp', f'{c1} {size}', 'whatsapp', True, f'WhatsApp about {about}', magnet)
            + btn(f'tel:{tel}', 'Call', f'{c2} {size}', 'phone', False, f'Call about {about}', magnet)
            + '</div>')


def socials(extra=''):
    lis = ''.join(f'<li><a class="social" href="{u}" target="_blank" rel="noopener" aria-label="LXRY on {lab}">{icon(n)}</a></li>'
                  for n, lab, u in SOCIALS)
    return f'<ul class="socials{extra}">{lis}</ul>'


def img(src, alt, w=900, h=600, lazy=True, extra=''):
    lz = ' loading="lazy" decoding="async"' if lazy else ''
    return f'<img src="{src}" alt="{E(alt)}" width="{w}" height="{h}"{lz}{extra}>'


def head_label(label, title, lead=None, split_cls=True, dark=False):
    lead_html = f'<p class="lead">{lead}</p>' if lead else ''
    return f'''
      <div class="section-head{' split' if lead else ''}">
        <div><p class="label">{label}</p><h2>{title}</h2></div>
        {lead_html}
      </div>'''


# ---------------------------------------------------------------- shared components
def fleet_card(f):
    specs = [('Guests', f['guests']), f['third'], ('Length', f"{f['length']} ft")]
    dl = ''.join(f'<div><dt>{k}</dt><dd>{v}</dd></div>' for k, v in specs)
    fl = ''.join(f'<li>{x}</li>' for x in f['features'])
    return f'''
      <article class="card">
        <a class="media" href="{f['slug']}.html" aria-label="View {E(f['name'])}">{img(f"images/card-{f['key']}.jpg", f['card_alt'])}</a>
        <p class="kicker">{f['kicker']}</p>
        <h3><a href="{f['slug']}.html">{f['name']}</a></h3>
        <dl class="specs">{dl}</dl>
        <ul class="features">{fl}</ul>
        <div class="card-foot">
          <span class="price">Price on request</span>
          {wa_call('yacht', f['name'])}
        </div>
      </article>'''


def included_section(image='images/included.jpg', alt='Shaded yacht deck with white seating overlooking Dubai Marina'):
    return f'''
  <section class="section" id="included" aria-labelledby="inc-title">
    <div class="wrap included-grid">
      <div class="media">{img(image, alt, 1400, 933)}</div>
      <div>
        <p class="label">With every yacht</p>
        <h2 id="inc-title">Everything is taken care of.</h2>
        <ul class="inc-list">
          <li><span>01</span>Drinking water &amp; ice</li>
          <li><span>02</span>Fresh towels</li>
          <li><span>03</span>Electric griller</li>
          <li><span>04</span>Meet &amp; greet assistance</li>
          <li><span>05</span>Sound system</li>
        </ul>
        <p class="note">You are welcome to bring your own food.</p>
      </div>
    </div>
  </section>'''


def offer_section():
    return f'''
  <section class="offer" aria-labelledby="offer-title">
    <span class="big-num" aria-hidden="true">20%</span>
    <div class="wrap">
      <div>
        <p class="label">Special offer</p>
        <h2 id="offer-title">20% off when you book water sports.</h2>
        <p class="small">Jet Ski · Parasailing · Fly Board · Wake Board · Banana &amp; Donut Ride</p>
        <p class="terms">Offer terms: [OFFER TERMS]. See our <a href="booking-policy.html">Booking &amp; Cancellation Policy</a>.</p>
      </div>
      {wa_call('ws', 'the water sports offer', '', True, True)}
    </div>
  </section>'''


def reviews_section():
    figs = ''.join(f'<figure class="review"><blockquote>{q}</blockquote><figcaption><cite>{n}</cite></figcaption></figure>' for q, n in REVIEWS)
    return f'''
  <section class="section on-dark" id="reviews" aria-labelledby="rev-title">
    <div class="wrap">
      <div class="section-head"><p class="label">Guest words</p><h2 id="rev-title">What our guests say.</h2></div>
      <div class="reviews">{figs}</div>
    </div>
  </section>'''


def follow_section():
    return f'''
  <section class="follow" aria-labelledby="follow-title">
    <div class="bg">{img('images/follow.jpg', '', 1280, 960)}</div>
    <div class="wrap">
      <p class="label">@lxryae</p>
      <h2 id="follow-title">Follow our trips.</h2>
      <p class="lead">Yachts, water sports and celebrations from our days on the water.</p>
      <div class="btn-row">
        {btn('https://instagram.com/lxryae', 'Instagram', 'btn-light btn-lg', 'instagram', True, 'LXRY on Instagram', True)}
        {btn('gallery.html#tour', 'Watch a tour', 'btn-ghost btn-lg', 'youtube')}
      </div>
    </div>
  </section>'''


def cta_section():
    return f'''
  <section class="section on-dark" aria-labelledby="cta-title">
    <div class="wrap">
      <div class="section-head"><p class="label">Book your day</p><h2 id="cta-title">Let’s plan your next trip.</h2></div>
      <hr class="rule">
      <div class="cta-grid" style="padding-top:48px">
        <p class="lead" style="margin:0">Message us with your date, number of hours and guests, and we will get back to you.</p>
        <div><p class="who">Yacht rental</p><a class="num nums" href="tel:{YACHT_TEL}">{YACHT_DISP}</a>{wa_call('yacht', 'yacht rental', 'btn-sm', True)}</div>
        <div><p class="who">Water sports</p><a class="num nums" href="tel:{WS_TEL}">{WS_DISP}</a>{wa_call('ws', 'water sports', 'btn-sm', True)}</div>
      </div>
    </div>
  </section>'''


def embed(kind, src, title, action, heading, note, poster=None):
    """Third-party iframe that loads only after cookie consent or an explicit click."""
    bg = f'<img class="embed-poster" src="{poster}" alt="" loading="lazy" decoding="async">' if poster else ''
    return f'''<div class="embed embed-{kind}" data-embed data-src="{src}" data-title="{E(title)}">
          {bg}<div class="embed-ph">
            <p class="embed-h">{heading}</p>
            <p class="embed-note">{note} <a href="cookies.html">Cookie Policy</a></p>
            <button class="btn btn-primary btn-sm" type="button" data-embed-load>{action}</button>
          </div>
        </div>'''


def gallery_grid(items, cls='gallery', base='images/'):
    out = ''.join(
        f'<button class="g-item media{" wide" if w else ""}" type="button" data-full="{base}{k}.jpg" aria-label="Open photo: {E(a)}">'
        f'<img src="{base}{k}-sm.jpg" alt="{E(a)}" loading="lazy" decoding="async"></button>'
        for k, a, w in items)
    return f'<div class="{cls}">{out}</div>'


LIGHTBOX = '''
<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" aria-hidden="true">
  <figure><img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt=""></figure>
  <button class="lb-btn lb-close" type="button" aria-label="Close"><svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19"/></svg></button>
  <button class="lb-btn lb-prev" type="button" aria-label="Previous photo"><svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8"/></svg></button>
  <button class="lb-btn lb-next" type="button" aria-label="Next photo"><svg viewBox="0 0 24 24"><path d="M9 4l8 8-8 8"/></svg></button>
  <p class="lb-count" aria-live="polite"></p>
</div>'''


def page(filename, title, description, body, current=None, og_image='images/og.jpg', lightbox=False, base=''):
    canonical = SITE + '/' + ('' if filename == 'index.html' else filename)
    cur = ' aria-current="page"'
    links = ''.join(f'<li><a href="{h}"{cur if h == current else ""}>{E(l)}</a></li>' for h, l in NAV)
    mlinks = ''.join(f'<li><a href="{h}"><small>0{i}</small>{E(l)}</a></li>' for i, (h, l) in enumerate([('index.html', 'Home')] + NAV, 1))
    full_title = title if filename == 'index.html' else f'{title} — LXRY Luxury Yachts Dubai'
    html_out = f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{E(full_title)}</title>
  <meta name="description" content="{E(description)}">
  <meta name="theme-color" content="#0D1114">{base}
  <link rel="canonical" href="{canonical}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="LXRY — Luxury Yachts">
  <meta property="og:title" content="{E(full_title)}">
  <meta property="og:description" content="{E(description)}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="{SITE}/{og_image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{E(full_title)}">
  <meta name="twitter:description" content="{E(description)}">
  <meta name="twitter:image" content="{SITE}/{og_image}">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <link rel="preload" href="fonts/inter-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="fonts/cormorant-garamond-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
{SPRITE}
<a class="skip" href="#main">Skip to content</a>

<header class="nav">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="LXRY, Luxury Yachts, home">
      <span class="brand-mark">LXRY</span>
      <span class="brand-sub">Luxury Yachts · Dubai</span>
    </a>
    <nav aria-label="Main"><ul class="nav-links">{links}</ul></nav>
    <span class="nav-cta">{btn(YACHT_WA, 'Book a Yacht', 'btn-light btn-sm', 'whatsapp', True)}</span>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><span></span></button>
  </div>
</header>

<div class="mobile-menu" id="mobile-menu" aria-hidden="true">
  {socials()}
  <ul class="m-links">{mlinks}</ul>
  <div class="m-contact">
    <p class="label">Yacht rental · {YACHT_DISP}</p>
    {wa_call('yacht', 'yacht rental', 'btn-sm', True)}
    <p class="label">Water sports · {WS_DISP}</p>
    {wa_call('ws', 'water sports', 'btn-sm', True)}
  </div>
</div>

<main id="main">
{body}
</main>

<footer class="footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <p style="margin:0"><strong class="f-name">Luxury Yachts L.L.C</strong><br>Licensed by Dubai Maritime City Authority<br>Trade licence no. {TRADE_LICENSE}</p>
        {socials()}
      </div>
      <div>
        <p class="label">Explore</p>
        <ul>{''.join(f'<li><a href="{h}">{E(l)}</a></li>' for h, l in NAV[:4])}</ul>
      </div>
      <div>
        <p class="label">Company</p>
        <ul>{''.join(f'<li><a href="{h}">{E(l)}</a></li>' for h, l in NAV[4:])}</ul>
      </div>
      <div>
        <p class="label">Contact</p>
        <ul>
          <li>Yacht rental: <a href="tel:{YACHT_TEL}">{YACHT_DISP}</a></li>
          <li>Water sports: <a href="tel:{WS_TEL}">{WS_DISP}</a></li>
          <li><a href="mailto:{EMAIL}">{EMAIL}</a></li>
          <li><address>Jumeirah 3, Fishing Harbour,<br>Umm Suqeim 2, Dubai, UAE</address></li>
        </ul>
      </div>
    </div>
    <div class="footer-word" aria-hidden="true"><span>L</span><span>X</span><span>R</span><span>Y</span></div>
    <nav class="footer-legal" aria-label="Legal">
      <ul>{''.join(f'<li><a href="{h}">{l}</a></li>' for h, l in LEGAL)}<li><button class="linkish" type="button" data-cookie-settings>Cookie settings</button></li></ul>
    </nav>
    <div class="footer-base">
      <span>© <span id="year">2026</span> Luxury Yachts L.L.C. All rights reserved.</span>
      <a href="#main">Back to top ↑</a>
    </div>
  </div>
</footer>

<div class="consent" id="consent" role="region" aria-label="Cookie consent" hidden>
  <div class="consent-inner">
    <p><strong>Cookies and third-party content.</strong> This site only stores your choice below. If you accept, we load Google Maps and a YouTube video, which may set cookies and send data to Google. Read our <a href="cookies.html">Cookie Policy</a>.</p>
    <div class="consent-btns">
      <button class="btn btn-primary" type="button" data-consent="accepted">Accept</button>
      <button class="btn btn-primary" type="button" data-consent="rejected">Reject</button>
    </div>
  </div>
</div>

<aside class="fab-wrap" aria-label="Quick contact"><a class="btn fab" href="{WS_WA}" target="_blank" rel="noopener" aria-label="Chat with LXRY on WhatsApp (opens in a new tab)">{icon('whatsapp')}</a></aside>
{LIGHTBOX if lightbox else ''}
<script src="main.js" defer></script>
</body>
</html>
'''
    with open(os.path.join(ROOT, filename), 'w') as fh:
        fh.write(html_out)


def hero(label, title, lead, image, alt, buttons='', short=False, foot=False):
    foot_html = f'''
      <div class="hero-foot">
        <span>Licensed by Dubai Maritime City Authority</span>
      </div>''' if foot else ''
    return f'''
  <section class="hero{' short' if short else ''}" aria-labelledby="hero-title">
    <div class="hero-media">{img(image, alt, 1500, 1000, lazy=False, extra=' fetchpriority="high"')}</div>
    <div class="wrap">
      <p class="label">{label}</p>
      <h1 id="hero-title">{title}</h1>
      <p class="lead">{lead}</p>
      {f'<div class="btn-row">{buttons}</div>' if buttons else ''}
      {foot_html}
    </div>
  </section>'''


# ================================================================ pages
def build_home():
    hcards = ''.join(f'''
        <a class="hcard" href="{f['slug']}.html">
          <span class="num">0{i}</span>
          <div class="media">{img(f"images/fleet/{f['key']}-1-sm.jpg", f['card_alt'], 720, 480)}</div>
          <h3>{f['name']}</h3>
          <p>{f['guests']} guests · {f['length']} ft</p>
        </a>''' for i, f in enumerate(FLEET, 1))
    panels = [
        ('yachts.html', 'images/gallery-01.jpg', 'Yacht cruising off Palm Jumeirah', '01', 'Yacht Rental', 'Private yachts from 38 to 82 feet, each with its own captain and crew.'),
        ('water-sports.html', 'images/sports/flyboard-1.jpg', 'Flyboard riders above the water in Dubai Marina', '02', 'Water Sports', 'Jet ski, parasailing, fly board, wake board, water ski, banana boat and donut rides.'),
        ('fishing-events.html', 'images/sports/fishing-2.jpg', 'Guest holding a large fish caught on a fishing trip', '03', 'Fishing &amp; Events', 'Fishing trips on the Tarrad 40 ft, and birthdays, anniversaries and parties on board.'),
    ]
    ph = ''.join(f'''
      <a class="panel-x" href="{h}">
        <div class="media">{img(im, a, 1400, 933)}</div>
        <div><span class="idx">{n}</span><h3>{ttl}</h3><p>{d}</p><span class="link">Explore →</span></div>
      </a>''' for h, im, a, n, ttl, d in panels)
    body = hero('Yacht rental · Water sports · Dubai', 'Explore Dubai by sea.',
                'Private yachts from 38 to 82 feet, water sports, fishing trips and celebrations on board, arranged by Luxury Yachts L.L.C.',
                'images/hero.jpg', 'A white yacht cruising past the Dubai Marina skyline',
                btn(YACHT_WA, 'Book a Yacht', 'btn-primary', 'whatsapp', True, None, True) + btn('water-sports.html', 'Water Sports', 'btn-ghost', None, False, None, True), foot=True)
    body += f'''
  <section class="section" aria-label="Introduction">
    <div class="wrap">
      <p class="label">Luxury Yachts L.L.C</p>
      <p class="statement">Licensed by the Dubai Maritime City Authority, we arrange private yacht charters, water sports, fishing trips and celebrations on board, so you can see Dubai from the sea.</p>
    </div>
  </section>
  <section class="hfleet" aria-labelledby="fleet-title">
    <div class="wrap intro">
      <div class="section-head split" style="margin-bottom:0">
        <div><p class="label">The fleet</p><h2 id="fleet-title">Eight boats. One sea.</h2></div>
        <div><p class="lead">From a 38 ft jet boat for six to an 82 ft yacht for thirty-five. Tap any boat for photos and specs.</p></div>
      </div>
    </div>
    <div class="htrack">{hcards}
    </div>
    <p class="more"><a class="link" href="yachts.html">View the whole fleet →</a></p>
  </section>
  <section class="section" aria-labelledby="exp-title">
    <div class="wrap">
      {head_label('Experiences', 'Three ways to spend the day.')}
      <div class="panels">{ph}</div>
    </div>
  </section>
  {offer_section()}
  {included_section()}
  {reviews_section()}
  <section class="section" aria-labelledby="gal-title">
    <div class="wrap">
      {head_label('Gallery', 'Moments at sea.', 'Every picture has a story, and every story has a moment we would love to share with you.')}
      {gallery_grid(GALLERY[:8])}
      <p style="margin-top:40px"><a class="link" href="gallery.html">Full gallery →</a></p>
    </div>
  </section>
  {follow_section()}
  {cta_section()}'''
    page('index.html', 'LXRY — Luxury Yachts Dubai | Yacht Rental & Water Sports',
         'Private yacht rental, water sports, fishing trips and events in Dubai. Luxury Yachts L.L.C, licensed by the Dubai Maritime City Authority. Yachts from 38 to 82 ft.',
         body, lightbox=True)


def build_yachts():
    cards = ''.join(fleet_card(f) for f in YACHTS)
    body = hero('The fleet', 'Private yachts.', 'Seven boats from 38 to 82 feet, each with its own captain and crew. Prices are shared on request.',
                'images/fleet/y82-2.jpg', 'Yacht 82 ft cruising on calm water',
                btn(YACHT_WA, 'Book a Yacht', 'btn-primary', 'whatsapp', True, None, True), short=True)
    body += f'''
  <section class="section" aria-labelledby="list-title">
    <div class="wrap">
      {head_label('Choose your yacht', 'Find the right size for your group.', 'Tap a yacht for its full specifications and photo gallery, or message us with your date, number of hours and guests.')}
      <div class="cards">{cards}</div>
    </div>
  </section>
  <hr class="rule">
  {included_section('images/fleet/y55-5.jpg', 'Flybridge lounge with a view of the Burj Al Arab')}
  <section class="section on-dark" aria-labelledby="route-title">
    <div class="wrap two-col">
      <div><p class="label">The route</p><h2 id="route-title">Where the cruise goes.</h2></div>
      <dl class="route" style="color:var(--ivory)">
        <dt style="color:var(--platinum)">In 2 hours</dt><dd class="statement" style="font-size:clamp(1.5rem,2.6vw,2.2rem)">Marina Lagoon, JBR, Bluewaters, Dubai Eye, Kempinski Palace and Atlantis.</dd>
        <dt style="color:var(--platinum);margin-top:28px">In 3 hours</dt><dd class="statement" style="font-size:clamp(1.5rem,2.6vw,2.2rem)">The same route, continuing to the Burj Al Arab.</dd>
      </dl>
    </div>
  </section>
  {cta_section()}'''
    page('yachts.html', 'Yacht Rental', 'Private yacht rental in Dubai: Jet Boat 38 ft and yachts of 44, 45, 50, 55, 80 and 82 ft. Captain and crew included. Price on request.',
         body, current='yachts.html')


def build_detail(i, f):
    photos = [(f"fleet/{f['key']}-{n}", PHOTO_ALTS[f['key']][n - 1], False) for n in range(1, f['photos'] + 1)]
    nxt = FLEET[(i + 1) % len(FLEET)]
    third_k, third_v = f['third']
    rows = ''.join(f'<tr><th scope="row">{k}</th><td>{v}</td></tr>' for k, v in f['table'])
    fl = ''.join(f'<li>{x}</li>' for x in f['features'])
    is_fish = f['key'] == 'tarrad'
    parent = ('fishing-events.html', 'Fishing & Events') if is_fish else ('yachts.html', 'Yachts')
    body = hero(f"{f['kicker']} · {f['guests']} guests", f['name'] + '.', f"{f['length']} feet, up to {f['guests']} guests, with captain and crew.",
                f"images/fleet/{f['key']}-1.jpg", f['card_alt'],
                btn(YACHT_WA, 'WhatsApp', 'btn-primary', 'whatsapp', True, f"WhatsApp about {f['name']}", True)
                + btn(f'tel:{YACHT_TEL}', 'Call', 'btn-ghost', 'phone', False, f"Call about {f['name']}", True), short=True)
    body += f'''
  <section class="section" aria-labelledby="spec-title">
    <div class="wrap detail-top">
      <div>
        <p class="label"><a class="link" href="{parent[0]}">← {E(parent[1])}</a></p>
        <h2 id="spec-title">Specifications</h2>
        <dl class="big-specs" style="margin-top:40px">
          <div><dt>Guests</dt><dd>{f['guests']}</dd></div>
          <div><dt>{third_k}</dt><dd>{third_v}</dd></div>
          <div><dt>Feet</dt><dd>{f['length']}</dd></div>
        </dl>
        <table class="spec-table"><tbody>{rows}</tbody></table></div>
        <ul class="features" style="margin-top:28px">{fl}</ul>
      </div>
      <aside class="book-box" aria-label="Book the {E(f['name'])}">
        <p class="label">Book the {f['name']}</p>
        <span class="price">Price on request</span>
        <div class="btn-row">
          {btn(YACHT_WA, 'WhatsApp', 'btn-light', 'whatsapp', True, f"WhatsApp about {f['name']}")}
          {btn(f'tel:{YACHT_TEL}', 'Call', 'btn-ghost', 'phone', False, f"Call about {f['name']}")}
        </div>
        <p style="margin:22px 0 0;font-size:.9em;color:var(--ivory-75)"><a href="tel:{YACHT_TEL}" style="color:var(--ivory)">{YACHT_DISP}</a><br>Share your date, number of hours and guests and we will get back to you.</p>
      </aside>
    </div>
  </section>
  <section class="section" style="padding-top:0" aria-labelledby="photos-title">
    <div class="wrap">
      {head_label('On board', 'Photo gallery.')}
      {gallery_grid(photos, 'photo-grid')}
    </div>
  </section>
  <a class="next-yacht" href="{nxt['slug']}.html">
    <div class="media">{img(f"images/fleet/{nxt['key']}-1-sm.jpg", '', 720, 480)}</div>
    <div class="wrap"><p class="label">Next</p><h2>{nxt['name']} →</h2></div>
  </a>'''
    page(f"{f['slug']}.html", f['name'], f"{f['name']} for rent in Dubai: up to {f['guests']} guests, {f['length']} feet, captain and crew. Price on request from Luxury Yachts L.L.C.",
         body, current=parent[0], lightbox=True)


def build_sports():
    acts = ''
    for i, s in enumerate(SPORTS, 1):
        dl = ''.join(f'<div><dt>{k}</dt><dd>{v}</dd></div>' for k, v in s['specs'])
        notes = ''.join(f' · {n}' for n in s['notes'])
        acts += f'''
      <article class="activity" id="{s['key']}">
        <div class="act-media">
          <div class="media">{img(f"images/sports/{s['key']}-1.jpg", s['alt'][0], 1400, 933)}</div>
          <div class="media">{img(f"images/sports/{s['key']}-2.jpg", s['alt'][1], 1080, 720)}</div>
          <div class="media">{img(f"images/sports/{s['key']}-3.jpg", s['alt'][2], 1080, 720)}</div>
        </div>
        <div>
          <span class="num">0{i} / 0{len(SPORTS)}</span>
          <h2>{s['name']}</h2>
          <dl class="specs">{dl}</dl>
          <p class="desc">{s['text']}</p>
          <p class="age"><strong>Minimum age:</strong> {s['age']}{notes}</p>
          <div class="card-foot"><span class="price">Price on request</span>{wa_call('ws', s['name'])}</div>
        </div>
      </article>'''
    jump = ''.join(f'<li><a class="link" href="#{s["key"]}">{s["name"]}</a></li>' for s in SPORTS)
    body = hero('Water sports · Dubai', 'Water sports.', 'Jet ski, parasailing, fly board, wake board, water ski, banana boat and donut rides, with 20% off when you book.',
                'images/sports/flyboard-1.jpg', 'Two flyboard riders above the water in Dubai Marina',
                btn(WS_WA, 'WhatsApp', 'btn-primary', 'whatsapp', True, 'WhatsApp about water sports', True)
                + btn(f'tel:{WS_TEL}', 'Call', 'btn-ghost', 'phone', False, 'Call about water sports', True), short=True)
    body += f'''
  <section class="section" style="padding-bottom:0" aria-label="Activities">
    <div class="wrap">
      <ul class="pill-list" style="margin-bottom:40px">{jump}</ul>
      <aside class="safety" aria-labelledby="safety-title">
        <h2 id="safety-title">Safety</h2>
        <ul>
          <li>Life jackets are provided.</li>
          <li>Our team gives safety instructions before each activity starts.</li>
          <li>Minimum age: [MINIMUM AGE]. Where lxry.ae states an age, it is shown with the activity below.</li>
        </ul>
      </aside>
      {acts}
    </div>
  </section>
  {offer_section()}
  {cta_section()}'''
    page('water-sports.html', 'Water Sports', 'Jet ski, parasailing, fly board, wake board, water ski, banana boat and donut rides in Dubai. 20% off when you book water sports.',
         body, current='water-sports.html')


def build_fishing_events():
    tarrad = FLEET[-1]
    fish = ''.join(f'<li>{E(x)}</li>' for x in FISH)
    services = ''.join(f'<div class="service"><h3>{n}</h3><p>{d}</p></div>' for n, d in EVENT_SERVICES)
    body = hero('Fishing trips · Events', 'Fishing &amp; events.', 'Private fishing trips on the Tarrad 40 ft, and birthdays, anniversaries and parties on board, decorated to order.',
                'images/sports/fishing-2.jpg', 'Guest holding a large fish caught on a fishing trip',
                btn(YACHT_WA, 'WhatsApp', 'btn-primary', 'whatsapp', True, 'WhatsApp about fishing and events', True)
                + btn(f'tel:{YACHT_TEL}', 'Call', 'btn-ghost', 'phone', False, 'Call about fishing and events', True), short=True)
    body += f'''
  <section class="section" id="fishing" aria-labelledby="fish-title">
    <div class="wrap included-grid">
      <div class="media">{img('images/sports/fishing-1.jpg', 'Guest reeling in a fish from the boat', 1400, 933)}</div>
      <div>
        <p class="label">Fishing trips</p>
        <h2 id="fish-title">Cast off from the Tarrad 40 ft.</h2>
        <dl class="specs" style="margin-top:36px">
          <div><dt>Guests</dt><dd>12</dd></div><div><dt>Crew</dt><dd>2</dd></div><div><dt>Length</dt><dd>40 ft</dd></div>
        </dl>
        <p class="desc">Cruising and fishing with a captain and sailor, fishing equipment, a Bluetooth sound system, an outdoor sunbed and an ice box, with water, ice and soft drinks included.</p>
        <div class="btn-row" style="margin-top:28px">
          {btn('tarrad-40ft.html', 'See the Tarrad', 'btn-outline', None, False, None, True)}
          {btn(YACHT_WA, 'WhatsApp', 'btn-primary', 'whatsapp', True, 'WhatsApp about a fishing trip', True)}
        </div>
      </div>
    </div>
  </section>
  <section class="section on-dark" aria-labelledby="cal-title">
    <div class="wrap two-col">
      <div><p class="label">Fishing calendar</p><h2 id="cal-title">What you might catch in Dubai.</h2></div>
      <ul class="tag-list">{fish}</ul>
    </div>
  </section>
  <section class="section" id="events" aria-labelledby="ev-title">
    <div class="wrap">
      {head_label('Events &amp; decorations', 'Celebrate between the sky and the sea.', 'Decoration is made to order. Tell us the occasion and we will prepare the yacht for you.')}
      <div class="services">{services}</div>
    </div>
  </section>
  {reviews_section()}
  {cta_section()}'''
    page('fishing-events.html', 'Fishing & Events', 'Private fishing trips on the Tarrad 40 ft and yacht parties, birthdays and anniversaries in Dubai with decoration, cake, roses, meals and photography.',
         body, current='fishing-events.html')


def build_gallery():
    extra = [
        ('fleet/y50-2', 'Yacht 50 ft cruising past Atlantis The Royal', False),
        ('fleet/y55-3', 'Yacht 55 ft beside Ain Dubai at Bluewaters', False),
        ('fleet/y80-4', 'Shaded upper deck of the Yacht 80 ft', True),
        ('fleet/y45-1', 'Yacht 45 ft cruising at speed on open water', True),
        ('fleet/y82-5', 'Bow of the Yacht 82 ft heading towards the Burj Al Arab', False),
        ('fleet/y50-4', 'Yacht 50 ft saloon with cream sofas', False),
    ]
    items = GALLERY + extra
    body = hero('Gallery', 'Moments at sea.', 'Every picture has a story, and every story has a moment we would love to share with you.',
                'images/gallery-04.jpg', 'Yacht at sunset in front of Atlantis, The Palm', short=True)
    body += f'''
  <section class="section" aria-label="Photos">
    <div class="wrap">{gallery_grid(items)}</div>
  </section>
  <section class="section on-dark" id="tour" aria-labelledby="tour-title">
    <div class="wrap">
      {head_label('Video', 'Watch a tour.', 'A short tour of a day with LXRY, hosted on YouTube.')}
      {embed('video', VIDEO_EMBED, 'LXRY yacht tour video', 'Play video', 'LXRY tour video', 'Playing the video connects to YouTube (privacy-enhanced mode), which may set cookies.', 'images/gallery-11.jpg')}
      <p style="margin-top:20px"><a class="link" href="https://www.youtube.com/watch?v=-a6D9CRf0Cg" target="_blank" rel="noopener">Watch on YouTube (opens in a new tab)</a></p>
    </div>
  </section>
  {follow_section()}'''
    page('gallery.html', 'Gallery', 'Photos of LXRY yachts, water sports and days at sea in Dubai.', body, current='gallery.html', lightbox=True)


def build_about():
    dest = ''.join(f'<li>{d}</li>' for d in DESTINATIONS)
    body = hero('About us', 'Luxury Yachts L.L.C.', 'A limited liability company registered with Dubai Economy and licensed by the Dubai Maritime City Authority.',
                'images/fleet/y50-3.jpg', 'Yacht at sea in front of Dubai Marina towers', short=True, foot=True)
    body += f'''
  <section class="section" aria-label="Who we are">
    <div class="wrap">
      <p class="label">Our services</p>
      <p class="statement">We plan events, charter yachts, run fishing trips and offer water sports, from jet skis and banana boats to donut rides and fly boards.</p>
    </div>
  </section>
  <hr class="rule">
  <section class="section" aria-labelledby="mission-title">
    <div class="wrap two-col">
      <div><p class="label">Our mission</p><h2 id="mission-title">New experiences by sea.</h2></div>
      <p class="lead" style="margin:0">To deliver highly professional service and real adventure, giving every guest a new way to experience Dubai by sea and special memories to take home.</p>
    </div>
  </section>
  <section class="section on-dark" aria-labelledby="dest-title">
    <div class="wrap two-col">
      <div><p class="label">Destinations</p><h2 id="dest-title">Dubai from the water.</h2></div>
      <ul class="tag-list">{dest}</ul>
    </div>
  </section>
  {included_section()}
  {cta_section()}'''
    page('about.html', 'About', 'Luxury Yachts L.L.C is registered with Dubai Economy and licensed by the Dubai Maritime City Authority. Yacht charters, water sports, fishing trips and events in Dubai.',
         body, current='about.html')


def build_faq():
    qa = [
        ('How long have you been in business?', '<p>Since 2008. The Luxury Yachts name is relatively new, but our team brings long experience in yacht events and conventional events, and we are ready to impress you with our service.</p>'),
        ('What kind of events do you host on yachts?', '<p>We cater for private and social events of every size, from a solo cruise to a group party.</p>'),
        ('What does a yacht cruise include?', '<p>When you book a yacht on its own, it comes with water, ice, fresh towels and an electric griller. Some yachts also offer complimentary soft drinks. Every yacht has between one and three comfortable rooms below deck where you can relax or change.</p>'),
        ('Which route does the cruise follow?', '<dl class="route"><dt>In 2 hours</dt><dd>Marina Lagoon, JBR, Bluewaters, Dubai Eye, Kempinski Palace and Atlantis.</dd><dt>In 3 hours</dt><dd>Marina Lagoon, JBR, Bluewaters, Dubai Eye, Kempinski Palace, Atlantis and Burj Al Arab.</dd></dl>'),
        ('Can I bring my own food or drinking water?', '<p>Yes, you can.</p>'),
    ]
    items = ''.join(f'<details><summary><span class="n">0{i}</span>{q}<span class="pm" aria-hidden="true"></span></summary><div class="answer">{a}</div></details>'
                    for i, (q, a) in enumerate(qa, 1))
    body = hero('FAQ', 'Before you sail.', 'Answers to the questions we hear most. Anything else, just message us.',
                'images/fleet/y55-4.jpg', 'Bow of a yacht heading towards the Burj Al Arab', short=True)
    body += f'''
  <section class="section" aria-labelledby="faq-title">
    <div class="wrap faq-grid">
      <div><p class="label">Questions</p><h2 id="faq-title">Good to know.</h2></div>
      <div class="faq">{items}</div>
    </div>
  </section>
  {cta_section()}'''
    page('faq.html', 'FAQ', 'Frequently asked questions about yacht rental in Dubai with LXRY: what is included, cruise routes and bringing your own food.',
         body, current='faq.html')


def build_contact():
    body = hero('Contact', 'Plan your trip.', 'Message us with your date, number of hours and guests, and we will get back to you.',
                'images/fleet/y80-1.jpg', 'Yacht 80 ft on turquoise water', short=True)
    body += f'''
  <section class="section contact" aria-labelledby="contact-title">
    <div class="wrap contact-grid">
      <div>
        <h2 id="contact-title" class="sr-only">Contact details</h2>
        <div class="line">
          <p class="label">Yacht rental</p>
          <a class="big nums" href="tel:{YACHT_TEL}">{YACHT_DISP}</a>
          {wa_call('yacht', 'yacht rental', 'btn-sm', False, True)}
        </div>
        <div class="line">
          <p class="label">Water sports</p>
          <a class="big nums" href="tel:{WS_TEL}">{WS_DISP}</a>
          {wa_call('ws', 'water sports', 'btn-sm', False, True)}
        </div>
        <div class="line">
          <p class="label">Email</p>
          <a class="big sm" href="mailto:{EMAIL}">{EMAIL}</a>
        </div>
        <div class="line">
          <p class="label">Address</p>
          <address class="big sm">Jumeirah 3, Fishing Harbour,<br>Umm Suqeim 2, Dubai, UAE</address>
        </div>
        <div>{socials(' on-light')}</div>
      </div>
      <div class="map-col">
        {embed('map', MAP_EMBED, 'Map: Jumeirah 3 Fishing Harbour, Umm Suqeim 2, Dubai', 'Load map', 'Jumeirah 3, Fishing Harbour, Umm Suqeim 2, Dubai', 'Loading the map connects to Google, which may set cookies.')}
        <div class="btn-row" style="margin-top:20px">{btn(MAPS_URL, 'Open in Google Maps', 'btn-outline', None, True, 'Open Jumeirah 3 Fishing Harbour in Google Maps (opens in a new tab)')}</div>
      </div>
    </div>
  </section>
  {follow_section()}'''
    page('contact.html', 'Contact', 'Contact LXRY Luxury Yachts in Dubai. Yacht rental +971 55 291 0101, water sports +971 58 125 8311, lxryae@gmail.com. Jumeirah Fishing Harbour, Umm Suqeim 2.',
         body, current='contact.html')


def legal_page(filename, title, description, sections, updated='[EFFECTIVE DATE]'):
    toc = ''.join(f'<li><a href="#s{i}">{h}</a></li>' for i, (h, _) in enumerate(sections, 1))
    secs = ''.join(f'<section id="s{i}" aria-labelledby="s{i}-h"><h2 id="s{i}-h">{i}. {h}</h2>{b}</section>' for i, (h, b) in enumerate(sections, 1))
    body = f'''
  <article class="legal">
    <div class="wrap">
      <p class="draft" role="note"><strong>Draft — to be reviewed by LXRY before publishing.</strong> This page is a template. Text in [square brackets] must be completed or confirmed by Luxury Yachts L.L.C, and the page should be reviewed by a UAE-qualified legal adviser.</p>
      <p class="label">Legal</p>
      <h1>{title}</h1>
      <p class="meta">Luxury Yachts L.L.C · Effective date: {updated}</p>
      <nav class="legal-toc" aria-label="On this page"><ol>{toc}</ol></nav>
      {secs}
    </div>
  </article>'''
    page(filename, title, description, body)


COMPANY_BLOCK = f'''<p>Luxury Yachts L.L.C<br>Jumeirah 3, Fishing Harbour, Umm Suqeim 2, Dubai, United Arab Emirates<br>
Trade licence no. {TRADE_LICENSE}<br>Email: <a href="mailto:{EMAIL}">{EMAIL}</a><br>
Yacht rental: <a href="tel:{YACHT_TEL}">{YACHT_DISP}</a> · Water sports: <a href="tel:{WS_TEL}">{WS_DISP}</a></p>'''


def build_legal():
    legal_page('privacy.html', 'Privacy Policy',
               'How Luxury Yachts L.L.C (LXRY) handles personal data under the UAE Personal Data Protection Law.', [
        ('Who we are', COMPANY_BLOCK + '<p>Luxury Yachts L.L.C is the controller of the personal data described in this policy. This policy is written with reference to Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (the "PDPL") and its implementing regulations. Privacy contact: [PRIVACY CONTACT NAME / EMAIL].</p>'),
        ('What this website collects', '<p>This website has no contact forms, accounts or newsletter sign-up, and it does not use analytics or advertising tools.</p><ul><li><strong>Your cookie choice.</strong> We store whether you accepted or rejected optional third-party content in your browser (local storage). See our <a href="cookies.html">Cookie Policy</a>.</li><li><strong>Technical data.</strong> Our hosting provider, Vercel Inc., processes technical data such as IP address, browser type and the pages requested in order to deliver the website and keep it secure. Retention period: [HOSTING LOG RETENTION PERIOD].</li><li><strong>Third-party content.</strong> Google Maps and the YouTube video load only if you accept or choose to load them. Google then receives data such as your IP address under its own privacy policy.</li></ul>'),
        ('When you contact or book with us', '<p>Bookings are made by WhatsApp, phone or email. When you contact us we receive the details you choose to share, such as your name, phone number, the content of your messages and booking details (date, duration, number of guests, occasion). [LIST ANY OTHER DATA COLLECTED, E.G. ID FOR REGULATORY REQUIREMENTS, PAYMENT DETAILS].</p><p>WhatsApp is operated by WhatsApp LLC / Meta. Messages you send through WhatsApp are also processed under WhatsApp&rsquo;s own privacy policy.</p>'),
        ('Why we use your data', '<ul><li>To reply to your enquiry and arrange your booking.</li><li>To carry out the booking you request and provide the service.</li><li>To meet legal and regulatory obligations that apply to us. [SPECIFY, E.G. MARITIME AUTHORITY REQUIREMENTS]</li><li>[ANY OTHER PURPOSE, E.G. MARKETING — ONLY WITH CONSENT]</li></ul><p>Where the PDPL requires your consent, we ask for it and you can withdraw it at any time. Otherwise we rely on the grounds the PDPL allows, such as taking steps at your request before a booking, performing a booking, or complying with the law. [CONFIRM LEGAL GROUNDS WITH ADVISER]</p>'),
        ('Who we share it with', '<p>We do not sell personal data. We share it only as needed with: [BOAT OPERATORS / CREW PARTNERS, IF ANY]; [PAYMENT PROVIDER]; our hosting provider (Vercel Inc.); and authorities where the law requires it.</p>'),
        ('International transfers', '<p>Some providers we use, such as Vercel, WhatsApp and Google, may process data outside the United Arab Emirates. Where this happens we rely on the safeguards permitted by the PDPL: [TRANSFER SAFEGUARDS].</p>'),
        ('How long we keep it', '<p>Enquiries and booking records: [RETENTION PERIOD]. Records we must keep by law: [LEGAL RETENTION PERIOD].</p>'),
        ('Your rights', '<p>Under the PDPL you may, subject to its conditions and exceptions, ask to: receive information about the personal data we hold about you; receive a copy of it or have it transferred; have it corrected or completed; have it erased; restrict or stop its processing; and object to decisions made solely by automated processing. You can also withdraw consent you have given.</p><p>To make a request, email <a href="mailto:lxryae@gmail.com">lxryae@gmail.com</a>. We will respond within [RESPONSE TIME]. You may also complain to the UAE Data Office.</p>'),
        ('Security', '<p>We take reasonable technical and organisational measures to protect personal data: [DESCRIBE MEASURES].</p>'),
        ('Children', '<p>Our website is not directed at children. Bookings must be made by an adult. [CONFIRM AGE FOR MAKING A BOOKING]</p>'),
        ('Changes to this policy', '<p>We may update this policy. The effective date at the top shows when it last changed.</p>'),
    ])

    legal_page('terms.html', 'Terms &amp; Conditions',
               'Terms of use for the LXRY website and general booking terms of Luxury Yachts L.L.C, Dubai.', [
        ('About these terms', COMPANY_BLOCK + '<p>These terms apply to your use of this website and, together with our <a href="booking-policy.html">Booking &amp; Cancellation Policy</a> and your booking confirmation, to bookings with Luxury Yachts L.L.C.</p>'),
        ('Information on this website', '<p>We aim to keep yacht specifications, photos and activity details accurate, but availability and equipment may change. Details for your trip are those confirmed in your booking confirmation. Photos show boats and activities we offer; [CONFIRM WHETHER A SPECIFIC BOAT IS GUARANTEED].</p>'),
        ('Prices and offers', '<p>Prices are given on request and confirmed in writing before booking. [STATE WHETHER PRICES INCLUDE VAT AND OTHER FEES]. Offers, including the water sports discount shown on this website, are subject to: [OFFER TERMS].</p>'),
        ('Bookings', '<p>A booking is confirmed only when we confirm it in writing [AND THE DEPOSIT IS RECEIVED — SEE BOOKING &amp; CANCELLATION POLICY]. Deposits, payments, changes and cancellations are covered by our <a href="booking-policy.html">Booking &amp; Cancellation Policy</a>.</p>'),
        ('Safety and conduct on board', '<p>Guests must follow the safety instructions of the captain and crew. The captain may change the route, shorten or end a trip for safety reasons. [ADD RULES ON ALCOHOL, SMOKING, GUEST NUMBERS, DAMAGE, LOST PROPERTY, ETC.]</p><p>Water sports have age and health restrictions; see the <a href="water-sports.html">Water Sports</a> page and [MINIMUM AGE].</p>'),
        ('Liability', '<p>[LIABILITY TERMS — TO BE DRAFTED BY A UAE-QUALIFIED ADVISER. NOTHING IN THESE TERMS LIMITS RIGHTS YOU HAVE UNDER UAE CONSUMER PROTECTION LAW.]</p>'),
        ('Intellectual property', '<p>The content and photos on this website belong to Luxury Yachts L.L.C or are used with permission. Do not copy them for commercial use without our written consent.</p>'),
        ('Links to other websites', '<p>This website links to third-party services such as WhatsApp, Instagram, TikTok, Facebook, Snapchat, YouTube, LinkedIn and Google Maps. We are not responsible for their content or privacy practices.</p>'),
        ('Governing law', '<p>These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Dubai. [CONFIRM COMPETENT COURTS].</p>'),
        ('Contact', '<p>Questions about these terms: <a href="mailto:lxryae@gmail.com">lxryae@gmail.com</a>.</p>'),
    ])

    legal_page('cookies.html', 'Cookie Policy',
               'Which cookies and similar technologies the LXRY website uses, and how to change your choice.', [
        ('Summary', '<p>This website does not use analytics, advertising or tracking cookies. Before you make a choice, it loads nothing from third parties. It stores only your consent choice. Fonts are hosted on our own server.</p>'),
        ('Strictly necessary storage', '<div class="table-wrap" role="region" aria-label="Storage used by this site (scrollable table)" tabindex="0"><table class="legal-table"><thead><tr><th scope="col">Name</th><th scope="col">Type</th><th scope="col">Purpose</th><th scope="col">Duration</th></tr></thead><tbody><tr><td>lxry-consent</td><td>Local storage (first party)</td><td>Remembers whether you accepted or rejected optional third-party content.</td><td>Until you clear your browser data or change your choice</td></tr></tbody></table></div>'),
        ('Optional third-party content', '<p>These load only after you click Accept, or when you click the button on that item:</p><div class="table-wrap" role="region" aria-label="Optional third-party content (scrollable table)" tabindex="0"><table class="legal-table"><thead><tr><th scope="col">Service</th><th scope="col">Where</th><th scope="col">Provider</th><th scope="col">What happens</th></tr></thead><tbody><tr><td>Google Maps embed</td><td>Contact page</td><td>Google</td><td>Google may set cookies and receives your IP address and browser details.</td></tr><tr><td>YouTube video (privacy-enhanced mode, youtube-nocookie.com)</td><td>Gallery page</td><td>Google / YouTube</td><td>YouTube may store data in your browser once you play the video.</td></tr></tbody></table></div><p>See Google&rsquo;s privacy policy for details of these services.</p>'),
        ('Links to social networks', '<p>Our social media icons are plain links. Nothing from those networks loads on our pages until you click a link and leave our site.</p>'),
        ('Changing your choice', '<p>Use the <button class="linkish" type="button" data-cookie-settings>Cookie settings</button> link in the footer of any page to change your choice at any time. If you withdraw consent, the page reloads without the third-party content.</p>'),
        ('Contact', '<p>Questions: <a href="mailto:lxryae@gmail.com">lxryae@gmail.com</a>. See also our <a href="privacy.html">Privacy Policy</a>.</p>'),
    ])

    legal_page('booking-policy.html', 'Booking &amp; Cancellation Policy',
               'Booking, deposit, cancellation, refund and weather policy for LXRY yacht rental and water sports in Dubai.', [
        ('How to book', f'<p>Bookings are made by WhatsApp or phone: yacht rental <a href="tel:{YACHT_TEL}">{YACHT_DISP}</a>, water sports <a href="tel:{WS_TEL}">{WS_DISP}</a>, or by email at <a href="mailto:{EMAIL}">{EMAIL}</a>. A booking is confirmed when we confirm it in writing [AND THE DEPOSIT IS PAID].</p>'),
        ('Deposit and payment', '<ul><li>Deposit: [DEPOSIT %] of the total price, due [DEPOSIT DUE DATE].</li><li>Balance: [BALANCE DUE DATE].</li><li>Accepted payment methods: [PAYMENT METHODS].</li><li>Prices include / exclude VAT: [VAT STATEMENT].</li></ul>'),
        ('Cancellation by you', '<ul><li>Cancellation deadline for a full refund: [CANCELLATION DEADLINE].</li><li>Cancellations after the deadline: [LATE CANCELLATION CHARGE].</li><li>No-shows and late arrival: [NO-SHOW / LATE ARRIVAL POLICY].</li></ul>'),
        ('Refunds', '<p>[REFUND RULES — AMOUNT, METHOD AND TIMING].</p>'),
        ('Weather and safety cancellations', '<p>[WEATHER CANCELLATION POLICY — WHO DECIDES, AND WHETHER GUESTS ARE OFFERED A NEW DATE OR A REFUND].</p>'),
        ('Changes to a booking', '<p>[RESCHEDULING POLICY — DEADLINE AND ANY FEES].</p>'),
        ('Cancellation by us', '<p>[POLICY IF LXRY MUST CANCEL, E.G. BOAT UNAVAILABLE].</p>'),
        ('Offers', '<p>The 20% water sports offer shown on this website is subject to: [OFFER TERMS].</p>'),
        ('Questions', '<p>Contact us before booking if anything is unclear: <a href="mailto:lxryae@gmail.com">lxryae@gmail.com</a>.</p>'),
    ])


def build_404():
    body = f'''
  <section class="notfound on-dark">
    <div class="wrap">
      <p class="label">Page not found</p>
      <h1>Lost at sea.</h1>
      <p class="lead" style="margin:24px auto 40px">The page you are looking for does not exist.</p>
      <div class="btn-row" style="justify-content:center">{btn('index.html', 'Back to home', 'btn-light', None, False, None, True)}</div>
    </div>
  </section>'''
    page('404.html', 'Page not found', 'This page does not exist.', body, base='\n  <base href="/">')


if __name__ == '__main__':
    build_home()
    build_yachts()
    for i, f in enumerate(FLEET):
        build_detail(i, f)
    build_sports()
    build_fishing_events()
    build_gallery()
    build_about()
    build_faq()
    build_contact()
    build_legal()
    build_404()
    print('built', len([n for n in os.listdir(ROOT) if n.endswith('.html')]), 'pages')
