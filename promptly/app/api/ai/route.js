import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { messages, contentType } = await request.json();

    // Get the system prompt based on content type
    const systemPrompt = getSystemPrompt(contentType);

    // Combine system prompt with user messages
    const fullPrompt = `${systemPrompt}\n\nUser Request: ${
      messages[messages.length - 1].content
    }`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(fullPrompt);
    const response = result.response.text();

    return NextResponse.json({
      content: response,
    });
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
