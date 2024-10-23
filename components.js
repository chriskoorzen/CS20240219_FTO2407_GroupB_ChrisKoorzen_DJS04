
export class BookDisplay extends HTMLDivElement {

    static #cssStyles = `
    * {
        box-sizing: border-box;
    }

    @keyframes enter {
        from {
            transform: translateY(10rem);
        }
        to {
            transform: translateY(0);
        }
    }
    
    /* overlay */

    .overlay {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        border-width: 0;
        box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
        animation-name: enter;
        animation-duration: 0.6s;
        z-index: 10;
        background-color: rgba(var(--color-light), 1);
    }

    @media (min-width: 30rem) {
        .overlay {
            max-width: 30rem;
            left: 0%;
            top: 0;
            border-radius: 8px;;
        }
    }

    .overlay__row {
        display: flex;
        gap: 0.5rem;
        margin: 0 auto;
        justify-content: center;
    }

    .overlay__button {
        font-family: Roboto, sans-serif;
        background-color: rgba(var(--color-blue), 0.1);
        transition: background-color 0.1s;
        border-width: 0;
        border-radius: 6px;
        height: 2.75rem;
        cursor: pointer;
        width: 50%;
        color: rgba(var(--color-blue), 1);
        font-size: 1rem;
        border: 1px solid rgba(var(--color-blue), 1);
    }

    .overlay__button_primary {
        background-color: rgba(var(--color-blue), 1);
        color: rgba(var(--color-force-light), 1);
    }

    .overlay__button:hover {
        background-color: rgba(var((var(--color-blue))), 0.2);
    }


    .overlay__button_primary:hover {
        background-color: rgba(var(--color-blue), 0.8);
        color: rgba(var(--color-force-light), 1);
    }

    .overlay__title {
        padding: 1rem 0 0.25rem;
        font-size: 1.25rem;
        font-weight: bold;
        line-height: 1;
        letter-spacing: -0.1px;
        max-width: 25rem;
        margin: 0 auto;
        color: rgba(var(--color-dark), 0.8)
    }

    .overlay__blur {
        width: 100%;
        height: 200px;
        filter: blur(10px);
        opacity: 0.5;
        transform: scale(2);
    }

    .overlay__image {
        max-width: 10rem;
        position: absolute;
        top: 1.5m;
        left: calc(50% - 5rem);
        border-radius: 2px;
        box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
    }

    .overlay__data {
        font-size: 0.9rem;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        color: rgba(var(--color-dark), 0.8)
    }

    .overlay__data_secondary {
        color: rgba(var(--color-dark), 0.6)
    }

    .overlay__content {
        padding: 2rem 1.5rem;
        text-align: center;
        padding-top: 3rem;
    }

    .overlay__preview {
        overflow: hidden;
        margin: -1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
        
    /* backdrop */

    dialog::backdrop {
        background-color: rgba(var(--color-dark), 0.3);
    }

    .backdrop {
        display: none;
        background: rgba(var(--color-dark), 0.3);
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
    }`

    constructor(){
        super()

    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "closed" })    // Encapsulate this component completely

        this.container = Object.assign(document.createElement("div"), {className: "backdrop"})
        this.modal = Object.assign(document.createElement("dialog"), {className: "overlay"})

        const imgWrapper = Object.assign(document.createElement("div"), {className: "overlay__preview"})
        this.background = Object.assign(document.createElement("img"), {className: "overlay__blur"})
        this.image = Object.assign(document.createElement("img"), {className: "overlay__image"})
        imgWrapper.append(
            this.background,
            this.image
        )

        const textWrapper = Object.assign(document.createElement("div"), {className: "overlay__content"})
        this.titleHeading = Object.assign(document.createElement("h3"), {className: "overlay__title"})
        this.subtitle = Object.assign(document.createElement("div"), {className: "overlay__data"})
        this.description = Object.assign(document.createElement("p"), {className: "overlay__data overlay__data_secondary"})
        textWrapper.append(
            this.titleHeading,
            this.subtitle,
            this.description
        )

        const buttonWrapper = Object.assign(document.createElement("div"), {className: "overlay__row"})
        const closeButton = Object.assign(document.createElement("button"), {className: "overlay__button overlay__button_primary", innerText: "Close"})
        closeButton.addEventListener("click", () => {
            this.modal.close()
            this.container.style.display = "none"
        })
        buttonWrapper.append(
            closeButton
        )

        this.modal.append(
            imgWrapper,
            textWrapper,
            buttonWrapper
        )
        this.container.append(this.modal)
        shadow.append(this.container)


        // Set up Styling
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(BookDisplay.#cssStyles)
        shadow.adoptedStyleSheets = [sheet]

    }

    displayBook(bookObj, authorRef){
        this.background.src = bookObj.image
        this.image.src = bookObj.image
        this.titleHeading.innerText = bookObj.title
        this.subtitle.innerText = `${authorRef[bookObj.author]} (${new Date(bookObj.published).getFullYear()})`
        this.description.innerText = bookObj.description

        this.container.style.display = "block"
        this.modal.show()

    }
}
