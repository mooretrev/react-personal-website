export default function getCurrentDayIndex(index, offset) {
  return (index + offset) % 7;
}
