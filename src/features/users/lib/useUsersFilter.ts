import {useMemo} from 'react';
import type {User} from '../model/schema';
import type {SortConfig} from '../model/types';

interface UseUsersFilterProps {
    users: User[] | undefined;
    query: string;
    sortConfig: SortConfig | null;
}

export const useUsersFilter = ({ users, query, sortConfig }: UseUsersFilterProps) => {

    return useMemo(() => {
        if (!users) return [];

        let result = [...users];

        if (query) {
            const lowerQuery = query.toLowerCase();
            result = result.filter((user) =>
                user.name.toLowerCase().includes(lowerQuery) ||
                user.email.toLowerCase().includes(lowerQuery) ||
                user.username.toLowerCase().includes(lowerQuery)
            );
        }

        if (sortConfig) {
            result.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return result;
    }, [users, query, sortConfig]);
};