'use client';

import {
	Avatar,
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerOverlay,
	Flex,
	Image,
	Link,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	textDecoration,
	useDisclosure,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import Hamburger from 'hamburger-react';
import { useEffect, useState } from 'react';
import { sidAxios } from '@/utils/axios';
import useAuth from '@/hooks/useAuth';
import Logout from './Logout';

export default function PublicNavbar() {
	const { user } = useAuth();
	const pathname = usePathname();
	const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: false });
	const links = [
		{
			name: 'Beranda',
			href: '/',
			active: '/',
		},
		{
			name: 'Informasi Dosen',
			href: '/dosen',
			active: '/dosen',
		},
		{
			name: 'Pengumuman',
			href: '/pengumuman',
			active: '/pengumuman',
		},
	];

	// Detect window resize and close drawer if screen size is lg or larger
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024 && isOpen) {
				onClose(); // Close drawer when screen is lg or larger
			}
		};

		// Add event listener to window resize
		window.addEventListener('resize', handleResize);

		// Cleanup event listener on unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [isOpen, onClose]);

	return (
		<>
			<Box paddingX={{ base: 4, lg: 20 }} paddingY={{ base: 2, lg: 6 }} bg={'navy'} position={'relative'}>
				<Flex flexDirection={'row'} alignItems={'center'}>
					<Link href='/'>
						<Image src='/assets/logo/sid.png' height={{ base: '24px', lg: '30px' }} />
					</Link>

					<Box hideFrom={'lg'} marginLeft={'auto'} color={'white'}>
						<Hamburger toggled={isOpen} toggle={onToggle} size={24} />
					</Box>

					<Flex hideBelow={'lg'} flexDirection={'row'} gap={16} alignItems={'center'} marginLeft={'auto'}>
						{links.map((link, index) => {
							const isActive = pathname === link.active;
							return (
								<Box position={'relative'} key={index}>
									<Link href={link.href} color={isActive ? 'primary-blue' : 'white'} fontWeight={isActive ? 800 : 400} _hover={{ textDecoration: 'none' }}>
										{link.name}
									</Link>

									{isActive && <Box width={'full'} height={1} bg={'primary-blue'} top={'110'}></Box>}
								</Box>
							);
						})}

						{user ? (
							<Menu>
								<MenuButton>
									<Avatar size={'sm'} name={user.name} src={user.profile_url} />
								</MenuButton>
								<MenuList>
									<Link href='/dashboard/home' _hover={{ textDecoration: 'none' }}>
										<MenuItem>Admin Area</MenuItem>
									</Link>
									<MenuDivider />
									<Logout />
								</MenuList>
							</Menu>
						) : (
							<Link href='/login' paddingX={4} paddingY={2} borderRadius={'md'} bg={'primary-blue'} color={'white'}>
								Login
							</Link>
						)}
					</Flex>
				</Flex>

				<Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerBody bg={'navy'} paddingY={12}>
							<Flex flexDirection={'column'} gap={8} alignItems={'center'} marginLeft={'auto'}>
								{links.map((link, index) => {
									const isActive = pathname === link.active;
									return (
										<Box position={'relative'} key={index}>
											<Link href={link.href} color={isActive ? 'primary-blue' : 'white'} fontWeight={isActive ? 800 : 400} _hover={{ textDecoration: 'none' }}>
												{link.name}
											</Link>

											{isActive && <Box width={'full'} height={1} bg={'primary-blue'} top={'110'}></Box>}
										</Box>
									);
								})}

								<Link paddingX={4} paddingY={2} borderRadius={'md'} bg={'primary-blue'} color={'white'}>
									Login
								</Link>
							</Flex>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</Box>
		</>
	);
}
