import React, {useState, useCallback} from 'react';

const ChineseTranslate: React.FC = () => {
    const ORIGINAL_TEXT = '凤凰涅槃 浴火重生';
    const TRANSLATED_TEXT = 'PHƯỢNG HOÀNG NIẾT BÀN, DỤC HOẢ TRÙNG SINH';

    const [isOriginalText, setIsOriginalText] = useState(true);

    const handleClick = useCallback(() => {
        setIsOriginalText(prevState => !prevState);
    }, []);
    const currentText = isOriginalText ? ORIGINAL_TEXT : TRANSLATED_TEXT;
    return (
        <div>
            <p
                onClick={handleClick}
                style={{cursor: 'pointer'}}
            >
                {currentText}
            </p>
        </div>
    );
};

export default ChineseTranslate;