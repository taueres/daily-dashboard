import React from 'react';
const x = React.createElement.bind(React);

export const Quotes = ({ data }) => {
    const collection = [];
    for (const d of data) {
        collection.push(
            x(
                "div",
                { className: "quote-item" },
                '"',
                x(
                    'i',
                    null,
                    d.Body,
                ),
                `" - ${d.Author}`,
                x('br'),
                d.Context
            )
        );
    }
    return x(
        "div",
        { className: "section motivational-quotes" },
        x("h2", null, "Motivational Quotes"),
        collection
    );
};
