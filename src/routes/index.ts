import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/homepage'));
const Page1 = lazy(() => import('../pages/page1'));
const Page2 = lazy(() => import('../pages/page2'));

export const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/page-1',
        component: Page1,
    },
    {
        path: '/page-2',
        component: Page2,
    },
];
