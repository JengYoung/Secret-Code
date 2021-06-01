import { useEffect, useState } from 'react';

const resolveTheme = () => {
    let theme = localStorage.getItem('theme');
    if (!theme) {
        const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
        theme = matches ? 'dark' : 'light';
    }
    return theme;
}

const useTheme = () => {
    const [theme, setTheme] = useState(resolveTheme);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    return [theme, toggleTheme];
}

export default useTheme;