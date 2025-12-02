import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

import ukLocale from "@fullcalendar/core/locales/uk";
import enLocale from "@fullcalendar/core/locales/en-gb";

import anger from "../assets/emojis/anger.svg";
import fear from "../assets/emojis/fear.svg";
import joy from "../assets/emojis/joy.svg";
import love from "../assets/emojis/love.svg";
import sadness from "../assets/emojis/sadness.svg";
import surprise from "../assets/emojis/surprise.svg";

const emojiMap: Record<string, string> = {
  anger,
  fear,
  joy,
  love,
  sadness,
  surprise,
};

const unicodeToId: Record<string, string> = {
  "😢": "sadness",
  "😀": "joy",
  "❤️": "love",
  "😡": "anger",
  "😨": "fear",
  "😮": "surprise",
};

export interface Entry {
  id?: number;
  date: string;
  emoji?: string | null;
  emotion_label?: string | null;
}

export default function Calendar({ entries }: { entries: Entry[] }) {
  const navigate = useNavigate();
  const { lang } = useLang();

  const grouped: Record<string, string[]> = {};

  entries.forEach((e) => {
    if (!grouped[e.date]) grouped[e.date] = [];

    let emotionId: string | undefined = undefined;

    if (e.emoji) {
      if (emojiMap[e.emoji]) emotionId = e.emoji;
      else if (unicodeToId[e.emoji]) emotionId = unicodeToId[e.emoji];
    }

    if (!emotionId && e.emotion_label && emojiMap[e.emotion_label]) {
      emotionId = e.emotion_label;
    }

    if (emotionId) grouped[e.date].push(emotionId);
  });

  const events = Object.entries(grouped).map(([date, emotions]) => ({
    date,
    emotions, 
    allDay: true,
  }));

  const handleDateClick = (info: any) => {
    navigate(`/day/${info.dateStr}`);
  };

  const renderEventContent = (arg: any) => {
    const emotions: string[] = arg.event.extendedProps.emotions;

    if (!emotions || emotions.length === 0) return null;

    return (
      <div
        className="grid gap-1 justify-center"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)", 
        }}
      >
        {emotions.map((emotion: string, index: number) => {
          const icon = emojiMap[emotion];
          return icon ? (
            <img
              key={index}
              src={icon}
              alt={emotion}
              className="w-8 h-8 rounded-md mx-auto"
            />
          ) : null;
        })}
      </div>
    );
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={handleDateClick}
      height="auto"
      eventContent={renderEventContent}
      eventDisplay="block"
      locales={[ukLocale, enLocale]}
      locale={lang === "uk" ? "uk" : "en-gb"} 
    />
  );
}
