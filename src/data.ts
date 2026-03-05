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
  descMobile: string;
  descdetail: string;
  descdetailMobile: string;
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
    client: "aucune données",
    category: "aucune données",
    
    img: "aucune données",
    
    
    height: "h-[400px]",
    gallery: [
         ],
  },
];

export const servicesData: Service[] = [
  {
    id: "marketing",
    title: "Marketing & Communication",
    desc: "Nous créons des stratégies marketing puissanteset des campagnes de communication engageantes qui positionnent votre marque \nau centre de l'attention.",
    descMobile: "Nous créons des stratégies marketing puissanteset \ndes campagnes de communication engageantes \nqui positionnent votre marque au centre de l'attention.",

    descdetail: "Nous créons des stratégies marketing puissanteset des campagnes\n de communication engageantes qui positionnent votre marque\n au centre de l'attention.",
    descdetailMobile: "Nous créons des stratégies marketing puissanteset des campagnes\n de communication engageantes\n qui positionnent votre marque \nau centre de l'attention.",
    
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "evenementiel",
    title: "Événementiel",
    desc: "Nous concevons des expériences immersives \n et uniques,adaptées à chaque marque \net chaque occasion.\nQue vous organisiez un lancement de produit \nou une conférence internationale.",
    descMobile: "Nous concevons des expériences immersives \n et uniques,adaptées à chaque marque \net chaque occasion.\nQue vous organisiez un lancement de produit \nou une conférence internationale.",
    
    descdetail: "Nous concevons des expériences immersives  et uniques,adaptées à chaque marque et chaque occasion. \nQue vous organisiez un lancement de produit ou une conférence internationale.",
    descdetailMobile: "Nous concevons des expériences immersives et uniques,adaptées\n à chaque marque et chaque occasion.\nQue vous organisiez un lancement \nde produit ou une conférence internationale.",
    
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "accompagnement",
    title: "Accompagnement Professionnel",
    desc: "Nous proposons des programmes d'accompagnement, du coaching, \nde la formation et du conseil\npour développer vos talents, structurer \nvotre croissance et atteindre l'excellence.",
    descMobile: "Nous proposons des programmes d'accompagnement, du coaching, de la formation et du conseil\npour développer vos talents, structurer \nvotre croissance et atteindre l'excellence.",
    
    descdetail:"Nous proposons des programmes d'accompagnement, du coaching, \nde la formation et du conseil pour développer vos talents, \nstructurer votre croissance et atteindre l'excellence.",
    descdetailMobile: "Nous proposons des programmes d'accompagnement, du coaching, \nde la formation et du conseil pour développer vos talents, structurer \nvotre croissance et atteindre l'excellence.",
    
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
  },
];



export const logosData: logo[] = [

{ id: 1, title: "aucune données", logo: "aucune données" },
];




export const secteursData: secteur[] = [
{
      id: 1,
      title: "aucune données",
      image: "aucune données",
      desc: "aucune données",
      className: "md:col-span-2 md:row-span-2",
    },
  ];