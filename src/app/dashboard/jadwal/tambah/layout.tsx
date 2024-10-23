'use client';

import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function CreateScheduleLayout({ children }: { children: ReactNode }) {
	const { user, loading } = useAuth();
	const router = useRouter();

	if (loading) {
		return null;
	}

	if (user === null || user.role !== 'admin') {
		router.push('/login');
		return null;
	}

	return children;
}
