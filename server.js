const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'Spooky AI Backend is running!',
        status: 'active',
        endpoints: {
            generate: 'POST /api/generate',
            health: 'GET /'
        }
    });
});

// Content generation endpoint
app.post('/api/generate', async (req, res) => {
    try {
        const { contentType, theme, userPrompt } = req.body;
        
        // Validate input
        if (!contentType || !theme) {
            return res.status(400).json({ 
                error: 'Missing required fields: contentType and theme' 
            });
        }

        // Create the prompt for Groq API
        const prompt = createPrompt(contentType, theme, userPrompt);
        
        console.log('Generating content with prompt:', prompt.substring(0, 100) + '...');

        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [{ 
                    role: 'user', 
                    content: prompt 
                }],
                model: 'llama-3.1-8b-instant',
                temperature: 0.8,
                max_tokens: 800,
                top_p: 0.9
            })
        });

        if (!groqResponse.ok) {
            const errorData = await groqResponse.json();
            console.error('Groq API error:', errorData);
            return res.status(groqResponse.status).json({ 
                error: `Groq API error: ${errorData.error?.message || 'Unknown error'}` 
            });
        }

        const data = await groqResponse.json();
        const generatedContent = data.choices[0].message.content;

        res.json({ 
            success: true,
            content: generatedContent,
            type: contentType,
            theme: theme
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            error: 'Internal server error: ' + error.message 
        });
    }
});

// Helper function to create prompts
function createPrompt(contentType, theme, userPrompt) {
    const basePrompts = {
        story: `Write a ${theme} Halloween story`,
        costume: `Create a ${theme} Halloween costume idea`,
        party: `Design a ${theme} Halloween party theme`,
        social: `Write a ${theme} Halloween social media post`
    };

    let prompt = basePrompts[contentType] || `Create ${theme} Halloween content`;
    
    if (userPrompt) {
        prompt += `. Include these specific elements: ${userPrompt}`;
    }
    
    prompt += `. Make it creative, engaging, and perfectly suited for Halloween.`;
    
    return prompt;
}

// Start server
app.listen(PORT, () => {
    console.log(`🎃 Spooky AI Backend running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}`);
    console.log(`📍 Generate endpoint: http://localhost:${PORT}/api/generate`);
});