import moment from 'moment'

const INPUT_DATE_FORMAT = 'MMMM Do'

export function formatDateMD (value: string): string {
  return moment(value).format(INPUT_DATE_FORMAT)
}
