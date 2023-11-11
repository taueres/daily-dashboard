import React from 'react';
const x = React.createElement.bind(React);

const BornOn = ({ date }) => {
    if (!date) {
        return null;
    }

    return x(
        React.Fragment,
        null,
        ' Born on ',
        x(
            'span',
            { className: 'no-wrap'},
            date + '.',
        ),
    );
}

export const Died = ({ data }) => {
    const collection = [];
    for (const d of data) {
        collection.push(
            x(
                "div",
                { className: "person-item" },
                `${d.Name} (${d.DiedOnYear}) - ${d.KnownFor}.`,
                x(
                    BornOn,
                    { date: d.BornOn }
                )
            )
        );
    }
    return x(
        "div",
        { className: "section died-today" },
        x("h2", null, "Died Today"),
        collection,
    );
};

