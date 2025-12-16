import type {User} from '../model/schema';
import { UserCard } from './UserCard';

interface UsersListProps {
    users: User[];
    isLoading: boolean;
}

export const UsersList = ({ users, isLoading }: UsersListProps) => {

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="h-48 bg-slate-200 rounded-lg animate-pulse" />
                ))}
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-xl text-slate-400 font-medium">No users found</p>
                <p className="text-sm text-slate-400">Try adjusting your search filters</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
};