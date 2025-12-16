import { useState } from 'react';
import { useUsers } from '@/features/users/api/useUsers';
import { useUsersFilter } from '@/features/users/lib/useUsersFilter';
import { UsersList } from '@/features/users/ui/UsersList';
import { SearchBar } from '@/features/users/ui/SearchBar';
import { useDebounce } from '@/shared/hooks/useDebounce';
import type {SortConfig} from '@/features/users/model/types';

function App() {
    const { data: users, isLoading, isError, error, refetch } = useUsers();

    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });

    const debouncedQuery = useDebounce(searchQuery, 300);

    const filteredUsers = useUsersFilter({
        users,
        query: debouncedQuery,
        sortConfig,
    });

    const handleSort = (key: SortConfig['key']) => {
        setSortConfig((current) => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
                        <p className="text-slate-500 mt-1">Manage and view system users</p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="w-full md:w-96">
                            <SearchBar value={searchQuery} onChange={setSearchQuery} />
                        </div>
                    </div>
                </header>

                <div className="flex gap-2 pb-4 border-b border-slate-200">
                    <span className="text-sm font-medium text-slate-500 py-2">Sort by:</span>
                    {(['name', 'email', 'username'] as const).map((key) => (
                        <button
                            key={key}
                            onClick={() => handleSort(key)}
                            className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                sortConfig.key === key
                                    ? 'bg-indigo-100 text-indigo-700 font-medium'
                                    : 'text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                            {sortConfig.key === key && (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
                        </button>
                    ))}
                </div>

                {isError && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center justify-between text-red-700">
                        <div className="flex items-center gap-2">
                            <span>⚠️</span>
                            <span>Failed to load users: {error instanceof Error ? error.message : 'Unknown error'}</span>
                        </div>
                        <button
                            onClick={() => refetch()}
                            className="text-sm font-medium underline hover:text-red-800"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                <main>
                    <UsersList users={filteredUsers} isLoading={isLoading} />
                </main>
            </div>
        </div>
    );
}

export default App;