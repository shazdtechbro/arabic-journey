import { units, sourceLinks } from "./data.js";
import { guides } from "./guides.js";
export const PDF_URL = sourceLinks[1].url;
export const chapterRanges = [
  [6, 12],
  [13, 14],
  [15, 21],
  [22, 27],
  [28, 33],
  [34, 39],
  [40, 42],
  [43, 47],
  [48, 54],
  [55, 61],
  [62, 63],
  [64, 68],
  [69, 82],
  [83, 87],
  [88, 92],
  [93, 96],
  [97, 100],
  [101, 105],
  [106, 109],
  [110, 114],
  [115, 117],
  [118, 120],
  [121, 124],
];
// Page-specific study directions, newly authored after inspection of the referenced source pages.
// These are not transcriptions, replacements for the original exercises, or claims of exhaustive item-level assessment.
const notes = `
1|Meet the book|Identify the author and the intended audience. This is a language course for non-native learners, not a collection of phrases.|Write down your reason for learning and your daily study window.
2|Recognise the Arabic title|Notice that Arabic runs from right to left. The title identifies this as the first part of the course.|Locate the volume indication in the original, then practise finding the start of an Arabic line.
3|Know the publication|Distinguish institutional publication details from the author’s lesson content.|Find the publisher’s name. Keep the author’s work distinct from this independent companion.
4|Respect the source|This page records publication and bibliographic information. These details matter when comparing editions.|Check that you are using Book 1. Page references here refer to the linked PDF, not another edition.
5|Begin with intention|This front-matter page is a calligraphic opening rather than a grammar exercise.|Set an intention for beneficial learning. Prepare a notebook for vocabulary and questions.
6|Name familiar objects|The opening illustrated page pairs masculine demonstratives with everyday objects. Learn the noun and its vowel ending together.|Point to three things around you. Say one short nominal sentence for each, then check every illustrated item in the source.
7|Ask, confirm, correct|The source combines identification questions with yes/no questions. A negative answer should correct the object’s identity.|For each pictured exchange, distinguish the question from the answer. Then invent a fresh exchange about a pen.
8|Retrieve from pictures|Naming an object from its picture is harder, and more useful, than recognising a translation.|Cover the source labels, identify each object, and say the complete answer aloud before writing it.
9|Answer a yes/no question|The initial question particle turns an identification statement into a question. The answer may confirm or correct it.|Read each question in the original. Give a complete affirmative or negative answer, rather than only yes or no.
10|Connect writing to meaning|A copied Arabic word is useful only if you can recognise and explain it afterwards.|Complete the source writing task slowly. Cover one word and rewrite it from memory, including its vowel marks.
11|Ask about people|Use a question for a person when the answer identifies a person. Do not treat the person question as a general “what”.|Compare the source’s people and objects. Ask the appropriate question about each before reading its answer.
12|Read without the pictures|The lesson ends by making you recognise the same patterns in plain text.|Read each source sentence, identify its question type, and translate the meaning without adding extra Arabic words.
13|Point farther away|The distant demonstrative changes the distance, while the sentence pattern remains familiar.|Contrast a nearby and a distant item. Read the source’s examples and explain the role of the joining word.
14|Keep near and far distinct|The source revisits questions and contrasts with the distant form.|Answer the source questions before consulting the text again. Create two original near/far contrasts.
15|Move from a noun to a statement|The definite article makes a noun identifiable; an indefinite predicate can supply new information about it.|Separate each source statement into “what we are talking about” and “what is said about it”.
16|Add the definite article carefully|Adding the article removes the ordinary noun’s tanwīn. Reading practice also connects subjects with descriptions.|Complete the source transformations. Explain which written marks changed and which meaning changed.
17|Choose a meaningful description|A completion exercise must satisfy grammar and meaning together.|Fill the original gaps, then explain why each chosen predicate is plausible for its subject.
18|Read contrasts and familiar nouns|Opposite descriptions and repeated nouns help you recognise a sentence rather than translate one letter at a time.|Read the page aloud, pause after each complete thought, and record the vocabulary you could not retrieve.
19|Build sensible pairs|Matching tasks check whether two words make a meaningful grammatical statement.|Work through the source matching task. Read each completed pairing as a full sentence and explain it in English.
20|Hear the definite article|Sun and moon letters affect pronunciation of the written article. The written lām remains part of the spelling.|Classify the source words by their initial letter. Say each with the article and attend to the shaddah.
21|Apply the sound pattern|This is pronunciation practice, not permission to remove letters from the spelling.|Read the source list twice: once slowly for the spelling, then naturally for the connected sound.
22|Locate someone or something|A location answer combines a preposition with a genitive noun. A pronoun can refer back to the person or object.|Trace every question and answer in the source dialogue. Identify who or what the pronoun refers to.
23|Explain the genitive ending|The preposition governs the noun that follows it, whether the phrase describes a person’s location or an object’s position.|For each source location phrase, name the preposition and explain the following noun’s case.
24|Names are still nouns|Proper names do not mean “a person called…” merely because some have tanwīn. Names can follow different declension patterns.|Read the source names and sentence completions. Note the difference between a name and an indefinite common noun.
25|Origin and destination|Going from a place and going to a place are different relationships, expressed with different prepositions.|Follow the source dialogue, keeping a two-column note: origin on one side and destination on the other.
26|Follow who went where|A verb followed by its named subject should not be translated as two separate subjects.|Answer the source comprehension questions. Identify the traveller, the action and the destination separately.
27|Choose a preposition by meaning|In, on, from and to are not interchangeable, even though all govern the genitive here.|Complete the original gaps. Explain the physical or directional relationship behind each choice.
28|Find the owner|The first noun identifies the thing; the second identifies its possessor. Together they form one unit.|Read the dialogue and mark the possession pairs. Answer the source’s location questions using the full phrases.
29|Join two nouns|The first term of this basic iḍāfah takes neither the article nor tanwīn. The second term is genitive.|Perform the source joining exercises, then say the phrase as a single ownership unit.
30|Read ownership in context|The ownership unit can sit inside a longer sentence, including after a preposition.|Locate each source possession phrase. Explain the case of the first term from its role in the sentence.
31|Correct before you continue|Error correction is a chance to state the rule, not just replace a mark.|For every original correction, describe the error in words. Then read the corrected phrase aloud.
32|Names and family links|Words for a name and a son enter the same possession structures as familiar objects.|Work through the source examples and picture prompts. Distinguish the thing or relationship from its possessor.
33|Read connected beginnings|The opening vowel in words such as “name” and “son” behaves differently when connected to a preceding word.|Read the source phrases in connected speech. Keep the written spelling even when the initial vowel is not pronounced.
34|Point to a feminine noun|The nearby feminine demonstrative matches a feminine noun. It does not mean the object is a person.|Read the illustrated source examples and identify the gender clue for every noun.
35|Compare feminine objects|Both object names and their descriptions can have feminine forms.|Read the page’s contrasts. Make your own comparison of an old object and a new one.
36|Learn gender with the noun|Some feminine body-part nouns have no tāʾ marbūṭah. Meaning and spelling alone are not a complete gender test.|Record the source body-part words with their gender. Say the suitable demonstrative before each.
37|Retrieve gender from pictures|This illustrated review mixes familiar objects so that you must choose the demonstrative yourself.|Name every pictured item and choose the demonstrative before checking the source or your vocabulary notes.
38|Make the whole sentence agree|Changing a subject to feminine can require changing its demonstrative, pronoun and adjective too.|Complete all source transformations and corrections. Check the entire sentence, not only the noun.
39|Express belonging|The attached preposition for belonging governs the genitive. A question about an owner asks whom something belongs to.|Read the original ownership examples and practise answering whose an object is without confusing “who” and “whose”.
40|Point to a distant feminine noun|Distance and gender are independent choices. The distant feminine form adds one new cell to a familiar pattern.|Follow the source dialogue and identify both gender and distance for each pointing word.
41|Compare four pointing words|A short exchange can contrast near/far, masculine/feminine and different owners.|Read the source comparisons and rewrite one contrast with objects of your own choosing.
42|Select before translating|Choose a demonstrative by analysing the noun, rather than remembering the shape of a previous answer.|Complete the source selection task and give a gender-and-distance reason for every choice.
43|A phrase needs its information|A demonstrative with a definite noun can name the subject group. A predicate then completes the thought.|Read the original dialogue and separate each subject group from its predicate.
44|Read this particular noun|The definite article after a demonstrative changes the structure from simple identification to a noun group.|Compare the source’s sentences with Day 1 patterns. Explain where the new information appears.
45|Join information into one statement|Combining fragments requires deciding which words identify the subject and which supply the predicate.|Complete the original combining task. Check that the result says something complete.
46|Recognise endings you cannot see|Nouns ending in a long ā can remain visually unchanged in different grammatical positions.|Read the source comparisons. Identify the grammatical role even when the word’s visible ending does not change.
47|Place things in relation|Front and behind take genitive complements in these constructions, linking this page to ownership grammar.|Read the source’s location sentences. Explain why the noun after the position word is genitive.
48|Introduce a description|An adjective follows its noun. The description can add detail to either a person or an object.|Read the opening source examples and locate every adjective after the noun it describes.
49|Expand a noun meaningfully|Adding a description should preserve the noun’s grammatical relationships.|Read and complete the source examples. Explain whether each description is part of a noun phrase or a sentence predicate.
50|Match noun and adjective|An adjective must fit the noun’s gender, definiteness and case in these singular examples.|Complete both source directions: supplying adjectives and supplying the nouns they describe.
51|Introduce a relative description|The masculine relative pronoun links an identifiable noun to a clause describing it.|Follow the source dialogue. Point out the noun being described and the words forming its relative clause.
52|Track a definite description|A definite adjective identifies a particular noun along with its article. Do not confuse it with an indefinite predicate.|Read the original text and explain the difference between naming a described object and stating its description.
53|Keep agreement inside longer phrases|The preposition and the noun’s role can affect both the noun and its adjective.|Complete the source adjective choices. Justify the article and case of each adjective.
54|Read relative phrases as units|A relative description may contain a location, action or ownership relationship.|Read every original relative construction. Identify its head noun first, then translate the whole group.
55|Ask about a learner|An introductory dialogue can combine identity, origin, companionship and possessive suffixes.|Trace the pronouns in the source conversation. Record who each one points to before translating.
56|Talk about family and places|Possessive endings let a conversation keep referring to people without repeating their full names.|For each source family reference, identify the relative and the person to whom they are related.
57|Answer in your own voice|A question addressed to you may need a first-person answer rather than a copied second-person form.|Answer the original personal questions truthfully where possible, changing pronouns appropriately.
58|Attach the right possessor|The suffix for his and the suffix for her refer to the owner, not the grammatical gender of the thing owned.|Complete the original suffix choices, stating whose object or relation is meant.
59|Change the owner|One noun can be practised with my, your, his and her. Relationships may also use the construction with lām.|Complete the source suffix transformations and explain the resulting meaning of each form.
60|Distinguish have from accompany|The vocabulary for at someone’s place, with someone and belonging to someone has overlapping English translations.|Read the source comparisons and state the real-world situation each sentence describes.
61|Special family forms and names|The nominative forms of father and brother in possession deserve careful reading. Some personal names lack tanwīn.|Read the source family and name examples and record the forms that differ from an ordinary noun.
62|Read a connected description|A description of a home connects rooms, possessions, people and location phrases already encountered.|Read the full original passage. Sketch a simple relationship map rather than translating isolated words only.
63|Refer back and express affection|A suffix on a preposition refers back to a noun. The verb for loving introduces an object.|Read the original examples and identify each referring suffix and each object of the verb.
64|Address a woman directly|The feminine singular addressee has its own independent pronoun and possessive ending.|Follow the source dialogue and distinguish the speaker, addressee and person spoken about.
65|Read personal replies carefully|A dialogue can shift between addressing a woman and talking about her family.|Answer the original comprehension tasks while keeping the changing reference of each suffix clear.
66|Change the addressee|Changing a person called upon can require changing possessive endings and greetings too.|Complete the source substitutions, reading the complete result aloud rather than replacing one isolated ending.
67|Compare feminine actions and relatives|The feminine past form and feminine relative pronoun mark different grammatical relationships.|Complete the source transformations. Explain whether you changed a verb’s subject or a relative pronoun’s reference.
68|Choose the relative pronoun|The relative pronoun agrees with the noun being described, even if other nouns occur nearby.|Complete the original selections. Find the head noun before choosing the relative pronoun.
69|Meet a group|The human plural demonstrative lets you identify groups. Plural adjectives add descriptions of those groups.|Read the original dialogue and pair each singular meaning you know with its plural form.
70|Transform singular statements|A plural transformation may change the demonstrative, predicate noun and adjective together.|Complete every source transformation and check that no singular agreement word was left behind.
71|Retrieve broken plurals|Many human nouns and descriptions use internal plural patterns rather than a single added ending.|Work through the original plural list. Learn each unfamiliar singular–plural pair as one vocabulary entry.
72|Follow plural possession|A group can be both the subject of a statement and the owner of something.|Complete the source transformations and identify where the group is being spoken about and where it is the possessor.
73|Say what a group did|The past-tense plural form carries a group subject. A final written alif in this form is not an extra spoken syllable.|Read the source transformations and contrast a single person’s action with the group’s action.
74|Consolidate human plurals|Connected sentences make you retrieve forms without the support of a singular prompt.|Read every source sentence and retrieve the singular of each unfamiliar plural before checking it.
75|Move to female groups|The same human plural demonstrative can point to women, while other pronouns and forms distinguish gender.|Complete the original feminine transformations and compare them with the masculine group patterns.
76|Read their relationships|Feminine plural possession and descriptions can occur alongside masculine relatives in the same passage.|Read the original sentences and trace exactly who each attached pronoun refers to.
77|Change a woman to a group|The demonstrative, verb and noun must be reviewed together when changing number.|Complete the source plural and selection tasks. State the subject before deciding the verb form.
78|Retrieve the whole pronoun|Independent pronouns have a subject role; attached pronouns can be possessors. Their forms may resemble one another.|Complete the source selections and name the grammatical job of each chosen pronoun.
79|Point to groups farther away|The distant human plural demonstrative works for both masculine and feminine groups.|Read the source contrasts and identify which group is near and which is farther away.
80|Transform a distant singular|Pluralising a sentence involves agreement across the whole phrase or statement.|Complete the source transformations. Compare the singular pointing word with its human plural replacement.
81|Choose a distant reference|Gender, number and human reference jointly determine the choice of demonstrative.|Complete the source selection and vocabulary tasks and justify every pointing word.
82|Organise what you know|The reference tables bring singular/plural and near/far forms into one system.|Rebuild the source comparison table from memory, then use it to check your answers.
83|Speak to a group|The plural addressee and the plural speaker are different perspectives in a conversation.|Read the original dialogue and label each line as a question addressed to a group or the group’s reply.
84|Read a group’s reply|A group can describe its shared place and different members’ studies without changing who “we” refers to.|Follow the source conversation and answer the original personal questions using plural forms.
85|Understand shared possession|The suffix for our connects a group with its belongings and shared references.|Read the original statements and identify the noun carrying each possessive suffix.
86|Compare names and group suffixes|Some foreign names decline differently. A suffix can replace an explicit possessor without changing the basic ownership relation.|Complete the original suffix tasks and name-reading practice. Keep a list of no-tanwīn names.
87|Change a speaker or addressee|The group form of “you went” differs from “we went”; the verb indicates the participants.|Complete the source substitutions and explain who performed the action in every result.
88|Address a female group|The feminine plural addressee has its own pronoun and attached possessive form.|Follow the original dialogue, identifying the women addressed and the people they mention.
89|Answer and transform|The conversation revisits female-group questions before asking you to change other forms.|Answer the original questions, then perform the source transformations without leaving a masculine-group ending behind.
90|Replace group endings consistently|A change from a male/mixed group to a female group affects attached possession and relevant verb forms.|Complete the source substitutions and read the whole changed sentence aloud.
91|Before, after, and the right person|Time relationships use genitive complements here; pronoun exercises require attention to speaker and addressee.|Complete the original choices. Explain the following noun’s case after before/after.
92|Compare the group paradigm|The summary brings the speaker/addressee patterns and time vocabulary together.|Reconstruct the source’s pronoun and verb comparisons, then check your memory against the table.
93|A new kind of plural agreement|Non-human plurals commonly take feminine singular agreement in this beginner pattern.|Compare the source’s people and objects. Explain why their pointing words or referring pronouns differ.
94|Turn objects into plurals|Changing the counted objects to plural does not mean using human plural agreement.|Complete every original object transformation and explain the agreeing demonstrative.
95|Choose by reference type|First identify whether a plural refers to people or to non-human things. Then choose the pointing word.|Complete the source’s near and far selections, giving a human/non-human reason each time.
96|Build the agreement map|The comparison tables show that number of objects and form of agreement are separate ideas.|Rebuild the original contrast tables and supply one new example of each pattern.
97|Read non-human plurals fluently|This continuation uses the same agreement rule inside fuller statements.|Read the source sentences and identify every adjective, pronoun or demonstrative agreeing with a non-human plural.
98|Answer about things|A question may contain plural objects, but the referring words in the answer follow the non-human rule.|Answer the original questions and complete the transformations without switching to human pronouns.
99|Supply an appropriate predicate|A suitable predicate must fit meaning as well as the agreement pattern.|Complete the original predicate task. Explain each choice and contrast it with a human plural example.
100|Consolidate plural vocabulary|This vocabulary review supports the same grammar rather than introducing a new agreement system.|Retrieve the source singular–plural pairs. Mark any pair that still requires deliberate recall.
101|Ask how many|The interrogative for quantity is followed here by a singular accusative noun, while the reply may use a dual.|Read the source dialogue. Separate the noun form in the question from the form in its numerical answer.
102|Answer with exactly two|The nominative dual ending communicates two; an agreeing adjective can also be dual.|Answer the source questions using the dual, checking the noun and any agreeing words.
103|Question and answer use different forms|The singular noun after the quantity question and the dual in an answer serve different constructions.|Complete the original questions and comparisons. Explain why you changed the number form.
104|Transform the whole phrase to dual|Dual demonstratives and nouns must be used together; possessive or descriptive material still needs attention.|Complete the original transformations and read both the masculine and feminine dual forms clearly.
105|Keep the dual vocabulary usable|Names of familiar objects let the new number category become practical rather than abstract.|Retrieve the source vocabulary and form a nominative dual for each suitable noun.
106|Count three to ten|For masculine counted nouns, this number group uses the familiar form ending in tāʾ marbūṭah.|Read the source conversation and identify the number, the counted noun and its singular gender.
107|Use counting in a statement|Numbers from three to ten form a construction with a plural genitive counted noun.|Read the source numerical phrases and explain why the counted noun is plural and genitive.
108|Answer with a numerical phrase|A prompt with a digit asks you to retrieve a spoken number and the proper counted-noun form.|Complete the original number responses and written-number tasks. Check meaning, gender and case separately.
109|Retrieve quantity vocabulary|The vocabulary supports money, price, time and other everyday quantities in the chapter.|Retrieve all source vocabulary. Write one original numerical phrase for each suitable counted noun.
110|Count feminine nouns|The form of the number changes when the singular counted noun is feminine.|Follow the source dialogue and compare each feminine numerical phrase with its masculine counterpart.
111|Read the feminine number pattern|The counted noun remains plural genitive; it is the number form that changes.|Complete the source reading and writing tasks, stating the singular gender before choosing the number.
112|Answer mixed quantity questions|The same question pattern can ask about brothers, sisters, objects or places; the answer must fit the noun.|Complete the original responses and explain the gender of the singular behind each plural.
113|Turn digits into meaningful Arabic|A written digit alone does not determine the correct Arabic word form.|Complete the source mixed-number exercise. Check the counted noun before writing the number.
114|Words, letters and sentences|The vocabulary extends the counting pattern to units of language.|Retrieve the source vocabulary and count a small set of words using an appropriate numerical phrase.
115|Read a school description|This cumulative reading brings locations, possessions, objects, plurals and numbers together.|Read the entire original passage. Sketch the school and annotate the relationships described by the sentences.
116|Answer from connected reading|Comprehension means finding the relevant information and expressing it in a grammatical answer.|Complete the source questions from the passage before rereading. Identify the sentence supporting each answer.
117|Connect people and places|The continuation reviews where people come from and introduces geographical vocabulary.|Complete the source tasks and organise the country/place vocabulary in your own table.
118|Notice no-tanwīn words|The reading brings together familiar names, colours, descriptions and plurals that do not take tanwīn.|Read the original passage and collect the no-tanwīn words before sorting them by pattern.
119|Organise the diptote categories|Several word groups share the absence of tanwīn. The pattern and word category matter, not a single spelling clue.|Study the original classification, then place your vocabulary examples into the corresponding groups.
120|Distinguish word pattern from context|An ordinary noun can lose tanwīn because of the article or iḍāfah; that alone does not make it a diptote.|Complete the original classification and vocabulary tasks. Explain the reason each relevant word lacks tanwīn.
121|A genitive can show fatḥah|A bare diptote remains genitive after a preposition even when its visible ending is fatḥah.|Follow the source dialogue and name the governing preposition or ownership relationship for each relevant noun.
122|Compare ordinary and diptote endings|The grammatical job can stay the same while its visible sign changes with the noun’s declension.|Read the original comparisons and sentences. State the case before naming its sign.
123|Read the exception in context|Places, owners and counted diptote plurals bring the same case principle into longer sentences.|Read every original sentence and explain the reason for each diptote ending you identify.
124|Count diptote plurals|The counted noun after three to ten is genitive; some plural patterns show that case with fatḥah.|Complete the original ending and number tasks. Contrast an ordinary plural genitive with a bare diptote plural genitive.
125|Use the contents as a map|The contents page is a navigation aid, not an additional grammar lesson.|Locate two early chapters and one chapter you want to revisit. Use the companion’s lesson links to return to them.
126|Plan your return visits|The remainder of the contents helps you find the later chapters for revision.|Choose one agreement chapter, one counting chapter and one diptote chapter for a later review session.
127|Recognise the closing material|This page belongs to the publication’s closing material rather than its assessed lesson sequence.|Check that you have completed the teaching pages you intended to study, and list the concepts you still want to revisit.
128|Finish with an honest record|The final publication page is not evidence of mastery. Learning comes from understanding and practising the lesson pages.|Review your actual page and quiz history. Make a realistic revision plan instead of treating reaching the last page as fluency.
`.trim();
export const bookPages = notes.split("\n").map((line) => {
  const [raw, title, focus, task] = line.split("|"),
    number = +raw;
  const index = chapterRanges.findIndex(([a, b]) => number >= a && number <= b);
  return {
    number,
    title,
    focus,
    task,
    lesson: index < 0 ? null : index + 1,
    kind: index < 0 ? "reference" : "study",
    printed: number >= 6 && number <= 126 ? number - 1 : null,
  };
});
export const pagesForLesson = (n) => bookPages.filter((p) => p.lesson === n);
export const pageUrl = (n) => `${PDF_URL}#page=${n}&view=FitH`;
export function pagePractice(page) {
  if (!page.lesson) return null;
  const n = page.lesson,
    u = units[n - 1],
    g = guides[n - 1],
    index = pagesForLesson(n).findIndex((p) => p.number === page.number);
  if (index % 3 === 0) {
    const q = u[8 + (index % 3)];
    return { prompt: q[0], options: q.slice(1), correct: q[1], why: u[5] };
  }
  if (index % 3 === 1) {
    const vocab = g.vocab[index % g.vocab.length];
    return {
      prompt: `Recall the meaning of ${vocab[0]} (${vocab[1]}).`,
      options: [
        vocab[2],
        ...g.vocab.filter((v) => v !== vocab).map((v) => v[2]),
      ],
      correct: vocab[2],
      why: `${vocab[0]} means “${vocab[2]}”. ${g.summary}`,
    };
  }
  return {
    prompt: "Which statement correctly explains this lesson?",
    options: [
      g.summary,
      "Arabic word endings never reflect grammatical relationships.",
      "A single correct answer removes the need to revisit a topic.",
    ],
    correct: g.summary,
    why: g.connection + " " + g.mistake,
  };
}
export function markPage(state, pageNumber, at = new Date()) {
  if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > 128)
    throw Error("Invalid page");
  return {
    ...state,
    pages: {
      ...state.pages,
      [pageNumber]: state.pages?.[pageNumber] || { at: at.toISOString() },
    },
  };
}
export function bookProgress(state, n) {
  const pages = n
    ? pagesForLesson(n)
    : bookPages.filter((p) => p.kind === "study");
  return {
    done: pages.filter((p) => state.pages?.[p.number]).length,
    total: pages.length,
  };
}
