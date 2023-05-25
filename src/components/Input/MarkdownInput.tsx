import React, { useEffect } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeHighlight from "rehype-highlight/lib";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function MarkdownInput(props: any) {
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if(textAreaRef.current === null){
            console.log("textAreaRef.current is null");
            return;
        }
        textAreaRef.current.value = baseMarkdown;
        handleMarkdownChange({ target: textAreaRef.current } as React.ChangeEvent<HTMLTextAreaElement>);
    }, [textAreaRef]);
    let baseMarkdown = `# Titre
# Sous-titre
# Sous-sous titre

Exemple de texte *italique* **gras** **gras-italique**

| titre | titre 2 | titre 3 |
| ---: | :--- | :---| 
| data1| data2 | data3|
| data4 | data5 | 

Voici un \`code\` dans une ligne de texte
\`\`\`
Code dans un block
\`\`\`
Voici un [lien](https://en.wikipedia.org/wiki/Markdown)

Affichage d'une image 
![Affichage d'une image](http://code.ahren.org/wp-content/uploads/Screenshot.png)

- Voici une liste
- Un point
- - Un point
- - - Un point`
    const [markdown, setMarkdown] = React.useState(baseMarkdown);


    function handleMarkdownChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        let markdown = event.target.value;
        // markdown = markdown.replace("\n", "  \n");
        for (let i = 0; i < markdown.length; i++) {
            // Print each character to the console
            if (markdown[i] === "\n") {
                // insert 2 spaces before \n
                markdown = markdown.slice(0, i) + "  \n" + markdown.slice(i + 1);
                i = i + 2;

            }
        }
        setMarkdown(markdown);
    }

    return (
        <>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-description">
                Description de l'exercice
            </label>
            <p className="text-gray-600 text-xs italic">Donnez une description à votre exercice</p>
            <div className="flex flex-row">
                <div className="w-1/2">
                    <textarea ref={textAreaRef} id={props.inputId} onInput={handleMarkdownChange}  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 h-full resize-none" placeholder="Description de l'exercice"></textarea>
                </div>
                <div className="w-1/2">
                    {/* Zone d'affichage de la preview de markdown */}
                    <div id="markdownPreview" className="markdown-body">
                        <ReactMarkdown
                            rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }], [rehypeRaw]]}
                            remarkPlugins={[remarkGfm]}
                            children={markdown} />
                    </div>
                </div>
            </div>
        </>
    )
}