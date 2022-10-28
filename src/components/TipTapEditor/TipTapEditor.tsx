import { EditorContent, Editor } from '@tiptap/react';
import EditorMenu from './EditorMenu';

interface ITipTapEditorProps {
  editor: Editor;
  readonly?: boolean;
  menu?: React.ReactNode;
}

export const TipTapEditor = ({
  editor,
  readonly = false,
  menu = <EditorMenu editor={editor} />,
}: ITipTapEditorProps) => {
  return (
    <div className={`${readonly ? '' : 'news-editor'}`}>
      {editor && editor.isEditable && <>{menu}</>}
      <EditorContent editor={editor} />
    </div>
  );
};
