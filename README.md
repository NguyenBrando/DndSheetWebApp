# Dungeons and Dragons Online Character Sheet Manager
Web app for managing dnd character sheets

## References for JSON input syntax
<details>
    <summary>Character JSON Ref</summary>

    {
        "id": "character" // Required

        "name": // String
        "playerName": // String

        "level": // Integer 1-20
        "alignment": // String

        "stats": {
            "strength": // Integer 1-20 (Base Roll),
            "dexterity": //,
            "etc..."
        }

        "health": {
            "current": // Integer (current health)
            "rolls": [] // List (len 1-19) of integers (one for each level > 1)
        }

        "hitDice": // Integer (current count, not total)
        "inspiration": // Integer
        "deathSaves": {
            "successes": // Integer 1-3
            "failures": // Integer 1-3
        }

        "race": // "Race" JSON Object
        "class": // "Class" JSON Object
        "background": // "Background" JSON Object
        "equipment": [] // List of "Equipment" JSON Objects
    }

</details>

<details>
    <summary>Race JSON Ref</summary>

</details>

<details>
    <summary>Class JSON Ref</summary>

</details>

<details>
    <summary>Background JSON Ref</summary>

</details>

<details>
    <summary>Trait JSON Ref</summary>

    {
        "name": // String. Any. Trait title.
        "desc": // String. Any. Informative Description.
        "type": // String. "abilityMod", "proficiency", "passive", "active"

        // Optionals
        "mods": [
            {
                "field": // String. *See field syntax options.
                "operator": // String. *See mod operator syntax options.
                "value": // Any.
                "type": // String. "definite" or "choice"
            }
        ]
        "conditions": [
            { 
                "field": // String. *See field syntax options.
                "operator": // String. *See condition operator syntax options.
                "value": // Any.
            }, etc.
        ]
    }

</details>