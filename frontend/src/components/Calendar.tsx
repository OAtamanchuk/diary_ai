import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useNavigate } from 'react-router-dom'

export default function Calendar({ entries }: any) {
  const navigate = useNavigate()

  const events = entries.map((e: any) => ({
    title: e.emoji,
    date: e.date,
  }))

  const handleDateClick = (info: any) => {
    navigate(`/day/${info.dateStr}`)
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={handleDateClick}
      height="auto"
    />
  )
}
