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
}

export interface Service {
  id: string;
  title: string;
  desc: string;
  image: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    client: "Emaar Properties",
    category: "REAL ESTATE",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
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
    img: "https://images.unsplash.com/photo-1538108149393-ce90bb2424ad?auto=format&fit=crop&q=80&w=800",
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
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
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
    img: "https://images.unsplash.com/photo-1542314831-c6a4d14d837e?auto=format&fit=crop&q=80&w=800",
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
