import { Editor } from '@tiptap/react';
import React, { useCallback } from 'react';

interface IEditorMenuProps {
  editor: Editor;
}

const EditorMenu = ({ editor }: IEditorMenuProps) => {
  const menuItemClasses = 'py-[2px] px-[6px] rounded-sm hover:bg-gray-100 transition-colors mr-2';

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = () => {
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:justify-between border-2 border-solid rounded-tl-md rounded-tr-md py-[8px] px-[16px] border-black">
      <div className="mb-3 md:mb-0">
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${editor.isActive('blockquote') ? 'bg-gray-100 text-blue-400' : ''} ${menuItemClasses}`}
        >
          <i className="fa-solid fa-quote-left"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${editor.isActive('bold') ? 'bg-gray-100 text-blue-400' : ''} ${menuItemClasses}`}
        >
          <i className="fa-solid fa-bold"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${editor.isActive('italic') ? 'bg-gray-100 text-blue-400' : ''} ${menuItemClasses}`}
        >
          <i className="fa-solid fa-italic"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${editor.isActive('underline') ? 'bg-gray-100 text-blue-400' : ''} ${menuItemClasses}`}
        >
          <i className="fa-solid fa-underline"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`${editor.isActive('left') ? 'bg-gray-100 text-blue-400' : ''} ${menuItemClasses}`}
        >
          <i className="fa-solid fa-align-left"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`${editor.isActive('center') ? 'bg-gray-100 text-blue-400' : ''} ${menuItemClasses}`}
        >
          <i className="fa-solid fa-align-center"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`${editor.isActive('right') ? 'bg-gray-100 text-blue-400' : ''} ${menuItemClasses}`}
        >
          <i className="fa-solid fa-align-right"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${
            editor.isActive('heading', { level: 1 }) ? 'bg-gray-100 text-blue-400' : ''
          } ${menuItemClasses} font-bold`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${
            editor.isActive('heading', { level: 2 }) ? 'bg-gray-100 text-blue-400' : ''
          } ${menuItemClasses} font-bold`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${editor.isActive('bulletList') ? 'bg-gray-100 text-blue-400' : ''} ${menuItemClasses}`}
        >
          <i className="fa-solid fa-list"></i>
        </button>
        <button
          className={`${menuItemClasses} font-bold`}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          HR
        </button>
        <button
          onClick={setLink}
          className={`${editor.isActive('link') ? 'bg-gray-100 text-blue-400' : ''} ${menuItemClasses}`}
        >
          <i className="fa-solid fa-link"></i>
        </button>
        <button
          className={`${menuItemClasses} cursor-pointer`}
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
        >
          <i className="fa-solid fa-link-slash"></i>
        </button>
        <button className={menuItemClasses} onClick={addImage}>
          <i className="fa-solid fa-image"></i>
        </button>
      </div>
      <div className="flex">
        <button
          className={menuItemClasses}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <i className="fa-solid fa-rotate-left"></i>
        </button>
        <button
          className={menuItemClasses}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <i className="fa-solid fa-rotate-right"></i>
        </button>
      </div>
    </div>
  );
};

export default EditorMenu;
