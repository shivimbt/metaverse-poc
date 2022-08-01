

export class KeyDisplay {
    static directions = ['w','a','s','d'];
    constructor(text){
        this.text = text;
        this.key = this.#createKey();
        this.#addKeyToDom();
    }

    #createKey() {
        const key = document.createElement('div');
        key.textContent = this.text;
        key.classList.add('movement-key');
        key.classList.add('key-'+this.text);
        return key;
    }

    #addKeyToDom(){
        document.body.append(this.key);
    }

    down() {
        this.key.classList.add('pressed');
    }

    up() {
        this.key.classList.remove('pressed');
    }

}