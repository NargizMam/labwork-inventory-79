export interface Category {
    id: number;
    title: string;
    description: string | null;
}
export interface Place {
    id: number;
    title: string;
    description: string | null;
}
export interface Resource {
    id: string;
    title: string;
    description: string | null;
    image: string | null;
    place_id: string | null;
    category_id: string | null;

}