export default function Content({ xmlDoc }) {
  if (!xmlDoc) return null;
  return (
    <div className="overflow-scroll h-screen">
      <pre className="whitespace-pre-wrap">{xmlDoc}</pre>
    </div>
  );
}
