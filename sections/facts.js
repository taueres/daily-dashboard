import React from 'react';
const x = React.createElement.bind(React);

export const Facts = ({ data }) => {
    const factsCollection = [];
    for (const d of data) {
        factsCollection.push(
            x(
                "div",
                { className: "fact-item" },
                `${d.Year} - ${d.Description}`
            )
        );
    }

    return x(
        "div",
        { className: "section interesting-facts" },
        x("h2", null, "Interesting Facts"),
        factsCollection
    )
};
