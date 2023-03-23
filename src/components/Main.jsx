import Demo from "./Playground/Demo";

export default function Main(prop) {


    return (
        <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-light">
                <div className="min-h-3xl w-auto mx-auto py-20 text-center">
                    <h1 className="text-8xl font-mono">
                        Bienvenue dans le Playground
                    </h1>
                </div>
                <Demo/>
            </div>
        </main>
    )

}