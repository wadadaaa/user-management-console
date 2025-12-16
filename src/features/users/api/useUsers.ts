import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/client';
import { UserSchema, type User } from '../model/schema';
import { z } from 'zod';

const fetchUsers = async (): Promise<User[]> => {
    const { data } = await apiClient.get('/users');
    return z.array(UserSchema).parse(data);
};

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
};