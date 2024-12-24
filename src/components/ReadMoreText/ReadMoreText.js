import React, { useEffect, useState } from 'react';
import styles from './ReadMoreText.module.scss';
import { useTranslation } from 'react-i18next';

const ReadMoreText = ({ htmlContent, maxLines, resetKey }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const { t } = useTranslation();

    // Reset state when resetKey changes
    useEffect(() => {
        setIsExpanded(false);
    }, [resetKey]);

    useEffect(() => {
        const div = document.createElement('div');
        div.innerHTML = htmlContent;
        const lines = div.innerText.split('\n');
        setIsTruncated(lines.length > maxLines);
    }, [htmlContent, maxLines]);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const getPreviewContent = (htmlContent, maxLines) => {
        const div = document.createElement('div');
        div.innerHTML = htmlContent;

        const lines = [];
        const childNodes = div.childNodes;
        let lineCount = 0;

        for (let i = 0; i < childNodes.length; i++) {
            const node = childNodes[i];
            if (node.nodeType === Node.TEXT_NODE) {
                const nodeLines = node.textContent.split('\n');
                for (let j = 0; j < nodeLines.length; j++) {
                    lines.push(nodeLines[j]);
                    lineCount++;
                    if (lineCount >= maxLines) break;
                }
            } else {
                lines.push(node.outerHTML);
                lineCount++;
            }
            if (lineCount >= maxLines) break;
        }

        return lines.join('\n');
    };

    const contentToDisplay = isExpanded ? htmlContent : getPreviewContent(htmlContent, maxLines);

    return (
        <div className={styles.root}>
            <div
                dangerouslySetInnerHTML={{ __html: contentToDisplay }}
            />
            {isTruncated && (
                <div className={styles.readMore} onClick={toggleReadMore}>
                    {isExpanded ? t('read_less') : t('read_more')}
                </div>
            )}
        </div>
    );
};

export default ReadMoreText;
