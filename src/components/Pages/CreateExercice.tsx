import React, { useEffect } from 'react'
import { getCookie } from 'src/assets/tools/Utils';
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import 'github-markdown-css/github-markdown-light.css'
import Title from '../Utils/Title';


export function CreateExercice(): JSX.Element {
    useEffect(() => {
        insertDefaultMarkdown();
    });
    const baseMarkdown = `# Titre
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
    const [markdown, setMarkdown] = React.useState('## Markdown');
    const token = getCookie("token");
    if (token === undefined || token === null || token === "") {
        window.location.href = "/signin";
        return <div></div>;
    }

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
    function insertDefaultMarkdown() {
        const textArea = document.querySelector("#inputMarkdown") as HTMLTextAreaElement | null
        if (textArea === null) {
            return;
        }
        textArea.value = baseMarkdown;
        handleMarkdownChange({ target: textArea } as React.ChangeEvent<HTMLTextAreaElement>);
    }

    // TODO : créer un workspace à partir de l'api et rediriger vers la page du workspace
    // FIXME : ne pas afficher de contenu de workspace
    return (
        <>
            <Title title="Créer un exercice" />
            <div className="flex justify-center pb-10">
                <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
                                Nom de l'exercice
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="grid-name" type="text" placeholder="Nom de l'exercice" />
                            <p className="text-gray-600 text-xs italic">Donnez un nom à votre exercice</p>

                            {/* Modifier pour que la description soit un input de markdown avec la prévisualisation */}
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-description">
                                Description de l'exercice
                            </label>
                            <textarea id="inputMarkdown" onInput={handleMarkdownChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 h-48 resize-none" placeholder="Description de l'exercice"></textarea>
                            {/* Zone d'affichage de la preview de markdown */}
                            <div id="markdownPreview" className="markdown-body">
                                <ReactMarkdown
                                    rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }], [rehypeRaw]]}
                                    remarkPlugins={[remarkGfm]}
                                    children={markdown} />
                            </div>
                            <p className="text-gray-600 text-xs italic">Donnez une description à votre exercice</p>



                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-ressources">
                                Ressources de l'exercice
                            </label>
                            <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 h-48 resize-none" id="grid-ressources" placeholder="Ressources de l'exercice"></textarea>
                            <p className="text-gray-600 text-xs italic">Donnez les ressources de votre exercice</p>

                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Créer l'exercice
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}