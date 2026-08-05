import type React from "react";
import { useCallback, useState } from "react";

const ChineseTranslate: React.FC = () => {
	const ORIGINAL_TEXT = "凤凰涅槃 浴火重生";
	const TRANSLATED_TEXT = "PHƯỢNG HOÀNG NIẾT BÀN, DỤC HOẢ TRÙNG SINH";

	const [isOriginalText, setIsOriginalText] = useState(true);

	const handleClick = useCallback(() => {
		setIsOriginalText((prevState) => !prevState);
	}, []);
	const currentText = isOriginalText ? ORIGINAL_TEXT : TRANSLATED_TEXT;
	return (
		<div>
			<button
				type="button"
				onClick={handleClick}
				style={{ cursor: "pointer", background: "none", border: "none", padding: 0, font: "inherit", color: "inherit" }}
			>
				{currentText}
			</button>
		</div>
	);
};

export default ChineseTranslate;
