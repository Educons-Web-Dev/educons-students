import { Editor } from '@tiptap/react';
import React from 'react';

interface IResumeEditorMenu {
  editor: Editor;
}

const ResumeEditorMenu = ({ editor }: IResumeEditorMenu) => {
  const menuItemClasses = 'py-[2px] px-[6px] rounded-sm hover:bg-gray-100 transition-colors mr-2';

  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:justify-between border-2 border-solid rounded-tl-md rounded-tr-md py-[8px] px-[16px] border-black">
      <div className="mb-3 md:mb-0">
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
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${editor.isActive('bulletList') ? 'bg-gray-100 text-blue-400' : ''} ${menuItemClasses}`}
        >
          <i className="fa-solid fa-list"></i>
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

export default ResumeEditorMenu;
