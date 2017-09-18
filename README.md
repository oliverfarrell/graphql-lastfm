# Get started
- `cp .env.example .env`
- Add your [last.fm](https://www.last.fm/api) API key to the `.env` file
- `yarn install && yarn start`

### Grab top artists

```
{
  topartists(username: "oliverfarrell", limit: 2) {
    name
    playcount
  }
}
```

```json
{
  "data": {
    "topartists": [
      {
        "name": "Imagine Dragons",
        "playcount": "606"
      },
      {
        "name": "Bastille",
        "playcount": "591"
      }
    ]
  }
}
```

### Grab top tracks

```
{
  toptracks(username: "oliverfarrell", limit: 2) {
    name
    playcount
    artist {
      name
    }
  }
}
```

```json
{
  "data": {
    "toptracks": [
      {
        "name": "Radioactive",
        "playcount": "91",
        "artist": {
          "name": "Imagine Dragons"
        }
      },
      {
        "name": "I Will Wait",
        "playcount": "80",
        "artist": {
          "name": "Mumford & Sons"
        }
      }
    ]
  }
}
```

### Grab weekly top tracks

```
{
  toptracks(username: "oliverfarrell", weekly: true) {
    name
    playcount
    artist {
      name
    }
  }
}
```

```json
{
  "data": {
    "toptracks": [
      {
        "name": "My Own Hymn",
        "playcount": "10",
        "artist": {
          "name": "Above & Beyond"
        }
      },
      {
        "name": "Whiskey Tango",
        "playcount": "5",
        "artist": {
          "name": "Jack Savoretti"
        }
      },
      {
        "name": "Tightrope",
        "playcount": "3",
        "artist": {
          "name": "Above & Beyond"
        }
      }
    ]
  }
}
```
