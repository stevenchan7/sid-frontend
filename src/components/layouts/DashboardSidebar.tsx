'use client';

import { Link } from '@chakra-ui/next-js';
import { Box, Heading, HStack, Icon, Image, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { FiVolume2 } from 'react-icons/fi';
import { LuArrowLeftCircle, LuArrowRightCircle, LuBookMinus, LuHome, LuLayoutDashboard, LuLayoutList, LuLibrary, LuLogOut, LuUserCircle } from 'react-icons/lu';
import DashboardLogout from './DashboardLogout';

function MenuItem({ title, url, icon, isActive, isOpen }: { title: string; url: string; icon: IconType; isActive: boolean; isOpen: boolean }) {
	return (
		<Link href={url} w={'full'} _hover={{ textDecoration: 'none' }}>
			<Box p={4} bg={isActive ? 'white' : ''} color={isActive ? 'navy' : ''} _hover={{ bg: isActive ? '' : 'blackAlpha.400' }}>
				<HStack spacing={4} justifyContent={isOpen ? 'flex-start' : 'center'}>
					<Icon as={icon} boxSize={6} />
					{isOpen && <Text fontWeight={isActive ? 600 : 400}>{title}</Text>}
				</HStack>
			</Box>
		</Link>
	);
}

const menuItems = [
	{
		title: 'Main Menu',
		items: [
			{
				title: 'Dashboard',
				url: '/dashboard/home',
				icon: LuLayoutDashboard,
			},
			{
				title: 'Pengumuman',
				url: '/dashboard/pengumuman',
				icon: FiVolume2,
			},
			{
				title: 'Kehadiran',
				url: '/dashboard/kehadiran',
				icon: LuLayoutList,
			},
			{
				title: 'Jadwal Mengajar',
				url: '/dashboard/jadwal',
				icon: LuBookMinus,
			},
			{
				title: 'Jadwal Piket',
				url: '/dashboard/piket',
				icon: LuLibrary,
			},
			{
				title: 'Public Area',
				url: '/',
				icon: LuHome,
			},
		],
	},
	{
		title: 'Setting',
		items: [
			{
				title: 'Profil',
				url: '/dashboard/profil',
				icon: LuUserCircle,
			},
		],
	},
];

export default function DashboardSidebar({ role }: { role: 'user' | 'admin' }) {
	const path = usePathname();
	const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

	return (
		<Box position={'sticky'} top={0} left={0} w={isOpen ? '2xs' : '5rem'} height={'100vh'} bg={'navy'} zIndex={'sticky'}>
			<Link href='/'>
				<Image src='/assets/logo/sid.png' height={isOpen ? 10 : 5} alt='sid logo' marginX={'auto'} marginTop={12} />
			</Link>
			<Box color={'white'}>
				{menuItems.map((menu, index) => (
					<Box key={index}>
						<Heading as={'h6'} size={'sm'} fontWeight={'700'} marginTop={12} marginX={isOpen ? 3 : 2} textAlign={isOpen ? 'start' : 'center'}>
							{menu.title}
						</Heading>
						<VStack alignItems={'flex-start'} marginTop={6} spacing={6} height={menu.title === 'Main Menu' ? '36vh' : ''} overflowY='auto'>
							{menu.items.map((item, index) => {
								if (item.title === 'Jadwal Piket' && role !== 'admin') {
									return;
								}
								return <MenuItem key={index} title={item.title} url={item.url} icon={item.icon} isActive={path.startsWith(item.url) && item.url !== '/'} isOpen={isOpen} />;
							})}
						</VStack>
					</Box>
				))}
				<DashboardLogout isSidebarOpen={isOpen} />
				<Box p={4} color={'white'} marginTop={6} textAlign={'center'}>
					<Icon onClick={onToggle} cursor={'pointer'} as={isOpen ? LuArrowLeftCircle : LuArrowRightCircle} boxSize={6} />
				</Box>
			</Box>
		</Box>
	);
}
