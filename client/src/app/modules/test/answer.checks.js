export function areEqual(value1 = '', value2 = '', lang) {
    let sanitizedFirstValue = value1.trim().toLowerCase();
    let sanitizedSecondValue = value2.trim().toLowerCase();

    let cleared1 = mapStringAccordingToLang(sanitizedFirstValue, lang);
    let cleared2 = mapStringAccordingToLang(sanitizedSecondValue, lang);

    return cleared1 === cleared2;
}

let langHandlers = {
    en: (str) => {
        let regex = /^to /i;

        return str.replace(regex, '');
    },
    ru: s => s,
};

function mapStringAccordingToLang(str, lang) {
    let langHandler = langHandlers[lang];

    if ( !langHandler ) {
        return str;
    }

    return langHandler(str);
}
