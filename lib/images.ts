export interface ExhibitImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description?: string;
}

// Predefined exhibit images from public/images directory
export const exhibitImages: ExhibitImage[] = [
  {
    id: "1",
    src: "/images/image (1).jpg",
    alt: "展品 1",
    title: "古代青铜器",
    description: "精美的青铜器物，展现古代冶炼技术"
  },
  {
    id: "2",
    src: "/images/image (2).jpg",
    alt: "展品 2",
    title: "陶瓷艺术品",
    description: "精美的陶瓷艺术品"
  },
  {
    id: "3",
    src: "/images/image (3).jpg",
    alt: "展品 3",
    title: "书画作品",
    description: "传统书画作品"
  },
  {
    id: "4",
    src: "/images/image (4).jpg",
    alt: "展品 4",
    title: "玉器",
    description: "精美的玉器工艺品"
  },
  {
    id: "5",
    src: "/images/image (5).jpg",
    alt: "展品 5",
    title: "织绣品",
    description: "传统织绣艺术品"
  },
  {
    id: "6",
    src: "/images/image (6).jpg",
    alt: "展品 6",
    title: "金银器",
    description: "精美的金银器物"
  },
  {
    id: "7",
    src: "/images/image (7).jpg",
    alt: "展品 7",
    title: "漆器",
    description: "传统漆器工艺品"
  },
  {
    id: "8",
    src: "/images/image (8).jpg",
    alt: "展品 8",
    title: "石刻",
    description: "古代石刻艺术"
  },
  {
    id: "9",
    src: "/images/image (9).jpg",
    alt: "展品 9",
    title: "木雕",
    description: "精美的木雕艺术品"
  },
  {
    id: "10",
    src: "/images/image (10).jpg",
    alt: "展品 10",
    title: "文具",
    description: "传统文房四宝"
  }
];

export function getImageById(id: string): ExhibitImage | undefined {
  return exhibitImages.find(img => img.id === id);
}

export function getAllImageUrls(baseUrl: string): ExhibitImage[] {
  return exhibitImages.map(img => ({
    ...img,
    src: `${baseUrl}${img.src}`
  }));
}
