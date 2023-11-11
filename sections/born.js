import React from 'react';
const x = React.createElement.bind(React);

const DiedOn = ({ date }) => {
    if (!date || date === 'Alive') {
        return null;
    }

    return x(
        React.Fragment,
        null,
        ' Died on ',
        x(
            'span',
            { className: 'no-wrap'},
            date + '.',
        ),
    );
}

export const Born = ({ data }) => {
    const collection = [];
    for (const d of data) {
        collection.push(
            x(
                "div",
                { className: "person-item" },
                `${d.Name} (${d.BornOnYear}) - ${d.KnownFor}.`,
                x(
                    DiedOn,
                    { date: d.DiedOn }
                ),
            )
        );
    }
    return x(
        "div",
        { className: "section born-today" },
        x("h2", null, "Born Today"),
        collection,
    );
};

