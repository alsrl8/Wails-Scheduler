import React, {useEffect} from 'react';

const ShortcutComponent: React.FC = () => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.shiftKey && event.key === 'A') {
                console.log('Ctrl+Shift+N was pressed');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div>
            Press Ctrl+Shift+A to add schedule.
        </div>
    );
};

export default ShortcutComponent;