
class BookDisplay extends HTMLDialogElement {

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
