import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useUsersFilter } from './useUsersFilter';
import type { User } from '../model/schema';

const users: User[] = [
    {
        id: 1,
        name: 'Alice Johnson',
        username: 'alice',
        email: 'alice@example.com',
        address: {
            street: 'Main St',
            suite: 'Apt. 1',
            city: 'Springfield',
            zipcode: '11111',
            geo: { lat: '0', lng: '0' },
        },
        phone: '1-770-736-8031',
        website: 'alice.org',
        company: {
            name: 'Alice LLC',
            catchPhrase: 'Test',
            bs: 'bs',
        },
    },
    {
        id: 2,
        name: 'Bob Smith',
        username: 'bobby',
        email: 'bob@example.com',
        address: {
            street: 'Second St',
            suite: 'Suite 2',
            city: 'Metropolis',
            zipcode: '22222',
            geo: { lat: '0', lng: '0' },
        },
        phone: '1-770-736-8032',
        website: 'bob.org',
        company: {
            name: 'Bob Inc',
            catchPhrase: 'Test',
            bs: 'bs',
        },
    },
    {
        id: 3,
        name: 'Charlie Brown',
        username: 'charlie',
        email: 'charlie@another.com',
        address: {
            street: 'Third St',
            suite: 'Suite 3',
            city: 'Gotham',
            zipcode: '33333',
            geo: { lat: '0', lng: '0' },
        },
        phone: '1-770-736-8033',
        website: 'charlie.org',
        company: {
            name: 'Charlie Corp',
            catchPhrase: 'Test',
            bs: 'bs',
        },
    },
];

describe('useUsersFilter', () => {
    it('returns all users when no query and no sortConfig', () => {
        const { result } = renderHook(() =>
            useUsersFilter({
                users,
                query: '',
                sortConfig: null,
            }),
        );

        expect(result.current).toHaveLength(3);
    });

    it('filters users by query in name, email or username', () => {
        const { result } = renderHook(() =>
            useUsersFilter({
                users,
                query: 'bob',
                sortConfig: null,
            }),
        );

        expect(result.current).toHaveLength(1);
        expect(result.current[0].name).toBe('Bob Smith');
    });

    it('sorts users ascending by given key', () => {
        const { result } = renderHook(() =>
            useUsersFilter({
                users,
                query: '',
                sortConfig: { key: 'name', direction: 'asc' },
            }),
        );

        const names = result.current.map((u) => u.name);
        expect(names).toEqual(['Alice Johnson', 'Bob Smith', 'Charlie Brown']);
    });

    it('sorts users descending by given key', () => {
        const { result } = renderHook(() =>
            useUsersFilter({
                users,
                query: '',
                sortConfig: { key: 'name', direction: 'desc' },
            }),
        );

        const names = result.current.map((u) => u.name);
        expect(names).toEqual(['Charlie Brown', 'Bob Smith', 'Alice Johnson']);
    });

    it('returns empty array when users is undefined', () => {
        const { result } = renderHook(() =>
            useUsersFilter({
                users: undefined,
                query: '',
                sortConfig: null,
            }),
        );

        expect(result.current).toEqual([]);
    });
});


