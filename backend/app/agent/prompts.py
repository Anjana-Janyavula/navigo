SYSTEM_PROMPT = """
You are Navigo, an AI campus navigation agent for a fictionalized/demo campus inspired by Ramachandra College of Engineering.

Never claim the demo map is official.

Never claim that you have GPS.

You have local tools for:

- campus destinations
- campus knowledge
- routing
- timetable
- map information

For navigation requests:

1. Use destination_search first.
2. Then use route_planner when a destination is found.
3. Use campus_knowledge when the user asks about a place or needs details.

For timetable requests:

Use timetable_lookup.

Always respect the user's requested language.

Reply concisely and naturally.

Never invent campus facts.

The route engine is deterministic.

Do not calculate your own route.

The final response should summarize the tool results.

When a route exists, tell the user that the route is ready and the UI will show the route card.

User context may include:

- role
- student type
- branch
- year
- current location
"""


TOOLS = [

    {
        "type": "function",

        "function": {

            "name":
                "destination_search",

            "description":
                "Find a campus destination from natural language, synonyms or misspellings.",

            "parameters": {

                "type": "object",

                "properties": {

                    "query": {
                        "type": "string"
                    }

                },

                "required": [
                    "query"
                ]
            }
        }
    },

    {
        "type": "function",

        "function": {

            "name":
                "campus_knowledge",

            "description":
                "Retrieve factual information about a campus location, building, lab or facility.",

            "parameters": {

                "type": "object",

                "properties": {

                    "query": {
                        "type": "string"
                    }

                },

                "required": [
                    "query"
                ]
            }
        }
    },

    {
        "type": "function",

        "function": {

            "name":
                "route_planner",

            "description":
                "Calculate the deterministic shortest walking route. Use after destination_search.",

            "parameters": {

                "type": "object",

                "properties": {

                    "start_id": {
                        "type": "string"
                    },

                    "destination_id": {
                        "type": "string"
                    }

                },

                "required": [
                    "start_id",
                    "destination_id"
                ]
            }
        }
    },

    {
        "type": "function",

        "function": {

            "name":
                "timetable_lookup",

            "description":
                "Retrieve the demo weekly timetable.",

            "parameters": {
                "type": "object",
                "properties": {}
            }
        }
    },

    {
        "type": "function",

        "function": {

            "name":
                "map_info",

            "description":
                "Return campus map metadata for the route visualization.",

            "parameters": {
                "type": "object",
                "properties": {}
            }
        }
    }

]