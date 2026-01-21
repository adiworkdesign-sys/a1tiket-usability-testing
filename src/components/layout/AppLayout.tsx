import { ReactNode } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface AppLayoutProps {
    children: ReactNode;
    showHeader?: boolean;
    showBottomNav?: boolean;
}

export const AppLayout = ({
    children,
    showHeader = true,
    showBottomNav = true
}: AppLayoutProps) => {
    return (
        <div className="min-h-screen bg-background">
            {showHeader && <Header />}
            <main className={cn(
                'container max-w-lg mx-auto',
                showBottomNav ? 'pb-20' : 'pb-4'
            )}>
                {children}
            </main>
            {showBottomNav && <BottomNav />}
        </div>
    );
};

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ');
}
