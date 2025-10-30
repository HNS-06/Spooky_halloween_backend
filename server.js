const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Enhanced content examples for better fallback
const enhancedContentExamples = {
    story: {
        scary: [
            "The ancient vampire castle stood silent under the blood-red moon. As you approached, the massive oak doors creaked open revealing a hallway lined with portraits of pale, sharp-toothed nobles. A cold voice whispered from the shadows: 'We've been expecting you...' The portraits' eyes began to follow your every move, and you realized too late that you were not the visitor - you were the invited dinner guest.",
            "In the abandoned asylum, every door you closed would open again. The faint sound of dragging chains grew closer with each passing minute. Suddenly, all the doors slammed shut at once, trapping you in the hallway. From the darkness came a soft, childlike giggle that echoed through the corridor, growing louder until it was right behind you."
        ],
        funny: [
            "Gary the ghost was terrible at haunting. Instead of 'Boo!', he'd accidentally say 'Boo-boo!' and then apologize profusely. The other ghosts were holding an intervention: 'Gary, you're giving ghosts a bad name! Yesterday you helped that family find their lost cat instead of scaring them!' Gary sighed, 'But they looked so worried!'",
            "When Dracula tried modern dating apps, he kept getting rejected. His profile: 'Night owl seeking companion for eternal darkness. Must love bats and not be allergic to dramatic capes. No garlic enthusiasts please.' After zero matches, he updated his profile to include 'eternal loyalty' and 'excellent at avoiding sunlight' - still no luck."
        ],
        classic: [
            "The full moon cast eerie shadows through the haunted forest. In the distance, a lone wolf howled as mist crept between the ancient trees. Something was moving in the darkness, something that hadn't walked these woods in centuries. The air grew cold, and the scent of decay filled your nostrils. You were being hunted by something that existed only in nightmares.",
            "The antique music box began playing on its own, the same tune your great-grandmother used to hum. But she'd been dead for fifty years, and the music box had been broken since her funeral. As the melody filled the room, the temperature dropped dramatically. In the mirror, you saw a pale hand rest on your shoulder, but when you turned - nothing was there."
        ],
        family: [
            "Little Timmy discovered his toy dinosaurs came to life at night. Instead of being scary, they had a tea party in his bedroom and told stories about the 'ancient times' (last week). The T-Rex complained about his short arms while the Stegosaurus bragged about his fancy back plates. They were planning a surprise birthday party for Timmy's teddy bear!",
            "The friendly ghost in the library wasn't scary at all! He helped children find the best books and occasionally made the pages turn by themselves when someone couldn't reach. His name was Arthur, and he'd been the librarian for 200 years. He particularly loved helping with homework, though his history facts were a bit outdated."
        ]
    },
    costume: {
        scary: [
            "**Ancient Vampire Lord**\n\nTransform into a timeless creature of the night with this sophisticated vampire costume. Start with a black suit or formal wear, add a dramatic floor-length cape with blood-red lining. Use pale makeup with dramatic contouring to create a gaunt, aristocratic appearance. Add realistic fangs and carefully applied 'blood' droplets at the corners of your mouth. Carry a vintage wine glass filled with 'blood' (cranberry juice with edible glitter). Complete the look with slicked-back hair and an air of ancient menace.\n\nMaterials needed: Black suit/cape, white face paint, fake fangs, red food coloring, vintage glass, dramatic attitude",
            "**Cursed Doll**\n\nBecome the stuff of nightmares with this terrifying doll costume. Wear vintage-style clothing that's slightly torn and dirty. Use makeup to create porcelain-like skin with cracks and subtle 'damage.' Add oversized, unblinking eyes using contacts or creative eye makeup. Carry a matching 'twin' doll prop that occasionally moves on its own. Practice jerky, unnatural movements to complete the eerie effect.\n\nMaterials needed: Vintage dress, white face paint, black eyeliner, doll prop, messy wig"
        ],
        funny: [
            "**Ghost with WiFi Problems**\n\nThis modern twist on the classic ghost costume is perfect for tech-savvy Halloween parties! Wear a simple white sheet with 'Buffering...' written on the front in spooky letters. Carry a router prop with blinking lights and look constantly frustrated. Add accessories like a laptop bag and coffee cup labeled 'Tech Support Tears.' When people ask what's wrong, complain about the 'spiritual bandwidth' in the area.\n\nMaterials needed: White sheet, black marker, old router, frustrated expression, tech accessories",
            "**Zombie Accountant**\n\nThe undead still have to file taxes! Wear a torn business suit with zombie makeup. Carry a calculator that occasionally spouts random numbers and a ledger with entries like 'BRAINS: 15, EXPENSES: 0.' Add touches like a name tag that says 'Dave - I was almost done with the quarterly reports!' and trail 'important documents' behind you.\n\nMaterials needed: Business attire, zombie makeup, calculator, ledger, sense of humor"
        ],
        classic: [
            "**Classic Vampire**\n\nTimeless elegance meets supernatural horror. Wear formal black attire with a high-collared cape. Create a pale complexion with powder, accentuated by dark, smoky eyes and sharply defined eyebrows. Add realistic fangs and subtle 'blood' stains. Carry a single red rose and move with graceful, predatory elegance. This costume never goes out of style and works for any Halloween event.\n\nMaterials needed: Formal wear, cape, white face powder, fake fangs, red rose, dramatic flair",
            "**Traditional Witch**\n\nThe classic Halloween witch with a sophisticated twist. Wear a long black dress with subtle purple or green accents. Add a pointed hat decorated with celestial patterns or silver thread. Carry an ornate broom and a spell book. Use green makeup with dramatic eye shadow and a 'mole' on the nose. This costume balances spooky and stylish perfectly.\n\nMaterials needed: Black dress, pointed hat, broom, spell book, green makeup"
        ],
        family: [
            "**Friendly Ghost**\n\nPerfect for young children or those who prefer cute over creepy! Wear a simple white sheet or ghost-shaped costume with a happy, smiling face. Add cute details like rosy cheeks or a little bow tie. Carry a tiny treat bucket that says 'Boo-tiful treats!' This costume is comfortable, easy to make, and guaranteed to bring smiles instead of screams.\n\nMaterials needed: White fabric, felt for face, treat bucket, friendly attitude",
            "**Pumpkin Prince/Princess**\n\nA delightful and seasonal costume that's perfect for family events. Wear orange clothing with green accents to resemble a pumpkin stem. Create a pumpkin-shaped hat or wear an orange tutu. Add a friendly pumpkin face with makeup and carry a miniature pumpkin basket. This costume is cheerful, comfortable, and celebrates the harvest season.\n\nMaterials needed: Orange clothing, green hat, pumpkin basket, face paint"
        ]
    },
    party: {
        scary: [
            "**Haunted Vampire Castle**\n\nTransform your space into an ancient Transylvanian castle with this immersive theme. Use black and deep red as your primary colors with velvet drapes, candelabras, and antique-looking furniture. Create a 'blood bar' serving red cocktails in fancy glasses. Activities include a vampire transformation station with professional makeup, a coffin photo booth, and 'blood' tasting of different red beverages. Play classical music with occasional wolf howls and thunder sounds.\n\nDecorations: Black tablecloths, red roses, candlesticks, fake cobwebs, coffin props, antique mirrors\nFood: Blood-red velvet cake, 'garlic-free' snacks, dark chocolate treats\nDrinks: Vampire's Kiss cocktail, Transylvanian Twilight punch",
            "**Asylum Escape**\n\nCreate the terrifying atmosphere of an abandoned mental hospital. Use flickering fluorescent lights, scattered 'medical records,' and restraining equipment props. Set up padded cell corners and gurneys. Activities include 'mad scientist' experiments with dry ice, straitjacket races, and an 'escape the asylum' scavenger hunt. The ambiance should feel unsettling and slightly dangerous.\n\nDecorations: Medical equipment, straightjackets, flickering lights, medical charts, caution tape\nFood: 'Experimental' colorful snacks, 'pills' (candy), syringe drinks\nDrinks: Medicated madness punch, shock therapy shots"
        ],
        funny: [
            "**Monster Office Party**\n\nWhere the supernatural meets the corporate world! Each monster has a day job - Vampire HR manager, Zombie IT support, Ghost office manager. Include 'monster resumes' at the entrance and office-themed games like 'Pin the Tie on the Zombie' and 'Werewolf Team Building Exercises.' Create cubicle decorations and have a 'water cooler gossip' station.\n\nDecorations: Office supplies, name tags, corporate-themed monster props, cubicle partitions\nFood: 'Deadline' pizza, 'Paperwork' sandwiches, 'Budget Cut' cupcakes\nDrinks: Coffee of the living dead, executive blood orange punch",
            "**Zombie Prom**\n\nThe undead never looked so good! Recreate a high school prom from the zombie apocalypse. Use torn streamers, broken disco balls, and 'blood'-stained decorations. Activities include a 'best zombie walk' contest, 'most creative wound' competition, and dancing to spooky remixes of popular songs. Encourage torn formal wear and creative undead makeup.\n\nDecorations: Torn streamers, broken mirrors, 'bloody' handprints, caution tape\nFood: Brain-shaped desserts, 'finger' foods, decaying fruit platters\nDrinks: Zombie punch, toxic waste cocktails"
        ],
        classic: [
            "**Traditional Halloween Gathering**\n\nCelebrate Halloween the classic way with orange and black decorations, pumpkin everything, and timeless activities. Set up multiple pumpkin carving stations with templates and tools. Include traditional games like bobbing for apples, pin the stem on the pumpkin, and a costume parade. Play spooky but not-too-scary music and tell ghost stories around a 'campfire' (LED candles).\n\nDecorations: Pumpkins, black cats, witches hats, orange lights, autumn leaves\nFood: Caramel apples, pumpkin pie, ghost-shaped cookies, witch's brew stew\nDrinks: Apple cider, hot chocolate with marshmallow ghosts, pumpkin spice cocktails",
            "**Haunted Mansion**\n\nElegant spookiness for a sophisticated Halloween gathering. Use vintage decor, crystal ball centerpieces, and formal table settings in black and silver. Activities include tarot card readings, seances, and a mystery murder game. The atmosphere should feel like an elegant party that happens to be attended by ghosts.\n\nDecorations: Crystal balls, vintage frames, formal table settings, silver accents\nFood: Elegant hors d'oeuvres, decadent desserts, sophisticated snacks\nDrinks: Classic cocktails with spooky names, champagne with blackberry garnish"
        ],
        family: [
            "**Family Friendly Monster Mash**\n\nPerfect for all ages with bright colors, friendly monsters, and fun activities. Set up multiple craft stations for making Halloween decorations, cookie decorating with spooky shapes, and pumpkin painting (safer than carving for little ones). Include a not-too-spooky costume parade and monster-themed games like 'pin the nose on the pumpkin' and 'ghost bowling.'\n\nDecorations: Colorful monsters, friendly ghosts, pumpkin lights, autumn harvest themes\nFood: Monster mouth apples, pumpkin-shaped sandwiches, ghost cookies, veggie skeletons\nDrinks: Witch's brew punch (green juice), hot apple cider, chocolate milk with spooky straws",
            "**Enchanted Pumpkin Patch**\n\nCreate a magical autumn wonderland perfect for families. Use fairy lights, hay bales, and plenty of pumpkins of all sizes. Activities include pumpkin decorating, fairy tale storytelling, and a scavenger hunt for magical creatures. Include a 'wishing well' where children can make Halloween wishes and receive small treats.\n\nDecorations: Fairy lights, hay bales, pumpkins, autumn leaves, magical creatures\nFood: Pumpkin muffins, caramel corn, magical fruit wands, enchanted cookies\nDrinks: Fairy potion punch, hot chocolate with magic marshmallows, sparkling cider"
        ]
    },
    social: {
        scary: [
            "👻 THE HAUNTING BEGINS TONIGHT! 🎃\n\nSomething wicked this way comes... Are you ready to face your fears? The spirits are restless and the veil is thin. 🔮\n\nStay inside after dark. Lock your windows. Check under your bed.\n\nBecause tonight... they're checking too. 😱\n\n#Halloween #SpookySeason #Haunted #GhostStories #Terrifying #HorrorNight",
            "🧛‍♂️ BEWARE THE NIGHT! 🦇\n\nWhen the moon rises, they awaken. Vampires, werewolves, and things that go bump in the night are waiting... Do you dare venture out after dark? 🌕\n\nYour heartbeat is like a dinner bell.\nYour shadow might not be your own.\nThe night has eyes. 👁️\n\n#Vampire #Werewolf #HalloweenNight #Spooky #Horror #Darkness"
        ],
        funny: [
            "🎃 MY PUMPKIN HAS TRUST ISSUES 👻\n\nMe: Let's carve a happy face!\nPumpkin: How about existential dread instead?\n\nMy jack-o-lantern is currently in therapy discussing its inner emptiness. 🛋️\n\nHappy Spooky Season! 😂\n\n#HalloweenHumor #PumpkinProblems #FunnyHalloween #SpookySeason #PumpkinTherapy",
            "🧟‍♂️ ZOMBIE DATING PROFILE 💀\n\n• Looking for: BRAINS and maybe some Netflix\n• Interests: Moaning, shuffling, dramatic entrances\n• Turn-offs: Running, shotguns, fire\n• Perfect first date: Graveyard picnic at midnight\n\nSwipe right if you're dead inside too! 😂\n\n#ZombieHumor #HalloweenFun #DatingStruggles #UndeadDating #SpookySeason"
        ],
        classic: [
            "🎃 HAPPY HALLOWEEN! 🍬\n\nWishing you a night filled with spooky fun, sweet treats, and magical memories! May your jack-o-lanterns glow bright and your candy buckets overflow! ✨\n\nFrom ghostly gatherings to trick-or-treat adventures, may your Halloween be absolutely boo-tiful! 👻\n\nShare your Halloween photos below! 📸\n\n#HappyHalloween #TrickOrTreat #HalloweenFun #SpookySeason #HalloweenMagic",
            "👻 IT'S THE GREAT PUMPKIN, CHARLIE BROWN! 🎃\n\nClassic Halloween vibes only! Time for pumpkin patches, costume planning, and watching our favorite spooky specials. What's your Halloween tradition? 🍂\n\nMine involves:\n• Too much candy corn\n• Classic horror movies\n• Trying not to jump at every noise\n• Perfecting my spooky playlist\n\n#ClassicHalloween #GreatPumpkin #HalloweenTraditions #SpookySeason #ChildhoodMemories"
        ],
        family: [
            "🎃 FAMILY HALLOWEEN FUN! 👨‍👩‍👧‍👦\n\nPumpkin carving, costume making, and making spooky memories together! Halloween is all about family fun and creating magical moments. Share your family Halloween photos below! 📸\n\nOur favorite traditions:\n• Family costume themes\n• Halloween movie marathon\n• Baking spooky treats together\n• Backyard 'haunted' garden\n\nWhat are your family's Halloween traditions? 🎃\n\n#FamilyHalloween #HalloweenFun #FamilyTime #SpookySeason #FamilyTraditions",
            "👻 KID-FRIENDLY HALLOWEEN IDEAS! 🍬\n\nLooking for not-too-spooky Halloween fun? Try these family-friendly activities:\n• Pumpkin decorating (safer than carving!)\n• Halloween cookie baking and decorating\n• Friendly ghost stories by flashlight\n• Costume fashion show with prizes!\n• Monster mash dance party\n\nWhat are your family-friendly Halloween plans? 🎃\n\n#KidFriendly #HalloweenWithKids #FamilyFun #SpookySeason #ParentingHacks"
        ]
    }
};

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

        // Check if API key is available
        if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
            console.log('No valid Groq API key found, using enhanced fallback content');
            const fallbackContent = getEnhancedFallbackContent(contentType, theme, userPrompt);
            return res.json({
                success: true,
                content: fallbackContent,
                type: contentType,
                theme: theme,
                source: 'enhanced_fallback'
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
            
            // Use fallback content if API fails
            const fallbackContent = getEnhancedFallbackContent(contentType, theme, userPrompt);
            return res.json({
                success: true,
                content: fallbackContent,
                type: contentType,
                theme: theme,
                source: 'fallback_due_to_api_error'
            });
        }

        const data = await groqResponse.json();
        const generatedContent = data.choices[0].message.content;

        res.json({ 
            success: true,
            content: generatedContent,
            type: contentType,
            theme: theme,
            source: 'groq_api'
        });

    } catch (error) {
        console.error('Server error:', error);
        
        // Use fallback content in case of any error
        const { contentType, theme, userPrompt } = req.body;
        const fallbackContent = getEnhancedFallbackContent(contentType, theme, userPrompt);
        
        res.json({
            success: true,
            content: fallbackContent,
            type: contentType,
            theme: theme,
            source: 'fallback_due_to_error'
        });
    }
});

// Helper function to create prompts
function createPrompt(contentType, theme, userPrompt) {
    const basePrompts = {
        story: `Write a ${theme} Halloween story that is creative, engaging, and perfectly suited for Halloween.`,
        costume: `Create a ${theme} Halloween costume idea with detailed description, materials needed, and creative elements.`,
        party: `Design a ${theme} Halloween party theme with decorations, food ideas, drinks, and activities.`,
        social: `Write a ${theme} Halloween social media post that is engaging, appropriate for the platform, and includes relevant hashtags.`
    };

    let prompt = basePrompts[contentType] || `Create ${theme} Halloween content that is creative and engaging.`;
    
    if (userPrompt && userPrompt.trim() !== '') {
        prompt += ` Include these specific elements: ${userPrompt}`;
    }
    
    prompt += ` Make it unique, creative, and perfectly suited for Halloween.`;
    
    return prompt;
}

// Enhanced fallback content function
function getEnhancedFallbackContent(contentType, theme, userPrompt) {
    const themes = enhancedContentExamples[contentType];
    if (!themes) {
        return generateDynamicFallback(contentType, theme, userPrompt);
    }
    
    const themeContent = themes[theme] || themes.scary || themes[Object.keys(themes)[0]];
    
    if (!themeContent || themeContent.length === 0) {
        return generateDynamicFallback(contentType, theme, userPrompt);
    }
    
    const randomItem = themeContent[Math.floor(Math.random() * themeContent.length)];
    
    // Add user prompt to the content if provided
    if (userPrompt && userPrompt.trim() !== '') {
        return `${randomItem}\n\n✨ Customized with: ${userPrompt}`;
    }
    
    return randomItem;
}

// Generate dynamic fallback when no specific content is available
function generateDynamicFallback(contentType, theme, userPrompt) {
    const baseContent = {
        story: `In the ${theme} atmosphere of Halloween night, something extraordinary was about to happen. The air grew cold, the leaves rustled with unseen movement, and the ordinary world transformed into something magical and mysterious.`,
        costume: `Create an amazing ${theme} ${contentType} costume! Think about creative materials you have at home, add some spooky elements, and don't forget the Halloween spirit.`,
        party: `Host the perfect ${theme} Halloween party! Decorate with seasonal elements, prepare spooky snacks, and plan engaging activities that everyone will enjoy.`,
        social: `🎃 SPOOKY HALLOWEEN GREETINGS! 👻\n\nWishing you a ${theme} and wonderful Halloween filled with fun, treats, and amazing memories! #Halloween #${theme.charAt(0).toUpperCase() + theme.slice(1)}Halloween #SpookySeason`
    };
    
    let content = baseContent[contentType] || `Get ready for an amazing ${theme} Halloween ${contentType}!`;
    
    if (userPrompt && userPrompt.trim() !== '') {
        content += `\n\nIncluding your special request: ${userPrompt}`;
    }
    
    return content;
}

// Start server
app.listen(PORT, () => {
    console.log(`🎃 Spooky AI Backend running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}`);
    console.log(`📍 Generate endpoint: http://localhost:${PORT}/api/generate`);
    
    // Check for API key
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
        console.log('⚠️  No valid Groq API key found - using enhanced fallback content');
        console.log('💡 To enable AI features, add your Groq API key to the .env file');
    } else {
        console.log('✅ Groq API key found - AI features enabled');
    }
});