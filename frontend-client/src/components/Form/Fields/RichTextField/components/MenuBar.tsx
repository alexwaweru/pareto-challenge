import React, { FC, useState, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import {
  Button,
  DialogContent,
  Divider,
  IconButton,
  Popover,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Editor } from '@tiptap/react';
import { Level } from '@tiptap/extension-heading';

import FontBoldIcon from '@media/icons/font-bold.svg';
import FontItalicIcon from '@media/icons/font-italic.svg';
import UnderlineIcon from '@media/icons/underline.svg';
import ListBulletIcon from '@media/icons/list-bullet.svg';
import ListOderedIcon from '@media/icons/ordered-list.svg';
import LinkIcon from '@media/icons/link.svg';
import LinkBreakIcon from '@media/icons/link-break.svg';
import CloseIcon from '@media/icons/close.svg';

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    display: 'flex',
    padding: '0.5rem 1rem',
    width: '100%',
    [theme.breakpoints.up(600)]: {
      padding: '0.5rem 1rem',
    },
  },
  flex: {
    display: 'flex',
    [theme.breakpoints.up(600)]: {
      gap: '1rem',
    },
    flexFlow: 'row wrap',
    width: 'fit-content',
  },
  relative: {
    position: 'relative',
  },
  buttonArray: {
    borderBottom: '1px solid #A9AAAD',
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'row wrap',
    width: '100%',
    justifyContent: 'center',
    padding: '0rem',
    [theme.breakpoints.up(600)]: {
      padding: '1rem',
    },
  },
  isActive: {
    color: '#768eff !important',
  },
  popoverTitleContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    width: '100%',
    justifyContent: 'space-between',
  },
  popoverFormContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '30px',
  },
  popoverAddButton: {
    width: '100%',
    backgroundColor: 'rgb(91, 154, 248)',
    marginTop: '1em',
    color: 'white',
  },
  popoverTextField: {
    width: '100%',
    borderRadius: '5px',
  },
}));

type Props = {
  editor: Editor | null;
};

export const MenuBar: FC<Props> = ({ editor }) => {
  const { classes } = useStyles(useTheme());

  // headings controls
  const toggleHeading = (level: Level) =>
    editor?.chain().focus().toggleHeading({ level }).run();

  // typeface controls
  const toggleBold = () => editor?.chain().focus().toggleBold().run();
  const toggleItalics = () => editor?.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor?.chain().focus().toggleUnderline().run();
  const toggleBulletList = () =>
    editor?.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () =>
    editor?.chain().focus().toggleOrderedList().run();

  // link popover controls
  const [hyperLinkUrl, setHyperLinkUrl] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    const previousUrl = editor?.getAttributes('link').href;
    setHyperLinkUrl(previousUrl);
  };
  const handleClosePopover = () => setAnchorEl(null);
  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? 'rte-link-popover' : undefined;

  const handleChangeHyperLinkUrl = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setHyperLinkUrl(e.target.value);
  const setHyperLink = useCallback(
    (input: string | null) => {
      // cancelled
      if (input === null) return;
      // empty
      if (input === '') {
        editor?.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }
      // update link
      editor
        ?.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: input, target: '_blank' })
        .run();
    },
    [editor]
  );

  const handlePopoverSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setHyperLink(hyperLinkUrl);
    setAnchorEl(null);
    setHyperLinkUrl('');
  };

  if (!editor) return null;

  return (
    <div className={classes.wrapper}>
      <div className={classes.buttonArray}>
        <div className={classes.flex}>
          {/** Font size */}
          <IconButton title="bold" onClick={() => toggleHeading(2)}>
            <Typography
              variant="subtitle2"
              className={
                editor?.isActive('heading', { level: 2 })
                  ? classes.isActive
                  : ''
              }
            >
              H1
            </Typography>
          </IconButton>
          <IconButton title="italics" onClick={() => toggleHeading(3)}>
            <Typography
              variant="subtitle2"
              className={
                editor?.isActive('heading', { level: 3 })
                  ? classes.isActive
                  : ''
              }
            >
              H2
            </Typography>
          </IconButton>
          <IconButton title="underline" onClick={() => toggleHeading(4)}>
            <Typography
              variant="subtitle2"
              className={
                editor?.isActive('heading', { level: 4 })
                  ? classes.isActive
                  : ''
              }
            >
              H3
            </Typography>
          </IconButton>
          <Divider orientation="vertical" flexItem />

          {/** Font style */}
          <IconButton
            title="bold"
            onClick={toggleBold}
            className={editor?.isActive('bold') ? classes.isActive : ''}
          >
            <FontBoldIcon />
          </IconButton>
          <IconButton
            title="italics"
            onClick={toggleItalics}
            className={editor?.isActive('italic') ? classes.isActive : ''}
          >
            <FontItalicIcon />
          </IconButton>
          <IconButton
            title="underline"
            onClick={toggleUnderline}
            className={editor?.isActive('underline') ? classes.isActive : ''}
          >
            <UnderlineIcon />
          </IconButton>
          <Divider orientation="vertical" flexItem />

          {/** List */}
          <IconButton
            title="bullet_list"
            onClick={toggleBulletList}
            className={editor?.isActive('bulletList') ? classes.isActive : ''}
          >
            <ListBulletIcon />
          </IconButton>
          <IconButton
            title="ordered_list"
            onClick={toggleOrderedList}
            className={editor?.isActive('orderedList') ? classes.isActive : ''}
          >
            <ListOderedIcon />
          </IconButton>
          <Divider orientation="vertical" flexItem />

          {/** Link */}
          <div className={classes.relative} onMouseLeave={handleClosePopover}>
            {editor.isActive('link') ? (
              <IconButton
                className={classes.isActive}
                title="remove link"
                onClick={() => editor.chain().focus().unsetLink().run()}
              >
                <LinkBreakIcon />
              </IconButton>
            ) : (
              <IconButton title="add a link" onClick={handleOpenPopover}>
                <LinkIcon />
              </IconButton>
            )}
            <Popover
              id={popoverId}
              open={openPopover}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <DialogContent sx={{ bgcolor: '#292C32' }}>
                <div className={classes.popoverTitleContainer}>
                  <Typography variant="h6">Add Link</Typography>
                  <IconButton aria-label="close" onClick={handleClosePopover}>
                    <CloseIcon />
                  </IconButton>
                </div>

                <div className={classes.popoverFormContainer}>
                  <TextField
                    size="small"
                    className={classes.popoverTextField}
                    onChange={(e) => handleChangeHyperLinkUrl(e)}
                  />
                  <Button
                    className={classes.popoverAddButton}
                    onClick={(e) => handlePopoverSubmit(e)}
                  >
                    Add
                  </Button>
                </div>
              </DialogContent>
            </Popover>
          </div>
        </div>
      </div>
      <Divider orientation="horizontal" flexItem />
    </div>
  );
};
