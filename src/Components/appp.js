import React, { useState } from "react";
import { marked } from "marked";
import { Prism } from "prismjs";
import "prismjs/components/prism-javascript"; // Add language support for JavaScript
import "@fortawesome/fontawesome-free/css/all.min.css";

// Configure marked options
marked.setOptions({
  breaks: true,
  highlight: (code) =>
    Prism.highlight(code, Prism.languages.javascript, "javascript"),
});

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState(placeholder);
  const [editorMaximized, setEditorMaximized] = useState(false);
  const [previewMaximized, setPreviewMaximized] = useState(false);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const handleEditorMaximize = () => {
    setEditorMaximized(!editorMaximized);
  };

  const handlePreviewMaximize = () => {
    setPreviewMaximized(!previewMaximized);
  };

  const classes = editorMaximized
    ? ["editorWrap maximized", "previewWrap hide", "fa fa-compress"]
    : previewMaximized
    ? ["editorWrap hide", "previewWrap maximized", "fa fa-compress"]
    : ["editorWrap", "previewWrap", "fa fa-arrows-alt"];

  return (
    <div>
      <div className={classes[0]}>
        <Toolbar
          icon={classes[2]}
          onClick={handleEditorMaximize}
          text="Editor"
        />
        <Editor markdown={markdown} onChange={handleChange} />
      </div>
      <div className="converter" />
      <div className={classes[1]}>
        <Toolbar
          icon={classes[2]}
          onClick={handlePreviewMaximize}
          text="Previewer"
        />
        <Preview markdown={markdown} />
      </div>
    </div>
  );
};

const Toolbar = (props) => (
  <div className="toolbar">
    <i className="fa fa-free-code-camp" title="no-stack-dub-sack"></i>
    {props.text}
    <i className={props.icon} onClick={props.onClick}></i>
  </div>
);

const Editor = (props) => (
  <textarea
    id="editor"
    onChange={props.onChange}
    type="text"
    value={props.markdown}
  />
);

const Preview = (props) => (
  <div
    dangerouslySetInnerHTML={{
      __html: marked(props.markdown, { renderer }),
    }}
    id="preview"
  />
);

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '~~~' && lastLine == '~~~') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;

// Export MarkdownPreviewer component
export default MarkdownPreviewer;
