from webcam_object_scanner import ObjectScanner
from mistral_prompt_generator import process_scanned_object
from config import CONSISTORY_API_KEY, CONSISTORY_API_URL
import requests
import base64
import os
import json
import shutil
from mistral_ability_generator import generate_abilities

def generate_character_image(object_name, character_description):
    invoke_url = "https://ai.api.nvidia.com/v1/genai/nvidia/consistory"
    
    headers = {
        "Authorization": f"Bearer {CONSISTORY_API_KEY}",
        "Accept": "application/json",
    }

    subject_tokens = object_name.lower().split()
    
    # Define a maximum length for the character description
    MAX_DESCRIPTION_LENGTH = 150  # Adjust as needed based on the API's token limits

    # Truncate the character description if it exceeds the maximum length
    if len(character_description) > MAX_DESCRIPTION_LENGTH:
        character_description = character_description[:MAX_DESCRIPTION_LENGTH].strip()

    AVAILABLE_STYLES = [
        "A watercolor illustration of",
        "A 3D animation of",
        "An old story illustration of"
    ]
    import random
    style_prompt = random.choice(AVAILABLE_STYLES) if random.random() > 0.6 else "A watercolor illustration of"
    
    # Build the payload
    payload = {
        "mode": 'init',
        "subject_prompt": object_name,
        "subject_tokens": subject_tokens,
        "subject_seed": random.randint(1, 100),
        "style_prompt": style_prompt,
        "scene_prompt1": character_description,
        "scene_prompt2": f"A magical creature that IS the {object_name} transformed, not wearing or holding it",
        "negative_prompt": "wearing, holding, human features, realistic, photographic, humanoid, clothing, accessories, held items",
        "cfg_scale": 5,
        "same_initial_noise": False
    }

    
    try:
        response = requests.post(invoke_url, headers=headers, json=payload)
        response.raise_for_status()
        
        data = response.json()
        
        for idx, img_data in enumerate(data['artifacts']):
            img_base64 = img_data["base64"]
            img_bytes = base64.b64decode(img_base64)
            with open(f'character_{idx}.jpg', "wb") as f:
                f.write(img_bytes)
        
        print(f"Generated and saved {len(data['artifacts'])} character images.")
        return True
    
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        print(f"Response content: {response.text}")
        return False
    except Exception as err:
        print(f"An error occurred: {err}")
        return False

def normalize_name(name):
    """Convert object name to a consistent format"""
    return name.lower().strip()

def update_battle_data(object_name, character_description, abilities_json, sprite_path):
    """Update the battleData.ts file with the new character"""
    battle_data_path = 'app/data/battleData.ts'
    
    try:
        # Read existing battle data
        with open(battle_data_path, 'r') as f:
            content = f.read()
        
        # Parse the MODEL_DATA object
        start_idx = content.find('MODEL_DATA')
        end_idx = content.find('};', start_idx)
        
        # Clean and escape the description
        cleaned_description = character_description.replace("'", "\\'")  # Escape single quotes
        cleaned_description = cleaned_description.replace('\n', ' ')  # Replace newlines with spaces
        cleaned_description = ' '.join(cleaned_description.split())  # Normalize whitespace
        
        # Parse abilities JSON and reformat to TypeScript style
        import json
        abilities = json.loads(abilities_json)
        formatted_moves = ",\n      ".join(
            f"{{ name: '{move['name']}', pp: '{move['pp']}', type: '{move['type']}', damage: {move['damage']} }}"
            for move in abilities
        )
        
        # Extract character name from description
        import re
        name_match = re.search(r'known as (?:the )?([^,\.]+)', character_description)
        character_name = name_match.group(1) if name_match else object_name.title()

        # Create new character entry with properly formatted moves
        new_character = f"""
  '{normalize_name(object_name)}': {{
    sprite_url: '/sprites/{sprite_path}',
    name: '{character_name}',
    title: 'the Mystery Object',
    description: '{cleaned_description}',
    level: 50,
    hp: 100,
    moves: [
      {formatted_moves}
    ]
  }},"""
        
        # Debug print
        print("\nNew character entry being added:")
        print(new_character)

        # Insert new character before the closing brace
        updated_content = content[:end_idx] + new_character + content[end_idx:]
        
        # Write updated content back to file
        with open(battle_data_path, 'w') as f:
            f.write(updated_content)
            
        return True
        
    except Exception as e:
        print(f"Error updating battle data: {e}")
        return False
    
def generate_and_save_character(object_name, character_description):
    # Generate image
    success = generate_character_image(object_name, character_description)
    if not success:
        return False

    try:
        # Generate abilities
        abilities_json = generate_abilities(object_name, character_description)
        if not abilities_json:
            return False

        # Move the generated image to sprites folder
        sprite_name = f"{normalize_name(object_name)}.jpg"
        sprite_path = os.path.join('public', 'sprites', sprite_name)
        shutil.move('character_0.jpg', sprite_path)

        # Update battle data
        success = update_battle_data(
            object_name, 
            character_description, 
            abilities_json,
            sprite_name
        )
        
        return success
    except Exception as e:
        print(f"Error in generate_and_save_character: {e}")
        return False
    
def main():
    # Run scanner
    scanner = ObjectScanner()
    verified_object = scanner.run()
    
    if verified_object:
        print(f"\nScanned object: {verified_object}")
        
        # Get character description
        character_prompt = process_scanned_object(verified_object)
        
        if character_prompt:
            # Add more context to the character prompt
            character_prompt += f" This character embodies the essence of a {verified_object}."
            success = generate_and_save_character(verified_object, character_prompt)
            
            if success:
                print("Character generation and storage complete!")
            else:
                print("Failed to generate or store character.")
        else:
            print("Failed to generate character description.")
    else:
        print("\nScanning cancelled")
    
if __name__ == "__main__":
    main()