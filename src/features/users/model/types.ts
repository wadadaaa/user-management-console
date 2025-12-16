export type SortableField = 'name' | 'email' | 'username';

export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
    key: SortableField;
    direction: SortOrder;
}