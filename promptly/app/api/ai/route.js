import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Configuration for the fine-tuned model
const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function POST(request) {
  try {
    const { messages, contentType } = await request.json();

    // Check for valid messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty messages array" },
        { status: 400 }
      );
    }

    // Get user's input from the latest message
    const userInput = messages[messages.length - 1].content;

    // Get the model instance based on content type
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig,
    });

    // Handle fine-tuned model prompts for different content types
    if (contentType === "linkedin") {
      const parts = [
        {
          text: "input: Write a LinkedIn post about a career journey in marketing. Format: Start with a humble beginning (salary under 75k), then describe 2-3 career challenges/transitions. Use a rhetorical question about job hopping. List 4 achievements using pointing finger emojis (👉). Each achievement should focus on growth and taking initiative. End with a personal touch about your background and an inspirational one-liner in italics. Include relevant hashtags. Tone: honest, vulnerable yet accomplished. Length: 8-10 paragraphs with short, punchy sentences.",
        },
        {
          text: "output: When I started off in my career as a marketer, I was making under 75k.\n\nI've gone through 3 acquisitions, being let go once for \"underperforming\" aka being pushed out, and then joining another right after a successful IPO.\n\nSome may call it job hopping, although do people even say that anymore, considering you have to look out for yourself?\n\nYou know what I have been able to do, though?\n\n👉 Increase my OTE by 15-30% each time I moved to a new role.\n\n👉 Took on additional responsibilities that I didn't have in the previous role that made me stand out more.\n\n👉 Learned how to structure my pay better vs. just being told this is what it is. Including equity!\n\n👉 Focus on creating an audience for myself that means I'll never have to apply to another job again.\n\nI'll finish 2022 nearly 3x-4x my initial earnings from work and other revenue streams I've created for myself.\n\nNot bad for a marketer who was a terrible student and only cared about playing baseball through school.\n\n*Don't let anyone hold you back or put a label on you.*\n\n#career #marketing",
        },
        {
          text: 'input: Write a LinkedIn post explaining the difference between two commonly confused marketing concepts. Format: Start with a bold statement claiming X is NOT Y. Use brain emojis (🧠) to define both terms clearly. Include a "When I..." section listing 5-6 specific deliverables. End with a metaphor about foundations/building. Keep sentences short and assertive. Include relevant industry hashtags. Tone: educational and authoritative. Length: 7-8 paragraphs.',
        },
        {
          text: "output: An editorial calendar is NOT a content strategy.\n\n🧠 Editorial calendar = a tactical document for tracking tasks (blog post, e-book) and subtasks (write, edit, publish)\n\n🧠 Content strategy = a strategic document that guides content planning, creation, distribution, and measurement\n\nWhen I design content strategies for my clients, they include:\n- The strategic recommendations deck\n- A content mapping spreadsheet\n- A campaign spreadsheet\n- Planning templates\n- Ops forms\n\nThe editorial calendar comes AFTER the strategy.\n\nPour the foundation THEN build the house.\n\n#balsays #b2b #contentmarketing",
        },
        {
          text: 'input: Write a LinkedIn post debunking a stereotype about [demographic] in [industry]. Format: Start with the stereotype in quotes, followed by "No. You\'re wrong." List 3 statistical facts using hyphens. Add a powerful summary statement. Then list 7-8 reasons why this demographic chooses certain roles over others, using hyphens. End with a mic-drop conclusion addressing industry recruiters. Include relevant hashtags. Tone: factual, assertive, advocacy-focused. Length: 10-12 paragraphs.',
        },
        {
          text: "output: \"Women don't like sales.\"\n\nNo. You're wrong.\n\nWomen make up\n- 67% of the 1.3 million active realtors in the US.\n- 80% of the 6.2 Million Direct Sellers (MLM) in the US.\n- 59% of the 1.2 Million insurance sales reps in the US.\n\nThat is 6.5 Million women in commission only sales roles, without benefits, who aren't afraid to cold call, handle objections, social sell, or ask for a sale.\n\nYou know why they choose those roles and not SaaS Sales?\n\n- no degree requirements\n- flexible schedules, option of part time\n- remote work\n- low barrier to entry\n- on the job training\n- allure of lucrative income\n- can still be a present spouse & parent\n\nIf you're still wondering how to get more women in tech sales, there's your answer.\n\n#saassales #womeninsales #saleshiring #womenintech",
        },
        {
          text: 'input: Write a LinkedIn post critiquing networking behaviors. Format: Start with a bold statement about LinkedIn networking followed by a facepalm emoji (🤦‍♀️). Include a "controversial hook" in the second line mentioning that people will hate this post. Describe a common problematic behavior on LinkedIn using short, direct paragraphs. Include personal positioning statements about how you do things differently. End with a sales analogy and a forward-looking conclusion. Tone: bold, truthful, slightly controversial but constructive. Use short paragraphs for emphasis. Length: 15-18 paragraphs, mostly 1-2 sentences each.',
        },
        {
          text: "output: 80% of LinkedIn is networking backwards 🤦‍♀️\n\nPeople will HATE this post.\n\nBut I'm calling it out regardless.\n\nThe engagement pod game is coming on strong on LinkedIn.\n\nMeaning influencers only engage and support other influencers.\n\nCliques make it obvious who their close connections are.\n\nPeople just don't want to engage beyond their existing circle.\n\nI consistently see mediocre content get hyped up just because someone has a large following or they are friends with certain people.\n\nThis is truly why the large follower accounts get bigger while the small accounts stay small.\n\nThis is ALSO why I engage with anyone and everyone's content.\nExcept those make it obvious that their clique is an elite member club 🤦‍♀️\n\nMy best networking strategy is to be generous with my engagement.\n\nWhenever I see an arising content creator, I engage.\n\nThe best people to have in your corner aren't always the folks with the biggest following or brands.\n\nValuable connections come in all shapes and sizes.\n\nAs sales people we are taught to nurture opportunities when prospects aren't ready to buy.\n\nWhy is it any different on LinkedIn when we are networking?\n\nSomeone who doesn't have a lot of connections today, doesn't mean they won't have them tomorrow.",
        },
        {
          text: "input: Write a LinkedIn post about platform analytics trends. Format: Start with a supportive message to content creators about a current challenge. Present specific data points using arrow emojis (➡️) showing percentage decreases. Include personal statistics for credibility. End with two engaging questions using question mark emojis (❓). Add a clear call-to-action section separated by dashes, including profile engagement options and a branded hashtag. Tone: analytical, supportive, data-driven. Length: 10-12 paragraphs with clear spacing between sections.",
        },
        {
          text: "output: Just a quick shout out to content creators! If you see less impressions and lower reach, it's probably not just you.\n\nWe've seen a serious decrease in impressions in the last month, with equal engagement.\n\nThese are some numbers but we are still researching:\n\n➡️ -25% (!) on posts with more or less same engagement (likes and comments)\n\n➡️ -30% less impressions for text only posts\n\n➡️ -20% reach for document posts\n\n➡️ -35% reach for Newsletters (with over 15,000 subscribers)\n\nMore data will follow in september, but my own stats went down from 18,000 average impressions per post to 14,000 average.\n\n❓ Have you had similar experiences?\n❓ What content performs the best for you?\n\n------------------------------\nLiked this post? Want to see more?\n🔔 Ring it on my Profile\nFollow #LinkedInByRichardvanderBlom\n🤝 Connect with me",
        },
        {
          text: 'input: Write a LinkedIn post about common recruiting mistakes. Format: Start with three common recruiting phrases in quotes. Follow with "Here is why" and a pointing down emoji (👇). Explain the main limitation of traditional job posts. Structure the content around "3 relevant audiences" you\'re missing, explaining each one in detail. Add a crucial reminder about employer branding. End with an actionable takeaway about effort vs. reward. Include relevant recruiting hashtags. Tone: instructive, insightful, solution-oriented. Length: 9-11 paragraphs, with clear audience segmentation.',
        },
        {
          text: 'output: "We are hiring," "Join our team," "Here are our open positions."\n\nIf this is the way you are communicating your job ads on LinkedIn, you are losing candidates. Here is why 👇\n\nYour post will only attract people actively looking for a new job. And usually, that is a minority.\n\nYou are failing to attract 3 relevant audiences.\n\nFirst, people who are not actively looking for a new job but could be interested in seeing what you are offering. They could consider applying or approaching you for more information if you get their attention.\n\nSecond, the friends and family of potential candidates. If you get their attention, they will refer your post to those interested.\n\nThird, people who are not interested in this particular job, but might decide to visit your careers page and find another position that is a better fit.\n\nIn addition, never lose sight of how people perceive you and your company. If you don\'t show that you care about your open position, why should the candidates?\n\nA few extra minutes of your time can make a big difference in attracting talent.\n\n#sourcing #recruiting #talentacquisition',
        },
        {
          text: 'input: Write a LinkedIn post about misconceptions in SEO. Format: Start by stating a common assumption in the industry. Follow with why this made sense historically. Use a specific example with real numbers (include search volume). Describe the current reality using concrete data. Provide actionable advice starting with "Start by..." Then list 3 specific tips using "1/, 2/, 3/" format. End with a reminder about outdated thinking and a call to action. Tone: educational, authoritative, practical. Length: 12-15 paragraphs with clear structure and spacing.',
        },
        {
          text: 'output: A lot of Marketers assume SEO ranks are stable.\n\nOnce you rank #1 (or any position for that purpose), you "made it" and will stay there with a little maintenance work.\n\nIt makes sense to think that way because that\'s how it used to be.\n\nBut not anymore.\n\nAn example: the ranks for "black dress" (a keyword with 209,000 monthly searches in the US alone) flip almost daily.\n\nThe top 3 results have been bouncing between positions #1 and #7 over the last 6 months.\n\nWe need to anticipate rank fluctuations and define healthy position ranges, so we can optimize pages when they rank outside them.\n\nStart by monitoring rank fluctuations for your keywords, either in a 3rd party tool like Semrush or Ahrefs or with Google Search Console.\n\nA few more tips:\n\n1/ Analyze your top keywords and how much they fluctuate (will differ by competitiveness, user intent, etc.)\n\n2/ Add rank fluctuations to your organic traffic projections\n\n3/ Define alerts when keywords cross healthy rank ranges (most rank trackers can do this)\n\nRemember, using the outdated mental model of stable ranks means your traffic projections might be faulty and you constantly stress out over dropping ranks.\n\nGoogle is constantly a/b testing different results.\n\nUse the approach above and build a model for your site.',
        },
        {
          text: 'input: Write a LinkedIn post sharing a content strategy tip. Format: Start by teasing a discovery. Use casual language like "gonna let you steal it." Present a simple formula: combining personal milestones with valuable insights. Provide 3 specific examples in quotes, following a clear pattern. End with a simple explanation of why it works, followed by a two-word call to action ("Try it."). Add "P.S. ⚡" at the end. Include relevant hashtags. Tone: friendly, sharing-insider-knowledge. Length: 8-10 short paragraphs.',
        },
        {
          text: 'output: I recently discovered a hyper-effective LinkedIn post strategy.\n\nAnd today, I\'m gonna let you steal it.\n\nHere it is:\n\nCombine significant life events with useful content.\n\n"I turn 32 today. Here are 32 things I wish I knew 10 years ago."\n\n"My business hit $1 million ARR today. Here\'s how I built it."\n\n"I was offered my dream job today. Here are 7 steps I took to get it."\n\nThe event attracts engagement and the content attracts followers.\n\nTry it.\n\nP.S. ⚡\n\n#writing #linkedin #contentcreation',
        },
        {
          text: `input: Write a LinkedIn post about ${userInput}. Format: Start by teasing a success story. Present a simple formula: combining personal milestones with valuable insights. Include relevant hashtags. Tone: friendly, sharing-insider-knowledge.`,
        },
        { text: "output: " },
      ];

      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
      });

      return NextResponse.json({
        content: result.response.text(),
      });
    } else if (contentType === "indiehacker") {
      // Example of another fine-tuned model format
      const parts = [
        {
          text: "input: Write a LinkedIn post about a career journey in marketing. Format: Start with a humble beginning (salary under 75k), then describe 2-3 career challenges/transitions. Use a rhetorical question about job hopping. List 4 achievements using pointing finger emojis (👉). Each achievement should focus on growth and taking initiative. End with a personal touch about your background and an inspirational one-liner in italics. Include relevant hashtags. Tone: honest, vulnerable yet accomplished. Length: 8-10 paragraphs with short, punchy sentences.",
        },
        {
          text: "output: When I started off in my career as a marketer, I was making under 75k.\n\nI've gone through 3 acquisitions, being let go once for \"underperforming\" aka being pushed out, and then joining another right after a successful IPO.\n\nSome may call it job hopping, although do people even say that anymore, considering you have to look out for yourself?\n\nYou know what I have been able to do, though?\n\n👉 Increase my OTE by 15-30% each time I moved to a new role.\n\n👉 Took on additional responsibilities that I didn't have in the previous role that made me stand out more.\n\n👉 Learned how to structure my pay better vs. just being told this is what it is. Including equity!\n\n👉 Focus on creating an audience for myself that means I'll never have to apply to another job again.\n\nI'll finish 2022 nearly 3x-4x my initial earnings from work and other revenue streams I've created for myself.\n\nNot bad for a marketer who was a terrible student and only cared about playing baseball through school.\n\n*Don't let anyone hold you back or put a label on you.*\n\n#career #marketing",
        },
        {
          text: "input: Write a LinkedIn post about the life of an Indie Hacker. Format: Start by teasing a success story.  Present a simple formula: combining personal milestones with valuable insights. Include relevant hashtags. Tone: friendly, sharing-insider-knowledge.",
        },
        {
          text: "output: Woke up to another day of total control and complete uncertainty as an Indie Hacker.\n\nYesterday's tiny win? Seeing those few extra sign-ups trickle in.\n\nHere is the formula that got me this far:\n\nObsessive dedication + sleepless nights + coffee (lots of it) + ignoring all advice + sheer dumb luck.\n\nHere's how you build your own mini-empire. Be willing to grind harder than anyone else and sacrifice everything.\n\n#indiehacker #startup #entrepreneurship #buildinpublic",
        },
        {
          text: `input: Write a LinkedIn post about ${userInput}. Format: Start by explaining the paradise life, then gradually shift towards the challenges. Present a simple formula: combining the false dreams, the struggles and the rewards. Add a "P.S. " line at the end. Include relevant hashtags. Tone: friendly, sharing-insider-knowledge.`,
        },
        { text: "output: " },
      ];

      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
      });

      return NextResponse.json({
        content: result.response.text(),
      });
    } else {
      // For other content types, use the standard approach with system prompts
      const systemPrompt = getSystemPrompt(contentType);
      const prompt = `${systemPrompt}\n\nUser Request: ${userInput}`;

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const result = await model.generateContent(prompt);

      return NextResponse.json({
        content: result.response.text(),
      });
    }
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      { error: "Error processing your request" },
      { status: 500 }
    );
  }
}

function getSystemPrompt(contentType) {
  const prompts = {
    youtube: `You are an expert YouTube script writer. Create engaging, well-structured video scripts that follow this format:
      - Hook (attention-grabbing opening)
      - Introduction
      - Main points (with timestamps)
      - Call to action
      Keep the tone conversational and engaging.`,

    blog: `You are an expert blog writer. Create well-researched, SEO-friendly articles that are:
      - Engaging and informative
      - Well-structured with headings
      - Include examples and actionable tips
      - Natural keyword integration`,

    linkedin: `You are a LinkedIn content expert. Create professional posts that:
      - Are concise and valuable
      - Include relevant hashtags
      - Drive engagement
      - Maintain professional tone`,

    instagram: `You are an Instagram content creator. Create engaging posts that:
      - Are visually descriptive
      - Include relevant hashtags
      - Have an engaging caption
      - Include a call to action`,
  };

  return (
    prompts[contentType] || "You are a helpful content creation assistant."
  );
}
