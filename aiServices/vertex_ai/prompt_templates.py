STORY_PROMPT_TEMPLATE = """
You are an expert in traditional crafts, cultural heritage, and artisan history.

Generate a rich, culturally-significant story about the craft: "{craft_name}"
Category: {category}
Region: {region}

The story should be exactly 2 paragraphs long and include:
- Historical origins and timeline
- Artisan background and traditional practices
- Cultural significance in the region
- Symbolism and meaning behind the craft
- Traditional usage and purpose
- What makes this craft unique

After the story, provide a structured JSON object with the following fields:
- title: A compelling title for the story
- historical_origin: Brief history (2-3 sentences)
- artisan_background: Who traditionally makes this craft (2-3 sentences)
- cultural_significance: Why it matters culturally (2-3 sentences)
- symbolism: Symbolic meanings and representations (2-3 sentences)
- traditional_usage: How it was/is traditionally used (2-3 sentences)
- why_unique: What makes it special and unique (2-3 sentences)

Format your response as:
STORY:
[2 paragraph story here]

JSON:
{{
  "title": "...",
  "historical_origin": "...",
  "artisan_background": "...",
  "cultural_significance": "...",
  "symbolism": "...",
  "traditional_usage": "...",
  "why_unique": "..."
}}

def get_story_prompt(craft_name: str, category: str, region: str) -> str:
    return STORY_PROMPT_TEMPLATE.format(
        craft_name=craft_name,
        category=category,
        region=region
    )

def get_lesson_prompt(craft_name: str, category: str, region: str) -> str:
    return LESSON_PROMPT_TEMPLATE.format(
        craft_name=craft_name,
        category=category,
        region=region
    )

