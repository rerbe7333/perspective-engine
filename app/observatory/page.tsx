"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useAnimationTime } from "@/lib/useAnimationTime";
import { CornerMark, SectionTag, FieldLabel } from "@/components/Primitives";

// ============================================================
// DATA MODEL
// ============================================================

type BrainRegionKey =
  | "V1"
  | "FFA"
  | "AMY"
  | "PPA"
  | "DAN"
  | "VAN"
  | "DMN"
  | "dlPFC";

type Reveal = {
  A: string;
  B: string;
  C: string;
};

type ROI = {
  id: string;
  label: string;
  x: number; // 0..1 normalized
  y: number; // 0..1 normalized
  r: number; // 0..1 normalized hot-zone radius
  brain: Partial<Record<BrainRegionKey, number>>; // 0..1 weights
  reveal: Reveal;
};

type Scene = {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  freeTextReveal: string;
  rois: ROI[];
};

const FREE_TEXT_REVEAL_GENERIC =
  "You wrote your own reason. That itself is recursive meta-governance — the dlPFC modeling its own modeling. Most of the time, your brain reaches for the first explanation that fits. By writing one out, you slowed the loop down enough to watch it run.";

const SCENES: Scene[] = [
  // ============================================================
  // 01 — KITCHEN
  // ============================================================
  {
    key: "kitchen",
    title: "Sunlit Kitchen",
    subtitle: "Morning, mid-action",
    description:
      "Domestic warmth with a faint thread of unease. Familiar objects, an absent person implied, one quiet threat.",
    image: "/observatory/scene-kitchen.png",
    freeTextReveal: FREE_TEXT_REVEAL_GENERIC,
    rois: [
      {
        id: "K1",
        label: "Steaming coffee mug",
        x: 0.27,
        y: 0.62,
        r: 0.07,
        brain: { DMN: 0.8, V1: 0.6, VAN: 0.4 },
        reveal: {
          A: "The mug stood out because steam moves. Your ventral attention network captured the motion before any concept formed. But the deeper pull was familiarity — your default mode network reached for \"morning.\" A mug is not just an object. It's a rehearsal of a thousand mornings.",
          B: "Curiosity about the mug usually means curiosity about the absent person. Whose mug? Where did they go? Your dlPFC is generating hypotheses and your DMN is filling them in with autobiographical content. The object is a hook for a story.",
          C: "That's the DMN talking. The mug isn't really the target — your own past mornings are. Your brain didn't see this mug. It saw the category \"warm thing I drink, alone, in the light,\" and the category came pre-loaded with you in it.",
        },
      },
      {
        id: "K2",
        label: "Paring knife beside apple",
        x: 0.36,
        y: 0.66,
        r: 0.05,
        brain: { AMY: 0.9, VAN: 0.7, V1: 0.5 },
        reveal: {
          A: "Sharp objects bypass your conscious processing. Your amygdala flagged \"potential threat\" in under 200 milliseconds, and your ventral attention network pulled your gaze without asking. By the time you noticed you were looking, the work was already done.",
          B: "Curiosity here is asking a real question: why is a knife next to a half-eaten apple? Your brain is reading a small narrative — someone was here, they were cutting fruit, they left mid-action. Meta-cognition over a domestic forensics puzzle.",
          C: "Knives carry memory weight differently for everyone. For some people, kitchens. For others, something sharper. Your DMN brought up whatever it brought up, and that response is data about you, not the image.",
        },
      },
      {
        id: "K3",
        label: "Calendar with circled date",
        x: 0.47,
        y: 0.20,
        r: 0.06,
        brain: { dlPFC: 0.8, DAN: 0.6, DMN: 0.5 },
        reveal: {
          A: "A circled date is a salience marker someone else placed in this scene. Your dorsal attention network caught the red ring as a high-contrast cue, and your dlPFC immediately asked: what is on that day? You looked because someone wanted you to.",
          B: "Pure meta-cognitive curiosity. You're trying to read the date, generate a guess about what it commemorates, and test the guess. The dlPFC builds the question, the DMN proposes \"birthday? appointment? anniversary?\", the loop continues until you decide it's unanswerable.",
          C: "Calendar dates are condensed time. Whatever you're now thinking about — a date you have circled, one you wish you did, one you forgot — that's the DMN reaching from the image into your own life. The image is a doorway.",
        },
      },
      {
        id: "K4",
        label: "Child's drawing on fridge",
        x: 0.66,
        y: 0.32,
        r: 0.07,
        brain: { DMN: 0.9, FFA: 0.5, V1: 0.5 },
        reveal: {
          A: "Children's drawings violate adult visual expectations — wrong proportions, wrong colors, wrong physics — which makes them stand out instantly. Your fusiform face area also flagged the small drawn faces as faces, even though they're stylized. Two attentional pulls working together.",
          B: "The drawing is a puzzle: who drew it, who is depicted, who decided to display it? Your dlPFC opens the question and your DMN populates the answer with stand-ins from your own life. Curiosity here is autobiography wearing a costume.",
          C: "This is where the room gets you. A child's drawing on a fridge is one of the most reliably emotional objects in the modern world. Whatever the drawing pulled up in you — your own childhood, a child you know, a wish or a grief — that was your DMN doing exactly what it's for.",
        },
      },
      {
        id: "K5",
        label: "Sunlit window and dust motes",
        x: 0.10,
        y: 0.40,
        r: 0.10,
        brain: { PPA: 0.7, V1: 0.7, DMN: 0.4 },
        reveal: {
          A: "Dust motes in a light beam are small high-contrast objects in slow drift. Your ventral attention network picks them up as low-grade movement. The whole effect is calming because the motion is predictable — your brain registers \"alive but not threatening.\"",
          B: "Light through a window is one of the most common contemplative cues in human visual experience. You're trying to figure out the time of day, the season, the weather. Spatial inference at speed.",
          C: "The morning light in someone else's kitchen activates the same place-memory networks as your own kitchen at the same hour. Your parahippocampal place area is doing something interesting: treating an image as a location.",
        },
      },
      {
        id: "K6",
        label: "Cat's tail at edge of frame",
        x: 0.95,
        y: 0.78,
        r: 0.06,
        brain: { VAN: 0.9, AMY: 0.5, DAN: 0.5 },
        reveal: {
          A: "Movement at the edge of the visual field is the oldest attention trigger in the vertebrate brain. Your ventral attention network fired before you could name what you saw. The tail is also a partial object — only part of a thing, exiting the scene — which generates a small surprise that holds the gaze.",
          B: "You're filling in a whole cat from a tail. Your dlPFC is running an inference: object permanence, animal recognition, predicting what comes next. A tail is enough. Brains are extrapolation engines.",
          C: "Animals at the edge of a domestic scene activate something specific — the felt sense that the home is occupied, that you are not alone in it. Whatever cat or dog or other creature your DMN just produced, that's part of why this image feels lived-in.",
        },
      },
    ],
  },
  // ============================================================
  // 02 — CAFE
  // ============================================================
  {
    key: "cafe",
    title: "Crowded Cafe",
    subtitle: "Mid-afternoon, first-person",
    description:
      "Social, warm, populated. The viewer is implicated in their own body via the foreground hand and cup.",
    image: "/observatory/scene-cafe.png",
    freeTextReveal: FREE_TEXT_REVEAL_GENERIC,
    rois: [
      {
        id: "C1",
        label: "Foreground hand on cup",
        x: 0.35,
        y: 0.78,
        r: 0.10,
        brain: { DMN: 0.9, V1: 0.6, dlPFC: 0.5 },
        reveal: {
          A: "Your own hand in a scene captures attention differently than anyone else's hand. Body-schema regions in your brain fire as if you're holding the cup. This is the only ROI in this experience where your default mode network is responding to a body it briefly believes is yours.",
          B: "You're checking the cup — how full is it, how warm, whose is it? — and underneath that, you're checking yourself. The dlPFC asks: am I in this scene? The answer your brain returns is a soft yes. You are the person at this table.",
          C: "The mug, the hand, the position at the table — all of it activates what consciousness researchers call self-location. For a fraction of a second, your brain places itself here. The DMN is doing what the DMN does, only the \"self\" it's reaching for is a borrowed one.",
        },
      },
      {
        id: "C2",
        label: "Woman with half-smile, direct gaze",
        x: 0.31,
        y: 0.42,
        r: 0.07,
        brain: { FFA: 1.0, AMY: 0.6, DMN: 0.5 },
        reveal: {
          A: "Direct eye contact is processed in roughly 170 milliseconds. Before you knew you were looking, your fusiform face area had already decoded \"human face, looking at me,\" and your amygdala was assigning emotional weight. You didn't choose this gaze. It chose you.",
          B: "You're reading the half-smile. Is it warm, mocking, distracted, flirting, knowing? Your dlPFC is running a high-bandwidth social inference and your DMN is checking it against people you've known. Faces are puzzles your brain can't help solving.",
          C: "Direct gaze pulls up specific people. Whoever just came to mind — that's your DMN supplying autobiographical context to make this stranger interpretable. A face you've never seen lit up a face you know.",
        },
      },
      {
        id: "C3",
        label: "Barista with focused expression",
        x: 0.10,
        y: 0.30,
        r: 0.07,
        brain: { FFA: 0.8, DAN: 0.5, V1: 0.5 },
        reveal: {
          A: "A person engaged in their own work draws attention without demanding it. Your fusiform face area registered \"face\" and your dorsal attention network flagged \"purposeful motion\" — two soft pulls rather than one hard one. The result is a steady, unagitated gaze.",
          B: "You're inferring her job, her mood, her moment. Your dlPFC is reading micro-expressions and posture to construct an entire person from a few visible cues. Most of social cognition is this kind of educated guess.",
          C: "Watching someone work calls up your own working life. The DMN is running a comparison: does this look like my day, my mornings, my version of being competent and unobserved? The image is an excuse for the comparison.",
        },
      },
      {
        id: "C4",
        label: "Older couple in conversation",
        x: 0.55,
        y: 0.42,
        r: 0.08,
        brain: { FFA: 0.7, DMN: 0.7, VAN: 0.4 },
        reveal: {
          A: "Two faces oriented toward each other is a powerful visual configuration — \"people connecting\" is read by the brain at a glance. Your fusiform face area handled both faces simultaneously. The gestalt registered before either individual did.",
          B: "You're trying to read the conversation. What are they saying, are they happy, how long have they been together? The dlPFC builds a story and the DMN populates it with autobiographical material — couples you know, conversations you've had.",
          C: "Older couples in close conversation reliably activate the DMN's longest-running self-narratives: love, time, partnership, loss, what you have or want or have lost. The image is a hook. The content is yours.",
        },
      },
      {
        id: "C5",
        label: "Man absorbed in laptop",
        x: 0.74,
        y: 0.50,
        r: 0.07,
        brain: { dlPFC: 0.6, V1: 0.5, DMN: 0.4 },
        reveal: {
          A: "A back partially turned creates a small, persistent question — what is he seeing? Your dorsal attention network keeps trying to angle around to the screen. Your dlPFC notes the puzzle and won't quite let it go.",
          B: "You're inferring the screen. What's he working on, is he focused, is he procrastinating? Your brain is reading the entire posture for clues. We are extraordinarily good at decoding intent from a back of a head.",
          C: "People absorbed in screens are mirrors. Whatever you're now thinking about your own work, your own focus, your own laptop — that's the DMN doing a comparison you didn't ask for. The man on the laptop is a stand-in for a question about you.",
        },
      },
      {
        id: "C6",
        label: "Child pointing at pastries",
        x: 0.92,
        y: 0.45,
        r: 0.07,
        brain: { FFA: 0.7, VAN: 0.7, DMN: 0.5 },
        reveal: {
          A: "Animated gesture is a strong attentional capture, especially in a relatively still scene. Your ventral attention network registered \"movement! small face! pointing!\" before you made any sense of it. Children's gestures bypass the usual social filters.",
          B: "You're reading what the child wants. Pointing is one of the earliest human communicative gestures and your brain decoded it instantly: she wants the croissant, or the tart, or both. Reading desire from gesture is older than language.",
          C: "Children at pastry cases reliably pull DMN content — your own childhood wanting, or the wanting of children you know now. The image is a small machine for producing tenderness, and your brain went there without being asked.",
        },
      },
      {
        id: "C7",
        label: "Notebook with pen, foreground",
        x: 0.62,
        y: 0.92,
        r: 0.06,
        brain: { dlPFC: 0.7, DMN: 0.6, V1: 0.5 },
        reveal: {
          A: "Writing implements in a first-person scene activate the body-schema networks. For a moment your brain treated the pen as an extension of your hand. The notebook's openness is a question: what was being written? Your brain wants to read it.",
          B: "The dlPFC reaches for the contents of the page — you're trying to compose what was written there from posture, ink density, line spacing. Reading is a habit so deep your brain attempts it on illegible marks.",
          C: "An open notebook in front of you is a question about what you are trying to record, remember, or work out. The DMN reaches for your own current preoccupations. Whatever just came up — that's not in the image. That's in you.",
        },
      },
    ],
  },

  // ============================================================
  // 03 — FOREST
  // ============================================================
  {
    key: "forest",
    title: "Forest Path",
    subtitle: "Late afternoon, ambiguous",
    description:
      "The fork forces a choice; the misplaced glove triggers \"why is that there?\"; the distant figure pulls long-range attention.",
    image: "/observatory/scene-forest.png",
    freeTextReveal: FREE_TEXT_REVEAL_GENERIC,
    rois: [
      {
        id: "F1",
        label: "Path forking visibly",
        x: 0.40,
        y: 0.62,
        r: 0.10,
        brain: { DAN: 0.9, dlPFC: 0.7, PPA: 0.6 },
        reveal: {
          A: "A forking path is one of the most ancient attention captures in the visual repertoire — your dorsal attention network treats it as a decision the body must eventually make. Even though you're looking at a picture, your brain is already routing motor-planning circuits as if the choice were yours to make.",
          B: "Pure dorsal-attention deliberation. You're looking back and forth between branches, weighing them. The dlPFC builds a model of each path's likely contents and the parahippocampal place area registers each as a distinct possible space. Choice-making in advance of any actual choice.",
          C: "Forking paths are one of the oldest metaphors for life decisions. Your default mode network reached for a personal version — a real choice you've made or are making now. The image is a small mirror for any branching moment.",
        },
      },
      {
        id: "F2",
        label: "Gnarled tree with hollow",
        x: 0.46,
        y: 0.32,
        r: 0.08,
        brain: { VAN: 0.8, AMY: 0.6, dlPFC: 0.5 },
        reveal: {
          A: "Dark recesses are processed by the amygdala as low-grade threat candidates — the \"what could be in there\" reflex. Your ventral attention network captured the negative space and held it until your dlPFC ruled out anything actually living inside.",
          B: "You're trying to see into the hollow. The dlPFC is running a curiosity loop: what's in there, how deep does it go, has anything used it. Tree hollows in wild settings are read as habitats — your brain is doing animal inference on an empty space.",
          C: "Tree hollows show up in folklore for a reason. Whatever your DMN reached for — childhood stories, hiding places, secret rooms — that response is older than this image. The hollow asked an ancient question and your memory answered.",
        },
      },
      {
        id: "F3",
        label: "Dropped leather glove",
        x: 0.38,
        y: 0.86,
        r: 0.05,
        brain: { VAN: 0.9, dlPFC: 0.8, AMY: 0.4 },
        reveal: {
          A: "Misplaced human objects in natural settings are one of the strongest novelty signals available. Your ventral attention network locked on the moment you noticed it — a single brown shape that doesn't belong. Categorical mismatch is the engine behind \"wait, what.\"",
          B: "You're constructing a story to explain the glove. Whose was it, when did they drop it, were they alone, did they come back. The dlPFC won't let an unexplained object rest. Your brain is generating narrative because the alternative — accepting that an object is just there — is genuinely uncomfortable for it.",
          C: "A single dropped glove in a forest is the kind of detail that activates personal memory: a thing you lost, a thing you found, a moment you noticed something out of place in your own life. The DMN is reaching for whatever is closest.",
        },
      },
      {
        id: "F4",
        label: "Distant human silhouette",
        x: 0.78,
        y: 0.48,
        r: 0.05,
        brain: { FFA: 0.7, AMY: 0.6, DAN: 0.6 },
        reveal: {
          A: "Faces and human silhouettes at distance are still processed by your fusiform face area — the system fires even when the figure is barely resolvable. Your amygdala assigned a small wedge of social uncertainty. Who is that, are they coming or going, do they see me. All before any verbal thought.",
          B: "You're running long-range social inference on a few pixels. Posture, scale, motion direction, intent. Your dlPFC is doing the same thing it would do if the figure were close — only the data is sparser, so the inference takes longer and the answer is held loosely.",
          C: "A distant figure on a forest path is an instantly meaningful image — solitude, encounter, the question of who else is in your story. Whatever your DMN supplied — a person, a feeling, a memory — that is what your brain was reaching for through this stranger.",
        },
      },
      {
        id: "F5",
        label: "Fallen mossy log on left branch",
        x: 0.18,
        y: 0.55,
        r: 0.07,
        brain: { PPA: 0.6, V1: 0.6, DAN: 0.4 },
        reveal: {
          A: "An obstacle on a path is a body-prediction event. Your premotor cortex briefly simulates what crossing or going around it would feel like, and your dorsal attention network maps the geometry. You looked at the log because part of you was already stepping over it.",
          B: "You're reading the log as evidence — how long has it been there, is the path still used, did anyone clear it. Your dlPFC is doing forensic spatial inference. A scene becomes a timeline when you ask the right question of it.",
          C: "Fallen things in forests pull up something specific — the slow obvious fact that nothing stays standing. The DMN may have reached for a personal version of this; if it did, that response is the oldest content the image was capable of touching.",
        },
      },
      {
        id: "F6",
        label: "Backlit canopy and haze",
        x: 0.55,
        y: 0.18,
        r: 0.10,
        brain: { PPA: 0.7, V1: 0.7, DMN: 0.4 },
        reveal: {
          A: "Atmospheric haze and backlit foliage cue your brain that the space goes deep. Your parahippocampal place area registered \"large environment, far horizon,\" and your visual cortex spent extra cycles resolving the brightness gradient. Gaze drifts toward distance because the brain is hungry for the depth cue.",
          B: "You're trying to see through — to read the far end of the forest, to estimate how far it goes. The dlPFC is doing a low-stakes spatial inference. Your brain treats hidden distance as an answerable question even when the answer doesn't matter.",
          C: "Forest canopies at the right hour reliably pull up something near transcendence — the felt sense of being small inside something old. Whatever the image evoked in you, the DMN is doing what it does best: making meaning out of light through trees.",
        },
      },
      {
        id: "F7",
        label: "Exposed roots in foreground",
        x: 0.55,
        y: 0.78,
        r: 0.07,
        brain: { V1: 0.7, PPA: 0.5, dlPFC: 0.4 },
        reveal: {
          A: "High-detail texture in the lower visual field draws gaze the way your feet would. Your visual cortex is decoding the variation — root, leaf, rock, packed earth — and the parahippocampal place area is using all of it to anchor \"you are here.\" Texture is how your brain commits to a location.",
          B: "You're reading the ground for footing. Even in a still image your motor-planning circuits are evaluating where you'd step. The dlPFC is silently solving a small problem: how do I move through this terrain. Old machinery, running quietly.",
          C: "Looking at the ground beneath your feet is a contemplative gesture as old as walking. The DMN may have reached for a moment of being grounded — literally, recently, somewhere — and that reach is the image working as intended.",
        },
      },
    ],
  },

  // ============================================================
  // 04 — MUSEUM
  // ============================================================
  {
    key: "museum",
    title: "Museum Gallery",
    subtitle: "Quiet afternoon, recursive looking",
    description:
      "Layered looking. The viewer looks at people looking at images of people. The portrait's direct gaze is the strongest single attentional pull in the project.",
    image: "/observatory/scene-museum.png",
    freeTextReveal: FREE_TEXT_REVEAL_GENERIC,
    rois: [
      {
        id: "M1",
        label: "Central portrait, direct gaze",
        x: 0.46,
        y: 0.36,
        r: 0.08,
        brain: { FFA: 1.0, AMY: 0.7, dlPFC: 0.6 },
        reveal: {
          A: "Painted eye contact is a strange thing — your fusiform face area treats it as live eye contact, even though you know it isn't. Your amygdala tags it with social weight, your dlPFC notices it's \"just\" a painting, and yet the gaze still locks. This is one of the cleanest demonstrations of how much attention happens before knowledge.",
          B: "You're trying to read her — what is she seeing, what does she think of you, who painted her, when. Faces in portraits invite the same social inference as faces in life, only the answers can never come back. Your dlPFC keeps querying anyway.",
          C: "Direct portrait gaze pulls up specific people. Whoever you're now thinking of — that's the DMN supplying autobiographical material to make the painted face interpretable. A stranger in pigment activated a person you actually know.",
        },
      },
      {
        id: "M2",
        label: "Seated woman, back to camera",
        x: 0.43,
        y: 0.62,
        r: 0.07,
        brain: { DMN: 0.9, dlPFC: 0.7, FFA: 0.4 },
        reveal: {
          A: "Back-of-head views are oddly compelling because they invite you to share a perspective without seeing a face. Your DMN runs an alignment: you are looking at what she is looking at. For a moment, her perspective and yours overlap. This is one of the most direct activations of the self-model in the entire project.",
          B: "You're inferring her experience. What is she thinking about the portrait, has she been there long, what brought her here. Your dlPFC is running social cognition on a person whose face you can't see — which is a remarkably common configuration for human social inference.",
          C: "A figure seen from behind, looking at art, is one of the oldest images in Western painting — Caspar David Friedrich made an entire career of it. Your DMN may have reached for that recognition, or for personal moments of sitting still and looking. Either way, the image is asking you to be the person on the bench.",
        },
      },
      {
        id: "M3",
        label: "Older man at abstract painting",
        x: 0.21,
        y: 0.50,
        r: 0.07,
        brain: { dlPFC: 0.7, DMN: 0.6, FFA: 0.4 },
        reveal: {
          A: "Watching someone concentrate hard is its own kind of attentional pull — your fusiform face area picks up the focused posture and your DMN treats his concentration as evidence that something worth concentrating on is in front of him. Attention is contagious. You started looking at the painting because he was.",
          B: "You're reading him: what is he seeing, what does he know that you don't, why has he stopped here. This is high-level social inference — modeling another mind's attention. The dlPFC is doing the work that primate brains evolved to do, on a figure who will never know.",
          C: "An older person standing very close to a painting reliably evokes a particular feeling — knowledge accumulated, time spent, looking that has practiced itself. The DMN may have reached for someone you know who looks at things this way. The image is a hook for that recognition.",
        },
      },
      {
        id: "M4",
        label: "Abstract painting, reds and golds",
        x: 0.12,
        y: 0.34,
        r: 0.08,
        brain: { V1: 0.8, AMY: 0.5, dlPFC: 0.6 },
        reveal: {
          A: "Pure color and form without recognizable subject is processed by your visual cortex with extra weight — there is no shortcut, no \"oh, that's a face,\" and so V1 stays engaged longer. The reds activate mild arousal in the amygdala. The painting is an attentional puzzle with no solution.",
          B: "The dlPFC is asking what the painting means. You're constructing interpretations and discarding them. Abstract art is unusually demanding because it gives no help — your brain has to generate its own structure. This is meta-cognition with no scaffolding.",
          C: "Your reaction to abstract painting is a mirror. Some people find it liberating, some find it irritating, some find it boring. Whatever you just felt, the DMN is supplying a position that has been forming for a long time. The painting is an excuse for the position to declare itself.",
        },
      },
      {
        id: "M5",
        label: "Photograph of child on beach",
        x: 0.58,
        y: 0.46,
        r: 0.05,
        brain: { FFA: 0.6, DMN: 0.8, dlPFC: 0.4 },
        reveal: {
          A: "Black-and-white photographs of children carry strong implicit weight — the DMN treats them as memory artifacts even when they are not yours. Your fusiform face area registered the small face, your dlPFC registered \"old image,\" and the combination tagged it as nostalgia before any specific memory came up.",
          B: "You're trying to date the photograph and place it. When was this, who took it, where is the beach. Your dlPFC builds a small biographical scaffold for a stranger. Faces in old photographs invite this kind of inference because they cannot answer back.",
          C: "Photographs of children at the sea are one of the most reliable DMN triggers in modern visual culture. Whatever rose up — your own seaside memory, a child you know, a specific lost moment — that response is the deepest layer the image was capable of reaching.",
        },
      },
      {
        id: "M6",
        label: "Security guard standing still",
        x: 0.78,
        y: 0.48,
        r: 0.06,
        brain: { FFA: 0.6, DAN: 0.5, AMY: 0.4 },
        reveal: {
          A: "A still figure that is also a watcher carries low-grade social weight — your fusiform face area registered a face, your amygdala flagged \"someone is here,\" and your dorsal attention network returned periodically to check whether anything had changed. Stillness combined with watchfulness is a small ongoing salience signal.",
          B: "You're inferring his job, his attention, what he sees. Guards in galleries are themselves engaged in continuous low-level attention — they are doing the same thing you are. Your dlPFC may have noticed the symmetry: an attention-machine watching attention-machines.",
          C: "Watchers in public spaces pull up specific feelings — being observed, being safe, being neither. Whatever your DMN supplied, the response is data about you and your relationship to being seen. Galleries are unusual places: everyone in them is performing attention.",
        },
      },
      {
        id: "M7",
        label: "Misty mountain landscape",
        x: 0.86,
        y: 0.42,
        r: 0.07,
        brain: { PPA: 0.7, DMN: 0.5, V1: 0.5 },
        reveal: {
          A: "Atmospheric depth in landscape painting cues the parahippocampal place area to register large space — the same network that maps real environments fires when looking at a depicted one. The mist produces a small reach toward \"I would like to be there,\" generated by spatial cognition before any preference has a chance to form.",
          B: "You're trying to enter the landscape — how far does it go, what's beyond the mist, where would you walk. Your dlPFC is doing speculative spatial extension on something that has no reality. This is one of the strangest tricks the human brain plays.",
          C: "Painted landscapes pull up real ones. Whatever mountain or weather or hour your DMN reached for, that is a memory the image lit up. The painting did not show you the mist. It showed you a mist of your own.",
        },
      },
      {
        id: "M8",
        label: "Polished floor with reflections",
        x: 0.50,
        y: 0.88,
        r: 0.10,
        brain: { V1: 0.7, PPA: 0.5, DMN: 0.4 },
        reveal: {
          A: "Reflective ground planes are processed by your parahippocampal place area as both surface and spatial cue — your visual cortex resolves the doubling, your spatial systems register \"I am standing on this.\" The viewer's body-schema briefly placed itself on the floor of the gallery. You looked at the floor because part of you was standing on it.",
          B: "You're reading the geometry. How big is the room, where would I stand, what does the reflection tell me about the lighting overhead. Spatial inference on architectural depth is one of the most common quiet activities of the dlPFC in still images.",
          C: "Polished gallery floors carry a specific quality of memory — entering a quiet large room, walking toward something. Whatever your DMN reached for — a museum you've been in, an exhibition you remember — that recognition is the image working at depth.",
        },
      },
    ],
  },

  // ============================================================
  // 05 — BEDROOM
  // ============================================================
  {
    key: "bedroom",
    title: "Child's Bedroom",
    subtitle: "Early evening, memory-rich",
    description:
      "The fading light, the absent occupant, the mid-action quality — every element pulls toward autobiography.",
    image: "/observatory/scene-bedroom.png",
    freeTextReveal: FREE_TEXT_REVEAL_GENERIC,
    rois: [
      {
        id: "B1",
        label: "Stuffed rabbit on bed",
        x: 0.84,
        y: 0.62,
        r: 0.08,
        brain: { DMN: 1.0, FFA: 0.5, DAN: 0.4 },
        reveal: {
          A: "Worn well-loved stuffed animals carry visual signals of long use — flattened fur, irregular wear, slight asymmetry — that your visual cortex decodes instantly. Your DMN treats these signals as evidence of relationship. The rabbit looks loved before any thought about loving has a chance to form.",
          B: "You're inferring a life. Whose rabbit, how old, where they take it, what its name is. Your dlPFC builds a small biography from posture and wear. Beloved objects invite this kind of inference because they so clearly belong to someone specific.",
          C: "This is the strongest DMN pull in the entire project. Whatever your brain just supplied — your own first stuffed animal, a child you know, an object you have loved or lost — that response is the image working at maximum depth. Beloved-object neurons are real, and yours just fired.",
        },
      },
      {
        id: "B2",
        label: "Open picture book on desk",
        x: 0.18,
        y: 0.55,
        r: 0.06,
        brain: { DMN: 0.8, dlPFC: 0.6, V1: 0.4 },
        reveal: {
          A: "Books left open are interrupted scenes — your visual cortex picks up the splayed shape, your dlPFC registers \"frozen mid-action.\" There is something specifically poignant about a book left open: it implies a return that may or may not come.",
          B: "You're trying to read the page. Even at this distance your brain attempts to resolve text. The dlPFC is also asking who was reading, when did they stop, why. Open books are stories paused in the middle of themselves.",
          C: "Books left open in childhood spaces pull up specific kinds of memory — being read to, learning to read, falling asleep mid-page. Whatever your DMN reached for, it reached toward a particular kind of safe attention that childhood reading creates.",
        },
      },
      {
        id: "B3",
        label: "Sunset window with curtains",
        x: 0.18,
        y: 0.22,
        r: 0.10,
        brain: { PPA: 0.7, DMN: 0.7, V1: 0.6 },
        reveal: {
          A: "Light at this color and angle is read by your brain as a strong time-of-day cue — your parahippocampal place area registered \"late, ending\" within milliseconds. The whole emotional tone of the scene shifts on the basis of this single light source. Most of the room's mood is being supplied by this window.",
          B: "You're reading the time. Sunset, what season, what direction is the window facing, how long until dark. Spatial and temporal inference run together — your dlPFC is silently solving for the moment in time the image depicts.",
          C: "Children's bedrooms at sunset reach for an extremely specific autobiographical register — the felt sense of childhood evenings, of being inside as the day ended. Whatever your DMN supplied, the image touched a layer of memory most adult experience cannot reach.",
        },
      },
      {
        id: "B4",
        label: "Cracked door with hallway light",
        x: 0.47,
        y: 0.45,
        r: 0.07,
        brain: { dlPFC: 0.7, AMY: 0.5, VAN: 0.6 },
        reveal: {
          A: "A partially open door is the cleanest \"what's beyond\" stimulus available — your ventral attention network locks on the boundary between visible and hidden, and your amygdala tags the unknown space with low-grade vigilance. Doors slightly ajar are evolutionarily older than rooms.",
          B: "You're trying to see through. Your dlPFC is asking what's on the other side, who is there, whether the light is from a hallway or another room. Thresholds are puzzles your brain treats as solvable even when they aren't.",
          C: "Cracked doors with light spilling are an image that lives deep in childhood memory — a parent in another room, light from a hallway, the shape of bedtime. Your DMN may have reached for one of these. The image lights the network specifically.",
        },
      },
      {
        id: "B5",
        label: "Crayon drawing taped to wall",
        x: 0.62,
        y: 0.36,
        r: 0.05,
        brain: { DMN: 0.9, FFA: 0.5, V1: 0.5 },
        reveal: {
          A: "Children's drawings violate adult visual expectations — wrong proportions, stick limbs, unconventional color — which makes them stand out instantly. Your fusiform face area also flagged the small drawn face. Two attentional captures working in concert: novelty plus face.",
          B: "You're trying to read the drawing. What is it of, what does the child see, what story is it telling. Your dlPFC reaches for the meaning and your DMN supplies stand-ins from your own remembered drawings. Most of what you \"see\" in a child's drawing is provided by you.",
          C: "Crayon drawings on bedroom walls are the most direct possible evidence of an interior life — they are the child's mind made physical. Whatever your DMN supplied — your own drawings, a child you know, the specific feeling of having made something that was loved by someone — that response is the image working at depth.",
        },
      },
      {
        id: "B6",
        label: "Dragon poster",
        x: 0.75,
        y: 0.18,
        r: 0.07,
        brain: { dlPFC: 0.5, DMN: 0.7, V1: 0.5 },
        reveal: {
          A: "Imagined creatures activate visual and conceptual systems together — your visual cortex resolves the dragon's shape, your dlPFC registers \"this is fictional,\" and yet the image still pulls. Dragons are cultural artifacts your brain learned to recognize without ever seeing one.",
          B: "You're inferring the child's interests. Dragons mean a particular kind of imagination, a particular kind of reading, a particular kind of inner world. Your dlPFC is constructing a person from a single decorative choice.",
          C: "Posters of imagined creatures on a child's wall pull up specific autobiographical content — the inner worlds of childhood, the books or films that made them real. Whatever your DMN reached for, it reached for a child's-eye view of how big the imagined can feel.",
        },
      },
      {
        id: "B7",
        label: "Discarded shoes and clothes on floor",
        x: 0.43,
        y: 0.78,
        r: 0.08,
        brain: { DMN: 0.7, dlPFC: 0.5, V1: 0.5 },
        reveal: {
          A: "Mid-action mess in a domestic scene is read as evidence of a recently present occupant — your visual cortex picks up the irregular shapes, your DMN tags them as \"human, just left.\" Clothing in particular carries strong implicit personhood; a piece of fabric on the floor implies a body that wore it.",
          B: "You're reconstructing what happened. The child came in, took off shoes, dropped clothes, did something else. Your dlPFC builds the narrative from the spatial arrangement. Mess is information.",
          C: "Children's clothes on a bedroom floor reach for a particular kind of parental memory or remembered childhood. Whatever your DMN supplied — the feeling of returning home, of being a child, of caring for one — that response is the image's deepest reach.",
        },
      },
      {
        id: "B8",
        label: "Unlit fairy lights along headboard",
        x: 0.91,
        y: 0.42,
        r: 0.06,
        brain: { DMN: 0.6, V1: 0.5, dlPFC: 0.4 },
        reveal: {
          A: "Unlit string lights are an unusual stimulus — your visual cortex registers the small repeated bulb shapes, your dlPFC notices their darkness and silently completes them as lit. You see the lights you would see if they were on. This kind of completion happens constantly; it's just easier to notice with objects designed to glow.",
          B: "You're inferring the evening ritual. Will they be turned on, by whom, when. Fairy lights are an object that exists almost entirely for a moment that hasn't happened yet. Your dlPFC is reading anticipation from physical evidence.",
          C: "String lights in children's rooms pull up specific feelings — small celebrations, the wish to keep the dark soft, the rituals of evening. Whatever your DMN reached for, the image lit a memory of being made cozy or making someone else so.",
        },
      },
    ],
  },
];

// ============================================================
// BRAIN REGION DEFINITIONS
// ============================================================
// Anatomically schematic positions on a left-lateral brain SVG (viewBox 0 0 240 180).
// Not medically precise — stylized for legibility. Each region is a small marker
// that pulses on activation. Front of head is on the right side of the SVG.

type BrainRegion = {
  key: BrainRegionKey;
  name: string;
  short: string; // displayed acronym
  x: number; // SVG x in viewBox 0..240
  y: number; // SVG y in viewBox 0..180
  function: string; // tooltip / description
};

const BRAIN_REGIONS: BrainRegion[] = [
  {
    key: "V1",
    name: "Visual Cortex",
    short: "V1",
    x: 30,
    y: 90,
    function: "Decodes raw visual input. Always active when you are looking.",
  },
  {
    key: "FFA",
    name: "Fusiform Face Area",
    short: "FFA",
    x: 65,
    y: 130,
    function: "Identifies faces and face-like patterns within ~170ms.",
  },
  {
    key: "PPA",
    name: "Parahippocampal Place Area",
    short: "PPA",
    x: 90,
    y: 138,
    function: "Maps scenes, environments, and spatial layouts.",
  },
  {
    key: "AMY",
    name: "Amygdala",
    short: "AMY",
    x: 110,
    y: 128,
    function: "Assigns emotional and threat weight before conscious awareness.",
  },
  {
    key: "VAN",
    name: "Ventral Attention Network",
    short: "VAN",
    x: 105,
    y: 88,
    function: "Captures attention reflexively — surprise, motion, novelty.",
  },
  {
    key: "DAN",
    name: "Dorsal Attention Network",
    short: "DAN",
    x: 130,
    y: 50,
    function: "Voluntary directed attention. The deliberate spotlight.",
  },
  {
    key: "DMN",
    name: "Default Mode Network",
    short: "DMN",
    x: 165,
    y: 70,
    function: "Self-reference, autobiographical memory, mind-wandering.",
  },
  {
    key: "dlPFC",
    name: "Dorsolateral Prefrontal Cortex",
    short: "dlPFC",
    x: 200,
    y: 65,
    function: "Meta-cognitive evaluation. Why am I looking at this?",
  },
];

// ============================================================
// MAIN PAGE
// ============================================================

export default function ObservatoryPage() {
  const [activeSceneKey, setActiveSceneKey] = useState<string | null>(null);

  const activeScene = useMemo(
    () => SCENES.find((s) => s.key === activeSceneKey) || null,
    [activeSceneKey]
  );

  return (
    <div
      className="mobile-pad"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at top, #161310 0%, #0a0907 100%)",
        color: "#e8e3d8",
        fontFamily: "'Inter', sans-serif",
        padding: "32px 28px 60px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <header
        style={{
          maxWidth: 1200,
          margin: "0 auto 36px",
          borderBottom: "1px solid #2a2620",
          paddingBottom: 24,
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "#8a8278",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          08 · The Observatory
        </div>
        <h1
          className="mobile-text-shrink"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: "0 0 16px",
            maxWidth: 900,
          }}
        >
          You don't choose what you look at.
          <br />
          <em
            style={{
              color: "#d4af6a",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            You discover what you looked at.
          </em>
        </h1>
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            fontSize: "clamp(15px, 1.4vw, 18px)",
            fontWeight: 300,
            lineHeight: 1.6,
            color: "#b8b0a0",
            maxWidth: 720,
            margin: 0,
          }}
        >
          Five scenes. Each is populated with regions of interest. Linger on
          any of them — your gaze will trigger a brain readout and a question
          about why you looked. The experience is a small instrument for
          watching your own attention construct itself.
        </p>
      </header>

      {/* Body */}
      {activeScene ? (
        <SceneView
          scene={activeScene}
          onBack={() => setActiveSceneKey(null)}
        />
      ) : (
        <LandingGallery onPick={setActiveSceneKey} />
      )}

      {/* Footer disclaimer */}
      <footer
        style={{
          maxWidth: 1200,
          margin: "60px auto 0",
          paddingTop: 24,
          borderTop: "1px solid #1f1c18",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "#6a6358",
          letterSpacing: "0.05em",
          lineHeight: 1.7,
        }}
      >
        <div style={{ marginBottom: 8, color: "#8a8278" }}>
          ABOUT THIS SIMULATION
        </div>
        The brain panel is a stylized instrument, not a brain scan. Region
        activations are hand-authored to reflect what neuroscience suggests
        would happen given each region of interest — directionally accurate,
        not numerically precise. The reveals are an interpretive frame,
        designed to surface the recursive structure RTC describes rather than
        to make claims about your individual neural activity.
      </footer>
    </div>
  );
}

// ============================================================
// LANDING GALLERY
// ============================================================

function LandingGallery({ onPick }: { onPick: (key: string) => void }) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "#8a8278",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 24,
          paddingBottom: 8,
          borderBottom: "1px solid #2a2620",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>Choose a scene</span>
        <span style={{ fontSize: 9 }}>five available</span>
      </div>

      <div
        className="mobile-stack"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 24,
        }}
      >
        {SCENES.map((scene, idx) => (
          <button
            key={scene.key}
            onClick={() => onPick(scene.key)}
            style={{
              all: "unset",
              cursor: "pointer",
              display: "block",
              border: "1px solid #2a2620",
              background: "rgba(15, 13, 11, 0.5)",
              transition: "background 0.3s ease, border-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(26, 22, 18, 0.7)";
              e.currentTarget.style.borderColor = "#d4af6a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(15, 13, 11, 0.5)";
              e.currentTarget.style.borderColor = "#2a2620";
            }}
          >
            <div
              style={{
                aspectRatio: "3 / 2",
                background: "#0d0b09",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={scene.image}
                alt={scene.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <CornerMark position="tl" />
              <CornerMark position="tr" />
              <CornerMark position="bl" />
              <CornerMark position="br" />
            </div>
            <div style={{ padding: "20px 22px" }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "#d4af6a",
                  letterSpacing: "0.2em",
                  marginBottom: 8,
                }}
              >
                {String(idx + 1).padStart(2, "0")} ·{" "}
                {scene.subtitle.toUpperCase()}
              </div>
              <h3
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 22,
                  fontWeight: 400,
                  margin: "0 0 8px",
                  letterSpacing: "-0.01em",
                  color: "#e8e3d8",
                }}
              >
                {scene.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: "italic",
                  fontSize: 14,
                  fontWeight: 300,
                  color: "#b8b0a0",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {scene.description}
              </p>
              <div
                style={{
                  marginTop: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "#8a8278",
                  letterSpacing: "0.15em",
                }}
              >
                {scene.rois.length} regions · enter →
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// SCENE VIEW — the heart of the experience
// ============================================================

type DwellState = {
  roiId: string | null;
  startedAt: number;
};

type RevealState = {
  roi: ROI;
  option: "A" | "B" | "C" | "free";
  freeText?: string;
};

const DWELL_MS = 600; // how long cursor must stay in ROI to trigger

function SceneView({
  scene,
  onBack,
}: {
  scene: Scene;
  onBack: () => void;
}) {
  const time = useAnimationTime();
  const imageRef = useRef<HTMLDivElement>(null);

  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [dwell, setDwell] = useState<DwellState>({
    roiId: null,
    startedAt: 0,
  });
  const [activePrompt, setActivePrompt] = useState<ROI | null>(null);
  const [reveal, setReveal] = useState<RevealState | null>(null);
  const [seenRoiIds, setSeenRoiIds] = useState<Set<string>>(new Set());
  const [editorMode, setEditorMode] = useState(false);
  const [editorRois, setEditorRois] = useState<ROI[]>(scene.rois);
  const [draggingRoiId, setDraggingRoiId] = useState<string | null>(null);

  // Detect Shift+E for editor mode
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === "E" || e.key === "e")) {
        setEditorMode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reset editor state when scene changes
  useEffect(() => {
    setEditorRois(scene.rois);
    setSeenRoiIds(new Set());
    setActivePrompt(null);
    setReveal(null);
    setDwell({ roiId: null, startedAt: 0 });
  }, [scene.key]);

  // Dwell detection: which ROI is the cursor inside?
  const cursorRoi = useMemo<ROI | null>(() => {
    if (!cursor || editorMode || activePrompt || reveal) return null;
    const rois = scene.rois;
    let nearest: { roi: ROI; dist: number } | null = null;
    for (const roi of rois) {
      const dx = cursor.x - roi.x;
      const dy = cursor.y - roi.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= roi.r) {
        if (!nearest || dist < nearest.dist) {
          nearest = { roi, dist };
        }
      }
    }
    return nearest ? nearest.roi : null;
  }, [cursor, scene.rois, editorMode, activePrompt, reveal]);

  // Track dwell time
  useEffect(() => {
    if (!cursorRoi) {
      if (dwell.roiId !== null) setDwell({ roiId: null, startedAt: 0 });
      return;
    }
    if (dwell.roiId !== cursorRoi.id) {
      setDwell({ roiId: cursorRoi.id, startedAt: Date.now() });
      return;
    }
    const elapsed = Date.now() - dwell.startedAt;
    if (elapsed >= DWELL_MS && !seenRoiIds.has(cursorRoi.id)) {
      // Trigger prompt
      setActivePrompt(cursorRoi);
      setSeenRoiIds(new Set([...seenRoiIds, cursorRoi.id]));
    }
  }, [cursorRoi, dwell, seenRoiIds]);

  // Periodic re-check of dwell while in same ROI (for frame-stable triggering)
  useEffect(() => {
    if (!cursorRoi || activePrompt || reveal) return;
    const t = setInterval(() => {
      if (
        dwell.roiId === cursorRoi.id &&
        Date.now() - dwell.startedAt >= DWELL_MS &&
        !seenRoiIds.has(cursorRoi.id)
      ) {
        setActivePrompt(cursorRoi);
        setSeenRoiIds(new Set([...seenRoiIds, cursorRoi.id]));
      }
    }, 100);
    return () => clearInterval(t);
  }, [cursorRoi, dwell, seenRoiIds, activePrompt, reveal]);

  // Mouse / touch tracking on the image
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (editorMode) return; // editor handles its own pointer logic
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setCursor({ x, y });
  };

  const onPointerLeave = () => {
    if (!editorMode) setCursor(null);
  };

  // Tap/click handler — for mobile, taps trigger ROIs immediately
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (editorMode) return;
    if (e.pointerType !== "touch") return;
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // Find nearest ROI within radius
    let nearest: { roi: ROI; dist: number } | null = null;
    for (const roi of scene.rois) {
      const dx = x - roi.x;
      const dy = y - roi.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= roi.r) {
        if (!nearest || dist < nearest.dist) {
          nearest = { roi, dist };
        }
      }
    }
    if (nearest && !seenRoiIds.has(nearest.roi.id)) {
      setActivePrompt(nearest.roi);
      setSeenRoiIds(new Set([...seenRoiIds, nearest.roi.id]));
    }
  };

  // Brain activations — combines baseline + current ROI + dwell intensity
  const brainActivations = useMemo<Record<BrainRegionKey, number>>(() => {
    const base: Record<BrainRegionKey, number> = {
      V1: 0.25,
      FFA: 0.05,
      AMY: 0.05,
      PPA: 0.1,
      DAN: 0.05,
      VAN: 0.05,
      DMN: 0.1,
      dlPFC: 0.05,
    };
    const sourceRoi = activePrompt || reveal?.roi || cursorRoi;
    if (sourceRoi) {
      for (const [k, v] of Object.entries(sourceRoi.brain)) {
        const key = k as BrainRegionKey;
        base[key] = Math.max(base[key], v as number);
      }
    }
    return base;
  }, [cursorRoi, activePrompt, reveal]);

  // Editor mode: drag handler
  const onEditorPointerDown = (
    e: React.PointerEvent,
    roiId: string
  ) => {
    e.stopPropagation();
    setDraggingRoiId(roiId);
  };

  const onEditorPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRoiId || !imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setEditorRois((prev) =>
      prev.map((r) =>
        r.id === draggingRoiId
          ? { ...r, x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) }
          : r
      )
    );
  };

  const onEditorPointerUp = () => {
    setDraggingRoiId(null);
  };

  const exportEditorJson = () => {
    const summary = editorRois
      .map((r) => `      { id: "${r.id}", x: ${r.x.toFixed(3)}, y: ${r.y.toFixed(3)}, r: ${r.r.toFixed(3)} },`)
      .join("\n");
    const out = `// ${scene.key} — paste these positions into the data:\n${summary}`;
    navigator.clipboard?.writeText(out);
    // eslint-disable-next-line no-alert
    alert("Position JSON copied to clipboard.\n\n" + out);
  };

  const displayedRois = editorMode ? editorRois : scene.rois;

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 20,
          paddingBottom: 12,
          borderBottom: "1px solid #2a2620",
        }}
      >
        <div>
          <button
            onClick={onBack}
            style={{
              all: "unset",
              cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#8a8278",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 6,
              display: "block",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#d4af6a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8278")}
          >
            ← back to scenes
          </button>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 26,
              fontWeight: 400,
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            {scene.title}
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: "#8a8278",
                marginLeft: 14,
                letterSpacing: "0.15em",
              }}
            >
              {scene.subtitle.toUpperCase()}
            </span>
          </h2>
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "#8a8278",
            letterSpacing: "0.15em",
          }}
        >
          NOTICED:{" "}
          <span style={{ color: "#d4af6a" }}>
            {seenRoiIds.size}/{scene.rois.length}
          </span>
          {seenRoiIds.size > 0 && (
            <button
              onClick={() => setSeenRoiIds(new Set())}
              style={{
                all: "unset",
                cursor: "pointer",
                marginLeft: 14,
                color: "#5a544a",
                fontSize: 9,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#d4af6a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#5a544a")}
            >
              [reset]
            </button>
          )}
        </div>
      </div>

      {/* Main layout: image left, brain panel right */}
      <div
        className="mobile-stack observatory-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: 28,
          alignItems: "start",
        }}
      >
        {/* IMAGE + ROI overlay */}
        <div
          ref={imageRef}
          onPointerMove={editorMode ? onEditorPointerMove : onPointerMove}
          onPointerLeave={onPointerLeave}
          onPointerDown={onPointerDown}
          onPointerUp={onEditorPointerUp}
          style={{
            position: "relative",
            aspectRatio: "3 / 2",
            background: "#0d0b09",
            border: "1px solid #2a2620",
            overflow: "hidden",
            cursor: editorMode ? "crosshair" : "default",
            touchAction: "manipulation",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={scene.image}
            alt={scene.title}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />

          {/* ROI overlay */}
          <svg
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            {displayedRois.map((roi) => {
              const isHover = cursorRoi?.id === roi.id;
              const isActive =
                activePrompt?.id === roi.id || reveal?.roi.id === roi.id;
              const isSeen = seenRoiIds.has(roi.id);
              const dwellPct =
                isHover && dwell.roiId === roi.id
                  ? Math.min(1, (Date.now() - dwell.startedAt) / DWELL_MS)
                  : 0;

              const color = isActive
                ? "#d4af6a"
                : isSeen
                ? "#8a7a5a"
                : isHover
                ? "#d4af6a"
                : "#5a544a";
              const opacity = editorMode ? 0.8 : isActive ? 0.9 : isHover ? 0.7 : isSeen ? 0.5 : 0.0;

              return (
                <g key={roi.id} pointerEvents={editorMode ? "auto" : "none"}>
                  {/* Hot zone circle */}
                  <circle
                    cx={roi.x}
                    cy={roi.y}
                    r={roi.r}
                    fill="none"
                    stroke={color}
                    strokeWidth={0.002}
                    opacity={opacity}
                  />
                  {/* Dwell ring (animated) */}
                  {isHover && !isActive && dwellPct > 0 && (
                    <circle
                      cx={roi.x}
                      cy={roi.y}
                      r={roi.r * 0.7}
                      fill="none"
                      stroke="#d4af6a"
                      strokeWidth={0.003}
                      opacity={dwellPct}
                      strokeDasharray={`${dwellPct * 6.28 * roi.r * 0.7} ${6.28 * roi.r * 0.7}`}
                      transform={`rotate(-90 ${roi.x} ${roi.y})`}
                    />
                  )}
                  {/* Active gold ring */}
                  {isActive && (
                    <circle
                      cx={roi.x}
                      cy={roi.y}
                      r={roi.r * 0.85}
                      fill="none"
                      stroke="#d4af6a"
                      strokeWidth={0.003}
                      opacity={0.95}
                    />
                  )}
                  {/* Editor mode: draggable handle + label */}
                  {editorMode && (
                    <>
                      <circle
                        cx={roi.x}
                        cy={roi.y}
                        r={0.012}
                        fill="#d4af6a"
                        opacity={0.9}
                        style={{ cursor: "grab" }}
                        onPointerDown={(e) =>
                          onEditorPointerDown(e as any, roi.id)
                        }
                      />
                    </>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Editor labels (HTML overlay so text doesn't stretch with viewBox) */}
          {editorMode &&
            displayedRois.map((roi) => (
              <div
                key={`lbl-${roi.id}`}
                style={{
                  position: "absolute",
                  left: `${roi.x * 100}%`,
                  top: `${roi.y * 100}%`,
                  transform: "translate(8px, -50%)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: "#d4af6a",
                  background: "rgba(10, 9, 7, 0.85)",
                  padding: "2px 6px",
                  border: "1px solid #2a2620",
                  pointerEvents: "none",
                  letterSpacing: "0.05em",
                }}
              >
                {roi.id} ({roi.x.toFixed(2)}, {roi.y.toFixed(2)})
              </div>
            ))}

          <CornerMark position="tl" />
          <CornerMark position="tr" />
          <CornerMark position="bl" />
          <CornerMark position="br" />

          {/* Editor mode banner */}
          {editorMode && (
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                right: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(10, 9, 7, 0.9)",
                border: "1px solid #d4af6a",
                padding: "8px 14px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: "#d4af6a",
                letterSpacing: "0.1em",
              }}
            >
              <span>EDITOR MODE · drag dots to reposition · Shift+E to exit</span>
              <button
                onClick={exportEditorJson}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  background: "#d4af6a",
                  color: "#0a0907",
                  padding: "4px 10px",
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                }}
              >
                EXPORT JSON
              </button>
            </div>
          )}
        </div>

        {/* BRAIN PANEL */}
        <div className="observatory-brain-col">
          <BrainPanel
            activations={brainActivations}
            time={time}
            currentRoi={cursorRoi || activePrompt || reveal?.roi || null}
          />
        </div>
      </div>

      {/* PROMPT MODAL */}
      {activePrompt && (
        <PromptModal
          roi={activePrompt}
          scene={scene}
          onSubmit={(option, freeText) => {
            setReveal({ roi: activePrompt, option, freeText });
            setActivePrompt(null);
          }}
          onDismiss={() => setActivePrompt(null)}
        />
      )}

      {/* REVEAL PANEL */}
      {reveal && (
        <RevealPanel
          state={reveal}
          scene={scene}
          onDismiss={() => setReveal(null)}
        />
      )}
    </div>
  );
}

// ============================================================
// BRAIN PANEL
// ============================================================

function BrainPanel({
  activations,
  time,
  currentRoi,
}: {
  activations: Record<BrainRegionKey, number>;
  time: number;
  currentRoi: ROI | null;
}) {
  const t = time * 0.001;

  return (
    <div
      style={{
        border: "1px solid #2a2620",
        background: "rgba(15, 13, 11, 0.4)",
        padding: "20px 18px",
        position: "sticky",
        top: 20,
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "#8a8278",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 12,
          paddingBottom: 8,
          borderBottom: "1px solid #2a2620",
        }}
      >
        Activation
      </div>

      <svg
        viewBox="0 0 240 180"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {/* Stylized lateral brain outline (left hemisphere, anterior to the right) */}
        <path
          d="M 30 90
             Q 20 60, 50 35
             Q 90 12, 145 18
             Q 195 22, 215 50
             Q 230 75, 220 105
             Q 210 130, 175 145
             Q 130 158, 80 152
             Q 45 145, 32 120
             Q 25 105, 30 90 Z"
          fill="rgba(40, 35, 28, 0.4)"
          stroke="#2a2620"
          strokeWidth="1"
        />
        {/* Cerebellum hint */}
        <path
          d="M 38 110 Q 32 130, 50 140 Q 65 145, 75 138"
          fill="rgba(40, 35, 28, 0.3)"
          stroke="#2a2620"
          strokeWidth="0.8"
        />
        {/* Brainstem hint */}
        <path
          d="M 70 145 Q 75 162, 88 168"
          fill="none"
          stroke="#2a2620"
          strokeWidth="0.8"
        />
        {/* Sulci (fake folds, for texture) */}
        <path
          d="M 65 50 Q 90 60, 110 55"
          fill="none"
          stroke="#2a2620"
          strokeWidth="0.6"
          opacity="0.6"
        />
        <path
          d="M 110 35 Q 130 45, 155 40"
          fill="none"
          stroke="#2a2620"
          strokeWidth="0.6"
          opacity="0.6"
        />
        <path
          d="M 155 45 Q 175 60, 195 60"
          fill="none"
          stroke="#2a2620"
          strokeWidth="0.6"
          opacity="0.6"
        />
        <path
          d="M 60 90 Q 90 100, 130 95"
          fill="none"
          stroke="#2a2620"
          strokeWidth="0.6"
          opacity="0.5"
        />

        {/* Region markers */}
        {BRAIN_REGIONS.map((region) => {
          const a = activations[region.key];
          const pulse = a > 0.3 ? 1 + Math.sin(t * 3) * 0.12 : 1;
          const glowR = 4 + a * 12;
          const fill =
            a > 0.5
              ? "#f0d090"
              : a > 0.25
              ? "#d4af6a"
              : "#5a544a";

          return (
            <g key={region.key}>
              {/* Glow halo */}
              {a > 0.2 && (
                <circle
                  cx={region.x}
                  cy={region.y}
                  r={glowR * pulse}
                  fill={fill}
                  opacity={a * 0.25}
                />
              )}
              {/* Core dot */}
              <circle
                cx={region.x}
                cy={region.y}
                r={2.5 + a * 1.5}
                fill={fill}
                opacity={0.4 + a * 0.6}
              />
              {/* Label */}
              <text
                x={region.x}
                y={region.y + (region.y > 100 ? 15 : -8)}
                textAnchor="middle"
                fontSize={a > 0.3 ? "7" : "6"}
                fontFamily="'JetBrains Mono', monospace"
                fill={a > 0.3 ? "#d4af6a" : "#6a6358"}
                opacity={0.5 + a * 0.5}
                letterSpacing="0.05em"
              >
                {region.short}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Active region readout */}
      <div
        style={{
          marginTop: 16,
          paddingTop: 12,
          borderTop: "1px solid #1f1c18",
          minHeight: 100,
        }}
      >
        {currentRoi ? (
          <>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: "#d4af6a",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Looking at
            </div>
            <div
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 14,
                fontStyle: "italic",
                color: "#e8e3d8",
                marginBottom: 10,
                lineHeight: 1.3,
              }}
            >
              {currentRoi.label}
            </div>
            <div style={{ lineHeight: 1.5 }}>
              {Object.entries(currentRoi.brain)
                .sort((a, b) => (b[1] as number) - (a[1] as number))
                .map(([k, v]) => {
                  const region = BRAIN_REGIONS.find((r) => r.key === k);
                  return (
                    <div
                      key={k}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9,
                        color: "#8a8278",
                        letterSpacing: "0.05em",
                        marginBottom: 3,
                      }}
                    >
                      <span style={{ color: "#d4af6a", display: "inline-block", width: 50 }}>
                        {region?.short}
                      </span>
                      <span style={{ color: "#5a544a" }}>
                        {"·".repeat(Math.round((v as number) * 10))}
                      </span>
                    </div>
                  );
                })}
            </div>
          </>
        ) : (
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: "#5a544a",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              lineHeight: 1.5,
            }}
          >
            Hover or tap any region of interest in the scene. Linger to surface
            the prompt.
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// PROMPT MODAL
// ============================================================

function PromptModal({
  roi,
  scene,
  onSubmit,
  onDismiss,
}: {
  roi: ROI;
  scene: Scene;
  onSubmit: (option: "A" | "B" | "C" | "free", freeText?: string) => void;
  onDismiss: () => void;
}) {
  const [freeText, setFreeText] = useState("");

  return (
    <div
      onClick={onDismiss}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(5, 4, 3, 0.85)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        animation: "fadeIn 0.3s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0d0b09",
          border: "1px solid #d4af6a",
          maxWidth: 580,
          width: "100%",
          padding: "32px 32px 28px",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <CornerMark position="tl" />
        <CornerMark position="tr" />
        <CornerMark position="bl" />
        <CornerMark position="br" />

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "#d4af6a",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          {scene.title} · {roi.id}
        </div>
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            fontSize: 13,
            color: "#8a8278",
            marginBottom: 14,
          }}
        >
          {roi.label}
        </div>

        <h3
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 26,
            fontWeight: 400,
            margin: "0 0 22px",
            letterSpacing: "-0.01em",
            color: "#e8e3d8",
            lineHeight: 1.2,
          }}
        >
          What drew your eye here?
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {(["A", "B", "C"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => onSubmit(opt)}
              style={{
                all: "unset",
                cursor: "pointer",
                padding: "14px 18px",
                border: "1px solid #2a2620",
                background: "rgba(20, 17, 14, 0.5)",
                fontFamily: "'Fraunces', serif",
                fontSize: 15,
                lineHeight: 1.5,
                color: "#e8e3d8",
                transition: "background 0.2s, border-color 0.2s",
                display: "flex",
                gap: 12,
                alignItems: "baseline",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(40, 32, 22, 0.6)";
                e.currentTarget.style.borderColor = "#d4af6a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(20, 17, 14, 0.5)";
                e.currentTarget.style.borderColor = "#2a2620";
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "#d4af6a",
                  letterSpacing: "0.15em",
                }}
              >
                {opt}
              </span>
              <span style={{ flex: 1 }}>
                {opt === "A" &&
                  "Something about it stood out before I knew why."}
                {opt === "B" && "I was curious or trying to figure something out."}
                {opt === "C" &&
                  "It made me think about myself, a memory, or someone I know."}
              </span>
            </button>
          ))}
        </div>

        {/* Free text */}
        <div style={{ marginTop: 18 }}>
          <FieldLabel>Or, in your own words</FieldLabel>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <input
              type="text"
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              placeholder="Type your reason…"
              onKeyDown={(e) => {
                if (e.key === "Enter" && freeText.trim()) {
                  onSubmit("free", freeText.trim());
                }
              }}
              style={{
                flex: 1,
                background: "rgba(10, 9, 7, 0.7)",
                border: "1px solid #2a2620",
                color: "#e8e3d8",
                padding: "12px 14px",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                outline: "none",
              }}
            />
            <button
              onClick={() =>
                freeText.trim() && onSubmit("free", freeText.trim())
              }
              disabled={!freeText.trim()}
              style={{
                all: "unset",
                cursor: freeText.trim() ? "pointer" : "not-allowed",
                padding: "12px 18px",
                background: freeText.trim() ? "#d4af6a" : "#2a2620",
                color: freeText.trim() ? "#0a0907" : "#5a544a",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.15em",
                fontWeight: 500,
              }}
            >
              SUBMIT
            </button>
          </div>
        </div>

        <button
          onClick={onDismiss}
          style={{
            all: "unset",
            cursor: "pointer",
            position: "absolute",
            top: 10,
            right: 14,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            color: "#5a544a",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#d4af6a")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#5a544a")}
        >
          ×
        </button>
      </div>
    </div>
  );
}

// ============================================================
// REVEAL PANEL
// ============================================================

function RevealPanel({
  state,
  scene,
  onDismiss,
}: {
  state: RevealState;
  scene: Scene;
  onDismiss: () => void;
}) {
  const text =
    state.option === "free"
      ? scene.freeTextReveal
      : state.roi.reveal[state.option];

  const optionLabel =
    state.option === "free"
      ? "Your own words"
      : state.option === "A"
      ? "Stood out before knowing why"
      : state.option === "B"
      ? "Curious / figuring something out"
      : "Self, memory, someone known";

  return (
    <div
      onClick={onDismiss}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(5, 4, 3, 0.9)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        animation: "fadeIn 0.3s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0d0b09",
          border: "1px solid #d4af6a",
          maxWidth: 640,
          width: "100%",
          padding: "36px 36px 32px",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <CornerMark position="tl" />
        <CornerMark position="tr" />
        <CornerMark position="bl" />
        <CornerMark position="br" />

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "#d4af6a",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          {scene.title} · {state.roi.id} · {optionLabel}
        </div>

        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            fontSize: 14,
            color: "#8a8278",
            marginBottom: 22,
          }}
        >
          {state.roi.label}
        </div>

        {state.freeText && (
          <div
            style={{
              border: "1px dashed #2a2620",
              padding: "12px 16px",
              marginBottom: 22,
              fontFamily: "'Fraunces', serif",
              fontSize: 14,
              fontStyle: "italic",
              color: "#b8b0a0",
              lineHeight: 1.5,
            }}
          >
            “{state.freeText}”
          </div>
        )}

        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 17,
            fontWeight: 300,
            lineHeight: 1.65,
            color: "#e8e3d8",
            margin: 0,
            letterSpacing: "0.005em",
          }}
        >
          {text}
        </p>

        <div
          style={{
            marginTop: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 18,
            borderTop: "1px solid #1f1c18",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: "#5a544a",
              letterSpacing: "0.15em",
            }}
          >
            BRAIN PANEL REFLECTS WHAT JUST FIRED
          </div>
          <button
            onClick={onDismiss}
            style={{
              all: "unset",
              cursor: "pointer",
              padding: "10px 18px",
              background: "#d4af6a",
              color: "#0a0907",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.15em",
              fontWeight: 500,
            }}
          >
            KEEP LOOKING →
          </button>
        </div>

        <button
          onClick={onDismiss}
          style={{
            all: "unset",
            cursor: "pointer",
            position: "absolute",
            top: 10,
            right: 14,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            color: "#5a544a",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#d4af6a")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#5a544a")}
        >
          ×
        </button>
      </div>
    </div>
  );
}
