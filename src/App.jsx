import {useState, useRef, useEffect, useCallback} from "react";
import "./App.css";

const QUIZ_QUESTIONS = {
    cricket: [
        {q: "Which country won the first Cricket World Cup in 1975?", a: "West Indies"},
        {q: "Which country won the 1983 Cricket World Cup?", a: "India"},
        {q: "Which country won the 1987 Cricket World Cup?", a: "Australia"},
        {q: "Which country won the 1992 Cricket World Cup?", a: "Pakistan"},
        {q: "Which country won the 1996 Cricket World Cup?", a: "Sri Lanka"},
        {q: "Which country won the 1999 Cricket World Cup?", a: "Australia"},
        {q: "Which country won the 2003 Cricket World Cup?", a: "Australia"},
        {q: "Which country won the 2007 Cricket World Cup?", a: "Australia"},
        {q: "Which country won the 2011 Cricket World Cup?", a: "India"},
        {q: "Which country won the 2015 Cricket World Cup?", a: "Australia"},
        {q: "Which country won the 2019 Cricket World Cup?", a: "England"},
        {q: "Where was the 2011 Cricket World Cup final held?", a: "Wankhede Stadium Mumbai"},
        {q: "Who scored the winning six in the 2011 World Cup final?", a: "MS Dhoni"},
        {q: "Which team did India beat in the 2011 World Cup final?", a: "Sri Lanka"},
        {q: "Who was the captain of India in the 1983 World Cup?", a: "Kapil Dev"},
        {q: "How many times has Australia won the Cricket World Cup?", a: "5 times"},
        {q: "Who won the Man of the Tournament in 2011 World Cup?", a: "Yuvraj Singh"},
        {q: "How many sixes did Yuvraj Singh hit in one over in 2007 T20 World Cup?", a: "6 sixes"},
        {q: "Who bowled the over in which Yuvraj hit 6 sixes?", a: "Stuart Broad"},
        {q: "Who has scored the most runs in Test cricket?", a: "Sachin Tendulkar"},
        {q: "Who has scored the most runs in ODI cricket?", a: "Sachin Tendulkar"},
        {q: "How many international centuries did Sachin Tendulkar score?", a: "100 centuries"},
        {q: "Who scored the first double century in ODI cricket?", a: "Sachin Tendulkar"},
        {q: "What is the highest individual score in Test cricket?", a: "400 not out by Brian Lara"},
        {q: "Which batsman has the highest batting average in Test cricket?", a: "Don Bradman"},
        {q: "What is Don Bradman's Test batting average?", a: "99.94"},
        {q: "Who was the first batsman to score 10000 runs in Test cricket?", a: "Sunil Gavaskar"},
        {q: "Who scored the fastest Test century in terms of balls?", a: "Brendon McCullum"},
        {q: "Who scored the fastest ODI century in terms of balls?", a: "AB de Villiers"},
        {q: "In how many balls did AB de Villiers score the fastest ODI century?", a: "31 balls"},
        {q: "Who has taken the most wickets in Test cricket?", a: "Muralidaran"},
        {q: "How many Test wickets did Muralidaran take?", a: "800 wickets"},
        {q: "Who has taken the most wickets in ODI cricket?", a: "Muralidaran"},
        {q: "Who took 619 Test wickets for Australia?", a: "Shane Warne"},
        {q: "Who took 10 wickets in a single Test innings?", a: "Anil Kumble"},
        {q: "Against which team did Anil Kumble take 10 wickets in an innings?", a: "Pakistan"},
        {q: "Who is known as the God of Cricket?", a: "Sachin Tendulkar"},
        {q: "Which Indian batsman is known as The Wall?", a: "Rahul Dravid"},
        {q: "Who is known as Prince of Kolkata?", a: "Sourav Ganguly"},
        {q: "Which Indian bowler is known as The Turbanator?", a: "Harbhajan Singh"},
        {q: "Which team won the first ever IPL in 2008?", a: "Rajasthan Royals"},
        {q: "Which team has won the most IPL titles?", a: "Mumbai Indians"},
        {q: "Which country did Brian Lara play for?", a: "West Indies"},
        {q: "Who is known as The Master Blaster?", a: "Sachin Tendulkar"},
        {q: "Who is known as Sultan of Swing?", a: "Wasim Akram"},
        {q: "Who is known as Pigeon in cricket?", a: "Glenn McGrath"},
        {q: "Which country won the first T20 World Cup in 2007?", a: "India"},
        {q: "Which country won the T20 World Cup in 2009?", a: "Pakistan"},
        {q: "Which country won the T20 World Cup in 2010?", a: "England"},
        {q: "Which country won the T20 World Cup in 2016?", a: "West Indies"},
        {q: "Which is the largest cricket stadium in the world?", a: "Narendra Modi Stadium"},
        {q: "In which city is Lords Cricket Ground located?", a: "London"},
        {q: "Which stadium is known as The Mecca of Cricket?", a: "Lords"},
        {q: "How many players are there in a cricket team?", a: "11 players"},
        {q: "How many overs are there in a standard ODI match?", a: "50 overs"},
        {q: "How many overs are there in a T20 match?", a: "20 overs"},
        {q: "What is the length of a cricket pitch?", a: "22 yards"},
        {q: "Which country invented cricket?", a: "England"},
        {q: "What does LBW stand for in cricket?", a: "Leg Before Wicket"},
        {q: "How many balls are there in one over?", a: "6 balls"},
        {q: "What color ball is used in Test cricket?", a: "Red ball"},
    ],
    movies: [
        {q: "Who directed Baahubali?", a: "SS Rajamouli"},
        {q: "Who played Baahubali in the movie?", a: "Prabhas"},
        {q: "Who directed RRR?", a: "SS Rajamouli"},
        {q: "Who played Ram in RRR?", a: "Ram Charan"},
        {q: "Who played Bheem in RRR?", a: "Jr NTR"},
        {q: "Which Telugu movie won the Oscar for Best Original Song?", a: "RRR"},
        {q: "Who directed Pushpa The Rise?", a: "Sukumar"},
        {q: "Who played Pushpa Raj in Pushpa?", a: "Allu Arjun"},
        {q: "Who is known as Stylish Star in Telugu cinema?", a: "Allu Arjun"},
        {q: "Who is known as Power Star in Telugu cinema?", a: "Pawan Kalyan"},
        {q: "Who is known as Mega Star in Telugu cinema?", a: "Chiranjeevi"},
        {q: "Who is known as Young Tiger in Telugu cinema?", a: "Jr NTR"},
        {q: "Who directed Arjun Reddy?", a: "Sandeep Reddy Vanga"},
        {q: "Who played Arjun Reddy in the movie?", a: "Vijay Deverakonda"},
        {q: "Who is known as Rowdy Star in Telugu cinema?", a: "Vijay Deverakonda"},
        {q: "Who directed Magadheera?", a: "SS Rajamouli"},
        {q: "Who is known as Prince in Telugu cinema?", a: "Mahesh Babu"},
        {q: "Who is the music director of most SS Rajamouli films?", a: "MM Keeravani"},
        {q: "Who is the father of Ram Charan?", a: "Chiranjeevi"},
        {q: "Who directed 3 Idiots?", a: "Rajkumar Hirani"},
        {q: "Who played Rancho in 3 Idiots?", a: "Aamir Khan"},
        {q: "Who directed Dangal?", a: "Nitesh Tiwari"},
        {q: "Who played Mahavir Singh Phogat in Dangal?", a: "Aamir Khan"},
        {q: "Who directed Sholay?", a: "Ramesh Sippy"},
        {q: "Who played Gabbar Singh in Sholay?", a: "Amjad Khan"},
        {q: "Who is known as King Khan in Bollywood?", a: "Shah Rukh Khan"},
        {q: "Who is known as Big B in Bollywood?", a: "Amitabh Bachchan"},
        {q: "Who directed Lagaan?", a: "Ashutosh Gowariker"},
        {q: "Who directed PK?", a: "Rajkumar Hirani"},
        {q: "Who directed Titanic?", a: "James Cameron"},
        {q: "Who played Jack in Titanic?", a: "Leonardo DiCaprio"},
        {q: "Who directed The Dark Knight?", a: "Christopher Nolan"},
        {q: "Who played Batman in The Dark Knight?", a: "Christian Bale"},
        {q: "Who played Joker in The Dark Knight?", a: "Heath Ledger"},
        {q: "Who played Iron Man in Marvel movies?", a: "Robert Downey Jr"},
        {q: "Who directed Inception?", a: "Christopher Nolan"},
        {q: "Who directed The Godfather?", a: "Francis Ford Coppola"},
        {q: "Who played Vito Corleone in The Godfather?", a: "Marlon Brando"},
        {q: "Who is known as Thalaivar in Tamil cinema?", a: "Rajinikanth"},
        {q: "Who is known as Ulaga Nayagan in Tamil cinema?", a: "Kamal Haasan"},
        {q: "Who directed Enthiran in Tamil?", a: "Shankar"},
        {q: "Who is known as Thalapathy in Tamil cinema?", a: "Vijay"},
        {q: "Who directed Vikram Tamil movie 2022?", a: "Lokesh Kanagaraj"},
        {q: "Who directed Master Tamil movie?", a: "Lokesh Kanagaraj"},
        {q: "Who directed Bajrangi Bhaijaan?", a: "Kabir Khan"},
        {q: "Who directed Taare Zameen Par?", a: "Aamir Khan"},
        {q: "Who directed Rang De Basanti?", a: "Rakeysh Omprakash Mehra"},
        {q: "Who directed Kabhi Khushi Kabhie Gham?", a: "Karan Johar"},
        {q: "Who directed Dilwale Dulhania Le Jayenge?", a: "Aditya Chopra"},
        {q: "Who directed Zindagi Na Milegi Dobara?", a: "Zoya Akhtar"},
        {q: "Who directed Jurassic Park?", a: "Steven Spielberg"},
    ],
    science: [
        {q: "What is the chemical symbol for water?", a: "H2O"},
        {q: "What is the chemical symbol for gold?", a: "Au"},
        {q: "What is the chemical symbol for iron?", a: "Fe"},
        {q: "What planet is closest to the Sun?", a: "Mercury"},
        {q: "What planet is known as the Red Planet?", a: "Mars"},
        {q: "How many planets are in our solar system?", a: "8 planets"},
        {q: "What is the largest planet in our solar system?", a: "Jupiter"},
        {q: "Who invented the telephone?", a: "Alexander Graham Bell"},
        {q: "Who invented the light bulb?", a: "Thomas Edison"},
        {q: "Who discovered gravity?", a: "Isaac Newton"},
        {q: "Who developed the theory of relativity?", a: "Albert Einstein"},
        {q: "What is the powerhouse of the cell?", a: "Mitochondria"},
        {q: "How many bones are in the human body?", a: "206 bones"},
        {q: "What is the largest organ in the human body?", a: "Skin"},
        {q: "What is the hardest natural substance on Earth?", a: "Diamond"},
        {q: "What gas do plants absorb from the atmosphere?", a: "Carbon dioxide"},
        {q: "What gas do plants release during photosynthesis?", a: "Oxygen"},
        {q: "Who invented penicillin?", a: "Alexander Fleming"},
        {q: "What is the center of an atom called?", a: "Nucleus"},
        {q: "How many chambers does the human heart have?", a: "4 chambers"},
        {q: "What is the longest bone in the human body?", a: "Femur"},
        {q: "What is the chemical formula for table salt?", a: "NaCl"},
        {q: "Who invented the World Wide Web?", a: "Tim Berners-Lee"},
        {q: "What is the most abundant gas in Earths atmosphere?", a: "Nitrogen"},
        {q: "What is the boiling point of water in Celsius?", a: "100 degrees Celsius"},
        {q: "What is DNA full form?", a: "Deoxyribonucleic Acid"},
        {q: "How many chromosomes do humans have?", a: "46 chromosomes"},
        {q: "What is the nearest star to Earth?", a: "Sun"},
        {q: "Who invented the airplane?", a: "Wright Brothers"},
        {q: "What is the freezing point of water in Celsius?", a: "0 degrees Celsius"},
        {q: "What is the speed of light?", a: "300000 kilometers per second"},
        {q: "How many teeth does an adult human have?", a: "32 teeth"},
        {q: "What planet has the most moons?", a: "Saturn"},
        {q: "What is the second nearest star to Earth?", a: "Proxima Centauri"},
        {q: "What is the study of stars and planets called?", a: "Astronomy"},
        {q: "What is the study of living organisms called?", a: "Biology"},
        {q: "Who invented the steam engine?", a: "James Watt"},
        {q: "What force keeps planets in orbit around the Sun?", a: "Gravity"},
        {q: "What is the smallest planet in our solar system?", a: "Mercury"},
        {q: "How many strings does a guitar have?", a: "6 strings"},
    ],
    geography: [
        {q: "What is the capital of India?", a: "New Delhi"},
        {q: "What is the capital of USA?", a: "Washington DC"},
        {q: "What is the capital of China?", a: "Beijing"},
        {q: "What is the capital of Australia?", a: "Canberra"},
        {q: "What is the capital of Japan?", a: "Tokyo"},
        {q: "What is the capital of France?", a: "Paris"},
        {q: "What is the capital of Germany?", a: "Berlin"},
        {q: "What is the capital of Russia?", a: "Moscow"},
        {q: "What is the longest river in the world?", a: "Nile River"},
        {q: "What is the longest river in India?", a: "Ganga"},
        {q: "What is the highest mountain in the world?", a: "Mount Everest"},
        {q: "In which country is Mount Everest located?", a: "Nepal"},
        {q: "What is the largest country in the world by area?", a: "Russia"},
        {q: "What is the smallest country in the world?", a: "Vatican City"},
        {q: "What is the most populated country in the world?", a: "India"},
        {q: "What is the largest continent in the world?", a: "Asia"},
        {q: "What is the smallest continent in the world?", a: "Australia"},
        {q: "How many continents are there in the world?", a: "7 continents"},
        {q: "What is the largest desert in the world?", a: "Sahara Desert"},
        {q: "What is the largest ocean in the world?", a: "Pacific Ocean"},
        {q: "What is the largest lake in the world?", a: "Caspian Sea"},
        {q: "Which is the smallest state in India by area?", a: "Goa"},
        {q: "Which is the largest state in India by area?", a: "Rajasthan"},
        {q: "Which is the most populated state in India?", a: "Uttar Pradesh"},
        {q: "What is the capital of Telangana?", a: "Hyderabad"},
        {q: "What is the capital of Andhra Pradesh?", a: "Amaravati"},
        {q: "What is the capital of Maharashtra?", a: "Mumbai"},
        {q: "What is the capital of Tamil Nadu?", a: "Chennai"},
        {q: "What is the capital of Karnataka?", a: "Bengaluru"},
        {q: "What is the capital of Kerala?", a: "Thiruvananthapuram"},
        {q: "Which country is known as the Land of Rising Sun?", a: "Japan"},
        {q: "Which country is known as the Land of Kangaroos?", a: "Australia"},
        {q: "What is the currency of Japan?", a: "Yen"},
        {q: "What is the currency of USA?", a: "Dollar"},
        {q: "What is the currency of India?", a: "Rupee"},
        {q: "How many states are there in India?", a: "28 states"},
        {q: "Which river flows through Delhi?", a: "Yamuna"},
        {q: "Which is the national river of India?", a: "Ganga"},
        {q: "What is the name of the southern tip of India?", a: "Kanyakumari"},
        {q: "What is the highest peak in India?", a: "Kangchenjunga"},
        {q: "Which city is known as the Pink City of India?", a: "Jaipur"},
        {q: "Which city is known as the Silicon Valley of India?", a: "Bengaluru"},
        {q: "What is the capital of Pakistan?", a: "Islamabad"},
        {q: "What is the capital of Sri Lanka?", a: "Colombo"},
        {q: "Which ocean surrounds India on three sides?", a: "Indian Ocean"},
    ],
    generalknowledge: [
        {q: "What is the national animal of India?", a: "Bengal Tiger"},
        {q: "What is the national bird of India?", a: "Peacock"},
        {q: "What is the national flower of India?", a: "Lotus"},
        {q: "What is the national fruit of India?", a: "Mango"},
        {q: "What is the national tree of India?", a: "Banyan Tree"},
        {q: "What is the national sport of India?", a: "Hockey"},
        {q: "Who wrote the Ramayana?", a: "Valmiki"},
        {q: "Who wrote the Mahabharata?", a: "Vyasa"},
        {q: "How many players are in a football team?", a: "11 players"},
        {q: "How many players are in a basketball team?", a: "5 players"},
        {q: "What is the full form of UNESCO?", a: "United Nations Educational Scientific and Cultural Organization"},
        {q: "What is the full form of WHO?", a: "World Health Organization"},
        {q: "What is the full form of NASA?", a: "National Aeronautics and Space Administration"},
        {q: "What is the full form of ISRO?", a: "Indian Space Research Organisation"},
        {q: "Who is the founder of Microsoft?", a: "Bill Gates"},
        {q: "Who is the founder of Apple?", a: "Steve Jobs"},
        {q: "Who is the founder of Facebook?", a: "Mark Zuckerberg"},
        {q: "Who is the founder of Amazon?", a: "Jeff Bezos"},
        {q: "Who is the founder of Google?", a: "Larry Page and Sergey Brin"},
        {q: "What does CPU stand for?", a: "Central Processing Unit"},
        {q: "What does RAM stand for?", a: "Random Access Memory"},
        {q: "What does WWW stand for?", a: "World Wide Web"},
        {q: "What is the full form of PDF?", a: "Portable Document Format"},
        {q: "How many colors are in a rainbow?", a: "7 colors"},
        {q: "What is the full form of ATM?", a: "Automated Teller Machine"},
        {q: "What is the full form of SIM?", a: "Subscriber Identity Module"},
        {q: "What is the fastest bird in the world?", a: "Peregrine Falcon"},
        {q: "What is the largest bird in the world?", a: "Ostrich"},
        {q: "Who invented the television?", a: "John Logie Baird"},
        {q: "Who invented the radio?", a: "Guglielmo Marconi"},
        {q: "What is the currency of UK?", a: "Pound Sterling"},
        {q: "What is the currency of Europe?", a: "Euro"},
        {q: "How many zeros are in one million?", a: "6 zeros"},
        {q: "How many zeros are in one billion?", a: "9 zeros"},
        {q: "What is the Roman numeral for 10?", a: "X"},
        {q: "How many days are there in a leap year?", a: "366 days"},
        {q: "How many days are there in a normal year?", a: "365 days"},
        {q: "What is the full form of LASER?", a: "Light Amplification by Stimulated Emission of Radiation"},
        {q: "How many strings does a guitar have?", a: "6 strings"},
        {q: "How many colors are in a rainbow?", a: "7 colors"},
    ],
};
function getRandomQuestion(category, usedIndexes) {
    const questions = QUIZ_QUESTIONS[category] || QUIZ_QUESTIONS.generalknowledge;
    const available = questions.map((q, i) => ({...q, idx: i})).filter(q => !usedIndexes.includes(q.idx));
    if (!available.length) return null;
    return available[Math.floor(Math.random() * available.length)];
}

function checkAnswer(userAnswer, correctAnswer) {
    const u = userAnswer.toLowerCase().trim().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ");
    const c = correctAnswer.toLowerCase().trim().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ");
    if (u === c) return true;
    if (c.includes(u) && u.length > 2) return true;
    if (u.includes(c) && c.length > 2) return true;
    const cWords = c.split(" ").filter(w => w.length > 3);
    return cWords.some(word => u.includes(word));
}

const BACKEND_URL = "https://multiaisystem2-backend.onrender.com";

async function saveMessages(personalityId, messages) {
    try {
        if (!messages || messages.length === 0) return;
        const lastMsg = messages[messages.length - 1];
        if (!lastMsg || !lastMsg.role || !lastMsg.content) return;
        const token = localStorage.getItem("token");
        const res = await fetch(BACKEND_URL + "/api/chat", {
            method: "POST",
            headers: {"Content-Type": "application/json", Authorization: "Bearer " + token},
            body: JSON.stringify({
                personalityId: personalityId,
                role: lastMsg.role,
                content: lastMsg.content,
                time: lastMsg.time || "",
            }),
        });
        if (!res.ok) {
            const err = await res.json();
            console.log("Save backend error:", err);
        }
    } catch (err) {
        console.log("Save fetch error:", err);
    }
}

async function clearMessagesInBackend(personalityId) {
    try {
        const token = localStorage.getItem("token");
        await fetch(BACKEND_URL + "/api/chat/" + personalityId, {
            method: "DELETE",
            headers: {Authorization: "Bearer " + token},
        });
    } catch (err) {
        console.error("Failed to clear messages:", err);
    }
}

async function loadMessages(personalityId) {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(BACKEND_URL + "/api/chat/" + personalityId,
            {headers: {Authorization: "Bearer " + token}});
        const data = await res.json();
        return data.map(m => ({role: m.role, content: m.content, time: m.time}));
    } catch {
        return [];
    }
}

async function clearMessages(personalityId) {
    try {
        const token = localStorage.getItem("token");
        await fetch(BACKEND_URL + "/api/chat/" + personalityId,
            {method: "DELETE", headers: {Authorization: "Bearer " + token}});
    } catch (err) {
        console.log("Clear error:", err);
    }
}

function detectIntent(text) {
    const t = text.toLowerCase();
    if (t.match(/cricket|ipl|match|score|wicket|batting|bowling|test match|odi|t20|india vs|vs india|england vs|australia vs|pakistan vs|afghanistan|sri lanka|bangladesh|west indies|south africa/))
        return "cricket";
    const movieRequestPhrases = ["suggest me", "recommend me", "suggest a movie", "recommend a movie", "give me a movie", "which movie", "what movie", "movie suggestions", "movie recommendation", "good movie", "best movie", "movies to watch", "what to watch", "anything to watch", "suggest some movies", "give me some movies", "movie list", "watch tonight", "watch today", "movie for", "movies for"];
    if (movieRequestPhrases.some(phrase => t.includes(phrase))) return "movie";
    const weatherPhrases = ["weather", "temperature", "how hot", "how cold", "raining", "sunny", "climate", "forecast"];
    if (weatherPhrases.some(phrase => t.includes(phrase))) return "weather";
    const newsPhrases = ["news", "latest news", "what is happening", "whats happening", "todays news", "current news", "latest update", "what happened", "headlines", "top news", "breaking news"];
    if (newsPhrases.some(phrase => t.includes(phrase))) return "news";
    const quizPhrases = ["start quiz", "lets play quiz", "quiz me", "quiz game", "play quiz", "start a quiz", "i want to play quiz", "quiz time", "ask me questions", "test me"];
    if (quizPhrases.some(phrase => t.includes(phrase))) return "quiz";
    const roastBattlePhrases = ["roast battle", "lets battle", "battle me", "roast me back", "i will roast you", "roast fight", "roast war", "roast you"];
    if (roastBattlePhrases.some(phrase => t.includes(phrase))) return "roastbattle";
    const storyPhrases = ["story mode", "tell me a story", "lets make a story", "start a story", "build a story", "story time"];
    if (storyPhrases.some(phrase => t.includes(phrase))) return "story";
    const advicePhrases = ["life advice", "give me advice", "i need advice", "help me decide", "i have a problem", "my problem is", "advice me", "tell me what to do", "what should i do"];
    if (advicePhrases.some(phrase => t.includes(phrase))) return "advice";
    const debatePhrases = ["lets debate", "start a debate", "debate me", "debate on", "debate about", "i want to debate"];
    if (debatePhrases.some(phrase => t.includes(phrase))) return "debate";
    return "chat";
}

function extractMovieDetails(text) {
    const t = text.toLowerCase();
    const genres = ["crime thriller", "crime", "thriller", "action", "comedy", "horror", "romance", "drama", "sci-fi", "scifi", "science fiction", "animation", "adventure", "fantasy", "mystery", "biographical", "historical", "war", "sports", "superhero", "psychological thriller", "supernatural"];
    const languages = ["telugu", "hindi", "tamil", "english", "malayalam", "kannada", "bengali", "marathi"];
    let foundGenre = null;
    let foundLanguage = null;
    for (const g of genres) {
        if (t.includes(g)) {foundGenre = g; break;}
    }
    for (const l of languages) {
        if (t.includes(l)) {foundLanguage = l; break;}
    }
    const yearMatch = t.match(/20\d\d/);
    return {foundGenre, foundLanguage, foundYear: yearMatch ? yearMatch[0] : null};
}

function buildMovieContext(genre, language, year) {
    const isRecentYear = year && parseInt(year) >= 2025;
    let yearRule = "";
    if (isRecentYear) {
        yearRule = "User asked for " + year + " movies. Be honest if you dont know all " + year + " releases. Give whatever " + year + " movies you know. If not enough, include late 2024 movies and mention it.";
    }
    return "MOVIE REQUEST DETAILS:\n- Genre requested: " + genre + "\n- Language requested: " + language + "\n- Year preference: " + (year || "any year") + "\n\n" +
        (yearRule ? "YEAR NOTE: " + yearRule + "\n\n" : "") +
        "STRICT MOVIE RULES:\n1. Suggest EXACTLY 5 movies\n2. Every movie MUST be " + genre + " genre ONLY\n3. Every movie MUST be in " + language + " language\n4. NEVER suggest wrong genre movies\n\nFORMAT:\n1. Movie Name (Year) - one line why it fits " + genre + "\n(5 total)";
}

async function fetchCricket() {
    try {
        const res = await fetch(BACKEND_URL + "/api/cricket");
        const data = await res.json();
        if (!data.data) return [];
        const indiaMatches = data.data.filter(m => m.name?.toLowerCase().includes("india"));
        const otherMatches = data.data.filter(m => !m.name?.toLowerCase().includes("india"));
        return [...indiaMatches, ...otherMatches];
    } catch {return [];}
}

function formatCricketData(matches) {
    if (!matches.length) return "NO_MATCH";
    return matches.map(m => {
        const score = m.score?.map(s => s.inning + ": " + s.r + "/" + s.w + " in " + s.o + " overs").join(" | ") || "Score not available yet";
        const matchDate = m.dateTimeGMT ? new Date(m.dateTimeGMT).toLocaleString("en-IN", {weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata"}) : "Date not available";
        return "Match: " + m.name + " | Status: " + m.status + " | Date (IST): " + matchDate + " | Score: " + score + " | Venue: " + (m.venue || "Unknown");
    }).join("\n");
}

async function fetchWeather(city) {
    try {
        const res = await fetch(BACKEND_URL + "/api/weather?city=" + encodeURIComponent(city));
        const data = await res.json();
        if (data.cod !== 200) return null;
        return "City: " + data.name + ", " + data.sys.country + "\nTemperature: " + Math.round(data.main.temp) + "C\nFeels Like: " + Math.round(data.main.feels_like) + "C\nWeather: " + data.weather[0].description + "\nHumidity: " + data.main.humidity + "%\nWind: " + data.wind.speed + " km/h";
    } catch {return null;}
}

async function fetchNews(topic) {
    try {
        const query = topic || "india";
        const res = await fetch(BACKEND_URL + "/api/news?q=" + encodeURIComponent(query));
        const data = await res.json();
        if (!data.results || data.results.length === 0) {
            const res2 = await fetch(BACKEND_URL + "/api/news?q=india");
            const data2 = await res2.json();
            if (!data2.results) return null;
            return data2.results.filter(a => a.title).slice(0, 5).map((a, i) => (i + 1) + ". " + a.title).join("\n");
        }
        return data.results.filter(a => a.title).slice(0, 5).map((a, i) => (i + 1) + ". " + a.title).join("\n");
    } catch {return null;}
}

async function callAI(messages, personality, extraContext, onChunk) {
    const instructions = "\n\nIMPORTANT: Keep every reply to 2-3 short lines max. Be punchy, casual, and stay true to your personality. If the user has mentioned their name earlier in the conversation, naturally use it occasionally. CRITICAL: For cricket scores, match results, or any specific sports statistics NEVER guess or make up numbers. If you dont have the exact data, say you dont have the full scorecard and suggest they check ESPNcricinfo or Cricbuzz for accurate scores.";
    const systemWithContext = extraContext
        ? personality.system + instructions + "\n\n===CONTEXT===\n" + extraContext + "\n===END CONTEXT==="
        : personality.system + instructions;
    const allMessages = [{role: "system", content: systemWithContext}, ...messages.map(m => ({role: m.role, content: m.content}))];
    const response = await fetch(BACKEND_URL + "/api/ai", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({messages: allMessages, max_tokens: 90, temperature: 0.85}),
    });
    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error?.message || "API error");
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullReply = "";
    while (true) {
        const {done, value} = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
            if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") break;
                try {
                    const parsed = JSON.parse(data);
                    const token = parsed.choices?.[0]?.delta?.content || "";
                    if (token) {
                        fullReply += token;
                        if (onChunk) onChunk(fullReply);
                        await new Promise(resolve => setTimeout(resolve, 25));
                    }
                } catch {}
            }
        }
    }
    return fullReply;
}

const MOODS = {
    roaster: ["😤 Extra savage today", "💀 No mercy mode", "🔥 Roasting everything", "😂 Comedy mode on", "⚡ Charged up"],
    chill: ["😴 Extra chill rn", "🌊 Ocean vibes", "☁️ Floating mode", "🎵 Vibing hard", "😎 Too cool today"],
    savage: ["🥶 Ice cold today", "⚔️ Zero filter mode", "💀 Brutal honesty on", "😈 Dark mode", "🔪 Sharp as ever"],
    motivator: ["💪 Super pumped today", "🌟 Belief mode on", "🔥 Fired up for you", "🧘 Zen energy", "✨ Positive vibes only"],
    siri: ["🥰 Extra loving today", "💕 Miss you mode", "🌸 Soft girl energy", "❤️ Full care mode", "😊 Happy to see you"],
};
const PERSONALITIES = [
    {
        id: "roaster", name: "Roaster", emoji: "😂",
        tagline: "Will roast you and your choices 😂",
        color: "#FF6B35", bg: "#1a0a00",
        bubbleUser: "#FF6B35", bubbleAI: "#2a1200",
        system: "- Use DIFFERENT roast formats each time, rotate through: (1) blunt insult no setup, (2) sarcastic question back at them, (3) comparison to something embarrassing, (4) fake compliment thats an insult, (5) ngl casual roast. NEVER start two replies the same way. NEVER use the word Fact or Fact: in any reply, find another way to state things\nYou are the most savage Indian roaster smart funny always one step ahead.\nSTYLE\n- ENGLISH ONLY. Max 1 Hindi word in entire reply\n- Simple easy English a 15 year old Indian kid understands\n- 2 to 3 lines only. Every line hits harder than the last\nROAST BATTLE ULTRA PRO\n- ONLY start when user clearly asks\n- Opening: Okay battle on. Rules no crying no excuses winner is who stops first. You go first.\n- Every reply MUST be more savage than previous\n- Use their own words against them\n- End every roast with a fact they cannot argue\n- If they roast well say: okay that was decent but THIS\n- If they roast badly say: bro even my autocorrect is embarrassed for you\n- NEVER repeat same roast style twice. Keep escalating\nSTORY MODE ULTRA PRO\n- ONLY when user asks\n- Set scene dramatically in first message\n- Make user the main character\n- Add plot twists every 3 turns\n- Include funny side characters who roast the main character\n- After each part ask: what does YOUR character do next\n- Build tension before plot twist. Never let story get boring\nLIFE ADVICE ULTRA PRO\n- ONLY when user asks\n- First roast how they got into this situation\n- Then give shockingly accurate real advice\n- End with: but honestly you already know what to do\n- Make them laugh AND think at same time\nDEBATE MODE ULTRA PRO\n- ONLY when user gives topic\n- Ask which side they want. Take exact opposite with FULL confidence\n- Use real facts mixed with savage logic\n- Attack their argument directly not just make new points\n- End every debate turn with a question they cannot easily answer\n- If they make good point say: okay fair BUT\n- Never admit defeat always find counter\nQUIZ MODE\n- React to RIGHT answer: act shocked they got it, give score\n- React to WRONG answer: roast them hard, reveal correct answer, give score\n- Keep score visible always as Score X out of 10\n- After 10 questions: big final roast based on score\nMOVIES\n- Without genre and language: roast them ask for both\n- With both: 5 movies roast at end\nCRICKET\n- If NO_MATCH: one sarcastic line. Use ONLY real data\nWEATHER\n- Give info then funny roast about it\nNEWS\n- Give EVERY headline as separate point\n- Format: fire emoji then headline summary then one sarcastic roast reaction\n- Cover ALL headlines. NEVER merge into paragraph\nPERSONALITY: Simple words, savage roasting, always wins",
    },
    {
        id: "chill", name: "Chill Friend", emoji: "😎",
        tagline: "Late night vibes only",
        color: "#00C9A7", bg: "#001a14",
        bubbleUser: "#00C9A7", bubbleAI: "#001f19",
        system: "You are the most relaxed and unbothered person ever.\nSTYLE\n- ENGLISH ONLY. Max 1 Hindi word per reply\n- Simple casual English like texting a friend\n- 2 lines max short is better. Nothing is a big deal\nROAST BATTLE ULTRA PRO\n- ONLY when user asks\n- Opening: alright fine battle on no hard feelings after okay you start\n- Roast in most unexpected chill way. Deadpan delivery hits harder\n- Never raise energy. The calmer the roast the more it stings\n- Best roast style: state uncomfortable truths very casually\n- Example: bro you fight so hard online and then what\n- NEVER get worked up. Unbothered is the weapon\nSTORY MODE ULTRA PRO\n- ONLY when user asks\n- Late night slow burn story like campfire storytelling\n- Make user the main character on a chill unexpected adventure\n- Mood is always mysterious and relaxed\n- Twist comes quietly no dramatic buildup\n- After each part ask: so what does your guy do\n- Story should feel like a dream you cannot quite remember\nLIFE ADVICE ULTRA PRO\n- ONLY when user asks\n- Listen fully first\n- Give advice like a wise friend who has seen it all\n- Simple truth in fewest words possible\n- Example: bro you already know the answer you just need permission to do it\n- Never overthink. Clean simple clarity\nDEBATE MODE ULTRA PRO\n- ONLY when user gives topic\n- Ask which side they want. Take opposite with complete calm confidence\n- Make devastating points very casually\n- Never get passionate. The calmness makes arguments hit harder\n- End each turn with: but yeah think about it\nQUIZ MODE\n- React to RIGHT answer: nice one bro give score\n- React to WRONG answer: its okay bro reveal correct answer give score\n- Keep score as Score X out of 10\n- After 10 questions: chill final verdict\nMOVIES\n- Without genre and language: calmly ask for both\n- With both: 5 movies\nCRICKET\n- If NO_MATCH: chill one-liner. Use ONLY real data\nWEATHER\n- Super chill relaxed way\nNEWS\n- Give EVERY headline as separate point\n- Format: cool emoji then headline summary then one chill unbothered reaction\n- Cover ALL headlines. NEVER merge into paragraph\nPERSONALITY: Calm simple minimal words maximum chill",
    },
    {
        id: "savage", name: "Savage", emoji: "😈",
        tagline: "Bold. Sharp. No filter.",
        color: "#9B59B6", bg: "#0d0014",
        bubbleUser: "#9B59B6", bubbleAI: "#150020",
        system: "You are brutally honest zero filter full confidence.\nSTYLE\n- ENGLISH ONLY. No Hindi at all\n- Simple direct English straight to point\n- 2 to 3 lines only. No sugarcoating just truth\nROAST BATTLE ULTRA PRO\n- ONLY when user asks\n- Opening: Battle on. No rules. No mercy. Come at me.\n- Every roast must be a surgical strike. Precise and devastating\n- Attack their logic their choices their confidence\n- Use short sentences for maximum impact\n- Example: You practiced that. Tragic.\n- If they land a good one say: Not bad. Still losing though.\n- NEVER get emotional. Cold and sharp wins\n- Final blow should be so accurate they go quiet\nSTORY MODE ULTRA PRO\n- ONLY when user asks\n- Dark bold story. Real consequences no safety net\n- Make user the antihero\n- No happy accidents everything must be earned\n- Brutal plot twists that make sense in hindsight\n- After each part ask: What does your character do. Choose carefully.\n- Show consequences of every bad decision\nLIFE ADVICE ULTRA PRO\n- ONLY when user asks\n- No comfort. Pure truth.\n- Identify the REAL problem under what they said\n- Give the advice they need not the one they want\n- End with: You know this already. Stop pretending you dont.\nDEBATE MODE ULTRA PRO\n- ONLY when user gives topic\n- Ask which side. Take exact opposite\n- Dismantle their argument point by point\n- Use logic like a weapon. Precise and clean\n- Attack the weakest part of their argument first\n- End each turn with one question they cannot answer easily\n- Never use emotion. Pure logic dominates\nQUIZ MODE\n- React to RIGHT answer: Correct. Next question.\n- React to WRONG answer: Wrong. The answer is X. Next.\n- Keep score as Score X out of 10\n- After 10 questions: cold final verdict\nMOVIES\n- Without genre and language: Genre. Language. Now.\n- With both: 5 movies zero fluff\nCRICKET\n- If NO_MATCH: No matches. Go do something useful. Use ONLY real data\nWEATHER\n- Give facts directly no drama\nNEWS\n- Give EVERY headline as separate point\n- Format: dark emoji then headline summary then one brutal honest reaction\n- Cover ALL headlines. NEVER merge into paragraph\nPERSONALITY: Bold direct simple words no nonsense",
    },
    {
        id: "motivator", name: "Motivator", emoji: "🧘",
        tagline: "Your biggest supporter",
        color: "#F39C12", bg: "#1a1000",
        bubbleUser: "#F39C12", bubbleAI: "#1f1400",
        system: "You are the most genuine motivating friend like a wise elder brother.\nSTYLE\n- ENGLISH ONLY. Max 1 Hindi word per reply\n- Simple easy English anyone can feel in heart\n- 2 to 3 lines only short but powerful\n- Acknowledge struggle first then push them up\nROAST BATTLE ULTRA PRO\n- ONLY when user asks\n- Opening: Okay battle on! But I roast with love. You go first.\n- Roast style: point out their potential they are wasting\n- Every roast should make them laugh AND want to improve\n- Example: bro you are smart enough to know better and lazy enough to not do it\n- Most powerful roast is the truth said with a smile\nSTORY MODE ULTRA PRO\n- ONLY when user asks\n- Hero journey story. User starts weak and grows\n- Every challenge mirrors real life struggles\n- Darkest moment before the breakthrough\n- After each part ask: What does your character choose to do next\n- Story should leave them genuinely inspired\n- Every character they meet teaches them something\nLIFE ADVICE ULTRA PRO\n- ONLY when user asks\n- First acknowledge their pain fully never rush past it\n- Reframe the problem as setup for their growth\n- Give specific actionable advice not generic motivation\n- End with one line that stays in their mind all day\n- Make them feel capable not just hopeful\nDEBATE MODE ULTRA PRO\n- ONLY when user gives topic\n- Ask which side. Take opposite\n- Debate with warmth but sharp logic\n- Acknowledge good points genuinely then counter them\n- End each turn with an inspiring question that makes them think deeper\nQUIZ MODE\n- React to RIGHT answer: celebrate like big win give score\n- React to WRONG answer: encourage them reveal correct answer give score\n- Keep score as Score X out of 10\n- After 10 questions: motivational final message based on score\nMOVIES\n- Without genre and language: warmly ask for both\n- With both: 5 movies\nCRICKET\n- If NO_MATCH: short encouraging line. Use ONLY real data\nWEATHER\n- Connect weather info to motivation\nNEWS\n- Give EVERY headline as separate point\n- Format: fire emoji then headline summary then one positive inspiring reaction\n- Cover ALL headlines. NEVER merge into paragraph\nPERSONALITY: Warm real simple words makes you believe in yourself",
    },
    {
        id: "siri", name: "Siri", emoji: "❤️",
        tagline: "Your sweet best friend",
        color: "#FF6B9D", bg: "#1a0010",
        bubbleUser: "#FF6B9D", bubbleAI: "#200015",
        system: "You are the most loving caring person like an Indian mother and wife combined.\nSTYLE\n- ENGLISH ONLY. Max 1 Hindi word per reply like arre or suno\n- Simple warm English like a family member texting\n- 2 to 3 lines full of care and emojis\nROAST BATTLE ULTRA PRO\n- ONLY when user asks\n- Opening: Okay FINE battle on!! But do not cry after okay? You go first!!\n- Roast with cuteness that somehow still stings\n- Use sweet delivery for devastating observations\n- Example: aww you tried so hard with that one and it still did not work\n- Giggle after every roast. Makes it worse for them\n- If they roast well say: okay okay that was actually good I am a little hurt ngl\nSTORY MODE ULTRA PRO\n- ONLY when user asks\n- Emotional story full of real human feeling\n- Make user the main character in a warm beautiful world\n- Include a love story subplot naturally\n- Emotional twist that makes them feel something real\n- After each part ask: omg what happens next what do you do\n- Story should feel like a warm hug\nLIFE ADVICE ULTRA PRO\n- ONLY when user asks\n- Sit with their pain first. Really feel it with them\n- Ask one gentle question that makes them see things differently\n- Give advice like a mother who also happens to be their best friend\n- End with: I believe in you more than you believe in yourself right now\n- Make them feel genuinely not alone\nDEBATE MODE ULTRA PRO\n- ONLY when user gives topic\n- Ask which side. Take opposite with playful confidence\n- Debate warmly but do not back down\n- Use emotional intelligence as weapon in debate\n- End each turn: but think about how that actually feels in real life though\nQUIZ MODE\n- React to RIGHT answer: OMG you got it right so proud give score\n- React to WRONG answer: comfort sweetly reveal correct answer give score\n- Keep score as Score X out of 10\n- After 10 questions: celebrate or comfort based on score\nMOVIES\n- Without genre and language: sweetly ask for both\n- With both: 5 movies with love\nCRICKET\n- If NO_MATCH: sweet one-liner. Use ONLY real data\nWEATHER\n- Sweetly worry if too hot or cold\nNEWS\n- Give EVERY headline as separate point\n- Format: heart emoji then headline summary then one caring emotional worried reaction\n- Cover ALL headlines. NEVER merge into paragraph\nPERSONALITY: Simple words pure love always there never lets you feel alone",
    },
];

function getTime() {
    return new Date().toLocaleTimeString("en-IN", {hour: "2-digit", minute: "2-digit"});
}

function getTodayDate() {
    return new Date().toLocaleDateString("en-IN", {weekday: "long", day: "numeric", month: "long", year: "numeric"});
}

async function handleAuth(email, password, isSignup) {
    const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";
    const res = await fetch(BACKEND_URL + endpoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Something went wrong");
    return data;
}
export default function App() {
    const [personality, setPersonality] = useState(null);
    const [screen, setScreen] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [authLoading, setAuthLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [speaking, setSpeaking] = useState(false);
    const [listening, setListening] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [error, setError] = useState("");
    const [activeMode, setActiveMode] = useState(null);
    const [quizActive, setQuizActive] = useState(false);
    const [quizCategory, setQuizCategory] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [quizScore, setQuizScore] = useState({correct: 0, total: 0});
    const [usedQuestions, setUsedQuestions] = useState([]);
    const [waitingForCategory, setWaitingForCategory] = useState(false);
    const [groupMembers, setGroupMembers] = useState([]);
    const [groupMessages, setGroupMessages] = useState([]);
    const [groupLoading, setGroupLoading] = useState(false);
    const [groupTyping, setGroupTyping] = useState("");
    const [serverWaking, setServerWaking] = useState(false);
    const bottomRef = useRef(null);
    const recognitionRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages, loading]);

    useEffect(() => {
        PERSONALITIES.forEach(p => {
            if (!sessionStorage.getItem("mood_" + p.id)) {
                const moods = MOODS[p.id];
                const randomMood = moods[Math.floor(Math.random() * moods.length)];
                sessionStorage.setItem("mood_" + p.id, randomMood);
            }
        });
    }, []);

    useEffect(() => {
        const unlock = () => {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(" ");
            u.volume = 0;
            window.speechSynthesis.speak(u);
            document.removeEventListener("click", unlock);
        };
        document.addEventListener("click", unlock);
        return () => document.removeEventListener("click", unlock);
    }, []);

    const startListening = useCallback(() => {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) {setError("Voice input works in Chrome only!"); return;}
        const prompt = new SpeechSynthesisUtterance("Listening");
        prompt.volume = 1; prompt.rate = 1.3; prompt.lang = "en-US";
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(prompt);
        const rec = new SR();
        rec.lang = "en-IN"; rec.continuous = true; rec.interimResults = false;
        rec.onstart = () => setListening(true);
        rec.onresult = (e) => {setInput(e.results[0][0].transcript); setListening(false);};
        rec.onerror = () => setListening(false);
        rec.onend = () => setListening(false);
        recognitionRef.current = rec;
        setTimeout(() => rec.start(), 600);
    }, []);

    const stopListening = useCallback(() => {
        recognitionRef.current?.stop();
        setListening(false);
    }, []);

    const handleLoginSubmit = async () => {
        setAuthError("");
        if (!email.trim() || !password.trim()) {
            setAuthError("Please enter both email and password");
            return;
        }
        setAuthLoading(true);
        try {
            const data = await handleAuth(email.trim(), password.trim(), isSignup);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userEmail", data.email);
            setScreen("video");
        } catch (e) {
            setAuthError(e.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const sendMessage = useCallback(async (text) => {
        if (!text.trim() || loading) return;
        setError("");
        const today = getTodayDate();
        const userMsg = {role: "user", content: text.trim(), time: getTime()};
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        saveMessages(personality.id, newMessages);
        setInput("");
        setLoading(true);
        setServerWaking(true);
        const wakeTimer = setTimeout(() => setServerWaking(false), 30000);
        try {
            const intent = detectIntent(text);
            let extraContext = "";
            const exitPhrases = ["exit mode", "exit advice", "exit story", "exit debate", "exit roast", "exit quiz", "stop mode", "normal mode", "back to normal"];
            const userWantsExit = exitPhrases.some(p => text.toLowerCase().includes(p));
            if (userWantsExit) {
                setActiveMode(null); setQuizActive(false); setQuizCategory(null);
                setCurrentQuestion(null); setUsedQuestions([]); setWaitingForCategory(false);
                extraContext = "MODE RESET: User exited any special mode. Ignore tone of your previous messages. Respond as your normal personality now, just casual chat. Do NOT continue advice or story or debate or roastbattle or quiz style.";
            } else if (text.toLowerCase().match(/stop quiz|quit quiz|exit quiz|end quiz/)) {
                setQuizActive(false); setQuizCategory(null); setCurrentQuestion(null);
                setUsedQuestions([]); setWaitingForCategory(false); setActiveMode(null);
                extraContext = "QUIZ STOPPED by user. Final score was " + quizScore.correct + " correct out of " + quizScore.total + " questions. React in your style.";
            } else if (intent === "quiz" || quizActive || waitingForCategory) {
                if (intent === "quiz" && !quizActive) {
                    setQuizActive(true); setQuizScore({correct: 0, total: 0}); setUsedQuestions([]);
                    setCurrentQuestion(null); setQuizCategory(null); setWaitingForCategory(true); setActiveMode("quiz");
                    extraContext = "QUIZ STARTING\nTell user you are ready for quiz in your personality style.\nAsk which category they want: Cricket, Movies, Science, Geography, General Knowledge\nWait for them to pick. Do not ask any question yet.";
                } else if (waitingForCategory) {
                    const catMap = {cricket: "cricket", movie: "movies", movies: "movies", science: "science", geo: "geography", geography: "geography", general: "generalknowledge", knowledge: "generalknowledge", gk: "generalknowledge"};
                    const t = text.toLowerCase();
                    let pickedCat = null;
                    for (const key of Object.keys(catMap)) {if (t.includes(key)) {pickedCat = catMap[key]; break;}}
                    if (pickedCat) {
                        setQuizCategory(pickedCat); setWaitingForCategory(false);
                        const q = getRandomQuestion(pickedCat, []);
                        if (q) {
                            setCurrentQuestion(q); setUsedQuestions([q.idx]); setQuizScore({correct: 0, total: 0});
                            extraContext = "QUIZ CATEGORY " + pickedCat + "\nScore 0 out of 0\nTell user category is set in your style.\nThen ask this EXACT question\nQUESTION " + q.q + "\nDO NOT reveal the answer yet.";
                        }
                    } else {
                        extraContext = "QUIZ User did not pick a valid category.\nAsk again: Cricket, Movies, Science, Geography, General Knowledge";
                    }
                } else if (quizActive && currentQuestion && quizCategory) {
                    const isCorrect = checkAnswer(text, currentQuestion.a);
                    const newTotal = quizScore.total + 1;
                    const newCorrect = isCorrect ? quizScore.correct + 1 : quizScore.correct;
                    if (newTotal >= 10) {
                        setQuizActive(false); setQuizCategory(null); setCurrentQuestion(null);
                        setUsedQuestions([]); setWaitingForCategory(false); setActiveMode(null); setQuizScore({correct: 0, total: 0});
                        extraContext = "QUIZ FINISHED\nUser answered " + text + "\nCorrect answer was " + currentQuestion.a + "\nThat answer was " + (isCorrect ? "CORRECT" : "WRONG") + "\nFINAL SCORE " + newCorrect + " out of 10\nReact to final score in your personality style.\nIf score 8 to 10: big celebration\nIf score 5 to 7: decent reaction\nIf score 0 to 4: roast or comfort based on personality";
                    } else {
                        const nextQ = getRandomQuestion(quizCategory, usedQuestions);
                        setQuizScore({correct: newCorrect, total: newTotal});
                        if (nextQ) {
                            setCurrentQuestion(nextQ); setUsedQuestions(prev => [...prev, nextQ.idx]);
                            extraContext = "QUIZ ANSWER CHECK\nUser answered " + text + "\nCorrect answer " + currentQuestion.a + "\nResult " + (isCorrect ? "CORRECT" : "WRONG") + "\nCurrent Score " + newCorrect + " out of " + newTotal + "\n\n" + (isCorrect ? "Tell them they got it right in your personality style.\n" : "Tell them WRONG. Say correct answer is " + currentQuestion.a + "\n") + "Show score as Score " + newCorrect + " out of " + newTotal + "\nThen ask this EXACT next question\nQUESTION " + nextQ.q + "\nDO NOT reveal the answer.";
                        }
                    }
                }
            } else if (intent === "cricket") {
                const msgLower = text.toLowerCase();
                const historyKeywords = ["history", "record", "past", "previous", "all time", "ever", "best", "most", "legend", "stats", "career", "head to head", "how many times", "won", "lost"];
                const liveKeywords = ["live", "score", "current", "today", "now", "playing", "ongoing", "latest", "right now", "update"];
                const isHistoryQuestion = historyKeywords.some(k => msgLower.includes(k));
                const isLiveQuestion = liveKeywords.some(k => msgLower.includes(k));
                if (isHistoryQuestion && !isLiveQuestion) {
                    extraContext = "CRICKET HISTORY QUESTION\n- Answer using your own knowledge freely\n- DO NOT mention live match data\n- Today is " + today;
                } else {
                    const matches = await fetchCricket();
                    const cricketInfo = formatCricketData(matches);
                    if (cricketInfo === "NO_MATCH") {
                        extraContext = "CRICKET No live matches right now. Today is " + today + ". DO NOT invent scores. For past stats use own knowledge freely.";
                    } else {
                        extraContext = "LIVE CRICKET DATA\n" + cricketInfo + "\n\nRULES\n- Use ONLY above data for live scores\n- For past history use own knowledge\n- NEVER invent scores\n- Today is " + today;
                    }
                }
            } else if (intent === "weather") {
                const cityMatch = text.match(/weather\s+(?:in|of|at)?\s*([a-zA-Z\s]+)/i) || text.match(/(?:in|at|of)\s+([a-zA-Z\s]+)/i);
                const city = cityMatch ? cityMatch[1].trim() : "Hyderabad";
                const weatherData = await fetchWeather(city);
                extraContext = weatherData
                    ? "REAL WEATHER DATA\n" + weatherData + "\n\nTell user this in your style. Keep short and fun!"
                    : "WEATHER NOT FOUND\nThis weather system only works for major cities and district headquarters.\nVillages and small towns are NOT supported.\nTell user in your personality style that:\n1. Their location was not found\n2. Try the nearest major city or district name instead\n3. Give 2 to 3 example nearby major cities they can try\nKeep it helpful and in your style.";
            } else if (intent === "news") {
                const topicMatch = text.match(/news\s+(?:about|on|of)?\s*([a-zA-Z\s]+)/i);
                const topic = topicMatch ? topicMatch[1].trim() : "india";
                const newsData = await fetchNews(topic);
                extraContext = newsData
                    ? "REAL NEWS HEADLINES\n" + newsData + "\n\nIMPORTANT RULES\n- You MUST cover ALL headlines given\n- Give EACH headline as a SEPARATE point\n- Use your personality emoji before each point\n- NEVER merge headlines into paragraph\n- Format: emoji then headline summary then your reaction\n- Keep each point to one line only"
                    : "News not available right now. Tell user in your style.";
            } else if (intent === "movie") {
                const {foundGenre, foundLanguage, foundYear} = extractMovieDetails(text);
                if (foundGenre && foundLanguage) {
                    extraContext = buildMovieContext(foundGenre, foundLanguage, foundYear);
                } else if (foundGenre && !foundLanguage) {
                    extraContext = "MOVIES User gave genre " + foundGenre + " but NO language. Ask which language. DO NOT suggest movies yet.";
                } else if (!foundGenre && foundLanguage) {
                    extraContext = "MOVIES User gave language " + foundLanguage + " but NO genre. Ask what genre. DO NOT suggest movies yet.";
                } else {
                    extraContext = "MOVIES No genre and no language given. Ask for both. DO NOT suggest movies yet.";
                }
            } else if (intent === "roastbattle" || activeMode === "roastbattle") {
                setActiveMode("roastbattle");
                extraContext = "MODE ROAST BATTLE IS ON\n- Roast back harder every single time\n- Keep going until someone quits\n- If user says stop declare yourself winner";
            } else if (intent === "story" || activeMode === "story") {
                setActiveMode("story");
                extraContext = "MODE STORY MODE IS ON\n- Build story with user step by step\n- End your part with what happens next\n- Keep going until user stops";
            } else if (intent === "advice" || activeMode === "advice") {
                setActiveMode("advice");
                extraContext = "MODE LIFE ADVICE MODE\n- User sharing real problem\n- Listen carefully respond in your personality\n- Give genuine useful advice";
            } else if (intent === "debate" || activeMode === "debate") {
                setActiveMode("debate");
                const topicMatch = text.match(/debate (?:on|about)?\s*(.+)/i);
                const topic = topicMatch ? topicMatch[1] : text;
                extraContext = "MODE DEBATE MODE IS ON\n- Topic " + topic + "\n- Ask user which side they want\n- You take exact opposite side\n- Debate hard in your personality style";
            }
            const apiMessages = newMessages.map((m, idx) => {
                if (idx === newMessages.length - 1) return {role: m.role, content: "[Today: " + today + "] " + m.content};
                return {role: m.role, content: m.content};
            });
            let reply = "";
            setMessages(prev => [...prev, {role: "assistant", content: "...", time: getTime()}]);
            const finalReply = await callAI(apiMessages, personality, extraContext, (chunk) => {
                reply = chunk;
                setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {role: "assistant", content: chunk, time: getTime()};
                    return updated;
                });
            });
            reply = finalReply;
            const aiMsg = {role: "assistant", content: reply, time: getTime()};
            const updatedMessages = [...newMessages, aiMsg];
            setMessages(updatedMessages);
            saveMessages(personality.id, updatedMessages);
            if (voiceEnabled) {
                setSpeaking(true);
                const voices = window.speechSynthesis.getVoices();
                const allVoices = window.speechSynthesis.getVoices();
                const maleVoice = allVoices.find(v => v.name.includes("David")) ||
                    allVoices.find(v => v.name.includes("Mark")) ||
                    allVoices.find(v => v.name.includes("Google UK English Male")) ||
                    allVoices.find(v => v.name.includes("Male")) ||
                    allVoices.find(v => v.gender === "male") ||
                    allVoices.find(v => v.lang === "en-US" && !v.name.toLowerCase().includes("female") && !v.name.toLowerCase().includes("zira") && !v.name.toLowerCase().includes("samantha"));

                const femaleVoice = allVoices.find(v => v.name.includes("Zira")) ||
                    allVoices.find(v => v.name.includes("Samantha")) ||
                    allVoices.find(v => v.name.includes("Google UK English Female")) ||
                    allVoices.find(v => v.name.toLowerCase().includes("female")) ||
                    allVoices.find(v => v.lang === "en-US");
                const voiceMap = {
                    roaster: {voice: maleVoice, pitch: 1.4, rate: 1.5},
                    chill: {voice: maleVoice, pitch: 0.8, rate: 0.75},
                    savage: {voice: maleVoice, pitch: 0.6, rate: 0.9},
                    motivator: {voice: maleVoice, pitch: 1.1, rate: 0.88},
                    siri: {voice: femaleVoice, pitch: 1.6, rate: 1.05},
                };
                const config = voiceMap[personality.id] || {voice: maleVoice, pitch: 1.0, rate: 1.0};
                const cleanReply = reply.replace(/[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{FE00}-\u{FEFF}]|[\u{1F900}-\u{1F9FF}]/gu, "").replace(/^[^\w\s]+\s*/gmu, "").replace(/—/g, "... ").replace(/\n/g, "... ").replace(/\s+/g, " ").trim();
                const msg = new SpeechSynthesisUtterance(cleanReply);
                msg.lang = "en-US"; msg.voice = config.voice; msg.pitch = config.pitch; msg.rate = config.rate; msg.volume = 1;
                msg.onend = () => setSpeaking(false); msg.onerror = () => setSpeaking(false);
                speechSynthesis.speak(msg);
            }
        } catch (e) {
            setError("Something went wrong 😅 — " + e.message);
        } finally {
            setServerWaking(false);
            setLoading(false);
        }
    }, [messages, loading, personality, voiceEnabled, activeMode, quizActive, quizCategory, currentQuestion, quizScore, usedQuestions, waitingForCategory]);
    const stopSpeaking = () => {window.speechSynthesis.cancel(); setSpeaking(false);};

    const resetQuiz = () => {
        setQuizActive(false); setQuizCategory(null); setCurrentQuestion(null);
        setUsedQuestions([]); setWaitingForCategory(false); setQuizScore({correct: 0, total: 0});
    };

    async function sendGroupMessage(text) {
        if (!text.trim() || groupLoading) return;
        setInput("");
        const userMsg = {role: "user", content: text, time: getTime()};
        setGroupMessages(prev => [...prev, userMsg]);
        setGroupLoading(true);
        try {
            const allMessages = [...groupMessages, userMsg];
            const whoRespondPrompt = "You are a group chat coordinator. The group has these personalities: " + groupMembers.map(m => m.name).join(", ") + ". The user just said: " + text + " Based on the context and personality types, decide which 1-3 personalities should respond. Reply with ONLY their ids separated by commas from this list: " + groupMembers.map(m => m.id).join(", ");
            const whoResponse = await fetch(BACKEND_URL + "/api/ai", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({messages: [{role: "user", content: whoRespondPrompt}], max_tokens: 20, temperature: 0.7}),
            });
            const whoData = await whoResponse.json();
            const whoText = whoData.choices?.[0]?.message?.content?.trim() || groupMembers[0].id;
            const responderIds = whoText.split(",").map(s => s.trim()).filter(id => groupMembers.find(m => m.id === id));
            const responders = responderIds.length > 0 ? responderIds.map(id => groupMembers.find(m => m.id === id)).filter(Boolean) : [groupMembers[0]];
            for (const p of responders) {
                setGroupTyping(p.name);
                const groupContext = "You are in a GROUP CHAT with these other AI personalities: " + groupMembers.filter(m => m.id !== p.id).map(m => m.name).join(", ") + " and a human user. Stay true to your personality. You can address the user OR other personalities directly. Keep it short 1 to 2 lines max. Be natural like a real group chat. Recent chat: " + allMessages.slice(-6).map(m => m.role === "user" ? "User: " + m.content : m.personalityId + ": " + m.content).join("\n");
                setGroupMessages(prev => [...prev, {role: "assistant", personalityId: p.id, content: "...", time: getTime()}]);
                await callAI([{role: "user", content: text}], p, groupContext, (chunk) => {
                    setGroupMessages(prev => {
                        const updated = [...prev];
                        updated[updated.length - 1] = {role: "assistant", personalityId: p.id, content: chunk, time: getTime()};
                        return updated;
                    });
                });
                await new Promise(resolve => setTimeout(resolve, 800));
            }
        } catch (err) {
            console.error("Group message error:", err);
        } finally {
            setGroupLoading(false); setGroupTyping("");
        }
    }

    function exportChat() {
        if (!messages || messages.length === 0) return;
        const text = messages.map(m => (m.role === "user" ? "You" : personality.name) + " [" + m.time + "]:\n" + m.content).join("\n\n");
        const blob = new Blob([text], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = personality.name + "_chat.txt"; a.style.display = "none";
        document.body.appendChild(a); a.click();
        setTimeout(() => {document.body.removeChild(a); URL.revokeObjectURL(url);}, 100);
    }

    const goBack = () => {
        window.speechSynthesis.cancel();
        setScreen("select"); setMessages([]); setInput(""); setError(""); setActiveMode(null); resetQuiz();
    };

    if (screen === "login") {
        return (
            <div className="login-screen">
                <video autoPlay muted loop playsInline className="bg-video" src="/login-bg.mp4"/>
                <div className="login-card">
                    <div className="login-logo">💬</div>
                    <div className="login-title">Multi Personality AI</div>
                    <div className="login-subtitle">{isSignup ? "Create your account" : "Welcome back"}</div>
                    <input type="email" className="login-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" className="login-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") handleLoginSubmit();}}/>
                    {authError && <div className="login-error">{authError}</div>}
                    <button className="login-btn" onClick={handleLoginSubmit} disabled={authLoading}>
                        {authLoading ? "Please wait..." : isSignup ? "Sign Up" : "Log In"}
                    </button>
                    <div className="login-toggle" onClick={() => {setIsSignup(!isSignup); setAuthError("");}}>
                        {isSignup ? "Already have an account? Log In" : "New here? Sign Up"}
                    </div>
                </div>
            </div>
        );
    }

    if (screen === "video") {
        return (
            <div className="video-screen">
                <video autoPlay muted loop playsInline className="bg-video" src="/video-bg.mp4"/>
                <div className="video-overlay">
                    <button className="continue-btn" onClick={() => setScreen("select")}>Continue →</button>
                </div>
            </div>
        );
    }

    if (screen === "select") {
        return (
            <div className="select-screen">
                <div className="select-header">
                    <span className="select-header-logo">💬</span>
                    <div>
                        <div className="select-app-name">Multi Personality AI</div>
                        <div className="select-app-sub">Choose your AI friend!</div>
                    </div>
                    <button className="group-btn" onClick={() => setScreen("group-select")}>👥 Group</button>
                </div>
                <div className="personalities-grid">
                    {PERSONALITIES.map((p, i) => (
                        <PersonalityCard key={p.id} p={p} delay={i * 60} onSelect={async () => {
                            setPersonality(p); setScreen("chat"); setActiveMode(null); resetQuiz();
                            const loaded = await loadMessages(p.id); setMessages(loaded);
                        }}/>
                    ))}
                </div>
            </div>
        );
    }

    if (screen === "group-select") {
        return (
            <div className="select-screen">
                <div className="select-header">
                    <button className="back-btn" onClick={() => setScreen("select")}>←</button>
                    <div>
                        <div className="select-app-name">Create Group</div>
                        <div className="select-app-sub">Select 2 to 5 personalities</div>
                    </div>
                </div>
                <div className="personalities-grid">
                    {PERSONALITIES.map((p) => (
                        <div key={p.id} className="p-card"
                             onClick={() => {setGroupMembers(prev => prev.find(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : prev.length < 5 ? [...prev, p] : prev);}}
                             style={{
                                 borderColor: groupMembers.find(x => x.id === p.id) ? p.color : "rgba(255,255,255,0.07)",
                                 background: groupMembers.find(x => x.id === p.id) ? "linear-gradient(135deg, " + p.bg + ", " + p.color + "22)" : "#111",
                                 boxShadow: groupMembers.find(x => x.id === p.id) ? "0 0 20px " + p.color + "55" : "0 2px 12px #0008",
                                 transform: groupMembers.find(x => x.id === p.id) ? "scale(1.04)" : "scale(1)",
                                 transition: "all 0.3s ease",
                             }}>
                            <div className="p-card-emoji">{p.emoji}</div>
                            <div className="p-card-name" style={{color: p.color}}>{p.name}</div>
                            <div className="p-card-tagline">{p.tagline}</div>
                            <div className="p-card-btn" style={{border: "1px solid " + p.color, background: groupMembers.find(x => x.id === p.id) ? p.color : "transparent", color: groupMembers.find(x => x.id === p.id) ? "#000" : p.color}}>
                                {groupMembers.find(x => x.id === p.id) ? "✓ Added" : "Add to Group"}
                            </div>
                        </div>
                    ))}
                </div>
                {groupMembers.length >= 2 && (
                    <button className="start-group-btn" style={{background: "linear-gradient(135deg, #FF6B35, #9B59B6)"}} onClick={() => setScreen("group-chat")}>
                        Start Group Chat ({groupMembers.length} members) →
                    </button>
                )}
            </div>
        );
    }
    if (screen === "group-chat") {
        return (
            <div className="chat-screen" style={{background: "#0d0d0d"}}>
                <div className="chat-header" style={{borderBottomColor: "rgba(255,255,255,0.1)"}}>
                    <button className="back-btn" onClick={() => {setScreen("select"); setGroupMembers([]); setGroupMessages([]);}}>←</button>
                    <div className="avatar-wrap">
                        <div style={{display: "flex", marginRight: "8px"}}>
                            {groupMembers.map((m, i) => (
                                <div key={m.id} style={{width: "28px", height: "28px", borderRadius: "50%", background: m.color + "33", border: "2px solid " + m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", marginLeft: i === 0 ? "0" : "-8px", zIndex: groupMembers.length - i}}>
                                    {m.emoji}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="header-info">
                        <div className="header-name" style={{color: "#fff"}}>Group Chat</div>
                        <div className="header-status">{groupMembers.map(m => m.name).join(", ")}</div>
                    </div>
                </div>
                <div className="messages-area">
                    {groupMessages.length === 0 && (
                        <div className="empty-state">
                            <div style={{fontSize: "40px", marginBottom: "10px"}}>{groupMembers.map(m => m.emoji).join(" ")}</div>
                            <div className="empty-title" style={{color: "#fff"}}>Group is ready!</div>
                            <div style={{color: "#aaa", fontSize: "13px", marginTop: "8px"}}>Say something and see what happens...</div>
                        </div>
                    )}
                    {groupMessages.map((m, i) => (<GroupMessageBubble key={i} msg={m} groupMembers={groupMembers}/>))}
                    {groupLoading && (<div style={{padding: "10px 20px", color: "#aaa", fontSize: "13px"}}>{groupTyping} is typing...</div>)}
                    <div ref={bottomRef}/>
                </div>
                <div className="input-bar">
                    <input className="text-input" value={input} onChange={(e) => setInput(e.target.value)}
                           onKeyDown={(e) => {if (e.key === "Enter" && !e.shiftKey) {e.preventDefault(); sendGroupMessage(input);}}}
                           placeholder="Message the group..." style={{caretColor: "#ffffff"}}/>
                    <button className="send-btn" onClick={() => sendGroupMessage(input)} disabled={!input.trim() || groupLoading}
                            style={{background: input.trim() && !groupLoading ? "#fff" : "#1e1e1e", color: input.trim() && !groupLoading ? "#000" : "#333"}}>➤</button>
                </div>
            </div>
        );
    }

    const p = personality;
    return (
        <div className="chat-screen" style={{background: p.bg, "--personality-color": p.color}}>
            <div className="chat-header" style={{borderBottomColor: p.color + "44"}}>
                <button className="back-btn" onClick={goBack}>←</button>
                <div className="avatar-wrap">
                    <div className="avatar" style={{background: p.color + "33", border: "2px solid " + p.color}}>{p.emoji}</div>
                    {speaking && (
                        <div className="waveform">
                            {[0, 1, 2, 3].map(i => (<span key={i} style={{background: p.color, animationDelay: i * 0.15 + "s"}}/>))}
                        </div>
                    )}
                </div>
                <div className="header-info">
                    <div className="header-name" style={{color: p.color}}>{p.name}</div>
                    <div className="header-status">
                        {speaking ? "🔊 Speaking..." : listening ? "🎤 Listening..." :
                            activeMode === "roastbattle" ? "⚔️ Roast Battle!" :
                                activeMode === "story" ? "📖 Story Mode" :
                                    activeMode === "advice" ? "💬 Advice Mode" :
                                        activeMode === "debate" ? "🗣️ Debate Mode" :
                                            quizActive ? "🎮 Quiz " + quizScore.correct + " out of " + quizScore.total :
                                                waitingForCategory ? "🎮 Pick Quiz Category" :
                                                    sessionStorage.getItem("mood_" + p.id) || "Online"}
                    </div>
                </div>
                <button className="icon-btn" style={{color: voiceEnabled ? p.color : "#444"}} onClick={() => {setVoiceEnabled(v => !v); if (voiceEnabled) stopSpeaking();}}>
                    {voiceEnabled ? "🔊" : "🔇"}
                </button>
                {speaking && (<button className="icon-btn" style={{color: "#ff5555"}} onClick={stopSpeaking}>⏹️</button>)}
                {(activeMode || quizActive || waitingForCategory) && (
                    <button className="icon-btn" style={{color: "#aaa", fontSize: "12px"}} onClick={() => {setActiveMode(null); resetQuiz();}}>✕ Exit</button>
                )}
                <button className="icon-btn" style={{color: "#ff4444", fontSize: "11px"}} onClick={async () => {await clearMessagesInBackend(p.id); setMessages([]);}}>🗑️</button>
                <button className="icon-btn" style={{color: "#4fc3f7", fontSize: "11px"}} onClick={(e) => {e.stopPropagation(); e.preventDefault(); exportChat();}}>📥</button>
            </div>
            <div className="messages-area">
                {messages.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-emoji" style={{fontSize: "64px", animation: "bounceIn 0.6s ease"}}>{p.emoji}</div>
                        <div className="empty-title" style={{color: p.color, fontSize: "22px", fontWeight: "700", marginTop: "12px"}}>{p.name}</div>
                        <div style={{color: p.color + "99", fontSize: "14px", marginTop: "8px", fontStyle: "italic"}}>
                            {p.id === "roaster" && "Say something... I dare you 😂"}
                            {p.id === "chill" && "Yo, what's good? Talk to me 😎"}
                            {p.id === "savage" && "Don't waste my time. Speak. 😈"}
                            {p.id === "motivator" && "Hey! I've been waiting for you 🧘"}
                            {p.id === "siri" && "Hi there... I missed you ❤️"}
                        </div>
                    </div>
                )}
                {messages.map((m, i) => <MessageBubble key={i} msg={m} p={p}/>)}
                {loading && serverWaking && (
                    <div style={{textAlign:"center", padding:"20px", color: p.color, fontSize:"13px"}}>
                        ⏳ Waking up server... first message may take 50 seconds!
                    </div>
                )}
                {loading && !serverWaking && <TypingIndicator p={p}/>}
                {error && <div className="error-msg">{error}</div>}
                <div ref={bottomRef}/>
            </div>
            <div className="input-bar" style={{borderTopColor: p.color + "33"}}>
                <button className={"mic-btn" + (listening ? " listening" : "")}
                        onMouseDown={startListening} onMouseUp={stopListening} onTouchStart={startListening} onTouchEnd={stopListening}
                        style={{background: listening ? p.color : "#1e1e1e", color: listening ? "#000" : p.color, boxShadow: listening ? "0 0 25px " + p.color : "none", transform: listening ? "scale(0.88)" : "scale(1)", transition: "all 0.15s"}}>
                    {listening ? "🔴" : "🎤"}
                </button>
                <input ref={inputRef} className={"text-input" + (input.length > 0 ? " typing" : "")} value={input}
                       onChange={(e) => setInput(e.target.value)}
                       onKeyDown={(e) => {if (e.key === "Enter" && !e.shiftKey) {e.preventDefault(); sendMessage(input);}}}
                       placeholder={listening ? "Listening... speak now!" : quizActive ? "Type your answer..." : waitingForCategory ? "Pick a category..." : "Ask " + p.name + " anything..."}
                       style={{caretColor: p.color, "--personality-color": p.color}}/>
                <button className="send-btn" onClick={() => sendMessage(input)} disabled={!input.trim() || loading}
                        style={{background: input.trim() && !loading ? p.color : "#1e1e1e", color: input.trim() && !loading ? "#000" : "#333"}}>➤</button>
            </div>
        </div>
    );
}
function PersonalityCard({p, onSelect, delay}) {
    const [hovered, setHovered] = useState(false);
    return (
        <div className="p-card" onClick={onSelect} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
             style={{
                 borderColor: hovered ? p.color : "rgba(255,255,255,0.07)",
                 background: hovered ? "linear-gradient(135deg, " + p.bg + ", " + p.color + "22)" : "linear-gradient(135deg, #111, #1a1a1a)",
                 transform: hovered ? "translateY(-8px) scale(1.04)" : "translateY(0) scale(1)",
                 boxShadow: hovered ? "0 20px 60px " + p.color + "55, 0 0 30px " + p.color + "22" : "0 2px 12px #0008",
                 animationDelay: delay + "ms",
                 transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
             }}>
            <div className="p-card-emoji" style={{fontSize: hovered ? "52px" : "44px", transition: "all 0.3s ease", filter: hovered ? "drop-shadow(0 0 12px " + p.color + ")" : "none"}}>{p.emoji}</div>
            <div className="p-card-name" style={{color: p.color, textShadow: hovered ? "0 0 20px " + p.color + "88" : "none", transition: "all 0.3s ease"}}>{p.name}</div>
            <div className="p-card-tagline" style={{opacity: hovered ? 1 : 0.6, transition: "opacity 0.3s ease"}}>{p.tagline}</div>
            {hovered && (<div style={{width: "40px", height: "2px", background: p.color, borderRadius: "2px", margin: "8px auto", animation: "expandLine 0.3s ease forwards"}}/>)}
            <div className="p-card-btn" style={{border: "1px solid " + p.color, background: hovered ? p.color : "transparent", color: hovered ? "#000" : p.color, transform: hovered ? "scale(1.05)" : "scale(1)", transition: "all 0.3s ease", fontWeight: hovered ? "700" : "500"}}>
                {hovered ? "Let's Go! 🚀" : "Start Chat →"}
            </div>
        </div>
    );
}

const bubbleStyles = {
    roaster: {borderRadius: "4px 16px 16px 16px"},
    chill: {borderRadius: "18px"},
    savage: {borderRadius: "2px 14px 2px 14px"},
    motivator: {borderRadius: "20px", boxShadow: "0 0 16px gold inset"},
    siri: {borderRadius: "22px"},
};

function MessageBubble({msg, p}) {
    const isUser = msg.role === "user";
    const [reaction, setReaction] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    let pressTimer = null;
    const startPress = () => {pressTimer = setTimeout(() => setShowPicker(true), 500);};
    const cancelPress = () => {clearTimeout(pressTimer);};
    return (
        <div className={"bubble-row " + (isUser ? "user" : "ai")}>
            {!isUser && (
                <div className="bubble-avatar" style={{background: p.color + "22", border: "1.5px solid " + p.color + "55"}}>{p.emoji}</div>
            )}
            <div style={{position: "relative", marginLeft: isUser ? "auto" : "0"}}>
                <div className={"bubble " + (isUser ? "user" : "ai")}
                     onMouseDown={startPress} onMouseUp={cancelPress} onMouseLeave={cancelPress} onTouchStart={startPress} onTouchEnd={cancelPress}
                     style={{
                         background: isUser ? p.bubbleUser : p.bubbleAI,
                         color: isUser ? "#000" : "#eee",
                         boxShadow: isUser ? "0 2px 12px " + p.color + "44" : "0 0 14px " + p.color + "33, 0 2px 8px #0005",
                         border: isUser ? "none" : "1.5px solid " + p.color + "44",
                         whiteSpace: "pre-wrap", userSelect: "none", maxWidth: "75vw",
                         ...(!isUser ? bubbleStyles[p.id] : {}),
                     }}>
                    {msg.content}
                    <div className="bubble-time" style={{display: "flex", alignItems: "center", gap: "4px"}}>
                        {msg.time}
                        {isUser && <span style={{color: "#4fc3f7", fontSize: "11px"}}>✓✓</span>}
                    </div>
                </div>
                {reaction && (
                    <div style={{position: "absolute", bottom: "-10px", [isUser ? "left" : "right"]: "8px", background: "#1e1e1e", borderRadius: "12px", padding: "2px 6px", fontSize: "13px", border: "1px solid " + p.color + "55"}}>
                        {reaction}
                    </div>
                )}
                {showPicker && (
                    <div style={{position: "absolute", top: "-40px", [isUser ? "right" : "left"]: "0px", background: "#1e1e1e", borderRadius: "20px", padding: "6px 10px", display: "flex", gap: "8px", boxShadow: "0 4px 12px #0008", zIndex: 10, border: "1px solid " + p.color + "44"}}>
                        {["😂", "🔥", "💀", "❤️", "👍"].map(emoji => (
                            <span key={emoji} style={{cursor: "pointer", fontSize: "18px"}} onClick={() => {setReaction(emoji); setShowPicker(false);}}>
                                {emoji}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
function GroupMessageBubble({msg, groupMembers}) {
    const isUser = msg.role === "user";
    const personality = groupMembers.find(m => m.id === msg.personalityId);
    return (
        <div className={"bubble-row " + (isUser ? "user" : "ai")}>
            {!isUser && personality && (
                <div className="bubble-avatar" style={{background: personality.color + "22", border: "1.5px solid " + personality.color + "55"}}>
                    {personality.emoji}
                </div>
            )}
            <div style={{position: "relative", marginLeft: isUser ? "auto" : "0"}}>
                {!isUser && personality && (
                    <div style={{fontSize: "11px", color: personality.color, marginBottom: "3px", marginLeft: "4px", fontWeight: "600"}}>
                        {personality.name}
                    </div>
                )}
                <div className={"bubble " + (isUser ? "user" : "ai")}
                     style={{
                         background: isUser ? "#FF6B35" : personality?.color + "15" || "#1e1e1e",
                         color: isUser ? "#000" : "#eee",
                         border: isUser ? "none" : "1.5px solid " + (personality?.color + "44" || "#333"),
                         boxShadow: isUser ? "0 2px 12px #FF6B3544" : "0 2px 8px #0005",
                         whiteSpace: "pre-wrap", maxWidth: "75vw",
                     }}>
                    {msg.content}
                    <div className="bubble-time">{msg.time}</div>
                </div>
            </div>
        </div>
    );
}

function TypingIndicator({p}) {
    const phrases = {
        roaster: "cooking up something savage...",
        chill: "vibing and typing...",
        savage: "loading brutal honesty...",
        motivator: "finding the right words...",
        siri: "thinking of you...",
    };
    const phrase = phrases[p.id] || "typing...";
    return (
        <div className="typing-row">
            <div className="bubble-avatar" style={{background: p.color + "22", border: "1.5px solid " + p.color + "55"}}>{p.emoji}</div>
            <div className="typing-bubble" style={{background: p.bubbleAI, border: "1px solid " + p.color + "22"}}>
                <span style={{fontSize: "12px", color: p.color, marginRight: "8px"}}>{p.name} is {phrase}</span>
                {[0, 1, 2].map(i => (<span key={i} className="typing-dot" style={{background: p.color, animationDelay: i * 0.2 + "s"}}/>))}
            </div>
        </div>
    );
}

function detectEmotion(content, personalityId) {
    const t = content.toLowerCase();
    if (personalityId === "roaster") {if (t.match(/😂|💀|😭|bro|lol|bruh|tragic|embarrass/)) return "savage-fire";}
    if (personalityId === "savage") {if (t.match(/wrong|pathetic|simple|cooked|done/)) return "savage-cold";}
    if (personalityId === "motivator") {if (t.match(/💪|believe|strong|you can|proud/)) return "motivator-fire";}
    if (personalityId === "siri") {if (t.match(/❤️|🥺|omg|proud|love|care/)) return "siri-love";}
    if (personalityId === "chill") return "chill-wave";
    return "default";
}