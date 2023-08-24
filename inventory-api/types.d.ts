export interface Category {
    id: number;
    title: string;
    description: string | null;
}
export type ApiCategory = Omit<Category, 'id'>
export interface Place {
    id: number;
    title: string;
    description: string | null;
}
export type ApiPlace = Omit<Place, 'id'>

export interface Resource {
    id: string;
    title: string;
    description: string | null;
    image: string | null;
    place_id: number | null;
    category_id: number | null;
}
export type ApiResource = Omit<Resource, 'id'>