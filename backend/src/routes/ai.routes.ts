// backend/src/routes/ai.routes.ts
import { Router, Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';  
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured in environment variables.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate', authMiddleware, async (req: Request, res: Response) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: 'A prompt is required.' });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        res.status(200).json({ response: text });

    } catch (error) {
        console.error("Gemini API call via SDK failed:", error);
        res.status(500).json({ message: 'Failed to generate AI response.' });
    }
});

export default router;
