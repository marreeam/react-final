import type { Language } from '@/types';

export interface TranslationSchema {
  // Navigation
  nav: {
    home: string;
    setup: string;
    history: string;
    about: string;
  };
  // Common
  common: {
    start: string;
    next: string;
    previous: string;
    finish: string;
    cancel: string;
    quit: string;
    retry: string;
    loading: string;
    of: string;
    close: string;
  };
  // Home page
  home: {
    tagline: string;
    title: string;
    subtitle: string;
    startQuiz: string;
    viewHistory: string;
    featuresTitle: string;
    feature1Title: string;
    feature1Text: string;
    feature2Title: string;
    feature2Text: string;
    feature3Title: string;
    feature3Text: string;
    statsPlayed: string;
    statsBest: string;
    statsAvg: string;
  };
  // Setup page
  setup: {
    title: string;
    subtitle: string;
    category: string;
    anyCategory: string;
    difficulty: string;
    anyDifficulty: string;
    easy: string;
    medium: string;
    hard: string;
    amount: string;
    questions: string;
    beginQuiz: string;
  };
  // Quiz page
  quiz: {
    question: string;
    timeLeft: string;
    quitTitle: string;
    quitMessage: string;
    loadingError: string;
  };
  // Results page
  results: {
    title: string;
    excellent: string;
    good: string;
    average: string;
    poor: string;
    youScored: string;
    correctAnswers: string;
    timeTaken: string;
    reviewTitle: string;
    yourAnswer: string;
    correctAnswer: string;
    notAnswered: string;
    playAgain: string;
    backHome: string;
    newScore: string;
  };
  // History page
  history: {
    title: string;
    subtitle: string;
    empty: string;
    emptyCta: string;
    clearAll: string;
    clearTitle: string;
    clearMessage: string;
    date: string;
    score: string;
    bestBadge: string;
  };
  // About page
  about: {
    title: string;
    intro: string;
    techTitle: string;
    featuresTitle: string;
  };
  // Not found
  notFound: {
    title: string;
    message: string;
    backHome: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      home: 'Home',
      setup: 'New Quiz',
      history: 'History',
      about: 'About',
    },
    common: {
      start: 'Start',
      next: 'Next',
      previous: 'Previous',
      finish: 'Finish',
      cancel: 'Cancel',
      quit: 'Quit',
      retry: 'Retry',
      loading: 'Loading',
      of: 'of',
      close: 'Close',
    },
    home: {
      tagline: 'Test your knowledge',
      title: 'Challenge your mind with QuizVerse',
      subtitle:
        'Thousands of trivia questions across dozens of categories. Pick a topic, race the clock, and climb your personal leaderboard.',
      startQuiz: 'Start a Quiz',
      viewHistory: 'View History',
      featuresTitle: 'Why you will love it',
      feature1Title: 'Endless Questions',
      feature1Text:
        'Powered by a live trivia API with fresh questions every round.',
      feature2Title: 'Beat the Clock',
      feature2Text:
        'A timer for every question keeps the adrenaline pumping.',
      feature3Title: 'Track Progress',
      feature3Text:
        'Your scores are saved locally so you can watch yourself improve.',
      statsPlayed: 'Quizzes played',
      statsBest: 'Best score',
      statsAvg: 'Average score',
    },
    setup: {
      title: 'Build your quiz',
      subtitle: 'Customize the challenge to match your mood.',
      category: 'Category',
      anyCategory: 'Any category',
      difficulty: 'Difficulty',
      anyDifficulty: 'Any difficulty',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      amount: 'Number of questions',
      questions: 'questions',
      beginQuiz: 'Begin Quiz',
    },
    quiz: {
      question: 'Question',
      timeLeft: 'Time left',
      quitTitle: 'Quit this quiz?',
      quitMessage:
        'Your current progress will be lost. Are you sure you want to leave?',
      loadingError:
        'We could not load questions for those settings. Please try different options.',
    },
    results: {
      title: 'Quiz complete!',
      excellent: 'Outstanding!',
      good: 'Well done!',
      average: 'Not bad!',
      poor: 'Keep practicing!',
      youScored: 'You scored',
      correctAnswers: 'Correct answers',
      timeTaken: 'Time taken',
      reviewTitle: 'Review your answers',
      yourAnswer: 'Your answer',
      correctAnswer: 'Correct answer',
      notAnswered: 'Not answered',
      playAgain: 'Play Again',
      backHome: 'Back Home',
      newScore: 'New personal best!',
    },
    history: {
      title: 'Your history',
      subtitle: 'Every quiz you have completed, saved on this device.',
      empty: 'No quizzes yet',
      emptyCta: 'Play your first quiz',
      clearAll: 'Clear all',
      clearTitle: 'Clear all history?',
      clearMessage:
        'This will permanently delete every saved result. This cannot be undone.',
      date: 'Date',
      score: 'Score',
      bestBadge: 'Best',
    },
    about: {
      title: 'About QuizVerse',
      intro:
        'QuizVerse is a single-page React application built to showcase modern front-end practices: hooks, routing, API integration, persistent storage, theming, localization, and smooth animations.',
      techTitle: 'Built with',
      featuresTitle: 'Highlights',
    },
    notFound: {
      title: 'Page not found',
      message: 'The page you are looking for wandered off somewhere.',
      backHome: 'Take me home',
    },
  },
  ka: {
    nav: {
      home: 'მთავარი',
      setup: 'ახალი ქვიზი',
      history: 'ისტორია',
      about: 'შესახებ',
    },
    common: {
      start: 'დაწყება',
      next: 'შემდეგი',
      previous: 'წინა',
      finish: 'დასრულება',
      cancel: 'გაუქმება',
      quit: 'გასვლა',
      retry: 'თავიდან',
      loading: 'იტვირთება',
      of: '/',
      close: 'დახურვა',
    },
    home: {
      tagline: 'შეამოწმე შენი ცოდნა',
      title: 'გამოწვევა შენი გონებისთვის QuizVerse-თან ერთად',
      subtitle:
        'ათასობით შეკითხვა ათეულობით კატეგორიაში. აირჩიე თემა, დაეჯიბრე დროს და აიწიე შენს პირად რეიტინგში.',
      startQuiz: 'ქვიზის დაწყება',
      viewHistory: 'ისტორიის ნახვა',
      featuresTitle: 'რატომ მოგეწონება',
      feature1Title: 'უსასრულო შეკითხვები',
      feature1Text:
        'იკვებება ცოცხალი trivia API-დან ყოველ რაუნდში ახალი შეკითხვებით.',
      feature2Title: 'დაეჯიბრე დროს',
      feature2Text: 'ტაიმერი ყოველ შეკითხვაზე ინარჩუნებს ადრენალინს.',
      feature3Title: 'თვალი ადევნე პროგრესს',
      feature3Text:
        'შენი ქულები ინახება ლოკალურად, რომ დაინახო შენი წინსვლა.',
      statsPlayed: 'ნათამაშები ქვიზები',
      statsBest: 'საუკეთესო ქულა',
      statsAvg: 'საშუალო ქულა',
    },
    setup: {
      title: 'შექმენი შენი ქვიზი',
      subtitle: 'მოარგე გამოწვევა შენს განწყობას.',
      category: 'კატეგორია',
      anyCategory: 'ნებისმიერი კატეგორია',
      difficulty: 'სირთულე',
      anyDifficulty: 'ნებისმიერი სირთულე',
      easy: 'მარტივი',
      medium: 'საშუალო',
      hard: 'რთული',
      amount: 'შეკითხვების რაოდენობა',
      questions: 'შეკითხვა',
      beginQuiz: 'ქვიზის დაწყება',
    },
    quiz: {
      question: 'შეკითხვა',
      timeLeft: 'დარჩენილი დრო',
      quitTitle: 'დავტოვოთ ქვიზი?',
      quitMessage:
        'მიმდინარე პროგრესი დაიკარგება. დარწმუნებული ხარ, რომ გინდა გასვლა?',
      loadingError:
        'ვერ ჩავტვირთეთ შეკითხვები ამ პარამეტრებით. გთხოვ სცადე სხვა ვარიანტები.',
    },
    results: {
      title: 'ქვიზი დასრულდა!',
      excellent: 'შესანიშნავია!',
      good: 'კარგი შედეგია!',
      average: 'ცუდი არ არის!',
      poor: 'გააგრძელე ვარჯიში!',
      youScored: 'შენი ქულაა',
      correctAnswers: 'სწორი პასუხები',
      timeTaken: 'დახარჯული დრო',
      reviewTitle: 'გადახედე პასუხებს',
      yourAnswer: 'შენი პასუხი',
      correctAnswer: 'სწორი პასუხი',
      notAnswered: 'უპასუხოდ',
      playAgain: 'თავიდან თამაში',
      backHome: 'მთავარზე დაბრუნება',
      newScore: 'ახალი რეკორდი!',
    },
    history: {
      title: 'შენი ისტორია',
      subtitle: 'ყველა დასრულებული ქვიზი, შენახული ამ მოწყობილობაზე.',
      empty: 'ჯერ არცერთი ქვიზი',
      emptyCta: 'ითამაშე პირველი ქვიზი',
      clearAll: 'ყველას წაშლა',
      clearTitle: 'წავშალოთ მთელი ისტორია?',
      clearMessage:
        'ეს სამუდამოდ წაშლის ყველა შენახულ შედეგს. მოქმედება შეუქცევადია.',
      date: 'თარიღი',
      score: 'ქულა',
      bestBadge: 'საუკეთესო',
    },
    about: {
      title: 'QuizVerse-ის შესახებ',
      intro:
        'QuizVerse არის ერთგვერდიანი React აპლიკაცია, შექმნილი თანამედროვე front-end პრაქტიკის საჩვენებლად: hooks, routing, API ინტეგრაცია, მუდმივი შენახვა, თემები, ლოკალიზაცია და გლუვი ანიმაციები.',
      techTitle: 'შექმნილია',
      featuresTitle: 'მთავარი შესაძლებლობები',
    },
    notFound: {
      title: 'გვერდი ვერ მოიძებნა',
      message: 'გვერდი, რომელსაც ეძებ, სადღაც გაქრა.',
      backHome: 'მთავარზე დაბრუნება',
    },
  },
};
