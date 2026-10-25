export const pointing = {
  title: "Pointing words: make two decisions",
  columns: ["Reference", "Nearby", "Farther away"],
  rows: [
    ["Masculine singular", "هَذَا", "ذَلِكَ"],
    ["Feminine singular", "هَذِهِ", "تِلْكَ"],
    ["Human plural, either gender", "هَؤُلَاءِ", "أُولَئِكَ"],
    ["Non-human plural (beginner agreement)", "هَذِهِ", "تِلْكَ"],
  ],
};
export const pronouns = {
  title: "Who is speaking, addressed, or spoken about?",
  columns: [
    "Meaning",
    "Independent pronoun",
    "Possessive ending",
    "An original ownership example",
  ],
  rows: [
    ["I / my", "أَنَا", "ـِي", "قَلَمِي"],
    ["You / your: one male", "أَنْتَ", "ـكَ", "قَلَمُكَ"],
    ["You / your: one female", "أَنْتِ", "ـكِ", "قَلَمُكِ"],
    ["He / his", "هُوَ", "ـهُ", "قَلَمُهُ"],
    ["She / her", "هِيَ", "ـهَا", "قَلَمُهَا"],
    ["We / our", "نَحْنُ", "ـنَا", "قَلَمُنَا"],
    ["You / your: male or mixed group", "أَنْتُمْ", "ـكُمْ", "قَلَمُكُمْ"],
    ["You / your: female group", "أَنْتُنَّ", "ـكُنَّ", "قَلَمُكُنَّ"],
    ["They / their: male group", "هُمْ", "ـهُمْ", "قَلَمُهُمْ"],
    ["They / their: female group", "هُنَّ", "ـهُنَّ", "قَلَمُهُنَّ"],
  ],
};
const tables = {
  1: {
    title: "Choose the kind of question",
    columns: ["Your intention", "Arabic pattern", "How to answer"],
    rows: [
      [
        "Identify an object",
        "مَا هَذَا؟",
        "Name the object in a complete statement.",
      ],
      [
        "Identify a person",
        "مَنْ هَذَا؟",
        "Identify the person or their role.",
      ],
      [
        "Confirm or correct",
        "أَهَذَا قَلَمٌ؟",
        "Use yes/no and a complete statement.",
      ],
    ],
  },
  2: {
    title: "Distance leaves the sentence intact",
    columns: ["Nearby", "Farther away", "What changed?"],
    rows: [
      [
        "هَذَا كُرْسِيٌّ",
        "ذَلِكَ كُرْسِيٌّ",
        "The pointing word, not the object noun.",
      ],
      ["هَذَا مِفْتَاحٌ", "ذَلِكَ مِفْتَاحٌ", "The object is farther away."],
    ],
  },
  3: {
    title: "Definite and indefinite are different meanings",
    columns: ["Indefinite noun", "Definite noun", "Read the change"],
    rows: [
      ["قَلَمٌ", "الْقَلَمُ", "a pen → the pen; no tanwīn after the article"],
      ["بَابٌ", "الْبَابُ", "a door → the door; the lām is pronounced"],
      [
        "شَمْسٌ",
        "الشَّمْسُ",
        "a sun → the sun; pronounce ash-shamsu, keeping the written lām",
      ],
    ],
  },
  4: {
    title: "A preposition governs the following noun",
    columns: ["Meaning", "Arabic", "Reason for the ending"],
    rows: [
      [
        "in a room",
        "فِي غُرْفَةٍ",
        "Indefinite, ordinary genitive noun after fī.",
      ],
      [
        "on the chair",
        "عَلَى الْكُرْسِيِّ",
        "Definite, ordinary genitive noun after ʿalā.",
      ],
      [
        "from the school",
        "مِنَ الْمَدْرَسَةِ",
        "The preposition is min; its connecting vowel helps pronunciation.",
      ],
      [
        "to the house",
        "إِلَى الْبَيْتِ",
        "Direction expressed with ilā; the noun is genitive.",
      ],
    ],
  },
  5: {
    title: "Ownership: keep the two grammatical jobs apart",
    columns: ["Construction", "First term", "Second term"],
    rows: [
      [
        "مِفْتَاحُ السَّيَّارَةِ",
        "Nominative here; no article or tanwīn.",
        "Genitive possessor; definite.",
      ],
      [
        "فِي بَيْتِ الطَّبِيبِ",
        "Genitive because the whole phrase follows fī.",
        "Genitive because it is the possessor.",
      ],
      [
        "بَابُ بَيْتٍ",
        "No article or tanwīn on the first term.",
        "An indefinite possessor: a door of a house.",
      ],
    ],
  },
  6: {
    title: "Gender belongs to the word",
    columns: ["Masculine example", "Feminine example", "Notice"],
    rows: [
      ["مُدَرِّسٌ", "مُدَرِّسَةٌ", "A common pattern adds tāʾ marbūṭah."],
      ["أَخٌ", "أُخْتٌ", "Some pairs use different vocabulary."],
      [
        "رَأْسٌ",
        "يَدٌ",
        "Some feminine nouns have no visible feminine ending.",
      ],
    ],
  },
  7: { ...pointing, rows: pointing.rows.slice(0, 2) },
  8: {
    title: "A noun phrase and a sentence do different work",
    columns: ["Arabic", "Meaning", "Complete thought?"],
    rows: [
      ["هَذَا مِفْتَاحٌ", "This is a key.", "Yes: identifies the object."],
      [
        "هَذَا الْمِفْتَاحُ",
        "this key",
        "No: a subject group awaiting information.",
      ],
      [
        "هَذَا الْمِفْتَاحُ صَغِيرٌ",
        "This key is small.",
        "Yes: the predicate supplies the new information.",
      ],
    ],
  },
  9: {
    title: "An adjective is not always a predicate",
    columns: ["Arabic", "Meaning", "Reasoning"],
    rows: [
      [
        "قَلَمٌ جَدِيدٌ",
        "a new pen",
        "Indefinite noun and indefinite adjective.",
      ],
      [
        "الْقَلَمُ الْجَدِيدُ",
        "the new pen",
        "Both words definite: a noun phrase.",
      ],
      [
        "الْقَلَمُ جَدِيدٌ",
        "The pen is new.",
        "Definite subject and indefinite predicate.",
      ],
      [
        "فِي غُرْفَةٍ صَغِيرَةٍ",
        "in a small room",
        "The adjective follows the feminine genitive noun.",
      ],
    ],
  },
  10: {
    title: "Attached ownership and special family forms",
    columns: ["Meaning", "Arabic", "What to notice"],
    rows: [
      ["my book", "كِتَابِي", "The first-person ending is long ī."],
      ["his father", "أَبُوهُ", "The nominative family form has long ū here."],
      [
        "your brother: to a male",
        "أَخُوكَ",
        "The possessor is an attached pronoun.",
      ],
      ["my brother", "أَخِي", "No extra ū before the first-person ending."],
      [
        "I have a sister",
        "لِي أُخْتٌ",
        "Use the belonging construction for a relationship.",
      ],
    ],
  },
  11: {
    title: "Follow a reference across sentences",
    columns: ["Earlier noun", "Reference", "How it connects"],
    rows: [
      [
        "الْبَيْتُ",
        "فِيهِ",
        "The house is masculine; use the masculine attached pronoun.",
      ],
      [
        "الْغُرْفَةُ",
        "فِيهَا",
        "The room is feminine; use the feminine attached pronoun.",
      ],
      [
        "اللُّغَةُ الْعَرَبِيَّةُ",
        "أُحِبُّ اللُّغَةَ الْعَرَبِيَّةَ",
        "The loved thing is the direct object; both noun and adjective are accusative.",
      ],
    ],
  },
  12: {
    title: "Read the syllables, then identify the person",
    columns: ["Arabic", "Transliteration", "Meaning"],
    rows: [
      ["ذَهَبَتْ", "dhahabat", "she went"],
      ["ذَهَبْتِ", "dhahabti", "you, one female, went"],
      ["ذَهَبْتَ", "dhahabta", "you, one male, went"],
      ["ذَهَبْتُ", "dhahabtu", "I went"],
    ],
  },
  13: {
    title: "Three plural patterns to recognise",
    columns: ["Singular", "Plural", "Pattern"],
    rows: [
      ["مُدَرِّسٌ", "مُدَرِّسُونَ", "Sound masculine plural, nominative."],
      [
        "مُدَرِّسَةٌ",
        "مُدَرِّسَاتٌ",
        "Sound feminine plural: long ā and open tāʾ.",
      ],
      ["قَلَمٌ", "أَقْلَامٌ", "Broken plural: internal shape changes."],
      [
        "كِتَابٌ",
        "كُتُبٌ",
        "Another broken plural; learn it with the singular.",
      ],
    ],
  },
  14: {
    title: "Group actions: read every syllable",
    columns: ["Participant", "Arabic", "Transliteration"],
    rows: [
      ["we went", "ذَهَبْنَا", "dhahabnā — final long ā"],
      ["they, women, went", "ذَهَبْنَ", "dhahabna — final short a"],
      ["you, male/mixed group, went", "ذَهَبْتُمْ", "dhahabtum"],
      [
        "they, men, went",
        "ذَهَبُوا",
        "dhahabū — the final written alif is silent",
      ],
    ],
  },
  15: {
    title: "Speaking to a female group",
    columns: ["Meaning", "Arabic", "Compare"],
    rows: [
      ["you, female group", "أَنْتُنَّ", "Addressing the women directly."],
      ["they, female group", "هُنَّ", "Speaking about the women."],
      [
        "your book, female group",
        "كِتَابُكُنَّ",
        "The owner is the group being addressed.",
      ],
      [
        "after the lesson",
        "بَعْدَ الدَّرْسِ",
        "The following noun is a genitive complement.",
      ],
      [
        "before the lesson",
        "قَبْلَ الدَّرْسِ",
        "The same relationship governs the following noun.",
      ],
    ],
  },
  16: {
    title: "People and things follow different plural agreement",
    columns: ["Reference", "Arabic statement", "Agreement"],
    rows: [
      [
        "human group",
        "هَؤُلَاءِ طُلَّابٌ مُجْتَهِدُونَ",
        "Human plural demonstrative and plural adjective.",
      ],
      [
        "books",
        "هَذِهِ كُتُبٌ جَدِيدَةٌ",
        "Non-human plural, feminine singular agreement.",
      ],
      [
        "houses",
        "الْبُيُوتُ كَبِيرَةٌ",
        "Plural noun in meaning, feminine singular predicate.",
      ],
    ],
  },
  17: {
    title: "Keep the rule while changing the context",
    columns: ["Arabic", "Meaning", "What stays consistent"],
    rows: [
      [
        "هَذِهِ الْأَقْلَامُ جَدِيدَةٌ",
        "These pens are new.",
        "Non-human plural agreement.",
      ],
      [
        "تِلْكَ الْبُيُوتُ صَغِيرَةٌ",
        "Those houses are small.",
        "Far demonstrative, still feminine singular.",
      ],
      [
        "هِيَ قَرِيبَةٌ",
        "They are near, referring to non-human things.",
        "The reference, not the English plural, determines the form.",
      ],
    ],
  },
  18: {
    title: "The question and its answer use different constructions",
    columns: ["Arabic", "Meaning", "Why this form?"],
    rows: [
      [
        "كَمْ قَلَمًا؟",
        "How many pens?",
        "Singular accusative noun after interrogative kam here.",
      ],
      [
        "قَلَمَانِ",
        "two pens",
        "Nominative dual ending expresses exactly two.",
      ],
      [
        "هَذَانِ قَلَمَانِ جَدِيدَانِ",
        "These are two new pens.",
        "Demonstrative, noun and adjective are dual.",
      ],
      [
        "هَاتَانِ سَاعَتَانِ",
        "These are two watches.",
        "Feminine nominative dual demonstrative.",
      ],
    ],
  },
  19: {
    title: "Numbers 3–10: masculine counted nouns",
    columns: ["Number", "With books", "Counted-noun rule"],
    rows: [
      [
        "3",
        "ثَلَاثَةُ كُتُبٍ",
        "Plural genitive; singular kitāb is masculine.",
      ],
      ["4", "أَرْبَعَةُ كُتُبٍ", "Plural genitive."],
      ["5", "خَمْسَةُ كُتُبٍ", "Plural genitive."],
      ["6", "سِتَّةُ كُتُبٍ", "Plural genitive."],
      ["7", "سَبْعَةُ كُتُبٍ", "Plural genitive."],
      ["8", "ثَمَانِيَةُ كُتُبٍ", "Plural genitive."],
      ["9", "تِسْعَةُ كُتُبٍ", "Plural genitive."],
      ["10", "عَشَرَةُ كُتُبٍ", "Plural genitive."],
    ],
  },
  20: {
    title: "Numbers 3–10: feminine counted nouns",
    columns: ["Number", "With cars", "Compare with the masculine set"],
    rows: [
      ["3", "ثَلَاثُ سَيَّارَاتٍ", "No tāʾ marbūṭah on the number."],
      ["4", "أَرْبَعُ سَيَّارَاتٍ", "Counted noun remains plural genitive."],
      ["5", "خَمْسُ سَيَّارَاتٍ", "Choose using singular sayyārah."],
      ["6", "سِتُّ سَيَّارَاتٍ", "Keep the shaddah on the number."],
      ["7", "سَبْعُ سَيَّارَاتٍ", "The number has no tāʾ marbūṭah."],
      [
        "8",
        "ثَمَانِي سَيَّارَاتٍ",
        "The long ī remains in this iḍāfah construction.",
      ],
      ["9", "تِسْعُ سَيَّارَاتٍ", "Plural genitive counted noun."],
      ["10", "عَشْرُ سَيَّارَاتٍ", "Notice the sukūn in ʿashr."],
    ],
  },
  21: {
    title: "Read in layers",
    columns: ["Original sentence", "First identify", "Then explain"],
    rows: [
      [
        "مَدْرَسَتُنَا وَاسِعَةٌ",
        "our school + spacious",
        "The attached possessor makes the subject definite.",
      ],
      [
        "فِيهَا أَرْبَعَةُ فُصُولٍ",
        "in it + four classrooms",
        "The suffix refers to the feminine school; the counted noun is plural genitive.",
      ],
      [
        "نَحْنُ نُحِبُّ مَدْرَسَتَنَا",
        "we + love + our school",
        "The school is the direct object, hence accusative.",
      ],
    ],
  },
  22: {
    title: "No tanwīn: ask why",
    columns: ["Arabic", "Reason", "Diptote?"],
    rows: [
      [
        "الْقَلَمُ",
        "The definite article removes tanwīn.",
        "No. It is an ordinary noun.",
      ],
      [
        "قَلَمُ الطَّالِبِ",
        "First term of an iḍāfah has no tanwīn.",
        "No. Context removed tanwīn.",
      ],
      ["أَحْمَدُ", "A proper name on a diptote pattern.", "Yes."],
      ["أَحْمَرُ", "A colour adjective on the relevant pattern.", "Yes."],
      ["مَفَاتِيحُ", "One of the diptote broken-plural patterns.", "Yes."],
    ],
  },
  23: {
    title: "Grammatical case and visible sign are separate",
    columns: ["Construction", "Case", "Visible sign and reason"],
    rows: [
      [
        "مِنْ بِلَالٍ",
        "Genitive",
        "Kasrah with tanwīn: ordinary triptote name.",
      ],
      [
        "مِنْ أَحْمَدَ",
        "Genitive",
        "Fatḥah: a bare diptote after a preposition.",
      ],
      [
        "قَلَمُ أَحْمَدَ",
        "Genitive possessor",
        "Fatḥah: diptote as the second term.",
      ],
      ["فِي الْمَسَاجِدِ", "Genitive", "Kasrah: the diptote has the article."],
      [
        "فِي مَسَاجِدِ الْقَرْيَةِ",
        "Genitive",
        "Kasrah: the diptote itself is the first term of iḍāfah.",
      ],
    ],
  },
};
export const tablesForLesson = (n) => {
  const allowed =
    n === 10
      ? [0, 1, 3, 4]
      : n === 12
        ? [0, 1, 2, 3, 4]
        : n === 13
          ? [0, 1, 2, 3, 4, 8, 9]
          : n === 14
            ? [0, 1, 2, 3, 4, 5, 6, 8, 9]
            : pronouns.rows.map((_, i) => i);
  return [
    tables[n],
    ...([10, 12, 13, 14, 15].includes(n)
      ? [{ ...pronouns, rows: allowed.map((i) => pronouns.rows[i]) }]
      : []),
  ].filter(Boolean);
};
