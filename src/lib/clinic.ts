export const CLINIC = {
  name: "City Smiles",
  tagline: "Dental & Skin Clinic",
  promise: "Healthy Smiles. Beautiful Confidence.",
  city: "Sialkot",
  address: "City Smiles Dental & Skin Clinic, Paris Road, Sialkot, Pakistan",
  shortAddress: "Paris Road, Sialkot",
  phoneDisplay: "0312 0083540",
  phoneHref: "tel:+923120083540",
  whatsappDisplay: "+92 312 0083540",
  whatsappHref:
    "https://wa.me/923120083540?text=Assalam%20o%20Alaikum%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20City%20Smiles.",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=City+Smiles+Dental+and+Skin+Clinic+Sialkot",
  hours: [
    { days: "Monday – Saturday", time: "11:00 am – 9:00 pm" },
    { days: "Sunday", time: "By appointment only" },
  ],
} as const;

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  group: "General" | "Restorative" | "Orthodontics" | "Cosmetic" | "Family";
};

export const DENTAL_SERVICES: Service[] = [
  {
    slug: "general-dentistry",
    title: "General Dentistry",
    blurb: "Routine examination, diagnosis and preventive care for every age group.",
    group: "General",
  },
  {
    slug: "dental-cleaning",
    title: "Dental Cleaning",
    blurb: "Ultrasonic scaling and polishing to remove plaque, calculus and staining.",
    group: "General",
  },
  {
    slug: "teeth-whitening",
    title: "Teeth Whitening",
    blurb: "Supervised in-clinic whitening for a natural, even shade — not an artificial one.",
    group: "Cosmetic",
  },
  {
    slug: "fillings",
    title: "Fillings",
    blurb: "Tooth-coloured composite restorations that seal decay and protect structure.",
    group: "Restorative",
  },
  {
    slug: "root-canal",
    title: "Root Canal Treatment",
    blurb: "Painless endodontic care that saves an infected tooth instead of removing it.",
    group: "Restorative",
  },
  {
    slug: "crowns",
    title: "Crowns",
    blurb: "Porcelain and zirconia crowns that restore strength and natural appearance.",
    group: "Restorative",
  },
  {
    slug: "bridges",
    title: "Bridges",
    blurb: "A fixed, comfortable solution for replacing one or more missing teeth.",
    group: "Restorative",
  },
  {
    slug: "implants",
    title: "Dental Implants",
    blurb: "Titanium implant replacement of a missing tooth, root and crown.",
    group: "Restorative",
  },
  {
    slug: "braces",
    title: "Braces",
    blurb: "Metal and ceramic orthodontics for crowding, spacing and bite correction.",
    group: "Orthodontics",
  },
  {
    slug: "clear-aligners",
    title: "Clear Aligners",
    blurb: "Discreet, removable aligners planned digitally from start to finish.",
    group: "Orthodontics",
  },
  {
    slug: "wisdom-tooth",
    title: "Wisdom Tooth Treatment",
    blurb: "Assessment, extraction and aftercare for impacted or painful third molars.",
    group: "General",
  },
  {
    slug: "gum-treatment",
    title: "Gum Treatment",
    blurb: "Care for bleeding, receding or inflamed gums, including deep cleaning.",
    group: "General",
  },
  {
    slug: "pediatric",
    title: "Pediatric Dentistry",
    blurb: "Gentle, patient dental care that helps children feel safe in the chair.",
    group: "Family",
  },
  {
    slug: "cosmetic",
    title: "Cosmetic Dentistry",
    blurb: "Conservative aesthetic corrections in proportion with your own features.",
    group: "Cosmetic",
  },
  {
    slug: "smile-makeover",
    title: "Smile Makeover",
    blurb: "A planned combination of treatments designed around your face and bite.",
    group: "Cosmetic",
  },
  {
    slug: "veneers",
    title: "Veneers",
    blurb: "Thin porcelain layers for shape, shade and symmetry — kept natural.",
    group: "Cosmetic",
  },
];

export const SKIN_SERVICES = [
  {
    title: "Skin Consultation",
    blurb: "A structured assessment of your skin type, history and concerns.",
  },
  { title: "Acne", blurb: "Medical management of active acne with a realistic long-term plan." },
  { title: "Acne Scars", blurb: "Resurfacing and micro-needling protocols for textured scarring." },
  {
    title: "Pigmentation",
    blurb: "Targeted treatment for uneven tone and post-inflammatory marks.",
  },
  { title: "Melasma", blurb: "Careful, gradual care suited to South Asian skin tones." },
  {
    title: "Skin Rejuvenation",
    blurb: "Hydration, texture and glow with clinically proven protocols.",
  },
  { title: "Chemical Peels", blurb: "Graded peels selected for your skin type and tolerance." },
  { title: "Hydrafacial", blurb: "Deep cleanse, exfoliation and hydration in one session." },
  {
    title: "Laser Treatments",
    blurb: "Laser care for hair reduction, pigment and vascular concerns.",
  },
  {
    title: "Anti-Aging",
    blurb: "Preventive and corrective options discussed honestly, never pushed.",
  },
  {
    title: "Skin Brightening",
    blurb: "Evidence-based brightening — no bleaching, no unsafe products.",
  },
  {
    title: "Hair & Scalp Treatments",
    blurb: "Assessment and treatment of hair fall, dandruff and scalp conditions.",
  },
  {
    title: "Facial Treatments",
    blurb: "Clinical facials performed by trained staff, not a beauty salon routine.",
  },
];

export const TRUST_POINTS = [
  {
    title: "Experienced Clinical Care",
    body: "Diagnosis and treatment planning by qualified dentists and skin specialists.",
  },
  {
    title: "Modern Technology",
    body: "Digital imaging, sterilised instruments and current clinical protocols.",
  },
  {
    title: "Patient-Centred Approach",
    body: "Options, costs and timelines explained clearly before we begin.",
  },
  {
    title: "Comfortable Environment",
    body: "A calm, clean clinic designed to make treatment feel unhurried.",
  },
  {
    title: "Dental + Skin Expertise",
    body: "Two specialities under one roof, coordinated for your care.",
  },
];

export const EDUCATION_TOPICS = [
  { title: "How Braces Work", minutes: "3 min", topic: "Orthodontics" },
  { title: "How Clear Aligners Work", minutes: "2 min", topic: "Orthodontics" },
  { title: "How Root Canal Treatment Works", minutes: "4 min", topic: "Endodontics" },
  { title: "What Happens During Dental Cleaning?", minutes: "3 min", topic: "Preventive" },
  { title: "How Teeth Whitening Works", minutes: "2 min", topic: "Cosmetic" },
  { title: "Understanding Skin Treatments", minutes: "4 min", topic: "Skin Clinic" },
];

export const DOCTORS = [
  {
    name: "Awaiting clinic details",
    role: "Dental Surgeon",
    quals: "BDS, RDS",
    experience: "",
    bio: "Doctor photograph, qualifications and biography will be published here once supplied by the clinic.",
  },
  {
    name: "Awaiting clinic details",
    role: "Orthodontics",
    quals: "BDS, FCPS / MSc (Orthodontics)",
    experience: "",
    bio: "Doctor photograph, qualifications and biography will be published here once supplied by the clinic.",
  },
  {
    name: "Awaiting clinic details",
    role: "Dermatology & Aesthetics",
    quals: "MBBS, Diploma in Dermatology",
    experience: "",
    bio: "Doctor photograph, qualifications and biography will be published here once supplied by the clinic.",
  },
];

export type StageSet = {
  id: string;
  label: string;
  intro: string;
  stages: { title: string; body: string }[];
};

export const STAGE_SETS: StageSet[] = [
  {
    id: "root-canal",
    label: "Root Canal",
    intro: "How an infected tooth is cleaned, disinfected, sealed and restored.",
    stages: [
      {
        title: "Healthy tooth",
        body: "Enamel, dentine and a healthy pulp with intact nerve and blood supply.",
      },
      {
        title: "Infection",
        body: "Decay reaches the pulp; bacteria cause inflammation, pain and sensitivity.",
      },
      {
        title: "Access",
        body: "A small opening is made through the crown to reach the pulp chamber.",
      },
      {
        title: "Cleaning",
        body: "The canals are shaped and infected tissue is removed with fine instruments.",
      },
      {
        title: "Disinfection",
        body: "Canals are irrigated and disinfected, then dried completely.",
      },
      {
        title: "Sealing",
        body: "Canals are filled with an inert material to prevent re-infection.",
      },
      {
        title: "Restoration",
        body: "The tooth is rebuilt — usually with a crown to protect it long term.",
      },
    ],
  },
  {
    id: "braces",
    label: "Braces",
    intro: "How fixed orthodontics moves teeth into a stable, functional alignment.",
    stages: [
      {
        title: "Misaligned teeth",
        body: "Crowding, spacing or a bite that does not meet correctly.",
      },
      { title: "Brackets", body: "Brackets are bonded to each tooth as precise anchor points." },
      { title: "Archwire", body: "A light wire is engaged, applying gentle continuous force." },
      {
        title: "Progressive alignment",
        body: "Wires and adjustments guide teeth gradually over months.",
      },
      { title: "Final result", body: "Braces are removed and retainers hold the new position." },
    ],
  },
  {
    id: "aligners",
    label: "Clear Aligners",
    intro: "How a digital plan becomes a sequence of removable aligners.",
    stages: [
      { title: "Digital scan", body: "An intra-oral scan records your teeth in three dimensions." },
      {
        title: "Treatment planning",
        body: "Each movement is planned and simulated before anything is made.",
      },
      {
        title: "Aligner sequence",
        body: "A series of aligners is produced, each slightly different.",
      },
      {
        title: "Progressive movement",
        body: "Aligners are changed on schedule as teeth settle into place.",
      },
    ],
  },
  {
    id: "implant",
    label: "Dental Implant",
    intro: "How a missing tooth is replaced from root to crown.",
    stages: [
      {
        title: "Missing tooth",
        body: "The gap affects chewing, alignment and the supporting bone.",
      },
      {
        title: "Implant placement",
        body: "A titanium post is placed in the jawbone and allowed to integrate.",
      },
      { title: "Abutment", body: "A connector is fitted once the implant is stable." },
      { title: "Crown", body: "A custom crown completes the tooth in shape and shade." },
    ],
  },
];

export const FAQS = [
  {
    q: "Do I need an appointment, or can I walk in?",
    a: "Both work. Appointments are recommended so your preferred doctor and time are reserved — you can book online, call 0312 0083540 or message us on WhatsApp.",
  },
  {
    q: "What are your opening hours?",
    a: "Monday to Saturday, 11:00 am to 9:00 pm. Sundays are by appointment only.",
  },
  {
    q: "How long does a first visit take?",
    a: "A first consultation usually takes 20–30 minutes, including examination and a written treatment plan with costs.",
  },
  {
    q: "Is root canal treatment painful?",
    a: "The tooth is fully numbed, so the procedure itself is comfortable. Mild tenderness for a day or two afterwards is normal.",
  },
  {
    q: "How should I prepare for a skin consultation?",
    a: "Come with clean skin if possible, and bring a list of products or medicines you are currently using.",
  },
  {
    q: "Do you treat children?",
    a: "Yes. Pediatric dentistry is a core part of the clinic, with a gentle approach for first visits.",
  },
];
