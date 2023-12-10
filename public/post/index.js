const post = {
    "node": {
        "1장": "path",
        "2장": "path",
        "3장": "path",
        "4장": "path"
    },
    "spring": {
        "1장": "path",
        "2장": "path",
        "3장": "path",
        "4장": "path"
    },
    "fastapi": {
        "1장": "path",
        "2장": "path",
        "3장": "path",
        "4장": "path"
    },
    "docker": {
        "1장": "path",
        "2장": "path",
        "3장": "path",
        "4장": "path"
    }
}

const parse = () => {
    return {
        node: require("./svelte/4장 블록 구조.md")
    }
}

export default parse;