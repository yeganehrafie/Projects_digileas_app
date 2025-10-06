interface BlogCategory {
    id: string;
    slug: string;
    title: string;
}

interface BlogImage {
    url: string;
}

export interface Blog {
    id: string;
    author: string;
    category: BlogCategory;
    content: string;
    image: BlogImage;
    slug: string;
    title: string;
    view: number;
    useSwiper?: boolean;
    created_at: {
        year: number;
        month: number;
        day: number;
        timestamp: number;
    };
}