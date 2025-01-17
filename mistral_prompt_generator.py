from openai import OpenAI
from config import MISTRAL_API_KEY, MISTRAL_BASE_URL

def generate_character_prompt(object_name):
    client = OpenAI(
        base_url=MISTRAL_BASE_URL,
        api_key=MISTRAL_API_KEY
    )

    prompt = f"""Create a Pokémon-style character description based on the object: {object_name}.
        
    Guidelines:
    1. The character should be a creature that evolved from or was inspired by the {object_name}
    2. Focus on these key aspects:
    - Main body shape derived from the object's form
    - Natural-looking appendages that make sense for the object
    - A signature element or type (like fire, water, electric, etc.) that matches the object's purpose
    - Special abilities that relate to how the object is normally used
    3. Specific requirements:
    - NO humanoid features (no human-like arms, legs, or face)
    - Must have a clear connection to the original object
    - Should include distinctive patterns or markings
    - Include at least one special ability
    
    Format the response as:
    The creature has [distinctive visual elements] and [special ability description].
    
    Keep the description vivid but concise.
    """


    try:
        completion = client.chat.completions.create(
            model="mistralai/mistral-7b-instruct-v0.3",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.8,
            top_p=0.9,
            max_tokens=150,
            stream=False
        )

        # Clean up the response
        response = completion.choices[0].message.content.strip()
        # Remove any quotes
        response = response.replace('"', '').replace("'", "")
        # Ensure it starts with our required format
        if not response.lower().startswith("a watercolor illustration of"):
            response = f"A watercolor illustration of {response}"
        return response

    except Exception as e:
        print(f"Error generating character: {e}")
        return None

def process_scanned_object(object_name):
    print(f"\nProcessing scanned object: {object_name}")
    character_prompt = generate_character_prompt(object_name)
    
    if character_prompt:
        print("\nGenerated character prompt:")
        print("-" * 50)
        print(character_prompt)
        print("-" * 50)
        return character_prompt
    return None