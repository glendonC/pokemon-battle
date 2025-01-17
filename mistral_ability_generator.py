from openai import OpenAI
from config import MISTRAL_API_KEY, MISTRAL_BASE_URL
import json

def generate_abilities(object_name, character_description):
    client = OpenAI(
        base_url=MISTRAL_BASE_URL,
        api_key=MISTRAL_API_KEY
    )

    prompt = f"""Create exactly 4 moves for a Pokémon-style character based on this object: {object_name}
    Character description: {character_description}
        
    IMPORTANT: Reply ONLY with a JSON array containing exactly 4 moves. No other text.
    Each move must have exactly these fields: "name", "type", "damage", "pp"
    
    Example format:
    [
        {{"name": "Move Name", "type": "Type", "damage": 30, "pp": "10/10"}},
        {{"name": "Move Name", "type": "Type", "damage": 25, "pp": "15/15"}},
        {{"name": "Move Name", "type": "Type", "damage": 20, "pp": "20/20"}},
        {{"name": "Move Name", "type": "Type", "damage": 0, "pp": "5/5"}}
    ]

    Guidelines:
    1. Moves should relate to the object's function and properties
    2. Include one defensive move (with damage: 0)
    3. Types should match the object's theme
    4. Names should be creative and themed to the object
    """

    try:
        completion = client.chat.completions.create(
            model="mistralai/mistral-7b-instruct-v0.3",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=500,
            stream=False
        )

        response = completion.choices[0].message.content.strip()
        print("Raw response:", response)

        try:
            # Parse the response into Python object
            moves = json.loads(response)
            if isinstance(moves, list) and len(moves) == 4:
                # Format moves for TypeScript
                formatted_moves = []
                for move in moves:
                    # Ensure each move has all required fields
                    formatted_move = {
                        "name": str(move.get("name", "Unknown Move")),
                        "type": str(move.get("type", "Normal")),
                        "damage": int(move.get("damage", 20)),
                        "pp": str(move.get("pp", "10/10"))
                    }
                    formatted_moves.append(formatted_move)
                
                # Convert back to JSON string with proper formatting
                return json.dumps(formatted_moves, indent=2)
            else:
                raise ValueError("Invalid moves structure")
                
        except (json.JSONDecodeError, ValueError) as e:
            print(f"Error parsing moves: {e}")

        print("Using fallback moves")
        fallback_moves = [
            {
                "name": f"{object_name.title()} Strike",
                "type": "Normal",
                "damage": 30,
                "pp": "10/10"
            },
            {
                "name": f"{object_name.title()} Blast",
                "type": "Normal",
                "damage": 25,
                "pp": "15/15"
            },
            {
                "name": f"{object_name.title()} Wave",
                "type": "Normal",
                "damage": 35,
                "pp": "20/20"
            },
            {
                "name": f"{object_name.title()} Guard",
                "type": "Defense",
                "damage": 0,
                "pp": "5/5"
            }
        ]
        return json.dumps(fallback_moves, indent=2)

    except Exception as e:
        print(f"Error generating abilities: {e}")
        return None

if __name__ == "__main__":
    # Test the function
    test_object = "vase"
    test_desc = "A mystical container that channels ancient energies"
    abilities = generate_abilities(test_object, test_desc)
    print("\nGenerated abilities:")
    print(abilities)