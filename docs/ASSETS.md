# Asset provenance

Every image in this repository is accounted for. Verified by SHA-256 against the original
download archives, not by memory or by how the files look.

| Files | Source | Licence |
|---|---|---|
| `src/shared/assets/imades/cards/` — 53 files | **Card Asset Pack** by **natomarcacini**, `Standard 52 Cards/solitaire` | **CC0 1.0** (public domain) |
| `src/shared/assets/imades/cards/joker.png` | Drawn for this repository | MIT, with the source code |
| `src/shared/assets/imades/players/char_1…13.png` | **Card Asset Pack** by **natomarcacini**, `Characters/` | **CC0 1.0** (public domain) |
| `src/shared/assets/imades/players/char_los.png` | Drawn by the repository owner | MIT, with the source code |

Provenance check, run against the two upstream archives:

```
from CC0 pack     : 66
generated for this repo : 1
unaccounted for   : 1   (char_los.png — the owner's own work)
```

## Card Asset Pack — CC0

Created and distributed by **natomarcacini**, 2022-03-09. The pack ships a `LICENSE.txt`
naming [Creative Commons Zero (CC0 1.0)](http://creativecommons.org/publicdomain/zero/1.0/)
and stating the content is "free to use in personal, educational and commercial projects".

CC0 requires no attribution. The credit here is courtesy, not obligation.

The pack contains three 52-card sets; this project uses the `solitaire` variant (100 × 144,
bordered card face with a corner index and a centre pip) because it is the closest match to
the layout the game was originally written around. It has no joker, so `joker.png` was drawn
for this repository in the same style, using the palette sampled from the pack itself
(`#0d2644` for black suits, `#a53030` for red, 1 px black border). The joker is never dealt
— the game builds a `Deck48`, which excludes it — but the resource is loaded, so the file
has to exist.

## What used to be here, and why it was removed

Until 2026-07-29 the 54 card images came from **`r88_Casino.zip`**, an RPG Maker MZ plugin
by **reflector88** (<https://reflector88.itch.io/casino>). Its terms of use, quoted from the
plugin header:

> This plugin is free for non-commercial use. If you plan on using this in a paid project,
> please contact me first at reflector88@gmail.com. Either way, credit me if you found it
> helpful. **Please do not repost this script (or any modified version) anywhere.**

That grants *use*, not *redistribution*, and the last sentence asks explicitly that the
files not be reposted. Committing them to a public repository and serving them from a
GitHub Pages demo is exactly that, and no amount of attribution changes it — "credit me"
and "do not repost" are two separate requests, and only one of them can be satisfied by a
line in a README.

So they were replaced rather than credited. **No file from that archive remains in this
repository or in its history from this point forward** — though note that the `v0.1-original`
tag, which preserves the 2024 project, still contains them.

A secondary reason not to rely on that set: the archive's own timestamps show 52 of the 54
card images dated **2014-05-22/26**, a decade before the 2024 plugin, and 52 of them carry a
PNG `tEXt` chunk reading `Software: by.blooddy.crypto.image.PNG24Encoder` — an ActionScript 3
library, so they were exported from a Flash application. reflector88 appears to have bundled
an older card set rather than drawn it, which means even asking permission might not have
settled who could grant it.
