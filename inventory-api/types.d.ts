export interface Category {
    id: number;
    categoriesTitle: string;
    description: string | null;
}
export type ApiCategory = Omit<Category, 'id'>
export interface Place {
    id: number;
    placesTitle: string;
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
export interface ApiResource {
    title: string;
    description: string | null;
    image: string | null;
    place_id: string | null;
    category_id: string | null;
}
export interface ResourceInfo {
    title: string;
    description: string | null;
    image: string | null;
    placesTitle: string | null;
    categoriesTitle: string | null;
}
export interface ResourceUpdate {
    title: string;
    description: string | null;
    image: string | null;
}