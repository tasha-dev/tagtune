export interface RootLayoutProps {
   children: React.ReactNode;
}

export interface ClassOnlyProps {
   className?: string;
}

export interface ErrorPageProps {
   error: Error & { digest?: string };
   reset: () => void;
}
