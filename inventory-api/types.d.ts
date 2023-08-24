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
    place_id: string | null;
    category_id: string | null;
}
export type ApiResources = Omit<Resource, 'id'>