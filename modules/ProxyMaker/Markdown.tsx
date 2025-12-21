'use client';

import { type ReactNode } from 'react';

const MARKS_RE = /(\*\*|__)(.*?)\1|(\*|_)(.*?)\3/g;
//                ╰────────╰───╯─╯ ╰─────╰───╯─╯
const NEWLINE_RE = /\n{2,}/;

type Props = {
  text: string;
};

/**
 * Simple and naive Markdown parser.
 *
 * Supports emphasis, bold and paragraphs only.
 */
export const Markdown = ({ text }: Props) => {
  // const paragraphs = new DOMParser()
  //   .parseFromString(text, 'text/html')
  //   .body.textContent.split(NEWLINE_RE)
  //   .filter((it) => it.trim());
  const paragraphs = text.split(NEWLINE_RE).filter((it) => it.trim());
  let key = 0;
  return paragraphs.map((paragraph) => {
    let index = 0;
    const elements: ReactNode[] = [];
    let match: RegExpExecArray | null = null;
    while ((match = MARKS_RE.exec(paragraph))) {
      const [_full, _bold, bold, _italic, italic] = match;
      const before = paragraph.substring(index, match.index);
      if (before) elements.push(before);
      if (bold) elements.push(<strong key={key++}>{bold}</strong>);
      if (italic) elements.push(<em key={key++}>{italic}</em>);
      index = MARKS_RE.lastIndex;
    }
    const after = paragraph.substring(index);
    if (after) elements.push(after);
    return <p key={key++}>{elements}</p>;
  });
};
