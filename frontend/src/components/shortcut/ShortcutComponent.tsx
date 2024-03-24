import React, {useEffect} from 'react';

const ShortcutComponent: React.FC = () => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Example: Ctrl+Shift+N
            if (event.ctrlKey && event.shiftKey && event.key === 'A') {
                console.log('Ctrl+Shift+N was pressed');
                // Implement your action here
            }
        };

        // Add event listener
        window.addEventListener('keydown', handleKeyDown);

        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>
            Press Ctrl+Shift+N to trigger an action.
        </div>
    );
};

export default ShortcutComponent;