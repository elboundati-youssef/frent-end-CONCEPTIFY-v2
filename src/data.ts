// --- FICHIER: src/data.ts ---
export interface GalleryItem {
  type: "image" | "video";
  url: string;
}

export interface Project {
  id: number;
  client: string;
  category: string;
  img: string;
  height: string;
  gallery: GalleryItem[];
  logo?: string;
  website?: string;
  instagram?: string;
}

export interface Service {
  id: string;
  title: string;
  desc: string;
  image: string;
}
export interface logo {
  id: number;
  title: string;
  logo: string;
}
export interface secteur {
  id: number;
  title: string;
  image: string;
  desc: string;
  className: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    client: "Emaar Properties",
    category: "REAL ESTATE",
    
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    instagram: "https://www.instagram.com/emaar/",
    website: "https://www.emaar.com/en",
    
    height: "h-[400px]",
    gallery: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1600607687931-cecebd802404?auto=format&fit=crop&q=80&w=1200",
      },
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
  {
    id: 2,
    client: "Atlas Santé",
    category: "SANTÉ ET BIEN-ÊTRE",
    img: "https://previews.123rf.com/images/rawpixel/rawpixel1608/rawpixel160853712/61698104-health-wellbeing-wellness-vitality-healthcare-concept.jpg",
    height: "h-[300px]",
    gallery: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1538108149393-ce90bb2424ad?auto=format&fit=crop&q=80&w=1200",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
      },
    ],
  },
  {
    id: 3,
    client: "Lycée Descartes",
    category: "GROUPES SCOLAIRES",
    img: "https://media.licdn.com/dms/image/v2/D4E1BAQFeiaDt1fxw4w/company-background_10000/company-background_10000/0/1654520461353/groupe_scolaire_tangerine_cover?e=2147483647&v=beta&t=2KjYMmQRv4XEepTrqVa_pU0Hrm05Gve4giJ-d6BtD4k",
    height: "h-[500px]",
    gallery: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200",
      },
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
  {
    id: 4,
    client: "Morocco Mall",
    category: "PROJETS SPÉCIAUX",
    img: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=800",
    height: "h-[350px]",
    gallery: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=1200",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
      },
    ],
  },
  {
    id: 5,
    client: "Royal Mansour",
    category: "REAL ESTATE",
    img: "https://static-new.lhw.com/HotelImages/Final/LW6009/lw6009_161557907_720x450.jpg",
    height: "h-[450px]",
    gallery: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1542314831-c6a4d14d837e?auto=format&fit=crop&q=80&w=1200",
      },
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
  {
    id: 6,
    client: "Tech Hub",
    category: "PROJETS SPÉCIAUX",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    height: "h-[300px]",
    gallery: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
      },
    ],
  },
];

export const servicesData: Service[] = [
  {
    id: "marketing",
    title: "Marketing & Communication",
    desc: "Nous créons des stratégies marketing puissantes et des campagnes de communication engageantes qui positionnent votre marque au centre de l'attention.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "evenementiel",
    title: "Événementiel",
    desc: "Nous concevons des expériences immersives et uniques, adaptées à chaque marque et chaque occasion. Que vous organisiez un lancement de produit ou une conférence internationale.",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "accompagnement",
    title: "Accompagnement Professionnel",
    desc: "Nous proposons des programmes d'accompagnement, du coaching, de la formation et du conseil pour développer vos talents, structurer votre croissance et atteindre l'excellence.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
  },
];



export const logosData: logo[] = [

{ id: 1, title: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
{ id: 2, title: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
{ id: 3, title: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
{ id: 4, title: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
{ id: 5, title: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
{ id: 6, title: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png" },
{ id: 7, title: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png" },
];




export const secteursData: secteur[] = [
{
      id: 1,
      title: "Projets Spéciaux",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
      desc: "Des solutions sur-mesure et innovantes pour répondre à vos défis complexes.",
      className: "md:col-span-2 md:row-span-2",
    },
    {
      id: 2,
      title: "Real Estate",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
      desc: "Mise en valeur de vos biens immobiliers à travers des stratégies percutantes.",
      className: "md:col-span-2 md:row-span-1",
    },
    {
      id: 3,
      title: "Groupes Scolaires",
      image: "https://media.licdn.com/dms/image/v2/D4E1BAQFeiaDt1fxw4w/company-background_10000/company-background_10000/0/1654520461353/groupe_scolaire_tangerine_cover?e=2147483647&v=beta&t=2KjYMmQRv4XEepTrqVa_pU0Hrm05Gve4giJ-d6BtD4k",
      desc: "Communication institutionnelle adaptée au secteur éducatif.",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      id: 4,
      title: "Santé et Bien-être",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
      desc: "Présence digitale soignée et rassurante pour les professionnels de santé.",
      className: "md:col-span-1 md:row-span-1",
    },
  ];