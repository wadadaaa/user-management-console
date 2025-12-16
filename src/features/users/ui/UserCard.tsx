import { memo } from 'react';
import type {User} from '../model/schema';

interface UserCardProps {
    user: User;
}

export const UserCard = memo(({ user }: UserCardProps) => {
    return (
        <article className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col gap-2">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold text-slate-800">{user.name}</h3>
                    <p className="text-sm text-slate-500">@{user.username}</p>
                </div>
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                    {user.name.charAt(0)}
                </div>
            </div>

            <div className="mt-4 space-y-1 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                    <span className="text-slate-400">📧</span>
                    <a href={`mailto:${user.email}`} className="hover:text-indigo-600 transition-colors">
                        {user.email}
                    </a>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-slate-400">🏢</span>
                    <span>{user.company.name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-slate-400">📍</span>
                    <span>{user.address.city}, {user.address.street}</span>
                </div>
            </div>
        </article>
    );
});

UserCard.displayName = 'UserCard';