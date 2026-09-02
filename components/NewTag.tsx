/** The blinking NEW! that means a repo was pushed this week. */
export default function NewTag() {
  return (
    <span className="new blink" aria-label="updated this week">
      NEW!
    </span>
  );
}
