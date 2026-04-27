export const TOPICS = {
  free: [
    {
      id: 'intro',
      label: 'Introduce yourself',
      prompt: 'Ask the student to introduce themselves — their name, where they are from, and what they do.',
      script: 'Hello, my name is Rahul and I am from Nagpur in Maharashtra. I have been working as a software developer for two years. In my free time, I like to read books and play cricket with my friends. I am really happy to be here and I want to improve my English speaking skills.',
    },
    {
      id: 'hobbies',
      label: 'Hobbies & interests',
      prompt: 'Start a conversation about the student\'s hobbies and interests outside of work.',
      script: 'I have a few hobbies that I really enjoy. I love reading books, especially self-help and fiction novels. I also enjoy cooking new recipes and watching movies on weekends. Playing badminton keeps me active and helps me relax after a long day at work.',
    },
    {
      id: 'hometown',
      label: 'Describe your hometown',
      prompt: 'Ask the student to describe their hometown — what it is like, what they like about it, how it has changed.',
      script: 'I am from Nashik, which is a city in Maharashtra. It is known for its grapes and wine production and also has many ancient temples. The city has grown a lot in recent years with new industries and better roads. I love my hometown because the people are very friendly and the cost of living is quite affordable.',
    },
    {
      id: 'career',
      label: 'Career goals',
      prompt: 'Ask the student about their career goals — what they want to do, why, and how they plan to get there.',
      script: 'My goal is to become a senior engineer in the next three years. I want to work on large projects and eventually lead a team. I am currently taking online courses and learning new skills to improve myself. I believe that consistent effort and a good attitude will help me reach where I want to go.',
    },
    {
      id: 'film',
      label: 'Favourite film or show',
      prompt: 'Ask the student about their favourite film or TV show and why they like it.',
      script: 'My favourite movie is Three Idiots. It is about three friends who study engineering together. I love it because it teaches us to follow our passion and not just work for money or marks. The story is very inspiring and also very funny. I have watched it at least five times and it never gets old.',
    },
    {
      id: 'daily',
      label: 'A typical day',
      prompt: 'Ask the student to walk you through what a typical day in their life looks like.',
      script: 'I usually wake up at seven in the morning and get ready for work. I commute to the office by bus which takes about thirty minutes. At work I attend meetings and complete my tasks until around six in the evening. After coming home I spend time with my family, have dinner, and read for a while before sleeping.',
    },
  ],

  interview: [
    {
      id: 'software',
      label: 'Software Engineer',
      prompt: 'Conduct a job interview for a junior Software Engineer role at an Indian IT services company.',
      script: 'Good morning, thank you for this opportunity. My name is Rahul and I have two years of experience in software development. I am skilled in Java and Python and I have worked on web applications and database projects. I am a quick learner and I enjoy solving problems. I am very excited about this role and I believe I can contribute a lot to your team.',
    },
    {
      id: 'support',
      label: 'Customer Support',
      prompt: 'Conduct a job interview for a Customer Support Executive role at a tech or e-commerce company.',
      script: 'Good morning, thank you for considering me for this position. I have one year of experience in customer service where I handled queries and resolved complaints. I am a patient listener and I always stay calm under pressure. I believe every customer deserves the best experience and I always try to go the extra mile to help them.',
    },
    {
      id: 'analyst',
      label: 'Business Analyst',
      prompt: 'Conduct a job interview for a Business Analyst role at a mid-sized Indian company.',
      script: 'Thank you for this opportunity. I am a business analyst with two years of experience in requirement gathering and process improvement. I am comfortable working with both technical and non-technical teams. I have experience creating reports, analyzing data, and presenting findings to management. I am very keen to apply my skills in a growing company like yours.',
    },
    {
      id: 'sales',
      label: 'Sales Executive',
      prompt: 'Conduct a job interview for a Sales Executive role. Focus on communication, persuasion, and handling objections.',
      script: 'Good morning. I am very passionate about sales and building customer relationships. I have one year of sales experience where I consistently met my monthly targets. I am a confident communicator and I enjoy talking to new people. I believe in understanding the customer\'s need before presenting any solution. I am ready to give my best to this role.',
    },
    {
      id: 'bank',
      label: 'Bank Officer',
      prompt: 'Conduct a job interview for a Bank Officer or Finance Executive role at a private Indian bank.',
      script: 'Good morning, thank you for calling me for this interview. I have a commerce degree and I am very interested in the banking sector. I am good with numbers, detail-oriented, and I understand the importance of accuracy in financial work. I have basic knowledge of banking products and KYC procedures. I am committed to earning the trust of every customer I serve.',
    },
    {
      id: 'hr',
      label: 'HR Executive',
      prompt: 'Conduct a job interview for an HR Executive role. Focus on people skills, conflict resolution, and communication.',
      script: 'Good morning. I have a passion for people and I believe a happy team is a productive team. I have experience in recruitment, onboarding, and employee engagement activities. I am a good communicator and I can handle sensitive situations with care and professionalism. I am excited about the opportunity to contribute to your organisation\'s culture and growth.',
    },
  ],

  workplace: [
    {
      id: 'standup',
      label: 'Daily standup',
      prompt: 'Set the scene: it is the morning standup. Ask the student to give their update — what they did yesterday, what they are doing today, and if they have any blockers.',
      script: 'Good morning everyone. Yesterday I completed the design document for the new feature and shared it with the team for review. Today I will start working on the backend API for user login. I do not have any blockers right now but I may need some help with the database structure later. I will reach out if I get stuck.',
    },
    {
      id: 'complaint',
      label: 'Customer complaint',
      prompt: 'Play an unhappy customer who has a problem with a product or service. The student must handle the complaint professionally and politely.',
      script: 'I completely understand your frustration and I sincerely apologize for the inconvenience. Please allow me to look into this issue right away. I assure you that we take all customer concerns very seriously. I will escalate this to the relevant team and get back to you within twenty four hours with a proper resolution. Thank you for your patience.',
    },
    {
      id: 'pitch',
      label: 'Pitch an idea',
      prompt: 'Play a manager. The student has requested time to pitch a new idea or improvement. Listen and ask questions.',
      script: 'Thank you for giving me this time. I have been thinking about a way to improve our team\'s productivity. My idea is to start a weekly knowledge sharing session where team members present what they have recently learned. This will help us grow together and stay updated with new technologies. I believe it can also improve team morale. I would love to hear your thoughts.',
    },
    {
      id: 'help',
      label: 'Ask for help',
      prompt: 'Play a senior colleague. The student is stuck on a problem and needs to ask for help clearly and professionally.',
      script: 'Hi, I hope I am not disturbing you. I am working on the data migration module and I have been stuck on a problem for about two hours. I have already tried a few different approaches but nothing is working. Could you please spare some time to look at my code? I think it will only take fifteen to twenty minutes and I would really appreciate your guidance.',
    },
    {
      id: 'newteam',
      label: 'New team intro',
      prompt: 'Set the scene: it is the student\'s first week on a new team. Play a friendly colleague and ask them to introduce themselves and share their background.',
      script: 'Hi everyone, I am really happy to be joining this team. My name is Rahul and I come from the product team where I worked on customer onboarding for the past two years. I have experience in both technical coordination and business processes, which I hope will be useful here. I am a team player and I look forward to learning from all of you.',
    },
    {
      id: 'delay',
      label: 'Explain a delay',
      prompt: 'Play a manager who is expecting a project update. The student must explain that there is a delay, give a reason, and propose a new timeline.',
      script: 'I wanted to give you an important update on the payment module. Unfortunately we have hit an unexpected technical issue that has caused a delay. The original deadline was this Friday but we now need three additional days to fix the issue and complete testing. I have already involved two senior developers to speed things up. I apologize for the delay and I will keep you updated every day until it is resolved.',
    },
  ],
}
