import { format, parseISO } from 'date-fns';

type TimeTagProps = {
  date: string;
};

export default function TimeTag({ date }: TimeTagProps) {
  return <time dateTime={date} className="justify-self-end w-fit text-xs md:text-sm text-slate-500">
    {format(parseISO(date), 'LLLL d, yyyy')}
  </time>;
}
