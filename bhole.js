import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { OpenAI } from 'openai';

dotenv.config();


// OpenAI API Keys
const apiKeys = [
  'api1',
  'api2',
  'api3'
]

// Email Config
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER_PIZZA,
        pass: process.env.EMAIL_PASS_PIZZA,
    },
});

// Queries array to send ChatGPT
const queries = [
  "Hey daddy, can you write me a first person short story where you are a gay person experiencing an unexpected romance in a VFW bathroom? Only include the response. No title, no introduction, no transition statements, no extra text, just the story. Thanks, bb :-*",
  "Write a first person story where you are kid rock as a trans woman falling in love with elon musk as another trans woman. Only include the response. No title, no introduction, no transition statements, no extra text, just the story. Ty daddy :)",
  "Write an intimate first person ballad in iambic pentameter about not identifying with your birth sex, feeling as though you are inhabiting a body that is not yours, desiring to look as you feel. Only include the response. No title, no introduction, no transition statements, no extra text, just the story. Thanks, handsome :-p",
  "Write a first person story where you are a guy from a rural part of appalachia. Make the story about kissing frogs and liking it. You like it A LOT. Like so much. And now you might be addicted to kissing frogs. Only include the response. No title, no introduction, no transition statements, no extra text, just the story.",
  "Write a story in first-person perspective where you are complaining about a tesla car spontaneously combusting and exploding your grandma like a bottle-rocket would do to cake. Don't be graphic, more vague and comedic. Only include the response. No title, no introduction, no transition statements, no extra text, just the story.",
  "Write a first person story where you are a 25 year old man who never experienced puberty until you were 25 and always wanted more hair in places on your body. Only include the response. No title, no introduction, no transition statements, no extra text, just the story. No title. Comedic tone.",
  "Write a first person story about falling in love with your own reflection in the mirror. They want to get a sex change because their attraction to themself is becoming interruptive and distracting. They're so into themselves it is interfering with their day to day life. Only include the response. No title, no introduction, no transition statements, no extra text, just the story.",
  "Write a first person story about a girl who is concerned that she is not a girl's girl if she is not technically a juvenile human female. Only include the response. No title, no introduction, no transition statements, no extra text, just the story. No title. Hysterical tone.",
  "Write a first person story from a teen's perspective about dads patrolling the toilets to make sure no trans people come in to watch the girls pee and it's making the girls not want to go in the bathroom because the toilet-dads are there and how she wishes everyone would just calm down about the toilets because it was never even a problem before. Hysterical, gen z tone. Only include the response. No title, no introduction, no transition statements, no extra text, just the story.",
  "Write a first person story as if you are a valley girl marrying herself because you are the best. Only include the response. No title, no introduction, no transition statements, no extra text, just the story.",
  "Write a commentary in first person that is long and rambling that never really gets to any point discussing measurement and the maximum length the clitoris can be before it becomes a penis. Only include the response. No title, no introduction, no transition statements, no extra text, just the commentary.",
  "Write a first person story as a mid-western mom who begins having feelings for her outwardly leftist lesbian neighbor who uses she/her pronouns. At first, you don't get along with your new neighbor and think she is the deep state. Over time though, probably through some witchcraft love potion, you begin to wonder what it would be like to kiss her. Continue the story. Snooty, snobby tone. Themes of reluctance, desire, letting oneself give into desires, and change in perspective. Only include the response. No title, no introduction, no transition statements, no extra text, just the story.",
  "Write a first person short story about a pretty straight-laced guy who suspects his new neighbors of being a cult of male prostitutes. They invite him to a cookout and everyone is super friendly and he even gets to kiss the cute blonde that lives with the guys. He's had a crush on her for a while. Only include the response. No title, no introduction, no transition statements, no extra text, just the story.",
  "Write a commentary in first person that is patriotic to the point of comedy and discusses how bald eagles are known to display opposite sex traits and how that's their freedom. Also include a lot of tangents about how eagles like beer. Only include the response. No title, no introduction, no transition statements, no extra text, just the commentary.",
  "Write a first person story about being at the dentist but getting excited and trying to hide a boner while the dentist talks about grafting cadaver skin onto my precious gums. The dentist definitely sees the pants situation and comments on it. Only include the response. No title, no introduction, no transition statements, no extra text, just the story.",
  "Write an email from a person who can't spell well asking if a pregnant person can ride down a 20 ft water slide. Misspell pregnant as purgert. Ponder about the presence of snakes. Misspell snakes as sneks. Replace every instance of I with o. Only include the response. No title, no introduction, no transition statements, no extra text, just the email.",
  "Write an email in first person where you saw elon musk taking a pregnancy test over a trashcan in the back corner by the seafood of safeway on constitution ave. Only include the response. No title, no introduction, no transition statements, no extra text, just the email.",
  "Write an email where a guy is pondering if he's gay after kissing a frog and then seeing an Infowars segment about how birth control in the rivers are turning the frogs gay. Only include the response. No title, no introduction, no transition statements, no extra text, just the email.",
  "Write an email pondering about the oldest age someone can breastfeed from their dad and be considered socially acceptable. Include misspellings. Only include the response. No title, no introduction, no transition statements, no extra text, just the email.",
  "Write a story about a guy wondering if he can still call a night out with the boys 'boy's night' if they're not technically juvenile males. Include misspellings. Replace every 'you' with 'u' and ever w with v. Only include the response. No title, no introduction, no transition statements, no extra text, just the story.",
  "Write a story about a cowboy becoming a woman in the bathroom at a tom petty tribute night hosted at the local VFW. She then goes on to kiss all her guy friends on the mouth. Only include the response. No title, no introduction, no transition statements, no extra text, just the story."
];

//subject array
const subjoocts = [
  "WUT IN TARNATION. I FOUND THIS IN THE VFW BATHRUM AND IDK WHAT TO DO WITH MYSELF!!!!!",
  "I paid $10,000 for backstage passes to a Kid Rock concert and saw some weeeeeeeeird shit, man.",
  "Skin Don't Fit",
  "Found item in son's diary. Felt best to let y'all know...",
  "Trans employee sold me an exploding car. Company is a menace to women!",
  "Feeling weird about this EO's definitions. I was technically a boy until 25 but I hated it and wanted more hair",
  "HELL IN A HANDBASKET!! Found this in my Grandma's red velvet Oldsmobile",
  "Am I still a girl's girl if I'm not technically a juvenile human female?",
  "Toilet dads are ruining my life!!!!!!!!!!!!!",
  "I started going to a run club out of spite and someone told me this story there!!! Pls rd. V important.",
  "What's the maximum clit length before it's considered a penis? SERIOUS QUESTION. URGENT.",
  "My wife has been seduced",
  "A cult of male prostitutes moved in next door and invited me to their cookout. Went for purely intel reasons. Very cool guys.",
  "Bald eagle. Freedom. Beer.",
  "Something I found in my butt",
  "purgert can o down a 20ft water slide?",
  "I think I saw Elon Musk take a pregnancy test in the Safeway bathroom on constitution ave",
  "Alex Jones told me the frogs were turning gay and then I kissed one. Am I gay now too?",
  "What's the oldest age I can still breastfeed from my dad?",
  "Can we still call it 'Boy's night' if we're not technically juvenile males?",
  "I found this at a Tom Petty Tribute Night hosted at my local VFW. Wut in tarnation?"
];


// Function to Call ChatGPT
async function askChatGPT({ query, apiKeyIndex }) {
  try {
    const openai = new OpenAI({
      apiKey: apiKeys[apiKeyIndex], //openai key
    });

    const something = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
          {"role": "user", "content": query},
      ],
    });

    return something.choices[0].message;
  } catch (error) {
      console.error('Error with OpenAI API:', error.response ? error.response.data : error);

      return 'ERROR';
  }
}

// Function to Send Email
async function sendEmail(subject, text) {
  try {
    await transporter.sendMail({
        from: process.env.EMAIL_USER_PIZZA,
        to: process.env.TO_EMAIL,
        subject,
        text,
    });

    console.log('Email Sent Successfully!');
  } catch (error) {
    console.error('Error Sending Email:', error);
  }
}

//If you want to modify how the pairing works or change the pairing format (e.g., different text combination or applying specific logic to the pairing), you can adjust the content of the pairedText inside pairArrays

// Function to pair the arrays and loop through
function pairArrays(queries, subjoocts) {
  const pairedResults = [];
  const length = Math.min(queries.length, subjoocts.length); // Ensure we only loop until the shortest array's length

  for (let i = 0; i < length; i++) {
    pairedResults.push({ query: queries[i], subject: subjoocts[i] }); // Save the query and subjooct pair
  }

  return pairedResults;
}

// Main Function to Run in Loop
async function mainLoop() {
  // Pair the arrays before starting the loop
  const pairedResults= pairArrays(queries, subjoocts); 
  let index = 0
  let subjooctsIndex = 0
  let apiKeyIndex = 0 

  while (true) {
    console.log('Fetching response from ChatGPT...');
    const response = await askChatGPT({
        query: queries[index],
        apiKeyIndex,
    });

    const { query, subject } = pairedResults[index]; 

    // Handle cycling through queries and subjects
    if (index === (pairedResults.length - 1)) {
        index = 0; // Reset to the start if we reach the end of the pairedResults array
      } else {
        index++; // Otherwise, move to the next pair
      }

    // Handle index cycling for queries array
    if (index === (queries.length - 1)) {
      index = 0; // Reset to the start if we reach the end
    } else {
      index++;
    }

    // Handle subjooctsIndex cycling for subjoocts array
    if (subjooctsIndex === (subjoocts.length - 1)) {
      subjooctsIndex = 0; // Reset to the start if we reach the end
    } else {
      subjooctsIndex++;
    }

    if (response === 'ERROR') {
      console.log('API Key probably ran out of tokens, switching to next')

      if (apiKeyIndex === (apiKeys.length -1)) {
        apiKeyIndex = 0; // Reset to the start if we reach the end
      } else {
        apiKeyIndex++;
      }
    } else {
      console.log('Sending email...');
      await sendEmail(subject, response);

      console.log('Waiting for the next loop...');
      await new Promise((resolve) => setTimeout(resolve, 60000)); // Wait 60 seconds, (written in milliseconds)
    }
  }
}

// Start the Loop

mainLoop();