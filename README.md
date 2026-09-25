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

        "race": // "Race" JSON Object
        "class": // "Class" JSON Object
        "background": // "Background" JSON Object

        "stats": {
            "strength": // Integer 1-20 (Base Roll),
            "dexterity": //,
            "etc..."
        }

        "health": {
            "current": // Integer (current health)
            "rolls": // List (len 1-19) of integers (one for each level)
        }
        "hitDice": // Integer (current count, not total)

        "equipment": [] // List of "Equipment" JSON Objects
        "inspiration": // Integer
        "deathSaves": {
            "successes": // Integer 1-3
            "failures": // Integer 1-3
        }
    }
</details>

<details>
    <summary>Race JSON Ref</summary>

</details>