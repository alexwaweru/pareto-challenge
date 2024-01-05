import { FC, useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Box, useTheme } from '@mui/material';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { MenuBar } from './MenuBar';

const useStyles = (contentPlacehoder: string) =>
  makeStyles()(() => ({
    editorContent: {
      width: '100%',
      '& .ProseMirror': {
        padding: '0.2rem 1rem',
        outline: 'none',
        color: 'white',
        fontSize: '14px',
        width: '100%',
        margin: '0.4rem auto',
        overflow: 'auto',
        height: '8em',
        '& focus': {
          outline: 'none',
        },
        'p.is-editor-empty:first-of-type::before': {
          content: contentPlacehoder,
          width: '100%',
          float: 'left',
          color: '#ced4da',
          pointerEvents: 'none',
          height: '0',
        },
        a: {
          color: 'rgb(0, 51, 255)',
          fontWeight: 'bold',
          cursor: 'pointer',
        },
      },
    },
  }));

type Props = {
  content: string;
  setContent: (content: string) => void;
  placeholder?: string;
  hasError?: boolean;
};

const RichTextEditor: FC<Props> = ({
  content,
  setContent,
  placeholder = '"Write something …"',
  hasError = false,
}) => {
  const { classes } = useStyles(placeholder)(useTheme());
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Underline,
      Link,
      Placeholder,
    ],
    autofocus: false,
    content,
    onUpdate({ editor }) {
      const newHtmlContent = editor.getHTML();
      setContent(newHtmlContent);
    },
  });

  const [initialContentSet, setInitialContentSet] = useState(false);
  useEffect(() => {
    if (content && content !== undefined && initialContentSet === false) {
      editor?.commands.setContent(content);
      setInitialContentSet(true);
    }
  }, [content]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        margin: 'auto',
        width: '100%',
        maxWidth: '500px',
        borderRadius: '1rem',
        border: `1px solid ${hasError ? '#f44635' : '#A9AAAD'}`,
      }}
    >
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className={classes.editorContent} />
    </Box>
  );
};

export default RichTextEditor;
