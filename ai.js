import OpenAI from "openai";
import CryptoJS from 'crypto-js';
import { cacheData } from './cache.js';

const exampleData = {
    "RequestedInputDay": "2023-11-11",
    "InterestingFacts": [
      {
        "Year": 1889,
        "Description": "Washington became the 42nd state of the United States."
      }
    ],
    "MotivationalQuotes": [
      {
        "Body": "Courage isn't having the strength to go on - it's going on when you don't have strength.",
        "Author": "Napoleon Bonaparte",
        "Context": "On the anniversary of the end of WW1, let us remember these words and find strength in our daily endeavors."
      }
    ],
    "BornToday": [
      {
        "Name": "General George S. Patton",
        "BornOnYear": 1885,
        "KnownFor": "U.S. Army general during World War II",
        "DiedOn": "1945-12-21"
      },
      {
        "Name": "Jan Adamski",
        "BornOnYear": 1943,
        "KnownFor": "Polish International Chess Master",
        "DiedOn": "Alive"
      }
    ],
    "DiedToday": [
      {
        "Name": "Søren Kierkegaard",
        "DiedOnYear": 1855,
        "KnownFor": "Danish Philosopher",
        "BornOn": "1813-05-05"
      }
    ]
};

const ENCRYPTED = 'U2FsdGVkX1/Rgf7S20j5jwGfmwJMdV4S+UCfHSDaR6I5z0DQgrP82Y/FrR7zim4IV9RiSiDGTmHxQ8k+Q1uqyGfzX+WK4sF4muziEikMPBw=';

const inner = async (password, date) => {
    const decrypted = CryptoJS.AES.decrypt(ENCRYPTED, password);
    const apiKey = decrypted.toString(CryptoJS.enc.Utf8);

    const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true
    });

    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                "role": "system",
                "content": `
Your goal is to fill in the data for a daily dashboard that shows information for the current day. I want these pieces of information:
1) give me 5 interesting facts that happened with today's date (i.e. day and month) but in the past. Do not include births or deaths of people. Focus on the most influential events;
2) give me 3  motivational quotes to get motivated for the day. It's better if they are contextualized with today's date, especially if they refer to the events of point #1;
3) give me 4 names of famous people that are born with today's date (i.e. day and month). Give less priority to actors, musicians and similar. Return the most influential people;
4) give me 4 names of famous people that have died with today's date (i.e. day and month);  Give less priority to actors, musicians and similar. Return the most influential people.

I want the response in JSON. Please output the JSON response ONLY, no other text.

This is an example of the JSON response that you can use to derive the response format:

${JSON.stringify(exampleData, null, 2)}
`
            },
            {
                "role": "user",
                "content": "Today is " + date
            }
        ],
        temperature: 1,
        max_tokens: 4000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    const content = JSON.parse(response.choices[0].message.content);

    content.InterestingFacts.sort((a, b) => a.Year - b.Year);
    content.BornToday.sort((a, b) => a.BornOnYear - b.BornOnYear);
    content.DiedToday.sort((a, b) => a.DiedOnYear - b.DiedOnYear);

    return content;
}

export const getAiData = (password, date) => {
    return cacheData(() => inner(password, date))(date);
}
