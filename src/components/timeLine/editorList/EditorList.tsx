import React from 'react';
import styles from './EditorList.module.scss';

interface EditorListProps {
  className?: string;
}

const EditorList: React.FC<EditorListProps> = ({ className }) => {
  return <div className={className}>editorlist</div>;
};

export default EditorList;
